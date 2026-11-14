---
title: "Advanced Performance Topics - EF Core (part 1 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/performance/advanced-performance-topics.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Advanced Performance Topics

## DbContext pooling

A `DbContext` is generally a light object: creating and disposing one doesn't involve a database operation, and most applications can do so without any noticeable impact on performance. However, each context instance does set up various internal services and objects necessary for performing its duties, and the overhead of continuously doing so may be significant in high-performance scenarios. For these cases, EF Core can *pool* your context instances: when you dispose your context, EF Core resets its state and stores it in an internal pool; when a new instance is next requested, that pooled instance is returned instead of setting up a new one. Context pooling allows you to pay context setup costs only once at program startup, rather than continuously.

Note that context pooling is orthogonal to database connection pooling, which is managed at a lower level in the database driver.

### With dependency injection

The typical pattern in an ASP.NET Core app using EF Core involves registering a custom `Microsoft.EntityFrameworkCore.DbContext` type into the dependency injection container via `Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContext*`. Then, instances of that type are obtained through constructor parameters in controllers or Razor Pages.

To enable context pooling, simply replace `AddDbContext` with `Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContextPool*`:

```csharp
builder.Services.AddDbContextPool<WeatherForecastContext>(
    o => o.UseSqlServer(builder.Configuration.GetConnectionString("WeatherForecastContext")));
```

The `poolSize` parameter of `Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContextPool*` sets the maximum number of instances retained by the pool (defaults to 1024). Once `poolSize` is exceeded, new context instances are not cached and EF falls back to the non-pooling behavior of creating instances on demand.

### Without dependency injection

To use context pooling without dependency injection, initialize a `PooledDbContextFactory` and request context instances from it:

```csharp
var options = new DbContextOptionsBuilder<PooledBloggingContext>()
    .UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Blogging;Trusted_Connection=True;ConnectRetryCount=0")
    .Options;

var factory = new PooledDbContextFactory<PooledBloggingContext>(options);

using (var context = factory.CreateDbContext())
{
    var allPosts = await context.Posts.ToListAsync();
}
```

The `poolSize` parameter of the `PooledDbContextFactory` constructor sets the maximum number of instances retained by the pool (defaults to 1024). Once `poolSize` is exceeded, new context instances are not cached and EF falls back to the non-pooling behavior of creating instances on demand.

***

### Benchmarks

Following are the benchmark results for fetching a single row from a SQL Server database running locally on the same machine, with and without context pooling. As always, results will change with the number of rows, the latency to your database server and other factors. Importantly, this benchmarks single-threaded pooling performance, while a real-world contended scenario may have different results; benchmark on your platform before making any decisions. The source code is available here, feel free to use it as a basis for your own measurements.

|                Method | NumBlogs |     Mean |    Error |   StdDev |   Gen 0 | Gen 1 | Gen 2 | Allocated |
|---------------------- |--------- |---------:|---------:|---------:|--------:|------:|------:|----------:|
| WithoutContextPooling |        1 | 701.6 us | 26.62 us | 78.48 us | 11.7188 |     - |     - |  50.38 KB |
|    WithContextPooling |        1 | 350.1 us |  6.80 us | 14.64 us |  0.9766 |     - |     - |   4.63 KB |

### Managing state in pooled contexts

Context pooling works by reusing the same context instance across requests; this means that it's effectively registered as a Singleton, and the same instance is reused across multiple requests (or DI scopes). This means that special care must be taken when the context involves any state that may change between requests. Crucially, the context's `OnConfiguring` is only invoked once - when the instance context is first created - and so cannot be used to set state which needs to vary (e.g. a tenant ID).

A typical scenario involving context state would be a multi-tenant ASP.NET Core application, where the context instance has a *tenant ID* which is taken into account by queries (see Global Query Filters for more details). Since the tenant ID needs to change with each web request, we need to go through some extra steps to make it all work with context pooling.

Let's assume that your application registers a scoped `ITenant` service, which wraps the tenant ID and any other tenant-related information:

```csharp
// Below is a minimal tenant resolution strategy, which registers a scoped ITenant service in DI.
// In this sample, we simply accept the tenant ID as a request query, which means that a client can impersonate any
// tenant. In a real application, the tenant ID would be set based on secure authentication data.
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ITenant>(sp =>
{
    var tenantIdString = sp.GetRequiredService<IHttpContextAccessor>().HttpContext.Request.Query["TenantId"];

    return tenantIdString != StringValues.Empty && int.TryParse(tenantIdString, out var tenantId)
        ? new Tenant(tenantId)
        : null;
});
```

As written above, pay special attention to where you get the tenant ID from - this is an important aspect of your application's security.

Once we have our scoped `ITenant` service, register a pooling context factory as a Singleton service, as usual:

```csharp
builder.Services.AddPooledDbContextFactory<WeatherForecastContext>(
    o => o.UseSqlServer(builder.Configuration.GetConnectionString("WeatherForecastContext")));
```

Next, write a custom context factory which gets a pooled context from the Singleton factory we registered, and injects the tenant ID into context instances it hands out:

```csharp
public class WeatherForecastScopedFactory : IDbContextFactory<WeatherForecastContext>
{
    private const int DefaultTenantId = -1;

    private readonly IDbContextFactory<WeatherForecastContext> _pooledFactory;
    private readonly int _tenantId;

    public WeatherForecastScopedFactory(
        IDbContextFactory<WeatherForecastContext> pooledFactory,
        ITenant tenant)
    {
        _pooledFactory = pooledFactory;
        _tenantId = tenant?.TenantId ?? DefaultTenantId;
    }

    public WeatherForecastContext CreateDbContext()
    {
        var context = _pooledFactory.CreateDbContext();
        context.TenantId = _tenantId;
        return context;
    }
}
```

Once we have our custom context factory, register it as a Scoped service:

```csharp
builder.Services.AddScoped<WeatherForecastScopedFactory>();
```

Finally, arrange for a context to get injected from our Scoped factory:

```csharp
builder.Services.AddScoped(
    sp => sp.GetRequiredService<WeatherForecastScopedFactory>().CreateDbContext());
```

As this point, your controllers automatically get injected with a context instance that has the right tenant ID, without having to know anything about it.

The full source code for this sample is available here.

> **Note:**
> Although EF Core takes care of resetting internal state for `DbContext` and its related services, it generally does not reset state in the underlying database driver, which is outside of EF. For example, if you manually open and use a `DbConnection` or otherwise manipulate ADO.NET state, it's up to you to restore that state before returning the context instance to the pool, e.g. by closing the connection. Failure to do so may cause state to get leaked across unrelated requests.

### Connection Pooling Considerations

With most databases, a long-lived connection is required for performing database operations, and such connections can be expensive to open and close. EF does not implement connection pooling itself, but relies on the underlying database driver (e.g. ADO.NET driver) for managing database connections. Connection pooling is a client-side mechanism that reuses existing database connections to reduce the overhead of opening and closing connections repeatedly. This mechanism is generally consistent across databases supported by EF, such as Azure SQL Database, PostgreSQL, and others., although factors specific to the database or environment, such as resource limits or service configurations, may affect pooling efficiency. Connection pooling is usually enabled by default, and any pooling configuration must be performed at the low-level driver level as documented by that driver; for example, when using ADO.NET, parameters such as minimum or maximum pool sizes are usually configured via the connection string.

Connection pooling is completely orthogonal to EF's `DbContext` pooling, which is described above: while the low-level database driver pools database connections (to avoid the overhead of opening/closing connections), EF can pool context instances (to avoid context memory allocation and initialization overheads). Regardless of whether a context instance is pooled or not, EF generally opens connections just before each operation (e.g. query), and closes it right afterwards, causing it to be returned to the pool; this is done to avoid keeping connections out of the pool any longer than is necessary.

## Compiled queries

When EF receives a LINQ query tree for execution, it must first "compile" that tree, e.g. produce SQL from it. Because this task is a heavy process, EF caches queries by the query tree shape, so that queries with the same structure reuse internally-cached compilation outputs. This caching ensures that executing the same LINQ query multiple times is very fast, even if parameter values differ.

However, EF must still perform certain tasks before it can make use of the internal query cache. For example, your query's expression tree must be recursively compared with the expression trees of cached queries, to find the correct cached query. The overhead for this initial processing is negligible in the majority of EF applications, especially when compared to other costs associated with query execution (network I/O, actual query processing and disk I/O at the database...). However, in certain high-performance scenarios it may be desirable to eliminate it.

EF supports *compiled queries*, which allow the explicit compilation of a LINQ query into a .NET delegate. Once this delegate is acquired, it can be invoked directly to execute the query, without providing the LINQ expression tree. This technique bypasses the cache lookup, and provides the most optimized way to execute a query in EF Core. Following are some benchmark results comparing compiled and non-compiled query performance; benchmark on your platform before making any decisions. The source code is available here, feel free to use it as a basis for your own measurements.

|               Method | NumBlogs |     Mean |    Error |   StdDev |  Gen 0 | Allocated |
|--------------------- |--------- |---------:|---------:|---------:|-------:|----------:|
|    WithCompiledQuery |        1 | 564.2 us |  6.75 us |  5.99 us | 1.9531 |      9 KB |
| WithoutCompiledQuery |        1 | 671.6 us | 12.72 us | 16.54 us | 2.9297 |     13 KB |
|    WithCompiledQuery |       10 | 645.3 us | 10.00 us |  9.35 us | 2.9297 |     13 KB |
| WithoutCompiledQuery |       10 | 709.8 us | 25.20 us | 73.10 us | 3.9063 |     18 KB |

To use compiled queries, first compile a query with `Microsoft.EntityFrameworkCore.EF.CompileAsyncQuery*` as follows (use `Microsoft.EntityFrameworkCore.EF.CompileQuery*` for synchronous queries):

```csharp
private static readonly Func<BloggingContext, int, IAsyncEnumerable<Blog>> _compiledQuery
    = EF.CompileAsyncQuery(
        (BloggingContext context, int length) => context.Blogs.Where(b => b.Url.StartsWith("http://") && b.Url.Length == length));
```

In this code sample, we provide EF with a lambda accepting a `DbContext` instance, and an arbitrary parameter to be passed to the query. You can now invoke that delegate whenever you wish to execute the query:

```csharp
await foreach (var blog in _compiledQuery(context, 8))
{
    // Do something with the results
}
```

Note that the delegate is thread-safe, and can be invoked concurrently on different context instances.

### Limitations

* Compiled queries may only be used against a single EF Core model. Different context instances of the same type can sometimes be configured to use different models; running compiled queries in this scenario is not supported.
* When using parameters in compiled queries, use simple, scalar parameters. More complex parameter expressions - such as member/method accesses on instances - are not supported.
