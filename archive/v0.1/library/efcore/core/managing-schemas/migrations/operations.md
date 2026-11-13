---
title: "Custom Migrations Operations - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/managing-schemas/migrations/operations.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Custom Migrations Operations

The MigrationBuilder API allows you to perform many different kinds of operations during a migration, but it's far from exhaustive. However, the API is also extensible allowing you to define your own operations. There are two ways to extend the API: Using the `Sql()` method, or by defining custom `MigrationOperation` objects.

## Built-in data operations

Before defining a custom operation, consider the built-in `InsertData`, `UpdateData`, and `DeleteData` operations. They generate provider-specific SQL for fixed values and rows identified by explicit keys. Use `MigrationBuilder.Sql()` for transformations that calculate values from existing database rows.

See Data operations for complete, reversible samples of inserting, updating, deleting, and transforming data in migrations.

To illustrate, let's look at implementing an operation that creates a database user using each approach. In our migrations, we want to enable writing the following code:

```csharp
migrationBuilder.CreateUser("<example-value>", "<example-value>");
```

## Using MigrationBuilder.Sql()

The easiest way to implement a custom operation is to define an extension method that calls `MigrationBuilder.Sql()`. Here is an example that generates the appropriate Transact-SQL.

```csharp
public static OperationBuilder<SqlOperation> CreateUser(
    this MigrationBuilder migrationBuilder,
    string name,
    string password)
    => migrationBuilder.Sql($"<example-value>");
```

> **Tip:**
> On SQL Server, use the `EXEC` function when a statement must be the first or only one in a SQL batch. It might also be needed to work around parser errors in idempotent migration scripts that can occur when referenced columns don't currently exist on a table.

If your migrations need to support multiple database providers, you can use the `MigrationBuilder.ActiveProvider` property. Here's an example supporting both Microsoft SQL Server and PostgreSQL.

```csharp
public static OperationBuilder<SqlOperation> CreateUser(
    this MigrationBuilder migrationBuilder,
    string name,
    string password)
{
    switch (migrationBuilder.ActiveProvider)
    {
        case "Npgsql.EntityFrameworkCore.PostgreSQL":
            return migrationBuilder
                .Sql($"<example-value>");

        case "Microsoft.EntityFrameworkCore.SqlServer":
            return migrationBuilder
                .Sql($"<example-value>");
    }

    throw new Exception("Unexpected provider.");
}
```

This approach only works if you know every provider where your custom operation will be applied.

## Using a MigrationOperation

To decouple the custom operation from the SQL, you can define your own `MigrationOperation` to represent it. The operation is then passed to the provider so it can determine the appropriate SQL to generate.

```csharp
public class CreateUserOperation : MigrationOperation
{
    public string Name { get; set; }
    public string Password { get; set; }
}
```

With this approach, the extension method just needs to add one of these operations to `MigrationBuilder.Operations`.

```csharp
public static OperationBuilder<CreateUserOperation> CreateUser(
    this MigrationBuilder migrationBuilder,
    string name,
    string password)
{
    var operation = new CreateUserOperation { Name = name, Password = <example-value> };
    migrationBuilder.Operations.Add(operation);

    return new OperationBuilder<CreateUserOperation>(operation);
}
```

This approach requires each provider to know how to generate SQL for this operation in their `IMigrationsSqlGenerator` service. Here is an example overriding the SQL Server's generator to handle the new operation.

```csharp
public class MyMigrationsSqlGenerator : SqlServerMigrationsSqlGenerator
{
    public MyMigrationsSqlGenerator(
        MigrationsSqlGeneratorDependencies dependencies,
        ICommandBatchPreparer commandBatchPreparer)
        : base(dependencies, commandBatchPreparer)
    {
    }

    protected override void Generate(
        MigrationOperation operation,
        IModel model,
        MigrationCommandListBuilder builder)
    {
        if (operation is CreateUserOperation createUserOperation)
        {
            Generate(createUserOperation, builder);
        }
        else
        {
            base.Generate(operation, model, builder);
        }
    }

    private void Generate(
        CreateUserOperation operation,
        MigrationCommandListBuilder builder)
    {
        var sqlHelper = Dependencies.SqlGenerationHelper;
        var stringMapping = Dependencies.TypeMappingSource.GetMapping(typeof(string));

        builder
            .Append("CREATE USER ")
            .Append(sqlHelper.DelimitIdentifier(operation.Name))
            .Append("<example-value>")
            .Append(stringMapping.GenerateSqlLiteral(operation.Password))
            .AppendLine(sqlHelper.StatementTerminator)
            .EndCommand();
    }
}
```

Replace the default migrations sql generator service with the updated one.

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder options)
    => options
        .UseSqlServer(_connectionString)
        .ReplaceService<IMigrationsSqlGenerator, MyMigrationsSqlGenerator>();
```
