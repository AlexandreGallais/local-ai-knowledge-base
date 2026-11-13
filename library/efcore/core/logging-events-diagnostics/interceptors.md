---
title: "Interceptors - EF Core (part 1 of 6)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/logging-events-diagnostics/interceptors.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Interceptors

Entity Framework Core (EF Core) interceptors enable interception, modification, and/or suppression of EF Core operations. This includes low-level database operations such as executing a command, as well as higher-level operations, such as calls to SaveChanges.

Interceptors are different from logging and diagnostics in that they allow modification or suppression of the operation being intercepted. Simple logging or Microsoft.Extensions.Logging are better choices for logging.

Interceptors are registered per DbContext instance when the context is configured. Use a diagnostic listener to get the same information but for all DbContext instances in the process.

## Available interceptors

The following table shows the available interceptor interfaces:

| Interceptor                                                                     | Operations intercepted                                                                                                                                                     | Singleton |
|:--------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------:|
| `Microsoft.EntityFrameworkCore.Diagnostics.IDbCommandInterceptor`          | Creating commands</br>Executing commands</br>Command failures</br>Disposing the command's DbDataReader                                                                     | No                                     |
| `Microsoft.EntityFrameworkCore.Diagnostics.IDbConnectionInterceptor`       | Opening and closing connections</br>Creating connections</br>Connection failures                                                                                            | No                                     |
| `Microsoft.EntityFrameworkCore.Diagnostics.IDbTransactionInterceptor`      | Creating transactions</br>Using existing transactions</br>Committing transactions</br>Rolling back transactions</br>Creating and using savepoints</br>Transaction failures | No                                     |
| `Microsoft.EntityFrameworkCore.Diagnostics.ISaveChangesInterceptor`        | SavingChanges/SavedChanges</br>SaveChangesFailed/SaveChangesCanceled</br>Optimistic concurrency handling                                                                     | No                                     |
| `Microsoft.EntityFrameworkCore.Diagnostics.IMaterializationInterceptor`    | Creating, initializing, and finalizing entity instances from query results                                                                                                  | Yes                                    |
| `Microsoft.EntityFrameworkCore.Diagnostics.IQueryExpressionInterceptor`    | Modifying the LINQ expression tree before a query is compiled                                                                                                               | Yes                                    |
| `Microsoft.EntityFrameworkCore.Diagnostics.IIdentityResolutionInterceptor` | Resolving identity conflicts when tracking entities                                                                                                                         | Yes                                    |

## Registering interceptors

Interceptors are registered using `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.AddInterceptors*` when configuring a DbContext instance. This is commonly done in an override of `Microsoft.EntityFrameworkCore.DbContext.OnConfiguring*`. For example:

```csharp
public class ExampleContext : BlogsContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.AddInterceptors(new TaggedQueryCommandInterceptor());
}
```

Alternately, `AddInterceptors` can be called as part of `Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContext*` or when creating a `Microsoft.EntityFrameworkCore.DbContextOptions` instance to pass to the DbContext constructor.

> **Tip:**
> OnConfiguring is still called when AddDbContext is used or a DbContextOptions instance is passed to the DbContext constructor. This makes it the ideal place to apply context configuration regardless of how the DbContext is constructed.

Interceptors are often stateless, which means that a single interceptor instance can be used for all DbContext instances. For example:

```csharp
public class TaggedQueryCommandInterceptorContext : BlogsContext
{
    private static readonly TaggedQueryCommandInterceptor _interceptor
        = new TaggedQueryCommandInterceptor();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.AddInterceptors(_interceptor);
}
```

Every interceptor instance must implement one or more interface derived from `Microsoft.EntityFrameworkCore.Diagnostics.IInterceptor`. Each instance should only be registered once even if it implements multiple interception interfaces; EF Core will route events for each interface as appropriate.

### Singleton interceptors

Some interceptors implement `Microsoft.EntityFrameworkCore.Diagnostics.ISingletonInterceptor` (see table above); these interceptors are registered as singleton services in EF Core's internal service provider, meaning a single instance is shared across all `DbContext` instances that use the same service provider.

Because singleton interceptors become part of EF Core's internal service configuration, each distinct interceptor instance causes a new internal service provider to be built. Passing a **new instance** of a singleton interceptor each time a `DbContext` is configured--for example, in `AddDbContext`--will eventually trigger a `ManyServiceProvidersCreatedWarning` and degrade performance.

> **Warning:**
> Always reuse the same singleton interceptor instance for all `DbContext` instances. Do not create a new instance each time the context is configured.

For example, the following is **incorrect** because a new interceptor instance is created for each context configuration:

```csharp
// Don't do this! A new instance each time causes a new internal service provider to be built.
services.AddDbContext<CustomerContext>(
    b => b.UseSqlServer(connectionString)
          .AddInterceptors(new MyMaterializationInterceptor()));
```

Instead, reuse the same instance:

```csharp
// Correct: reuse a single interceptor instance
var interceptor = new MyMaterializationInterceptor();
services.AddDbContext<CustomerContext>(
    b => b.UseSqlServer(connectionString)
          .AddInterceptors(interceptor));
```

Or use a static field:

```csharp
public class CustomerContext : DbContext
{
    private static readonly MyMaterializationInterceptor _interceptor = new();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.AddInterceptors(_interceptor);
}
```

Because these interceptors are singletons, they must be thread-safe. They should generally not hold mutable state. If you need to access scoped services (such as the current `DbContext`), use the `Microsoft.EntityFrameworkCore.Diagnostics.MaterializationInterceptionData.Context` or similar properties on the event data passed to each interceptor method.
