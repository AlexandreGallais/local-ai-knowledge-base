---
title: "Advanced Performance Topics - EF Core (part 3 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/performance/advanced-performance-topics.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Advanced Performance Topics - EF Core (part 3 of 3)

## Reducing runtime overhead

As with any layer, EF Core adds a bit of runtime overhead compared to coding directly against lower-level database APIs. This runtime overhead is unlikely to impact most real-world applications in a significant way; the other topics in this performance guide, such as query efficiency, index usage and minimizing roundtrips, are far more important. In addition, even for highly-optimized applications, network latency and database I/O will usually dominate any time spent inside EF Core itself. However, for high-performance, low-latency applications where every bit of perf is important, the following recommendations can be used to reduce EF Core overhead to a minimum:

* Turn on DbContext pooling; our benchmarks show that this feature can have a decisive impact on high-perf, low-latency applications.
  * Make sure that the `maxPoolSize` corresponds to your usage scenario; if it is too low, `DbContext` instances will be constantly created and disposed, degrading performance. Setting it too high may needlessly consume memory as unused `DbContext` instances are maintained in the pool.
  * For an extra tiny perf boost, consider using `PooledDbContextFactory` instead of having DI inject context instances directly. DI management of `DbContext` pooling incurs a slight overhead.
* Use precompiled queries for hot queries.
  * The more complex the LINQ query - the more operators it contains and the bigger the resulting expression tree - the more gains can be expected from using compiled queries.
* Consider disabling thread safety checks by setting `EnableThreadSafetyChecks` to false in your context configuration.
  * Using the same `DbContext` instance concurrently from different threads isn't supported. EF Core has a safety feature which detects this programming bug in many cases (but not all), and immediately throws an informative exception. However, this safety feature adds some runtime overhead.
  * **WARNING:** Only disable thread safety checks after thoroughly testing that your application doesn't contain such concurrency bugs.

## Memory Cache Integration

EF Core uses `IMemoryCache` for internal caching operations such as query compilation and model building. By default, EF Core configures its own `IMemoryCache` with a size limit of 10240. For reference, a compiled query has a cache size of 10, while the built model has a cache size of 100.

If you need to change the default cache size limit, use `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.UseMemoryCache*` to provide a custom `IMemoryCache` instance:

```csharp
var memoryCache = new MemoryCache(new MemoryCacheOptions { SizeLimit = 20480 });
services.AddSingleton<IDisposable>(memoryCache);

services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseMemoryCache(memoryCache);
    options.UseSqlServer(connectionString);
});
```

The `MemoryCache` instance is registered as `IDisposable` so that it will be disposed when the service provider is disposed, without replacing the app-wide `IMemoryCache`.

Alternatively, if you register a custom `IMemoryCache` via `AddMemoryCache` in DI, you can resolve it from the service provider. Note that this shares the cache between EF Core and any other services that use `IMemoryCache`, so the size limit should account for all consumers. When a `SizeLimit` is set, all cache entries from every consumer must specify a size; otherwise `IMemoryCache` will throw when entries are added:

```csharp
services.AddMemoryCache(options => options.SizeLimit = 20480);

services.AddDbContext<ApplicationDbContext>((serviceProvider, options) =>
{
    options.UseMemoryCache(serviceProvider.GetRequiredService<IMemoryCache>());
    options.UseSqlServer(connectionString);
});
```
