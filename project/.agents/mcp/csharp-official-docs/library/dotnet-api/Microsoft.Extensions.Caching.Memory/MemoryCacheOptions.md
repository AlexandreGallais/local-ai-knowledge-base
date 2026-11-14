---
title: "MemoryCacheOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Memory/MemoryCacheOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryCacheOptions class

Namespace: `Microsoft.Extensions.Caching.Memory`

```csharp
public class MemoryCacheOptions : Microsoft.Extensions.Options.IOptions<Microsoft.Extensions.Caching.Memory.MemoryCacheOptions>
```

Specifies options for `MemoryCache`.

To be added.

## MemoryCacheOptions.MemoryCacheOptions() constructor

```csharp
public MemoryCacheOptions ();
```

To be added.

To be added.

## MemoryCacheOptions.Clock property

```csharp
public Microsoft.Extensions.Internal.ISystemClock? Clock { get; set; }
```

Gets or sets the clock used by the cache for expiration.

Returns: To be added.

To be added.

## MemoryCacheOptions.CompactionPercentage property

```csharp
public double CompactionPercentage { get; set; }
```

Gets or sets the amount the cache is compacted by when the maximum size is exceeded.

Returns: To be added.

To be added.

## MemoryCacheOptions.CompactOnMemoryPressure property

```csharp
public bool CompactOnMemoryPressure { get; set; }
```

Gets or sets a value that indicates whether the cache is compacted when the maximum size is exceeded.

Returns: To be added.

To be added.

## MemoryCacheOptions.ExpirationScanFrequency property

```csharp
public TimeSpan ExpirationScanFrequency { get; set; }
```

Gets or sets the minimum length of time between successive scans for expired items.

Returns: To be added.

To be added.

## MemoryCacheOptions.Microsoft.Extensions.Options.IOptions<Microsoft.Extensions.Caching.Memory.MemoryCacheOptions>.Value property

```csharp
Microsoft.Extensions.Caching.Memory.MemoryCacheOptions Microsoft.Extensions.Options.IOptions<Microsoft.Extensions.Caching.Memory.MemoryCacheOptions>.Value { get; }
```

Gets the default configured `TOptions` instance.

Returns: To be added.

To be added.

## MemoryCacheOptions.Name property

```csharp
public string Name { get; set; }
```

Gets or sets the name of this cache instance.

Returns: To be added.

To be added.

## MemoryCacheOptions.SizeLimit property

```csharp
public long? SizeLimit { get; set; }
```

Gets or sets the maximum size of the cache.

Returns: To be added.

The units are arbitrary. Users specify the size of every entry they add to the cache.
If no size is specified, the entry has no size and the size limit is ignored for that entry.
For more information, see
Use SetSize, Size, and SizeLimit to limit cache size.

## MemoryCacheOptions.TrackLinkedCacheEntries property

```csharp
public bool TrackLinkedCacheEntries { get; set; }
```

Gets or sets a value that indicates whether linked entries are tracked.

Returns: `true` if linked entries are tracked; otherwise, `false`.
The default is `false`.

Prior to .NET 7, this feature was always enabled.

## MemoryCacheOptions.TrackStatistics property

```csharp
public bool TrackStatistics { get; set; }
```

Gets or sets a value that indicates whether memory cache statistics are tracked.

Returns: `true` if memory cache statistics are tracked; otherwise, `false`.
The default is `false`.

To be added.
