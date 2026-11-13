---
title: "Secure an ASP.NET Core Blazor WebAssembly standalone app with Microsoft Accounts (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/standalone-with-microsoft-accounts.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Secure an ASP.NET Core Blazor WebAssembly standalone app with Microsoft Accounts (part 2 of 3)

## Parts of the app

This section describes the parts of an app generated from the Blazor WebAssembly project template and how the app is configured. There's no specific guidance to follow in this section for a basic <example-value> application if you created the app using the guidance in the Walkthrough section. The guidance in this section is helpful for updating an app to authenticate and authorize users. However, an alternative approach to updating an app is to create a new app from the guidance in the Walkthrough section and moving the app's components, classes, and resources to the new app.

### Authentication package

When an app is created to use Work or School Accounts (`SingleOrg`), the app automatically receives a package reference for the Microsoft Authentication Library (`Microsoft.Authentication.WebAssembly.Msal`). The package provides a set of primitives that help the app authenticate users and obtain tokens to call protected APIs.

If adding authentication to an app, manually add the `Microsoft.Authentication.WebAssembly.Msal` package to the app.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

The `Microsoft.Authentication.WebAssembly.Msal` package transitively adds the `Microsoft.AspNetCore.Components.WebAssembly.Authentication` package to the app.

### Authentication service support

Support for authenticating users is registered in the service container with the `Microsoft.Extensions.DependencyInjection.MsalWebAssemblyServiceCollectionExtensions.AddMsalAuthentication*` extension method provided by the `Microsoft.Authentication.WebAssembly.Msal` package. This method sets up all of the services required for the app to interact with the Identity Provider (IP).

In the `Program` file:

```csharp
builder.Services.AddMsalAuthentication(options =>
{
    builder.Configuration.Bind("AzureAd", options.ProviderOptions.Authentication);
});
```

The `Microsoft.Extensions.DependencyInjection.MsalWebAssemblyServiceCollectionExtensions.AddMsalAuthentication*` method accepts a callback to configure the parameters required to authenticate an app. The values required for configuring the app can be obtained from the ME-ID configuration when you register the app.

### `wwwroot/appsettings.json` configuration

Configuration is supplied by the `wwwroot/appsettings.json` file:

```json
{
  "AzureAd": {
    "Authority": "https://login.microsoftonline.com/common",
    "ClientId": "{CLIENT ID}",
    "ValidateAuthority": true
  }
}
```

Example:

```json
{
  "AzureAd": {
    "Authority": "https://login.microsoftonline.com/common",
    "ClientId": "00001111-aaaa-2222-bbbb-3333cccc4444",
    "ValidateAuthority": true
  }
}
```

### Access token <example-value>

The Blazor WebAssembly template doesn't automatically configure the app to request an access token for a secure API. To provision an access token as part of the sign-in flow, add the scope to the default access token <example-value> of the `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions`:

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
> `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent`  for Microsoft Graph via the Microsoft Entra ID consent UI when a user first uses an app registered in Microsoft Azure. For more information, see Use Graph API with ASP.NET Core Blazor WebAssembly.

For more information, see the following sections of the *Additional scenarios* article:

* Request additional access tokens
* Attach tokens to outgoing requests
* Quickstart: Configure an application to expose web APIs

### Login mode

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

The `Microsoft.AspNetCore.Components.Authorization` namespace is made available throughout the app via the imports file (`_Imports.razor`):

```razor
...
@using Microsoft.AspNetCore.Components.Authorization
...
```

### Index page

The Index page (`wwwroot/index.html`) page includes a script that defines the `AuthenticationService` in JavaScript. `AuthenticationService` handles the low-level details of the OIDC protocol. The app internally calls methods defined in the script to perform the authentication operations.

```html
<script src="_content/Microsoft.Authentication.WebAssembly.Msal/AuthenticationService.js"></script>
```

### App component

The `App` component (`App.razor`) is similar to the `App` component found in Blazor Server apps:

* The `Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView` component makes sure that the current user is authorized to access a given page or otherwise renders the `RedirectToLogin` component.
* The `RedirectToLogin` component manages redirecting unauthorized users to the login page.

Due to changes in the framework across releases of ASP.NET Core, Razor markup for the `App` component (`App.razor`) isn't shown in this section. To inspect the markup of the component for a given release, use ***either*** of the following approaches:

* Create an app provisioned for authentication from the default Blazor WebAssembly project template for the version of ASP.NET Core that you intend to use. Inspect the `App` component (`App.razor`) in the generated app.
* Inspect the `App` component (`App.razor`) in reference source. Select the version from the branch selector, and search for the component in the `ProjectTemplates` folder of the repository because it has moved over the years.

  > **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

### RedirectToLogin component

The `RedirectToLogin` component (`RedirectToLogin.razor`):

* Manages redirecting unauthorized users to the login page.
* The current URL that the user is attempting to access is maintained so that they can be returned to that page if authentication is successful using:
  * Navigation history state in ASP.NET Core in .NET 7 or later.
  * A query string in ASP.NET Core in .NET 6 or earlier.

Inspect the `RedirectToLogin` component in reference source. The location of the component changed over time, so use GitHub search tools to locate the component.

### LoginDisplay component

The `LoginDisplay` component (`LoginDisplay.razor`) is rendered in the `MainLayout` component (`MainLayout.razor`) and manages the following behaviors:

* For authenticated users:
  * Displays the current user name.
  * Offers a link to the user profile page in ASP.NET Core Identity.
  * Offers a button to log out of the app.
* For anonymous users:
  * Offers the option to register.
  * Offers the option to log in.

Due to changes in the framework across releases of ASP.NET Core, Razor markup for the `LoginDisplay` component isn't shown in this section. To inspect the markup of the component for a given release, use ***either*** of the following approaches:

* Create an app provisioned for authentication from the default Blazor WebAssembly project template for the version of ASP.NET Core that you intend to use. Inspect the `LoginDisplay` component in the generated app.
* Inspect the `LoginDisplay` component in reference source. The location of the component changed over time, so use GitHub search tools to locate the component. The templated content for `Hosted` equal to `true` is used.

  > **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

### Authentication component

The page produced by the `Authentication` component (`Pages/Authentication.razor`) defines the routes required for handling different authentication stages.

The `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticatorView` component:

* Is provided by the `Microsoft.AspNetCore.Components.WebAssembly.Authentication` package.
* Manages performing the appropriate actions at each stage of authentication.

```razor
@page "/authentication/{action}"
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication

<RemoteAuthenticatorView Action="@Action" />

@code {
    [Parameter]
    public string? Action { get; set; }
}
```

> **Note:**
> Nullable reference types (NRTs) and .NET compiler null-state static analysis is supported in ASP.NET Core in .NET 6 or later. Prior to the release of ASP.NET Core in .NET 6, the `string` type appears without the null type designation (`?`).
