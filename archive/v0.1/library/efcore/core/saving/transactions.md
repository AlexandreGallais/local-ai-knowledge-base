---
title: "Transactions - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/saving/transactions.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Using Transactions

Transactions allow several database operations to be processed in an atomic manner. If the transaction is committed, all of the operations are successfully applied to the database. If the transaction is rolled back, none of the operations are applied to the database.

> **Tip:**
> You can view this article's sample on GitHub.

## Default transaction behavior

By default, if the database provider supports transactions, all changes in a single call to `SaveChanges` are applied in a transaction. If any of the changes fail, then the transaction is rolled back and none of the changes are applied to the database. This means that `SaveChanges` is guaranteed to either completely succeed, or leave the database unmodified if an error occurs.

For most applications, this default behavior is sufficient. You should only manually control transactions if your application requirements deem it necessary.

## Controlling automatic transactions

You can control whether EF automatically creates a transaction when calling `SaveChanges` and no user transaction exists. Set `Microsoft.EntityFrameworkCore.Infrastructure.DatabaseFacade.AutoTransactionBehavior` to one of the following values:

* `Microsoft.EntityFrameworkCore.AutoTransactionBehavior.WhenNeeded` (default): EF creates a transaction only when needed. For example, most single SQL statements execute in a transaction implicitly, so EF doesn't create an explicit transaction.
* `Microsoft.EntityFrameworkCore.AutoTransactionBehavior.Always`: EF always creates a transaction if no user transaction exists. This may add database roundtrips, which can degrade performance.
* `Microsoft.EntityFrameworkCore.AutoTransactionBehavior.Never`: EF never creates a transaction automatically.

For example, configure EF to always create a transaction before calling `SaveChanges`:

```csharp
context.Database.AutoTransactionBehavior = AutoTransactionBehavior.Always;
```

`Always` can be useful if application code relies on `Microsoft.EntityFrameworkCore.Diagnostics.IDbTransactionInterceptor` transaction creation callbacks being invoked when `SaveChanges` doesn't use a user transaction.

> **Warning:**
> Use `AutoTransactionBehavior.Never` with caution. If `SaveChanges` needs to execute multiple commands and a failure occurs, earlier commands may have already been committed, leaving partial changes in the database.

## Controlling transactions

You can use the `DbContext.Database` API to begin, commit, and rollback transactions. The following example shows two `SaveChanges` operations and a LINQ query being executed in a single transaction:

```csharp
using var context = new BloggingContext();
await using var transaction = await context.Database.BeginTransactionAsync();

try
{
    context.Blogs.Add(new Blog { Url = "http://blogs.msdn.com/dotnet" });
    await context.SaveChangesAsync();

    context.Blogs.Add(new Blog { Url = "http://blogs.msdn.com/visualstudio" });
    await context.SaveChangesAsync();

    var blogs = await context.Blogs
        .OrderBy(b => b.Url)
        .ToListAsync();

    // Commit transaction if all commands succeed, transaction will auto-rollback
    // when disposed if either commands fails
    await transaction.CommitAsync();
}
catch (Exception)
{
    // TODO: Handle failure
}
```

While all relational database providers support transactions, other providers types may throw or no-op when transaction APIs are called.

> **Note:**
> Manually controlling transactions in this way is incompatible with implicitly invoked retrying execution strategies. See Connection Resiliency for more information.

## Savepoints

When `SaveChanges` is invoked and a transaction is already in progress on the context, EF automatically creates a *savepoint* before saving any data. Savepoints are points within a database transaction which may later be rolled back to, if an error occurs or for any other reason. If `SaveChanges` encounters any error, it automatically rolls the transaction back to the savepoint, leaving the transaction in the same state as if it had never started. This allows you to possibly correct issues and retry saving, in particular when optimistic concurrency issues occur.

> **Warning:**
> Savepoints are incompatible with SQL Server's Multiple Active Result Sets (MARS). Savepoints will not be created by EF when MARS is enabled on the connection, even if MARS is not actively in use. If an error occurs during SaveChanges, the transaction may be left in an unknown state.

It's also possible to manually manage savepoints, just as it is with transactions. The following example creates a savepoint within a transaction, and rolls back to it on failure:

```csharp
using var context = new BloggingContext();
await using var transaction = await context.Database.BeginTransactionAsync();

try
{
    context.Blogs.Add(new Blog { Url = "https://devblogs.microsoft.com/dotnet/" });
    await context.SaveChangesAsync();

    await transaction.CreateSavepointAsync("BeforeMoreBlogs");

    context.Blogs.Add(new Blog { Url = "https://devblogs.microsoft.com/visualstudio/" });
    context.Blogs.Add(new Blog { Url = "https://devblogs.microsoft.com/aspnet/" });
    await context.SaveChangesAsync();

    await transaction.CommitAsync();
}
catch (Exception)
{
    // If a failure occurred, we rollback to the savepoint and can continue the transaction
    await transaction.RollbackToSavepointAsync("BeforeMoreBlogs");

    // TODO: Handle failure, possibly retry inserting blogs
}
```

## Cross-context transaction

You can also share a transaction across multiple context instances. This functionality is only available when using a relational database provider because it requires the use of `DbTransaction` and `DbConnection`, which are specific to relational databases.

To share a transaction, the contexts must share both a `DbConnection` and a `DbTransaction`.

### Allow connection to be externally provided

Sharing a `DbConnection` requires the ability to pass a connection into a context when constructing it.

The easiest way to allow `DbConnection` to be externally provided, is to stop using the `DbContext.OnConfiguring` method to configure the context and externally create `DbContextOptions` and pass them to the context constructor.

> **Tip:**
> `DbContextOptionsBuilder` is the API you used in `DbContext.OnConfiguring` to configure the context, you are now going to use it externally to create `DbContextOptions`.

```csharp
public class BloggingContext : DbContext
{
    public BloggingContext(DbContextOptions<BloggingContext> options)
        : base(options)
    {
    }

    public DbSet<Blog> Blogs { get; set; }
}
```

An alternative is to keep using `DbContext.OnConfiguring`, but accept a `DbConnection` that is saved and then used in `DbContext.OnConfiguring`.

```csharp
public class BloggingContext : DbContext
{
    private DbConnection _connection;

    public BloggingContext(DbConnection connection)
    {
      _connection = connection;
    }

    public DbSet<Blog> Blogs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connection);
    }
}
```

### Share connection and transaction

You can now create multiple context instances that share the same connection. Then use the `DbContext.Database.UseTransaction(DbTransaction)` API to enlist both contexts in the same transaction.

```csharp
using var connection = new SqlConnection(connectionString);
var options = new DbContextOptionsBuilder<BloggingContext>()
    .UseSqlServer(connection)
    .Options;

using var context1 = new BloggingContext(options);
await using var transaction = await context1.Database.BeginTransactionAsync();
try
{
    context1.Blogs.Add(new Blog { Url = "http://blogs.msdn.com/dotnet" });
    await context1.SaveChangesAsync();

    using (var context2 = new BloggingContext(options))
    {
        await context2.Database.UseTransactionAsync(transaction.GetDbTransaction());

        var blogs = await context2.Blogs
            .OrderBy(b => b.Url)
            .ToListAsync();

        context2.Blogs.Add(new Blog { Url = "http://dot.net" });
        await context2.SaveChangesAsync();
    }

    // Commit transaction if all commands succeed, transaction will auto-rollback
    // when disposed if either commands fails
    await transaction.CommitAsync();
}
catch (Exception)
{
    // TODO: Handle failure
}
```

## Using external DbTransactions (relational databases only)

If you are using multiple data access technologies to access a relational database, you may want to share a transaction between operations performed by these different technologies.

The following example, shows how to perform an ADO.NET SqlClient operation and an Entity Framework Core operation in the same transaction.

```csharp
using var connection = new SqlConnection(connectionString);
await connection.OpenAsync();

await using var transaction = (SqlTransaction)await connection.BeginTransactionAsync();
try
{
    // Run raw ADO.NET command in the transaction
    var command = connection.CreateCommand();
    command.Transaction = transaction;
    command.CommandText = "DELETE FROM dbo.Blogs";
    command.ExecuteNonQuery();

    // Run an EF Core command in the transaction
    var options = new DbContextOptionsBuilder<BloggingContext>()
        .UseSqlServer(connection)
        .Options;

    using (var context = new BloggingContext(options))
    {
        await context.Database.UseTransactionAsync(transaction);
        context.Blogs.Add(new Blog { Url = "http://blogs.msdn.com/dotnet" });
        await context.SaveChangesAsync();
    }

    // Commit transaction if all commands succeed, transaction will auto-rollback
    // when disposed if either commands fails
    await transaction.CommitAsync();
}
catch (Exception)
{
    // TODO: Handle failure
}
```

## Using System.Transactions

It is possible to use ambient transactions if you need to coordinate across a larger scope.

```csharp
using (var scope = new TransactionScope(
           TransactionScopeOption.Required,
           new TransactionOptions { IsolationLevel = IsolationLevel.ReadCommitted }))
{
    using var connection = new SqlConnection(connectionString);
    await connection.OpenAsync();

    try
    {
        // Run raw ADO.NET command in the transaction
        var command = connection.CreateCommand();
        command.CommandText = "DELETE FROM dbo.Blogs";
        await command.ExecuteNonQueryAsync();

        // Run an EF Core command in the transaction
        var options = new DbContextOptionsBuilder<BloggingContext>()
            .UseSqlServer(connection)
            .Options;

        using (var context = new BloggingContext(options))
        {
            context.Blogs.Add(new Blog { Url = "http://blogs.msdn.com/dotnet" });
            await context.SaveChangesAsync();
        }

        // Commit transaction if all commands succeed, transaction will auto-rollback
        // when disposed if either commands fails
        scope.Complete();
    }
    catch (Exception)
    {
        // TODO: Handle failure
    }
}
```

It is also possible to enlist in an explicit transaction.

```csharp
using (var transaction = new CommittableTransaction(
           new TransactionOptions { IsolationLevel = IsolationLevel.ReadCommitted }))
{
    var connection = new SqlConnection(connectionString);

    try
    {
        var options = new DbContextOptionsBuilder<BloggingContext>()
            .UseSqlServer(connection)
            .Options;

        using (var context = new BloggingContext(options))
        {
            await context.Database.OpenConnectionAsync();
            context.Database.EnlistTransaction(transaction);

            // Run raw ADO.NET command in the transaction
            var command = connection.CreateCommand();
            command.CommandText = "DELETE FROM dbo.Blogs";
            await command.ExecuteNonQueryAsync();

            // Run an EF Core command in the transaction
            context.Blogs.Add(new Blog { Url = "http://blogs.msdn.com/dotnet" });
            await context.SaveChangesAsync();
            await context.Database.CloseConnectionAsync();
        }

        // Commit transaction if all commands succeed, transaction will auto-rollback
        // when disposed if either commands fails
        transaction.Commit();
    }
    catch (Exception)
    {
        // TODO: Handle failure
    }
}
```

> **Note:**
> If you're using async APIs, be sure to specify TransactionScopeAsyncFlowOption.Enabled in the `TransactionScope` constructor to ensure that the ambient transaction flows across async calls.

For more information on `TransactionScope` and ambient transactions, see this documentation.

### Limitations of System.Transactions

1. EF Core relies on database providers to implement support for System.Transactions. If a provider does not implement support for System.Transactions, it is possible that calls to these APIs will be completely ignored. SqlClient supports it.

   > **Important:**
   > It is recommended that you test that the API behaves correctly with your provider before you rely on it for managing transactions. You are encouraged to contact the maintainer of the database provider if it does not.

2. Distributed transaction support in System.Transactions was added to .NET 7.0 for Windows only. Any attempt to use distributed transactions on older .NET versions or on non-Windows platforms will fail.

3. TransactionScope does not support async commit/rollback; that means that disposing it synchronously blocks the executing thread until the operation is complete.
