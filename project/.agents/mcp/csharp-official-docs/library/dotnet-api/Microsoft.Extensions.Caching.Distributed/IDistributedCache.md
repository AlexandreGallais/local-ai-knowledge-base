---
title: "IDistributedCache interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Distributed/IDistributedCache.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IDistributedCache interface

Namespace: `Microsoft.Extensions.Caching.Distributed`

```csharp
public interface IDistributedCache
```

Represents a distributed cache of serialized values.

To be added.

## IDistributedCache.Get(String) method

```csharp
public byte[]? Get (string key);
```

Gets a value with the given key.

Parameters:

- `key`: A string identifying the requested value.

Returns: The located value or null.

To be added.

## IDistributedCache.GetAsync(String, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<byte[]?> GetAsync (string key, System.Threading.CancellationToken token = <example-value>);
```

Gets a value with the given key.

Parameters:

- `key`: A string identifying the requested value.
- `token`: Optional. The `CancellationToken` used to propagate notifications that the operation should be canceled.

Returns: The `Task` that represents the asynchronous operation, containing the located value or null.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `IDistributedCache.Get`.

## IDistributedCache.Refresh(String) method

```csharp
public void Refresh (string key);
```

Refreshes a value in the cache based on its key, resetting its sliding expiration timeout (if any).

Parameters:

- `key`: A string identifying the requested value.

To be added.

## IDistributedCache.RefreshAsync(String, CancellationToken) method

```csharp
public System.Threading.Tasks.Task RefreshAsync (string key, System.Threading.CancellationToken token = <example-value>);
```

Refreshes a value in the cache based on its key, resetting its sliding expiration timeout (if any).

Parameters:

- `key`: A string identifying the requested value.
- `token`: Optional. The `CancellationToken` used to propagate notifications that the operation should be canceled.

Returns: The `Task` that represents the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `IDistributedCache.Refresh`.

## IDistributedCache.Remove(String) method

```csharp
public void Remove (string key);
```

Removes the value with the given key.

Parameters:

- `key`: A string identifying the requested value.

To be added.

## IDistributedCache.RemoveAsync(String, CancellationToken) method

```csharp
public System.Threading.Tasks.Task RemoveAsync (string key, System.Threading.CancellationToken token = <example-value>);
```

Removes the value with the given key.

Parameters:

- `key`: A string identifying the requested value.
- `token`: Optional. The `CancellationToken` used to propagate notifications that the operation should be canceled.

Returns: The `Task` that represents the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `IDistributedCache.Remove`.

## IDistributedCache.Set(String, Byte[], DistributedCacheEntryOptions) method

```csharp
public void Set (string key, byte[] value, Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions options);
```

Sets a value with the given key.

Parameters:

- `key`: A string identifying the requested value.
- `value`: The value to set in the cache.
- `options`: The cache options for the value.

To be added.

## IDistributedCache.SetAsync(String, Byte[], DistributedCacheEntryOptions, CancellationToken) method

```csharp
public System.Threading.Tasks.Task SetAsync (string key, byte[] value, Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions options, System.Threading.CancellationToken token = <example-value>);
```

Sets the value with the given key.

Parameters:

- `key`: A string identifying the requested value.
- `value`: The value to set in the cache.
- `options`: The cache options for the value.
- `token`: Optional. The `CancellationToken` used to propagate notifications that the operation should be canceled.

Returns: The `Task` that represents the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `IDistributedCache.Set`.
