---
title: "HttpClientFactoryOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http/HttpClientFactoryOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpClientFactoryOptions class

Namespace: `Microsoft.Extensions.Http`

```csharp
public class HttpClientFactoryOptions
```

Provides options for configuring the default `IHttpClientFactory`.

To be added.

## HttpClientFactoryOptions.HttpClientFactoryOptions() constructor

```csharp
public HttpClientFactoryOptions ();
```

Initializes a new instance of the `HttpClientFactoryOptions` class.

To be added.

## HttpClientFactoryOptions.HandlerLifetime property

```csharp
public TimeSpan HandlerLifetime { get; set; }
```

Gets or sets the length of time that a `HttpMessageHandler` instance can be reused. Each named
client can have its own configured handler lifetime value. The default value of this property is two minutes.
Set the lifetime to `Timeout.InfiniteTimeSpan` to disable handler expiry.

Returns: To be added.

The default implementation of `IHttpClientFactory` will pool the `HttpMessageHandler`
instances created by the factory to reduce resource consumption. This setting configures the amount of time
a handler can be pooled before it is scheduled for removal from the pool and disposal.

Pooling of handlers is desirable as each handler typically manages its own underlying HTTP connections; creating
more handlers than necessary can result in connection delays. Some handlers also keep connections open indefinitely
which can prevent the handler from reacting to DNS changes. The value of `HttpClientFactoryOptions.HandlerLifetime` should be
chosen with an understanding of the application's requirement to respond to changes in the network environment.

Expiry of a handler will not immediately dispose the handler. An expired handler is placed in a separate pool
which is processed at intervals to dispose handlers only when they become unreachable. Using long-lived
`HttpClient` instances will prevent the underlying `HttpMessageHandler` from being
disposed until all references are garbage-collected.

## HttpClientFactoryOptions.HttpClientActions property

```csharp
public System.Collections.Generic.IList<Action<System.Net.Http.HttpClient>> HttpClientActions { get; }
```

Gets a list of operations used to configure an `HttpClient`.

Returns: To be added.

To be added.

## HttpClientFactoryOptions.HttpMessageHandlerBuilderActions property

```csharp
public System.Collections.Generic.IList<Action<Microsoft.Extensions.Http.HttpMessageHandlerBuilder>> HttpMessageHandlerBuilderActions { get; }
```

Gets a list of operations used to configure an `HttpMessageHandlerBuilder`.

Returns: To be added.

To be added.

## HttpClientFactoryOptions.ShouldRedactHeaderValue property

```csharp
public Func<string,bool> ShouldRedactHeaderValue { get; set; }
```

Gets or sets the `Func<T1,T2>` that determines whether to redact the HTTP header value before logging.

Returns: A delegate that takes a string that represents an HTTP header value and returns a boolean that indicates whether the value should be redacted or not.

To be added.

## HttpClientFactoryOptions.SuppressHandlerScope property

```csharp
public bool SuppressHandlerScope { get; set; }
```

Gets or sets a value that determines whether the `IHttpClientFactory` will
create a dependency injection scope when building an `HttpMessageHandler`.
If `false` (default), a scope will be created, otherwise a scope will not be created.

This option is provided for compatibility with existing applications. It is recommended
to use the default setting for new applications.

Returns: To be added.

The `IHttpClientFactory` will (by default) create a dependency injection scope
each time it creates an `HttpMessageHandler`. The created scope has the same
lifetime as the message handler, and will be disposed when the message handler is disposed.

When operations that are part of `HttpClientFactoryOptions.HttpMessageHandlerBuilderActions` are executed
they will be provided with the scoped `IServiceProvider` via
`HttpMessageHandlerBuilder.Services`. This includes retrieving a message handler
from dependency injection, such as one registered using
`HttpClientBuilderExtensions.AddHttpMessageHandler<T>`.
