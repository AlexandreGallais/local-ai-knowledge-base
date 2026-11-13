---
title: "EF Core tools reference (.NET CLI) - EF Core (part 2 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/cli/dotnet.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# EF Core tools reference (.NET CLI) - EF Core (part 2 of 3)

## `dotnet ef dbcontext optimize`

Generates a compiled version of the model used by the `DbContext` and precompiles queries.

See Compiled models for more information.

Options:

| Option                                               | Short | Description                                                                                                                                                                    |
|:-----------------------------------------------------|:------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <nobr>`--output-dir `</nobr>       | `-o`              | The directory to put files in. Paths are relative to the project directory.                                                                                       |
| <nobr>`--namespace <NAMESPACE>`</nobr>   | `-n`              | The namespace to use for all generated classes. Defaults to generated from the root namespace and the output directory plus `CompiledModels`.                                  |
| <nobr>`--suffix <SUFFIX>`</nobr>         |                   | The suffix to attach to the name of all the generated files. E.g. `.g` could be used to indicate that these files contain generated code                                            |
| <nobr>`--no-scaffold`</nobr>             |                   | Don't generate a compiled model. This is used when the compiled model has already been generated.                                                                       |
| <nobr>`--precompile-queries`</nobr>      |                   | Generate precompiled queries. This is required for NativeAOT compilation if the target project contains any queries                                                           |
| <nobr>`--nativeaot`</nobr>               |                   | Generate additional code in the compiled model required for NativeAOT compilation and precompiled queries                                                           |

> **Note:**
> NativeAOT support and precompiled queries are considered experimental in EF 9 and could change dramatically in the next release.

The common options are listed above.

The following example uses the default settings and works if there is only one `DbContext` in the project:

```dotnetcli
dotnet ef dbcontext optimize
```

The following example optimizes the model for the context with the specified name and places it in a separate folder and namespace:

```dotnetcli
dotnet ef dbcontext optimize -o Models -n BlogModels -c BlogContext
```

## `dotnet ef dbcontext scaffold`

Generates code for a `DbContext` and entity types for a database. In order for this command to generate an entity type, the database table must have a primary key.

Arguments:

| Argument                    | Description                                                                                                                                                                                                             |
|:----------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <nobr>`<CONNECTION>`</nobr> | The connection string to the database. For ASP.NET Core 2.x projects, the value can be *name=\<name of connection string>*. In that case the name comes from the configuration sources that are set up for the project. |
| `<PROVIDER>`                | The provider to use. Typically this is the name of the NuGet package, for example: `Microsoft.EntityFrameworkCore.SqlServer`.                                                                                           |

Options:

| Option                                         | Short             | Description                                                                                                                                                                                                                                                                                                                             |
|:-----------------------------------------------|:------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <nobr>`--data-annotations`</nobr>              | <nobr>`-d`</nobr> | Use attributes to configure the model (where possible). If this option is omitted, only the fluent API is used.                                                                                                                                                                                                                         |
| <nobr>`--context <NAME>`</nobr>                | `-c`              | The name of the `DbContext` class to generate.                                                                                                                                                                                                                                                                                          |
| <nobr>`--context-dir `</nobr>            |                   | The directory to put the `DbContext` class file in. Paths are relative to the project directory. Namespaces are derived from the folder names.                                                                                                                                                                                          |
| <nobr>`--context-namespace <NAMESPACE>`</nobr> |                   | The namespace to use for the generated `DbContext` class. Note: overrides `--namespace`.                                                                                                                                                                                                                                                |
| <nobr>`--force`</nobr>                         | `-f`              | Overwrite existing files.                                                                                                                                                                                                                                                                                                               |
| <nobr>`--output-dir `</nobr>             | `-o`              | The directory to put entity class files in. Paths are relative to the project directory.                                                                                                                                                                                                                                                |
| <nobr>`--namespace <NAMESPACE>`</nobr>         | `-n`              | The namespace to use for all generated classes. Defaults to generated from the root namespace and the output directory.                                                                                                                                                                                                                 |
| <nobr>`--schema <SCHEMA_NAME>...`</nobr>       |                   | The schemas of tables and views to generate entity types for. To specify multiple schemas, repeat `--schema` for each one. If this option is omitted, all schemas are included. If this option is used, then all tables and views in the schemas will be included in the model, even if they are not explicitly included using --table. |
| <nobr>`--table <TABLE_NAME>...`</nobr>         | `-t`              | The tables and views to generate entity types for. To specify multiple tables, repeat `-t` or `--table` for each one. Tables or views in a specific schema can be included using the 'schema.table' or 'schema.view' format. If this option is omitted, all tables and views are included.                                              |
| <nobr>`--use-database-names`</nobr>            |                   | Use table, view, sequence, and column names exactly as they appear in the database. If this option is omitted, database names are changed to more closely conform to C# name style conventions.                                                                                                                                         |
| <nobr>`--no-onconfiguring`</nobr>              |                   | Suppresses generation of the `OnConfiguring` method in the generated `DbContext` class.                                                                                                                                                                                                                                                 |
| <nobr>`--no-pluralize`</nobr>                  |                   | Don't use the pluralizer.                                                                                                                                                                                                                                                                                                               |

The common options are listed above.

The following example scaffolds all schemas and tables and puts the new files in the *Models* folder.

```dotnetcli
dotnet ef dbcontext scaffold "Server=(localdb)\mssqllocaldb;Database=Blogging;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -o Models
```

The following example scaffolds only selected tables and creates the context in a separate folder with a specified name and namespace:

```dotnetcli
dotnet ef dbcontext scaffold "Server=(localdb)\mssqllocaldb;Database=Blogging;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -o Models -t Blog -t Post --context-dir Context -c BlogContext --context-namespace New.Namespace
```

The following example reads the connection string from the project's configuration set using the Secret Manager tool.

```dotnetcli
dotnet user-secrets set ConnectionStrings:Blogging "Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=Blogging"
dotnet ef dbcontext scaffold Name=ConnectionStrings:Blogging Microsoft.EntityFrameworkCore.SqlServer
```

The following example skips scaffolding an `OnConfiguring` method. This can be useful when you want to configure the DbContext outside of the class. For example, ASP.NET Core apps typically configure it in Startup.ConfigureServices.

```dotnetcli
dotnet ef dbcontext scaffold "Server=(localdb)\mssqllocaldb;Database=Blogging;Integrated Security=true;" Microsoft.EntityFrameworkCore.SqlServer --no-onconfiguring
```

## `dotnet ef dbcontext script`

Generates a SQL script from the DbContext. Bypasses any migrations.

Options:

| Option                         | Short             | Description                      |
| ------------------------------ | ----------------- | -------------------------------- |
| <nobr>`--output <FILE>`</nobr> | <nobr>`-o`</nobr> | The file to write the result to. |

The common options are listed above.

## `dotnet ef migrations add`

Adds a new migration.

Arguments:

| Argument              | Description                |
|:----------------------|:---------------------------|
| <nobr>`<NAME>`</nobr> | The name of the migration. |

Options:

| Option                                 | Short             | Description                                                                                                            |
|:---------------------------------------|:------------------|:-----------------------------------------------------------------------------------------------------------------------|
| <nobr>`--output-dir `</nobr>     | <nobr>`-o`</nobr> | The directory use to output the files. Paths are relative to the target project directory. Defaults to "Migrations".   |
| <nobr>`--namespace <NAMESPACE>`</nobr> | `-n`              | The namespace to use for the generated classes. Defaults to generated from the output directory.  |

The common options are listed above.

## `dotnet ef migrations bundle`

Creates an executable to update the database.

Options:

Option                                               | Short             | Description
---------------------------------------------------- | ----------------- | -----------
`--output <FILE>`                                    | <nobr>`-o`</nobr> | The path of executable file to create.
`--force`                                            | `-f`              | Overwrite existing files.
`--self-contained`                                   |                   | Also bundle the .NET runtime so it doesn't need to be installed on the machine.
<nobr>`--target-runtime <RUNTIME_IDENTIFIER>`</nobr> | `-r`              | The target runtime to bundle for.

The common options are listed above.

## `dotnet ef migrations has-pending-model-changes`

> **Note:**
> This command was added in EF Core 8.0.

Checks if any changes have been made to the model since the last migration.

Options:

The common options are listed above.

## `dotnet ef migrations list`

Lists available migrations.

Options:

| Option                                   | Description                                                                                                                  |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| <nobr>`--connection <CONNECTION>`</nobr> | The connection string to the database. Defaults to the one specified in AddDbContext or OnConfiguring. |
| <nobr>`--no-connect`</nobr>              | Don't connect to the database.                                                                          |

The common options are listed above.
