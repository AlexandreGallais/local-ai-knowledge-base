---
title: "HttpClientBuilderExtensions class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/HttpClientBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpClientBuilderExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class HttpClientBuilderExtensions
```

Extension methods for configuring an `IHttpClientBuilder`.

To be added.

## HttpClientBuilderExtensions.AddAsKeyed(IHttpClientBuilder, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddAsKeyed (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Scoped);
```

Registers a named `HttpClient` and the related handler pipeline `HttpMessageHandler` as keyed
services with the client's name as the key, and a lifetime provided in the `lifetime` parameter.
By default, the lifetime is `ServiceLifetime.Scoped`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `lifetime`: Lifetime of the keyed services registered.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

A named client resolved from DI as a keyed service will behave similarly to a client you would create with `IHttpClientFactory.CreateClient`. This
means that the client will continue reusing the same `HttpMessageHandler` instance for the duration of `HttpClientFactoryOptions.HandlerLifetime`,
and it will continue to use the separate, handler's DI scope instead of the scope it was resolved from.

WARNING: Registering the client as a keyed `ServiceLifetime.Transient` service will lead to the `HttpClient` and `HttpMessageHandler`
instances being captured by DI as both implement `IDisposable`. This might lead to memory leaks if the client is resolved multiple times within a
`ServiceLifetime.Singleton` service.

WARNING: In case of (1) a keyed `ServiceLifetime.Singleton``HttpClient` registration, or (2) a keyed `ServiceLifetime.Transient``HttpClient` injected into a `ServiceLifetime.Singleton` service, or (3) long-running application scopes,
the `HttpClient` instances will get captured by a singleton or a long-running scope, so they will NOT be able to participate in the handler rotation,
which can result in the loss of DNS changes. (This is a similar issue to the one with Typed Clients, that are registered as `ServiceLifetime.Transient` services.)

If called twice with for a builder with the same name, the lifetime of the keyed service will be updated to the latest used `ServiceLifetime` value.

If called for a typed client, only the related named client and handler will be registered as keyed. The typed client itself will continue to be registered as
a transient service.

If used in conjunction with `HttpClientFactoryServiceCollectionExtensions.ConfigureHttpClientDefaults`,
the key `KeyedService.AnyKey` is used, so any named `HttpClient` instance will be resolvable as a keyed service (unless explicitly opted-out
from the keyed registration via `HttpClientBuilderExtensions.RemoveAsKeyed`).

## HttpClientBuilderExtensions.AddDefaultLogger(IHttpClientBuilder) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddDefaultLogger (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder);
```

Adds back the default logging for a named `HttpClient`, if it was removed previously by calling `HttpClientBuilderExtensions.RemoveAllLoggers`.

Parameters:

- `builder`: The `IHttpClientBuilder`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

To be added.

## HttpClientBuilderExtensions.AddHttpMessageHandler(IHttpClientBuilder, DelegatingHandler>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddHttpMessageHandler (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Func<IServiceProvider,System.Net.Http.DelegatingHandler> configureHandler);
```

Adds a delegate that will be used to create an additional message handler for a named `HttpClient`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `configureHandler`: A delegate that is used to create a `DelegatingHandler`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

The `configureHandler` delegate should return a new instance of the message handler each time it
is invoked.

The `IServiceProvider` argument provided to `configureHandler` will be
a reference to a scoped service provider that shares the lifetime of the handler being constructed.

## HttpClientBuilderExtensions.AddHttpMessageHandler(IHttpClientBuilder, DelegatingHandler>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddHttpMessageHandler (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Func<System.Net.Http.DelegatingHandler> configureHandler);
```

Adds a delegate that will be used to create an additional message handler for a named `HttpClient`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `configureHandler`: A delegate that is used to create a `DelegatingHandler`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

The `configureHandler` delegate should return a new instance of the message handler each time it
is invoked.

## HttpClientBuilderExtensions.AddHttpMessageHandler<THandler>(IHttpClientBuilder) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddHttpMessageHandler<THandler> (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder) where THandler : System.Net.Http.DelegatingHandler;
```

Adds an additional message handler from the dependency injection container for a named `HttpClient`.

Parameters:

- `THandler`: The type of the `DelegatingHandler`. The handler type must be registered as a transient service.
- `builder`: The `IHttpClientBuilder`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

The `THandler` will be resolved from a scoped service provider that shares
the lifetime of the handler being constructed.

## HttpClientBuilderExtensions.AddLogger(IHttpClientBuilder, IHttpClientLogger>, Boolean) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddLogger (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Func<IServiceProvider,Microsoft.Extensions.Http.Logging.IHttpClientLogger> httpClientLoggerFactory, bool wrapHandlersPipeline = false);
```

Adds a delegate that will be used to create an additional logger for a named `HttpClient`. The custom logger would be invoked
from a dedicated logging DelegatingHandler on every request of the corresponding named `HttpClient`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `httpClientLoggerFactory`: A delegate that is used to create a custom logger. The logger should implement
`IHttpClientLogger` or `IHttpClientAsyncLogger`.
- `wrapHandlersPipeline`: Whether the logging handler with the custom logger would be added to the top
or to the bottom of the additional handlers chains.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

If the `wrapHandlersPipeline` is `true`, `IHttpClientLogger.LogRequestStart` and
`IHttpClientAsyncLogger.LogRequestStartAsync` would be executed before all
other additional handlers in the chain. `IHttpClientLogger.LogRequestStop` and
`IHttpClientAsyncLogger.LogRequestStopAsync` would be executed after all
other additional handlers, essentially wrapping the whole pipeline.

If the `wrapHandlersPipeline` is `false`, `IHttpClientLogger.LogRequestStart` and
`IHttpClientAsyncLogger.LogRequestStartAsync` would be executed after all
other additional handlers in the chain, right before the primary handler. `IHttpClientLogger.LogRequestStop` and
`IHttpClientAsyncLogger.LogRequestStopAsync` would be executed before all
other additional handlers, right after the primary handler.

The `IServiceProvider` argument provided to `httpClientLoggerFactory` will be
a reference to a scoped service provider that shares the lifetime of the handler chain being constructed.

If `HttpClientBuilderExtensions.AddLogger` is called multiple times, multiple loggers would be added. If `HttpClientBuilderExtensions.RemoveAllLoggers` was
not called before calling `HttpClientBuilderExtensions.AddLogger`, then new logger would be added in addition to the default ones.

## HttpClientBuilderExtensions.AddLogger<TLogger>(IHttpClientBuilder, Boolean) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddLogger<TLogger> (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, bool wrapHandlersPipeline = false) where TLogger : Microsoft.Extensions.Http.Logging.IHttpClientLogger;
```

Adds a delegate that will be used to create an additional logger for a named `HttpClient`. The custom logger would be invoked
from a dedicated logging DelegatingHandler on every request of the corresponding named `HttpClient`.

Parameters:

- `TLogger`: The service type of the custom logger as it was registered in DI. The logger should implement `IHttpClientLogger`
or `IHttpClientAsyncLogger`.
- `builder`: The `IHttpClientBuilder`.
- `wrapHandlersPipeline`: Whether the logging handler with the custom logger would be added to the top
or to the bottom of the additional handlers chains.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

If the `wrapHandlersPipeline` is `true`, `IHttpClientLogger.LogRequestStart` and
`IHttpClientAsyncLogger.LogRequestStartAsync` would be executed before all
other additional handlers in the chain. `IHttpClientLogger.LogRequestStop` and
`IHttpClientAsyncLogger.LogRequestStopAsync` would be executed after all
other additional handlers, essentially wrapping the whole pipeline.

If the `wrapHandlersPipeline` is `false`, `IHttpClientLogger.LogRequestStart` and
`IHttpClientAsyncLogger.LogRequestStartAsync` would be executed after all
other additional handlers in the chain, right before the primary handler. `IHttpClientLogger.LogRequestStop` and
`IHttpClientAsyncLogger.LogRequestStopAsync` would be executed before all
other additional handlers, right after the primary handler.

The `TLogger` will be resolved from a scoped service provider that shares
the lifetime of the handler chain being constructed.

If `HttpClientBuilderExtensions.AddLogger<T>` is called multiple times, multiple loggers would be added. If `HttpClientBuilderExtensions.RemoveAllLoggers` was
not called before calling `HttpClientBuilderExtensions.AddLogger<T>`, then new logger would be added in addition to the default ones.

## HttpClientBuilderExtensions.AddTypedClient<TClient>(IHttpClientBuilder) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddTypedClient<TClient> (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder) where TClient : class;
```

Configures a binding between the `TClient` type and the named `HttpClient`
associated with the `IHttpClientBuilder`.

Parameters:

- `TClient`: The type of the typed client. The type specified will be registered in the service collection as
a transient service. See `ITypedHttpClientFactory<T>` for more details about authoring typed clients.
- `builder`: The `IHttpClientBuilder`.

Returns: To be added.

`TClient` instances constructed with the appropriate `HttpClient`
can be retrieved from `IServiceProvider.GetService` (and related methods) by providing
`TClient` as the service type.

Calling `HttpClientBuilderExtensions.AddTypedClient<T>` will register a typed
client binding that creates `TClient` using the `ITypedHttpClientFactory<T>`.

The typed client's service dependencies will be resolved from the same service provider
that is used to resolve the typed client. It is not possible to access services from the
scope bound to the message handler, which is managed independently.

## HttpClientBuilderExtensions.AddTypedClient<TClient>(IHttpClientBuilder, IServiceProvider,TClient>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddTypedClient<TClient> (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Func<System.Net.Http.HttpClient,IServiceProvider,TClient> factory) where TClient : class;
```

Configures a binding between the `TClient` type and the named `HttpClient`
associated with the `IHttpClientBuilder`.

Parameters:

- `TClient`: The type of the typed client. They type specified will be registered in the service collection as
a transient service.
- `builder`: The `IHttpClientBuilder`.
- `factory`: A factory function that will be used to construct the typed client.

Returns: To be added.

`TClient` instances constructed with the appropriate `HttpClient`
can be retrieved from `IServiceProvider.GetService` (and related methods) by providing
`TClient` as the service type.

Calling `HttpClientBuilderExtensions.AddTypedClient<T>`
will register a typed client binding that creates `TClient` using the provided factory function.

## HttpClientBuilderExtensions.AddTypedClient<TClient>(IHttpClientBuilder, HttpClient,TClient>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddTypedClient<TClient> (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Func<System.Net.Http.HttpClient,TClient> factory) where TClient : class;
```

Configures a binding between the `TClient` type and the named `HttpClient`
associated with the `IHttpClientBuilder`.

Parameters:

- `TClient`: The type of the typed client. They type specified will be registered in the service collection as
a transient service.
- `builder`: The `IHttpClientBuilder`.
- `factory`: A factory function that will be used to construct the typed client.

Returns: To be added.

`TClient` instances constructed with the appropriate `HttpClient`
can be retrieved from `IServiceProvider.GetService` (and related methods) by providing
`TClient` as the service type.

Calling `HttpClientBuilderExtensions.AddTypedClient<T>`
will register a typed client binding that creates `TClient` using the provided factory function.
