---
title: "Cache in-memory in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/performance/caching/memory.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Cache in-memory in ASP.NET Core (part 2 of 2)

## Evict a cache entry with expired dependencies

To enable inheritance of expiration tokens and time-based expiration settings between linked cache entries, set `Microsoft.Extensions.Caching.Memory.MemoryCacheOptions.TrackLinkedCacheEntries` to `true` when registering the cache in `Program.cs`. This option is `false` by default starting in .NET 7:

```csharp
builder.Services.AddMemoryCache(options =>
{
    options.TrackLinkedCacheEntries = true;
});
```
The following sample shows how to expire a cache entry if a dependent entry expires. A `Microsoft.Extensions.Primitives.CancellationChangeToken` is added to the cached item. When the `Cancel` method is called on the `CancellationTokenSource` object, both cache entries are evicted:

```csharp
public void OnGetCacheCreateDependent()
{
    var cancellationTokenSource = new CancellationTokenSource();

    _memoryCache.Set(
        CacheKeys.DependentCancellationTokenSource,
        cancellationTokenSource);

    using var parentCacheEntry = _memoryCache.CreateEntry(CacheKeys.Parent);

    parentCacheEntry.Value = DateTime.Now;

    _memoryCache.Set(
        CacheKeys.Child,
        DateTime.Now,
        new CancellationChangeToken(cancellationTokenSource.Token));
}

public void OnGetCacheRemoveDependent()
{
    var cancellationTokenSource = _memoryCache.Get<CancellationTokenSource>(
        CacheKeys.DependentCancellationTokenSource);

    cancellationTokenSource?.Cancel();
}
```
When you use a `System.Threading.CancellationTokenSource` object, you can evict multiple cache entries as a group. With linked-entry tracking enabled, the parent entry inherits the expiration token from the child entry created within its `using` scope.

## Review notes about in-memory caching

The following notes apply to in-memory caching:

* Expiration doesn't happen in the background.

  There's no timer that actively scans the cache for expired items. Any activity on the cache (via `Get`, `TryGetValue`, `Set`, or `Remove`) can trigger a background scan for expired items. A timer set on the `CancellationTokenSource` object (by using the `System.Threading.CancellationTokenSource.CancelAfter*` method) also removes the entry and triggers a scan for expired items.

  The following example uses the `System.Threading.CancellationTokenSource.#ctor(System.TimeSpan)` overloaded constructor for the registered token. When this token fires, it removes the entry immediately and fires the eviction callbacks:

```csharp
if (!_memoryCache.TryGetValue(CacheKeys.Entry, out DateTime cacheValue))
{
    cacheValue = DateTime.Now;

    var cancellationTokenSource = new CancellationTokenSource(
        TimeSpan.FromSeconds(10));

    var cacheEntryOptions = new MemoryCacheEntryOptions()
        .AddExpirationToken(
            new CancellationChangeToken(cancellationTokenSource.Token))
        .RegisterPostEvictionCallback((key, value, reason, state) =>
        {
            (state as CancellationTokenSource)?.Dispose();
        }, cancellationTokenSource);

    _memoryCache.Set(CacheKeys.Entry, cacheValue, cacheEntryOptions);
}
```
* When you use a callback to repopulate a cache item:

  * Multiple requests might discover the cached key value is empty because the callback isn't finished.
  * This approach can result in several threads repopulating the cached item.

* When linked-entry tracking is enabled and one cache entry (the parent) creates another entry (the child), the parent inherits the child's expiration tokens and time-based expiration settings. Manually removing or updating the child doesn't expire the parent.

* Use the `Microsoft.Extensions.Caching.Memory.ICacheEntry.PostEvictionCallbacks` property to specify which callbacks should fire after a cache entry is evicted from the cache.

* For most apps, `IMemoryCache` is enabled. For example, calling `AddMvc`, `AddControllersWithViews`, `AddRazorPages`, `AddMvcCore().AddRazorViewEngine`, and many other `Add{Service}` methods in the _Program.cs_ file enables `IMemoryCache`.

  For apps that don't call one of the mentioned `Add{Service}` methods, you might need to call the `Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddMemoryCache*` method in the _Program.cs_ file.

* `Microsoft.Extensions.Caching.Memory.MemoryCache` is thread-safe and can be used concurrently across multiple threads.

* Accessing the `Microsoft.Extensions.Caching.Memory.MemoryCache.Count` property is computationally expensive under high concurrency because it requires aggregating items across internal partitions. Avoid accessing `Count` frequently in performance-sensitive request paths.

* `Microsoft.Extensions.Caching.Memory.CacheExtensions.GetOrCreate*` and `Microsoft.Extensions.Caching.Memory.CacheExtensions.GetOrCreateAsync*` aren't atomic. When several requests miss the same key at the same time, each request runs the factory, and the last value written is the one that stays in the cache. For an expensive data source, this can cause a burst of duplicate calls. To run the factory only once per key, use `HybridCache`, which provides stampede protection.

* The cache stores references to objects, not copies. If code changes an object after reading it from the cache, every caller that reads that entry sees the change. Cache immutable objects, or copy an object before changing it.

## Use a background cache update

Use a background service such as the `Microsoft.Extensions.Hosting.IHostedService` interface to update the cache. The background service can recompute the entries and assign them to the cache only after they're ready.

## Related content

* View or download sample code (how to download)
* Detect changes with change tokens in ASP.NET Core
* Response caching in ASP.NET Core
