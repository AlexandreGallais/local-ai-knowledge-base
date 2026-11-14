---
title: "Breaking change: Tracking linked cache entries"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/7.0/memorycache-tracking.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Tracking linked cache entries

`System.Runtime.Caching.MemoryCache` tracks linked cache entries so that options are propagated. In the following example, the `expirationToken` added for `child` is also applied to `parent`:

```csharp
using (var parent = cache.CreateEntry(key))
{
    parent.SetValue(obj);

    using (var child = cache.CreateEntry(key1))
    {
        child.SetValue(obj);
        child.AddExpirationToken(expirationToken);
    }
}
```

For performance reasons, .NET 7 no longer tracks linked cache entries by default. However, you can enable tracking using a new option.

## Version introduced

.NET 7

## Previous behavior

Prior to .NET 7, `System.Runtime.Caching.MemoryCache` tracked linked cache entries to allow for options to be propagated. The tracking could not be disabled.

## New behavior

Starting in .NET 7, `System.Runtime.Caching.MemoryCache` does not track linked cache entries, by default. The `Microsoft.Extensions.Caching.Memory.MemoryCacheOptions.TrackLinkedCacheEntries` option was added so you can control whether linked cache entries are tracked or not.

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

This change was introduced to improve performance. Tracking internally uses `System.Threading.AsyncLocal`1`, which is expensive and adds non-trivial overhead.

## Recommended action

If you want `System.Runtime.Caching.MemoryCache` to continue tracking linked cache entries so options can be propagated, set `Microsoft.Extensions.Caching.Memory.MemoryCacheOptions.TrackLinkedCacheEntries` to `true`.

```csharp
var options = new MemoryCacheOptions
{
    TrackLinkedCacheEntries = true
};

var cache = new MemoryCache(options);
```

## Affected APIs

- `System.Runtime.Caching.MemoryCache`
- `Microsoft.Extensions.Caching.Memory.MemoryCacheOptions`
