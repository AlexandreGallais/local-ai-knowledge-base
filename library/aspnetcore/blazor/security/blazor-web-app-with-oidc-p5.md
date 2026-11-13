---
title: "Secure an ASP.NET Core Blazor Web App with OpenID Connect (OIDC) (part 5 of 9)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/blazor-web-app-with-oidc.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Secure an ASP.NET Core Blazor Web App with OpenID Connect (OIDC) (part 5 of 9)

## Microsoft Entra ID app registrations

We recommend using separate registrations for apps and web APIs, even when the apps and web APIs are in the same solution. The following guidance is for the `BlazorWebAppOidcServer` app and `MinimalApiJwt` web API of the sample solution, but the same guidance applies generally to any Entra-based registrations for apps and web APIs.

Register the web API (`MinimalApiJwt`) first so that you can then grant access to the web API when registering the app. The web API's tenant ID and client ID are used to configure the web API in its `Program` file. After registering the web API, expose the web API in **App registrations** > **Expose an API** with a scope name of `Weather.Get`. Record the App ID URI for use in the app's configuration.

Next, register the app (`BlazorWebAppOidcServer`) with a **Web** platform configuration and a **Redirect URI** of `https://localhost/signin-oidc` (a port isn't required). The app's tenant ID and client ID, along with the web API's base address, App ID URI, and weather scope name, are used to configure the app in its `Program` file. Grant API permission to access the web API in **App registrations** > **API permissions**. If the app's security specification calls for it, you can grant admin consent for the organization to access the web API. Authorized users and groups are assigned to the app's registration in **App registrations** > **Enterprise applications**.

In the Entra or Azure portal's **Implicit grant and hybrid flows** app registration configuration, don't select either checkbox for the authorization endpoint to return **Access tokens** or **ID tokens**. The OpenID Connect handler automatically requests the appropriate tokens using the code returned from the authorization endpoint.

Create a client secret in the app's registration in the Entra or Azure portal (**Manage** > **Certificates & secrets** > **New client secret**). Hold on to the client secret **Value** for use the next section.

Additional Entra configuration guidance for specific settings is provided later in this article.

## Establish the client secret

*This section only applies to the server project of the Blazor Web App (`BlazorWebAppOidcServer` project).*

> **Warning:**
> Don't store app secrets, connection strings, credentials, passwords, personal identification numbers (PINs), private C#/.NET code, or private keys/tokens in client-side code, which is ***always insecure***. In test/staging and production environments, server-side Blazor code and web APIs should use secure authentication flows that avoid maintaining credentials within project code or configuration files. Outside of local development testing, we recommend avoiding the use of environment variables to store sensitive data, as environment variables aren't the most secure approach. For local development testing, the Secret Manager tool is recommended for securing sensitive data. For more information, see Securely maintain sensitive data and credentials.

For local development testing, use the Secret Manager tool to store the Blazor server project's client secret under the configuration key `Authentication:Schemes:MicrosoftOidc:ClientSecret`.

The Blazor server project hasn't been initialized for the Secret Manager tool. Use a command shell, such as the Developer PowerShell command shell in Visual Studio, to execute the following command. Before executing the command, change the directory with the `cd` command to the server project's directory. The command establishes a user secrets identifier (`<UserSecretsId>` in the app's project file):

```dotnetcli
dotnet user-secrets init
```

Execute the following command to set the client secret. The `{SECRET}` placeholder is the client secret obtained from the app's registration:

```dotnetcli
dotnet user-secrets set "Authentication:Schemes:MicrosoftOidc:ClientSecret" "{SECRET}"
```

If using Visual Studio, you can confirm the secret is set by right-clicking the project in **Solution Explorer** and selecting **Manage User Secrets**.

## `MinimalApiJwt` project

The `MinimalApiJwt` project is a backend web API for multiple frontend projects. The project configures a Minimal API endpoint for weather data.

The `MinimalApiJwt.http` file can be used for testing the weather data request. Note that the `MinimalApiJwt` project must be running to test the endpoint, and the endpoint is hardcoded into the file. For more information, see Use .http files in Visual Studio 2022.

The project includes packages and configuration to produce OpenAPI documents.

The project creates a Minimal API endpoint for weather data:

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

Configure the project in the `Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions` of the `Microsoft.Extensions.DependencyInjection.JwtBearerExtensions.AddJwtBearer*` call in the project's `Program` file.

The `Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Authority` sets the Authority for making OIDC calls. We recommend using a separate app registration for the `MinimalApiJwt` project. The authority matches the issurer (`iss`) of the JWT returned by the identity provider.

```csharp
jwtOptions.Authority = "{AUTHORITY}";
```

The format of the Authority depends on the type of tenant in use. The following examples for Microsoft Entra ID use a Tenant ID of `aaaabbbb-0000-cccc-1111-dddd2222eeee`.

ME-ID tenant Authority example:

```csharp
jwtOptions.Authority = "https://sts.windows.net/aaaabbbb-0000-cccc-1111-dddd2222eeee/";
```

The preceding example uses the V1 STS token URL format. For guidance on V2 STS tokens, see Secure an ASP.NET Core Blazor Web App with Microsoft Entra ID.

AAD B2C tenant Authority example:

```csharp
jwtOptions.Authority = "https://login.microsoftonline.com/aaaabbbb-0000-cccc-1111-dddd2222eeee/v2.0";
```

The `Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Audience` sets the Audience for any received OIDC token.

```csharp
jwtOptions.Audience = "{APP ID URI}";
```

> **Note:**
> When using Microsoft Entra ID, match the value to just the path of the **Application ID URI** configured when adding the `Weather.Get` scope under **Expose an API** in the Entra or Azure portal. Don't include the scope name, "`Weather.Get`," in the value.

The format of the Audience depends on the type of tenant in use. The following examples for Microsoft Entra ID use a Tenant ID of `contoso` and a Client ID of `11112222-bbbb-3333-cccc-4444dddd5555`.

ME-ID tenant App ID URI example:

```csharp
jwtOptions.Audience = "api://11112222-bbbb-3333-cccc-4444dddd5555";
```

AAD B2C tenant App ID URI example:

```csharp
jwtOptions.Audience = "https://contoso.onmicrosoft.com/11112222-bbbb-3333-cccc-4444dddd5555";
```
