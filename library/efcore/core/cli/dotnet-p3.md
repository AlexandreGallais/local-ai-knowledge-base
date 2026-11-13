---
title: "EF Core tools reference (.NET CLI) - EF Core (part 3 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/cli/dotnet.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# EF Core tools reference (.NET CLI) - EF Core (part 3 of 3)

## `dotnet ef migrations remove`

Removes the last migration, rolling back the code changes that were done for the latest migration.

Options:

| Option                                   | Short             | Description                                                                                          |
|:-----------------------------------------|:------------------|:-----------------------------------------------------------------------------------------------------|
| <nobr>`--force`</nobr>                   | <nobr>`-f`</nobr> | Revert the latest migration, rolling back both code and database changes that were done for the latest migration. Continues to roll back only the code changes if an error occurs while connecting to the database. |
| <nobr>`--connection <CONNECTION>`</nobr> |                   | The connection string to the database. Defaults to the one specified in `AddDbContext` or `OnConfiguring`. Added in EF Core 11. |
| <nobr>`--offline`</nobr>                 |                   | Remove the migration without connecting to the database. Added in EF Core 11.                        |

The common options are listed above.

> **Note:**
> The `--offline` and `--force` options cannot be used together, since `--force` requires a database connection to check if the migration has been applied before reverting it.

## `dotnet ef migrations script`

Generates a SQL script from migrations.

If `--output` isn't specified, the command writes the script to standard output.

Arguments:

| Argument              | Description                                                                                                                                                   |
|:----------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <nobr>`<FROM>`</nobr> | The starting migration. Migrations may be identified by name or by ID. The number 0 is a special case that means *before the first migration*. Defaults to 0. |
| <nobr>`<TO>`</nobr>   | The ending migration. Defaults to the last migration.                                                                                                         |

Options:

| Option                           | Short             | Description                                                        |
|:---------------------------------|:------------------|:-------------------------------------------------------------------|
| <nobr>`--output <FILE>`</nobr>   | <nobr>`-o`</nobr> | The file to write the script to.                                   |
| <nobr>`--idempotent`</nobr>      | `-i`              | Generate a script that can be used on a database at any migration. |
| <nobr>`--no-transactions`</nobr> |                   | Don't generate SQL transaction statements.   |

The common options are listed above.

The following example creates a script for the InitialCreate migration:

```dotnetcli
dotnet ef migrations script 0 InitialCreate
```

The following example creates a script for all migrations after the InitialCreate migration.

```dotnetcli
dotnet ef migrations script 20180904195021_InitialCreate
```

## Configuration file

> **Note:**
> This feature was introduced in EF Core 11.

Starting with EF Core 11, `dotnet ef` can load default option values from a JSON configuration file. This reduces the need to repeat the same command-line options across multiple invocations.

### File location and discovery

Place a file named `dotnet-ef.json` inside a `.config` directory:

```text
<repository root>/
└── .config/
    └── dotnet-ef.json
```

When `dotnet ef` runs, it walks up the directory tree from the current working directory and uses the first `.config/dotnet-ef.json` file it finds. This means you can place the file at the root of your repository and it will be used from any subdirectory.

### Supported properties

The configuration file is a JSON object with the following optional properties:

```json
{
  "project": "src/App.Infrastructure",
  "startupProject": "src/App.Api",
  "framework": "net11.0",
  "configuration": "Debug",
  "context": "AppDbContext",
  "runtime": "win-x64",
  "verbose": true,
  "noColor": false,
  "prefixOutput": false
}
```

| Property         | Type    | Description                                                                                                                                 |
|:-----------------|:--------|:--------------------------------------------------------------------------------------------------------------------------------------------|
| `project`        | string  | Relative or absolute path to the target project folder. Relative paths are resolved relative to the parent of the `.config` directory containing the file. |
| `startupProject` | string  | Relative or absolute path to the startup project folder. Relative paths are resolved relative to the parent of the `.config` directory containing the file. |
| `framework`      | string  | The Target Framework Moniker for the target framework.                    |
| `configuration`  | string  | The build configuration, for example: `Debug` or `Release`.                                                                                 |
| `context`        | string  | The `DbContext` class to use. Class name only or fully qualified with namespaces.                                                           |
| `runtime`        | string  | The identifier of the target runtime to restore packages for. For a list of Runtime Identifiers (RIDs), see the RID catalog. |
| `verbose`        | boolean | Enable verbose output.                                                                                                                      |
| `noColor`        | boolean | Disable colored console output.                                                                                                             |
| `prefixOutput`   | boolean | Prefix output lines with their severity level.                                                                                              |

All properties are optional. Only include the properties you need.

> **Note:**
> Explicit command-line options always take precedence over values from the configuration file.

## Additional resources

* Migrations
* Reverse Engineering
* Compiled models
