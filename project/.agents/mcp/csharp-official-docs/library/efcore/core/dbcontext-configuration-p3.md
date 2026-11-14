---
title: "DbContext Lifetime, Configuration, and Initialization - EF Core (part 3 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/dbcontext-configuration/index.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# DbContext Lifetime, Configuration, and Initialization - EF Core (part 3 of 3)

## ConfigureDbContext for configuration composition

> **Note:**
> This section covers intermediate-level usage of EF Core primarily intended for reusable libraries and components. Most applications should use the `AddDbContextFactory` pattern described earlier in this article.

Starting with EF Core 9.0, you can use `Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.ConfigureDbContext*` to apply additional configuration to a `DbContext` either before or after the `AddDbContext` call. This is particularly useful for composing non-conflicting configuration in reusable components or tests.

### Basic <example-value> usage

`ConfigureDbContext` allows you to add configuration in a reusable library or component without replacing the entire provider configuration:

```csharp
var services = new ServiceCollection();

services.ConfigureDbContext<BlogContext>(options =>
    options.EnableSensitiveDataLogging()
           .EnableDetailedErrors());

services.AddDbContext<BlogContext>(options =>
    options.UseInMemoryDatabase("BasicExample"));
```

### Provider-specific configuration without connection strings

To apply provider-specific configuration you can use provider-specific configuration methods without supplying the connection string. The SQL Server provider also includes `ConfigureSqlEngine` for this case. See SQL Server-specific batching behavior for more information.

```csharp
var services = new ServiceCollection();

services.ConfigureDbContext<BlogContext>(options =>
    options.UseSqlServer(sqlOptions => 
        sqlOptions.EnableRetryOnFailure()));

services.AddDbContext<BlogContext>(options =>
    options.UseSqlServer("connectionString"));
```

### ConfigureDbContext and AddDbContext precedence

When both `ConfigureDbContext` and `AddDbContext` are used, or when multiple calls to these methods are made, the configuration is applied in the order the methods are called, with later calls taking precedence for conflicting options.

For non-conflicting options (like adding logging, interceptors, or other settings), all configurations are composed together:

```csharp
var services = new ServiceCollection();

services.ConfigureDbContext<BlogContext>(options =>
    options.LogTo(Console.WriteLine));

services.AddDbContext<BlogContext>(options =>
    options.UseInMemoryDatabase("CompositionExample"));

services.ConfigureDbContext<BlogContext>(options =>
    options.EnableSensitiveDataLogging());
```

For conflicting options, the last configuration wins. See breaking changes in EF Core 8.0 for more information about this behavior change.

> **Note:**
> Configuring a different provider will not remove the previous provider configuration. This can lead to errors when creating the context. To completely replace the provider, you need to remove the context registration and re-add it, or create a new service collection.

## More reading

- Read Dependency Injection to learn more about using DI.
- Read Testing for more information.
