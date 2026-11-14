---
title: "Secure an ASP.NET Core Blazor Web App with Microsoft Entra ID (part 2 of 7)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/security/blazor-web-app-with-entra.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Secure an ASP.NET Core Blazor Web App with Microsoft Entra ID (part 2 of 7)

## Configure the server project (`BlazorWebAppEntra`)

`Microsoft.Identity.Web.AppBuilderExtension.AddMicrosoftIdentityWebApp*` from Microsoft Identity Web (`Microsoft.Identity.Web` NuGet package, API documentation) is configured in the `BlazorWebAppEntra` project's `Program` file.

Obtain the application (client) ID, tenant (publisher) domain, and directory (tenant) ID from the app's registration in the Entra or Azure portal. The App ID URI is obtained for the `Weather.Get` scope from the web API's registration. Don't include the scope name when taking the App ID URI from the portal.

The authentication configuration depends on the type of tenant:

* Configuration for an ME-ID
* Configuration for Microsoft Entra External ID

### Configuration for an ME-ID

*This section applies to an app registered in a Microsoft Entra ID or Azure AAD B2C tenant.*

In the `BlazorWebAppEntra` project's `Program` file, provide the values for the following placeholders in Microsoft Identity Web configuration:

```csharp
builder.Services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApp(msIdentityOptions =>
    {
        msIdentityOptions.CallbackPath = "/signin-oidc";
        msIdentityOptions.ClientId = "{CLIENT ID (BLAZOR APP)}";
        msIdentityOptions.Domain = "{DIRECTORY NAME}.onmicrosoft.com";
        msIdentityOptions.Instance = "https://login.microsoftonline.com/";
        msIdentityOptions.ResponseType = "code";
        msIdentityOptions.TenantId = "{TENANT ID}";
    })
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddDownstreamApi("DownstreamApi", configOptions =>
    {
        configOptions.BaseUrl = "{BASE ADDRESS}";
        configOptions.Scopes = ["{APP ID URI}/Weather.Get"];
    })
    .AddDistributedTokenCaches();
```

Provide the same downstream API scope to the request transformer:

```csharp
List<string> scopes = ["{APP ID URI}/Weather.Get"];
```

Placeholders in the preceding configuration:

* `{CLIENT ID (BLAZOR APP)}`: The application (client) ID.
* `{DIRECTORY NAME}`: The directory name of the tenant (publisher) domain.
* `{TENANT ID}`: The directory (tenant) ID.
* `{BASE ADDRESS}`: The web API's base address.
* `{APP ID URI}`: The App ID URI for web API scopes. Either of the following formats are used, where the `{CLIENT ID (WEB API)}` placeholder is the Client Id of the web API's Entra registration, and the `{DIRECTORY NAME}` placeholder is the directory name of the tenant (publishers) domain (example: `contoso`).
  * ME-ID tenant format: `api://{CLIENT ID (WEB API)}`
  * B2C tenant format: `https://{DIRECTORY NAME}.onmicrosoft.com/{CLIENT ID (WEB API)}`

Example:

```csharp
builder.Services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApp(msIdentityOptions =>
    {
        msIdentityOptions.CallbackPath = "/signin-oidc";
        msIdentityOptions.ClientId = "00001111-aaaa-2222-bbbb-3333cccc4444";
        msIdentityOptions.Domain = "contoso.onmicrosoft.com";
        msIdentityOptions.Instance = "https://login.microsoftonline.com/";
        msIdentityOptions.ResponseType = "code";
        msIdentityOptions.TenantId = "aaaabbbb-0000-cccc-1111-dddd2222eeee";
    })
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddDownstreamApi("DownstreamApi", configOptions =>
    {
        configOptions.BaseUrl = "https://localhost:7277";
        configOptions.Scopes = 
            ["api://11112222-bbbb-3333-cccc-4444dddd5555/Weather.Get"];
    })
    .AddDistributedTokenCaches();
```

Example:

```csharp
List<string> scopes = ["api://11112222-bbbb-3333-cccc-4444dddd5555/Weather.Get"];
```

### Configuration for Microsoft Entra External ID

*This section applies to an app registered in a Microsoft Entra External ID tenant.*

In the `BlazorWebAppEntra` project's `Program` file, provide the values for the following placeholders in Microsoft Identity Web configuration:

```csharp
builder.Services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApp(msIdentityOptions =>
    {
        msIdentityOptions.CallbackPath = "/signin-oidc";
        msIdentityOptions.Authority = "https://{DIRECTORY NAME}.ciamlogin.com/{TENANT ID}/v2.0";
        msIdentityOptions.ClientId = "{CLIENT ID (BLAZOR APP)}";
        msIdentityOptions.ResponseType = "code";
    })
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddDownstreamApi("DownstreamApi", configOptions =>
    {
        configOptions.BaseUrl = "{BASE ADDRESS}";
        configOptions.Scopes = ["{APP ID URI}/Weather.Get"];
    })
    .AddDistributedTokenCaches();
```

Provide the same downstream API scope to the request transformer:

```csharp
List<string> scopes = ["{APP ID URI}/Weather.Get"];
```

Placeholders in the preceding configuration:

* `{DIRECTORY NAME}`: The directory name of the tenant (publisher) domain.
* `{CLIENT ID (BLAZOR APP)}`: The application (client) ID.
* `{BASE ADDRESS}`: The web API's base address.
* `{APP ID URI}`: The App ID URI for web API scopes. Either of the following formats are used, where the `{CLIENT ID (WEB API)}` placeholder is the Client Id of the web API's Entra registration, and the `{DIRECTORY NAME}` placeholder is the directory name of the tenant (publishers) domain (example: `contoso`).
  * ME-ID or Microsoft Entra External ID tenant format: `api://{CLIENT ID (WEB API)}`
  * B2C tenant format: `https://{DIRECTORY NAME}.onmicrosoft.com/{CLIENT ID (WEB API)}`

Example:

```csharp
builder.Services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApp(msIdentityOptions =>
    {
        msIdentityOptions.CallbackPath = "/signin-oidc";
        msIdentityOptions.Authority = "https://contoso.ciamlogin.com/aaaabbbb-0000-cccc-1111-dddd2222eeee/v2.0";
        msIdentityOptions.ClientId = "00001111-aaaa-2222-bbbb-3333cccc4444";
        msIdentityOptions.ResponseType = "code";
    })
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddDownstreamApi("DownstreamApi", configOptions =>
    {
        configOptions.BaseUrl = "https://localhost:7277";
        configOptions.Scopes = ["api://11112222-bbbb-3333-cccc-4444dddd5555/Weather.Get"];
    })
    .AddDistributedTokenCaches();
```

Example:

```csharp
List<string> scopes = ["api://11112222-bbbb-3333-cccc-4444dddd5555/Weather.Get"];
```

**without-yarp-and-aspire:**

This version of the article covers implementing Entra with the Backend for Frontend (BFF) pattern without YARP and Aspire. Change the article version selector to **With YARP and Aspire** if the app's specification calls for adopting YARP and Aspire.

The following specification is covered:

* The Blazor Web App uses the Auto render mode with global interactivity (`InteractiveAuto`).
* The server project calls `Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddAuthenticationStateSerialization*` to add a server-side authentication state provider that uses `Microsoft.AspNetCore.Components.PersistentComponentState` to flow the authentication state to the client. The client calls `Microsoft.Extensions.DependencyInjection.WebAssemblyAuthenticationServiceCollectionExtensions.AddAuthenticationStateDeserialization*` to deserialize and use the authentication state passed by the server. The authentication state is fixed for the lifetime of the WebAssembly application.
* The app uses Microsoft Entra ID, based on Microsoft Identity Web packages.
* Automatic non-interactive token <example-value> is managed by the framework.
* The Backend for Frontend (BFF) pattern is adopted for proxying requests to a weather forecast endpoint on the backend app. A backend web API uses JWT-bearer <example-value> to validate JWT tokens saved by the Blazor Web App in the sign-in cookie.
* The app uses server-side and client-side service abstractions to display generated weather data:
  * When rendering the `Weather` component on the server to display weather data, the component uses the `ServerWeatherForecaster`. Microsoft Identity Web packages provide API to create a named downstream web service for making web API calls. `Microsoft.Identity.Abstractions.IDownstreamApi` is injected into the `ServerWeatherForecaster`, which is used to call `Microsoft.Identity.Abstractions.IDownstreamApi.CallApiForUserAsync*` to obtain weather data from an external web API (`MinimalApiJwt` project).
  * When the `Weather` component is rendered on the client, the component uses the `ClientWeatherForecaster` service implementation, which uses a preconfigured `System.Net.Http.HttpClient` (in the client project's `Program` file) to make a web API call to the server project's Minimal API (`/weather-forecast`) for weather data. The Minimal API endpoint obtains the weather data from the `ServerWeatherForecaster` class and returns it to the client for rendering by the component.

## Sample solution

The sample solution consists of the following projects:

* `BlazorWebAppEntra`: Server-side project of the Blazor Web App, containing an example Minimal API endpoint for weather data.
* `BlazorWebAppEntra.Client`: Client-side project of the Blazor Web App.
* `MinimalApiJwt`: Backend web API, containing an example Minimal API endpoint for weather data.

Access the sample through the latest version folder in the Blazor samples repository with the following link. The sample is in the `BlazorWebAppEntraBff` folder for .NET 9 or later.

View or download sample code (how to download)

## Microsoft Entra ID app registrations

We recommend using separate registrations for apps and web APIs, even when the apps and web APIs are in the same solution. The following guidance is for the `BlazorWebAppEntra` app and `MinimalApiJwt` web API of the sample solution, but the same guidance applies generally to any Entra-based registrations for apps and web APIs.

For app and web API registration guidance, see Register an application in Microsoft Entra ID.

Register the web API (`MinimalApiJwt`) first so that you can then grant access to the web API when registering the app. The web API's tenant ID and client ID are used to configure the web API in its `Program` file. After registering the web API, expose the web API in **App registrations** > **Expose an API** with a scope name of `Weather.Get`. Record the App ID URI for use in the app's configuration.

Next, register the app (`BlazorWebAppEntra`) with a **Web** platform configuration with two entries under **Redirect URI**: `https://localhost/signin-oidc` and `https://localhost/signout-callback-oidc` (ports aren't required on these URIs). Set the **Front-channel logout URL** to `https://localhost/signout-callback-oidc` (a port isn't required). The app's tenant ID, tenant domain, and client ID, along with the web API's base address, App ID URI, and weather scope name, are used to configure the app in its `appsettings.json` file. Grant API permission to access the web API in **App registrations** > **API permissions**. If the app's security specification calls for it, you can grant admin consent for the organization to access the web API. Authorized users and groups are assigned to the app's registration in **App registrations** > **Enterprise applications**.

In the Entra or Azure portal'<example-value>'t select either checkbox for the authorization endpoint to return **Access tokens** or **ID tokens**. The OpenID Connect handler automatically requests the appropriate tokens using the code returned from the authorization endpoint.

Create a client secret in the app's registration in the Entra or Azure portal (**Manage** > **Certificates & secrets** > **New client secret**). Hold on to the client secret **Value** for use the next section.

Additional Entra configuration guidance for specific settings is provided later in this article.

## Server-side Blazor Web App project (`BlazorWebAppEntra`)

The `BlazorWebAppEntra` project is the server-side project of the Blazor Web App.

## Client-side Blazor Web App project (`BlazorWebAppEntra.Client`)

The `BlazorWebAppEntra.Client` project is the client-side project of the Blazor Web App.

If the user needs to log in or out during client-side rendering, a full page reload is initiated.

## Backend web API project (`MinimalApiJwt`)

The `MinimalApiJwt` project is a backend web API for multiple frontend projects. The project configures a Minimal API endpoint for weather data.

The `MinimalApiJwt.http` file can be used for testing the weather data request. Note that the `MinimalApiJwt` project must be running to test the endpoint, and the endpoint is hardcoded into the file. For more information, see Use .http files in Visual Studio 2022.

The project includes packages and configuration to produce OpenAPI documents.

A secure weather forecast data endpoint is in the project's `Program` file:

```csharp
app.MapGet("/weather-forecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
}).RequireAuthorization();
```

The `Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization*` extension method requires authorization for the route definition. For any controllers that you add to the project, add the `[Authorize]` attribute to the controller or action.
