---
title: "HybridCache class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Hybrid/HybridCache.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HybridCache class (part 2 of 2)

## HybridCache.GetOrCreateAsync<TState,T>(String, TState, ValueTask<T>>, HybridCacheEntryOptions, String>, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.ValueTask<T> GetOrCreateAsync<TState,T> (string key, TState state, Func<TState,Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryContext,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<T>> factory, Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions? options = default, System.Collections.Generic.IEnumerable<string>? tags = default, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously gets the value associated with the key if it exists, or generates a new entry using the provided key and a value from the given factory if the key is not found.

Parameters:

- `TState`: The type of additional state required by `factory`.
- `T`: The type of the data being considered.
- `key`: The key of the entry to look for or create.
- `state`: The state required for `factory`.
- `factory`: Provides the underlying data service if the data is not available in the cache. The `HybridCacheEntryContext` passed to the factory allows it to influence cache entry options based on the result.
- `options`: Additional options for this cache entry.
- `tags`: The tags to associate with this cache item.
- `cancellationToken`: The `CancellationToken` used to propagate notifications that the operation should be canceled.

Returns: The data, either from cache or the underlying data service.

To be added.

## HybridCache.GetOrCreateAsync<TState,T>(String, TState, ValueTask<T>>, HybridCacheEntryOptions, String>, CancellationToken) method

```csharp
public abstract System.Threading.Tasks.ValueTask<T> GetOrCreateAsync<TState,T> (string key, TState state, Func<TState,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<T>> factory, Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions? options = default, System.Collections.Generic.IEnumerable<string>? tags = default, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously gets the value associated with the key if it exists, or generates a new entry using the provided key and a value from the given factory if the key is not found.

Parameters:

- `TState`: The type of additional state required by `factory`.
- `T`: The type of the data being considered.
- `key`: The key of the entry to look for or create.
- `factory`: Provides the underlying data service if the data is not available in the cache.
- `state`: The state required for `factory`.
- `options`: Additional options for this cache entry.
- `tags`: The tags to associate with this cache item.
- `cancellationToken`: The `CancellationToken` used to propagate notifications that the operation should be canceled.

Returns: The data, either from cache or the underlying data service.

To be added.

## HybridCache.RemoveAsync(String>, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.ValueTask RemoveAsync (System.Collections.Generic.IEnumerable<string> keys, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously removes the value associated with the key if it exists.

Parameters:

- `keys`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

Implementors should treat `null` as empty

## HybridCache.RemoveAsync(String, CancellationToken) method

```csharp
public abstract System.Threading.Tasks.ValueTask RemoveAsync (string key, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously removes the value associated with the key if it exists.

Parameters:

- `key`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## HybridCache.RemoveByTagAsync(String>, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.ValueTask RemoveByTagAsync (System.Collections.Generic.IEnumerable<string> tags, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously removes all values associated with the specified tags.

Parameters:

- `tags`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

Implementors should treat `null` as empty

## HybridCache.RemoveByTagAsync(String, CancellationToken) method

```csharp
public abstract System.Threading.Tasks.ValueTask RemoveByTagAsync (string tag, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously removes all values associated with the specified tag.

Parameters:

- `tag`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## HybridCache.SetAsync<T>(String, T, HybridCacheEntryOptions, String>, CancellationToken) method

```csharp
public abstract System.Threading.Tasks.ValueTask SetAsync<T> (string key, T value, Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions? options = default, System.Collections.Generic.IEnumerable<string>? tags = default, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously sets or overwrites the value associated with the key.

Parameters:

- `T`: The type of the data being considered.
- `key`: The key of the entry to create.
- `value`: The value to assign for this cache entry.
- `options`: Additional options for this cache entry.
- `tags`: The tags to associate with this cache entry.
- `cancellationToken`: The `CancellationToken` used to propagate notifications that the operation should be canceled.

Returns: To be added.

To be added.
