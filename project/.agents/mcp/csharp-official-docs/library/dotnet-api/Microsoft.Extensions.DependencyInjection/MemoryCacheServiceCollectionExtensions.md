---
title: "MemoryCacheServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/MemoryCacheServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryCacheServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class MemoryCacheServiceCollectionExtensions
```

Extension methods for setting up memory cache related services in an `IServiceCollection`.

To be added.

## MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddDistributedMemoryCache (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds a default implementation of `IDistributedCache` that stores items in memory
to the `IServiceCollection`. Frameworks that require a distributed cache to work
can safely add this dependency as part of their dependency list to ensure that there is at least
one implementation available.

Parameters:

- `services`: The `IServiceCollection` to add services to.

Returns: The `IServiceCollection` so that additional calls can be chained.

`MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache` should only be used in single
server scenarios as this cache stores items in memory and doesn't expand across multiple machines.
For those scenarios it is recommended to use a proper distributed cache that can expand across
multiple machines.

## MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache(IServiceCollection, MemoryDistributedCacheOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddDistributedMemoryCache (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Caching.Memory.MemoryDistributedCacheOptions> setupAction);
```

Adds a default implementation of `IDistributedCache` that stores items in memory
to the `IServiceCollection`. Frameworks that require a distributed cache to work
can safely add this dependency as part of their dependency list to ensure that there is at least
one implementation available.

Parameters:

- `services`: The `IServiceCollection` to add services to.
- `setupAction`: The `Action<T>` to configure the provided `MemoryDistributedCacheOptions`.

Returns: The `IServiceCollection` so that additional calls can be chained.

`MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache` should only be used in single
server scenarios as this cache stores items in memory and doesn't expand across multiple machines.
For those scenarios it is recommended to use a proper distributed cache that can expand across
multiple machines.

## MemoryCacheServiceCollectionExtensions.AddMemoryCache(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddMemoryCache (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds a non distributed in-memory implementation of `IMemoryCache` to the
`IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add services to.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.

## MemoryCacheServiceCollectionExtensions.AddMemoryCache(IServiceCollection, MemoryCacheOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddMemoryCache (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Caching.Memory.MemoryCacheOptions> setupAction);
```

Adds a non distributed in-memory implementation of `IMemoryCache` to the
`IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add services to.
- `setupAction`: The `Action<T>` to configure the provided `MemoryCacheOptions`.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.
