---
title: "SqlServerCachingServicesExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/SqlServerCachingServicesExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SqlServerCachingServicesExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class SqlServerCachingServicesExtensions
```

Extension methods for setting up Microsoft SQL Server distributed cache services in an `IServiceCollection`.

To be added.

## SqlServerCachingServicesExtensions.AddDistributedSqlServerCache(IServiceCollection, SqlServerCacheOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddDistributedSqlServerCache (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions> setupAction);
```

Adds Microsoft SQL Server distributed caching services to the specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add services to.
- `setupAction`: An `Action<T>` to configure the provided `SqlServerCacheOptions`.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.
