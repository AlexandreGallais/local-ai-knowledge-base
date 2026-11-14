---
title: "IMemoryCache interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Memory/IMemoryCache.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IMemoryCache interface

Namespace: `Microsoft.Extensions.Caching.Memory`

```csharp
public interface IMemoryCache : IDisposable
```

Represents a local in-memory cache whose values are not serialized.

To be added.

## IMemoryCache.CreateEntry(Object) method

```csharp
public Microsoft.Extensions.Caching.Memory.ICacheEntry CreateEntry (object key);
```

Create or overwrite an entry in the cache.

Parameters:

- `key`: An object identifying the entry.

Returns: The newly created `ICacheEntry` instance.

To be added.

## IMemoryCache.GetCurrentStatistics() method

```csharp
public virtual Microsoft.Extensions.Caching.Memory.MemoryCacheStatistics? GetCurrentStatistics ();
```

Gets a snapshot of the cache statistics if available.

Returns: An instance of `MemoryCacheStatistics` containing a snapshot of the cache statistics.

To be added.

## IMemoryCache.Remove(Object) method

```csharp
public void Remove (object key);
```

Removes the object associated with the given key.

Parameters:

- `key`: An object identifying the entry.

To be added.

## IMemoryCache.TryGetValue(Object, Object) method

```csharp
public bool TryGetValue (object key, out object? value);
```

Gets the item associated with this key if present.

Parameters:

- `key`: An object identifying the requested entry.
- `value`: The located value or null.

Returns: True if the key was found.

To be added.
