---
title: "MemoryCacheStatistics class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Memory/MemoryCacheStatistics.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryCacheStatistics class

Namespace: `Microsoft.Extensions.Caching.Memory`

```csharp
public class MemoryCacheStatistics
```

Holds a snapshot of statistics for a memory cache.

To be added.

## MemoryCacheStatistics.MemoryCacheStatistics() constructor

```csharp
public MemoryCacheStatistics ();
```

Initializes an instance of MemoryCacheStatistics.

To be added.

## MemoryCacheStatistics.CurrentEntryCount property

```csharp
public long CurrentEntryCount { get; init; }
```

Gets the number of `ICacheEntry` instances currently in the memory cache.

Returns: To be added.

To be added.

## MemoryCacheStatistics.CurrentEstimatedSize property

```csharp
public long? CurrentEstimatedSize { get; init; }
```

Gets an estimated sum of all the `ICacheEntry.Size` values currently in the memory cache.

Returns: Returns `null` if size isn't being tracked. The common MemoryCache implementation tracks size whenever a SizeLimit is set on the cache.

To be added.

## MemoryCacheStatistics.TotalEvictions property

```csharp
public long TotalEvictions { get; init; }
```

Gets the total number of cache evictions.

Returns: To be added.

This count includes entries removed due to cache eviction policies such as expiration or capacity limits.
It does not include entries removed explicitly by user code (for example, via `Remove` or `Clear`),
and does not include entries that were replaced by new values.

## MemoryCacheStatistics.TotalHits property

```csharp
public long TotalHits { get; init; }
```

Gets the total number of cache hits.

Returns: To be added.

To be added.

## MemoryCacheStatistics.TotalMisses property

```csharp
public long TotalMisses { get; init; }
```

Gets the total number of cache misses.

Returns: To be added.

To be added.
