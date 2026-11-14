---
title: "SpeechToTextClientBuilderServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/SpeechToTextClientBuilderServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SpeechToTextClientBuilderServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class SpeechToTextClientBuilderServiceCollectionExtensions
```

Provides extension methods for registering `ISpeechToTextClient` with a `IServiceCollection`.

To be added.

## SpeechToTextClientBuilderServiceCollectionExtensions.AddKeyedSpeechToTextClient(IServiceCollection, Object, ISpeechToTextClient, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.AI.SpeechToTextClientBuilder AddKeyedSpeechToTextClient (this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection, object? serviceKey, Microsoft.Extensions.AI.ISpeechToTextClient innerClient, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton);
```

Registers a keyed singleton `ISpeechToTextClient` in the `IServiceCollection`.

Parameters:

- `serviceCollection`: The `IServiceCollection` to which the client should be added.
- `serviceKey`: The key with which to associate the client.
- `innerClient`: The inner `ISpeechToTextClient` that represents the underlying backend.
- `lifetime`: The service lifetime for the client. Defaults to `ServiceLifetime.Singleton`.

Returns: A `SpeechToTextClientBuilder` that can be used to build a pipeline around the inner client.

The client is registered as a scoped service.

## SpeechToTextClientBuilderServiceCollectionExtensions.AddKeyedSpeechToTextClient(IServiceCollection, Object, ISpeechToTextClient>, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.AI.SpeechToTextClientBuilder AddKeyedSpeechToTextClient (this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection, object? serviceKey, Func<IServiceProvider,Microsoft.Extensions.AI.ISpeechToTextClient> innerClientFactory, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton);
```

Registers a keyed singleton `ISpeechToTextClient` in the `IServiceCollection`.

Parameters:

- `serviceCollection`: The `IServiceCollection` to which the client should be added.
- `serviceKey`: The key with which to associate the client.
- `innerClientFactory`: A callback that produces the inner `ISpeechToTextClient` that represents the underlying backend.
- `lifetime`: The service lifetime for the client. Defaults to `ServiceLifetime.Singleton`.

Returns: A `SpeechToTextClientBuilder` that can be used to build a pipeline around the inner client.

The client is registered as a scoped service.

## SpeechToTextClientBuilderServiceCollectionExtensions.AddSpeechToTextClient(IServiceCollection, ISpeechToTextClient, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.AI.SpeechToTextClientBuilder AddSpeechToTextClient (this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection, Microsoft.Extensions.AI.ISpeechToTextClient innerClient, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton);
```

Registers a singleton `ISpeechToTextClient` in the `IServiceCollection`.

Parameters:

- `serviceCollection`: The `IServiceCollection` to which the client should be added.
- `innerClient`: The inner `ISpeechToTextClient` that represents the underlying backend.
- `lifetime`: The service lifetime for the client. Defaults to `ServiceLifetime.Singleton`.

Returns: A `SpeechToTextClientBuilder` that can be used to build a pipeline around the inner client.

The client is registered as a singleton service.

## SpeechToTextClientBuilderServiceCollectionExtensions.AddSpeechToTextClient(IServiceCollection, ISpeechToTextClient>, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.AI.SpeechToTextClientBuilder AddSpeechToTextClient (this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection, Func<IServiceProvider,Microsoft.Extensions.AI.ISpeechToTextClient> innerClientFactory, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton);
```

Registers a singleton `ISpeechToTextClient` in the `IServiceCollection`.

Parameters:

- `serviceCollection`: The `IServiceCollection` to which the client should be added.
- `innerClientFactory`: A callback that produces the inner `ISpeechToTextClient` that represents the underlying backend.
- `lifetime`: The service lifetime for the client. Defaults to `ServiceLifetime.Singleton`.

Returns: A `SpeechToTextClientBuilder` that can be used to build a pipeline around the inner client.

The client is registered as a singleton service.
