---
title: "Call a web API from an ASP.NET Core Blazor app (part 2 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/call-web-api.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Call a web API from an ASP.NET Core Blazor app (part 2 of 6)

## Named `HttpClient` with `IHttpClientFactory`

*The guidance in this section applies to using a named `System.Net.Http.HttpClient` in a Blazor WebAssembly app, the `.Client` project of a Blazor Web App, and for prerendered client-side components of a Blazor Web App. For general guidance on HTTP client patterns in ASP.NET Core apps (for example, when you use an HTTP client only in the server project of a Blazor Web App or in a Blazor Server app), see HTTP requests with IHttpClientFactory - ASP.NET Core.*

`System.Net.Http.IHttpClientFactory` services and the configuration of a named `System.Net.Http.HttpClient` are supported for classes and Razor components in a Blazor WebAssembly app, the `.Client` project of a Blazor Web App, and for prerendered client-side components in a Blazor Web App.

> **Note:**
> An alternative to using a named `System.Net.Http.HttpClient` from an `System.Net.Http.IHttpClientFactory` is to use a typed `System.Net.Http.HttpClient`. For more information, see the Typed `HttpClient` section.

Add the `Microsoft.Extensions.Http` NuGet package to the project.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

In the `Program` file of the project, register HTTP client services, giving a name to the client. In the following example, the name is `WebAPI`:

```csharp
builder.Services.AddHttpClient("WebAPI", client => 
    client.BaseAddress = new Uri(builder.HostEnvironment.BaseAddress));
```

If the named client is to be used by prerendered client-side components of a Blazor Web App, the preceding service registration should appear in both the server project and the `.Client` project. On the server, `builder.HostEnvironment.BaseAddress` is replaced by the web API's base address, which is described further below.

The preceding client-side example sets the base address with `builder.HostEnvironment.BaseAddress` (`Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.BaseAddress`), which gets the base address for the client-side app and is typically derived from the `<base>` tag's `href` value in the host page.

The most common use cases for using the client's own base address are:

* The client project (`.Client`) of a Blazor Web App that makes web API calls from WebAssembly/Auto components or code that runs on the client in WebAssembly to APIs in the server app at the same host address.
* The client project (**:::no-loc text="Client":::**) of a hosted Blazor WebAssembly app that makes web API calls to the server project (**:::no-loc text="Server":::**).

If you're calling an external web API (not in the same URL space as the client app) or you're configuring the services in a server-side app (for example to deal with prerendering of client-side components on the server), set the URI to the web API's base address. The following example sets the base address of the web API to `https://localhost:5001`, where a separate web API app is running and ready to respond to requests from the client app:

```csharp
builder.Services.AddHttpClient("WebAPI", client => 
    client.BaseAddress = new Uri("https://localhost:5001"));
```

In the following component code:

* An instance of `System.Net.Http.IHttpClientFactory` creates a named `System.Net.Http.HttpClient`.
* The named `System.Net.Http.HttpClient` is used to issue a GET request for JSON weather forecast data from the web API at `/forecast`.

```razor
@inject IHttpClientFactory ClientFactory

...

@code {
    private Forecast[]? forecasts;

    protected override async Task OnInitializedAsync()
    {
        var client = ClientFactory.CreateClient("WebAPI");

        forecasts = await client.GetFromJsonAsync<Forecast[]>("forecast") ?? [];
    }
}
```

The `BlazorWebAppCallWebApi` sample app demonstrates calling a web API with a named `System.Net.Http.HttpClient` in its `CallTodoWebApiCsrNamedClient` component. For an additional working demonstration in a client app based on calling Microsoft Graph with a named `System.Net.Http.HttpClient`, see Use Graph API with ASP.NET Core Blazor WebAssembly.

## Typed `HttpClient`

*The guidance in this section applies to using a typed `System.Net.Http.HttpClient` in a Blazor WebAssembly app, the `.Client` project of a Blazor Web App, and for prerendered client-side components of a Blazor Web App. For general guidance on HTTP client patterns in ASP.NET Core apps (for example, when you use an HTTP client only in the server project of a Blazor Web App or in a Blazor Server app), see HTTP requests with IHttpClientFactory - ASP.NET Core.*

Typed `System.Net.Http.HttpClient` uses one or more of the app's `System.Net.Http.HttpClient` instances, default or named, to return data from one or more web API endpoints. Typed clients are supported for classes and Razor components in a Blazor WebAssembly app, the `.Client` project of a Blazor Web App, and for prerendered client-side components in a Blazor Web App.

> **Note:**
> An alternative to using a typed `System.Net.Http.HttpClient` is to use a named `System.Net.Http.HttpClient` from an `System.Net.Http.IHttpClientFactory`. For more information, see the Named `HttpClient` with `IHttpClientFactory` section.

Add the `Microsoft.Extensions.Http` NuGet package to the project.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

The following example issues a GET request for JSON weather forecast data from the web API at `/forecast`.

`ForecastHttpClient.cs`:

```csharp
using System.Net.Http.Json;

namespace BlazorSample.Client;

public class ForecastHttpClient(HttpClient http)
{
    public async Task<Forecast[]> GetForecastAsync() => 
        await http.GetFromJsonAsync<Forecast[]>("forecast") ?? [];
}
```

In the `Program` file of the project:

```csharp
builder.Services.AddHttpClient<ForecastHttpClient>(client => 
    client.BaseAddress = new Uri(builder.HostEnvironment.BaseAddress));
```

If the typed client is to be used by prerendered client-side components of a Blazor Web App, the preceding service registration should appear in both the server project and the `.Client` project. On the server, `builder.HostEnvironment.BaseAddress` is replaced by the web API's base address, which is described further below.

The preceding example sets the base address with `builder.HostEnvironment.BaseAddress` (`Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.BaseAddress`), which gets the base address for the client-side app and is typically derived from the `<base>` tag's `href` value in the host page.

The most common use cases for using the client's own base address are:

* The client project (`.Client`) of a Blazor Web App that makes web API calls from WebAssembly/Auto components or code that runs on the client in WebAssembly to APIs in the server app at the same host address.
* The client project (**:::no-loc text="Client":::**) of a hosted Blazor WebAssembly app that makes web API calls to the server project (**:::no-loc text="Server":::**).

If you're calling an external web API (not in the same URL space as the client app) or you're configuring the services in a server-side app (for example to deal with prerendering of client-side components on the server), set the URI to the web API's base address. The following example sets the base address of the web API to `https://localhost:5001`, where a separate web API app is running and ready to respond to requests from the client app:

```csharp
builder.Services.AddHttpClient<ForecastHttpClient>(client => 
    client.BaseAddress = new Uri("https://localhost:5001"));
```

Components inject the typed `System.Net.Http.HttpClient` to call the web API.

In the following component code:

* An instance of the preceding `ForecastHttpClient` is injected, which creates a typed `System.Net.Http.HttpClient`.
* The typed `System.Net.Http.HttpClient` is used to issue a GET request for JSON weather forecast data from the web API.

```razor
@inject ForecastHttpClient Http

...

@code {
    private Forecast[]? forecasts;

    protected override async Task OnInitializedAsync()
    {
        forecasts = await Http.GetForecastAsync();
    }
}
```

The `BlazorWebAppCallWebApi` sample app demonstrates calling a web API with a typed `System.Net.Http.HttpClient` in its `CallTodoWebApiCsrTypedClient` component. Note that the component adopts and client-side rendering (CSR) (`InteractiveWebAssembly` render mode) ***with prerendering***, so the typed client service registration appears in the `Program` file of both the server project and the `.Client` project.

## Accessing services outside of the `HttpClient`'s scope

`System.Net.Http.IHttpClientFactory` creates `System.Net.Http.DelegatingHandler` instances in a separate dependency injection (DI) scope from the app. If you inject a scoped service into a derived `System.Net.Http.DelegatingHandler` type, the handler doesn't have access to the service from the Blazor circuit.

For an example of how to access a service in outgoing request middleware using either an application scope handler or a circuit activity handler, see ASP.NET Core Blazor additional server-side security scenarios.

For more information on `System.Net.Http.DelegatingHandler` instances, see HTTP requests with IHttpClientFactory - ASP.NET Core.

## Disposal of `HttpRequestMessage`, `HttpResponseMessage`, and `HttpClient`

An `System.Net.Http.HttpRequestMessage` without a body doesn't require explicit disposal. However, you can dispose of it with either of the following patterns:

* `using` declaration (C# 8 or later):

  ```csharp
  using var request = new HttpRequestMessage(...);
  ```

* `using` block (all C# releases):

  ```csharp
  using (var request = new HttpRequestMessage(...))
  {
      ...
  }
  ```

We recommend disposing of every `System.Net.Http.HttpRequestMessage` with every use for the following reasons:

* To gain a performance improvement by avoiding finalizers.
* It hardens the code for the future in case a request body is ever added to an `System.Net.Http.HttpRequestMessage` that didn't initially have one.
* To potentially avoid functional issues if a delegating handler expects a call to `System.IDisposable.Dispose*`/`System.IAsyncDisposable.DisposeAsync*`.
* It's simpler to apply a general rule everywhere than trying to remember specific cases.

***Always*** dispose of `System.Net.Http.HttpResponseMessage` instances.

***Never*** dispose of `System.Net.Http.HttpClient` instances created by calling `System.Net.Http.IHttpClientFactory.CreateClient*` because they're managed by the framework.

Example:

```csharp
using var request = new HttpRequestMessage(HttpMethod.Get, "/weather-forecast");
var client = clientFactory.CreateClient("ExternalApi");
using var response = await client.SendAsync(request);
```

## Prerendered data

When prerendering, components render twice: first statically, then interactively. State doesn't automatically flow from the prerendered component to the interactive one. If a component performs asynchronous initialization operations and renders different content for different states during initialization, such as a "Loading..." progress indicator, you may see a flicker when the component renders twice.

You can address this by flowing prerendered state using the Persistent Component State API, which the `BlazorWebAppCallWebApi` and `BlazorWebAppCallWebApi_Weather` sample apps demonstrate. When the component renders interactively, it can render the same way using the same state. For more information, see the following resources:

* ASP.NET Core Blazor prerendered state persistence
* ASP.NET Core Blazor navigation

## JSON helpers

The `System.Net.Http.Json` package provides extension methods for `System.Net.Http.HttpClient` and `System.Net.Http.HttpContent` that perform automatic serialization and deserialization using `System.Text.Json`. The `System.Net.Http.Json` package is provided by the .NET shared framework and doesn't require adding a package reference to the app.

`System.Net.Http.HttpClient` is available as a preconfigured service for making requests back to the origin server. `System.Net.Http.HttpClient` and JSON helpers (`System.Net.Http.Json.HttpClientJsonExtensions`) are also used to call third-party web API endpoints. `System.Net.Http.HttpClient` is implemented using the browser's Fetch API and is subject to its limitations, including enforcement of the same-origin policy, which is discussed later in this article in the *Cross-Origin Resource Sharing (CORS)* section.

The client's base address is set to the originating server's address. Inject an `System.Net.Http.HttpClient` instance into a component using the `@inject` directive:

```razor
@using System.Net.Http
@inject HttpClient Http
```

Use the `System.Net.Http.Json` namespace for access to `System.Net.Http.Json.HttpClientJsonExtensions`, including `System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync*`, `System.Net.Http.Json.HttpClientJsonExtensions.PutAsJsonAsync*`, and `System.Net.Http.Json.HttpClientJsonExtensions.PostAsJsonAsync*`:

```razor
@using System.Net.Http.Json
```

The following sections cover JSON helpers:

* GET
* POST
* PUT
* PATCH

`System.Net.Http` includes additional methods for sending HTTP requests and receiving HTTP responses, for example to send a DELETE request. For more information, see the DELETE and additional extension methods section.

## GET from JSON (`GetFromJsonAsync`)

`System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync*` sends an HTTP GET request and parses the JSON response body to create an object.

In the following component code, the `todoItems` are displayed by the component. `System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync*` is called when the component is finished initializing (`OnInitializedAsync`).

```csharp
todoItems = await Http.GetFromJsonAsync<TodoItem[]>("todoitems");
```
