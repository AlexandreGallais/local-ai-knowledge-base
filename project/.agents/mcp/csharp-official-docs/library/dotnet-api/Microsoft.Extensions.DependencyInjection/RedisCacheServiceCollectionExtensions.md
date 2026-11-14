---
title: "RedisCacheServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/RedisCacheServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RedisCacheServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class RedisCacheServiceCollectionExtensions
```

Extension methods for setting up Redis distributed cache related services in an `IServiceCollection`.

To be added.

## RedisCacheServiceCollectionExtensions.AddDistributedRedisCache(IServiceCollection, RedisCacheOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddDistributedRedisCache (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Caching.Redis.RedisCacheOptions> setupAction);
```

Adds Redis distributed caching services to the specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add services to.
- `setupAction`: An `Action<T>` to configure the provided
`RedisCacheOptions`.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.
