---
title: "Caching in .NET (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/caching.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Caching in .NET (part 3 of 3)

## Hybrid caching

The `Microsoft.Extensions.Caching.Hybrid.HybridCache` library combines the benefits of in-memory and distributed caching while addressing common challenges with existing caching APIs. Introduced in .NET 9, `HybridCache` provides a unified API that simplifies caching implementation and includes built-in features like stampede protection and configurable serialization.

### Key <example-value>

`HybridCache` offers several advantages over using `IMemoryCache` and `IDistributedCache` separately:

- **Two-level caching**: Automatically manages both in-memory (L1) and distributed (L2) cache layers. Data is retrieved from in-memory cache first for speed, then from distributed cache if needed, and finally from the source.
- **Stampede protection**: Prevents multiple concurrent requests that use the same `HybridCache` instance from executing the same expensive operation. Only one request fetches the data while others wait for the result. This coordination doesn't extend to other `HybridCache` instances, even if they use the same distributed cache.
- **Configurable serialization**: Supports multiple serialization formats including JSON (default), protobuf, and XML.
- **Tag-based invalidation**: Groups related cache entries with tags for efficient batch invalidation.
- **Simplified API**: The `GetOrCreateAsync` method handles cache misses, serialization, and storage automatically.

### When to use HybridCache

Consider using `HybridCache` when:

- You need both local (in-memory) and distributed caching in a multi-server environment.
- You want protection against cache stampede scenarios.
- You prefer a simplified API over manually coordinating `IMemoryCache` and `IDistributedCache`.
- You need tag-based cache invalidation for related entries.

> **Tip:**
> For single-server applications with simple caching needs, in-memory caching might be sufficient. For multi-server applications without the need for stampede protection or tag-based invalidation, consider distributed caching.

### HybridCache setup

To use `HybridCache`, install the `Microsoft.Extensions.Caching.Hybrid` NuGet package:

```dotnetcli
dotnet add package Microsoft.Extensions.Caching.Hybrid
```

Register the `HybridCache` service with DI by calling `Microsoft.Extensions.DependencyInjection.HybridCacheServiceExtensions.AddHybridCache*`:

```csharp
var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHybridCache();
```
The preceding code registers `HybridCache` with default options. You can also configure global options:

```csharp
var builderWithOptions = Host.CreateApplicationBuilder(args);
builderWithOptions.Services.AddHybridCache(options =>
{
    options.MaximumPayloadBytes = 1024 * 1024; // 1 MB
    options.MaximumKeyLength = 1024;
    options.DefaultEntryOptions = new HybridCacheEntryOptions
    {
        Expiration = TimeSpan.FromMinutes(5),
        LocalCacheExpiration = TimeSpan.FromMinutes(2)
    };
});
```
### Basic usage

The primary method for interacting with `HybridCache` is `Microsoft.Extensions.Caching.Hybrid.HybridCache.GetOrCreateAsync*`. This method checks the cache for an entry with the specified key and, if not found, calls the factory method to retrieve the data:

```csharp
async Task<WeatherData> GetWeatherDataAsync(HybridCache cache, string city)
{
    return await cache.GetOrCreateAsync(
        $"weather:{city}",
        async cancellationToken =>
        {
            // Simulate fetching from an external API
            await Task.Delay(100, cancellationToken);
            return new WeatherData(city, 72, "Sunny");
        }
    );
}
```
In the preceding C# code:

- The `GetOrCreateAsync` method takes a unique key and a factory method.
- If the data isn't in the cache, the factory method is called to retrieve it.
- The data is automatically stored in both in-memory and distributed caches.
- Only one concurrent request executes the factory method; others wait for the result.

### Entry options

You can override global defaults for specific cache entries using `Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions`:

```csharp
async Task<WeatherData> GetWeatherWithOptionsAsync(HybridCache cache, string city)
{
    var entryOptions = new HybridCacheEntryOptions
    {
        Expiration = TimeSpan.FromMinutes(10),
        LocalCacheExpiration = TimeSpan.FromMinutes(5)
    };

    return await cache.GetOrCreateAsync(
        $"weather:{city}",
        async cancellationToken => new WeatherData(city, 72, "<example-value>"),
        entryOptions
    );
}
```
The entry options allow you to configure:

- `Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions.Expiration`: How long the entry should be cached in the distributed cache.
- `Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions.LocalCacheExpiration`: How long the entry should be cached in local memory.
- `Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions.Flags`: Additional flags for controlling cache behavior.

### Tag-based invalidation

Tags allow you to group related cache entries and invalidate them together. This is useful for scenarios where related data needs to be refreshed as a unit:

```csharp
async Task<CustomerData> GetCustomerAsync(HybridCache cache, int customerId)
{
    var tags = new[] { "customer", $"customer:{customerId}" };

    return await cache.GetOrCreateAsync(
        $"customer:{customerId}",
        async cancellationToken => new CustomerData(customerId, "<example-value>", "<example-value>"),
        new HybridCacheEntryOptions { Expiration = TimeSpan.FromMinutes(30) },
        tags
    );
}
```
To invalidate all entries with a specific tag:

```csharp
async Task InvalidateCustomerCacheAsync(HybridCache cache, int customerId)
{
    await cache.RemoveByTagAsync($"customer:{customerId}");
}
```
You can also invalidate multiple tags at once:

```csharp
async Task InvalidateAllCustomersAsync(HybridCache cache)
{
    await cache.RemoveByTagAsync(new[] { "customer", "orders" });
}
```
> **Note:**
> Tag-based invalidation is a logical operation. It doesn't actively remove values from the cache but ensures that tagged entries are treated as cache misses. The entries eventually expire based on their configured lifetime.

### Remove cache entries

To remove a specific cache entry by key, use the `Microsoft.Extensions.Caching.Hybrid.HybridCache.RemoveAsync*` method:

```csharp
async Task RemoveWeatherDataAsync(HybridCache cache, string city)
{
    await cache.RemoveAsync($"weather:{city}");
}
```
To invalidate all cached entries, use the reserved wildcard tag `"*"`:

```csharp
async Task InvalidateAllCacheAsync(HybridCache cache)
{
    await cache.RemoveByTagAsync("*");
}
```
### Serialization

For distributed caching scenarios, `HybridCache` requires serialization. By default, it handles `string` and `byte[]` internally and uses `System.Text.Json` for other types. You can configure custom serializers for specific types or use a general-purpose serializer:

```csharp
// Custom serialization example
// Note: This requires implementing a custom IHybridCacheSerializer<T>
var builderWithSerializer = Host.CreateApplicationBuilder(args);
builderWithSerializer.Services.AddHybridCache(options =>
{
    options.DefaultEntryOptions = new HybridCacheEntryOptions
    {
        Expiration = TimeSpan.FromMinutes(10),
        LocalCacheExpiration = TimeSpan.FromMinutes(5)
    };
});
// To add a custom serializer, uncomment and provide your implementation:
// .AddSerializer<WeatherData, CustomWeatherDataSerializer>();
```
### Configure distributed cache

`HybridCache` uses the configured `Microsoft.Extensions.Caching.Distributed.IDistributedCache` implementation for its distributed (L2) cache. Even without an `IDistributedCache` configured, `HybridCache` still provides in-memory caching and stampede protection. To add Redis as a distributed cache:

```csharp
// Distributed cache with Redis
var builderWithRedis = Host.CreateApplicationBuilder(args);
builderWithRedis.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = "localhost:6379";
});
builderWithRedis.Services.AddHybridCache(options =>
{
    options.DefaultEntryOptions = new HybridCacheEntryOptions
    {
        Expiration = TimeSpan.FromMinutes(30),
        LocalCacheExpiration = TimeSpan.FromMinutes(5)
    };
});
```
For more information about distributed cache implementations, see Distributed caching.

## Distributed caching

In some scenarios, a distributed cache is required—such is the case with multiple app servers. A distributed cache supports higher scale-out than the in-memory caching approach. Using a distributed cache offloads the cache memory to an external process, but does require extra network I/O and introduces a bit more latency (even if nominal).

The distributed caching abstractions are part of the `Microsoft.Extensions.Caching.Memory` NuGet package, and there's even an `AddDistributedMemoryCache` extension method.

> **Caution:**
> `Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache*` should only be used in development or testing scenarios and is **not** a viable production implementation.

Consider any of the available implementations of the `IDistributedCache` from the following packages:

- `Microsoft.Extensions.Caching.SqlServer`
- `Microsoft.Extensions.Caching.StackExchangeRedis`
- `Microsoft.Extensions.Caching.Cosmos`
- `Microsoft.Extensions.Caching.Postgres`
- `NCache.Microsoft.Extensions.Caching.OpenSource`

### Distributed caching API

The distributed caching APIs are a bit more primitive than their in-memory caching API counterparts. The key-value pairs are a bit more basic. In-memory caching keys are based on an `object`, whereas the distributed keys are a `string`. With in-memory caching, the value can be any strongly typed generic, whereas values in distributed caching are persisted as `byte[]`. That's not to say that various implementations don't expose strongly typed generic values, but that's an implementation detail.

#### Create values

To create values in the distributed cache, call one of the set APIs:

- `Microsoft.Extensions.Caching.Distributed.IDistributedCache.SetAsync*`
- `Microsoft.Extensions.Caching.Distributed.IDistributedCache.Set*`

Using the `AlphabetLetter` record from the in-memory cache example, you could serialize the object to JSON and then encode the `string` as a `byte[]`:

```csharp
DistributedCacheEntryOptions options = new()
{
    AbsoluteExpirationRelativeToNow =
        TimeSpan.FromMilliseconds(MillisecondsAbsoluteExpiration)
};

AlphabetLetter alphabetLetter = new(letter);
string json = JsonSerializer.Serialize(alphabetLetter);
byte[] bytes = Encoding.UTF8.GetBytes(json);

await cache.SetAsync(letter.ToString(), bytes, options);
```
Much like in-memory caching, cache entries can have options to help fine-tune their existence in the cache—in this case, the `Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions`.

##### Create extension methods

There are several convenience-based extension methods for creating values. These methods help to avoid encoding `string` representations of objects into a `byte[]`:

- `Microsoft.Extensions.Caching.Distributed.DistributedCacheExtensions.SetStringAsync*`
- `Microsoft.Extensions.Caching.Distributed.DistributedCacheExtensions.SetString*`

#### Read values

To read values from the distributed cache, call one of the `Get` APIs:

- `Microsoft.Extensions.Caching.Distributed.IDistributedCache.GetAsync*`
- `Microsoft.Extensions.Caching.Distributed.IDistributedCache.Get*`

```csharp
AlphabetLetter? alphabetLetter = null;
byte[]? bytes = await cache.GetAsync(letter.ToString());
if (bytes is { Length: > 0 })
{
    string json = Encoding.UTF8.GetString(bytes);
    alphabetLetter = JsonSerializer.Deserialize<AlphabetLetter>(json);
}
```
Once a cache entry is read out of the cache, you can get the UTF8 encoded `string` representation from the `byte[]`.

##### Read extension methods

There are several convenience-based extension methods for reading values. These methods help to avoid decoding `byte[]` into `string` representations of objects:

- `Microsoft.Extensions.Caching.Distributed.DistributedCacheExtensions.GetStringAsync*`
- `Microsoft.Extensions.Caching.Distributed.DistributedCacheExtensions.GetString*`

#### Update values

There is no way to update the values in the distributed cache with a single API call. Instead, values can have their sliding expirations reset with one of the refresh APIs:

- `Microsoft.Extensions.Caching.Distributed.IDistributedCache.RefreshAsync*`
- `Microsoft.Extensions.Caching.Distributed.IDistributedCache.Refresh*`

If the actual value needs to be updated, you must delete the value and then re-add it.

#### Delete values

To delete values in the distributed cache, call one of the `Remove` APIs:

- `Microsoft.Extensions.Caching.Distributed.IDistributedCache.RemoveAsync*`
- `Microsoft.Extensions.Caching.Distributed.IDistributedCache.Remove*`

> **Tip:**
> While there are synchronous versions of these APIs, consider the fact that implementations of distributed caches are reliant on network I/O. For this reason, it's usually preferable to use the asynchronous APIs.

## See also

- Dependency injection in .NET
- .NET Generic Host
- Worker Services in .NET
- Azure for .NET developers
- Cache in-memory in ASP.NET Core
- Distributed caching in ASP.NET Core
- HybridCache library in ASP.NET Core
