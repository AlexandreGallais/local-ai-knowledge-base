---
title: "HybridCache library in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/performance/caching/hybrid.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# HybridCache library in ASP.NET Core

This article explains how to configure and use the `HybridCache` library in an ASP.NET Core app. For an introduction to the library, see the `HybridCache` section of the Caching overview.

## Get the library

Install the `Microsoft.Extensions.Caching.Hybrid` package.

```dotnetcli
dotnet add package Microsoft.Extensions.Caching.Hybrid
```

## Register the service

Add the `HybridCache` service to the dependency injection (DI) container by calling `Microsoft.Extensions.DependencyInjection.HybridCacheServiceExtensions.AddHybridCache*`:

```csharp
// Add services to the container.
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAuthorization();

builder.Services.AddHybridCache();
```
The preceding code registers the `HybridCache` service with default options. The registration API can also configure options and serialization.

## Get and store cache entries

The `HybridCache` service provides a `Microsoft.Extensions.Caching.Hybrid.HybridCache.GetOrCreateAsync*` method with two overloads, taking a key and:

* A factory method.
* State, and a factory method.

The method uses the key to try to retrieve the object from the primary cache. If the item isn't found in the primary cache (a cache miss), it then checks the secondary cache if one is configured. If it doesn't find the data there (another cache miss), it calls the factory method to get the object from the data source. It then stores the object in both primary and secondary caches. The factory method is never called if the object is found in the primary or secondary cache (a cache hit).

A `HybridCache` instance ensures that only one concurrent caller for a given key calls the factory method, and all other callers using the same instance wait for the result of that call. The cancellation token <example-value> to the factory is canceled when all callers awaiting the shared operation have canceled. This coordination doesn't extend to other `HybridCache` instances, even if they use the same secondary distributed cache.

### The main `GetOrCreateAsync` overload

The stateless overload of `GetOrCreateAsync` is recommended for most scenarios. The code to call it is relatively simple. Here's an example:

```csharp
public class SomeService(HybridCache cache)
{
    private HybridCache _cache = cache;

    public async Task<string> GetSomeInfoAsync(string name, int id, CancellationToken token = <example-value>)
    {
        return await _cache.GetOrCreateAsync(
            $"{name}-{id}", // Unique key to the cache entry
            async cancel => await GetDataFromTheSourceAsync(name, id, cancel),
            cancellationToken: token
        );
    }

    public async Task<string> GetDataFromTheSourceAsync(string name, int id, CancellationToken token)
    {
        // Placeholder for retrieving data from a real backing store (database, HTTP API, etc.).
        // A real implementation would await that call; this stub returns synchronously,
        // so it intentionally has no await (and produces compiler warning CS1998).
        string someInfo = $"someinfo-{name}-{id}";
        return someInfo;
    }
}
```
## Cache key <example-value>

The `key` passed to `GetOrCreateAsync` must uniquely identify the data being cached:

* In terms of the identifier values used to retrieve that data from its source.
* In terms of other data cached in the application.

Both types of uniqueness are usually ensured by using string concatenation to make a single key <example-value> composed of different parts concatenated into one string. For example:

```csharp
cache.GetOrCreateAsync($"/orders/{region}/{orderId}", ...);
```

Or

```csharp
cache.GetOrCreateAsync($"user_prefs_{userId}", ...);
```

It's the caller's responsibility to ensure that a key <example-value> is valid and can't cause data to become confused.

Avoid using external user input directly in cache keys. For example, don't use raw strings from user interfaces as cache keys. Doing so can expose your app to security risks, such as unauthorized access or denial-of-service attacks caused by flooding the cache with random or meaningless keys. In the preceding valid examples, the *order* and *user preference* data are clearly separated and use trusted identifiers:

* `orderid` and `userId` are internally generated identifiers.
* `region` might be an enum or string from a predefined list of known regions.

No significance is placed on tokens such as `/` or `_`. The entire key value is treated as an opaque identifying string. In this case, you could omit the `/` and `_` with no
change to the way the cache functions, but a delimiter is usually used to avoid ambiguity - for example `$"order{customerId}{orderId}"` could cause confusion between:

* `customerId` 42 with `orderId` 123
* `customerId` 421 with `orderId` 23

Both of the preceding examples would generate the cache key `order42123`.

This guidance applies equally to any `string`-based cache API, such as `HybridCache`, `IDistributedCache`, and `IMemoryCache`.

Notice that the inline interpolated string syntax (`$"..."` in the preceding examples of valid keys) is directly inside the `GetOrCreateAsync` call. This syntax is recommended when using `HybridCache`, as it allows for planned future improvements that bypass the need to allocate a `string` for the key in many scenarios.

### Additional key <example-value>

* Keys can be restricted to valid maximum lengths. For example, the default `HybridCache` implementation (via `AddHybridCache(...)`) restricts keys to 1024 characters by default. That number is configurable via `HybridCacheOptions.MaximumKeyLength`, with longer keys bypassing the cache mechanisms to prevent saturation.
* Keys must be valid Unicode sequences. If invalid Unicode sequences are passed, the behavior is undefined.
* When using an out-of-process secondary cache such as `IDistributedCache`, the backend implementation may impose additional restrictions. As a hypothetical example, a particular backend might use case-insensitive key logic. The default `HybridCache` (via `AddHybridCache(...)`) detects this scenario to prevent confusion attacks or alias attacks (using bitwise string equality). However, this scenario might still result in conflicting keys becoming overwritten or evicted sooner than expected.

### The alternative `GetOrCreateAsync` overload

The alternative overload might reduce some overhead from captured variables and per-instance callbacks, but at the expense of more complex code. For most scenarios, the performance increase doesn't outweigh the code complexity. Here's an example that uses the alternative overload:

```csharp
public class SomeService(HybridCache cache)
{
    private HybridCache _cache = cache;

    public async Task<string> GetSomeInfoAsync(string name, int id, CancellationToken token = <example-value>)
    {
        return await _cache.GetOrCreateAsync(
            $"{name}-{id}", // Unique key to the cache entry
            (name, id, obj: this),
            static async (state, token) =>
            await state.obj.GetDataFromTheSourceAsync(state.name, state.id, token),
            cancellationToken: token
        );
    }

    public async Task<string> GetDataFromTheSourceAsync(string name, int id, CancellationToken token)
    {
        // Placeholder for retrieving data from a real backing store (database, HTTP API, etc.).
        // A real implementation would await that call. This stub returns synchronously and
        // intentionally has no await, so the compiler emits warning CS1998 for this method.
        string someInfo = $"someinfo-{name}-{id}";
        return someInfo;
    }
}
```
### The `SetAsync` method

In many scenarios, `GetOrCreateAsync` is the only API needed. But `HybridCache` also has `Microsoft.Extensions.Caching.Hybrid.HybridCache.SetAsync*` to store an object in cache without trying to retrieve it first.

## Remove cache entries by key

When the underlying data for a cache entry changes before it expires, remove the entry explicitly by calling `Microsoft.Extensions.Caching.Hybrid.HybridCache.RemoveAsync*` with the key to the entry. An overload lets you specify a collection of key values.

When an entry is removed, it is removed from both the primary and secondary caches.

## Remove cache entries by tag

Tags can be used to group cache entries and invalidate them together.

Set tags when calling `GetOrCreateAsync`, as shown in the following example:

```csharp
public class SomeService(HybridCache cache)
{
    private HybridCache _cache = cache;

    public async Task<string> GetSomeInfoAsync(string name, int id, CancellationToken token = <example-value>)
    {
        var tags = new List<string> { "tag1", "tag2", "tag3" };
        var entryOptions = new HybridCacheEntryOptions
        {
            Expiration = TimeSpan.FromMinutes(1),
            LocalCacheExpiration = TimeSpan.FromMinutes(1)
        };
        return await _cache.GetOrCreateAsync(
            $"{name}-{id}", // Unique key to the cache entry
            async cancel => await GetDataFromTheSourceAsync(name, id, cancel),
            entryOptions,
            tags,
            cancellationToken: token
        );
    }
    
    public async Task<string> GetDataFromTheSourceAsync(string name, int id, CancellationToken token)
    {
        // Placeholder for retrieving data from a real backing store (database, HTTP API, etc.).
        // A real implementation would await that call. This stub returns synchronously and
        // intentionally has no await, so the compiler emits warning CS1998 for this method.
        string someInfo = $"someinfo-{name}-{id}";
        return someInfo;
    }
}
```
Remove all entries for a specified tag by calling `Microsoft.Extensions.Caching.Hybrid.HybridCache.RemoveByTagAsync*` with the tag value. An overload lets you specify a collection of tag values.

Neither `IMemoryCache` nor `IDistributedCache` has direct support for the concept of tags, so tag-based invalidation is a logical operation, not a physical deletion. Calling `RemoveByTagAsync` doesn't remove values from either the local or distributed cache. Instead, it establishes an "ignore anything created before this point" rule for entries associated with that tag.

When `GetOrCreateAsync` later retrieves a cached value for that tag, `HybridCache` checks whether the value was created before the tag was invalidated. If so, the value is treated as a cache miss and the factory method is called to fetch fresh data. The old values remain in `IMemoryCache` and `IDistributedCache` until they expire in the usual way based on their configured lifetime.

## Removing all cache entries

The asterisk tag (`*`) is reserved as a wildcard and is disallowed against individual values. Calling `RemoveByTagAsync("*")` has the effect of invalidating *all* `HybridCache` data, even data that doesn't have any tags. As with individual tags, this is a *logical* operation, and individual values continue to exist until they expire naturally. Glob-style matches aren't supported. For example, you can't use `RemoveByTagAsync("foo*")` to remove everything starting with `foo`.

### Additional tag considerations

* The system doesn't limit the number of tags you can use, but large sets of tags might negatively impact performance.
* Tags can't be empty, just whitespace, or the reserved value `*`.

## Options

The `AddHybridCache` method can be used to configure global defaults. The following example shows how to configure some of the available options:

```csharp
// Add services to the container.
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();

builder.Services.AddHybridCache(options =>
    {
        options.MaximumPayloadBytes = 1024 * 1024;
        options.MaximumKeyLength = 1024;
        options.DefaultEntryOptions = new HybridCacheEntryOptions
        {
            Expiration = TimeSpan.FromMinutes(5),
            LocalCacheExpiration = TimeSpan.FromMinutes(5)
        };
    });
```
The `GetOrCreateAsync` method can also take a `HybridCacheEntryOptions` object to override the global defaults for a specific cache entry. Here's an example:

```csharp
public class SomeService(HybridCache cache)
{
    private HybridCache _cache = cache;

    public async Task<string> GetSomeInfoAsync(string name, int id, CancellationToken token = <example-value>)
    {
        var tags = new List<string> { "tag1", "tag2", "tag3" };
        var entryOptions = new HybridCacheEntryOptions
        {
            Expiration = TimeSpan.FromMinutes(1),
            LocalCacheExpiration = TimeSpan.FromMinutes(1)
        };
        return await _cache.GetOrCreateAsync(
            $"{name}-{id}", // Unique key to the cache entry
            async cancel => await GetDataFromTheSourceAsync(name, id, cancel),
            entryOptions,
            tags,
            cancellationToken: token
        );
    }
    
    public async Task<string> GetDataFromTheSourceAsync(string name, int id, CancellationToken token)
    {
        // Placeholder for retrieving data from a real backing store (database, HTTP API, etc.).
        // A real implementation would await that call. This stub returns synchronously and
        // intentionally has no await, so the compiler emits warning CS1998 for this method.
        string someInfo = $"someinfo-{name}-{id}";
        return someInfo;
    }
}
```
For more information about the options, see the source code:

* `Microsoft.Extensions.Caching.Hybrid.HybridCacheOptions` class.
* `Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions` class.

## Limits

The following properties of `HybridCacheOptions` let you configure limits that apply to all cache entries:

* MaximumPayloadBytes - Maximum size of a cache entry. Default value is 1 MB. Attempts to store values over this size are logged, and the value isn't stored in cache.
* MaximumKeyLength - Maximum length of a cache key. Default value is 1024 characters. Attempts to store values over this size are logged, and the value isn't stored in cache.
