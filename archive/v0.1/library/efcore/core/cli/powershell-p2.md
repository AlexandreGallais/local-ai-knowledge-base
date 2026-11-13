---
title: "EF Core tools reference (Package Manager Console) - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/cli/powershell.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# EF Core tools reference (Package Manager Console) - EF Core (part 2 of 2)

## Scaffold-DbContext

Generates code for a `DbContext` and entity types for a database. In order for `Scaffold-DbContext` to generate an entity type, the database table must have a primary key.

Parameters:

| Parameter                                 | Description                                                                                                                                                                                                                                                                  |
|:------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <nobr>`-Connection <String>`</nobr>       | The connection string to the database. The value can be *name=\<name of connection string>*. In that case the name comes from the configuration sources that are set up for the project. This is a positional parameter and is required.      |
| <nobr>`-Provider <String>`</nobr>         | The provider to use. Typically this is the name of the NuGet package, for example: `Microsoft.EntityFrameworkCore.SqlServer`. This is a positional parameter and is required.                                                                                                |
| <nobr>`-OutputDir <String>`</nobr>        | The directory to put entity class files in. Paths are relative to the project directory.                                                                                                                                                                                     |
| <nobr>`-ContextDir <String>`</nobr>       | The directory to put the `DbContext` file in. Paths are relative to the project directory.                                                                                                                                                                                   |
| <nobr>`-Namespace <String>`</nobr>        | The namespace to use for all generated classes. Defaults to generated from the root namespace and the output directory.                                                                                                                                                      |
| <nobr>`-ContextNamespace <String>`</nobr> | The namespace to use for the generated `DbContext` class. Note: overrides `-Namespace`.                                                                                                                                                                                      |
| <nobr>`-Context <String>`</nobr>          | The name of the `DbContext` class to generate.                                                                                                                                                                                                                               |
| <nobr>`-Schemas <String[]>`</nobr>        | The schemas of tables and views to generate entity types for. If this parameter is omitted, all schemas are included. If this option is used, then all tables and views in the schemas will be included in the model, even if they are not explicitly included using -Table. |
| <nobr>`-Tables <String[]>`</nobr>         | The tables and views to generate entity types for. Tables or views in a specific schema can be included using the 'schema.table' or 'schema.view' format. If this parameter is omitted, all tables and views are included.                                                   |
| <nobr>`-DataAnnotations`</nobr>           | Use attributes to configure the model (where possible). If this parameter is omitted, only the fluent API is used.                                                                                                                                                           |
| <nobr>`-UseDatabaseNames`</nobr>          | Use table, view, sequence, and column names exactly as they appear in the database. If this parameter is omitted, database names are changed to more closely conform to C# name style conventions.                                                                           |
| <nobr>`-Force`</nobr>                     | Overwrite existing files.                                                                                                                                                                                                                                                    |
| <nobr>`-NoOnConfiguring`</nobr>           | Don't generate `DbContext.OnConfiguring`.                                                                                                                                                                                                                                    |
| <nobr>`-NoPluralize`</nobr>               | Don't use the pluralizer.                                                                                                                                                                                                                                                    |

The common parameters are listed above.

Example:

```powershell
Scaffold-DbContext "Server=(localdb)\mssqllocaldb;Database=Blogging;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models
```

Example that scaffolds only selected tables and creates the context in a separate folder with a specified name and namespace:

```powershell
Scaffold-DbContext "Server=(localdb)\mssqllocaldb;Database=Blogging;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Tables "Blog","Post" -ContextDir Context -Context BlogContext -ContextNamespace New.Namespace
```

The following example reads the connection string using Configuration.

```powershell
Scaffold-DbContext "Name=ConnectionStrings:Blogging" Microsoft.EntityFrameworkCore.SqlServer
```

## Script-DbContext

Generates a SQL script from the DbContext. Bypasses any migrations.

Parameters:

| Parameter                       | Description                      |
| ------------------------------- | -------------------------------- |
| <nobr>`-Output <String>`</nobr> | The file to write the result to. |

The common parameters are listed above.

## Script-Migration

Generates a SQL script that applies all of the changes from one selected migration to another selected migration.

Parameters:

| Parameter                    | Description                                                                                                                                                                                                                |
|:------------------------------- |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <nobr>`-From <String>`</nobr>   | The starting migration. Migrations may be identified by name or by ID. The number 0 is a special case that means *before the first migration*. Defaults to 0.                                                              |
| <nobr>`-To <String>`</nobr>     | The ending migration. Defaults to the last migration.                                                                                                                                                                      |
| <nobr>`-Idempotent`</nobr>      | Generate a script that can be used on a database at any migration.                                                                                                                                                         |
| <nobr>`-NoTransactions`</nobr>  | Don't generate SQL transaction statements.                                                                                                                                                           |
| <nobr>`-Output <String>`</nobr> | The file to write the result to. IF this parameter is omitted, the file is created with a generated name in the same folder as the app's runtime files are created, for example: */obj/Debug/netcoreapp2.1/ghbkztfz.sql/*. |

The common parameters are listed above.

> **Tip:**
> The `To`, `From`, and `Output` parameters support tab-expansion.

The following example creates a script for the InitialCreate migration (from a database without any migrations), using the migration name.

```powershell
Script-Migration 0 InitialCreate
```

The following example creates a script for all migrations after the InitialCreate migration, using the migration ID.

```powershell
Script-Migration 20180904195021_InitialCreate
```

## Update-Database

Updates the database to the last migration or to a specified migration.

| Parameter                           | Description                                                                                                                                                                                                                                                     |
|:------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <nobr>`-Migration <String>`</nobr>  | The target migration. Migrations may be identified by name or by ID. The number 0 is a special case that means *before the first migration* and causes all migrations to be reverted. If no migration is specified, the command defaults to the last migration. |
| <nobr>`-Connection <String>`</nobr> | The connection string to the database. Defaults to the one specified in `AddDbContext` or `OnConfiguring`.                                                                                                                                |
| <nobr>`-Add`</nobr>                 | Creates a new migration and applies it to the database in a single step. Uses Roslyn to compile the migration at runtime. When specified, a migration name is required and provides the name for the new migration. Added in EF Core 11. |
| <nobr>`-OutputDir <String>`</nobr>  | The directory to put migration files in. Paths are relative to the target project directory. Requires `-Add`. Added in EF Core 11. |
| <nobr>`-Namespace <String>`</nobr>  | The namespace to use for the generated migration classes. Requires `-Add`. Added in EF Core 11. |
| <nobr>`-NoBuild`</nobr>             | Don't build the project before running the command. Intended to be used when the build is up-to-date. Added in EF Core 11. |

The common parameters are listed above.

> **Warning:**
> `-Migration` specifies the state the database should be in after the command completes. If the database is currently at a newer migration, the command reverts every migration newer than the target by executing its `Down` operations. It doesn't apply one older migration out of order.

> **Tip:**
> The `Migration` parameter supports tab-expansion.

The following example reverts all migrations.

```powershell
Update-Database 0
```

The following examples update the database to a specified migration. The first uses the migration name and the second uses the migration ID and a specified connection:

```powershell
Update-Database InitialCreate
Update-Database 20180904195021_InitialCreate -Connection your_connection_string
```

The following example creates a new migration and applies it to the database in one step:

```powershell
Update-Database -Migration InitialCreate -Add
```

## Additional resources

* Migrations
* Reverse Engineering
* Compiled models
