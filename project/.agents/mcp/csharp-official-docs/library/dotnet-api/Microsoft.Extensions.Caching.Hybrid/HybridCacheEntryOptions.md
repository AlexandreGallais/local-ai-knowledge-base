---
title: "HybridCacheEntryOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Hybrid/HybridCacheEntryOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HybridCacheEntryOptions class

Namespace: `Microsoft.Extensions.Caching.Hybrid`

```csharp
public sealed class HybridCacheEntryOptions
```

Specifies additional options (for example, expiration) that apply to a `HybridCache` operation. When options
can be specified at multiple levels (for example, globally and per-call), the values are composed; the
most granular non-null value is used, with null values being inherited. If no value is specified at
any level, the implementation can choose a reasonable default.

This type is immutable. To adjust cache entry options based on the result of a data fetch, use one of the
`HybridCache.GetOrCreateAsync<T1,T2>`
overloads, whose factory callback receives a mutable `HybridCacheEntryContext`.

## HybridCacheEntryOptions.HybridCacheEntryOptions() constructor

```csharp
public HybridCacheEntryOptions ();
```

To be added.

To be added.

## HybridCacheEntryOptions.Expiration property

```csharp
public TimeSpan? Expiration { get; init; }
```

Gets or sets the overall cache duration of this entry, passed to the backend distributed cache.

Returns: To be added.

To be added.

## HybridCacheEntryOptions.Flags property

```csharp
public Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryFlags? Flags { get; init; }
```

Gets or sets additional flags that apply to the requested operation.

Returns: To be added.

To be added.

## HybridCacheEntryOptions.LocalCacheExpiration property

```csharp
public TimeSpan? LocalCacheExpiration { get; init; }
```

Gets or sets the expiration for the local (in-process) cache entry.

Returns: To be added.

When retrieving a cached value from an external cache store, this value will be used to calculate the local
cache expiration, not exceeding the remaining overall cache lifetime.

## HybridCacheEntryOptions.LocalSize property

```csharp
public long? LocalSize { get; init; }
```

Gets or sets the size to assign to entries in the local (in-process) cache.

Returns: To be added.

The units are determined by the underlying local cache implementation. When the local cache
is an `IMemoryCache` configured with a size limit, this value corresponds to
`ICacheEntry.Size`.

When `null`, the implementation may compute a default size (for example, from
the serialized payload length).
