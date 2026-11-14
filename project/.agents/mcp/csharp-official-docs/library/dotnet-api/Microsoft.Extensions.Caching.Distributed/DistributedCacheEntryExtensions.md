---
title: "DistributedCacheEntryExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Distributed/DistributedCacheEntryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DistributedCacheEntryExtensions class

Namespace: `Microsoft.Extensions.Caching.Distributed`

```csharp
public static class DistributedCacheEntryExtensions
```

Provides extension methods for `DistributedCacheEntryOptions` operations.

To be added.

## DistributedCacheEntryExtensions.SetAbsoluteExpiration(DistributedCacheEntryOptions, DateTimeOffset) method

```csharp
public static Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions SetAbsoluteExpiration (this Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions options, DateTimeOffset absolute);
```

Sets an absolute expiration date for the cache entry.

Parameters:

- `options`: The options to be operated on.
- `absolute`: The expiration time, in absolute terms.

Returns: To be added.

To be added.

## DistributedCacheEntryExtensions.SetAbsoluteExpiration(DistributedCacheEntryOptions, TimeSpan) method

```csharp
public static Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions SetAbsoluteExpiration (this Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions options, TimeSpan relative);
```

Sets an absolute expiration time, relative to now.

Parameters:

- `options`: The options to be operated on.
- `relative`: The expiration time, relative to now.

Returns: To be added.

To be added.

## DistributedCacheEntryExtensions.SetSlidingExpiration(DistributedCacheEntryOptions, TimeSpan) method

```csharp
public static Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions SetSlidingExpiration (this Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions options, TimeSpan offset);
```

Sets how long the cache entry can be inactive (for example, not accessed) before it will be removed.
This will not extend the entry lifetime beyond the absolute expiration (if set).

Parameters:

- `options`: The options to be operated on.
- `offset`: The sliding expiration time.

Returns: To be added.

To be added.
