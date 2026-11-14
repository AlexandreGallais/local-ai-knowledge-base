---
title: "Breaking changes in EF Core 9 (EF9) - EF Core (part 1 of 4)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-9.0/breaking-changes.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 9 (EF9)

This page documents API and behavior changes that have the potential to break existing applications updating from EF Core 8 to EF Core 9. Make sure to review earlier breaking changes if updating from an earlier version of EF Core:

- Breaking changes in EF Core 8
- Breaking changes in EF Core 7
- Breaking changes in EF Core 6

## Target Framework

EF Core 9 targets .NET 8. This means that existing applications that target .NET 8 can continue to do so. Applications targeting older .NET, .NET Core, and .NET Framework versions will need to target .NET 8 or .NET 9 to use EF Core 9.

## Summary

> **Note:**
> If you are using Azure Cosmos DB, please see the separate section below on Azure Cosmos DB breaking changes.

| **Breaking change**                                                                                       | **Impact** |
|:----------------------------------------------------------------------------------------------------------|------------|
| Exception is thrown when applying migrations if there are pending model changes | High       |
| Exception is thrown when applying migrations in an explicit transaction        | High       |
| `Microsoft.EntityFrameworkCore.Design` not found when using EF tools                     | Medium     |
| `EF.Functions.Unhex()` now returns `byte[]?`                                                    | Low        |
| Compiled models now reference value converter methods directly         | Low        |
| SqlFunctionExpression's nullability arguments' arity validated      | Low        |
| `ToString()` method now returns empty string for `null` instances                   | Low        |
| Shared framework dependencies were updated to 9.0.x                     | Low        |
| EF tools no longer support .NET Framework projects                                  | Low        |
| `EF.Constant()` and `EF.Parameter()` no longer work inside compiled queries      | Low        |
| Some `NoTrackingWithIdentityResolution` queries are now prohibited for JSON collections | Low        |
| All pending migrations are applied in a single transaction              | Low        |
| Primitive collection APIs were replaced                                      | Low        |
| SQL Server `IndexOf` now propagates null values                                            | Low        |

## High-impact changes

### Exception is thrown when applying migrations if there are pending model changes

Tracking Issue #33732

#### Old behavior

If the model has pending changes compared to the last migration they are not applied with the rest of the migrations when `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.Migrate*` is called.

#### New behavior

Starting with EF Core 9.0, if the model has pending changes compared to the last migration an exception is thrown when `dotnet ef database update`, `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.Migrate*` or `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.MigrateAsync*` is called:
> :::no-loc text="The model for context 'DbContext' has pending changes. Add a new migration before updating the database. This exception can be suppressed or logged by passing event ID 'RelationalEventId.PendingModelChangesWarning' to the 'ConfigureWarnings' method in 'DbContext.OnConfiguring' or 'AddDbContext'.":::

#### Why

Forgetting to add a new migration after making model changes is a common mistake that can be hard to diagnose in some cases. The new exception ensures that the app's model matches the database after the migrations are applied.

#### Mitigations

There are several common situations when this exception can be thrown:

- There are no migrations at all. This is common when the database is updated through other means.
  - **Mitigation**: If you don't plan to use migrations for managing the database schema then remove the `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.Migrate*` or `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.MigrateAsync*` call, otherwise add a migration.
- There is at least one migration, but the model snapshot is missing. This is common for migrations created manually.
  - **Mitigation**: Add a new migration using EF tooling, this will update the model snapshot.
- The model wasn't modified by the developer, but it's built in a non-deterministic way causing EF to detect it as modified. This is common when `new DateTime()`, `DateTime.Now`, `DateTime.UtcNow`, or `Guid.NewGuid()` are used in objects supplied to `Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder`1.HasData*`.
  - **Mitigation**: Add a new migration, examine its contents to locate the cause, and replace the dynamic data with a static, hardcoded value in the model. The migration should be recreated after the model is fixed. If dynamic data has to be used for seeding consider using the new seeding pattern instead of `Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder`1.HasData*`.
- The last migration was created for a different provider than the one used to apply the migrations.
  - **Mitigation**: This is an unsupported scenario. The warning can be suppressed using the code snippet below, but this scenario will likely stop working in a future EF Core release. The recommended solution is to generate a separate set of migrations for each provider.
- The migrations are generated, modified or chosen dynamically by replacing some of the EF services.
  - **Mitigation**: The warning is a false positive in this case and should be suppressed:
    `options.ConfigureWarnings(w => w.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.PendingModelChangesWarning))`
- You are using ASP.NET Core Identity and change options that affect the model, such as:

    ```csharp
    .AddDefaultIdentity<ApplicationUser>(options =>
        {
            options.Stores.SchemaVersion = IdentitySchemaVersions.Version2;
            options.Stores.MaxLengthForKeys = 256;
            options.SignIn.RequireConfirmedAccount = false;
        })
    ```

  - **Mitigation**: To make sure that the options are applied consistently the app needs to be specified as the startup project when running the EF tools or, alternatively, `IDesignTimeDbContextFactory` needs to be implemented in the project containing the `DbContext`:

    ```csharp
    public class DatabaseContextDesignTimeFactory : IDesignTimeDbContextFactory<DatabaseContext>
    {
        public DatabaseContext CreateDbContext(string[] args)
        {
            var services = new ServiceCollection();
            AddIdentity(services);
            var serviceProvider = services.BuildServiceProvider();
            var optionsBuilder = new DbContextOptionsBuilder<DatabaseContext>();
            optionsBuilder.UseApplicationServiceProvider(serviceProvider);
            optionsBuilder.UseSqlServer();
            return new DatabaseContext(optionsBuilder.Options);
        }
    
        public static IServiceCollection AddIdentity(IServiceCollection services)
        {
            services.AddDefaultIdentity<ApplicationUser>(options =>
                {
                    options.Stores.SchemaVersion = IdentitySchemaVersions.Version2;
                    options.Stores.MaxLengthForKeys = 256;
                    options.SignIn.RequireConfirmedAccount = false;
                })
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<DatabaseContext>();
    
            return services;
        }
    }
    ```

If your scenario doesn't fall under any of the above cases and adding a new migration creates the same migration each time or an empty migration and the exception is still thrown then create a small repro project and share it with the EF team in a new issue.

### Exception is thrown when applying migrations in an explicit transaction

Tracking Issue #17578

#### Old behavior

To apply migrations resiliently the following pattern was commonly used:

```csharp
await dbContext.Database.CreateExecutionStrategy().ExecuteAsync(async () =>
{
    await using var transaction = await dbContext.Database.BeginTransactionAsync(cancellationToken);
    await dbContext.Database.MigrateAsync(cancellationToken);
    await transaction.CommitAsync(cancellationToken);
});
```

#### New behavior

Starting with EF Core 9.0, `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.Migrate*` and `Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.MigrateAsync*` calls will start a transaction and execute the commands using an `ExecutionStrategy` and if your app uses the above pattern an exception is thrown:
> :::no-loc text="An error was generated for warning 'Microsoft.EntityFrameworkCore.Migrations.MigrationsUserTransactionWarning': A transaction was started before applying migrations. This prevents a database lock to be acquired and hence the database will not be protected from concurrent migration applications. The transactions and execution strategy are already managed by EF as needed. Remove the external transaction. This exception can be suppressed or logged by passing event ID 'RelationalEventId.MigrationsUserTransactionWarning' to the 'ConfigureWarnings' method in 'DbContext.OnConfiguring' or 'AddDbContext'.":::

#### Why

Using an explicit transaction prevents a database lock to be acquired and hence the database will not be protected from concurrent migration applications, it also limits EF on how it can manage the transactions internally.

#### Mitigations

If there is only one database call inside the transaction then remove the external transaction and `ExecutionStrategy`:

```csharp
await dbContext.Database.MigrateAsync(cancellationToken);
```

Otherwise, if your scenario requires an explicit transaction and you have other mechanism in place to prevent concurrent migration application, then ignore the warning:

```csharp
options.ConfigureWarnings(w => w.Ignore(RelationalEventId.MigrationsUserTransactionWarning))
```

## Medium-impact changes

### `Microsoft.EntityFrameworkCore.Design` not found when using EF tools

Tracking Issue #35265

#### Old behavior

Previusly, the EF tools required `Microsoft.EntityFrameworkCore.Design` to be referenced in the following way.

```xml
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="*.0.0">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
```

#### New behavior

Starting with .NET SDK 9.0.200 an exception is thrown when an EF tool is invoked:
> :::no-loc text="Could not load file or assembly 'Microsoft.EntityFrameworkCore.Design, Culture=neutral, PublicKeyToken=null'. The system cannot find the file specified.":::

#### Why

EF tools were relying on an undocumented behavior of .NET SDK that caused private assets to be included in the generated `.deps.json` file. This was fixed in sdk#45259. Unfortunately, the EF change to account for this doesn't meet the servicing bar for EF 9.0.x, so it will be fixed in EF 10.

#### Mitigations

As a workaround before EF 10 is released you can mark the `Design` assembly reference as publishable:

```xml
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="9.0.1">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
      <Publish>true</Publish>
    </PackageReference>
```

This will include it in the generated `.deps.json` file, but has a side effect of copying `Microsoft.EntityFrameworkCore.Design.dll` to the output and publish folders.
