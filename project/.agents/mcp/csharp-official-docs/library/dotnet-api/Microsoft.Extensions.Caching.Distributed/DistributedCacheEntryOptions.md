---
title: "DistributedCacheEntryOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Distributed/DistributedCacheEntryOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DistributedCacheEntryOptions class

Namespace: `Microsoft.Extensions.Caching.Distributed`

```csharp
public class DistributedCacheEntryOptions
```

Provides the cache options for an entry in `IDistributedCache`.

To be added.

## DistributedCacheEntryOptions.DistributedCacheEntryOptions() constructor

```csharp
public DistributedCacheEntryOptions ();
```

To be added.

To be added.

## DistributedCacheEntryOptions.AbsoluteExpiration property

```csharp
public DateTimeOffset? AbsoluteExpiration { get; set; }
```

Gets or sets an absolute expiration date for the cache entry.

Returns: To be added.

To be added.

## DistributedCacheEntryOptions.AbsoluteExpirationRelativeToNow property

```csharp
public TimeSpan? AbsoluteExpirationRelativeToNow { get; set; }
```

Gets or sets an absolute expiration time, relative to now.

Returns: To be added.

To be added.

## DistributedCacheEntryOptions.SlidingExpiration property

```csharp
public TimeSpan? SlidingExpiration { get; set; }
```

Gets or sets how long a cache entry can be inactive (for example, not accessed) before it will be removed.
This will not extend the entry lifetime beyond the absolute expiration (if set).

Returns: To be added.

To be added.
