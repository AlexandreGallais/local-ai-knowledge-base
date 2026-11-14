---
title: "Applying Migrations - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/managing-schemas/migrations/applying.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Applying Migrations - EF Core (part 2 of 2)

## Bundles

Migration bundles are single-file executables that can be used to apply migrations to a database. They address some of the shortcomings of the SQL script and command-line tools:

* Executing SQL scripts requires additional tools.
* The transaction handling and continue-on-error behavior of these tools are inconsistent and sometimes unexpected. This can leave your database in an undefined state if a failure occurs when applying migrations.
* Bundles can be generated as part of your CI process and easily executed later as part of your deployment process.
* Bundles can be executed without installing the .NET SDK or EF Tool (or even the .NET Runtime, when self-contained), and they don't require the project's source code.
* Bundles use EF Core's migration locking and run configured `UseSeeding` logic.

Unlike a SQL script, a bundle does not currently provide a way to inspect the SQL it will execute or list the migrations it contains. If your deployment requires SQL review, generate a script instead. Bundle inspection improvements are tracked by dotnet/efcore#25872.

### .NET CLI

The following generates a bundle:

```dotnetcli
dotnet ef migrations bundle --output artifacts/efbundle
```

The following generates a self-contained bundle for Linux:

```dotnetcli
dotnet ef migrations bundle --self-contained --target-runtime linux-x64 --output artifacts/efbundle
```

### Visual Studio

The following generates a bundle:

```powershell
Bundle-Migration -Output artifacts\efbundle.exe
```

The following generates a self-contained bundle for Linux:

```powershell
Bundle-Migration -SelfContained -TargetRuntime linux-x64 -Output artifacts\efbundle
```

***

For more information on creating bundles see the EF Core tools reference.

### `efbundle`

The resulting executable is named `efbundle` by default. It can be used to update the database to the latest migration. It's equivalent to running `dotnet ef database update` or `Update-Database`.

Arguments:

| Argument                   | Description                                                                                    |
|----------------------------|------------------------------------------------------------------------------------------------|
| <nobr>`<MIGRATION>`</nobr> | The target migration. If '0', all migrations will be reverted. Defaults to the last migration. |

Options:

| Option                                   | Short             | Description                                                                                            |
|------------------------------------------|-------------------|--------------------------------------------------------------------------------------------------------|
| <nobr>`--connection <CONNECTION>`</nobr> |                   | The connection string to the database. Defaults to the one specified in AddDbContext or OnConfiguring. |
| `--verbose`                              | <nobr>`-v`</nobr> | Show verbose output.                                                                                   |
| `--no-color`                             |                   | Don't colorize output.                                                                                 |
| `--prefix-output`                        |                   | Prefix output with level.                                                                              |

The following example applies migrations to a local SQL Server instance using the specified username and credentials:

```powershell
.\efbundle.exe --connection '<example-value>'$Credential;'<example-value>'}'
```

To roll the database back, pass the migration that should remain applied. Passing `0` reverts all migrations:

```powershell
.\efbundle.exe PreviousMigration --connection 'Data Source=(local)\MSSQLSERVER;Initial Catalog=Blogging;Integrated Security=True'
.\efbundle.exe 0 --connection 'Data Source=(local)\MSSQLSERVER;Initial Catalog=Blogging;Integrated Security=True'
```

> **Warning:**
> A rollback executes the `Down` operations of every migration newer than the target and may result in data loss. Review and test rollback behavior before using it on production data.
>
> Configured seeding code runs after a downgrade. It must tolerate the schema of the target migration, including a missing application schema when the target is `0`.

> **Warning:**
> If context configuration reads `appsettings.json`, copy the required settings files alongside the bundle. Configuration files are resolved from the bundle'<example-value>'t put production secrets in these files; supply them through a secure configuration source or the `--connection` option.

### Containers and deployment jobs

Generate the bundle during the build and run it as a one-shot deployment job after the database is healthy. Don't install the SDK or run `dotnet ef` in the application image, and don't make every application replica run migrations from its entrypoint. Configure the deployment platform not to restart the migration container after it exits successfully.

For Aspire applications, `AddEFMigrations` can coordinate migrations during local development. During publishing, `PublishAsMigrationBundle` can emit a bundle or a container image, and `PublishAsMigrationScript` can emit a SQL script. See Apply EF Core migrations in Aspire for one-shot job configuration for Azure Container Apps, Docker Compose, and Kubernetes.

The migration bundle sample demonstrates two SQLite migrations, idempotent seeding, forward application, and rollback-safe seeding.

### Migration bundle example

A bundle needs migrations to include. These are created using `dotnet ef migrations add` as described in _Create your first migration_. Once you have migrations ready to deploy, create a bundle using the `dotnet ef migrations bundle`. For example:

```dotnetcli
PS C:\local\AllTogetherNow\SixOh> dotnet ef migrations bundle
Build started...
Build succeeded.
Building bundle...
Done. Migrations Bundle: C:\local\AllTogetherNow\SixOh\efbundle.exe
PS C:\local\AllTogetherNow\SixOh>
```

The output is an executable suitable for your target operating system. In my case this is Windows x64, so I get an `efbundle.exe` dropped in my local folder. Running this executable applies the migrations contained within it:

```dotnetcli
PS C:\local\AllTogetherNow\SixOh> .\efbundle.exe
Applying migration '20210903083845_MyMigration'.
Done.
PS C:\local\AllTogetherNow\SixOh>
```

As with `dotnet ef database update` or `Update-Database`, migrations are applied to the database only if they have not been already applied. For example, running the same bundle again does nothing, since there are no new migrations to apply:

```dotnetcli
PS C:\local\AllTogetherNow\SixOh> .\efbundle.exe
No migrations were applied. The database is already up to date.
Done.
PS C:\local\AllTogetherNow\SixOh>
```

However, if changes are made to the model and more migrations are generated with `dotnet ef migrations add`, then these can be bundled into a new executable ready to apply. For example:

```dotnetcli
PS C:\local\AllTogetherNow\SixOh> dotnet ef migrations add SecondMigration
Build started...
Build succeeded.
Done. To undo this action, use 'ef migrations remove'
PS C:\local\AllTogetherNow\SixOh> dotnet ef migrations add Number3
Build started...
Build succeeded.
Done. To undo this action, use 'ef migrations remove'
PS C:\local\AllTogetherNow\SixOh> dotnet ef migrations bundle --force
Build started...
Build succeeded.
Building bundle...
Done. Migrations Bundle: C:\local\AllTogetherNow\SixOh\efbundle.exe
PS C:\local\AllTogetherNow\SixOh>
```

> **Tip:**
> The `--force` option can be used to overwrite the existing bundle with a new one.

Executing this new bundle applies these two new migrations to the database:

```dotnetcli
PS C:\local\AllTogetherNow\SixOh> .\efbundle.exe
Applying migration '20210903084526_SecondMigration'.
Applying migration '20210903084538_Number3'.
Done.
PS C:\local\AllTogetherNow\SixOh>
```

By default, the bundle uses the database connection string from your application's configuration. However, a different database can be migrated by passing the connection string on the command line. For example:

```dotnetcli
PS C:\local\AllTogetherNow\SixOh> .\efbundle.exe --connection "Data Source=(LocalDb)\MSSQLLocalDB;Database=SixOhProduction"
Applying migration '20210903083845_MyMigration'.
Applying migration '20210903084526_SecondMigration'.
Applying migration '20210903084538_Number3'.
Done.
PS C:\local\AllTogetherNow\SixOh>
```

> **Note:**
> This time, all three migrations were applied, since none of them had yet been applied to the production database.

***

## Apply migrations at runtime

It's possible for the application itself to apply migrations programmatically, typically during startup. EF Core 9 and later protect migration execution with a database-wide lock, so this can be acceptable for applications that prefer simple deployment and can tolerate startup migration behavior. A separate migration deployment step is still preferred when review, least-privilege credentials, coordinated rollout, or high availability is important.

Consider the following tradeoffs:

* For versions of EF prior to 9, if multiple instances of your application are running, both applications could attempt to apply the migration concurrently and fail (or worse, cause data corruption).
* Similarly, if an application is accessing the database while another application migrates it, this can cause severe issues.
* The application must have elevated access to modify the database schema. It's generally good practice to limit the application's database permissions in production.
* It's important to be able to roll back an applied migration in case of an issue. The other strategies provide this easily and out of the box.
* The SQL commands are applied directly by the program, without giving the developer a chance to inspect or modify them. This can be dangerous in a production environment.

To apply migrations programmatically, call `context.Database.MigrateAsync()`. For example, a typical ASP.NET application can do the following:

```csharp
public static async Task Main(string[] args)
{
    var host = CreateHostBuilder(args).Build();

    using (var scope = host.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        await db.Database.MigrateAsync();
    }

    host.Run();
}
```

Note that `MigrateAsync()` builds on top of the `IMigrator` service, which can be used for more advanced scenarios. Use `myDbContext.GetInfrastructure().GetService<IMigrator>()` to access it.

> **Warning:**
>
> * Carefully consider before using this approach in production. Prefer a migration bundle for automation or a SQL script when review and approval are required.
> * Don't call `EnsureCreatedAsync()` before `MigrateAsync()`. `EnsureCreatedAsync()` bypasses Migrations to create the schema, which causes `MigrateAsync()` to fail.

## Migration locking

Starting with EF Core 9, `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.MigrateAsync*` and `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.Migrate*` automatically acquire a database-wide lock before applying any migrations. This protects against database corruption that could result from multiple application instances running migrations concurrently, which is a common scenario when applying migrations at runtime. The lock is held for the duration of the migration execution, including any seeding code, and is automatically released when the operation completes.

Migration locking applies when migrations are applied using any of the following methods:

* `dotnet ef database update` (.NET CLI)
* `Update-Database` (Package Manager Console)
* Migration bundles
* `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.MigrateAsync*` and `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.Migrate*` (runtime migration)

SQL scripts are not affected by migration locking, since they are applied outside of EF Core.

> **Note:**
> Starting with EF Core 9, calling `Migrate()` or `MigrateAsync()` will throw an exception when the model has pending changes compared to the last migration (warning event ID `RelationalEventId.PendingModelChangesWarning`). To detect this condition before deployment, use the `dotnet ef migrations has-pending-model-changes` command in your CI/CD pipeline. The warning can be suppressed via `ConfigureWarnings` (ignoring `RelationalEventId.PendingModelChangesWarning`) if necessary, but this is generally not recommended in production scenarios. See the breaking change note for more information.

> **Warning:**
> The locking mechanism varies significantly across database providers and can involve provider-specific issues. For example, the SQLite provider uses a lock table that can become abandoned if the process terminates unexpectedly. Always consult your provider's documentation for details.

### Limitations

* Wrapping `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.MigrateAsync*` in an explicit transaction is not supported. See Exception is thrown when applying migrations in an explicit transaction for details.
* On SQLite, abandoned migration locks can block subsequent migrations.
