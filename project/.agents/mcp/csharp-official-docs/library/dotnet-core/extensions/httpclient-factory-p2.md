---
title: "Use the IHttpClientFactory (part 2 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/httpclient-factory.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Use the IHttpClientFactory (part 2 of 3)

## Make POST, PUT, and DELETE requests

In the preceding examples, all HTTP requests use the `GET` HTTP verb. `HttpClient` also supports other HTTP verbs, including:

- `POST`
- `PUT`
- `DELETE`
- `PATCH`

For a complete list of supported HTTP verbs, see `System.Net.Http.HttpMethod`. For more information on making HTTP requests, see Send a request using HttpClient.

The following example shows how to make an HTTP `POST` request:

```csharp
public async Task CreateItemAsync(Item item)
{
    using StringContent json = new(
        JsonSerializer.Serialize(item, new JsonSerializerOptions(JsonSerializerDefaults.Web)),
        Encoding.UTF8,
        MediaTypeNames.Application.Json);

    using HttpResponseMessage httpResponse =
        await httpClient.PostAsync("/api/items", json);

    httpResponse.EnsureSuccessStatusCode();
}
```
In the preceding code, the `CreateItemAsync` method:

- Serializes the `Item` parameter to JSON using `System.Text.Json`. This uses an instance of `System.Text.Json.JsonSerializerOptions` to configure the serialization process.
- Creates an instance of `System.Net.Http.StringContent` to package the serialized JSON for sending in the HTTP request's body.
- Calls `System.Net.Http.HttpClient.PostAsync*` to send the JSON content to the specified URL. This is a relative URL that gets added to the HttpClient.BaseAddress.
- Calls `System.Net.Http.HttpResponseMessage.EnsureSuccessStatusCode*` to throw an exception if the response status code does not indicate success.

`HttpClient` also supports other types of content. For example, `System.Net.Http.MultipartContent` and `System.Net.Http.StreamContent`. For a complete list of supported content, see `System.Net.Http.HttpContent`.

The following example shows an HTTP `PUT` request:

```csharp
public async Task UpdateItemAsync(Item item)
{
    using StringContent json = new(
        JsonSerializer.Serialize(item, new JsonSerializerOptions(JsonSerializerDefaults.Web)),
        Encoding.UTF8,
        MediaTypeNames.Application.Json);

    using HttpResponseMessage httpResponse =
        await httpClient.PutAsync($"/api/items/{item.Id}", json);

    httpResponse.EnsureSuccessStatusCode();
}
```
The preceding code is very similar to the `POST` example. The `UpdateItemAsync` method calls `System.Net.Http.HttpClient.PutAsync*` instead of `PostAsync`.

The following example shows an HTTP `DELETE` request:

```csharp
public async Task DeleteItemAsync(Guid id)
{
    using HttpResponseMessage httpResponse =
        await httpClient.DeleteAsync($"/api/items/{id}");

    httpResponse.EnsureSuccessStatusCode();
}
```
In the preceding code, the `DeleteItemAsync` method calls `System.Net.Http.HttpClient.DeleteAsync*`. Because HTTP `DELETE` requests typically contain no body, the `DeleteAsync` method doesn't provide an overload that accepts an instance of `HttpContent`.

To learn more about using different HTTP verbs with `HttpClient`, see `System.Net.Http.HttpClient`.

## `HttpClient` lifetime management

A new `HttpClient` instance is returned each time `CreateClient` is called on the `IHttpClientFactory`. One `System.Net.Http.HttpClientHandler` instance is created per client name. The factory manages the lifetimes of the `HttpClientHandler` instances.

`IHttpClientFactory` caches the `HttpClientHandler` instances created by the factory to reduce resource consumption. An `HttpClientHandler` instance may be reused from the cache when creating a new `HttpClient` instance if its lifetime hasn't expired.

Caching of handlers is desirable as each handler typically manages its own underlying HTTP connection pool. Creating more handlers than necessary can result in socket exhaustion and connection delays. Some handlers also keep connections open indefinitely, which can prevent the handler from reacting to DNS changes.

The default handler lifetime is two minutes. To override the default value, call `Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.SetHandlerLifetime*` for each client, on the `IHttpClientBuilder` when registering `IHttpClientFactory` in the `ServiceCollection`:

```csharp
services.AddHttpClient("Named.Client")
    .SetHandlerLifetime(TimeSpan.FromMinutes(5));
```

> **Important:**
> `HttpClient` instances created by `IHttpClientFactory` are intended to be **short-lived**.
>
> - Recycling and recreating `HttpMessageHandler`s when their lifetime expires is essential for `IHttpClientFactory` to ensure the handlers react to DNS changes. `HttpClient` is tied to a specific handler instance upon its creation, so new `HttpClient` instances should be requested in a timely manner to ensure the client will get the updated handler.
>
> - Disposing of such `HttpClient` instances **created by the factory** will not lead to socket exhaustion, as its disposal **will not** trigger disposal of the `HttpMessageHandler`. `IHttpClientFactory` tracks and disposes of resources used to create `HttpClient` instances, specifically the `HttpMessageHandler` instances, as soon their lifetime expires and there's no `HttpClient` using them anymore.

Keeping a single `HttpClient` instance alive for a long duration is a common pattern that can be used as an **alternative** to `IHttpClientFactory`, however, this pattern requires additional setup, such as `PooledConnectionLifetime`. You can use either **long-lived** clients with `PooledConnectionLifetime`, or **short-lived** clients created by `IHttpClientFactory`. For information about which strategy to use in your app, see Guidelines for using HTTP clients.

## Configure the `HttpMessageHandler`

It may be necessary to control the configuration of the inner `System.Net.Http.HttpMessageHandler` used by a client.

An `Microsoft.Extensions.DependencyInjection.IHttpClientBuilder` is returned when adding named or typed clients. The `Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.ConfigurePrimaryHttpMessageHandler*` extension method can be called on the `IHttpClientBuilder` and passed in a delegate. The delegate is used to create and configure the primary `HttpMessageHandler` used by that client:

```csharp
.ConfigurePrimaryHttpMessageHandler(() =>
{
    return new HttpClientHandler
    {
        AllowAutoRedirect = false,
        UseDefaultCredentials = true
    };
});
```
Configuring the `HttpClientHandler` lets you specify a proxy for the `HttpClient` instance among various other properties of the handler. For more information, see Proxy per client.

### Additional configuration

There are several additional configuration options for controlling the `IHttpClientBuilder`:

| Method | Description |
|--|--|
| `Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.AddHttpMessageHandler*` | Adds an additional message handler for a named `HttpClient`. |
| `Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.AddTypedClient*` | Configures the binding between the `TClient` and the named `HttpClient` associated with the `IHttpClientBuilder`. |
| `Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.ConfigureHttpClient*` | Adds a delegate that will be used to configure a named `HttpClient`. |
| `Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.ConfigurePrimaryHttpMessageHandler*` | Configures the primary `HttpMessageHandler` from the dependency injection container for a named `HttpClient`. |
| `Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.RedactLoggedHeaders*` | Sets the collection of HTTP header names for which values should be redacted before logging. |
| `Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.SetHandlerLifetime*` | Sets the length of time that a `HttpMessageHandler` instance can be reused. Each named client can have its own configured handler lifetime value. |
| `Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.UseSocketsHttpHandler*` | Configures a new or a previously added `SocketsHttpHandler` instance from the dependency injection container to be used as a primary handler for a named `HttpClient`. (.NET 5+ only) |

## Using `IHttpClientFactory` together with `SocketsHttpHandler`

The `SocketsHttpHandler` implementation of `HttpMessageHandler` was added in .NET Core 2.1, which allows `PooledConnectionLifetime` to be configured. This setting is used to ensure that the handler reacts to DNS changes, so using `SocketsHttpHandler` is considered to be an alternative to using `IHttpClientFactory`. For more information, see Guidelines for using HTTP clients.

However, `SocketsHttpHandler` and `IHttpClientFactory` can be used together to improve configurability. By using both of these APIs, you benefit from configurability on both a low level (for example, using `LocalCertificateSelectionCallback` for dynamic certificate selection) and a high level (for example, leveraging DI integration and several client configurations).

To use both APIs:

1. Specify `SocketsHttpHandler` as `PrimaryHandler` via `Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.ConfigurePrimaryHttpMessageHandler*`, or `Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.UseSocketsHttpHandler*` (.NET 5+ only).
1. Set up `System.Net.Http.SocketsHttpHandler.PooledConnectionLifetime` based on the interval you expect DNS to be updated; for example, to a value that was previously set in the `SetHandlerLifetime` extension method.
1. (Optional) Since `SocketsHttpHandler` will handle connection pooling and recycling, handler recycling at the `IHttpClientFactory` level is no longer needed. You can disable it by setting `HandlerLifetime` to `Timeout.InfiniteTimeSpan`.

```csharp
services.AddHttpClient(name)
    .UseSocketsHttpHandler((handler, _) =>
        handler.PooledConnectionLifetime = TimeSpan.FromMinutes(2)) // Recreate connection every 2 minutes
    .SetHandlerLifetime(Timeout.InfiniteTimeSpan); // Disable rotation, as it is handled by PooledConnectionLifetime
```

In the example above, 2 minutes were chosen arbitrarily for illustration purposes, aligning to a default `HandlerLifetime` value. You should choose the value based on the expected frequency of DNS or other network changes. For more information, see the DNS behavior section in the `HttpClient` guidelines, and the Remarks section in the `System.Net.Http.SocketsHttpHandler.PooledConnectionLifetime` API documentation.

## Avoid typed clients in singleton services

When using the _named client_ approach, `IHttpClientFactory` is injected into services, and `HttpClient` instances are created by calling `System.Net.Http.IHttpClientFactory.CreateClient*` every time an `HttpClient` is needed.

However, with the _typed client_ approach, typed clients are transient objects usually injected into services. That may cause a problem because a typed client can be injected into a singleton service.

> **Important:**
> Typed clients are expected to be **short-lived** in the same sense as `HttpClient` instances created by `IHttpClientFactory` (for more information, see `HttpClient` lifetime management). As soon as a typed client instance is created, `IHttpClientFactory` has no control over it. If a typed client instance is captured in a singleton, it may prevent it from reacting to DNS changes, defeating one of the purposes of `IHttpClientFactory`.

If you need to use `HttpClient` instances in a singleton service, consider the following options:

- Use the _named client_ approach instead, injecting `IHttpClientFactory` in the singleton service and recreating `HttpClient` instances when necessary.
- If you require the _typed client_ approach, use `SocketsHttpHandler` with configured `PooledConnectionLifetime` as a primary handler. For more information on using `SocketsHttpHandler` with `IHttpClientFactory`, see the section Using IHttpClientFactory together with SocketsHttpHandler.
