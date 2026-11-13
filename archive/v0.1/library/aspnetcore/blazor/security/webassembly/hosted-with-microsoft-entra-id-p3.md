---
title: "Secure a hosted ASP.NET Core Blazor WebAssembly app with Microsoft Entra ID (part 3 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/hosted-with-microsoft-entra-id.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Secure a hosted ASP.NET Core Blazor WebAssembly app with Microsoft Entra ID (part 3 of 4)

### LoginDisplay component

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

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

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

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

### FetchData component

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

The `FetchData` component shows how to:

* Provision an access token.
* Use the access token to call a protected resource API in the *Server* app.

The `@attribute [Authorize]` directive indicates to the Blazor WebAssembly authorization system that the user must be authorized in order to visit this component. The presence of the attribute in the **`Client`** app doesn't prevent the API on the server from being called without proper credentials. The **`Server`** app also must use `[Authorize]` on the appropriate endpoints to correctly protect them.

`Microsoft.AspNetCore.Components.WebAssembly.Authentication.IAccessTokenProvider.RequestAccessToken*` takes care of requesting an access token that can be added to the request to call the API. If the token is cached or the service is able to provision a new access token <example-value> user interaction, the token <example-value> succeeds. Otherwise, the token <example-value> fails with an `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException`, which is caught in a `try-catch` statement.

In order to obtain the actual token to include in the request, the app must check that the request succeeded by calling `tokenResult.TryGetToken(out var token)`.

If the request was successful, the token <example-value> is populated with the access token. The `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessToken.Value` property of the token <example-value> the literal string to include in the `Authorization` request header.

If the token <example-value>'t be provisioned without user interaction resulting in a failed request:

* ASP.NET Core in .NET 7 or later: The app navigates to `AccessTokenResult.InteractiveRequestUrl` using the given `AccessTokenResult.InteractionOptions` to allow refreshing the access token.
* ASP.NET Core in .NET 6 or earlier: The token <example-value> contains a redirect URL. Navigating to this URL takes the user to the login page and back to the current page after a successful authentication.

```razor
@page "/fetchdata"
@using Microsoft.AspNetCore.Authorization
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication
@using {APP NAMESPACE}.Shared
@attribute [Authorize]
@inject HttpClient Http

...

@code {
    private WeatherForecast[] forecasts;

    protected override async Task OnInitializedAsync()
    {
        try
        {
            forecasts = await Http.GetFromJsonAsync<WeatherForecast[]>("WeatherForecast");
        }
        catch (AccessTokenNotAvailableException exception)
        {
            exception.Redirect();
        }
    }
}
```

## Use of an Azure Active Directory B2C tenant

If the app is registered in an **Azure Active Directory B2C** tenant, as described in Tutorial: Create an Azure Active Directory B2C tenant but follows the guidance in this article, the App ID URI is managed differently by ME-ID.

You can check the tenant type of an existing tenant by selecting the **Manage tenants** link at the top of the ME-ID organization **Overview**. Examine the **Tenant type** column value for the organization. This section pertains to apps that follow the guidance in this article but that are registered in an **Azure Active Directory B2C** tenant.

Instead of the App ID URI matching the format `api://{SERVER API APP CLIENT ID OR CUSTOM VALUE}`, the App ID URI has the format `https://{TENANT}.onmicrosoft.com/{SERVER API APP CLIENT ID OR CUSTOM VALUE}`. This difference affects **:::no-loc text="Client":::** and **:::no-loc text="Server":::** app configurations:

* For the server API app, set the `Audience` in the app settings file (`appsettings.json`) to match the app's audience (App ID URI) provided by the Azure portal with no trailing slash:

  ```json
  "Audience": "https://{TENANT}.onmicrosoft.com/{SERVER API APP CLIENT ID OR CUSTOM VALUE}"
  ```

  Example:

  ```json
  "Audience": "https://contoso.onmicrosoft.com/00001111-aaaa-2222-bbbb-3333cccc4444"
  ```

* In the `Program` file of the **`Client`** app, set the audience of the scope (App ID URI) to match the server API app's audience:

  ```csharp
  options.ProviderOptions.DefaultAccessTokenScopes
      .Add("https://{TENANT}.onmicrosoft.com/{SERVER API APP CLIENT ID OR CUSTOM VALUE}/{DEFAULT SCOPE}");
  ```

  In the preceding scope, the App ID URI/audience is the `https://{TENANT}.onmicrosoft.com/{SERVER API APP CLIENT ID OR CUSTOM VALUE}` portion of the value, which doesn't include a trailing slash (`/`) and doesn't include the scope name (`{DEFAULT SCOPE}`).

  Example:

  ```csharp
  options.ProviderOptions.DefaultAccessTokenScopes
      .Add("https://contoso.onmicrosoft.com/00001111-aaaa-2222-bbbb-3333cccc4444/API.Access");
  ```

  In the preceding scope, the App ID URI/audience is the `https://contoso.onmicrosoft.com/00001111-aaaa-2222-bbbb-3333cccc4444` portion of the value, which doesn't include a trailing slash (`/`) and doesn't include the scope name (`API.Access`).

## Use of a custom App ID URI

If the App ID URI is a custom value, you must manually update the default access token scope URI in the **:::no-loc text="Client":::** app and add the audience to the **:::no-loc text="Server":::** app's ME-ID configuration.

> **Important:**
> The following configuration isn't required when using the default App ID URI of `api://{SERVER API APP CLIENT ID}`.

Example App ID URI of `urn://custom-app-id-uri` and a scope name of `API.Access`:

* In the `Program` file of the **:::no-loc text="Client":::** app:

  ```csharp
  options.ProviderOptions.DefaultAccessTokenScopes.Add(
      "urn://custom-app-id-uri/API.Access");
  ```

* In `appsettings.json` of the **:::no-loc text="Server":::** app, add an `Audience` entry with **only** the App ID URI and no trailing slash:

  ```json
  "Audience": "urn://custom-app-id-uri"
  ```
