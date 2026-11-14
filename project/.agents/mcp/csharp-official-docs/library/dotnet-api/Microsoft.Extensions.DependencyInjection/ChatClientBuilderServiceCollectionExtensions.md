---
title: "ChatClientBuilderServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ChatClientBuilderServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ChatClientBuilderServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class ChatClientBuilderServiceCollectionExtensions
```

Provides extension methods for registering `IChatClient` with a `IServiceCollection`.

To be added.

## ChatClientBuilderServiceCollectionExtensions.AddChatClient(IServiceCollection, IChatClient, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.AI.ChatClientBuilder AddChatClient (this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection, Microsoft.Extensions.AI.IChatClient innerClient, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton);
```

Registers a singleton `IChatClient` in the `IServiceCollection`.

Parameters:

- `serviceCollection`: The `IServiceCollection` to which the client should be added.
- `innerClient`: The inner `IChatClient` that represents the underlying backend.
- `lifetime`: The service lifetime for the client. Defaults to `ServiceLifetime.Singleton`.

Returns: A `ChatClientBuilder` that can be used to build a pipeline around the inner client.

Exceptions:

- `ArgumentNullException`: `innerClient` is `null`.

The client is registered as a singleton service.

## ChatClientBuilderServiceCollectionExtensions.AddChatClient(IServiceCollection, IChatClient>, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.AI.ChatClientBuilder AddChatClient (this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection, Func<IServiceProvider,Microsoft.Extensions.AI.IChatClient> innerClientFactory, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton);
```

Registers a singleton `IChatClient` in the `IServiceCollection`.

Parameters:

- `serviceCollection`: The `IServiceCollection` to which the client should be added.
- `innerClientFactory`: A callback that produces the inner `IChatClient` that represents the underlying backend.
- `lifetime`: The service lifetime for the client. Defaults to `ServiceLifetime.Singleton`.

Returns: A `ChatClientBuilder` that can be used to build a pipeline around the inner client.

Exceptions:

- `ArgumentNullException`: `innerClientFactory` is `null`.

The client is registered as a singleton service.

## ChatClientBuilderServiceCollectionExtensions.AddKeyedChatClient(IServiceCollection, Object, IChatClient, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.AI.ChatClientBuilder AddKeyedChatClient (this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection, object? serviceKey, Microsoft.Extensions.AI.IChatClient innerClient, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton);
```

Registers a keyed singleton `IChatClient` in the `IServiceCollection`.

Parameters:

- `serviceCollection`: The `IServiceCollection` to which the client should be added.
- `serviceKey`: The key with which to associate the client.
- `innerClient`: The inner `IChatClient` that represents the underlying backend.
- `lifetime`: The service lifetime for the client. Defaults to `ServiceLifetime.Singleton`.

Returns: A `ChatClientBuilder` that can be used to build a pipeline around the inner client.

Exceptions:

- `ArgumentNullException`: `innerClient` is `null`.

The client is registered as a scoped service.

## ChatClientBuilderServiceCollectionExtensions.AddKeyedChatClient(IServiceCollection, Object, IChatClient>, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.AI.ChatClientBuilder AddKeyedChatClient (this Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection, object? serviceKey, Func<IServiceProvider,Microsoft.Extensions.AI.IChatClient> innerClientFactory, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton);
```

Registers a keyed singleton `IChatClient` in the `IServiceCollection`.

Parameters:

- `serviceCollection`: The `IServiceCollection` to which the client should be added.
- `serviceKey`: The key with which to associate the client.
- `innerClientFactory`: A callback that produces the inner `IChatClient` that represents the underlying backend.
- `lifetime`: The service lifetime for the client. Defaults to `ServiceLifetime.Singleton`.

Returns: A `ChatClientBuilder` that can be used to build a pipeline around the inner client.

Exceptions:

- `ArgumentNullException`: `innerClientFactory` is `null`.

The client is registered as a scoped service.
