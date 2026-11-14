---
title: "DistributedCacheExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Distributed/DistributedCacheExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DistributedCacheExtensions class

Namespace: `Microsoft.Extensions.Caching.Distributed`

```csharp
public static class DistributedCacheExtensions
```

Extension methods for setting data in an `IDistributedCache`.

To be added.

## DistributedCacheExtensions.GetString(IDistributedCache, String) method

```csharp
public static string? GetString (this Microsoft.Extensions.Caching.Distributed.IDistributedCache cache, string key);
```

Gets a string from the specified cache with the specified key.

Parameters:

- `cache`: The cache in which to store the data.
- `key`: The key to get the stored data for.

Returns: The string value from the stored cache key.

To be added.

## DistributedCacheExtensions.GetStringAsync(IDistributedCache, String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<string?> GetStringAsync (this Microsoft.Extensions.Caching.Distributed.IDistributedCache cache, string key, System.Threading.CancellationToken token = <example-value>);
```

Asynchronously gets a string from the specified cache with the specified key.

Parameters:

- `cache`: The cache in which to store the data.
- `key`: The key to get the stored data for.
- `token`: Optional. A `CancellationToken` to cancel the operation.

Returns: A task that gets the string value from the stored cache key.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `DistributedCacheExtensions.GetString`.

## DistributedCacheExtensions.Set(IDistributedCache, String, Byte[]) method

```csharp
public static void Set (this Microsoft.Extensions.Caching.Distributed.IDistributedCache cache, string key, byte[] value);
```

Sets a sequence of bytes in the specified cache with the specified key.

Parameters:

- `cache`: The cache in which to store the data.
- `key`: The key to store the data in.
- `value`: The data to store in the cache.

Exceptions:

- `ArgumentNullException`: `key` or `value` is null.

To be added.

## DistributedCacheExtensions.SetAsync(IDistributedCache, String, Byte[], CancellationToken) method

```csharp
public static System.Threading.Tasks.Task SetAsync (this Microsoft.Extensions.Caching.Distributed.IDistributedCache cache, string key, byte[] value, System.Threading.CancellationToken token = <example-value>);
```

Asynchronously sets a sequence of bytes in the specified cache with the specified key.

Parameters:

- `cache`: The cache in which to store the data.
- `key`: The key to store the data in.
- `value`: The data to store in the cache.
- `token`: Optional. A `CancellationToken` to cancel the operation.

Returns: A task that represents the asynchronous set operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.
- `ArgumentNullException`: `key` or `value` is null.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `DistributedCacheExtensions.Set`.

## DistributedCacheExtensions.SetString(IDistributedCache, String, String) method

```csharp
public static void SetString (this Microsoft.Extensions.Caching.Distributed.IDistributedCache cache, string key, string value);
```

Sets a string in the specified cache with the specified key.

Parameters:

- `cache`: The cache in which to store the data.
- `key`: The key to store the data in.
- `value`: The data to store in the cache.

Exceptions:

- `ArgumentNullException`: `key` or `value` is null.

To be added.

## DistributedCacheExtensions.SetString(IDistributedCache, String, String, DistributedCacheEntryOptions) method

```csharp
public static void SetString (this Microsoft.Extensions.Caching.Distributed.IDistributedCache cache, string key, string value, Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions options);
```

Sets a string in the specified cache with the specified key.

Parameters:

- `cache`: The cache in which to store the data.
- `key`: The key to store the data in.
- `value`: The data to store in the cache.
- `options`: The cache options for the entry.

Exceptions:

- `ArgumentNullException`: `key` or `value` is null.

To be added.

## DistributedCacheExtensions.SetStringAsync(IDistributedCache, String, String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task SetStringAsync (this Microsoft.Extensions.Caching.Distributed.IDistributedCache cache, string key, string value, System.Threading.CancellationToken token = <example-value>);
```

Asynchronously sets a string in the specified cache with the specified key.

Parameters:

- `cache`: The cache in which to store the data.
- `key`: The key to store the data in.
- `value`: The data to store in the cache.
- `token`: Optional. A `CancellationToken` to cancel the operation.

Returns: A task that represents the asynchronous set operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.
- `ArgumentNullException`: `key` or `value` is null.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `DistributedCacheExtensions.SetString`.

## DistributedCacheExtensions.SetStringAsync(IDistributedCache, String, String, DistributedCacheEntryOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task SetStringAsync (this Microsoft.Extensions.Caching.Distributed.IDistributedCache cache, string key, string value, Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions options, System.Threading.CancellationToken token = <example-value>);
```

Asynchronously sets a string in the specified cache with the specified key.

Parameters:

- `cache`: The cache in which to store the data.
- `key`: The key to store the data in.
- `value`: The data to store in the cache.
- `options`: The cache options for the entry.
- `token`: Optional. A `CancellationToken` to cancel the operation.

Returns: A task that represents the asynchronous set operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.
- `ArgumentNullException`: `key` or `value` is null.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `DistributedCacheExtensions.SetString`.
