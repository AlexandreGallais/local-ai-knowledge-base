---
title: "HttpMessageHandlerBuilder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http/HttpMessageHandlerBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpMessageHandlerBuilder class

Namespace: `Microsoft.Extensions.Http`

```csharp
public abstract class HttpMessageHandlerBuilder
```

A builder abstraction for configuring `HttpMessageHandler` instances.

The `HttpMessageHandlerBuilder` is registered in the service collection as
a transient service. Callers should retrieve a new instance for each `HttpMessageHandler` to
be created. Implementors should expect each instance to be used a single time.

## HttpMessageHandlerBuilder.HttpMessageHandlerBuilder() constructor

```csharp
protected HttpMessageHandlerBuilder ();
```

Initializes a new instance of the `HttpMessageHandlerBuilder` class.

To be added.

## HttpMessageHandlerBuilder.AdditionalHandlers property

```csharp
public abstract System.Collections.Generic.IList<System.Net.Http.DelegatingHandler> AdditionalHandlers { get; }
```

Gets a list of additional `DelegatingHandler` instances used to configure an
`HttpClient` pipeline.

Returns: To be added.

To be added.

## HttpMessageHandlerBuilder.Name property

```csharp
public abstract string? Name { get; set; }
```

Gets or sets the name of the `HttpClient` being created.

Returns: To be added.

The `HttpMessageHandlerBuilder.Name` is set by the `IHttpClientFactory` infrastructure
and is public for unit testing purposes only. Setting the `HttpMessageHandlerBuilder.Name` outside of
testing scenarios may have unpredictable results.

## HttpMessageHandlerBuilder.PrimaryHandler property

```csharp
public abstract System.Net.Http.HttpMessageHandler PrimaryHandler { get; set; }
```

Gets or sets the primary `HttpMessageHandler`.

Returns: To be added.

To be added.

## HttpMessageHandlerBuilder.Services property

```csharp
public virtual IServiceProvider Services { get; }
```

Gets an `IServiceProvider` which can be used to resolve services
from the dependency injection container.

Returns: To be added.

This property is sensitive to the value of
`HttpClientFactoryOptions.SuppressHandlerScope`. If `true` this
property will be a reference to the application's root service provider. If `false`
(default) this will be a reference to a scoped service provider that has the same
lifetime as the handler being created.

## HttpMessageHandlerBuilder.Build() method

```csharp
public abstract System.Net.Http.HttpMessageHandler Build ();
```

Creates an `HttpMessageHandler`.

Returns: An `HttpMessageHandler` built from the `HttpMessageHandlerBuilder.PrimaryHandler` and
`HttpMessageHandlerBuilder.AdditionalHandlers`.

To be added.

## HttpMessageHandlerBuilder.CreateHandlerPipeline(HttpMessageHandler, DelegatingHandler>) method

```csharp
protected internal static System.Net.Http.HttpMessageHandler CreateHandlerPipeline (System.Net.Http.HttpMessageHandler primaryHandler, System.Collections.Generic.IEnumerable<System.Net.Http.DelegatingHandler> additionalHandlers);
```

Constructs an instance of `HttpMessageHandler` by chaining `additionalHandlers` one after another with `primaryHandler` in the
end of the chain. The resulting pipeline is used by `IHttpClientFactory` infrastructure to create `HttpClient` instances with customized message
handlers. The resulting pipeline can also be accessed by using `IHttpMessageHandlerFactory` instead of `IHttpClientFactory`.

Parameters:

- `primaryHandler`: An instance of `HttpMessageHandler` to operate at the bottom of the handler chain and actually handle the HTTP transport operations.
- `additionalHandlers`: An ordered list of `DelegatingHandler` instances to be invoked as part
of sending an `HttpRequestMessage` and receiving an `HttpResponseMessage`.
The handlers are invoked in a top-down fashion. That is, the first entry is invoked first for
an outbound request message but last for an inbound response message.

Returns: The HTTP message handler chain.

Exceptions:

- `ArgumentNullException`: `primaryHandler` or `additionalHandlers` is `null`.
- `InvalidOperationException`: `additionalHandlers` contains a `null` entry.
-or-
The `DelegatingHandler.InnerHandler` property must be `null`. `DelegatingHandler` instances provided to `HttpMessageHandlerBuilder` must not be reused or cached.

To be added.
