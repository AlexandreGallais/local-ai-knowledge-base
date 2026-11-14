---
title: "ICacheEntry interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Memory/ICacheEntry.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ICacheEntry interface

Namespace: `Microsoft.Extensions.Caching.Memory`

```csharp
public interface ICacheEntry : IDisposable
```

Represents an entry in the `IMemoryCache` implementation.
When Disposed, is committed to the cache.

To be added.

## ICacheEntry.AbsoluteExpiration property

```csharp
public DateTimeOffset? AbsoluteExpiration { get; set; }
```

Gets or sets an absolute expiration date for the cache entry.

Returns: To be added.

To be added.

## ICacheEntry.AbsoluteExpirationRelativeToNow property

```csharp
public TimeSpan? AbsoluteExpirationRelativeToNow { get; set; }
```

Gets or sets an absolute expiration time, relative to now.

Returns: To be added.

To be added.

## ICacheEntry.ExpirationTokens property

```csharp
public System.Collections.Generic.IList<Microsoft.Extensions.Primitives.IChangeToken> ExpirationTokens { get; }
```

Gets the `IChangeToken` instances which cause the cache entry to expire.

Returns: To be added.

To be added.

## ICacheEntry.Key <example-value>

```csharp
public object Key { get; }
```

Gets the key of the cache entry.

Returns: To be added.

To be added.

## ICacheEntry.PostEvictionCallbacks property

```csharp
public System.Collections.Generic.IList<Microsoft.Extensions.Caching.Memory.PostEvictionCallbackRegistration> PostEvictionCallbacks { get; }
```

Gets or sets the callbacks will be fired after the cache entry is evicted from the cache.

Returns: To be added.

To be added.

## ICacheEntry.Priority property

```csharp
public Microsoft.Extensions.Caching.Memory.CacheItemPriority Priority { get; set; }
```

Gets or sets the priority for keeping the cache entry in the cache during a
cleanup. The default is `CacheItemPriority.Normal`.

Returns: To be added.

To be added.

## ICacheEntry.Size property

```csharp
public long? Size { get; set; }
```

Gets or set the size of the cache entry value.

Returns: To be added.

To be added.

## ICacheEntry.SlidingExpiration property

```csharp
public TimeSpan? SlidingExpiration { get; set; }
```

Gets or sets how long a cache entry can be inactive (e.g. not accessed) before it will be removed.
This will not extend the entry lifetime beyond the absolute expiration (if set).

Returns: To be added.

To be added.

## ICacheEntry.Value property

```csharp
public object? Value { get; set; }
```

Gets or set the value of the cache entry.

Returns: To be added.

To be added.
