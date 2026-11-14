---
title: "MemoryCacheEntryExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Memory/MemoryCacheEntryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryCacheEntryExtensions class

Namespace: `Microsoft.Extensions.Caching.Memory`

```csharp
public static class MemoryCacheEntryExtensions
```

Provide extensions methods for `MemoryCacheEntryOptions` operations.

To be added.

## MemoryCacheEntryExtensions.AddExpirationToken(MemoryCacheEntryOptions, IChangeToken) method

```csharp
public static Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions AddExpirationToken (this Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions options, Microsoft.Extensions.Primitives.IChangeToken <example-value>);
```

Expires the cache entry if the given `IChangeToken` expires.

Parameters:

- `options`: The `MemoryCacheEntryOptions`.
- `expirationToken`: The `IChangeToken` that causes the cache entry to expire.

Returns: The `MemoryCacheEntryOptions` so that additional calls can be chained.

To be added.

## MemoryCacheEntryExtensions.RegisterPostEvictionCallback(MemoryCacheEntryOptions, PostEvictionDelegate) method

```csharp
public static Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions RegisterPostEvictionCallback (this Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions options, Microsoft.Extensions.Caching.Memory.PostEvictionDelegate callback);
```

Fires the given callback after the cache entry is evicted from the cache.

Parameters:

- `options`: The `MemoryCacheEntryOptions`.
- `callback`: The callback to register for calling after an entry is evicted.

Returns: The `MemoryCacheEntryOptions` so that additional calls can be chained.

To be added.

## MemoryCacheEntryExtensions.RegisterPostEvictionCallback(MemoryCacheEntryOptions, PostEvictionDelegate, Object) method

```csharp
public static Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions RegisterPostEvictionCallback (this Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions options, Microsoft.Extensions.Caching.Memory.PostEvictionDelegate callback, object? state);
```

Fires the given callback after the cache entry is evicted from the cache.

Parameters:

- `options`: The `MemoryCacheEntryOptions`.
- `callback`: The callback to register for calling after an entry is evicted.
- `state`: The state to pass to the callback.

Returns: The `MemoryCacheEntryOptions` so that additional calls can be chained.

To be added.

## MemoryCacheEntryExtensions.SetAbsoluteExpiration(MemoryCacheEntryOptions, DateTimeOffset) method

```csharp
public static Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions SetAbsoluteExpiration (this Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions options, DateTimeOffset absolute);
```

Sets an absolute expiration date for the cache entry.

Parameters:

- `options`: The `MemoryCacheEntryOptions`.
- `absolute`: The expiration time, in absolute terms.

Returns: The `MemoryCacheEntryOptions` so that additional calls can be chained.

To be added.

## MemoryCacheEntryExtensions.SetAbsoluteExpiration(MemoryCacheEntryOptions, TimeSpan) method

```csharp
public static Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions SetAbsoluteExpiration (this Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions options, TimeSpan relative);
```

Sets an absolute expiration time, relative to now.

Parameters:

- `options`: The `MemoryCacheEntryOptions`.
- `relative`: The expiration time, relative to now.

Returns: The `MemoryCacheEntryOptions` so that additional calls can be chained.

To be added.

## MemoryCacheEntryExtensions.SetPriority(MemoryCacheEntryOptions, CacheItemPriority) method

```csharp
public static Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions SetPriority (this Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions options, Microsoft.Extensions.Caching.Memory.CacheItemPriority priority);
```

Sets the priority for keeping the cache entry in the cache during a memory pressure tokened cleanup.

Parameters:

- `options`: The option on which to set the priority.
- `priority`: The `CacheItemPriority` to set on the option.

Returns: The `MemoryCacheEntryOptions` so that additional calls can be chained.

To be added.

## MemoryCacheEntryExtensions.SetSize(MemoryCacheEntryOptions, Int64) method

```csharp
public static Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions SetSize (this Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions options, long size);
```

Sets the size of the cache entry value.

Parameters:

- `options`: The options to set the entry size on.
- `size`: The size to set on the `MemoryCacheEntryOptions`.

Returns: The `MemoryCacheEntryOptions` so that additional calls can be chained.

To be added.

## MemoryCacheEntryExtensions.SetSlidingExpiration(MemoryCacheEntryOptions, TimeSpan) method

```csharp
public static Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions SetSlidingExpiration (this Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions options, TimeSpan offset);
```

Sets how long the cache entry can be inactive (e.g. not accessed) before it will be removed.
This will not extend the entry lifetime beyond the absolute expiration (if set).

Parameters:

- `options`: The `MemoryCacheEntryOptions`.
- `offset`: The sliding expiration time.

Returns: The `MemoryCacheEntryOptions` so that additional calls can be chained.

To be added.
