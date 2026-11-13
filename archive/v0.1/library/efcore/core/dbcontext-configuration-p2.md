---
title: "DbContext Lifetime, Configuration, and Initialization - EF Core (part 2 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/dbcontext-configuration/index.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# DbContext Lifetime, Configuration, and Initialization - EF Core (part 2 of 3)

## DbContextOptions

The starting point for all `DbContext` configuration is `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder`. There are three ways to get this builder:

- In `AddDbContext` and related methods
- In `OnConfiguring`
- Constructed explicitly with `new`

Examples of each of these are shown in the preceding sections. The same configuration can be applied regardless of where the builder comes from. In addition, `OnConfiguring` is always called regardless of how the context is constructed. This means `OnConfiguring` can be used to perform additional configuration even when `AddDbContext` is being used.

### Configuring the database provider

Each `DbContext` instance must be configured to use one and only one database provider. (Different instances of a `DbContext` subtype can be used with different database providers, but a single instance must only use one.) A database provider is configured using a specific `Use*` call. For example, to use the SQL Server database provider:

```csharp
public class ApplicationDbContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(
            @"Server=(localdb)\mssqllocaldb;Database=Test;ConnectRetryCount=0");
    }
}
```

These `Use*` methods are extension methods implemented by the database provider. This means that the database provider NuGet package must be installed before the extension method can be used.

> **Tip:**
> EF Core database providers make extensive use of extension methods. If the compiler indicates that a method cannot be found, then make sure that the provider's NuGet package is installed and that you have `using Microsoft.EntityFrameworkCore;` in your code.

The following table contains examples for common database providers.

| Database system            | Example configuration                        | NuGet package                                                                                                      |
|:---------------------------|----------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| SQL Server or Azure SQL    | `.UseSqlServer(connectionString)`            | Microsoft.EntityFrameworkCore.SqlServer |
| Azure Cosmos DB            | `.UseCosmos(connectionString, databaseName)` | Microsoft.EntityFrameworkCore.Cosmos       |
| SQLite                     | `.UseSqlite(connectionString)`               | Microsoft.EntityFrameworkCore.Sqlite       |
| EF Core in-memory database | `.UseInMemoryDatabase(databaseName)`         | Microsoft.EntityFrameworkCore.InMemory   |
| PostgreSQL*                | `.UseNpgsql(connectionString)`               | Npgsql.EntityFrameworkCore.PostgreSQL     |
| MySQL/MariaDB*             | `.UseMySql(connectionString)`                | Pomelo.EntityFrameworkCore.MySql               |
| Oracle*                    | `.UseOracle(connectionString)`               | Oracle.EntityFrameworkCore                           |

*These database providers are not shipped by Microsoft. See Database Providers for more information about database providers.

> **Warning:**
> The EF Core in-memory database is not designed for production use. In addition, it may not be the best choice even for testing. See Testing Code That Uses EF Core for more information.

See Connection Strings for more information on using connection strings with EF Core.

Optional configuration specific to the database provider is performed in an additional provider-specific builder. For example, using `Microsoft.EntityFrameworkCore.Infrastructure.SqlServerDbContextOptionsBuilder.EnableRetryOnFailure*` to configure retries for connection resiliency when connecting to Azure SQL:

```csharp
public class ApplicationDbContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder
            .UseSqlServer(
                @"Server=(localdb)\mssqllocaldb;Database=Test",
                providerOptions => { providerOptions.EnableRetryOnFailure(); });
    }
}
```

> **Tip:**
> The same database provider is used for SQL Server and Azure SQL. However, it is recommended that connection resiliency be used when connecting to SQL Azure.

See Database Providers for more information on provider-specific configuration.

### Other DbContext configuration

Other `DbContext` configuration can be chained either before or after (it makes no difference which) the `Use*` call. For example, to turn on sensitive-data logging:

```csharp
public class ApplicationDbContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder
            .EnableSensitiveDataLogging()
            .UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Test;ConnectRetryCount=0");
    }
}
```

The following table contains examples of common methods called on `DbContextOptionsBuilder`.

| DbContextOptionsBuilder method                                                             | What it does                                                | Learn more
|:-------------------------------------------------------------------------------------------|-------------------------------------------------------------|--------------
| `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.UseQueryTrackingBehavior*`   | Sets the default tracking behavior for queries              | Query Tracking Behavior
| `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.LogTo*`                      | A simple way to get EF Core logs                            | Logging, Events, and Diagnostics
| `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.UseLoggerFactory*`           | Registers an `Microsoft.Extensions.Logging` factory         | Logging, Events, and Diagnostics
| `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableSensitiveDataLogging*` | Includes application data in exceptions and logging         | Logging, Events, and Diagnostics
| `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableDetailedErrors*`       | More detailed query errors (at the expense of performance)  | Logging, Events, and Diagnostics
| `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.ConfigureWarnings*`          | Ignore or throw for warnings and other events               | Logging, Events, and Diagnostics
| `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.AddInterceptors*`            | Registers EF Core interceptors                              | Logging, Events, and Diagnostics
| `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableServiceProviderCaching*` | Controls caching of the internal service provider          | Service Provider Caching
| `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.UseMemoryCache*`             | Configures the memory cache used by EF Core                | Memory Cache Integration
| `Microsoft.EntityFrameworkCore.ProxiesExtensions.UseLazyLoadingProxies*`            | Use dynamic proxies for lazy-loading                        | Lazy Loading
| `Microsoft.EntityFrameworkCore.ProxiesExtensions.UseChangeTrackingProxies*`         | Use dynamic proxies for change-tracking                     | Coming soon...

> **Note:**
> `Microsoft.EntityFrameworkCore.ProxiesExtensions.UseLazyLoadingProxies*` and `Microsoft.EntityFrameworkCore.ProxiesExtensions.UseChangeTrackingProxies*` are extension methods from the Microsoft.EntityFrameworkCore.Proxies NuGet package. This kind of ".UseSomething()" call is the recommended way to configure and/or use EF Core extensions contained in other packages.

### `DbContextOptions` versus `DbContextOptions<TContext>`

Most `DbContext` subclasses that accept a `DbContextOptions` should use the generic `DbContextOptions<TContext>` variation. For example:

```csharp
public sealed class SealedApplicationDbContext : DbContext
{
    public SealedApplicationDbContext(DbContextOptions<SealedApplicationDbContext> contextOptions)
        : base(contextOptions)
    {
    }
}
```

This ensures that the correct options for the specific `DbContext` subtype are resolved from dependency injection, even when multiple `DbContext` subtypes are registered.

> **Tip:**
> Your DbContext does not need to be sealed, but sealing is best practice to do so for classes not designed to be inherited from.

However, if the `DbContext` subtype is itself intended to be inherited from, then it should expose a protected constructor taking a non-generic `DbContextOptions`. For example:

```csharp
public abstract class ApplicationDbContextBase : DbContext
{
    protected ApplicationDbContextBase(DbContextOptions contextOptions)
        : base(contextOptions)
    {
    }
}
```

This allows multiple concrete subclasses to call this base constructor using their different generic `DbContextOptions<TContext>` instances. For example:

```csharp
public sealed class ApplicationDbContext1 : ApplicationDbContextBase
{
    public ApplicationDbContext1(DbContextOptions<ApplicationDbContext1> contextOptions)
        : base(contextOptions)
    {
    }
}

public sealed class ApplicationDbContext2 : ApplicationDbContextBase
{
    public ApplicationDbContext2(DbContextOptions<ApplicationDbContext2> contextOptions)
        : base(contextOptions)
    {
    }
}
```

Notice that this is exactly the same pattern as when inheriting from `DbContext` directly. That is, the `DbContext` constructor itself accepts a non-generic `DbContextOptions` for this reason.

A `DbContext` subclass intended to be both instantiated and inherited from should expose both forms of constructor. For example:

```csharp
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> contextOptions)
        : base(contextOptions)
    {
    }

    protected ApplicationDbContext(DbContextOptions contextOptions)
        : base(contextOptions)
    {
    }
}
```

## Design-time DbContext configuration

EF Core design-time tools such as those for EF Core migrations need to be able to discover and create a working instance of a `DbContext` type in order to gather details about the application's entity types and how they map to a database schema. This process can be automatic as long as the tool can easily create the `DbContext` in such a way that it will be configured similarly to how it would be configured at run-time.

While any pattern that provides the necessary configuration information to the `DbContext` can work at run-time, tools that require using a `DbContext` at design-time can only work with a limited number of patterns. These are covered in more detail in Design-Time Context Creation.

## Avoiding DbContext threading issues

Entity Framework Core does not support multiple parallel operations being run on the same `DbContext` instance. This includes both parallel execution of async queries and any explicit concurrent use from multiple threads. Therefore, always `await` async calls immediately, or use separate `DbContext` instances for operations that execute in parallel.

When EF Core detects an attempt to use a `DbContext` instance concurrently, you'll see an `InvalidOperationException` with a message like this:

> A second operation started on this context before a previous operation completed. This is usually caused by different threads using the same instance of DbContext, however instance members are not guaranteed to be thread safe.

When concurrent access goes undetected, it can result in undefined behavior, application crashes and data corruption.

There are common mistakes that can inadvertently cause concurrent access on the same `DbContext` instance:

### Asynchronous operation pitfalls

Asynchronous methods enable EF Core to initiate operations that access the database in a non-blocking way. But if a caller does not await the completion of one of these methods, and proceeds to perform other operations on the `DbContext`, the state of the `DbContext` can be, (and very likely will be) corrupted.

Always await EF Core asynchronous methods immediately.

### Implicitly sharing DbContext instances via dependency injection

The `AddDbContext` extension method registers `DbContext` types with a scoped lifetime by default.

This is safe from concurrent access issues in most ASP.NET Core applications because there is only one thread executing each client request at a given time, and because each request gets a separate dependency injection scope (and therefore a separate `DbContext` instance). For Blazor Server hosting model, one logical request is used for maintaining the Blazor user circuit, and thus only one scoped DbContext instance is available per user circuit if the default injection scope is used.

Any code that explicitly executes multiple threads in parallel should ensure that `DbContext` instances aren't ever accessed concurrently.

Using dependency injection, this can be achieved by either registering the context as scoped, and creating scopes (using `IServiceScopeFactory`) for each thread, or by registering the `DbContext` as transient (using the overload of `AddDbContext` which takes a `ServiceLifetime` parameter).
