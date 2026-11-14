---
title: "IHttpMessageHandlerFactory interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/IHttpMessageHandlerFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IHttpMessageHandlerFactory interface

Namespace: `System.Net.Http`

```csharp
public interface IHttpMessageHandlerFactory
```

A factory abstraction for a component that can create `HttpMessageHandler` instances with custom
configuration for a given logical name.

A default `IHttpMessageHandlerFactory` can be registered in an `IServiceCollection`
by calling `HttpClientFactoryServiceCollectionExtensions.AddHttpClient`.
The default `IHttpMessageHandlerFactory` will be registered in the service collection as a singleton.

## IHttpMessageHandlerFactory.CreateHandler(String) method

```csharp
public System.Net.Http.HttpMessageHandler CreateHandler (string name);
```

Creates and configures an `HttpMessageHandler` instance using the configuration that corresponds
to the logical name specified by `name`.

Parameters:

- `name`: The logical name of the message handler to create.

Returns: A new `HttpMessageHandler` instance.

The default `IHttpMessageHandlerFactory` implementation may cache the underlying
`HttpMessageHandler` instances to improve performance.

The default `IHttpMessageHandlerFactory` implementation also manages the lifetime of the
handler created, so disposing of the `HttpMessageHandler` returned by this method may
have no effect.
