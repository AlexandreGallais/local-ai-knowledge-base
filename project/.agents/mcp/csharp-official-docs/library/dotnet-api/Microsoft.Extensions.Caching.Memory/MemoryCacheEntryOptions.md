---
title: "MemoryCacheEntryOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Memory/MemoryCacheEntryOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryCacheEntryOptions class

Namespace: `Microsoft.Extensions.Caching.Memory`

```csharp
public class MemoryCacheEntryOptions
```

Represents the cache options applied to an entry of the `IMemoryCache` instance.

To be added.

## MemoryCacheEntryOptions.MemoryCacheEntryOptions() constructor

```csharp
public MemoryCacheEntryOptions ();
```

To be added.

To be added.

## MemoryCacheEntryOptions.AbsoluteExpiration property

```csharp
public DateTimeOffset? AbsoluteExpiration { get; set; }
```

Gets or sets an absolute expiration date for the cache entry.

Returns: To be added.

To be added.

## MemoryCacheEntryOptions.AbsoluteExpirationRelativeToNow property

```csharp
public TimeSpan? AbsoluteExpirationRelativeToNow { get; set; }
```

Gets or sets an absolute expiration time, relative to now.

Returns: To be added.

To be added.

## MemoryCacheEntryOptions.ExpirationTokens property

```csharp
public System.Collections.Generic.IList<Microsoft.Extensions.Primitives.IChangeToken> ExpirationTokens { get; }
```

Gets the `IChangeToken` instances which cause the cache entry to expire.

Returns: To be added.

To be added.

## MemoryCacheEntryOptions.PostEvictionCallbacks property

```csharp
public System.Collections.Generic.IList<Microsoft.Extensions.Caching.Memory.PostEvictionCallbackRegistration> PostEvictionCallbacks { get; }
```

Gets or sets the callbacks will be fired after the cache entry is evicted from the cache.

Returns: To be added.

To be added.

## MemoryCacheEntryOptions.Priority property

```csharp
public Microsoft.Extensions.Caching.Memory.CacheItemPriority Priority { get; set; }
```

Gets or sets the priority for keeping the cache entry in the cache during a
memory pressure triggered cleanup. The default is `CacheItemPriority.Normal`.

Returns: To be added.

To be added.

## MemoryCacheEntryOptions.Size property

```csharp
public long? Size { get; set; }
```

Gets or sets the size of the cache entry value.

Returns: To be added.

To be added.

## MemoryCacheEntryOptions.SlidingExpiration property

```csharp
public TimeSpan? SlidingExpiration { get; set; }
```

Gets or sets how long a cache entry can be inactive (e.g. not accessed) before it will be removed.
This will not extend the entry lifetime beyond the absolute expiration (if set).

Returns: To be added.

To be added.
