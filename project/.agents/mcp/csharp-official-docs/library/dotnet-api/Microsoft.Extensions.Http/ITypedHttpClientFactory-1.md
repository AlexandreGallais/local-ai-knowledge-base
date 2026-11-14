---
title: "ITypedHttpClientFactory<TClient> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http/ITypedHttpClientFactory`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ITypedHttpClientFactory<TClient> interface

Namespace: `Microsoft.Extensions.Http`

```csharp
public interface ITypedHttpClientFactory<TClient>
```

A factory abstraction for a component that can create typed client instances with custom
configuration for a given logical name.

Parameters:

- `TClient`: The type of typed client to create.

The `ITypedHttpClientFactory<T>` is infrastructure that supports the
`HttpClientFactoryServiceCollectionExtensions.AddHttpClient<T>` and
`HttpClientBuilderExtensions.AddTypedClient<T>` functionality. This type
should rarely be used directly in application code, use `IServiceProvider.GetService` instead
to retrieve typed clients.

A default `ITypedHttpClientFactory<T>` can be registered in an `IServiceCollection`
by calling `HttpClientFactoryServiceCollectionExtensions.AddHttpClient`.
The default `ITypedHttpClientFactory<T>` will be registered in the service collection as a singleton
open-generic service.

The default `ITypedHttpClientFactory<T>` uses type activation to create typed client instances. Typed
client types are not retrieved directly from the `IServiceProvider`. See
`ActivatorUtilities.CreateInstance` for details.

This sample shows the basic <example-value> for defining a typed client class.

```csharp

             class ExampleClient
             {
                 private readonly HttpClient _httpClient;
                 private readonly ILogger _logger;
            
                 // typed clients can use constructor injection to access additional services
                 public ExampleClient(HttpClient httpClient, ILogger<ExampleClient> logger)
                 {
                     _httpClient = httpClient;
                     _logger = logger;
                 }
            
                 // typed clients can expose the HttpClient for application code to call directly
                 public HttpClient HttpClient => _httpClient;
            
                 // typed clients can also define methods that abstract usage of the HttpClient
                 public async Task SendHelloRequest()
                 {
                     var response = await _httpClient.GetAsync("/helloworld");
                     response.EnsureSuccessStatusCode();
                 }
             }
             
```

## ITypedHttpClientFactory<TClient>.CreateClient(HttpClient) method

```csharp
public TClient CreateClient (System.Net.Http.HttpClient httpClient);
```

Creates a typed client given an associated `HttpClient`.

Parameters:

- `httpClient`: An `HttpClient` created by the `IHttpClientFactory` for the named client
associated with `TClient`.

Returns: An instance of `TClient`.

To be added.
