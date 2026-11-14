---
title: "IHttpClientFactory interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/IHttpClientFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IHttpClientFactory interface

Namespace: `System.Net.Http`

```csharp
public interface IHttpClientFactory
```

A factory abstraction for a component that can create `HttpClient` instances with custom
configuration for a given logical name.

A default `IHttpClientFactory` can be registered in an `IServiceCollection`
by calling `HttpClientFactoryServiceCollectionExtensions.AddHttpClient`.
The default `IHttpClientFactory` will be registered in the service collection as a singleton.

## IHttpClientFactory.CreateClient(String) method

```csharp
public System.Net.Http.HttpClient CreateClient (string name);
```

Creates and configures an `HttpClient` instance using the configuration that corresponds
to the logical name specified by `name`.

Parameters:

- `name`: The logical name of the client to create.

Returns: A new `HttpClient` instance.

Each call to `IHttpClientFactory.CreateClient` is guaranteed to return a new `HttpClient`
instance. It is generally not necessary to dispose of the `HttpClient` as the
`IHttpClientFactory` tracks and disposes resources used by the `HttpClient`.

Callers are also free to mutate the returned `HttpClient` instance's public properties
as desired.
