---
title: "TextToSpeechClientBuilderServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/TextToSpeechClientBuilderServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TextToSpeechClientBuilderServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class TextToSpeechClientBuilderServiceCollectionExtensions
```

Provides extension methods for registering `ITextToSpeechClient` with a `IServiceCollection`.

To be added.

## TextToSpeechClientBuilderServiceCollectionExtensions.AddKeyedTextToSpeechClient(IServiceCollection, Object, ITextToSpeechClient, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.AI.TextToSpeechClientBuilder AddKeyedTextToSpeechClient (this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection, object? serviceKey, Microsoft.Extensions.AI.ITextToSpeechClient innerClient, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton);
```

Registers a keyed singleton `ITextToSpeechClient` in the `IServiceCollection`.

Parameters:

- `serviceCollection`: The `IServiceCollection` to which the client should be added.
- `serviceKey`: The key with which to associate the client.
- `innerClient`: The inner `ITextToSpeechClient` that represents the underlying backend.
- `lifetime`: The service lifetime for the client. Defaults to `ServiceLifetime.Singleton`.

Returns: A `TextToSpeechClientBuilder` that can be used to build a pipeline around the inner client.

The client is registered as a singleton service by default.

## TextToSpeechClientBuilderServiceCollectionExtensions.AddKeyedTextToSpeechClient(IServiceCollection, Object, ITextToSpeechClient>, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.AI.TextToSpeechClientBuilder AddKeyedTextToSpeechClient (this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection, object? serviceKey, Func<IServiceProvider,Microsoft.Extensions.AI.ITextToSpeechClient> innerClientFactory, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton);
```

Registers a keyed singleton `ITextToSpeechClient` in the `IServiceCollection`.

Parameters:

- `serviceCollection`: The `IServiceCollection` to which the client should be added.
- `serviceKey`: The key with which to associate the client.
- `innerClientFactory`: A callback that produces the inner `ITextToSpeechClient` that represents the underlying backend.
- `lifetime`: The service lifetime for the client. Defaults to `ServiceLifetime.Singleton`.

Returns: A `TextToSpeechClientBuilder` that can be used to build a pipeline around the inner client.

The client is registered as a singleton service by default.

## TextToSpeechClientBuilderServiceCollectionExtensions.AddTextToSpeechClient(IServiceCollection, ITextToSpeechClient, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.AI.TextToSpeechClientBuilder AddTextToSpeechClient (this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection, Microsoft.Extensions.AI.ITextToSpeechClient innerClient, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton);
```

Registers a singleton `ITextToSpeechClient` in the `IServiceCollection`.

Parameters:

- `serviceCollection`: The `IServiceCollection` to which the client should be added.
- `innerClient`: The inner `ITextToSpeechClient` that represents the underlying backend.
- `lifetime`: The service lifetime for the client. Defaults to `ServiceLifetime.Singleton`.

Returns: A `TextToSpeechClientBuilder` that can be used to build a pipeline around the inner client.

The client is registered as a singleton service.

## TextToSpeechClientBuilderServiceCollectionExtensions.AddTextToSpeechClient(IServiceCollection, ITextToSpeechClient>, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.AI.TextToSpeechClientBuilder AddTextToSpeechClient (this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection, Func<IServiceProvider,Microsoft.Extensions.AI.ITextToSpeechClient> innerClientFactory, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton);
```

Registers a singleton `ITextToSpeechClient` in the `IServiceCollection`.

Parameters:

- `serviceCollection`: The `IServiceCollection` to which the client should be added.
- `innerClientFactory`: A callback that produces the inner `ITextToSpeechClient` that represents the underlying backend.
- `lifetime`: The service lifetime for the client. Defaults to `ServiceLifetime.Singleton`.

Returns: A `TextToSpeechClientBuilder` that can be used to build a pipeline around the inner client.

The client is registered as a singleton service.
