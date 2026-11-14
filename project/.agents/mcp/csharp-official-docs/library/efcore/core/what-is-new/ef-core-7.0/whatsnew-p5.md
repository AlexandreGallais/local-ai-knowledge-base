---
title: "What's New in EF Core 7.0 (part 5 of 16)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-7.0/whatsnew.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# What's New in EF Core 7.0 (part 5 of 16)

## Faster SaveChanges

In EF7, the performance of `Microsoft.EntityFrameworkCore.DbContext.SaveChanges*` and `Microsoft.EntityFrameworkCore.DbContext.SaveChangesAsync*` has been significantly improved. In some scenarios, saving changes is now up to four times faster than with EF Core 6.0!

Most of these improvements come from:

- Performing fewer roundtrips to the database
- Generating faster SQL

Some examples of these improvements are shown below.

> **Note:**
> See Announcing Entity Framework Core 7 Preview 6: Performance Edition on the .NET Blog for an in-depth discussion of these changes.

> **Tip:**
> The code shown here comes from SaveChangesPerformanceSample.cs.

### Unneeded transactions are eliminated

All modern relational databases guarantee transactionality for (most) single SQL statements. That is, the statement will never be only partially completed, even if an error occurs. EF7 avoids starting an explicit transaction in these cases.

For example, looking at the logging for the following call to `SaveChanges`:

```csharp
await context.AddAsync(new Blog { Name = "MyBlog" });
await context.SaveChangesAsync();
```

Shows that in EF Core 6.0, the `INSERT` command is wrapped by commands to begin and then commit a transaction:

```output
dbug: 9/29/2022 11:43:09.196 RelationalEventId.TransactionStarted[20200] (Microsoft.EntityFrameworkCore.Database.Transaction)
      Began transaction with isolation level 'ReadCommitted'.
info: 9/29/2022 11:43:09.265 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (27ms) [Parameters=[@p0='MyBlog' (Nullable = false) (Size = 4000)], CommandType='Text', CommandTimeout='30']
      SET NOCOUNT ON;
      INSERT INTO [Blogs] ([Name])
      VALUES (@p0);
      SELECT [Id]
      FROM [Blogs]
      WHERE @@ROWCOUNT = 1 AND [Id] = scope_identity();
dbug: 9/29/2022 11:43:09.297 RelationalEventId.TransactionCommitted[20202] (Microsoft.EntityFrameworkCore.Database.Transaction)
      Committed transaction.
```

EF7 detects that the transaction is not needed here and so removes these calls:

```output
info: 9/29/2022 11:42:34.776 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (25ms) [Parameters=[@p0='MyBlog' (Nullable = false) (Size = 4000)], CommandType='Text', CommandTimeout='30']
      SET IMPLICIT_TRANSACTIONS OFF;
      SET NOCOUNT ON;
      INSERT INTO [Blogs] ([Name])
      OUTPUT INSERTED.[Id]
      VALUES (@p0);
```

This removes two database roundtrips, which can make a huge difference to overall performance, especially when the latency of calls to the database is high. In typical production systems, the database is not co-located on the same machine as the application. This means latency is often relatively high, making this optimization particularly effective in real-world production systems.

### Improved SQL for simple Identity insert

The case above inserts a single row with an `IDENTITY` key <example-value> and no other database-generated values. EF7 simplifies the SQL in this case by using `OUTPUT INSERTED`. While this simplification is not valid for many other cases, it is still important to improve since this kind of single-row insert is very common in many applications.

### Inserting multiple rows

In EF Core 6.0, the default approach for inserting multiple rows was driven by limitations in SQL Server support for tables with triggers. We wanted to make sure that the default experience worked even for the minority of users with triggers in their tables. This meant that we could not use a simple `OUTPUT` clause, because, on SQL Server, this doesn't work with triggers. Instead, when inserting multiple entities, EF Core 6.0 generated some fairly convoluted SQL. For example, this call to `SaveChanges`:

```csharp
for (var i = 0; i < 4; i++)
{
    await context.AddAsync(new Blog { Name = "Foo" + i });
}

await context.SaveChangesAsync();
```

Results in the following actions when run against SQL Server with EF Core 6.0:

```output
dbug: 9/30/2022 17:19:51.919 RelationalEventId.TransactionStarted[20200] (Microsoft.EntityFrameworkCore.Database.Transaction)
      Began transaction with isolation level 'ReadCommitted'.
info: 9/30/2022 17:19:51.993 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (27ms) [Parameters=[@p0='Foo0' (Nullable = false) (Size = 4000), @p1='Foo1' (Nullable = false) (Size = 4000), @p2='Foo2' (Nullable = false) (Size = 4000), @p3='Foo3' (Nullable = false) (Size = 4000)], CommandType='Text', CommandTimeout='30']
      SET NOCOUNT ON;
      DECLARE @inserted0 TABLE ([Id] int, [_Position] [int]);
      MERGE [Blogs] USING (
      VALUES (@p0, 0),
      (@p1, 1),
      (@p2, 2),
      (@p3, 3)) AS i ([Name], _Position) ON 1=0
      WHEN NOT MATCHED THEN
      INSERT ([Name])
      VALUES (i.[Name])
      OUTPUT INSERTED.[Id], i._Position
      INTO @inserted0;

      SELECT [i].[Id] FROM @inserted0 i
      ORDER BY [i].[_Position];
dbug: 9/30/2022 17:19:52.023 RelationalEventId.TransactionCommitted[20202] (Microsoft.EntityFrameworkCore.Database.Transaction)
      Committed transaction.
```

> **Important:**
> Even though this is complicated, batching multiple inserts like this is still significantly faster than sending a single command for each insert.

In EF7, you can still get this SQL if your tables contain triggers, but for the common case we now generate much more efficient, if still somewhat complex, commands:

```output
info: 9/30/2022 17:40:37.612 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (4ms) [Parameters=[@p0='Foo0' (Nullable = false) (Size = 4000), @p1='Foo1' (Nullable = false) (Size = 4000), @p2='Foo2' (Nullable = false) (Size = 4000), @p3='Foo3' (Nullable = false) (Size = 4000)], CommandType='Text', CommandTimeout='30']
      SET IMPLICIT_TRANSACTIONS OFF;
      SET NOCOUNT ON;
      MERGE [Blogs] USING (
      VALUES (@p0, 0),
      (@p1, 1),
      (@p2, 2),
      (@p3, 3)) AS i ([Name], _Position) ON 1=0
      WHEN NOT MATCHED THEN
      INSERT ([Name])
      VALUES (i.[Name])
      OUTPUT INSERTED.[Id], i._Position;
```

The transaction is gone, as in the single insert case, because `MERGE` is a single statement protected by an implicit transaction. Also, the temporary table is gone and the OUTPUT clause now sends the generated IDs directly back to the client. This can be **four times faster than on EF Core 6.0**, depending on environmental factors such as latency between the application and database.

### Triggers

If the table has triggers, then the call to `SaveChanges` in the code above will throw an exception:

> Unhandled exception. Microsoft.EntityFrameworkCore.DbUpdateException:</br>
> Could not save changes because the target table has database triggers. Please configure your entity type accordingly, see `https://aka.ms/efcore-docs-sqlserver-save-changes-and-triggers` for more information.</br>
> ---> Microsoft.Data.SqlClient.SqlException (0x80131904):</br>
> The target table 'BlogsWithTriggers' of the DML statement cannot have any enabled triggers if the statement contains an OUTPUT clause without INTO clause.

The following code can be used to inform EF Core that the table has a trigger:

```csharp
modelBuilder
    .Entity<BlogWithTrigger>()
    .ToTable(tb => tb.HasTrigger("TRG_InsertUpdateBlog"));
```

EF7 will then revert to the EF Core 6.0 SQL when sending insert and update commands for this table.

For more information, including a convention to automatically configure all mapped tables with triggers, see SQL Server tables with triggers now require special EF Core configuration in the EF7 breaking changes documentation.

### Fewer roundtrips for inserting graphs

Consider inserting a graph of entities containing a new principal entity and also new dependent entities with foreign keys that reference the new principal. For example:

```csharp
await context.AddAsync(
    new Blog { Name = "MyBlog", Posts = { new() { Title = "My first post" }, new() { Title = "My second post" } } });
await context.SaveChangesAsync();
```

If the principal's primary key is generated by the database, then the value to set for the foreign key in the dependent is not known until the principal has been inserted. EF Core generates two roundtrips for this--one to insert the principal and get back the new primary key, and a second to insert the dependents with the foreign key value set. And since there are two statements for this, a transaction is needed, meaning there are in total four roundtrips:

```output
dbug: 10/1/2022 13:12:02.517 RelationalEventId.TransactionStarted[20200] (Microsoft.EntityFrameworkCore.Database.Transaction)
      Began transaction with isolation level 'ReadCommitted'.
info: 10/1/2022 13:12:02.517 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (0ms) [Parameters=[@p0='MyBlog' (Nullable = false) (Size = 4000)], CommandType='Text', CommandTimeout='30']
      SET IMPLICIT_TRANSACTIONS OFF;
      SET NOCOUNT ON;
      INSERT INTO [Blogs] ([Name])
      OUTPUT INSERTED.[Id]
      VALUES (@p0);
info: 10/1/2022 13:12:02.529 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (5ms) [Parameters=[@p1='6', @p2='My first post' (Nullable = false) (Size = 4000), @p3='6', @p4='My second post' (Nullable = false) (Size = 4000)], CommandType='Text', CommandTimeout='30']
      SET IMPLICIT_TRANSACTIONS OFF;
      SET NOCOUNT ON;
      MERGE [Post] USING (
      VALUES (@p1, @p2, 0),
      (@p3, @p4, 1)) AS i ([BlogId], [Title], _Position) ON 1=0
      WHEN NOT MATCHED THEN
      INSERT ([BlogId], [Title])
      VALUES (i.[BlogId], i.[Title])
      OUTPUT INSERTED.[Id], i._Position;
dbug: 10/1/2022 13:12:02.531 RelationalEventId.TransactionCommitted[20202] (Microsoft.EntityFrameworkCore.Database.Transaction)
      Committed transaction.
```

However, in some cases, the primary key value is known before the principal is inserted. This includes:

- Key <example-value> that are not automatically generated
- Key <example-value> that are generated on the client, such as `System.Guid` keys
- Key <example-value> that are generated on the server in batches, such as when using a hi-lo value generator

In EF7, these cases are now optimized into a single round-trip. For example, in the case above on SQL Server, the `Blog.Id` primary key can be configured to use the hi-lo generation strategy:

```csharp
modelBuilder.Entity<Blog>().Property(e => e.Id).UseHiLo();
modelBuilder.Entity<Post>().Property(e => e.Id).UseHiLo();
```

The `SaveChanges` call from above is now optimized to a single roundtrip for the inserts.

```output
dbug: 10/1/2022 21:51:55.805 RelationalEventId.TransactionStarted[20200] (Microsoft.EntityFrameworkCore.Database.Transaction)
      Began transaction with isolation level 'ReadCommitted'.
info: 10/1/2022 21:51:55.806 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (0ms) [Parameters=[@p0='9', @p1='MyBlog' (Nullable = false) (Size = 4000), @p2='10', @p3='9', @p4='My first post' (Nullable = false) (Size = 4000), @p5='11', @p6='9', @p7='My second post' (Nullable = false) (Size = 4000)], CommandType='Text', CommandTimeout='30']
      SET NOCOUNT ON;
      INSERT INTO [Blogs] ([Id], [Name])
      VALUES (@p0, @p1);
      INSERT INTO [Posts] ([Id], [BlogId], [Title])
      VALUES (@p2, @p3, @p4),
      (@p5, @p6, @p7);
dbug: 10/1/2022 21:51:55.807 RelationalEventId.TransactionCommitted[20202] (Microsoft.EntityFrameworkCore.Database.Transaction)
      Committed transaction.
```

Notice that a transaction is still needed here. This is because inserts are being made into two separate tables.

EF7 also uses a single batch in other cases where EF Core 6.0 would create more than one. For example, when deleting and inserting rows into the same table.

### The value of SaveChanges

As some of the examples here show, saving results to the database can be a complex business. This is where using something like EF Core really shows its value. EF Core:

- Batches multiple insert, update, and delete commands together to reduce roundtrips
- Figures out if an explicit transaction is needed or not
- Determines what order to insert, update, and delete entities so that database constraints are not violated
- Ensures database generated values are returned efficiently and propagated back into entities
- Automatically sets foreign key <example-value> using the values generated for primary keys
- Detect concurrency conflicts

In addition, different database systems require different SQL for many of these cases. The EF Core database provider works with EF Core to ensure correct and efficient commands are sent for each case.
