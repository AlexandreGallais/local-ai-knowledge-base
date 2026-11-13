---
title: "HybridCache library in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/performance/caching/hybrid.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# HybridCache library in ASP.NET Core (part 2 of 2)

## Serialization

Use of a secondary, out-of-process cache requires serialization. Serialization is configured as part of registering the `HybridCache` service. Type-specific and general-purpose serializers can be configured via the `Microsoft.Extensions.DependencyInjection.HybridCacheBuilderExtensions.AddSerializer*` and `Microsoft.Extensions.DependencyInjection.HybridCacheBuilderExtensions.AddSerializerFactory*` methods, chained from the `AddHybridCache` call. By default, the library
handles `string` and `byte[]` internally, and uses `System.Text.Json` for everything else. `HybridCache` can also use other serializers, such as protobuf or XML.

The following example configures the service to use a type-specific protobuf serializer:

```csharp
// Add services to the container.

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();

builder.Services.AddHybridCache(options =>
    {
        options.DefaultEntryOptions = new HybridCacheEntryOptions
        {
            Expiration = TimeSpan.FromSeconds(10),
            LocalCacheExpiration = TimeSpan.FromSeconds(5)
        };
    }).AddSerializer<SomeProtobufMessage, 
        GoogleProtobufSerializer<SomeProtobufMessage>>();
```
The following example configures the service to use a general-purpose protobuf serializer that can handle many protobuf types:

```csharp
// Add services to the container.

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();

builder.Services.AddHybridCache(options =>
{
    options.DefaultEntryOptions = new HybridCacheEntryOptions
    {
        Expiration = TimeSpan.FromSeconds(10),
        LocalCacheExpiration = TimeSpan.FromSeconds(5)
    };
}).AddSerializerFactory<GoogleProtobufSerializerFactory>();
```
The secondary cache requires a data store, such as Redis, SQL Server, or Postgres. To use Azure Cache for Redis, for example:

* Install the `Microsoft.Extensions.Caching.StackExchangeRedis` package.
* Create an instance of Azure Cache for Redis.
* Get a connection string that connects to the Redis instance. Find the connection string by selecting **Show access keys** on the **Overview** page in the Azure portal.
* Store the connection string in the app's configuration. For example, use a user secrets file that looks like the following JSON, with the connection string in the `ConnectionStrings` section. Replace `<the connection string>` with the actual connection string:

  ```json
  {
    "ConnectionStrings": {
      "RedisConnectionString": "<the connection string>"
    }
  }
  ```

* Register in DI the `IDistributedCache` implementation that the Redis package provides. To do that, call `AddStackExchangeRedisCache`, and pass in the connection string. For example:

```csharp
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = 
        builder.Configuration.GetConnectionString("RedisConnectionString");
});
```
* The Redis `IDistributedCache` implementation is now available from the app's DI container. `HybridCache` uses it as the secondary cache and uses the serializer configured for it.

For more information, see the HybridCache serialization sample app.

## Cache storage

By default `HybridCache` uses `Microsoft.Extensions.Caching.Memory.MemoryCache` for its primary cache storage. Cache entries are stored in-process, so each server has a separate cache that's lost whenever the server process is restarted. For secondary out-of-process storage, such as Redis, SQL Server, or Postgres, `HybridCache` uses the configured `IDistributedCache` implementation, if any. But even without an `IDistributedCache` implementation, the `HybridCache` service still provides in-process caching and stampede protection.

> **Note:**
> When invalidating cache entries by key or by tags, they're invalidated in the current server and in the secondary out-of-process storage. However, the in-memory cache in other servers isn't affected.

> **Note:**
> When the primary cache is the default `Microsoft.Extensions.Caching.Memory.MemoryCache`, `HybridCache` doesn't use the `IDistributedCache` implementation registered by `Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache*` as its secondary cache. That implementation stores entries in the same process, so it would only duplicate the primary cache. If it's the only `IDistributedCache` registered, `HybridCache` caches in-process only, and cache entries aren't shared between servers. To share cache entries between servers, register an out-of-process implementation, such as Redis.

## Optimize performance

To optimize performance, configure `HybridCache` to reuse objects and avoid `byte[]` allocations.

### Reuse objects

By reusing instances, `HybridCache` can reduce the overhead of CPU and object allocations associated with per-call deserialization. This can lead to performance improvements in scenarios where the cached objects are large or accessed frequently.

In typical existing code that uses `IDistributedCache`, every retrieval of an object from the cache results in deserialization. This behavior means that each concurrent caller gets a separate instance of the object, which can't interact with other instances. The result is thread safety, as there's no risk of concurrent modifications to the same object instance.

Because much `HybridCache` usage will be adapted from existing `IDistributedCache` code, `HybridCache` preserves this behavior by default to avoid introducing concurrency bugs. However, objects are inherently thread-safe if:

* They're immutable types.
* The code doesn't modify them.

In such cases, inform `HybridCache` that it's safe to reuse instances by making both of the following changes:

* Marking the type as `sealed`. The `sealed` keyword in C# means that the class can't be inherited.
* Applying the `[ImmutableObject(true)]` attribute to the type. The `[ImmutableObject(true)]` attribute indicates that the object's state can't be changed after it's created.

### Avoid `byte[]` allocations

`HybridCache` also provides optional APIs for `IDistributedCache` implementations, to avoid `byte[]` allocations. This feature is implemented by the preview versions of the `Microsoft.Extensions.Caching.StackExchangeRedis`,  `Microsoft.Extensions.Caching.SqlServer`, and `Microsoft.Extensions.Caching.Postgres` packages. For more information, see `Microsoft.Extensions.Caching.Distributed.IBufferDistributedCache`.
Here are the .NET CLI commands to install the packages:

```dotnetcli
dotnet add package Microsoft.Extensions.Caching.StackExchangeRedis
```

```dotnetcli
dotnet add package Microsoft.Extensions.Caching.SqlServer
```

```dotnetcli
dotnet add package Microsoft.Extensions.Caching.Postgres
```

## Custom HybridCache implementations

A concrete implementation of the `HybridCache` abstract class is included in the shared framework and is provided via dependency injection. But developers are welcome to provide or consume custom implementations of the API, for example FusionCache.

## Use Hybrid Cache with Native AOT

 The following Native AOT-specific considerations apply to `HybridCache`:

* **Serialization**

  Native AOT doesn't support runtime reflection-based serialization. If you cache custom types, you must use source generators or explicitly configure serializers that are compatible with AOT, like `System.Text.Json` source generation. `HybridCache` is still under development, and simplifying the way to use it with AOT is a high priority for that development. For more information, see pull request dotnet/extensions#6475

* **Trimming**

  Make sure all types you cache are referenced in a way that prevents them from being trimmed by the AOT compiler. Using source generators for serialization helps with this requirement. For more information, see ASP.NET Core support for Native AOT.

If you set up serialization and trimming correctly, `HybridCache` behaves the same way in Native AOT as in regular ASP.NET Core apps.

## Compatibility

The `HybridCache` library supports older .NET runtimes, down to .NET Framework 4.7.2 and .NET Standard 2.0.

## Related content

For more information, see the `HybridCache` source code
