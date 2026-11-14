---
title: "HttpClientBuilderExtensions class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/HttpClientBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpClientBuilderExtensions class (part 2 of 2)

## HttpClientBuilderExtensions.AddTypedClient<TClient,TImplementation>(IHttpClientBuilder) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddTypedClient<TClient,TImplementation> (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder) where TClient : class where TImplementation : class, TClient;
```

Configures a binding between the `TClient` type and the named `HttpClient`
associated with the `IHttpClientBuilder`. The created instances will be of type
`TImplementation`.

Parameters:

- `TClient`: The declared type of the typed client. The type specified will be registered in the service collection as
a transient service. See `ITypedHttpClientFactory<T>` for more details about authoring typed clients.
- `TImplementation`: The implementation type of the typed client. The type specified will be instantiated by the
`ITypedHttpClientFactory<T>`.
- `builder`: The `IHttpClientBuilder`.

Returns: To be added.

`TClient` instances constructed with the appropriate `HttpClient`
can be retrieved from `IServiceProvider.GetService` (and related methods) by providing
`TClient` as the service type.

Calling `HttpClientBuilderExtensions.AddTypedClient<T1,T2>`
will register a typed client binding that creates `TImplementation` using the
`ITypedHttpClientFactory<T>`.

The typed client's service dependencies will be resolved from the same service provider
that is used to resolve the typed client. It is not possible to access services from the
scope bound to the message handler, which is managed independently.

## HttpClientBuilderExtensions.ConfigureAdditionalHttpMessageHandlers(IHttpClientBuilder, IServiceProvider>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder ConfigureAdditionalHttpMessageHandlers (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Action<System.Collections.Generic.IList<System.Net.Http.DelegatingHandler>,IServiceProvider> configureAdditionalHandlers);
```

Adds a delegate that will be used to configure additional message handlers using `HttpMessageHandlerBuilder`
for a named `HttpClient`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `configureAdditionalHandlers`: A delegate that is used to configure a collection of `DelegatingHandler`s.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

To be added.

## HttpClientBuilderExtensions.ConfigureHttpClient(IHttpClientBuilder, HttpClient>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder ConfigureHttpClient (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Action<IServiceProvider,System.Net.Http.HttpClient> configureClient);
```

Adds a delegate that will be used to configure a named `HttpClient`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `configureClient`: A delegate that is used to configure an `HttpClient`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

The `IServiceProvider` provided to `configureClient` will be the
same application's root service provider instance.

## HttpClientBuilderExtensions.ConfigureHttpClient(IHttpClientBuilder, HttpClient>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder ConfigureHttpClient (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Action<System.Net.Http.HttpClient> configureClient);
```

Adds a delegate that will be used to configure a named `HttpClient`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `configureClient`: A delegate that is used to configure an `HttpClient`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

To be added.

## HttpClientBuilderExtensions.ConfigureHttpMessageHandlerBuilder(IHttpClientBuilder, HttpMessageHandlerBuilder>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder ConfigureHttpMessageHandlerBuilder (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Action<Microsoft.Extensions.Http.HttpMessageHandlerBuilder> configureBuilder);
```

Adds a delegate that will be used to configure message handlers using `HttpMessageHandlerBuilder`
for a named `HttpClient`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `configureBuilder`: A delegate that is used to configure an `HttpMessageHandlerBuilder`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

To be added.

## HttpClientBuilderExtensions.ConfigurePrimaryHttpMessageHandler(IHttpClientBuilder, IServiceProvider>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder ConfigurePrimaryHttpMessageHandler (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Action<System.Net.Http.HttpMessageHandler,IServiceProvider> configureHandler);
```

Adds a delegate that will be used to configure the primary `HttpMessageHandler` for a
named `HttpClient`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `configureHandler`: A delegate that is used to configure a previously set or default primary `HttpMessageHandler`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

The `IServiceProvider` argument provided to `configureHandler` will be
a reference to a scoped service provider that shares the lifetime of the handler being constructed.

## HttpClientBuilderExtensions.ConfigurePrimaryHttpMessageHandler(IHttpClientBuilder, HttpMessageHandler>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder ConfigurePrimaryHttpMessageHandler (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Func<IServiceProvider,System.Net.Http.HttpMessageHandler> configureHandler);
```

Adds a delegate that will be used to configure the primary `HttpMessageHandler` for a
named `HttpClient`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `configureHandler`: A delegate that is used to create an `HttpMessageHandler`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

The `configureHandler` delegate should return a new instance of the message handler each time it
is invoked.

The `IServiceProvider` argument provided to `configureHandler` will be
a reference to a scoped service provider that shares the lifetime of the handler being constructed.

## HttpClientBuilderExtensions.ConfigurePrimaryHttpMessageHandler(IHttpClientBuilder, HttpMessageHandler>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder ConfigurePrimaryHttpMessageHandler (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Func<System.Net.Http.HttpMessageHandler> configureHandler);
```

Adds a delegate that will be used to configure the primary `HttpMessageHandler` for a
named `HttpClient`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `configureHandler`: A delegate that is used to create an `HttpMessageHandler`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

The `configureHandler` delegate should return a new instance of the message handler each time it
is invoked.

## HttpClientBuilderExtensions.ConfigurePrimaryHttpMessageHandler<THandler>(IHttpClientBuilder) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder ConfigurePrimaryHttpMessageHandler<THandler> (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder) where THandler : System.Net.Http.HttpMessageHandler;
```

Configures the primary `HttpMessageHandler` from the dependency injection container
for a named `HttpClient`.

Parameters:

- `THandler`: The type of the `DelegatingHandler`. The handler type must be registered as a transient service.
- `builder`: The `IHttpClientBuilder`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

The `THandler` will be resolved from a scoped service provider that shares
the lifetime of the handler being constructed.

## HttpClientBuilderExtensions.RedactLoggedHeaders(IHttpClientBuilder, String>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder RedactLoggedHeaders (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, System.Collections.Generic.IEnumerable<string> redactedLoggedHeaderNames);
```

Sets the collection of HTTP headers names for which values should be redacted before logging.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `redactedLoggedHeaderNames`: The collection of HTTP headers names for which values should be redacted before logging.

Returns: The `IHttpClientBuilder`.

To be added.

## HttpClientBuilderExtensions.RedactLoggedHeaders(IHttpClientBuilder, Boolean>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder RedactLoggedHeaders (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Func<string,bool> shouldRedactHeaderValue);
```

Sets the `Func<T1,T2>` which determines whether to redact the HTTP header value given its corresponding header name before logging.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `shouldRedactHeaderValue`: The `Func<T1,T2>` which determines whether to redact the HTTP header value given its corresponding header name before logging.

Returns: The `IHttpClientBuilder`.

The provided `shouldRedactHeaderValue` predicate will be evaluated for each header name when logging. If the predicate returns `true` then the header value will be replaced with a marker value `*` in logs; otherwise the header value will be logged.

## HttpClientBuilderExtensions.RemoveAllLoggers(IHttpClientBuilder) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder RemoveAllLoggers (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder);
```

Removes all previously added loggers for a named `HttpClient`, including default ones.

Parameters:

- `builder`: The `IHttpClientBuilder`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

To be added.

## HttpClientBuilderExtensions.RemoveAsKeyed(IHttpClientBuilder) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder RemoveAsKeyed (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder);
```

Removes the keyed registrations for the named `HttpClient` and `HttpMessageHandler`.

Parameters:

- `builder`: The `IHttpClientBuilder`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

If used in conjunction with `HttpClientFactoryServiceCollectionExtensions.ConfigureHttpClientDefaults`,
it will only affect the previous "global" `KeyedService.AnyKey` registration, and won't affect the clients registered for a specific name
with `HttpClientBuilderExtensions.AddAsKeyed`.

## HttpClientBuilderExtensions.SetHandlerLifetime(IHttpClientBuilder, TimeSpan) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder SetHandlerLifetime (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, TimeSpan handlerLifetime);
```

Sets the length of time that a `HttpMessageHandler` instance can be reused. Each named
client can have its own configured handler lifetime value. The default value is two minutes. Set the lifetime to
`Timeout.InfiniteTimeSpan` to disable handler expiry.

Returns: To be added.

The default implementation of `IHttpClientFactory` will pool the `HttpMessageHandler`
instances created by the factory to reduce resource consumption. This setting configures the amount of time
a handler can be pooled before it is scheduled for removal from the pool and disposal.

Pooling of handlers is desirable as each handler typically manages its own underlying HTTP connections; creating
more handlers than necessary can result in connection delays. Some handlers also keep connections open indefinitely
which can prevent the handler from reacting to DNS changes. The value of `handlerLifetime` should be
chosen with an understanding of the application's requirement to respond to changes in the network environment.

Expiry of a handler will not immediately dispose the handler. An expired handler is placed in a separate pool
which is processed at intervals to dispose handlers only when they become unreachable. Using long-lived
`HttpClient` instances will prevent the underlying `HttpMessageHandler` from being
disposed until all references are garbage-collected.

## HttpClientBuilderExtensions.UseSocketsHttpHandler(IHttpClientBuilder, ISocketsHttpHandlerBuilder>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder UseSocketsHttpHandler (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Action<Microsoft.Extensions.DependencyInjection.ISocketsHttpHandlerBuilder> configureBuilder);
```

Adds or updates `SocketsHttpHandler` as a primary handler for a named `HttpClient`
and configures it using `ISocketsHttpHandlerBuilder`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `configureBuilder`: Delegate that is used to set up the configuration of the primary `SocketsHttpHandler`
on `ISocketsHttpHandlerBuilder` that will later be applied on the primary handler during its creation.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

If a primary handler was already set to be `SocketsHttpHandler` by previously calling, for example,
`HttpClientBuilderExtensions.ConfigurePrimaryHttpMessageHandler` or
`HttpClientBuilderExtensions.UseSocketsHttpHandler`, then the configuration set on
`ISocketsHttpHandlerBuilder` will be applied to the existing instance. Otherwise, a new instance of
`SocketsHttpHandler` will be created.

## HttpClientBuilderExtensions.UseSocketsHttpHandler(IHttpClientBuilder, IServiceProvider>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder UseSocketsHttpHandler (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Action<System.Net.Http.SocketsHttpHandler,IServiceProvider>? configureHandler = default);
```

Adds or updates `SocketsHttpHandler` as a primary handler for a named `HttpClient`. If provided,
also adds a delegate that will be used to configure the primary `SocketsHttpHandler`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `configureHandler`: Optional delegate that is used to configure the primary `SocketsHttpHandler`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

If a primary handler was already set to be `SocketsHttpHandler` by previously calling, for example,
`HttpClientBuilderExtensions.ConfigurePrimaryHttpMessageHandler` or
`HttpClientBuilderExtensions.UseSocketsHttpHandler`, then the passed `configureHandler`
delegate will be applied to the existing instance. Otherwise, a new instance of `SocketsHttpHandler` will be created.
