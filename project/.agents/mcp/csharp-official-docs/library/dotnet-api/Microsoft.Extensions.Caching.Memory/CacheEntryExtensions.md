---
title: "CacheEntryExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Memory/CacheEntryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CacheEntryExtensions class

Namespace: `Microsoft.Extensions.Caching.Memory`

```csharp
public static class CacheEntryExtensions
```

Provides extensions methods for `ICacheEntry` operations.

To be added.

## CacheEntryExtensions.AddExpirationToken(ICacheEntry, IChangeToken) method

```csharp
public static Microsoft.Extensions.Caching.Memory.ICacheEntry AddExpirationToken (this Microsoft.Extensions.Caching.Memory.ICacheEntry entry, Microsoft.Extensions.Primitives.IChangeToken <example-value>);
```

Expires the cache entry if the given `IChangeToken` expires.

Parameters:

- `entry`: The `ICacheEntry`.
- `expirationToken`: The `IChangeToken` that causes the cache entry to expire.

Returns: The `ICacheEntry` for chaining.

To be added.

## CacheEntryExtensions.RegisterPostEvictionCallback(ICacheEntry, PostEvictionDelegate) method

```csharp
public static Microsoft.Extensions.Caching.Memory.ICacheEntry RegisterPostEvictionCallback (this Microsoft.Extensions.Caching.Memory.ICacheEntry entry, Microsoft.Extensions.Caching.Memory.PostEvictionDelegate callback);
```

Fires the given callback after the cache entry is evicted from the cache.

Parameters:

- `entry`: The `ICacheEntry`.
- `callback`: The callback to run after the entry is evicted.

Returns: The `ICacheEntry` for chaining.

To be added.

## CacheEntryExtensions.RegisterPostEvictionCallback(ICacheEntry, PostEvictionDelegate, Object) method

```csharp
public static Microsoft.Extensions.Caching.Memory.ICacheEntry RegisterPostEvictionCallback (this Microsoft.Extensions.Caching.Memory.ICacheEntry entry, Microsoft.Extensions.Caching.Memory.PostEvictionDelegate callback, object? state);
```

Fires the given callback after the cache entry is evicted from the cache.

Parameters:

- `entry`: The `ICacheEntry`.
- `callback`: The callback to run after the entry is evicted.
- `state`: The state to pass to the post-eviction callback.

Returns: The `ICacheEntry` for chaining.

To be added.

## CacheEntryExtensions.SetAbsoluteExpiration(ICacheEntry, DateTimeOffset) method

```csharp
public static Microsoft.Extensions.Caching.Memory.ICacheEntry SetAbsoluteExpiration (this Microsoft.Extensions.Caching.Memory.ICacheEntry entry, DateTimeOffset absolute);
```

Sets an absolute expiration date for the cache entry.

Parameters:

- `entry`: The `ICacheEntry`.
- `absolute`: A `DateTimeOffset` representing the expiration time in absolute terms.

Returns: The `ICacheEntry` for chaining.

To be added.

## CacheEntryExtensions.SetAbsoluteExpiration(ICacheEntry, TimeSpan) method

```csharp
public static Microsoft.Extensions.Caching.Memory.ICacheEntry SetAbsoluteExpiration (this Microsoft.Extensions.Caching.Memory.ICacheEntry entry, TimeSpan relative);
```

Sets an absolute expiration time, relative to now.

Parameters:

- `entry`: The `ICacheEntry`.
- `relative`: The `TimeSpan` representing the expiration time relative to now.

Returns: The `ICacheEntry` for chaining.

To be added.

## CacheEntryExtensions.SetOptions(ICacheEntry, MemoryCacheEntryOptions) method

```csharp
public static Microsoft.Extensions.Caching.Memory.ICacheEntry SetOptions (this Microsoft.Extensions.Caching.Memory.ICacheEntry entry, Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions options);
```

Applies the values of an existing `MemoryCacheEntryOptions` to the entry.

Parameters:

- `entry`: The `ICacheEntry`.
- `options`: Set the values of these options on the `entry`.

Returns: The `ICacheEntry` for chaining.

To be added.

## CacheEntryExtensions.SetPriority(ICacheEntry, CacheItemPriority) method

```csharp
public static Microsoft.Extensions.Caching.Memory.ICacheEntry SetPriority (this Microsoft.Extensions.Caching.Memory.ICacheEntry entry, Microsoft.Extensions.Caching.Memory.CacheItemPriority priority);
```

Sets the priority for keeping the cache entry in the cache during a memory pressure tokened cleanup.

Parameters:

- `entry`: The entry to set the priority for.
- `priority`: The `CacheItemPriority` to set on the entry.

Returns: The `ICacheEntry` for chaining.

To be added.

## CacheEntryExtensions.SetSize(ICacheEntry, Int64) method

```csharp
public static Microsoft.Extensions.Caching.Memory.ICacheEntry SetSize (this Microsoft.Extensions.Caching.Memory.ICacheEntry entry, long size);
```

Sets the size of the cache entry value.

Parameters:

- `entry`: The `ICacheEntry`.
- `size`: The size to set on the `entry`.

Returns: The `ICacheEntry` for chaining.

To be added.

## CacheEntryExtensions.SetSlidingExpiration(ICacheEntry, TimeSpan) method

```csharp
public static Microsoft.Extensions.Caching.Memory.ICacheEntry SetSlidingExpiration (this Microsoft.Extensions.Caching.Memory.ICacheEntry entry, TimeSpan offset);
```

Sets how long the cache entry can be inactive (for example, not accessed) before it will be removed.
This method does not extend the entry lifetime beyond the absolute expiration (if set).

Parameters:

- `entry`: The `ICacheEntry`.
- `offset`: A `TimeSpan` representing a sliding expiration.

Returns: The `ICacheEntry` for chaining.

To be added.

## CacheEntryExtensions.SetValue(ICacheEntry, Object) method

```csharp
public static Microsoft.Extensions.Caching.Memory.ICacheEntry SetValue (this Microsoft.Extensions.Caching.Memory.ICacheEntry entry, object? value);
```

Sets the value of the cache entry.

Parameters:

- `entry`: The `ICacheEntry`.
- `value`: The value to set on the `entry`.

Returns: The `ICacheEntry` for chaining.

To be added.
