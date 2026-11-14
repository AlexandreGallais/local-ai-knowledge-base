---
title: "IBufferDistributedCache interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Distributed/IBufferDistributedCache.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IBufferDistributedCache interface

Namespace: `Microsoft.Extensions.Caching.Distributed`

```csharp
public interface IBufferDistributedCache : Microsoft.Extensions.Caching.Distributed.IDistributedCache
```

Represents a distributed cache of serialized values, with support for low allocation data transfer.

To be added.

## IBufferDistributedCache.Set(String, Byte>, DistributedCacheEntryOptions) method

```csharp
public void Set (string key, System.Buffers.ReadOnlySequence<byte> value, Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions options);
```

Sets or overwrites a cache item.

Parameters:

- `key`: The key of the entry to create.
- `value`: The value for this cache entry.
- `options`: The cache options for the entry.

This method is functionally similar to `IDistributedCache.Set`, but avoids the array allocation.

## IBufferDistributedCache.SetAsync(String, Byte>, DistributedCacheEntryOptions, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask SetAsync (string key, System.Buffers.ReadOnlySequence<byte> value, Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions options, System.Threading.CancellationToken token = <example-value>);
```

Asynchronously sets or overwrites a cache entry.

Parameters:

- `key`: The key of the entry to create.
- `value`: The value for this cache entry.
- `options`: The cache options for the value.
- `token`: The `CancellationToken` used to propagate notifications that the operation should be canceled.

Returns: To be added.

This method is functionally similar to `IDistributedCache.SetAsync`, but avoids the array allocation.

## IBufferDistributedCache.TryGet(String, Byte>) method

```csharp
public bool TryGet (string key, System.Buffers.IBufferWriter<byte> destination);
```

Attempts to retrieve an existing cache item.

Parameters:

- `key`: The unique key for the cache item.
- `destination`: The target to write the cache contents on success.

Returns: `true` if the cache item is found, `false` otherwise.

This method is functionally similar to `IDistributedCache.Get`, but avoids the array allocation.

## IBufferDistributedCache.TryGetAsync(String, Byte>, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<bool> TryGetAsync (string key, System.Buffers.IBufferWriter<byte> destination, System.Threading.CancellationToken token = <example-value>);
```

Asynchronously attempts to retrieve an existing cache entry.

Parameters:

- `key`: The unique key for the cache entry.
- `destination`: The target to write the cache contents on success.
- `token`: The `CancellationToken` used to propagate notifications that the operation should be canceled.

Returns: `true` if the cache entry is found, `false` otherwise.

This method is functionally similar to `IDistributedCache.GetAsync`, but avoids the array allocation.
