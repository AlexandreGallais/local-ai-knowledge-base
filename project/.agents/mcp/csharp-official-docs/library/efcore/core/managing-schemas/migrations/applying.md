---
title: "Applying Migrations - EF Core (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/managing-schemas/migrations/applying.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Applying Migrations

Once your migrations have been added, they need to be deployed and applied to your databases. There are various strategies for doing this, with some being more appropriate for production environments, and others for the development lifecycle.

> **Note:**
> Whatever your deployment strategy, always inspect the generated migrations and test them before applying to a production database. A migration may drop a column when the intent was to rename it, or may fail for various reasons when applied to a database.

## Choose a deployment strategy

For automated deployment, use a migration bundle. A bundle is a deployment artifact that can be generated in CI and executed later without the .NET SDK, the EF Core tools, or the application's source code. Use a SQL script instead when the SQL must be reviewed, modified, archived, or handed to a DBA before it is applied.

For local development, `dotnet ef database update` or `Update-Database` is usually the simplest option. Aspire projects should use the Aspire EF Core migrations integration to coordinate local migration execution and to publish bundles or scripts.

| Strategy | Recommended use | Review SQL before execution | Requires SDK and source at execution | Uses EF migration locking | Runs EF seeding delegates |
| --- | --- | :---: | :---: | :---: | :---: |
| SQL script | DBA-controlled or review-gated deployment | Yes | No | No | No |
| Migration bundle | Automated deployment | No | No | Yes | Yes |
| EF command-line tools | Local development and testing | No | Yes | Yes | Yes |
| Runtime migration | Applications that accept startup migration tradeoffs | No | No | Yes | Yes |

EF Core 9 and later use migration locking. Synchronous operations and tooling invoke `UseSeeding`; asynchronous operations invoke `UseAsyncSeeding`.

Use a separate identity for deployment that has permission to change the schema. The identity used by the application at run time should normally have only the permissions the application needs to read and write data.

## SQL scripts

SQL scripts are recommended when the deployment process requires the generated SQL to be inspected or changed before execution. The advantages of this strategy include the following:

* SQL scripts can be reviewed for accuracy; this is important since applying schema changes to production databases is a potentially dangerous operation that could involve data loss.
* In some cases, the scripts can be tuned to fit the specific needs of a production database.
* SQL scripts can be used in conjunction with a deployment technology, and can even be generated as part of your CI process.
* SQL scripts can be provided to a DBA, and can be managed and archived separately.

### .NET CLI

#### Basic Usage

The following generates a SQL script from a blank database to the latest migration:

```dotnetcli
dotnet ef migrations script
```

By default, the command writes the script to standard output. Use `--output` (or `-o`) to create a deployment artifact with a predictable name:

```dotnetcli
dotnet ef migrations script --idempotent --output artifacts/migrations.sql
```

#### With From (to implied)

The following generates a SQL script from the given migration to the latest migration.

```dotnetcli
dotnet ef migrations script AddNewTables
```

#### With From and To

The following generates a SQL script from the specified `from` migration to the specified `to` migration.

```dotnetcli
dotnet ef migrations script AddNewTables AddAuditTable
```

You can use a `from` that is newer than the `to` in order to generate a rollback script.

> **Warning:**
> Please take note of potential data loss scenarios.

### Visual Studio

#### Basic Usage

The following generates a SQL script from a blank database to the latest migration:

```powershell
Script-Migration
```

Use `-Output` to write the script to a specific file:

```powershell
Script-Migration -Idempotent -Output artifacts\migrations.sql
```

#### With From (to implied)

The following generates a SQL script from the given migration to the latest migration.

```powershell
Script-Migration AddNewTables
```

#### With From and To

The following generates a SQL script from the specified `from` migration to the specified `to` migration.

```powershell
Script-Migration AddNewTables AddAuditTable
```

You can use a `from` that is newer than the `to` in order to generate a rollback script.

> **Warning:**
> Please take note of potential data loss scenarios.

***

Script generation accepts the following two arguments to indicate which range of migrations should be generated:

* The **from** migration should be the last migration applied to the database before running the script. If no migrations have been applied, specify `0` (this is the default).
* The **to** migration is the last migration that will be applied to the database after running the script. This defaults to the last migration in your project.

Migration scripts update an existing database. Provision the database itself through your infrastructure deployment or database administration process before applying the script. Database creation typically requires a different connection, elevated permissions, and provider-specific configuration.

## Idempotent SQL scripts

The SQL scripts generated above can only be applied to change your schema from one migration to another; it is your responsibility to apply the script appropriately, and only to databases in the correct migration state. EF Core also supports generating **idempotent** scripts, which internally check which migrations have already been applied (via the migrations history table), and only apply missing ones. This is useful if you don't exactly know what the last migration applied to the database was, or if you are deploying to multiple databases that may each be at a different migration.

Idempotent script support depends on the database provider. For example, SQLite doesn't currently support generating idempotent migration scripts.

The following generates idempotent migrations:

### .NET CLI

```dotnetcli
dotnet ef migrations script --idempotent
```

### Visual Studio

```powershell
Script-Migration -Idempotent
```

***

## Command-line tools

The EF command-line tools can be used to apply migrations to a database. While productive for local development and testing of migrations, this approach isn't ideal for managing production databases:

* The SQL commands are applied directly by the tool, without giving the developer a chance to inspect or modify them. This can be dangerous in a production environment.
* The .NET SDK and the EF tool must be installed on production servers and requires the project's source code.

### .NET CLI

The following updates your database to the latest migration:

```dotnetcli
dotnet ef database update
```

The following updates your database to a given migration:

```dotnetcli
dotnet ef database update AddNewTables
```

Note that this can be used to roll back to an earlier migration as well.

> **Warning:**
> Please take note of potential data loss scenarios.

### Visual Studio

The following updates your database to the latest migration:

```powershell
Update-Database
```

The following updates your database to a given migration:

```powershell
Update-Database AddNewTables
```

Note that this can be used to roll back to an earlier migration as well.

> **Warning:**
> Please take note of potential data loss scenarios.

***

For more information on applying migrations via the command-line tools, see the EF Core tools reference.

## Environment and configuration

The tools execute application code to construct the `DbContext`. Provider selection, connection strings, and model configuration can therefore depend on the application environment. EF Core design-time tooling uses the `Development` environment when neither `ASPNETCORE_ENVIRONMENT` nor `DOTNET_ENVIRONMENT` is set.

Set the environment explicitly when generating a deployment artifact and when executing a bundle. For example, in PowerShell:

```powershell
$env:ASPNETCORE_ENVIRONMENT = 'Production'
dotnet ef migrations bundle --output artifacts\efbundle.exe
```

```powershell
$env:ASPNETCORE_ENVIRONMENT = 'Production'
.\efbundle.exe --connection $env:DEPLOYMENT_CONNECTION_STRING
```

Or in a POSIX-compatible shell:

```bash
ASPNETCORE_ENVIRONMENT=Production \
    dotnet ef migrations bundle --output artifacts/efbundle

ASPNETCORE_ENVIRONMENT=Production \
    ./efbundle --connection "$DEPLOYMENT_CONNECTION_STRING"
```

This also prevents a bundle from loading development user secrets unexpectedly. A safer default environment for bundles is tracked by dotnet/efcore#36188. Environment selection in the Visual Studio publish experience is tracked by dotnet/efcore#11950.

Don'<example-value>'s secret store. The deployment identity should have schema permissions; the normal application identity usually shouldn't.
