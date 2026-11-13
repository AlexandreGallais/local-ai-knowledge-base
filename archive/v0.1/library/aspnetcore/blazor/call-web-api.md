---
title: "Call a web API from an ASP.NET Core Blazor app (part 1 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/call-web-api.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Call a web API from ASP.NET Core Blazor

-->
-->

This article describes how to call a web API from a Blazor app.

## Server-side scenarios for calling external web APIs

Server-based components call external web APIs using `System.Net.Http.HttpClient` instances, typically created using `System.Net.Http.IHttpClientFactory`. For guidance that applies to server-side apps, see HTTP requests with IHttpClientFactory - ASP.NET Core.

A server-side app doesn't include an `System.Net.Http.HttpClient` service. Provide an `System.Net.Http.HttpClient` to the app using the `HttpClient` factory infrastructure.

In the `Program` file:

```csharp
builder.Services.AddHttpClient();
```

The following Razor component makes a request to a web API for GitHub branches similar to the *Basic Usage* example in the HTTP requests with IHttpClientFactory - ASP.NET Core article.

`CallWebAPI.razor`:

```razor
@page "/call-web-api"
@using System.Text.Json
@using System.Text.Json.Serialization
@inject IHttpClientFactory ClientFactory

<h1>Call web API from a server-side Razor component</h1>

@if (getBranchesError || branches is null)
{
    <p>Unable to get branches from GitHub. Please try again later.</p>
}
else
{
    <ul>
        @foreach (var branch in branches)
        {
            <li>@branch.Name</li>
        }
    </ul>
}

@code {
    private IEnumerable<GitHubBranch>? branches = [];
    private bool getBranchesError;
    private bool shouldRender;

    protected override bool ShouldRender() => shouldRender;

    protected override async Task OnInitializedAsync()
    {
        using var request = new HttpRequestMessage(HttpMethod.Get,
            "https://api.github.com/repos/dotnet/AspNetCore.Docs/branches");
        request.Headers.Add("Accept", "application/vnd.github.v3+json");
        request.Headers.Add("User-Agent", "HttpClientFactory-Sample");

        var client = ClientFactory.CreateClient();

        using var response = await client.SendAsync(request);

        if (response.IsSuccessStatusCode)
        {
            using var responseStream = await response.Content.ReadAsStreamAsync();
            branches = await JsonSerializer.DeserializeAsync
                <IEnumerable<GitHubBranch>>(responseStream);
        }
        else
        {
            getBranchesError = true;
        }

        shouldRender = true;
    }

    public class GitHubBranch
    {
        [JsonPropertyName("name")]
        public string? Name { get; set; }
    }
}
```

In the preceding example for C# 12 or later, an empty array (`[]`) is created for the `branches` variable. For earlier versions of C# compiled with an SDK earlier than .NET 8, create an empty array (`Array.Empty<GitHubBranch>()`).

For an additional working example, see the server-side file upload example that uploads files to a web API controller in the ASP.NET Core Blazor file uploads article.

## Service abstractions for web API calls

*This section applies to Blazor Web Apps that maintain a web API in the server project or transform web API calls to an external web API.*

When using the interactive WebAssembly and Auto render modes, components are prerendered by default. Auto components are also initially rendered interactively from the server before the Blazor bundle downloads to the client and the client-side runtime activates. This means that components using these render modes should be designed so that they run successfully from both the client and the server. If the component must call a server project-based API or transform a request to an external web API (one that's outside of the Blazor Web App) when running on the client, the recommended approach is to abstract that API call behind a service interface and implement client and server versions of the service:

* The client version calls the web API with a preconfigured `System.Net.Http.HttpClient`.
* The server version can typically access the server-side resources directly. Injecting an `System.Net.Http.HttpClient` on the server that makes calls back to the server isn't recommended, as the network request is typically unnecessary. Alternatively, the API might be external to the server project, but a service abstraction for the server is required to transform the request in some way, for example to add an access token to a proxied request.

When using the WebAssembly render mode, you also have the option of disabling prerendering, so the components only render from the client. For more information, see Prerender ASP.NET Core Razor components.

Examples (sample apps):

* Movie list web API in the `BlazorWebAppCallWebApi` sample app.
* Streaming rendering weather data web API in the `BlazorWebAppCallWebApi_Weather` sample app.
* Weather data returned to the client in either the `BlazorWebAppOidc` (non-BFF pattern) or `BlazorWebAppOidcBff` (BFF pattern) sample apps. These apps demonstrate secure (web) API calls. For more information, see Secure an ASP.NET Core Blazor Web App with OpenID Connect (OIDC).

## Blazor Web App external web APIs

*This section applies to Blazor Web Apps that call a web API maintained by a separate (external) project, possibly hosted on a different server.*

Blazor Web Apps normally prerender client-side WebAssembly components, and Auto components render on the server during static or interactive server-side rendering (SSR). `System.Net.Http.HttpClient` services aren't registered by default in a Blazor Web App's main project. If the app is run with only the `System.Net.Http.HttpClient` services registered in the `.Client` project, as described in the Add the `HttpClient` service section, executing the app results in a runtime error:

> :::no-loc text="InvalidOperationException: Cannot provide a value for property 'Http' on type '...{COMPONENT}'. There is no registered service of type 'System.Net.Http.HttpClient'.":::

Use ***either*** of the following approaches:

* Add the `System.Net.Http.HttpClient` services to the server project to make the `System.Net.Http.HttpClient` available during SSR. Use the following service registration in the server project's `Program` file:

  ```csharp
  builder.Services.AddHttpClient();
  ```

  `System.Net.Http.HttpClient` services are provided by the shared framework, so a package reference in the app's project file isn't required.

  Example: Todo list web API in the `BlazorWebAppCallWebApi` sample app

* If prerendering isn't required for a WebAssembly component that calls the web API, disable prerendering by following the guidance in Prerender ASP.NET Core Razor components. If you adopt this approach, you don't need to add `System.Net.Http.HttpClient` services to the main project of the Blazor Web App because the component isn't prerendered on the server.

For more information, see the Client-side services fail to resolve during prerendering section of the *Prerendering* article.

## Client-side scenarios for calling external web APIs

Client-based components call external web APIs using `System.Net.Http.HttpClient` instances, typically created with a preconfigured `System.Net.Http.HttpClient` registered in the `Program` file:

```csharp
builder.Services.AddScoped(sp => 
    new HttpClient
    { 
        BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) 
    });
```

The following Razor component makes a request to a web API for GitHub branches similar to the *Basic Usage* example in the HTTP requests with IHttpClientFactory - ASP.NET Core article.

`CallWebAPI.razor`:

```razor
@page "/call-web-api"
@using System.Text.Json
@using System.Text.Json.Serialization
@inject HttpClient Client

<h1>Call web API from a Blazor WebAssembly Razor component</h1>

@if (getBranchesError || branches is null)
{
    <p>Unable to get branches from GitHub. Please try again later.</p>
}
else
{
    <ul>
        @foreach (var branch in branches)
        {
            <li>@branch.Name</li>
        }
    </ul>
}

@code {
    private IEnumerable<GitHubBranch>? branches = [];
    private bool getBranchesError;
    private bool shouldRender;

    protected override bool ShouldRender() => shouldRender;

    protected override async Task OnInitializedAsync()
    {
        using var request = new HttpRequestMessage(HttpMethod.Get,
            "https://api.github.com/repos/dotnet/AspNetCore.Docs/branches");
        request.Headers.Add("Accept", "application/vnd.github.v3+json");
        request.Headers.Add("User-Agent", "HttpClientFactory-Sample");

        using var response = await Client.SendAsync(request);

        if (response.IsSuccessStatusCode)
        {
            using var responseStream = await response.Content.ReadAsStreamAsync();
            branches = await JsonSerializer.DeserializeAsync
                <IEnumerable<GitHubBranch>>(responseStream);
        }
        else
        {
            getBranchesError = true;
        }

        shouldRender = true;
    }

    public class GitHubBranch
    {
        [JsonPropertyName("name")]
        public string? Name { get; set; }
    }
}
```

In the preceding example for C# 12 or later, an empty array (`[]`) is created for the `branches` variable. For earlier versions of C# compiled with an SDK earlier than .NET 8, create an empty array (`Array.Empty<GitHubBranch>()`).

To protect .NET/C# code and data, use ASP.NET Core Data Protection features with a server-side ASP.NET Core backend web API. The client-side Blazor WebAssembly app calls the server-side web API for secure app features and data processing.

Blazor WebAssembly apps are often prevented from making direct calls across origins to web APIs due to Cross-Origin Request Sharing (CORS) security. A typical exception looks like the following:

> :::no-loc text="Access to fetch at '{URL}' from origin 'https://localhost:{PORT}' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.":::

Even if you call `Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserRequestMode*` with a `Microsoft.AspNetCore.Components.WebAssembly.Http.BrowserRequestMode` field of `NoCors` (1) seeking to circumvent the preceding exception, the request often fails due to CORS restrictions on the web API's origin, such as a restriction that only allows calls from specific origins or a restriction that prevents JavaScript `fetch` requests from a browser. The only way for such calls to succeed is for the web API that you're calling to allow your origin to call its origin with the correct CORS configuration. Most external web APIs don't allow you to configure their CORS policies. To deal with this restriction, adopt either of the following strategies:

* Maintain your own server-side ASP.NET Core backend web API. The client-side Blazor WebAssembly app calls your server-side web API, and your web API makes the request from its server-based C# code (not a browser) to the external web API with the correct CORS headers, returning the result to your client-side Blazor WebAssembly app.

* Use a proxy service to proxy the request from the client-side Blazor WebAssembly app to the external web API. The proxy service uses a server-side app to make the request on the client's behalf and returns the result after the call succeeds. In the following example based on CloudFlare's CORS PROXY, the `{REQUEST URI}` placeholder is the request URI:

  ```razor
  @using System.Net
  @inject IHttpClientFactory ClientFactory

  ...

  @code {
      public async Task CallApi()
      {
          var client = ClientFactory.CreateClient();

          var urlEncodedRequestUri = WebUtility.UrlEncode("{REQUEST URI}");

          using var request = new HttpRequestMessage(HttpMethod.Get, 
              $"https://corsproxy.io/?{urlEncodedRequestUri}");

          using var response = await client.SendAsync(request);

          ...
      }
  }
  ```

## Add the `HttpClient` service

*The guidance in this section applies to client-side scenarios.*

Client-side components call web APIs using a preconfigured `System.Net.Http.HttpClient` service, which is focused on making requests back to the server of origin. Additional `System.Net.Http.HttpClient` service configurations for other web APIs can be created in developer code. Requests are composed using Blazor JSON helpers or with `System.Net.Http.HttpRequestMessage`. Requests can include Fetch API option configuration.

The configuration examples in this section are only useful when a single web API is called for a single `System.Net.Http.HttpClient` instance in the app. When the app must call multiple web APIs, each with its own base address and configuration, you can adopt the following approaches, which are covered in the next two sections of this article:

* Named `HttpClient` with `IHttpClientFactory`: Each web API is provided a unique name. When app code or a Razor component calls a web API, it uses a named `System.Net.Http.HttpClient` instance to make the call.
* Typed `HttpClient`: Each web API is typed. When app code or a Razor component calls a web API, it uses a typed `System.Net.Http.HttpClient` instance to make the call.

In the `Program` file, add an `System.Net.Http.HttpClient` service if it isn't already present from a Blazor project template used to create the app:

```csharp
builder.Services.AddScoped(sp => 
    new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
```

The preceding example sets the base address with `builder.HostEnvironment.BaseAddress` (`Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.BaseAddress`), which gets the base address for the app and is typically derived from the `<base>` tag's `href` value in the host page.

The most common use cases for using the client's own base address are:

* The client project (`.Client`) of a Blazor Web App (.NET 8 or later) makes web API calls from WebAssembly components or code that runs on the client in WebAssembly to APIs in the server app.
* The client project (**:::no-loc text="Client":::**) of a hosted Blazor WebAssembly app makes web API calls to the server project (**:::no-loc text="Server":::**). Note that the Hosted Blazor WebAssembly project template is no longer available in .NET 8 or later. However, hosted Blazor WebAssembly apps remain supported for .NET 8.

If you're calling an external web API (not in the same URL space as the client app), set the URI to the web API's base address. The following example sets the base address of the web API to `https://localhost:5001`, where a separate web API app is running and ready to respond to requests from the client app:

```csharp
builder.Services.AddScoped(sp => 
    new HttpClient { BaseAddress = new Uri("https://localhost:5001") });
```
