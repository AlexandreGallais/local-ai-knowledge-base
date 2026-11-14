---
title: "ImageGeneratorBuilderServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ImageGeneratorBuilderServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImageGeneratorBuilderServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class ImageGeneratorBuilderServiceCollectionExtensions
```

Provides extension methods for registering `IImageGenerator` with a `IServiceCollection`.

To be added.

## ImageGeneratorBuilderServiceCollectionExtensions.AddImageGenerator(IServiceCollection, IImageGenerator, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.AI.ImageGeneratorBuilder AddImageGenerator (this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection, Microsoft.Extensions.AI.IImageGenerator innerGenerator, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton);
```

Registers a singleton `IImageGenerator` in the `IServiceCollection`.

Parameters:

- `serviceCollection`: The `IServiceCollection` to which the generator should be added.
- `innerGenerator`: The inner `IImageGenerator` that represents the underlying backend.
- `lifetime`: The service lifetime for the generator. Defaults to `ServiceLifetime.Singleton`.

Returns: An `ImageGeneratorBuilder` that can be used to build a pipeline around the inner generator.

Exceptions:

- `ArgumentNullException`: `serviceCollection` or `innerGenerator` is `null`.

The generator is registered as a singleton service.

## ImageGeneratorBuilderServiceCollectionExtensions.AddImageGenerator(IServiceCollection, IImageGenerator>, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.AI.ImageGeneratorBuilder AddImageGenerator (this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection, Func<IServiceProvider,Microsoft.Extensions.AI.IImageGenerator> innerGeneratorFactory, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton);
```

Registers a singleton `IImageGenerator` in the `IServiceCollection`.

Parameters:

- `serviceCollection`: The `IServiceCollection` to which the generator should be added.
- `innerGeneratorFactory`: A callback that produces the inner `IImageGenerator` that represents the underlying backend.
- `lifetime`: The service lifetime for the generator. Defaults to `ServiceLifetime.Singleton`.

Returns: An `ImageGeneratorBuilder` that can be used to build a pipeline around the inner generator.

Exceptions:

- `ArgumentNullException`: `serviceCollection` or `innerGeneratorFactory` is `null`.

The generator is registered as a singleton service.

## ImageGeneratorBuilderServiceCollectionExtensions.AddKeyedImageGenerator(IServiceCollection, Object, IImageGenerator, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.AI.ImageGeneratorBuilder AddKeyedImageGenerator (this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection, object? serviceKey, Microsoft.Extensions.AI.IImageGenerator innerGenerator, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton);
```

Registers a keyed singleton `IImageGenerator` in the `IServiceCollection`.

Parameters:

- `serviceCollection`: The `IServiceCollection` to which the generator should be added.
- `serviceKey`: The key with which to associate the generator.
- `innerGenerator`: The inner `IImageGenerator` that represents the underlying backend.
- `lifetime`: The service lifetime for the generator. Defaults to `ServiceLifetime.Singleton`.

Returns: An `ImageGeneratorBuilder` that can be used to build a pipeline around the inner generator.

Exceptions:

- `ArgumentNullException`: `serviceCollection`, `serviceKey`, or `innerGenerator` is `null`.

The generator is registered as a scoped service.

## ImageGeneratorBuilderServiceCollectionExtensions.AddKeyedImageGenerator(IServiceCollection, Object, IImageGenerator>, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.AI.ImageGeneratorBuilder AddKeyedImageGenerator (this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection, object? serviceKey, Func<IServiceProvider,Microsoft.Extensions.AI.IImageGenerator> innerGeneratorFactory, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton);
```

Registers a keyed singleton `IImageGenerator` in the `IServiceCollection`.

Parameters:

- `serviceCollection`: The `IServiceCollection` to which the generator should be added.
- `serviceKey`: The key with which to associate the generator.
- `innerGeneratorFactory`: A callback that produces the inner `IImageGenerator` that represents the underlying backend.
- `lifetime`: The service lifetime for the generator. Defaults to `ServiceLifetime.Singleton`.

Returns: An `ImageGeneratorBuilder` that can be used to build a pipeline around the inner generator.

Exceptions:

- `ArgumentNullException`: `serviceCollection`, `serviceKey`, or `innerGeneratorFactory` is `null`.

The generator is registered as a scoped service.
