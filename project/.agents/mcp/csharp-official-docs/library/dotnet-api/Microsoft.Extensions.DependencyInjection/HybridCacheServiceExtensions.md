---
title: "HybridCacheServiceExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/HybridCacheServiceExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HybridCacheServiceExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class HybridCacheServiceExtensions
```

Configuration extension methods for `HybridCache`.

To be added.

## HybridCacheServiceExtensions.AddHybridCache(IServiceCollection) method

```csharp
public static Microsoft.Extensions.Caching.Hybrid.IHybridCacheBuilder AddHybridCache (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds support for multi-tier caching services.

Parameters:

- `services`: The `IServiceCollection` to add the service to.

Returns: A builder instance that allows further configuration of the `HybridCache` service.

To be added.

## HybridCacheServiceExtensions.AddHybridCache(IServiceCollection, HybridCacheOptions>) method

```csharp
public static Microsoft.Extensions.Caching.Hybrid.IHybridCacheBuilder AddHybridCache (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Caching.Hybrid.HybridCacheOptions> setupAction);
```

Adds support for multi-tier caching services.

Parameters:

- `services`: The `IServiceCollection` to add the service to.
- `setupAction`: A delegate to run to configure the `HybridCacheOptions` instance.

Returns: A builder instance that allows further configuration of the `HybridCache` service.

To be added.

## HybridCacheServiceExtensions.AddKeyedHybridCache(IServiceCollection, Object) method

```csharp
public static Microsoft.Extensions.Caching.Hybrid.IHybridCacheBuilder AddKeyedHybridCache (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object? serviceKey);
```

Adds support for multi-tier caching services with a keyed registration.

Parameters:

- `services`: The `IServiceCollection` to add the service to.
- `serviceKey`: The key for the service registration.

Returns: A builder instance that allows further configuration of the `HybridCache` service.

To be added.

## HybridCacheServiceExtensions.AddKeyedHybridCache(IServiceCollection, Object, HybridCacheOptions>) method

```csharp
public static Microsoft.Extensions.Caching.Hybrid.IHybridCacheBuilder AddKeyedHybridCache (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object? serviceKey, Action<Microsoft.Extensions.Caching.Hybrid.HybridCacheOptions> setupAction);
```

Adds support for multi-tier caching services with a keyed registration.

Parameters:

- `services`: The `IServiceCollection` to add the service to.
- `serviceKey`: The key for the service registration.
- `setupAction`: A delegate to run to configure the `HybridCacheOptions` instance.

Returns: A builder instance that allows further configuration of the `HybridCache` service.

To be added.

## HybridCacheServiceExtensions.AddKeyedHybridCache(IServiceCollection, Object, String) method

```csharp
public static Microsoft.Extensions.Caching.Hybrid.IHybridCacheBuilder AddKeyedHybridCache (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object? serviceKey, string optionsName);
```

Adds support for multi-tier caching services with a keyed registration.

Parameters:

- `services`: The `IServiceCollection` to add the service to.
- `serviceKey`: The key for the service registration.
- `optionsName`: The named options name to use for the `HybridCacheOptions` instance.

Returns: A builder instance that allows further configuration of the `HybridCache` service.

To be added.

## HybridCacheServiceExtensions.AddKeyedHybridCache(IServiceCollection, Object, String, HybridCacheOptions>) method

```csharp
public static Microsoft.Extensions.Caching.Hybrid.IHybridCacheBuilder AddKeyedHybridCache (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object? serviceKey, string optionsName, Action<Microsoft.Extensions.Caching.Hybrid.HybridCacheOptions> setupAction);
```

Adds support for multi-tier caching services with a keyed registration.

Parameters:

- `services`: The `IServiceCollection` to add the service to.
- `serviceKey`: The key for the service registration.
- `optionsName`: The named options name to use for the `HybridCacheOptions` instance.
- `setupAction`: A delegate to run to configure the `HybridCacheOptions` instance.

Returns: A builder instance that allows further configuration of the `HybridCache` service.

To be added.
