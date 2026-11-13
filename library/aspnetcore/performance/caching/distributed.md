---
title: "Distributed caching in ASP.NET Core (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/performance/caching/distributed.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Distributed caching in ASP.NET Core

By Mohsin Nasir and smandia

-->
-->

A distributed cache is a cache shared by multiple app servers. The cache is typically maintained as an external service for the app servers that access it. A distributed cache can improve the performance and scalability of an ASP.NET Core app, especially when a cloud service or a server farm hosts the app.

A distributed cache has several advantages over other caching scenarios where cached data is stored on individual app servers.

When cached data is distributed, the data:

* Is *coherent* (consistent) across requests to multiple servers.
* Survives server restarts and app deployments.
* Doesn't use local memory.

Distributed cache configuration is implementation specific. This article describes how to configure SQL Server, Redis, or Postgres distributed caches. Non-Microsoft implementations are also available, such as NCache (NCache on GitHub), Azure Cosmos DB, and Postgres. Regardless of which implementation is selected, the app interacts with the cache by using the `Microsoft.Extensions.Caching.Distributed.IDistributedCache` interface.

View or download sample code (how to download)

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see Secure authentication flows.

## Prerequisites

Add a package reference for the distributed cache provider used:

* For a Redis distributed cache, Microsoft.Extensions.Caching.StackExchangeRedis.
* For SQL Server, Microsoft.Extensions.Caching.SqlServer.
* For Postgres, Microsoft.Extensions.Caching.Postgres.
* For Azure Cosmos DB, Microsoft.Extensions.Caching.Cosmos.
* For the NCache distributed cache, NCache.Microsoft.Extensions.Caching.OpenSource.

## Use the IDistributedCache interface

The `Microsoft.Extensions.Caching.Distributed.IDistributedCache` interface provides the following methods to manipulate items in the distributed cache implementation:

* `Microsoft.Extensions.Caching.Distributed.IDistributedCache.Get*`, `Microsoft.Extensions.Caching.Distributed.IDistributedCache.GetAsync*`: Accepts a string key and retrieves a cached item as a `byte[]` array if found in the cache.
* `Microsoft.Extensions.Caching.Distributed.IDistributedCache.Set*`, `Microsoft.Extensions.Caching.Distributed.IDistributedCache.SetAsync*`: Adds an item (as `byte[]` array) to the cache by using a string key.
* `Microsoft.Extensions.Caching.Distributed.IDistributedCache.Refresh*`, `Microsoft.Extensions.Caching.Distributed.IDistributedCache.RefreshAsync*`: Refreshes an item in the cache based on its key, resetting its sliding expiration timeout (if any).
* `Microsoft.Extensions.Caching.Distributed.IDistributedCache.Remove*`, `Microsoft.Extensions.Caching.Distributed.IDistributedCache.RemoveAsync*`: Removes a cache item based on its string key.

### Store objects other than byte arrays

`Microsoft.Extensions.Caching.Distributed.IDistributedCache` stores values as `byte[]` arrays. To cache other types, serialize them first. The following extension methods use `System.Text.Json` to store any serializable type as UTF-8 JSON:

```csharp
using System.Text.Json;
using Microsoft.Extensions.Caching.Distributed;

public static class DistributedCacheExtensions
{
    public static Task SetAsync<T>(this IDistributedCache cache, string key, T value,
        DistributedCacheEntryOptions options, CancellationToken token = <example-value>) =>
        cache.SetAsync(key, JsonSerializer.SerializeToUtf8Bytes(value), options, token);

    public static async Task<T?> GetAsync<T>(this IDistributedCache cache, string key,
        CancellationToken token = <example-value>)
    {
        var bytes = await cache.GetAsync(key, token);
        return bytes is null ? default : JsonSerializer.Deserialize<T>(bytes);
    }
}
```

`GetAsync<T>` returns the type's default value, such as `null`, when the key isn't in the cache.

> **Tip:**
> The `HybridCache` library serializes values for you and adds an in-process primary cache and stampede protection on top of the distributed cache.
