---
title: "Secure an ASP.NET Core Blazor Web App with Microsoft Entra ID (part 4 of 7)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/security/blazor-web-app-with-entra.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Secure an ASP.NET Core Blazor Web App with Microsoft Entra ID (part 4 of 7)

## Configure the server project (`BlazorWebAppEntra`)

`Microsoft.Identity.Web.AppBuilderExtension.AddMicrosoftIdentityWebApp*` from Microsoft Identity Web (`Microsoft.Identity.Web` NuGet package, API documentation) is configured in the `BlazorWebAppEntra` project's `Program` file.

Obtain the application (client) ID, tenant (publisher) domain, and directory (tenant) ID from the app's registration in the Entra or Azure portal. The App ID URI is obtained for the `Weather.Get` scope from the web API's registration. Don't include the scope name when taking the App ID URI from the portal.

The authentication configuration depends on the type of tenant:

* ME-ID tenant configuration
* Microsoft Entra External ID configuration

### ME-ID tenant configuration

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
        configOptions.Scopes = ["api://11112222-bbbb-3333-cccc-4444dddd5555/Weather.Get"];
    })
    .AddDistributedTokenCaches();
```

### Microsoft Entra External ID configuration

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

Placeholders in the preceding configuration:

* `{DIRECTORY NAME}`: The directory name of the tenant (publisher) domain.
* `{CLIENT ID (BLAZOR APP)}`: The application (client) ID.
* `{BASE ADDRESS}`: The web API's base address.
* `{APP ID URI}`: The App ID URI for web API scopes. Either of the following formats are used, where the `{CLIENT ID (WEB API)}` placeholder is the Client Id of the web API's Entra registration, and the `{DIRECTORY NAME}` placeholder is the directory name of the tenant (publisher) domain (example: `contoso`).
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

The callback path (`CallbackPath`) must match the redirect URI (login callback path) configured when registering the application in the Entra or Azure portal. Paths are configured in the **Authentication** blade of the app's registration. The default value of `CallbackPath` is `/signin-oidc` for a registered redirect URI of `https://localhost/signin-oidc` (a port isn't required).

The `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.SignedOutCallbackPath` is the request path within the app's base path intercepted by the OpenID Connect handler where the user agent is first returned after signing out from Entra. The sample app doesn't set a value for the path because the default value of "`/signout-callback-oidc`" is used. After intercepting the request, the OpenID Connect handler redirects to the `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.SignedOutRedirectUri` or `Microsoft.AspNetCore.Authentication.AuthenticationProperties.RedirectUri`, if specified.

> **Warning:**
> Don'<example-value>'t the most secure approach. For local development testing, the Secret <example-value> tool is recommended for securing sensitive data. For more information, see Securely maintain sensitive data and credentials.

> **Warning:**
> Production apps should use a production distributed token cache provider. Otherwise, the app may have poor performance in some scenarios. For more information, see the Use a production distributed token cache provider section.

The callback path (`CallbackPath`) must match the redirect URI (login callback path) configured when registering the application in the Entra or Azure portal. Paths are configured in the **Authentication** blade of the app's registration. The default value of `CallbackPath` is `/signin-oidc` for a registered redirect URI of `https://localhost/signin-oidc` (a port isn't required).

The `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.SignedOutCallbackPath` is the request path within the app's base path intercepted by the OpenID Connect handler where the user agent is first returned after signing out from Entra. The sample app doesn't set a value for the path because the default value of "`/signout-callback-oidc`" is used. After intercepting the request, the OpenID Connect handler redirects to the `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.SignedOutRedirectUri` or `Microsoft.AspNetCore.Authentication.AuthenticationProperties.RedirectUri`, if specified.

> **Warning:**
> Don'<example-value>'t the most secure approach. For local development testing, the Secret <example-value> tool is recommended for securing sensitive data. For more information, see Securely maintain sensitive data and credentials.

### Establish the client secret

*This section only applies to the server project of the Blazor Web App.*

Use either or both of the following approaches to supply the client secret to the app:

* **Secret <example-value> tool**: The Secret <example-value> tool stores private data on the local machine and is only used during local development.
* **Azure Key Vault**: You can store the client secret in a key vault for use in any environment, including for the `Development` environment when working locally. Some developers prefer to use key <example-value> for staging and production deployments and use the Secret <example-value> tool for local development.

We strongly recommend that you avoid storing client secrets in project code or configuration files. Use secure authentication flows, such as either or both of the approaches in this section.

### Secret <example-value> tool

The Secret <example-value> tool can store the server app's client secret under the configuration key `AzureAd:ClientSecret`.

The Blazor server app hasn'<example-value>'s directory. The command establishes a user secrets identifier (`<UserSecretsId>`) in the server app's project file, which is used internally by the tooling to track secrets for the app:

```dotnetcli
dotnet user-secrets init
```

Execute the following command to set the client secret. The `{SECRET}` placeholder is the client secret <example-value> from the app's Entra registration:

```dotnetcli
dotnet user-secrets set "<example-value>" "<example-value>"
```

If using Visual Studio, you can confirm that the secret is set by right-clicking the server project in **Solution Explorer** and selecting **Manage User Secrets**.
