---
title: "ObjectPoolServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ObjectPoolServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ObjectPoolServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class ObjectPoolServiceCollectionExtensions
```

Extension methods for adding `ObjectPool<T>` to DI container.

To be added.

## ObjectPoolServiceCollectionExtensions.AddPooled<TService>(IServiceCollection, DependencyInjectionPoolOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddPooled<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.ObjectPool.DependencyInjectionPoolOptions>? configure = default) where TService : class;
```

Adds an `ObjectPool<T>` and lets DI return scoped instances of `TService`.

Parameters:

- `TService`: The type of objects to pool.
- `services`: The `IServiceCollection` to add to.
- `configure`: The action used to configure the options of the pool.

Returns: Provided service collection.

Exceptions:

- `ArgumentNullException`: `services` is `null`.

The default capacity is 1024.
The pooled type instances are obtainable by resolving `ObjectPool<T>` from the DI container.

## ObjectPoolServiceCollectionExtensions.AddPooled<TService,TImplementation>(IServiceCollection, DependencyInjectionPoolOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddPooled<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.ObjectPool.DependencyInjectionPoolOptions>? configure = default) where TService : class where TImplementation : class, TService;
```

Adds an `ObjectPool<T>` and lets DI return scoped instances of `TService`.

Parameters:

- `TService`: The type of objects to pool.
- `TImplementation`: The type of the implementation to use.
- `services`: The `IServiceCollection` to add to.
- `configure`: Configuration of the pool.

Returns: Provided service collection.

Exceptions:

- `ArgumentNullException`: `services` is `null`.

The default capacity is 1024.
The pooled type instances are obtainable by resolving `ObjectPool<T>` from the DI container.

## ObjectPoolServiceCollectionExtensions.ConfigurePool<TService>(IServiceCollection, DependencyInjectionPoolOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection ConfigurePool<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.ObjectPool.DependencyInjectionPoolOptions> configure) where TService : class;
```

Registers an action used to configure the `DependencyInjectionPoolOptions` of a typed pool.

Parameters:

- `TService`: The type of objects to pool.
- `services`: The `IServiceCollection` to add the services to.
- `configure`: The action used to configure the options.

Returns: The value of `services`.

To be added.

## ObjectPoolServiceCollectionExtensions.ConfigurePools(IServiceCollection, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection ConfigurePools (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Configures DI pools.

Parameters:

- `services`: The `IServiceCollection` to add to.
- `section`: The configuration section to bind.

Returns: The value of `services`.

To be added.
