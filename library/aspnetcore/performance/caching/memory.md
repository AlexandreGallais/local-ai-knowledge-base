---
title: "Cache in-memory in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/performance/caching/memory.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Cache in-memory in ASP.NET Core

By Rick Anderson, John Luo, and Steve Smith

-->
-->

Caching can significantly improve the performance and scalability of an app by reducing the work required to generate content. Caching works best with data that changes infrequently **and** is expensive to generate. Caching makes a copy of data that can be returned much faster than from the source. Apps should be written and tested to **never** depend on cached data.

ASP.NET Core supports several different caches. The simplest cache is based on the `Microsoft.Extensions.Caching.Memory.IMemoryCache` interface. `IMemoryCache` represents a cache stored in the memory of the web server. Apps running on a server farm (multiple servers) should ensure sessions are sticky when using the in-memory cache. Sticky sessions ensure that requests from a client all go to the same server. For example, an Azure web app uses Microsoft Application Request Routing (ARR) to route all requests to the same server.

Nonsticky sessions in a web farm require a distributed cache to avoid cache consistency problems. For some apps, a distributed cache can support higher scale-out than an in-memory cache. Using a distributed cache offloads the cache memory to an external process.

The in-memory cache can store any object. The distributed cache interface is limited to `byte[]`. The in-memory and distributed cache store cache items as key-value pairs.

## Use System.Runtime.Caching/MemoryCache

`System.Runtime.Caching`/`System.Runtime.Caching.MemoryCache` (NuGet package) can be used with:

* .NET Standard 2.0 or later
* Any .NET implementation that targets .NET Standard 2.0 or later (such as ASP.NET Core 3.1 or later)
* .NET Framework 4.5 or later

Microsoft.Extensions.Caching.Memory/`IMemoryCache` (described in this article) is recommended over `System.Runtime.Caching`/`MemoryCache` because it offers better integration with ASP.NET Core. For example, `IMemoryCache` works natively with ASP.NET Core dependency injection.

Use `System.Runtime.Caching`/`MemoryCache` as a compatibility bridge when porting code from ASP.NET 4.x to ASP.NET Core.

## Review guidelines for in-memory caching

The following guidelines apply to in-memory caching:

* Code should always have a fallback option to fetch data and **not** depend on the availability of a cached value.

* The cache uses memory, which is a scarce resource. Limit cache growth:

  * **Don't** insert external input into the cache. As an example, using arbitrary user-provided input as a cache key isn't recommended because the input might consume an unpredictable amount of memory.

  * Use expirations to limit cache growth.

  * Limit cache size with SetSize, Size, and SizeLimit. The ASP.NET Core runtime **doesn't** limit cache size based on memory pressure. The developer is responsible for limiting the cache size.

## Create an instance of IMemoryCache

In-memory caching is a *service* that an app references by using dependency injection.

> **Warning:**
> If the same cache is used by multiple frameworks or libraries, it's a _shared_ cache. If you use a shared memory cache from dependency injection and also use `SetSize`, `Size`, and `SizeLimit` to limit the cache size, the app can fail.
>
> When a size limit is set on a cache, all entries must specify a size when they're added. This approach can lead to issues because developers might not have full control over what uses the shared cache.
>
> To limit the cache size with the `SetSize` method, the `Size` property, or the `SizeLimit` property, create a cache singleton for caching. For more information and an example, see Limit cache size with SetSize, Size, and SizeLimit.

Request the `IMemoryCache` instance in the constructor:

```csharp
public class IndexModel : PageModel
{
    private readonly IMemoryCache _memoryCache;

    public IndexModel(IMemoryCache memoryCache) =>
        _memoryCache = memoryCache;

    // ...
```
The following code uses the `Microsoft.Extensions.Caching.Memory.IMemoryCache.TryGetValue*` method to check if a time is in the cache. If a time isn't cached, a new entry is created and added to the cache with the `Microsoft.Extensions.Caching.Memory.CacheExtensions.Set*` method:

```csharp
public void OnGet()
{
    CurrentDateTime = DateTime.Now;

    if (!_memoryCache.TryGetValue(CacheKeys.Entry, out DateTime cacheValue))
    {
        cacheValue = CurrentDateTime;

        var cacheEntryOptions = new MemoryCacheEntryOptions()
            .SetSlidingExpiration(TimeSpan.FromSeconds(3));

        _memoryCache.Set(CacheKeys.Entry, cacheValue, cacheEntryOptions);
    }

    CacheCurrentDateTime = cacheValue;
}
```
In the preceding code, the cache entry is configured with a sliding expiration of 3 seconds. If the cache entry isn't accessed for more than 3 seconds, the entry is evicted from the cache. Each time the cache entry is accessed, it remains in the cache for a further 3 seconds. The `CacheKeys` class is part of the download sample.

The current time and the cached time are displayed:

```cshtml
<ul>
	<li>Current Time: @Model.CurrentDateTime</li>
	<li>Cached Time: @Model.CacheCurrentDateTime</li>
</ul>
```
The following code uses the `Set` extension method to cache data for a relative time without `Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions`:

```csharp
_memoryCache.Set(CacheKeys.Entry, DateTime.Now, TimeSpan.FromDays(1));
```
In the preceding code, the cache entry is configured with a relative expiration of one day. The cache entry is evicted from the cache after one day, even if the entry is accessed during the timeout period.

The following code uses the `Microsoft.Extensions.Caching.Memory.CacheExtensions.GetOrCreate*` and `Microsoft.Extensions.Caching.Memory.CacheExtensions.GetOrCreateAsync*` methods to cache data.

```csharp
public void OnGetCacheGetOrCreate()
{
    var cachedValue = _memoryCache.GetOrCreate(
        CacheKeys.Entry,
        cacheEntry =>
        {
            cacheEntry.SlidingExpiration = TimeSpan.FromSeconds(3);
            return DateTime.Now;
        });

    // ...
}

public async Task OnGetCacheGetOrCreateAsync()
{
    var cachedValue = await _memoryCache.GetOrCreateAsync(
        CacheKeys.Entry,
        cacheEntry =>
        {
            cacheEntry.SlidingExpiration = TimeSpan.FromSeconds(3);
            return Task.FromResult(DateTime.Now);
        });

    // ...
}
```
The following code calls the `Microsoft.Extensions.Caching.Memory.CacheExtensions.Get*` method to fetch the cached time:

```csharp
var cacheEntry = _memoryCache.Get<DateTime?>(CacheKeys.Entry);
```
The following code gets or creates a cached item with absolute expiration:

```csharp
var cachedValue = _memoryCache.GetOrCreate(
    CacheKeys.Entry,
    cacheEntry =>
    {
        cacheEntry.AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(20);
        return DateTime.Now;
    });
```
A cached item set with only a sliding expiration is at risk of never expiring. If the cached item is repeatedly accessed within the sliding expiration interval, the item never expires. Combining a sliding expiration with an absolute expiration guarantees the item expires. The absolute expiration sets an upper bound on how long the item can be cached. It still allows the item to expire earlier, if the item isn't requested within the sliding expiration interval. If either the sliding expiration interval *or* the absolute expiration time passes, the item is evicted from the cache.

The following code gets or creates a cached item with both sliding *and* absolute expiration:

```csharp
var cachedValue = _memoryCache.GetOrCreate(
    CacheKeys.CallbackEntry,
    cacheEntry =>
    {
        cacheEntry.SlidingExpiration = TimeSpan.FromSeconds(3);
        cacheEntry.AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(20);
        return DateTime.Now;
    });
```
The preceding code guarantees the data isn't cached longer than the absolute time.

`Microsoft.Extensions.Caching.Memory.CacheExtensions.GetOrCreate*`, `Microsoft.Extensions.Caching.Memory.CacheExtensions.GetOrCreateAsync*`, and `Microsoft.Extensions.Caching.Memory.CacheExtensions.Get*` are extension methods in the `Microsoft.Extensions.Caching.Memory.CacheExtensions` class. These methods extend the capability of `Microsoft.Extensions.Caching.Memory.IMemoryCache`.

## Create MemoryCacheEntryOptions for an entry

The following example demonstrates how to create `Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions` for an entry. The code completes the following tasks:

* Sets the cache priority to `Microsoft.Extensions.Caching.Memory.CacheItemPriority.NeverRemove`.

* Sets a `Microsoft.Extensions.Caching.Memory.PostEvictionDelegate` to call after the entry is evicted from the cache. The callback runs on a different thread from the code that removes the item from the cache.

```csharp
public void OnGetCacheRegisterPostEvictionCallback()
{
    var memoryCacheEntryOptions = new MemoryCacheEntryOptions()
        .SetPriority(CacheItemPriority.NeverRemove)
        .RegisterPostEvictionCallback(PostEvictionCallback, _memoryCache);

    _memoryCache.Set(CacheKeys.CallbackEntry, DateTime.Now, memoryCacheEntryOptions);
}

private static void PostEvictionCallback(
    object cacheKey, object? cacheValue, EvictionReason evictionReason, object? state)
{
    if (state is IMemoryCache memoryCache)
    {
        memoryCache.Set(
            CacheKeys.CallbackMessage,
            $"Entry {cacheKey} was evicted: {evictionReason}.");
    }
}
```
## Limit cache size with SetSize, Size, and SizeLimit

A `MemoryCache` instance can optionally specify and enforce a size limit. The cache size limit doesn't have a defined unit of measure because the cache has no mechanism to measure the size of entries. If the cache size limit is set, all entries must specify size. The ASP.NET Core runtime doesn't limit cache size based on memory pressure. It's up to the developer to limit cache size. The size specified is in units the developer chooses.

For example:

* If the web app primarily caches strings, each cache entry size might be the string length.
* The app can specify the size of all entries as 1, and the size limit is the count of entries.

If the `Microsoft.Extensions.Caching.Memory.MemoryCacheOptions.SizeLimit` property isn't set, the cache grows without bound. The ASP.NET Core runtime doesn't trim the cache when system memory is low. Apps must be architected to:

* Limit cache growth.
* Call the `Microsoft.Extensions.Caching.Memory.MemoryCache.Compact*` or `Microsoft.Extensions.Caching.Memory.MemoryCache.Remove*` method when available memory is limited.

The following code creates a unitless fixed-size `Microsoft.Extensions.Caching.Memory.MemoryCache` instance that's accessible by dependency injection:

```csharp
public class MyMemoryCache
{
    public MemoryCache Cache { get; } = new MemoryCache(
        new MemoryCacheOptions
        {
            SizeLimit = 1024
        });
}
```
The `SizeLimit` property doesn't have units. Cached entries must specify size in whatever units they consider most appropriate when the cache size limit is set. All users of a cache instance should use the same unit system. An entry isn't cached if the sum of the cached entry sizes exceeds the value specified by `SizeLimit`. If no cache size limit is set, the cache size set on the entry is ignored.

The following code registers the `MyMemoryCache` instance with the dependency injection container:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<MyMemoryCache>();
```
`MyMemoryCache` is created as an independent memory cache for components that are aware of this size-limited cache and know how to set cache entry size appropriately.

The size of the cache entry can be set by using the `Microsoft.Extensions.Caching.Memory.MemoryCacheEntryExtensions.SetSize*` extension method or the `Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions.Size` property:

```csharp
if (!_myMemoryCache.Cache.TryGetValue(CacheKeys.Entry, out DateTime cacheValue))
{
    var cacheEntryOptions = new MemoryCacheEntryOptions()
        .SetSize(1);

    // cacheEntryOptions.Size = 1;

    _myMemoryCache.Cache.Set(CacheKeys.Entry, cacheValue, cacheEntryOptions);
}
```
In the preceding code, the two highlighted lines achieve the same result of setting the size of the cache entry. The `SetSize` method is provided for convenience when chaining calls onto `new MemoryCacheOptions()`.

### Remove cache items with MemoryCache.Compact

The `MemoryCache.Compact` method attempts to remove the specified percentage of the cache in the following order:

* All expired items
* Items by priority, where lowest priority items are removed first
* Least recently used objects
* Items with the earliest absolute expiration
* Items with the earliest sliding expiration

Pinned items with priority `Microsoft.Extensions.Caching.Memory.CacheItemPriority.NeverRemove` are never removed. The following code removes a cache item and calls the `Compact` method to remove 25% of cached entries:

```csharp
_myMemoryCache.Cache.Remove(CacheKeys.Entry);
_myMemoryCache.Cache.Compact(.25);
```
For more information, see the Compact source on GitHub.
