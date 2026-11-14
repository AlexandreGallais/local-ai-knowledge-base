---
title: "MemoryCache class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Memory/MemoryCache.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryCache class

Namespace: `Microsoft.Extensions.Caching.Memory`

```csharp
public class MemoryCache : IDisposable, Microsoft.Extensions.Caching.Memory.IMemoryCache
```

Implements `IMemoryCache` using a dictionary to
store its entries.

To be added.

## MemoryCache.MemoryCache(MemoryCacheOptions>) constructor

```csharp
public MemoryCache (Microsoft.Extensions.Options.IOptions<Microsoft.Extensions.Caching.Memory.MemoryCacheOptions> optionsAccessor);
```

Creates a new `MemoryCache` instance.

Parameters:

- `optionsAccessor`: The options of the cache.

To be added.

## MemoryCache.MemoryCache(MemoryCacheOptions>, ILoggerFactory) constructor

```csharp
public MemoryCache (Microsoft.Extensions.Options.IOptions<Microsoft.Extensions.Caching.Memory.MemoryCacheOptions> optionsAccessor, Microsoft.Extensions.Logging.ILoggerFactory? loggerFactory);
```

Creates a new `MemoryCache` instance.

Parameters:

- `optionsAccessor`: The options of the cache.
- `loggerFactory`: The factory used to create loggers.

To be added.

## MemoryCache.MemoryCache(MemoryCacheOptions>, ILoggerFactory, IMeterFactory) constructor

```csharp
public MemoryCache (Microsoft.Extensions.Options.IOptions<Microsoft.Extensions.Caching.Memory.MemoryCacheOptions> optionsAccessor, Microsoft.Extensions.Logging.ILoggerFactory? loggerFactory, System.Diagnostics.Metrics.IMeterFactory? meterFactory);
```

Creates a new `MemoryCache` instance.

Parameters:

- `optionsAccessor`: The options of the cache.
- `loggerFactory`: The factory used to create loggers.
- `meterFactory`: The factory used to create meters for metrics collection.

To be added.

## MemoryCache.Count property

```csharp
public int Count { get; }
```

Gets the count of the current entries for diagnostic purposes.

Returns: To be added.

To be added.

## MemoryCache.Keys property

```csharp
public System.Collections.Generic.IEnumerable<object> Keys { get; }
```

Gets an enumerable of the all the keys in the `MemoryCache`.

Returns: To be added.

To be added.

## MemoryCache.Clear() method

```csharp
public void Clear ();
```

Removes all keys and values from the cache.

To be added.

## MemoryCache.Compact(Double) method

```csharp
public void Compact (double percentage);
```

To be added.

To be added.

## MemoryCache.CreateEntry(Object) method

```csharp
public Microsoft.Extensions.Caching.Memory.ICacheEntry CreateEntry (object key);
```

Creates or overwrites an entry in the cache.

Parameters:

- `key`: An object identifying the entry.

Returns: The newly created <xref data-throw-if-not-resolved="true" uid="Microsoft.Extensions.Caching.Memory.ICacheEntry"></xref> instance.

To be added.

## MemoryCache.Dispose() method

```csharp
public void Dispose ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

To be added.

## MemoryCache.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Disposes the cache and clears all entries.

Parameters:

- `disposing`: `true` to dispose the object resources; `false` to take no action.

To be added.

## MemoryCache.Finalize() method

```csharp
~MemoryCache ();
```

Cleans up the background collection events.

To be added.

## MemoryCache.GetCurrentStatistics() method

```csharp
public Microsoft.Extensions.Caching.Memory.MemoryCacheStatistics? GetCurrentStatistics ();
```

Gets a snapshot of the current statistics for the memory cache.

Returns: Returns `null` if statistics are not being tracked because `MemoryCacheOptions.TrackStatistics` is `false`.

To be added.

## MemoryCache.Remove(Object) method

```csharp
public void Remove (object key);
```

Removes the object associated with the given key.

Parameters:

- `key`: An object identifying the entry.

To be added.

## MemoryCache.TryGetValue(Object, Object) method

```csharp
public bool TryGetValue (object key, out object? result);
```

Gets the item associated with this key if present.

Parameters:

- `key`: An object identifying the requested entry.

Returns: ```csharp
true
```
if the key was found.

To be added.

## MemoryCache.TryGetValue(Char>, Object) method

```csharp
public bool TryGetValue (ReadOnlySpan<char> key, out object? value);
```

Gets the item associated with this key if present.

Parameters:

- `key`: A character span corresponding to a `String` identifying the requested entry.
- `value`: The located value or null.

Returns: True if the key was found.

This method allows values with `String` keys to be queried by content without allocating a new `String` instance.

## MemoryCache.TryGetValue<TItem>(Char>, TItem) method

```csharp
public bool TryGetValue<TItem> (ReadOnlySpan<char> key, out TItem? value);
```

Gets the item associated with this key if present.

Parameters:

- `TItem`: To be added.
- `key`: A character span corresponding to a `String` identifying the requested entry.
- `value`: The located value or null.

Returns: True if the key was found.

This method allows values with `String` keys to be queried by content without allocating a new `String` instance.
