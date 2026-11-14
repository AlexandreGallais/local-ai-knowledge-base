---
title: "Managing Migrations - EF Core (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/managing-schemas/migrations/managing.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Managing Migrations

As your model changes, migrations are added and removed as part of normal development, and the migration files are checked into your project's source control. To manage migrations, you must first install the EF Core command-line tools.

> **Tip:**
> If the `DbContext` is in a different assembly than the startup project, you can explicitly specify the target and startup projects in either the Package Manager Console tools or the .NET CLI tools.

## Add a migration

After your model has been changed, you can add a migration for that change:

### .NET CLI

```dotnetcli
dotnet ef migrations add AddBlogCreatedTimestamp
```

### Visual Studio

```powershell
Add-Migration AddBlogCreatedTimestamp
```

***

The migration name can be used like a commit message in a version control system. For example, you might choose a name like *AddBlogCreatedTimestamp* if the change is a new `CreatedTimestamp` property on your `Blog` entity.

Three files are added to your project under the **Migrations** directory:

* **XXXXXXXXXXXXXX_AddBlogCreatedTimestamp.cs**--The main migrations file. Contains the operations necessary to apply the migration (in `Up`) and to revert it (in `Down`).
* **XXXXXXXXXXXXXX_AddBlogCreatedTimestamp.Designer.cs**--The migrations metadata file. Contains information used by EF.
* **MyContextModelSnapshot.cs**--A snapshot of your current model. Used to determine what changed when adding the next migration.

The timestamp in the filename helps keep them ordered chronologically so you can see the progression of changes.

### Namespaces

You are free to move Migrations files and change their namespace manually. New migrations are created as siblings of the last migration. Alternatively, you can specify the directory at generation time as follows:

#### .NET CLI

```dotnetcli
dotnet ef migrations add InitialCreate --output-dir Your/Directory
```

> **Note:**
> You can also change the namespace independently of the directory using `--namespace`.

#### Visual Studio

```powershell
Add-Migration InitialCreate -OutputDir Your\Directory
```

> **Note:**
> You can also change the namespace independently of the directory using `-Namespace`.

***

## Create and apply a migration in one step

> **Note:**
> This feature was added in EF Core 11.

The `dotnet ef database update` command supports creating and applying a migration in a single step using the `--add` option. This uses Roslyn to compile the migration at runtime, enabling scenarios like .NET Aspire and containerized applications where the application cannot be stopped and rebuilt:

### .NET CLI

```dotnetcli
dotnet ef database update InitialCreate --add
```

The same options available for `dotnet ef migrations add` can be used:

```dotnetcli
dotnet ef database update AddProducts --add --output-dir Migrations/Products --namespace MyApp.Migrations
```

### Visual Studio

```powershell
Update-Database -Migration InitialCreate -Add
```

***

This command scaffolds a new migration with the specified name, compiles it using Roslyn, and immediately applies it to the database. The migration files are still saved to disk for source control and future recompilation.

If no pending model changes are detected, the command applies any existing pending migrations without creating a new one.

## Customize migration code

While EF Core generally creates accurate migrations, you should always review the code and make sure it corresponds to the desired change; in some cases, it is even necessary to do so.

### Column renames

One notable example where customizing migrations is required is when renaming a property. For example, if you rename a property from `Name` to `FullName`, EF Core will generate the following migration:

```csharp
migrationBuilder.DropColumn(
    name: "Name",
    table: "Customers");

migrationBuilder.AddColumn<string>(
    name: "FullName",
    table: "Customers",
    nullable: true);
```

EF Core is generally unable to know when the intention is to drop a column and create a new one (two separate changes), and when a column should be renamed. If the above migration is applied as-is, all your customer names will be lost. To rename a column, replace the above generated migration with the following:

```csharp
migrationBuilder.RenameColumn(
    name: "Name",
    table: "Customers",
    newName: "FullName");
```

> **Tip:**
> The migration scaffolding process warns when an operation might result in data loss (like dropping a column). If you see that warning, be especially sure to review the migrations code for accuracy.

### Data operations

Migrations can move data as well as change the schema. Choose the operation based on whether the values are known when the migration is written:

* Use `InsertData`, `UpdateData`, and `DeleteData` for fixed values and rows identified by explicit keys. EF Core translates these operations into provider-specific SQL, so they also work when generating scripts and bundles.
* Use `Sql` when the new values must be calculated from existing database data. SQL syntax can differ by provider; branch on `MigrationBuilder.ActiveProvider` when necessary.
* Define a custom migration operation when a reusable operation needs provider-specific SQL generation.

Don't use the current `DbContext` or entity CLR types to move data in a migration. Historical migrations must continue to compile and behave the same after those types are changed or removed.

#### Transform existing data

When replacing columns, preserve the source data until the destination has been populated:

1. Add the destination column as nullable.
2. Populate it from the existing columns.
3. Make the destination column required, if appropriate.
4. Drop the source columns.

The following migration implements that sequence for SQL Server and SQLite:

```csharp
migrationBuilder.AddColumn<string>(
    name: "FullName",
    table: "Customers",
    nullable: true);

if (migrationBuilder.ActiveProvider == "Microsoft.EntityFrameworkCore.SqlServer")
{
    migrationBuilder.Sql(
        """
        UPDATE [Customers]
        SET [FullName] = [FirstName] + N' ' + [LastName];
        """);
}
else if (migrationBuilder.ActiveProvider == "Microsoft.EntityFrameworkCore.Sqlite")
{
    migrationBuilder.Sql(
        """
        UPDATE "Customers"
        SET "FullName" = "FirstName" || ' ' || "LastName";
        """);
}
else
{
    throw new NotSupportedException(
        $"Data migration is not implemented for provider {migrationBuilder.ActiveProvider}.");
}

migrationBuilder.AlterColumn<string>(
    name: "FullName",
    table: "Customers",
    nullable: false,
    oldClrType: typeof(string),
    oldNullable: true);

migrationBuilder.DropColumn(
    name: "FirstName",
    table: "Customers");

migrationBuilder.DropColumn(
    name: "LastName",
    table: "Customers");
```

Add a branch for every provider the application supports. Throwing for an unknown provider is safer than silently applying an incomplete migration. Don't build SQL from untrusted values; migration SQL is executed with schema-changing privileges.

Some transformations cannot be reversed without losing information. Implement `Down` only when the original values can be reconstructed safely. Otherwise, fail explicitly and require restoring the data from a backup as part of the rollback procedure.

#### Insert fixed data

Use `InsertData` when the keys and values are known when the migration is written:

```csharp
migrationBuilder.InsertData(
    table: "Countries",
    columns: new[] { "CountryId", "Name" },
    values: new object[,]
    {
        { 1, "United States" },
        { 2, "Canada" }
    });
```

The corresponding `Down` method should call `DeleteData` with the same keys.

#### Update fixed data

`UpdateData` identifies a row by its key and sets one or more columns to fixed values:

```csharp
migrationBuilder.UpdateData(
    table: "Countries",
    keyColumn: "CountryId",
    keyValue: 1,
    column: "Name",
    value: "United States of America");
```

The `Down` method should restore the previous values.

#### Delete fixed data

`DeleteData` also identifies rows by key:

```csharp
migrationBuilder.DeleteData(
    table: "Countries",
    keyColumn: "CountryId",
    keyValue: 2);
```

If the delete must be reversible, the `Down` method should use `InsertData` to restore every deleted value. These operations don't query the current database state; use `Sql` or initialization-time seeding when behavior depends on existing data.

### Arbitrary changes via raw SQL

Raw SQL can also be used to manage database objects that EF Core isn't aware of. To do this, add a migration without making any model change; an empty migration will be generated, which you can then populate with raw SQL operations.

For example, the following migration creates a SQL Server stored procedure:

```csharp
migrationBuilder.Sql(
@"
    EXEC ('CREATE PROCEDURE getFullName
        @LastName nvarchar(50),
        @FirstName nvarchar(50)
    AS
        SELECT @LastName + @FirstName;')");
```

> **Tip:**
> `EXEC` is used when a statement must be the first or only one in a SQL batch. It can also be used to work around parser errors in idempotent migration scripts that can occur when referenced columns don't currently exist on a table.

This can be used to manage any aspect of your database, including:

* Stored procedures
* Full-Text Search
* Functions
* Triggers
* Views

In most cases, EF Core will automatically wrap each migration in its own transaction when applying migrations. Unfortunately, some migration operations cannot be performed within a transaction in some databases; for these cases, you may opt out of the transaction by passing `suppressTransaction: true` to `migrationBuilder.Sql`.

> **Note:**
> In EF Core 9, EF Core spans all pending migrations with a single transaction by default (this was reverted in EF Core 10). See the breaking change note for details.

## Remove a migration

Sometimes you add a migration and realize you need to make additional changes to your EF Core model before applying it. To remove the last migration, use this command.

### .NET CLI

```dotnetcli
dotnet ef migrations remove
```

### Visual Studio

```powershell
Remove-Migration
```

***

After removing the migration, you can make the additional model changes and add it again.

> **Warning:**
> Avoid removing any migrations which have already been applied to production databases. Doing so means you won't be able to revert those migrations from the databases, and may break the assumptions made by subsequent migrations.

### If the migration was applied locally

For a disposable development database, first update the database to the previous migration, and then remove the migration from the project. Use `0` as the target when removing the first migration.

#### .NET CLI

```dotnetcli
dotnet ef database update PreviousMigration
dotnet ef migrations remove
```

Alternatively, `--force` performs both steps:

```dotnetcli
dotnet ef migrations remove --force
```

#### Visual Studio

```powershell
Update-Database PreviousMigration
Remove-Migration
```

Alternatively, `-Force` performs both steps:

```powershell
Remove-Migration -Force
```

***

### If the migration was applied to a shared database

Don't delete a migration that has been applied to a shared, test, or production database. Usually, keep the migration in the project and add a new corrective migration. If a planned rollback is required, execute the rollback while the original migration code is still available, and coordinate the application and database deployment.

### Remove an older unapplied migration

The tools remove only the latest migration. Don't delete a migration from the middle of the sequence and hand-edit the model snapshot. If the migration and every migration after it are unpublished and unapplied, remove the later migrations in reverse order, remove the unwanted migration, and then scaffold the retained model changes again.

If the migrations were created on different branches, follow the diverged migration tree workflow instead.

## Listing migrations

You can list all existing migrations as follows:

### .NET CLI

```dotnetcli
dotnet ef migrations list
```

### Visual Studio

```powershell
Get-Migration
```

***

You can also inspect migration state programmatically:

```csharp
var allMigrations = context.Database.GetMigrations();
var appliedMigrations = await context.Database.GetAppliedMigrationsAsync();
var pendingMigrations = await context.Database.GetPendingMigrationsAsync();
```

`GetPendingMigrationsAsync` compares migrations in the configured migrations assembly with the migrations recorded in the target database. It doesn't detect model changes that haven't been captured in a migration; use the pending model changes check below for that.

## Checking for pending model changes

> **Note:**
> This feature was added in EF Core 8.0.

Sometimes you may want to check if there have been any model changes made since the last migration. This can help you know when you or a teammate forgot to add a migration. One way to do that is using this command.

```dotnetcli
dotnet ef migrations has-pending-model-changes
```

You can also perform this check programmatically using `context.Database.HasPendingModelChanges()`. This can be used to write a unit test that fails when you forget to add a migration.

> **Note:**
> Starting with EF Core 9, calling `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.Migrate*` or `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.MigrateAsync*` with pending model changes throws an exception (event ID `Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.PendingModelChangesWarning`). See the applying migrations documentation and the breaking change note for more information.
