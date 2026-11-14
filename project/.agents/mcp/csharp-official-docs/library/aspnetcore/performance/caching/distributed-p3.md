---
title: "Distributed caching in ASP.NET Core (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/performance/caching/distributed.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Distributed caching in ASP.NET Core (part 3 of 3)

## Review cache recommendations

When deciding which implementation of the `Microsoft.Extensions.Caching.Distributed.IDistributedCache` interface is best for your app, consider the following points:

* Existing infrastructure
* Performance requirements
* Cost
* Team experience

Caching solutions usually rely on in-memory storage to provide fast retrieval of cached data, but memory is a limited resource and costly to expand. Only store commonly used data in a cache.

For most apps, a Redis cache provides higher throughput and lower latency than a SQL Server cache. However, benchmarking is recommended to determine the performance characteristics of caching strategies.

If SQL Server is the distributed cache backing store, and the cache and app data storage/retrieval use the same database, performance can be reduced. The recommended approach is to use a dedicated SQL Server instance for the distributed cache backing store.

## Related content

* Redis Cache on Azure
* SQL Database on Azure
* Azure Database for PostgreSQL
* ASP.NET Core IDistributedCache Provider for NCache in Web Farms (NCache on GitHub)
* Repository README file for Microsoft.Extensions.Caching.Cosmos
* Detect changes with change tokens in ASP.NET Core
* Cache Tag Helper in ASP.NET Core MVC
* Distributed Cache Tag Helper in ASP.NET Core
* Host ASP.NET Core in a web farm
