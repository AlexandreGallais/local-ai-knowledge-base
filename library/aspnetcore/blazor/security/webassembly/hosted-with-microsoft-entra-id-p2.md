---
title: "Secure a hosted ASP.NET Core Blazor WebAssembly app with Microsoft Entra ID (part 2 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/hosted-with-microsoft-entra-id.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Secure a hosted ASP.NET Core Blazor WebAssembly app with Microsoft Entra ID (part 2 of 4)

## Parts of the solution

This section describes the parts of a solution generated from the Blazor WebAssembly project template and describes how the solution's **:::no-loc text="Client":::** and **:::no-loc text="Server":::** projects are configured for reference. There's no specific guidance to follow in this section for a basic <example-value> application if you created the app using the guidance in the Walkthrough section. The guidance in this section is helpful for updating an app to authenticate and authorize users. However, an alternative approach to updating an app is to create a new app from the guidance in the Walkthrough section and moving the app's components, classes, and resources to the new app.

### `appsettings.json` configuration

*This section pertains to the solution's **:::no-loc text="Server":::** app.*

The `appsettings.json` file contains the options to configure the JWT bearer <example-value> used to validate access tokens. Add the following `AzureAd` configuration section:

```json
{
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "Domain": "{TENANT DOMAIN}",
    "TenantId": "{TENANT ID}",
    "ClientId": "{SERVER API APP CLIENT ID}",
    "CallbackPath": "/signin-oidc",
    "Scopes": "{SCOPES}"
  }
}
```

Example:

```json
{
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "Domain": "contoso.onmicrosoft.com",
    "TenantId": "aaaabbbb-0000-cccc-1111-dddd2222eeee",
    "ClientId": "00001111-aaaa-2222-bbbb-3333cccc4444",
    "CallbackPath": "/signin-oidc",
    "Scopes": "API.Access"
  }
}
```

> **Important:**
> If the **:::no-loc text="Server":::** app is registered to use a custom App ID URI in ME-ID (not in the default format `api://{SERVER API APP CLIENT ID}`), see the Use of a custom App ID URI section. Changes are required in both the **:::no-loc text="Server":::** and **:::no-loc text="Client":::** apps.

### Authentication package

*This section pertains to the solution's **:::no-loc text="Server":::** app.*

The support for authenticating and authorizing calls to ASP.NET Core web APIs with the Microsoft identity platform is provided by the `Microsoft.Identity.Web` package.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

The **:::no-loc text="Server":::** app of a hosted Blazor solution created from the Blazor WebAssembly template includes the `Microsoft.Identity.Web.UI` package. The package adds UI for user authentication in web apps and isn't used by the Blazor framework. If the **:::no-loc text="Server":::** app won't be used to authenticate users directly, it's safe to remove the package reference from the **:::no-loc text="Server":::** app's project file.

### Authentication service support

*This section pertains to the solution's **:::no-loc text="Server":::** app.*

The `AddAuthentication` method sets up authentication services within the app and configures the JWT bearer <example-value> as the default authentication method. The `Microsoft.Identity.Web.MicrosoftIdentityWebApiAuthenticationBuilderExtensions.AddMicrosoftIdentityWebApi*` method configures services to protect the web API with Microsoft identity platform v2.0. This method expects an `AzureAd` section in the app's configuration with the necessary settings to initialize authentication options.

```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(Configuration.GetSection("AzureAd"));
```

> **Note:**
> When a single authentication scheme is registered, the authentication scheme is automatically used as the app's default scheme, and it isn't necessary to state the scheme to `Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication*` or via `Microsoft.AspNetCore.Authentication.AuthenticationOptions`. For more information, see Overview of ASP.NET Core Authentication and the ASP.NET Core announcement (aspnet/Announcements #490).

`Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication*` and `Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization*` ensure that:

* The app attempts to parse and validate tokens on incoming requests.
* Any request attempting to access a protected resource without proper credentials fails.

```csharp
app.UseAuthentication();
app.UseAuthorization();
```

### :::no-loc text="WeatherForecast"::: controller

*This section pertains to the solution's **:::no-loc text="Server":::** app.*

The `WeatherForecast` controller (`Controllers/WeatherForecastController.cs`) exposes a protected API with the `[Authorize]` attribute applied to the controller. It's **important** to understand that:

* The `[Authorize]` attribute in this API controller is the only thing that protects this API from unauthorized access.
* The `[Authorize]` attribute used in the Blazor WebAssembly app only serves as a hint to the app that the user should be authorized for the app to work correctly.

```csharp
[Authorize]
[ApiController]
[Route("[controller]")]
[RequiredScope(RequiredScopesConfigurationKey = "AzureAd:Scopes")]
public class WeatherForecastController : ControllerBase
{
    [HttpGet]
    public IEnumerable<WeatherForecast> Get()
    {
        ...
    }
}
```

### `wwwroot/appsettings.json` configuration

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

Configuration is supplied by the `wwwroot/appsettings.json` file:

```json
{
  "AzureAd": {
    "Authority": "https://login.microsoftonline.com/{TENANT ID}",
    "ClientId": "{CLIENT APP CLIENT ID}",
    "ValidateAuthority": true
  }
}
```

Example:

```json
{
  "AzureAd": {
    "Authority": "https://login.microsoftonline.com/e86c78e2-...-918e0565a45e",
    "ClientId": "11112222-bbbb-3333-cccc-4444dddd5555",
    "ValidateAuthority": true
  }
}
```

### Authentication package

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

When an app is created to use Work or School Accounts (`SingleOrg`), the app automatically receives a package reference for the Microsoft Authentication Library (`Microsoft.Authentication.WebAssembly.Msal`). The package provides a set of primitives that help the app authenticate users and obtain tokens to call protected APIs.

If adding authentication to an app, manually add the `Microsoft.Authentication.WebAssembly.Msal` package to the app.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

The `Microsoft.Authentication.WebAssembly.Msal` package transitively adds the `Microsoft.AspNetCore.Components.WebAssembly.Authentication` package to the app.

### Authentication service support

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

Support for `System.Net.Http.HttpClient` instances is added that include access tokens when making requests to the **:::no-loc text="Server":::** app.

In the `Program` file:

```csharp
builder.Services.AddHttpClient("{PROJECT NAME}.ServerAPI", client => 
        client.BaseAddress = new Uri(builder.HostEnvironment.BaseAddress))
    .AddHttpMessageHandler<BaseAddressAuthorizationMessageHandler>();

builder.Services.AddScoped(sp => sp.GetRequiredService<IHttpClientFactory>()
    .CreateClient("{PROJECT NAME}.ServerAPI"));
```

The `{PROJECT NAME}` placeholder is the project name at solution creation. For example, providing a project name of `BlazorSample` produces a named `System.Net.Http.HttpClient` of `BlazorSample.ServerAPI`.

Support for authenticating users is registered in the service container with the `Microsoft.Extensions.DependencyInjection.MsalWebAssemblyServiceCollectionExtensions.AddMsalAuthentication*` extension method provided by the `Microsoft.Authentication.WebAssembly.Msal` package. This method sets up the services required for the app to interact with the Identity Provider (IP).

In the `Program` file:

```csharp
builder.Services.AddMsalAuthentication(options =>
{
    builder.Configuration.Bind("AzureAd", options.ProviderOptions.Authentication);
    options.ProviderOptions.DefaultAccessTokenScopes.Add("<example-value>");
});
```

The `Microsoft.Extensions.DependencyInjection.MsalWebAssemblyServiceCollectionExtensions.AddMsalAuthentication*` method accepts a callback to configure the parameters required to authenticate an app. The values required for configuring the app can be obtained from the Azure portal ME-ID configuration when you register the app.

### Access token <example-value>

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

The default access token <example-value> represent the list of access token <example-value> that are:

* Included in the sign in request.
* Used to provision an access token <example-value> after authentication.

Additional scopes can be added as needed in the `Program` file:

```csharp
builder.Services.AddMsalAuthentication(options =>
{
    ...
    options.ProviderOptions.DefaultAccessTokenScopes.Add("<example-value>");
});
```

Specify additional scopes with `AdditionalScopesToConsent`:

```csharp
options.ProviderOptions.AdditionalScopesToConsent.Add("{ADDITIONAL SCOPE URI}");
```

> **Note:**
> `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent` isn't able to provision delegated user permissions for Microsoft Graph via the Microsoft Entra ID consent UI when a user first uses an app registered in Microsoft Azure. For more information, see Use Graph API with ASP.NET Core Blazor WebAssembly.

Example default access token scope:

```csharp
options.ProviderOptions.DefaultAccessTokenScopes.Add(
    "api://00001111-aaaa-2222-bbbb-3333cccc4444/API.Access");
```

For more information, see the following sections of the *Additional scenarios* article:

* Request additional access tokens
* Attach tokens to outgoing requests

### Login mode

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

The framework defaults to pop-up login mode and falls back to redirect login mode if a pop-up can't be opened. Configure MSAL to use redirect login mode by setting the `LoginMode` property of `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions` to `redirect`:

```csharp
builder.Services.AddMsalAuthentication(options =>
{
    ...
    options.ProviderOptions.LoginMode = "redirect";
});
```

The default setting is `popup`, and the string value isn't case-sensitive.

### Imports file

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

The `Microsoft.AspNetCore.Components.Authorization` namespace is made available throughout the app via the imports file (`_Imports.razor`):

```razor
...
@using Microsoft.AspNetCore.Components.Authorization
...
```

### Index page

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

The Index page (`wwwroot/index.html`) page includes a script that defines the `AuthenticationService` in JavaScript. `AuthenticationService` handles the low-level details of the OIDC protocol. The app internally calls methods defined in the script to perform the authentication operations.

```html
<script src="_content/Microsoft.Authentication.WebAssembly.Msal/AuthenticationService.js"></script>
```

### App component

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

The `App` component (`App.razor`) is similar to the `App` component found in Blazor Server apps:

* The `Microsoft.AspNetCore.Components.Authorization.CascadingAuthenticationState` component manages exposing the `Microsoft.AspNetCore.Components.Authorization.AuthenticationState` to the rest of the app.
* The `Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView` component makes sure that the current user is authorized to access a given page or otherwise renders the `RedirectToLogin` component.
* The `RedirectToLogin` component manages redirecting unauthorized users to the login page.

Due to changes in the framework across releases of ASP.NET Core, Razor markup for the `App` component (`App.razor`) isn't shown in this section. To inspect the markup of the component for a given release, use ***either*** of the following approaches:

* Create an app provisioned for authentication from the default Blazor WebAssembly project template for the version of ASP.NET Core that you intend to use. Inspect the `App` component (`App.razor`) in the generated app.
* Inspect the `App` component (`App.razor`) in reference source. Select the version from the branch selector, and search for the component in the `ProjectTemplates` folder of the repository because the `App` component's location has changed over the years.

  > **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

### RedirectToLogin component

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

The `RedirectToLogin` component (`RedirectToLogin.razor`):

* Manages redirecting unauthorized users to the login page.
* The current URL that the user is attempting to access is maintained so that they can be returned to that page if authentication is successful using:
  * Navigation history state in ASP.NET Core in .NET 7 or later.
  * A query string in ASP.NET Core in .NET 6 or earlier.

Inspect the `RedirectToLogin` component in reference source. The location of the component changed over time, so use GitHub search tools to locate the component.
