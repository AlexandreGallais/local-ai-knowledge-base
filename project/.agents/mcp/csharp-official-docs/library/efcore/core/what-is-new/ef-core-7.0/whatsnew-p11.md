---
title: "What's New in EF Core 7.0 (part 11 of 16)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-7.0/whatsnew.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# What's New in EF Core 7.0 (part 11 of 16)

## Stored procedure mapping

By default, EF Core generates insert, update, and delete commands that work directly with tables or updatable views. EF7 introduces support for mapping of these commands to stored procedures.

> **Tip:**
> EF Core has always supported querying via stored procedures. The new support in EF7 is explicitly about using stored procedures for inserts, updates, and deletes.

> **Important:**
> Support for stored procedure mapping does not imply that stored procedures are recommended.

Stored procedures are mapped in `OnModelCreating` using `InsertUsingStoredProcedure`, `UpdateUsingStoredProcedure`, and `DeleteUsingStoredProcedure`. For example, to map stored procedures for a `Person` entity type:

```csharp
modelBuilder.Entity<Person>()
    .InsertUsingStoredProcedure(
        "People_Insert",
        storedProcedureBuilder =>
        {
            storedProcedureBuilder.HasParameter(a => a.Name);
            storedProcedureBuilder.HasResultColumn(a => a.Id);
        })
    .UpdateUsingStoredProcedure(
        "People_Update",
        storedProcedureBuilder =>
        {
            storedProcedureBuilder.HasOriginalValueParameter(person => person.Id);
            storedProcedureBuilder.HasOriginalValueParameter(person => person.Name);
            storedProcedureBuilder.HasParameter(person => person.Name);
            storedProcedureBuilder.HasRowsAffectedResultColumn();
        })
    .DeleteUsingStoredProcedure(
        "People_Delete",
        storedProcedureBuilder =>
        {
            storedProcedureBuilder.HasOriginalValueParameter(person => person.Id);
            storedProcedureBuilder.HasOriginalValueParameter(person => person.Name);
            storedProcedureBuilder.HasRowsAffectedResultColumn();
        });
```

This configuration maps to the following stored procedures when using SQL Server:

**For inserts**

```sql
CREATE PROCEDURE [dbo].[People_Insert]
    @Name [nvarchar](max)
AS
BEGIN
      INSERT INTO [People] ([Name])
      OUTPUT INSERTED.[Id]
      VALUES (@Name);
END
```

**For updates**

```sql
CREATE PROCEDURE [dbo].[People_Update]
    @Id [int],
    @Name_Original [nvarchar](max),
    @Name [nvarchar](max)
AS
BEGIN
    UPDATE [People] SET [Name] = @Name
    WHERE [Id] = @Id AND [Name] = @Name_Original
    SELECT @@ROWCOUNT
END
```

**For deletes**

```sql
CREATE PROCEDURE [dbo].[People_Delete]
    @Id [int],
    @Name_Original [nvarchar](max)
AS
BEGIN
    DELETE FROM [People]
    OUTPUT 1
    WHERE [Id] = @Id AND [Name] = @Name_Original;
END
```

> **Tip:**
> Stored procedures do not need to be used for every type in the model, or for all operations on a given type. For example, if only `DeleteUsingStoredProcedure` is specified for a given type, then EF Core will generate SQL as normal for insert and update operations and only use the stored procedure for deletes.

The first argument passed to each method is the stored procedure name. This can be omitted, in which case EF Core will use the table name appended with "_Insert", "_Update", or "_Delete". So, in the example above, since the table is called "People", the stored procedure names can be removed with no change in functionality.

The second argument is a builder used to configure the input and output of the stored procedure, including parameters, return values, and result columns.

### Parameters

Parameters must be added to the builder in the same order as they appear in the stored procedure definition.

> **Note:**
> Parameters can be named, but EF Core always calls stored procedures using positional arguments rather than named arguments. Vote for Allow configuring sproc mapping to use parameter names for invocation if calling by name is something you are interested in.

The first argument to each parameter builder method specifies the property in the model to which the parameter is bound. This can be a lambda expression:

```csharp
storedProcedureBuilder.HasParameter(a => a.Name);
```

Or a string, which is particularly useful when mapping shadow properties:

```csharp
storedProcedureBuilder.HasParameter("Name");
```

Parameters are, by default, configured for "input". "Output" or "input/output" parameters can be configured using a nested builder. For example:

```csharp
storedProcedureBuilder.HasParameter(
    document => document.RetrievedOn, 
    parameterBuilder => parameterBuilder.IsOutput());
```

There are three different builder methods for different flavors of parameters:

- `HasParameter` specifies a normal parameter bound to the current value of the given property.
- `HasOriginalValueParameter` specifies a parameter bound to the original value of the given property. The original value is the value that the property had when it was queried from the database, if known. If this value is not known, then the current value is used instead. Original value parameters are useful for concurrency tokens.
- `HasRowsAffectedParameter` specifies a parameter used to return the number of rows affected by the stored procedure.

> **Tip:**
> Original value parameters must be used for key <example-value> in "update" and "delete" stored procedures. This ensures that the correct row will be updated in future versions of EF Core that support mutable key values.

### Returning values

EF Core supports three mechanisms for returning values from stored procedures:

- Output parameters, as shown above.
- Result columns, which are specified using the `HasResultColumn` builder method.
- The return value, which is limited to returning the number of rows affected, and is specified using the `HasRowsAffectedReturnValue` builder method.

Values returned from stored procedures are often used for generated, default, or computed values, such as from an `Identity` key or a computed column. For example, the following configuration specifies four result columns:

```csharp
entityTypeBuilder.InsertUsingStoredProcedure(
        storedProcedureBuilder =>
        {
            storedProcedureBuilder.HasParameter(document => document.Title);
            storedProcedureBuilder.HasResultColumn(document => document.Id);
            storedProcedureBuilder.HasResultColumn(document => document.FirstRecordedOn);
            storedProcedureBuilder.HasResultColumn(document => document.RetrievedOn);
            storedProcedureBuilder.HasResultColumn(document => document.RowVersion);
        });
```

These are used to return:

- The generated key value for the `Id` property.
- The default value generated by the database for the `FirstRecordedOn` property.
- The computed value generated by the database for the `RetrievedOn` property.
- The automatically generated `rowversion` concurrency token for the `RowVersion` property.

This configuration maps to the following stored procedure when using SQL Server:

```sql
CREATE PROCEDURE [dbo].[Documents_Insert]
    @Title [nvarchar](max)
AS
BEGIN
    INSERT INTO [Documents] ([Title])
    OUTPUT INSERTED.[Id], INSERTED.[FirstRecordedOn], INSERTED.[RetrievedOn], INSERTED.[RowVersion]
    VALUES (@Title);
END
```

### Optimistic concurrency

Optimistic concurrency works the same way with stored procedures as it does without. The stored procedure should:

- Use a concurrency token in a `WHERE` clause to ensure that the row is only updated if it has a valid token. The value used for the concurrency token is typically, but does not have to be, the original value of the concurrency token property.
- Return the number of rows affected so that EF Core can compare this against the expected number of rows affected and throw a `DbUpdateConcurrencyException` if the values do not match.

For example, the following SQL Server stored procedure uses a `rowversion` automatic concurrency token:

```sql
CREATE PROCEDURE [dbo].[Documents_Update]
    @Id [int],
    @RowVersion_Original [rowversion],
    @Title [nvarchar](max),
    @RowVersion [rowversion] OUT
AS
BEGIN
    DECLARE @TempTable table ([RowVersion] varbinary(8));
    UPDATE [Documents] SET
        [Title] = @Title
    OUTPUT INSERTED.[RowVersion] INTO @TempTable
    WHERE [Id] = @Id AND [RowVersion] = @RowVersion_Original
    SELECT @@ROWCOUNT;
    SELECT @RowVersion = [RowVersion] FROM @TempTable;
END
```

This is configured in EF Core using:

```csharp
.UpdateUsingStoredProcedure(
    storedProcedureBuilder =>
    {
        storedProcedureBuilder.HasOriginalValueParameter(document => document.Id);
        storedProcedureBuilder.HasOriginalValueParameter(document => document.RowVersion);
        storedProcedureBuilder.HasParameter(document => document.Title);
        storedProcedureBuilder.HasParameter(document => document.RowVersion, parameterBuilder => parameterBuilder.IsOutput());
        storedProcedureBuilder.HasRowsAffectedResultColumn();
    });
```

Notice that:

- The original value of the `RowVersion` concurrency token is used.
- The stored procedure uses a `WHERE` clause to ensure that the row is only updated if the `RowVersion` original value matches.
- The new generated value for the `RowVersion` is inserted into a temporary table.
- The number of rows affected (`@@ROWCOUNT`) and the generated `RowVersion` value are returned.

### Mapping inheritance hierarchies to stored procedures

EF Core requires that stored procedures follow the table layout for types in a hierarchy. This means that:

- A hierarchy mapped using TPH must have a single insert, update, and/or delete stored procedure targeting the single mapped table. The insert and update stored procedures must have a parameter for the discriminator value.
- A hierarchy mapped using TPT must have an insert, update, and/or delete stored procedure for every type, including abstract types. EF Core will make multiple calls as needed to update, insert, and delete rows in all tables.
- A hierarchy mapped using TPC must have an insert, update, and/or delete stored procedure for every concrete type, but not abstract types.

> **Note:**
> If using a single stored procedure per concrete type regardless of the mapping strategy is something you are interested in, then vote for Support using a single sproc per concrete type regardless of the inheritance mapping strategy.

### Mapping owned types to stored procedures

Configuration of stored procedures for owned types is done in the nested owned type builder. For example:

```csharp
modelBuilder.Entity<Person>(
    entityTypeBuilder =>
    {
        entityTypeBuilder.OwnsOne(
            author => author.Contact,
            ownedNavigationBuilder =>
            {
                ownedNavigationBuilder.ToTable("Contacts");
                ownedNavigationBuilder
                    .InsertUsingStoredProcedure(
                        storedProcedureBuilder =>
                        {
                            storedProcedureBuilder.HasParameter("PersonId");
                            storedProcedureBuilder.HasParameter(contactDetails => contactDetails.Phone);
                        })
                    .UpdateUsingStoredProcedure(
                        storedProcedureBuilder =>
                        {
                            storedProcedureBuilder.HasOriginalValueParameter("PersonId");
                            storedProcedureBuilder.HasParameter(contactDetails => contactDetails.Phone);
                            storedProcedureBuilder.HasRowsAffectedResultColumn();
                        })
                    .DeleteUsingStoredProcedure(
                        storedProcedureBuilder =>
                        {
                            storedProcedureBuilder.HasOriginalValueParameter("PersonId");
                            storedProcedureBuilder.HasRowsAffectedResultColumn();
            });
    });
```

> **Note:**
> Currently stored procedures for insert, update, and delete only support owned types must be mapped to separate tables. That is, the owned type cannot be represented by columns in the owner table. Vote for Add "table" splitting support to CUD sproc mapping if this is a limitation that you would like to see removed.

### Mapping many-to-many join entities to stored procedures

Configuration of stored procedures many-to-many join entities can be performed as part of the many-to-many configuration. For example:

```csharp
modelBuilder.Entity<Book>(
    entityTypeBuilder =>
    {
        entityTypeBuilder
            .HasMany(document => document.Authors)
            .WithMany(author => author.PublishedWorks)
            .UsingEntity<Dictionary<string, object>>(
                "BookPerson",
                builder => builder.HasOne<Person>().WithMany().OnDelete(DeleteBehavior.Cascade),
                builder => builder.HasOne<Book>().WithMany().OnDelete(DeleteBehavior.ClientCascade),
                joinTypeBuilder =>
                {
                    joinTypeBuilder
                        .InsertUsingStoredProcedure(
                            storedProcedureBuilder =>
                            {
                                storedProcedureBuilder.HasParameter("AuthorsId");
                                storedProcedureBuilder.HasParameter("PublishedWorksId");
                            })
                        .DeleteUsingStoredProcedure(
                            storedProcedureBuilder =>
                            {
                                storedProcedureBuilder.HasOriginalValueParameter("AuthorsId");
                                storedProcedureBuilder.HasOriginalValueParameter("PublishedWorksId");
                                storedProcedureBuilder.HasRowsAffectedResultColumn();
                            });
                });
    });
```
