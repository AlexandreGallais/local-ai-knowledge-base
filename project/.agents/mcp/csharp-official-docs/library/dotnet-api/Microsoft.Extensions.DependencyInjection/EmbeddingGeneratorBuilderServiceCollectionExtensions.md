---
title: "EmbeddingGeneratorBuilderServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/EmbeddingGeneratorBuilderServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EmbeddingGeneratorBuilderServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class EmbeddingGeneratorBuilderServiceCollectionExtensions
```

Provides extension methods for registering `IEmbeddingGenerator<T1,T2>` with a `IServiceCollection`.

To be added.

## EmbeddingGeneratorBuilderServiceCollectionExtensions.AddEmbeddingGenerator<TInput,TEmbedding>(IServiceCollection, IEmbeddingGenerator<TInput,TEmbedding>, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.AI.EmbeddingGeneratorBuilder<TInput,TEmbedding> AddEmbeddingGenerator<TInput,TEmbedding> (this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection, Microsoft.Extensions.AI.IEmbeddingGenerator<TInput,TEmbedding> innerGenerator, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton) where TEmbedding : Microsoft.Extensions.AI.Embedding;
```

Registers a singleton embedding generator in the `IServiceCollection`.

Parameters:

- `TInput`: The type from which embeddings will be generated.
- `TEmbedding`: The type of embeddings to generate.
- `serviceCollection`: The `IServiceCollection` to which the generator should be added.
- `innerGenerator`: The inner `IEmbeddingGenerator<T1,T2>` that represents the underlying backend.
- `lifetime`: The service lifetime for the client. Defaults to `ServiceLifetime.Singleton`.

Returns: An `EmbeddingGeneratorBuilder<T1,T2>` that can be used to build a pipeline around the inner generator.

Exceptions:

- `ArgumentNullException`: `innerGenerator` is `null`.

The generator is registered as a singleton service.

## EmbeddingGeneratorBuilderServiceCollectionExtensions.AddEmbeddingGenerator<TInput,TEmbedding>(IServiceCollection, IEmbeddingGenerator<TInput,TEmbedding>>, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.AI.EmbeddingGeneratorBuilder<TInput,TEmbedding> AddEmbeddingGenerator<TInput,TEmbedding> (this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection, Func<IServiceProvider,Microsoft.Extensions.AI.IEmbeddingGenerator<TInput,TEmbedding>> innerGeneratorFactory, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton) where TEmbedding : Microsoft.Extensions.AI.Embedding;
```

Registers a singleton embedding generator in the `IServiceCollection`.

Parameters:

- `TInput`: The type from which embeddings will be generated.
- `TEmbedding`: The type of embeddings to generate.
- `serviceCollection`: The `IServiceCollection` to which the generator should be added.
- `innerGeneratorFactory`: A callback that produces the inner `IEmbeddingGenerator<T1,T2>` that represents the underlying backend.
- `lifetime`: The service lifetime for the client. Defaults to `ServiceLifetime.Singleton`.

Returns: An `EmbeddingGeneratorBuilder<T1,T2>` that can be used to build a pipeline around the inner generator.

Exceptions:

- `ArgumentNullException`: `innerGeneratorFactory` is `null`.

The generator is registered as a singleton service.

## EmbeddingGeneratorBuilderServiceCollectionExtensions.AddKeyedEmbeddingGenerator<TInput,TEmbedding>(IServiceCollection, Object, IEmbeddingGenerator<TInput,TEmbedding>, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.AI.EmbeddingGeneratorBuilder<TInput,TEmbedding> AddKeyedEmbeddingGenerator<TInput,TEmbedding> (this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection, object? serviceKey, Microsoft.Extensions.AI.IEmbeddingGenerator<TInput,TEmbedding> innerGenerator, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton) where TEmbedding : Microsoft.Extensions.AI.Embedding;
```

Registers a keyed singleton embedding generator in the `IServiceCollection`.

Parameters:

- `TInput`: The type from which embeddings will be generated.
- `TEmbedding`: The type of embeddings to generate.
- `serviceCollection`: The `IServiceCollection` to which the generator should be added.
- `serviceKey`: The key with which to associated the generator.
- `innerGenerator`: The inner `IEmbeddingGenerator<T1,T2>` that represents the underlying backend.
- `lifetime`: The service lifetime for the client. Defaults to `ServiceLifetime.Singleton`.

Returns: An `EmbeddingGeneratorBuilder<T1,T2>` that can be used to build a pipeline around the inner generator.

Exceptions:

- `ArgumentNullException`: `innerGenerator` is `null`.

The generator is registered as a singleton service.

## EmbeddingGeneratorBuilderServiceCollectionExtensions.AddKeyedEmbeddingGenerator<TInput,TEmbedding>(IServiceCollection, Object, IEmbeddingGenerator<TInput,TEmbedding>>, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.AI.EmbeddingGeneratorBuilder<TInput,TEmbedding> AddKeyedEmbeddingGenerator<TInput,TEmbedding> (this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection, object? serviceKey, Func<IServiceProvider,Microsoft.Extensions.AI.IEmbeddingGenerator<TInput,TEmbedding>> innerGeneratorFactory, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton) where TEmbedding : Microsoft.Extensions.AI.Embedding;
```

Registers a keyed singleton embedding generator in the `IServiceCollection`.

Parameters:

- `TInput`: The type from which embeddings will be generated.
- `TEmbedding`: The type of embeddings to generate.
- `serviceCollection`: The `IServiceCollection` to which the generator should be added.
- `serviceKey`: The key with which to associated the generator.
- `innerGeneratorFactory`: A callback that produces the inner `IEmbeddingGenerator<T1,T2>` that represents the underlying backend.
- `lifetime`: The service lifetime for the client. Defaults to `ServiceLifetime.Singleton`.

Returns: An `EmbeddingGeneratorBuilder<T1,T2>` that can be used to build a pipeline around the inner generator.

Exceptions:

- `ArgumentNullException`: `innerGeneratorFactory` is `null`.

The generator is registered as a singleton service.
