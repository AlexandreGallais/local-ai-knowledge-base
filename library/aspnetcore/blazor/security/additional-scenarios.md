---
title: "ASP.NET Core Blazor additional server-side security scenarios (part 1 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/additional-scenarios.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor additional server-side security scenarios

-->
-->

This article explains how to configure server-side Blazor for additional security scenarios, including how to pass tokens to a Blazor app.

> **Note:**
> The code examples in this article adopt nullable reference types (NRTs) and .NET compiler null-state static analysis, which are supported in ASP.NET Core in .NET 6 or later. When targeting .NET 5 or earlier, remove the null type designation (`?`) from the `string?`, `TodoItem[]?`, `WeatherForecast[]?`, and `IEnumerable<GitHubBranch>?` types in the article's examples.

## Pass tokens to a server-side Blazor app

*This section applies to Blazor Web Apps. For Blazor Server, view the .NET 7 version of this article section.*

If you merely want to use access tokens to make web API calls from a Blazor Web App with a named HTTP client, see the Use a token handler for web API calls section, which explains how to use a `System.Net.Http.DelegatingHandler` implementation to attach a user's access token to outgoing requests. The following guidance in this section is for developers who need access tokens, refresh tokens, and other authentication properties server-side for other purposes.

> **Note:**
> For more information on `System.Net.Http.DelegatingHandler` instances, see HTTP requests with IHttpClientFactory - ASP.NET Core.

To save tokens and other authentication properties for server-side use in Blazor Web Apps, we recommend using `IHttpContextAccessor`/`HttpContext` (`Microsoft.AspNetCore.Http.IHttpContextAccessor`, `Microsoft.AspNetCore.Http.HttpContext`). Reading tokens from `Microsoft.AspNetCore.Http.HttpContext`, including as a cascading parameter, using `Microsoft.AspNetCore.Http.IHttpContextAccessor` is supported for obtaining tokens for use during interactive server rendering if the tokens are obtained during static server-side rendering (static SSR) or prerendering. However, tokens aren't updated if the user authenticates after the circuit is established, since the `Microsoft.AspNetCore.Http.HttpContext` is captured at the start of the SignalR connection. Also, the use of `System.Threading.AsyncLocal`1` by `Microsoft.AspNetCore.Http.IHttpContextAccessor` means that you must be careful not to lose the execution context before reading the `Microsoft.AspNetCore.Http.HttpContext`. For more information, see IHttpContextAccessor/HttpContext in ASP.NET Core Blazor apps.

In a service class, obtain access to the members of the namespace `Microsoft.AspNetCore.Authentication` to surface the `Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.GetTokenAsync*` method on `Microsoft.AspNetCore.Http.HttpContext`. An alternative approach, which is commented out in the following example, is to call `Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.AuthenticateAsync*` on `Microsoft.AspNetCore.Http.HttpContext`. For the returned `Microsoft.AspNetCore.Authentication.AuthenticateResult.Properties`, call `Microsoft.AspNetCore.Authentication.AuthenticationTokenExtensions.GetTokenValue*`.

```csharp
using Microsoft.AspNetCore.Authentication;

public class AuthenticationProcessor(IHttpContextAccessor httpContextAccessor)
{
    public async Task<string?> GetAccessToken()
    {
        if (httpContextAccessor.HttpContext is null)
        {
            throw new Exception("HttpContext not available");
        }

        // Approach 1: Call 'GetTokenAsync'
        var accessToken = await httpContextAccessor.HttpContext
            .GetTokenAsync("access_token");

        // Approach 2: Authenticate the user and call 'GetTokenValue'
        /*
        var authResult = await httpContextAccessor.HttpContext.AuthenticateAsync();
        var accessToken = authResult?.Properties?.GetTokenValue("access_token");
        */

        return accessToken;
    }
}
```

The service is registered in the server project's `Program` file:

```csharp
builder.Services.AddScoped<AuthenticationProcessor>();
```

`AuthenticationProcessor` can be injected into server-side services, for example in a `System.Net.Http.DelegatingHandler` for a preconfigured `System.Net.Http.HttpClient`. The following example is only for demonstration purposes or in case you need to perform special processing in the `AuthenticationProcessor` service because you can just inject `Microsoft.AspNetCore.Http.IHttpContextAccessor` and obtain the token directly for calling external web APIs (for more information on using `Microsoft.AspNetCore.Http.IHttpContextAccessor` directly to call web APIs, see the Use a token handler for web API calls section).

```csharp
using System.Net.Http.Headers;

public class TokenHandler(AuthenticationProcessor authProcessor) :
    DelegatingHandler
{
    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken cancellationToken)
    {
        var accessToken = authProcessor.GetAccessToken();

        request.Headers.Authorization =
            new AuthenticationHeaderValue("Bearer", accessToken);

        return await base.SendAsync(request, cancellationToken);
    }
}
```

The token handler is registered and acts as the delegating handler for a named HTTP client in the `Program` file:

```csharp
builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<TokenHandler>();

builder.Services.AddHttpClient("ExternalApi",
      client => client.BaseAddress = new Uri(builder.Configuration["ExternalApiUri"] ??
          throw new Exception("Missing base address!")))
      .AddHttpMessageHandler<TokenHandler>();
```

> **Caution:**
> Ensure that tokens are never transmitted and handled by the client (the `.Client` project), for example, in a component that adopts Interactive Auto rendering and is rendered on the client or by a client-side service. Always have the client call the server (project) to process requests with tokens. **Tokens and other authentication data should never leave the server.**
>
> For Interactive Auto components, see ASP.NET Core Blazor authentication and authorization, which demonstrates how to leave access tokens and other authentication properties on the server. Also, consider adopting the Backend-for-Frontend (BFF) pattern, which adopts a similar call structure and is described in Secure an ASP.NET Core Blazor Web App with OpenID Connect (OIDC) for OIDC providers and Secure an ASP.NET Core Blazor Web App with Microsoft Entra ID for Microsoft Identity Web with Entra.

## Use a token handler for web API calls

The following approach is aimed at attaching a user's access token to outgoing requests, specifically to make web API calls to external web API apps. The approach is shown for a Blazor Web App that adopts global Interactive Server rendering, but the same general approach applies to Blazor Web Apps that adopt the global Interactive Auto render mode. The important concept to keep in mind is that accessing the `Microsoft.AspNetCore.Http.HttpContext` using `Microsoft.AspNetCore.Http.IHttpContextAccessor` is only performed on the server.

For a demonstration of the guidance in this section, see the `BlazorWebAppOidc` and `BlazorWebAppOidcServer` sample apps (.NET 8 or later) in the Blazor samples GitHub repository. The samples adopt a global interactive render mode and OIDC authentication with Microsoft Entra without using Entra-specific packages. The samples demonstrate how to pass a JWT access token to call a secure web API.

Microsoft identity platform with Microsoft Identity Web packages for Microsoft Entra ID provides a API to call web APIs from Blazor Web Apps with automatic token management and renewal. For more information, see Secure an ASP.NET Core Blazor Web App with Microsoft Entra ID and the `BlazorWebAppEntra` and `BlazorWebAppEntraBff` sample apps (.NET 9 or later) in the Blazor samples GitHub repository.

Subclass `System.Net.Http.DelegatingHandler` to attach a user's access token to outgoing requests. The token handler only executes on the server, so using `Microsoft.AspNetCore.Http.HttpContext` is safe.

`TokenHandler.cs`:

```csharp
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Authentication;

public class TokenHandler(IHttpContextAccessor httpContextAccessor) :
    DelegatingHandler
{
    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken cancellationToken)
    {
        if (httpContextAccessor.HttpContext is null)
        {
            throw new Exception("HttpContext not available");
        }

        var accessToken = await httpContextAccessor.HttpContext.GetTokenAsync("access_token");

        if (accessToken is null)
        {
            throw new Exception("No access token");
        }

        request.Headers.Authorization =
            new AuthenticationHeaderValue("Bearer", accessToken);

        return await base.SendAsync(request, cancellationToken);
    }
}
```

> **Note:**
> For guidance on how to access an `AuthenticationStateProvider` from a `DelegatingHandler`, see the Access `AuthenticationStateProvider` in outgoing request middleware section.

In the project's `Program` file, the token handler (`TokenHandler`) is registered as a scoped service and specified as a named HTTP client's message handler with `Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.AddHttpMessageHandler*`.

In the following example, the `{HTTP CLIENT NAME}` placeholder is the name of the `System.Net.Http.HttpClient`, and the `{BASE ADDRESS}` placeholder is the web API's base address URI. For more information on `Microsoft.Extensions.DependencyInjection.HttpServiceCollectionExtensions.AddHttpContextAccessor*`, see IHttpContextAccessor/HttpContext in ASP.NET Core Blazor apps.

In `Program.cs`:

```csharp
builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<TokenHandler>();

builder.Services.AddHttpClient("{HTTP CLIENT NAME}",
      client => client.BaseAddress = new Uri("{BASE ADDRESS}"))
      .AddHttpMessageHandler<TokenHandler>();
```

Example:

```csharp
builder.Services.AddScoped<TokenHandler>();

builder.Services.AddHttpClient("ExternalApi",
      client => client.BaseAddress = new Uri("https://localhost:7277"))
      .AddHttpMessageHandler<TokenHandler>();
```

You can supply the HTTP client base address from configuration with `builder.Configuration["{CONFIGURATION KEY}"]`, where the `{CONFIGURATION KEY}` placeholder is the configuration key:

```csharp
new Uri(builder.Configuration["ExternalApiUri"] ?? throw new IOException("No URI!"))
```

In `appsettings.json`, specify the `ExternalApiUri`. The following example sets the value to the localhost address of the external web API to `https://localhost:7277`:

```json
"ExternalApiUri": "https://localhost:7277"
```

At this point, an `System.Net.Http.HttpClient` created by a component can make secure web API requests. In the following example, the `{REQUEST URI}` is the relative request URI, and the `{HTTP CLIENT NAME}` placeholder is the name of the `System.Net.Http.HttpClient`:

```csharp
using var request = new HttpRequestMessage(HttpMethod.Get, "{REQUEST URI}");
var client = ClientFactory.CreateClient("{HTTP CLIENT NAME}");
using var response = await client.SendAsync(request);
```

Example:

```csharp
using var request = new HttpRequestMessage(HttpMethod.Get, "/weather-forecast");
var client = ClientFactory.CreateClient("ExternalApi");
using var response = await client.SendAsync(request);
```

Additional features are planned for Blazor, which are tracked by Access `AuthenticationStateProvider` in outgoing request middleware (`dotnet/aspnetcore` #52379). Problem providing Access Token to HttpClient in Interactive Server mode (`dotnet/aspnetcore` #52390) is a closed issue that contains helpful discussion and potential workaround strategies for advanced use cases.

## Set the authentication scheme

For an app that uses more than one authentication middleware and thus has more than one authentication scheme, the scheme that Blazor uses can be explicitly set in the endpoint configuration of the `Program` file. The following example sets the OpenID Connect (OIDC) scheme:

```csharp
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

...

app.MapRazorComponents<App>().RequireAuthorization(
    new AuthorizeAttribute
    {
        AuthenticationSchemes = OpenIdConnectDefaults.AuthenticationScheme
    })
    .AddInteractiveServerRenderMode();
```
