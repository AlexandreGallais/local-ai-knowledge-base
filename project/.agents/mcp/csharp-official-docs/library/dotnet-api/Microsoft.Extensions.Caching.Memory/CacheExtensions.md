---
title: "CacheExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Memory/CacheExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CacheExtensions class

Namespace: `Microsoft.Extensions.Caching.Memory`

```csharp
public static class CacheExtensions
```

Provides extensions methods for `IMemoryCache` operations.

To be added.

## CacheExtensions.Get(IMemoryCache, Object) method

```csharp
public static object? Get (this Microsoft.Extensions.Caching.Memory.IMemoryCache cache, object key);
```

Gets the value associated with this key if present.

Parameters:

- `cache`: The `IMemoryCache` instance this method extends.
- `key`: The key of the value to get.

Returns: The value associated with this key, or `null` if the key is not present.

To be added.

## CacheExtensions.Get<TItem>(IMemoryCache, Object) method

```csharp
public static TItem? Get<TItem> (this Microsoft.Extensions.Caching.Memory.IMemoryCache cache, object key);
```

Gets the value associated with this key if present.

Parameters:

- `TItem`: The type of the object to get.
- `cache`: The `IMemoryCache` instance this method extends.
- `key`: The key of the value to get.

Returns: The value associated with this key, or `default(TItem)` if the key is not present.

To be added.

## CacheExtensions.GetOrCreate<TItem>(IMemoryCache, Object, ICacheEntry,TItem>) method

```csharp
public static TItem? GetOrCreate<TItem> (this Microsoft.Extensions.Caching.Memory.IMemoryCache cache, object key, Func<Microsoft.Extensions.Caching.Memory.ICacheEntry,TItem> factory);
```

Gets the value associated with this key if it exists, or generates a new entry using the provided key and a value from the given factory if the key is not found.

Parameters:

- `TItem`: The type of the object to get.
- `cache`: The `IMemoryCache` instance this method extends.
- `key`: The key of the entry to look for or create.
- `factory`: The factory that creates the value associated with this key if the key does not exist in the cache.

Returns: The value associated with this key.

To be added.

## CacheExtensions.GetOrCreate<TItem>(IMemoryCache, Object, ICacheEntry,TItem>, MemoryCacheEntryOptions) method

```csharp
public static TItem? GetOrCreate<TItem> (this Microsoft.Extensions.Caching.Memory.IMemoryCache cache, object key, Func<Microsoft.Extensions.Caching.Memory.ICacheEntry,TItem> factory, Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions? createOptions);
```

Gets the value associated with this key if it exists, or generates a new entry using the provided key and a value from the given factory if the key is not found.

Parameters:

- `TItem`: The type of the object to get.
- `cache`: The `IMemoryCache` instance this method extends.
- `key`: The key of the entry to look for or create.
- `factory`: The factory that creates the value associated with this key if the key does not exist in the cache.
- `createOptions`: The options to be applied to the `ICacheEntry` if the key does not exist in the cache.

Returns: The value associated with this key.

To be added.

## CacheExtensions.GetOrCreateAsync<TItem>(IMemoryCache, Object, Task<TItem>>) method

```csharp
public static System.Threading.Tasks.Task<TItem?> GetOrCreateAsync<TItem> (this Microsoft.Extensions.Caching.Memory.IMemoryCache cache, object key, Func<Microsoft.Extensions.Caching.Memory.ICacheEntry,System.Threading.Tasks.Task<TItem>> factory);
```

Asynchronously gets the value associated with this key if it exists, or generates a new entry using the provided key and a value from the given factory if the key is not found.

Parameters:

- `TItem`: The type of the object to get.
- `cache`: The `IMemoryCache` instance this method extends.
- `key`: The key of the entry to look for or create.
- `factory`: The factory task that creates the value associated with this key if the key does not exist in the cache.

Returns: The task object representing the asynchronous operation.

To be added.

## CacheExtensions.GetOrCreateAsync<TItem>(IMemoryCache, Object, Task<TItem>>, MemoryCacheEntryOptions) method

```csharp
public static System.Threading.Tasks.Task<TItem?> GetOrCreateAsync<TItem> (this Microsoft.Extensions.Caching.Memory.IMemoryCache cache, object key, Func<Microsoft.Extensions.Caching.Memory.ICacheEntry,System.Threading.Tasks.Task<TItem>> factory, Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions? createOptions);
```

Asynchronously gets the value associated with this key if it exists, or generates a new entry using the provided key and a value from the given factory if the key is not found.

Parameters:

- `TItem`: The type of the object to get.
- `cache`: The `IMemoryCache` instance this method extends.
- `key`: The key of the entry to look for or create.
- `factory`: The factory task that creates the value associated with this key if the key does not exist in the cache.
- `createOptions`: The options to be applied to the `ICacheEntry` if the key does not exist in the cache.

Returns: The task object representing the asynchronous operation.

To be added.

## CacheExtensions.Set<TItem>(IMemoryCache, Object, TItem) method

```csharp
public static TItem Set<TItem> (this Microsoft.Extensions.Caching.Memory.IMemoryCache cache, object key, TItem value);
```

Associate a value with a key in the `IMemoryCache`.

Parameters:

- `TItem`: The type of the object to set.
- `cache`: The `IMemoryCache` instance this method extends.
- `key`: The key of the entry to set.
- `value`: The value to associate with the key.

Returns: The value that was set.

To be added.

## CacheExtensions.Set<TItem>(IMemoryCache, Object, TItem, MemoryCacheEntryOptions) method

```csharp
public static TItem Set<TItem> (this Microsoft.Extensions.Caching.Memory.IMemoryCache cache, object key, TItem value, Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions? options);
```

Sets a cache entry with the given key and value and apply the values of an existing `MemoryCacheEntryOptions` to the created entry.

Parameters:

- `TItem`: The type of the object to set.
- `cache`: The `IMemoryCache` instance this method extends.
- `key`: The key of the entry to set.
- `value`: The value to associate with the key.
- `options`: The existing `MemoryCacheEntryOptions` instance to apply to the new entry.

Returns: The value that was set.

To be added.

## CacheExtensions.Set<TItem>(IMemoryCache, Object, TItem, IChangeToken) method

```csharp
public static TItem Set<TItem> (this Microsoft.Extensions.Caching.Memory.IMemoryCache cache, object key, TItem value, Microsoft.Extensions.Primitives.IChangeToken <example-value>);
```

Sets a cache entry with the given key and value that will expire when `IChangeToken` expires.

Parameters:

- `TItem`: The type of the object to set.
- `cache`: The `IMemoryCache` instance this method extends.
- `key`: The key of the entry to set.
- `value`: The value to associate with the key.
- `expirationToken`: The `IChangeToken` that causes the cache entry to expire.

Returns: The value that was set.

To be added.

## CacheExtensions.Set<TItem>(IMemoryCache, Object, TItem, DateTimeOffset) method

```csharp
public static TItem Set<TItem> (this Microsoft.Extensions.Caching.Memory.IMemoryCache cache, object key, TItem value, DateTimeOffset absoluteExpiration);
```

Sets a cache entry with the given key and value that will expire in the given duration.

Parameters:

- `TItem`: The type of the object to set.
- `cache`: The `IMemoryCache` instance this method extends.
- `key`: The key of the entry to set.
- `value`: The value to associate with the key.
- `absoluteExpiration`: The point in time at which the cache entry will expire.

Returns: The value that was set.

To be added.

## CacheExtensions.Set<TItem>(IMemoryCache, Object, TItem, TimeSpan) method

```csharp
public static TItem Set<TItem> (this Microsoft.Extensions.Caching.Memory.IMemoryCache cache, object key, TItem value, TimeSpan absoluteExpirationRelativeToNow);
```

Sets a cache entry with the given key and value that will expire in the given duration from now.

Parameters:

- `TItem`: The type of the object to set.
- `cache`: The `IMemoryCache` instance this method extends.
- `key`: The key of the entry to set.
- `value`: The value to associate with the key.
- `absoluteExpirationRelativeToNow`: The duration from now after which the cache entry will expire.

Returns: The value that was set.

To be added.

## CacheExtensions.TryGetValue<TItem>(IMemoryCache, Object, TItem) method

```csharp
public static bool TryGetValue<TItem> (this Microsoft.Extensions.Caching.Memory.IMemoryCache cache, object key, out TItem? value);
```

Tries to get the value associated with the given key.

Parameters:

- `TItem`: The type of the object to get.
- `cache`: The `IMemoryCache` instance this method extends.
- `key`: The key of the value to get.
- `value`: The value associated with the given key.

Returns: `true` if the key was found; `false` otherwise.

This method returns `false` both when the key is not present in the cache and when the key is present but the stored value can't be cast to `TItem`. If you need to distinguish between these two cases (for example, in instrumented caches tracking hit/miss metrics), use the non-generic `IMemoryCache.TryGetValue` method instead, which returns `true` if the key is present regardless of type.
