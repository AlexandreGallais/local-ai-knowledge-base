---
title: "MemoryDistributedCache class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Distributed/MemoryDistributedCache.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryDistributedCache class

Namespace: `Microsoft.Extensions.Caching.Distributed`

```csharp
public class MemoryDistributedCache : Microsoft.Extensions.Caching.Distributed.IDistributedCache
```

Implements `IDistributedCache` using `IMemoryCache`.

To be added.

## MemoryDistributedCache.MemoryDistributedCache(MemoryDistributedCacheOptions>) constructor

```csharp
public MemoryDistributedCache (Microsoft.Extensions.Options.IOptions<Microsoft.Extensions.Caching.Memory.MemoryDistributedCacheOptions> optionsAccessor);
```

Creates a new `MemoryDistributedCache` instance.

Parameters:

- `optionsAccessor`: The options of the cache.

To be added.

## MemoryDistributedCache.MemoryDistributedCache(MemoryDistributedCacheOptions>, ILoggerFactory) constructor

```csharp
public MemoryDistributedCache (Microsoft.Extensions.Options.IOptions<Microsoft.Extensions.Caching.Memory.MemoryDistributedCacheOptions> optionsAccessor, Microsoft.Extensions.Logging.ILoggerFactory loggerFactory);
```

Creates a new `MemoryDistributedCache` instance.

Parameters:

- `optionsAccessor`: The options of the cache.
- `loggerFactory`: The logger factory to create `ILogger` used to log messages.

To be added.

## MemoryDistributedCache.Get(String) method

```csharp
public byte[]? Get (string key);
```

Gets the specified item associated with a key from the `IMemoryCache` as a byte array.

Parameters:

- `key`: The key of the item to get.

Returns: The byte array value of the key.

To be added.

## MemoryDistributedCache.GetAsync(String, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<byte[]?> GetAsync (string key, System.Threading.CancellationToken token = <example-value>);
```

Asynchronously gets the specified item associated with a key from the `IMemoryCache` as a byte array.

Parameters:

- `key`: The key of the item to get.
- `token`: The `CancellationToken` to use to cancel operation.

Returns: The task for getting the byte array value associated with the specified key from the cache.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `MemoryDistributedCache.Get`.

## MemoryDistributedCache.Refresh(String) method

```csharp
public void Refresh (string key);
```

Refreshes the specified item associated with a key from the `IMemoryCache`.

Parameters:

- `key`: The key of the item to refresh.

To be added.

## MemoryDistributedCache.RefreshAsync(String, CancellationToken) method

```csharp
public System.Threading.Tasks.Task RefreshAsync (string key, System.Threading.CancellationToken token = <example-value>);
```

Asynchronously refreshes the specified item associated with a key from the `IMemoryCache`.

Parameters:

- `key`: The key of the item to refresh.
- `token`: The `CancellationToken` to use to cancel operation.

Returns: The task for refreshing the specified key in the cache.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `MemoryDistributedCache.Refresh`.

## MemoryDistributedCache.Remove(String) method

```csharp
public void Remove (string key);
```

Removes the specified item associated with a key from the `IMemoryCache`.

Parameters:

- `key`: The key of the item to remove.

To be added.

## MemoryDistributedCache.RemoveAsync(String, CancellationToken) method

```csharp
public System.Threading.Tasks.Task RemoveAsync (string key, System.Threading.CancellationToken token = <example-value>);
```

Asynchronously removes the specified item associated with a key from the `IMemoryCache`.

Parameters:

- `key`: The key of the item to remove.
- `token`: The `CancellationToken` to use to cancel operation.

Returns: The task for removing the specified key from the cache.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `MemoryDistributedCache.Remove`.

## MemoryDistributedCache.Set(String, Byte[], DistributedCacheEntryOptions) method

```csharp
public void Set (string key, byte[] value, Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions options);
```

Sets the specified item associated with a key in the `IMemoryCache` as a byte array.

Parameters:

- `key`: The key of the item to set.
- `value`: The byte array value of the item to set.
- `options`: The cache options for the item to set.

To be added.

## MemoryDistributedCache.SetAsync(String, Byte[], DistributedCacheEntryOptions, CancellationToken) method

```csharp
public System.Threading.Tasks.Task SetAsync (string key, byte[] value, Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions options, System.Threading.CancellationToken token = <example-value>);
```

Asynchronously sets the specified item associated with a key in the `IMemoryCache` as a byte array.

Parameters:

- `key`: The key of the item to set.
- `value`: The byte array value of the item to set.
- `options`: The cache options for the item to set.
- `token`: The `CancellationToken` to use to cancel operation.

Returns: The task for setting the byte array value associated with the specified key in the cache.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `MemoryDistributedCache.Set`.
