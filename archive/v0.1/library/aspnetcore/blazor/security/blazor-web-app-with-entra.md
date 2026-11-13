---
title: "Secure an ASP.NET Core Blazor Web App with Microsoft Entra ID (part 1 of 7)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/blazor-web-app-with-entra.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Secure an ASP.NET Core Blazor Web App with Microsoft Entra ID

-->
-->

-->

> **Note:**
> Azure Active Directory B2C is no longer available as a service to new customers as of May 1, 2025. For more information, see Azure AD B2C: Frequently asked questions (FAQ).

This article describes how to secure a Blazor Web App with Microsoft identity platform with Microsoft Identity Web packages for Microsoft Entra ID using a sample app.

**with-yarp-and-aspire:**

This version of the article covers implementing Entra with the Backend for Frontend (BFF) pattern with YARP and Aspire. Change the article version selector to **Without YARP and Aspire** if the app's specification doesn't call for adopting YARP and Aspire.

The following specification is covered:

* The Blazor Web App uses the Auto render mode with global interactivity (`InteractiveAuto`).
* The server project calls `Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddAuthenticationStateSerialization*` to add a server-side authentication state provider that uses `Microsoft.AspNetCore.Components.PersistentComponentState` to flow the authentication state to the client. The client calls `Microsoft.Extensions.DependencyInjection.WebAssemblyAuthenticationServiceCollectionExtensions.AddAuthenticationStateDeserialization*` to deserialize and use the authentication state passed by the server. The authentication state is fixed for the lifetime of the WebAssembly application.
* The app uses Microsoft Entra ID, based on Microsoft Identity Web packages.
* Automatic non-interactive token <example-value> is managed by the framework.
* The Backend for Frontend (BFF) pattern is adopted using Aspire for service discovery and YARP for proxying requests to a weather forecast endpoint on the backend app.
  * A backend web API uses JWT-bearer <example-value> to validate JWT tokens saved by the Blazor Web App in the sign-in cookie.
  * Aspire improves the experience of building .NET cloud-native apps. It provides a consistent, opinionated set of tools and patterns for building and running distributed apps.
  * YARP (Yet Another Reverse Proxy) is a library used to create a reverse proxy server.
* The app uses server-side and client-side service abstractions to display generated weather data.
  * When rendering the `Weather` component on the server to display weather data, the component uses the `ServerWeatherForecaster`. Microsoft Identity Web packages provide API to create a named downstream web service for making web API calls. `Microsoft.Identity.Abstractions.IDownstreamApi` is injected into the `ServerWeatherForecaster`, which is used to call `Microsoft.Identity.Abstractions.IDownstreamApi.CallApiForUserAsync*` to obtain weather data from an external web API (`MinimalApiJwt` project).
  * When the `Weather` component is rendered on the client, the component uses the `ClientWeatherForecaster` service implementation, which uses a preconfigured `System.Net.Http.HttpClient` (in the client project'<example-value>'s Minimal API (`/weather-forecast`) for weather data. The Minimal API endpoint obtains an access token for the user by calling `Microsoft.Identity.Web.ITokenAcquisition.GetAccessTokenForUserAsync*`. Along with the correct scopes, a reverse proxy call is made to the external web API (`MinimalApiJwt` project) to obtain and return weather data to the client for rendering by the component.

## Prerequisites

Aspire requires Visual Studio version 17.10 or later.

Also, see the *Prerequisites* section of Quickstart: Build your first Aspire solution.

## Sample solution

The sample solution consists of the following projects:

* Aspire:
  * `Aspire.AppHost`: Used to manage the high-level orchestration concerns of the app.
  * `Aspire.ServiceDefaults`: Contains default Aspire app configurations that can be extended and customized as needed.
* `MinimalApiJwt`: Backend web API, containing an example Minimal API endpoint for weather data.
* `BlazorWebAppEntra`: Server-side project of the Blazor Web App.
* `BlazorWebAppEntra.Client`: Client-side project of the Blazor Web App.

Access the sample through the latest version folder in the Blazor samples repository with the following link. The sample is in the `BlazorWebAppEntraBffYarpAspire` folder for .NET 9 or later.

Start the solution from the ***`Aspire/Aspire.AppHost` project***.

View or download sample code (how to download)

## Microsoft Entra ID app registrations

We recommend using separate registrations for apps and web APIs, even when the apps and web APIs are in the same solution. The following guidance is for the `BlazorWebAppEntra` app and `MinimalApiJwt` web API of the sample solution, but the same guidance applies generally to any Entra-based registrations for apps and web APIs.

For app and web API registration guidance, see Register an application in Microsoft Entra ID.

Register the web API (`MinimalApiJwt`) first so that you can then grant access to the web API when registering the app. The web API's tenant ID and client ID are used to configure the web API in its `Program` file. After registering the web API, expose the web API in **App registrations** > **Expose an API** with a scope name of `Weather.Get`. Record the App ID URI for use in the app's configuration.

Next, register the app (`BlazorWebAppEntra`) with a **Web** platform configuration with two entries under **Redirect URI**: `https://localhost/signin-oidc` and `https://localhost/signout-callback-oidc` (ports aren't required on these URIs). Set the **Front-channel logout URL** to `https://localhost/signout-callback-oidc` (a port isn't required). The app's tenant ID, tenant domain, and client ID, along with the web API's base address, App ID URI, and weather scope name, are used to configure the app in its `appsettings.json` file. Grant API permission to access the web API in **App registrations** > **API permissions**. If the app's security specification calls for it, you can grant admin consent for the organization to access the web API. Authorized users and groups are assigned to the app's registration in **App registrations** > **Enterprise applications**.

In the Entra or Azure portal'<example-value>'t select either checkbox for the authorization endpoint to return **Access tokens** or **ID tokens**. The OpenID Connect handler automatically requests the appropriate tokens using the code returned from the authorization endpoint.

Create a client secret in the app's registration in the Entra or Azure portal (**Manage** > **Certificates & secrets** > **New client secret**). Hold on to the client secret **Value** for use the next section.

Additional Entra configuration guidance for specific settings is provided later in this article.

## Aspire projects

For more information on using Aspire and details on the `.AppHost` and `.ServiceDefaults` projects of the sample app, see the Aspire documentation.

Confirm that you've met the prerequisites for Aspire. For more information, see the *Prerequisites* section of Quickstart: Build your first Aspire solution.

The sample app only configures an insecure HTTP launch profile (`http`) for use during development testing.

## Server-side Blazor Web App project (`BlazorWebAppEntra`)

The `BlazorWebAppEntra` project is the server-side project of the Blazor Web App.

## Client-side Blazor Web App project (`BlazorWebAppEntra.Client`)

The `BlazorWebAppEntra.Client` project is the client-side project of the Blazor Web App.

If the user needs to log in or out during client-side rendering, a full page reload is initiated.

## Backend web API project (`MinimalApiJwt`)

The `MinimalApiJwt` project is a backend web API for multiple frontend projects. The project configures a Minimal API endpoint for weather data. Requests from the Blazor Web App server-side project (`BlazorWebAppEntra`) are proxied to the `MinimalApiJwt` project.

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

## Configure the backend web API project (`MinimalApiJwt`)

Configure the `MinimalApiJwt` project in the `Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions` of the `Microsoft.Extensions.DependencyInjection.JwtBearerExtensions.AddJwtBearer*` call in the project's `Program` file.

For the web API app's registration, the `Weather.Get` scope is configured in the Entra or Azure portal in **Expose an API**.

`Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Authority` sets the Authority for making OIDC calls.

```csharp
jwtOptions.Authority = "{AUTHORITY}";
```

The following examples use a Tenant ID of `aaaabbbb-0000-cccc-1111-dddd2222eeee` and a directory name of `contoso`.

If the app is registered in an ME-ID tenant, the authority should match the issuer (`iss`) of the JWT returned by the identity provider.

V1 STS token <example-value>:

```csharp
jwtOptions.Authority = "https://sts.windows.net/aaaabbbb-0000-cccc-1111-dddd2222eeee/";
```

V2 STS token <example-value>:

```csharp
jwtOptions.Authority = "https://login.microsoftonline.com/aaaabbbb-0000-cccc-1111-dddd2222eeee/v2.0";
```

For more information on V2 STS tokens, see the STS token <example-value> section.

If the app is registered in a Microsoft Entra External ID tenant:

```csharp
jwtOptions.Authority = "https://contoso.ciamlogin.com/aaaabbbb-0000-cccc-1111-dddd2222eeee/v2.0";
```

If the app is registered in an AAD B2C tenant:

```csharp
jwtOptions.Authority = "https://login.microsoftonline.com/aaaabbbb-0000-cccc-1111-dddd2222eeee/v2.0";
```

> **Note:**
> Azure Active Directory B2C is no longer available as a service to new customers as of May 1, 2025. AAD B2C tenants are supported for customers with accounts established prior to May 1, 2025 until 2030. For more information, see Azure AD B2C: Frequently asked questions (FAQ).

`Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Audience` sets the Audience for any received JWT access token.

```csharp
jwtOptions.Audience = "{AUDIENCE}";
```

Match the value to just the path of the **Application ID URI** configured when adding the `Weather.Get` scope under **Expose an API** in the Entra or Azure portal. Don't include the scope name, "`Weather.Get`," in the value.

The following examples use an Application (Client) Id of `11112222-bbbb-3333-cccc-4444dddd5555`. The third example uses a tenant domain of `contoso.onmicrosoft.com`.

ME-ID tenant example:

```csharp
jwtOptions.Audience = "api://11112222-bbbb-3333-cccc-4444dddd5555";
```

Microsoft Entra External ID tenant:

```csharp
jwtOptions.Audience = "11112222-bbbb-3333-cccc-4444dddd5555";
```

AAD B2C tenant example:

```csharp
jwtOptions.Audience = "https://contoso.onmicrosoft.com/11112222-bbbb-3333-cccc-4444dddd5555";
```
