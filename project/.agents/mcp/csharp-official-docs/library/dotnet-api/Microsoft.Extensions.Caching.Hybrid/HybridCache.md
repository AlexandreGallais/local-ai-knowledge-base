---
title: "HybridCache class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Hybrid/HybridCache.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HybridCache class

Namespace: `Microsoft.Extensions.Caching.Hybrid`

```csharp
public abstract class HybridCache
```

Provides multi-tier caching services building on `IDistributedCache` backends.

To be added.

## HybridCache.HybridCache() constructor

```csharp
protected HybridCache ();
```

To be added.

To be added.

## HybridCache.GetOrCreateAsync<T>(Char>, ValueTask<T>>, HybridCacheEntryOptions, String>, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<T> GetOrCreateAsync<T> (ReadOnlySpan<char> key, Func<Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryContext,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<T>> factory, Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions? options = default, System.Collections.Generic.IEnumerable<string>? tags = default, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously gets the value associated with the key if it exists, or generates a new entry using the provided key and a value from the given factory if the key is not found.

Parameters:

- `T`: The type of the data being considered.
- `key`: The key of the entry to look for or create.
- `factory`: Provides the underlying data service if the data is not available in the cache. The `HybridCacheEntryContext` passed to the factory allows it to influence cache entry options based on the result.
- `options`: Additional options for this cache entry.
- `tags`: The tags to associate with this cache item.
- `cancellationToken`: The `CancellationToken` used to propagate notifications that the operation should be canceled.

Returns: The data, either from cache or the underlying data service.

To be added.

## HybridCache.GetOrCreateAsync<T>(Char>, ValueTask<T>>, HybridCacheEntryOptions, String>, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<T> GetOrCreateAsync<T> (ReadOnlySpan<char> key, Func<System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<T>> factory, Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions? options = default, System.Collections.Generic.IEnumerable<string>? tags = default, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously gets the value associated with the key if it exists, or generates a new entry using the provided key and a value from the given factory if the key is not found.

Parameters:

- `T`: The type of the data being considered.
- `key`: The key of the entry to look for or create.
- `factory`: Provides the underlying data service if the data is not available in the cache.
- `options`: Additional options for this cache entry.
- `tags`: The tags to associate with this cache item.
- `cancellationToken`: The `CancellationToken` used to propagate notifications that the operation should be canceled.

Returns: The data, either from cache or the underlying data service.

To be added.

## HybridCache.GetOrCreateAsync<T>(DefaultInterpolatedStringHandler, ValueTask<T>>, HybridCacheEntryOptions, String>, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<T> GetOrCreateAsync<T> (ref System.Runtime.CompilerServices.DefaultInterpolatedStringHandler key, Func<Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryContext,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<T>> factory, Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions? options = default, System.Collections.Generic.IEnumerable<string>? tags = default, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously gets the value associated with the key if it exists, or generates a new entry using the provided key and a value from the given factory if the key is not found.

Parameters:

- `T`: The type of the data being considered.
- `key`: The key of the entry to look for or create.
- `factory`: Provides the underlying data service if the data is not available in the cache. The `HybridCacheEntryContext` passed to the factory allows it to influence cache entry options based on the result.
- `options`: Additional options for this cache entry.
- `tags`: The tags to associate with this cache item.
- `cancellationToken`: The `CancellationToken` used to propagate notifications that the operation should be canceled.

Returns: The data, either from cache or the underlying data service.

To be added.

## HybridCache.GetOrCreateAsync<T>(DefaultInterpolatedStringHandler, ValueTask<T>>, HybridCacheEntryOptions, String>, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<T> GetOrCreateAsync<T> (ref System.Runtime.CompilerServices.DefaultInterpolatedStringHandler key, Func<System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<T>> factory, Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions? options = default, System.Collections.Generic.IEnumerable<string>? tags = default, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously gets the value associated with the key if it exists, or generates a new entry using the provided key and a value from the given factory if the key is not found.

Parameters:

- `T`: The type of the data being considered.
- `key`: The key of the entry to look for or create.
- `factory`: Provides the underlying data service if the data is not available in the cache.
- `options`: Additional options for this cache entry.
- `tags`: The tags to associate with this cache item.
- `cancellationToken`: The `CancellationToken` used to propagate notifications that the operation should be canceled.

Returns: The data, either from cache or the underlying data service.

To be added.

## HybridCache.GetOrCreateAsync<T>(String, ValueTask<T>>, HybridCacheEntryOptions, String>, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<T> GetOrCreateAsync<T> (string key, Func<Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryContext,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<T>> factory, Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions? options = default, System.Collections.Generic.IEnumerable<string>? tags = default, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously gets the value associated with the key if it exists, or generates a new entry using the provided key and a value from the given factory if the key is not found.

Parameters:

- `T`: The type of the data being considered.
- `key`: The key of the entry to look for or create.
- `factory`: Provides the underlying data service if the data is not available in the cache. The `HybridCacheEntryContext` passed to the factory allows it to influence cache entry options based on the result.
- `options`: Additional options for this cache entry.
- `tags`: The tags to associate with this cache item.
- `cancellationToken`: The `CancellationToken` used to propagate notifications that the operation should be canceled.

Returns: The data, either from cache or the underlying data service.

To be added.

## HybridCache.GetOrCreateAsync<T>(String, ValueTask<T>>, HybridCacheEntryOptions, String>, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<T> GetOrCreateAsync<T> (string key, Func<System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<T>> factory, Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions? options = default, System.Collections.Generic.IEnumerable<string>? tags = default, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously gets the value associated with the key if it exists, or generates a new entry using the provided key and a value from the given factory if the key is not found.

Parameters:

- `T`: The type of the data being considered.
- `key`: The key of the entry to look for or create.
- `factory`: Provides the underlying data service if the data is not available in the cache.
- `options`: Additional options for this cache entry.
- `tags`: The tags to associate with this cache item.
- `cancellationToken`: The `CancellationToken` used to propagate notifications that the operation should be canceled.

Returns: The data, either from cache or the underlying data service.

To be added.

## HybridCache.GetOrCreateAsync<TState,T>(Char>, TState, ValueTask<T>>, HybridCacheEntryOptions, String>, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.ValueTask<T> GetOrCreateAsync<TState,T> (ReadOnlySpan<char> key, TState state, Func<TState,Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryContext,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<T>> factory, Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions? options = default, System.Collections.Generic.IEnumerable<string>? tags = default, System.Threading.CancellationToken <example-value> = default);
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

## HybridCache.GetOrCreateAsync<TState,T>(Char>, TState, ValueTask<T>>, HybridCacheEntryOptions, String>, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.ValueTask<T> GetOrCreateAsync<TState,T> (ReadOnlySpan<char> key, TState state, Func<TState,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<T>> factory, Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions? options = default, System.Collections.Generic.IEnumerable<string>? tags = default, System.Threading.CancellationToken <example-value> = default);
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

Implementors may use the key span to attempt a local-cache synchronous 'get' without requiring the key as a `String`.

## HybridCache.GetOrCreateAsync<TState,T>(DefaultInterpolatedStringHandler, TState, ValueTask<T>>, HybridCacheEntryOptions, String>, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<T> GetOrCreateAsync<TState,T> (ref System.Runtime.CompilerServices.DefaultInterpolatedStringHandler key, TState state, Func<TState,Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryContext,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<T>> factory, Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions? options = default, System.Collections.Generic.IEnumerable<string>? tags = default, System.Threading.CancellationToken <example-value> = default);
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

## HybridCache.GetOrCreateAsync<TState,T>(DefaultInterpolatedStringHandler, TState, ValueTask<T>>, HybridCacheEntryOptions, String>, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<T> GetOrCreateAsync<TState,T> (ref System.Runtime.CompilerServices.DefaultInterpolatedStringHandler key, TState state, Func<TState,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<T>> factory, Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions? options = default, System.Collections.Generic.IEnumerable<string>? tags = default, System.Threading.CancellationToken <example-value> = default);
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
