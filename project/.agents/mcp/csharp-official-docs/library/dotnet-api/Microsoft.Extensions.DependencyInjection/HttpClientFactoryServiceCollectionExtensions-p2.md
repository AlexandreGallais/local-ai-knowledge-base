---
title: "HttpClientFactoryServiceCollectionExtensions class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/HttpClientFactoryServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpClientFactoryServiceCollectionExtensions class (part 2 of 2)

## HttpClientFactoryServiceCollectionExtensions.AddHttpClient<TClient,TImplementation>(IServiceCollection, HttpClient>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddHttpClient<TClient,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<System.Net.Http.HttpClient> configureClient) where TClient : class where TImplementation : class, TClient;
```

Adds the `IHttpClientFactory` and related services to the `IServiceCollection` and configures
a binding between the `TClient` type and a named `HttpClient`. The client name will
be set to the type name of `TClient`.

Parameters:

- `TClient`: The type of the typed client. The type specified will be registered in the service collection as
a transient service. See `ITypedHttpClientFactory<T>` for more details about authoring typed clients.
- `TImplementation`: The implementation type of the typed client. The type specified will be instantiated by the
`ITypedHttpClientFactory<T>`.
- `services`: The `IServiceCollection`.
- `configureClient`: A delegate that is used to configure an `HttpClient`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

`HttpClient` instances that apply the provided configuration can be retrieved using
`IHttpClientFactory.CreateClient` and providing the matching name.

`TClient` instances constructed with the appropriate `HttpClient`
can be retrieved from `IServiceProvider.GetService` (and related methods) by providing
`TClient` as the service type.

## HttpClientFactoryServiceCollectionExtensions.AddHttpClient<TClient,TImplementation>(IServiceCollection, IServiceProvider,TImplementation>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddHttpClient<TClient,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Func<System.Net.Http.HttpClient,IServiceProvider,TImplementation> factory) where TClient : class where TImplementation : class, TClient;
```

Adds the `IHttpClientFactory` and related services to the `IServiceCollection` and configures
a binding between the `TClient` type and a named `HttpClient`.

Parameters:

- `TClient`: The type of the typed client. The type specified will be registered in the service collection as
a transient service. See `ITypedHttpClientFactory<T>` for more details about authoring typed clients.
- `TImplementation`: The implementation type of the typed client.
- `services`: The `IServiceCollection`.
- `factory`: A delegate that is used to create an instance of `TClient`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

`HttpClient` instances that apply the provided configuration can be retrieved using
`IHttpClientFactory.CreateClient` and providing the matching name.

`TClient` instances constructed with the appropriate `HttpClient`
can be retrieved from `IServiceProvider.GetService` (and related methods) by providing
`TClient` as the service type.

## HttpClientFactoryServiceCollectionExtensions.AddHttpClient<TClient,TImplementation>(IServiceCollection, HttpClient,TImplementation>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddHttpClient<TClient,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Func<System.Net.Http.HttpClient,TImplementation> factory) where TClient : class where TImplementation : class, TClient;
```

Adds the `IHttpClientFactory` and related services to the `IServiceCollection` and configures
a binding between the `TClient` type and a named `HttpClient`.

Parameters:

- `TClient`: The type of the typed client. The type specified will be registered in the service collection as
a transient service. See `ITypedHttpClientFactory<T>` for more details about authoring typed clients.
- `TImplementation`: The implementation type of the typed client.
- `services`: The `IServiceCollection`.
- `factory`: A delegate that is used to create an instance of `TClient`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

`HttpClient` instances that apply the provided configuration can be retrieved using
`IHttpClientFactory.CreateClient` and providing the matching name.

`TClient` instances constructed with the appropriate `HttpClient`
can be retrieved from `IServiceProvider.GetService` (and related methods) by providing
`TClient` as the service type.

## HttpClientFactoryServiceCollectionExtensions.AddHttpClient<TClient,TImplementation>(IServiceCollection, String) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddHttpClient<TClient,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, string name) where TClient : class where TImplementation : class, TClient;
```

Adds the `IHttpClientFactory` and related services to the `IServiceCollection` and configures
a binding between the `TClient` type and a named `HttpClient`.

Parameters:

- `TClient`: The type of the typed client. The type specified will be registered in the service collection as
a transient service. See `ITypedHttpClientFactory<T>` for more details about authoring typed clients.
- `TImplementation`: The implementation type of the typed client. The type specified will be instantiated by the
`ITypedHttpClientFactory<T>`.
- `services`: The `IServiceCollection`.
- `name`: The logical name of the `HttpClient` to configure.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

`HttpClient` instances that apply the provided configuration can be retrieved using
`IHttpClientFactory.CreateClient` and providing the matching name.

`TClient` instances constructed with the appropriate `HttpClient`
can be retrieved from `IServiceProvider.GetService` (and related methods) by providing
`TClient` as the service type.

Use `Options.DefaultName` as the name to configure the default client.

## HttpClientFactoryServiceCollectionExtensions.AddHttpClient<TClient,TImplementation>(IServiceCollection, String, HttpClient>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddHttpClient<TClient,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, string name, Action<IServiceProvider,System.Net.Http.HttpClient> configureClient) where TClient : class where TImplementation : class, TClient;
```

Adds the `IHttpClientFactory` and related services to the `IServiceCollection` and configures
a binding between the `TClient` type and a named `HttpClient`.

Parameters:

- `TClient`: The type of the typed client. The type specified will be registered in the service collection as
a transient service. See `ITypedHttpClientFactory<T>` for more details about authoring typed clients.
- `TImplementation`: The implementation type of the typed client. The type specified will be instantiated by the
`ITypedHttpClientFactory<T>`.
- `services`: The `IServiceCollection`.
- `name`: The logical name of the `HttpClient` to configure.
- `configureClient`: A delegate that is used to configure an `HttpClient`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

`HttpClient` instances that apply the provided configuration can be retrieved using
`IHttpClientFactory.CreateClient` and providing the matching name.

`TClient` instances constructed with the appropriate `HttpClient`
can be retrieved from `IServiceProvider.GetService` (and related methods) by providing
`TClient` as the service type.

Use `Options.DefaultName` as the name to configure the default client.

## HttpClientFactoryServiceCollectionExtensions.AddHttpClient<TClient,TImplementation>(IServiceCollection, String, HttpClient>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddHttpClient<TClient,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, string name, Action<System.Net.Http.HttpClient> configureClient) where TClient : class where TImplementation : class, TClient;
```

Adds the `IHttpClientFactory` and related services to the `IServiceCollection` and configures
a binding between the `TClient` type and a named `HttpClient`.

Parameters:

- `TClient`: The type of the typed client. The type specified will be registered in the service collection as
a transient service. See `ITypedHttpClientFactory<T>` for more details about authoring typed clients.
- `TImplementation`: The implementation type of the typed client. The type specified will be instantiated by the
`ITypedHttpClientFactory<T>`.
- `services`: The `IServiceCollection`.
- `name`: The logical name of the `HttpClient` to configure.
- `configureClient`: A delegate that is used to configure an `HttpClient`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

`HttpClient` instances that apply the provided configuration can be retrieved using
`IHttpClientFactory.CreateClient` and providing the matching name.

`TClient` instances constructed with the appropriate `HttpClient`
can be retrieved from `IServiceProvider.GetService` (and related methods) by providing
`TClient` as the service type.

Use `Options.DefaultName` as the name to configure the default client.

## HttpClientFactoryServiceCollectionExtensions.AddHttpClient<TClient,TImplementation>(IServiceCollection, String, IServiceProvider,TImplementation>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddHttpClient<TClient,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, string name, Func<System.Net.Http.HttpClient,IServiceProvider,TImplementation> factory) where TClient : class where TImplementation : class, TClient;
```

Adds the `IHttpClientFactory` and related services to the `IServiceCollection` and configures
a binding between the `TClient` type and a named `HttpClient`.

Parameters:

- `TClient`: The type of the typed client. The type specified will be registered in the service collection as
a transient service. See `ITypedHttpClientFactory<T>` for more details about authoring typed clients.
- `TImplementation`: The implementation type of the typed client.
- `services`: The `IServiceCollection`.
- `name`: The logical name of the `HttpClient` to configure.
- `factory`: A delegate that is used to create an instance of `TClient`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

`HttpClient` instances that apply the provided configuration can be retrieved using
`IHttpClientFactory.CreateClient` and providing the matching name.

`TClient` instances constructed with the appropriate `HttpClient`
can be retrieved from `IServiceProvider.GetService` (and related methods) by providing
`TClient` as the service type.

## HttpClientFactoryServiceCollectionExtensions.AddHttpClient<TClient,TImplementation>(IServiceCollection, String, HttpClient,TImplementation>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddHttpClient<TClient,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, string name, Func<System.Net.Http.HttpClient,TImplementation> factory) where TClient : class where TImplementation : class, TClient;
```

Adds the `IHttpClientFactory` and related services to the `IServiceCollection` and configures
a binding between the `TClient` type and a named `HttpClient`.

Parameters:

- `TClient`: The type of the typed client. The type specified will be registered in the service collection as
a transient service. See `ITypedHttpClientFactory<T>` for more details about authoring typed clients.
- `TImplementation`: The implementation type of the typed client.
- `services`: The `IServiceCollection`.
- `name`: The logical name of the `HttpClient` to configure.
- `factory`: A delegate that is used to create an instance of `TClient`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

`HttpClient` instances that apply the provided configuration can be retrieved using
`IHttpClientFactory.CreateClient` and providing the matching name.

`TClient` instances constructed with the appropriate `HttpClient`
can be retrieved from `IServiceProvider.GetService` (and related methods) by providing
`TClient` as the service type.

`TImplementation`

## HttpClientFactoryServiceCollectionExtensions.ConfigureHttpClientDefaults(IServiceCollection, IHttpClientBuilder>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection ConfigureHttpClientDefaults (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.DependencyInjection.IHttpClientBuilder> configure);
```

Adds a delegate that will be used to configure all `HttpClient` instances.

Parameters:

- `services`: The `IServiceCollection`.
- `configure`: A delegate that is used to configure an `IHttpClientBuilder`.

Returns: The `IServiceCollection`.

To be added.
