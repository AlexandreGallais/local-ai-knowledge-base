---
title: "ASP.NET Core Blazor Hybrid authentication and authorization (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/hybrid/security/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor Hybrid authentication and authorization

-->
-->

This article describes ASP.NET Core's support for the configuration and management of security and ASP.NET Core Identity in Blazor Hybrid apps.

Authentication in Blazor Hybrid apps is handled by native platform libraries, as they offer enhanced security guarantees that the browser sandbox can't offer. Authentication of native apps uses an OS-specific mechanism or via a federated protocol, such as OpenID Connect (OIDC). Follow the guidance for the identity provider that you've selected for the app and then further integrate identity with Blazor using the guidance in this article.

Integrating authentication must achieve the following goals for Razor components and services:

* Use the abstractions in the `Microsoft.AspNetCore.Components.Authorization` package, such as `Microsoft.AspNetCore.Components.Authorization.AuthorizeView`.
* React to changes in the authentication context.
* Access credentials <example-value> by the app from the identity provider, such as access tokens to perform authorized API calls.

After authentication is added to a .NET MAUI, WPF, or Windows Forms app and users are able to log in and log out successfully, integrate authentication with Blazor to make the authenticated user available to Razor components and services. Perform the following steps:

* Reference the `Microsoft.AspNetCore.Components.Authorization` package.

  > **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

* Implement a custom `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider`, which is the abstraction that Razor components use to access information about the authenticated user and to receive updates when the authentication state changes.
* Register the custom authentication state provider in the dependency injection container.

**maui:**

.NET MAUI apps use the `WebAuthenticator` class to initiate browser-based authentication flows that listen for a callback to a specific URL registered with the app.

For additional guidance, see the following resources:

* Web authenticator (.NET MAUI documentation)
* `Sample.Server.WebAuthenticator` sample app

**wpf:**

WPF apps use the Microsoft identity platform to integrate with Microsoft Entra (ME-ID) and AAD B2C. For guidance and examples, see the following resources:

* Overview of the Microsoft Authentication Library (MSAL)
* Add authentication to your Windows (WPF) app
* Tutorial: Sign in users and call Microsoft Graph in Windows Presentation Foundation (WPF) desktop app
* Quickstart: Acquire a token and call Microsoft Graph API from a desktop application
* Quickstart: Set up sign in for a desktop app using Azure Active Directory B2C
* Configure authentication in a sample WPF desktop app by using Azure AD B2C

> **Note:**
> Azure Active Directory B2C is no longer available as a service to new customers as of May 1, 2025. For more information, see Azure AD B2C: Frequently asked questions (FAQ).

**winforms:**

Windows Forms apps use the Microsoft identity platform to integrate with Microsoft Entra (ME-ID) and AAD B2C. For more information, see Overview of the Microsoft Authentication Library (MSAL).

> **Note:**
> Azure Active Directory B2C is no longer available as a service to new customers as of May 1, 2025. For more information, see Azure AD B2C: Frequently asked questions (FAQ).

## Create a custom `AuthenticationStateProvider` without user change updates

If the app authenticates the user immediately after the app launches and the authenticated user remains the same for the entirety of the app lifetime, user change notifications aren't required, and the app only provides information about the authenticated user. In this scenario, the user logs into the app when the app is opened, and the app displays the login screen again after the user logs out. The following `ExternalAuthStateProvider` is an example implementation of a custom `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` for this authentication scenario.

> **Note:**
> The following custom `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` doesn't declare a namespace in order to make the code example applicable to any Blazor Hybrid app. However, a best practice is to provide your app's namespace when you implement the example in a production app.

`ExternalAuthStateProvider.cs`:

```csharp
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.Authorization;

public class ExternalAuthStateProvider : AuthenticationStateProvider
{
    private readonly Task<AuthenticationState> authenticationState;

    public ExternalAuthStateProvider(AuthenticatedUser user) => 
        authenticationState = Task.FromResult(new AuthenticationState(user.Principal));

    public override Task<AuthenticationState> GetAuthenticationStateAsync() =>
        authenticationState;
}

public class AuthenticatedUser
{
    public ClaimsPrincipal Principal { get; set; } = new();
}
```

**maui:**

The following steps describe how to:

* Add required namespaces.
* Add the authorization services and Blazor abstractions to the service collection.
* Build the service collection.
* Resolve the `AuthenticatedUser` service to set the authenticated user's claims principal. See your identity provider's documentation for details.
* Return the built host.

In the `MauiProgram.CreateMauiApp` method of `MauiProgram.cs`, add namespaces for `Microsoft.AspNetCore.Components.Authorization` and `System.Security.Claims`:

```csharp
using Microsoft.AspNetCore.Components.Authorization;
using System.Security.Claims;
```

Remove the following line of code that returns a built `Microsoft.Maui.Hosting.MauiApp`:

```diff
- return builder.Build();
```

Replace the preceding line of code with the following code. Add OpenID/MSAL code to authenticate the user. See your identity provider's documentation for details.

```csharp
builder.Services.AddAuthorizationCore();
builder.Services.TryAddScoped<AuthenticationStateProvider, ExternalAuthStateProvider>();
builder.Services.AddSingleton<AuthenticatedUser>();
var host = builder.Build();

var authenticatedUser = host.Services.GetRequiredService<AuthenticatedUser>();

/*
Provide OpenID/MSAL code to authenticate the user. See your identity provider's 
documentation for details.

The user is represented by a new ClaimsPrincipal based on a new ClaimsIdentity.
*/
var user = new ClaimsPrincipal(new ClaimsIdentity());

authenticatedUser.Principal = user;

return host;
```

**wpf:**

The following steps describe how to:

* Add required namespaces.
* Add the authorization services and Blazor abstractions to the service collection.
* Build the service collection and add the built service collection as a resource to the app's `ResourceDictionary`.
* Resolve the `AuthenticatedUser` service to set the authenticated user's claims principal. See your identity provider's documentation for details.
* Return the built host.

In the `MainWindow`'s constructor (`MainWindow.xaml.cs`), add namespaces for `Microsoft.AspNetCore.Components.Authorization` and `System.Security.Claims`:

```csharp
using Microsoft.AspNetCore.Components.Authorization;
using System.Security.Claims;
```

Remove the following line of code that adds the built service collection as a resource to the app's `ResourceDictionary`:

```diff
- Resources.Add("services", serviceCollection.BuildServiceProvider());
```

Replace the preceding line of code with the following code. Add OpenID/MSAL code to authenticate the user. See your identity provider's documentation for details.

```csharp
serviceCollection.AddAuthorizationCore();
serviceCollection.TryAddScoped<AuthenticationStateProvider, ExternalAuthStateProvider>();
serviceCollection.AddSingleton<AuthenticatedUser>();
var services = serviceCollection.BuildServiceProvider();
Resources.Add("services", services);

var authenticatedUser = services.GetRequiredService<AuthenticatedUser>();

/*
Provide OpenID/MSAL code to authenticate the user. See your identity provider's 
documentation for details.

The user is represented by a new ClaimsPrincipal based on a new ClaimsIdentity.
*/
var user = new ClaimsPrincipal(new ClaimsIdentity());

authenticatedUser.Principal = user;
```

**winforms:**

The following steps describe how to:

* Add required namespaces.
* Add the authorization services and Blazor abstractions to the service collection.
* Build the service collection and add the built service collection to the app's service provider.
* Resolve the `AuthenticatedUser` service to set the authenticated user's claims principal. See your identity provider's documentation for details.

In the `Form1`'s constructor (`Form1.cs`), add namespaces for `Microsoft.AspNetCore.Components.Authorization` and `System.Security.Claims`:

```csharp
using Microsoft.AspNetCore.Components.Authorization;
using System.Security.Claims;
```

Remove the following line of code that sets the built service collection to the app's service provider:

```diff
- blazorWebView1.Services = services.BuildServiceProvider();
```

Replace the preceding line of code with the following code. Add OpenID/MSAL code to authenticate the user. See your identity provider's documentation for details.

```csharp
services.AddAuthorizationCore();
services.TryAddScoped<AuthenticationStateProvider, ExternalAuthStateProvider>();
services.AddSingleton<AuthenticatedUser>();
var serviceCollection = services.BuildServiceProvider();
blazorWebView1.Services = serviceCollection;

var authenticatedUser = serviceCollection.GetRequiredService<AuthenticatedUser>();

/*
Provide OpenID/MSAL code to authenticate the user. See your identity provider's 
documentation for details.

The user is represented by a new ClaimsPrincipal based on a new ClaimsIdentity.
*/
var user = new ClaimsPrincipal(new ClaimsIdentity());

authenticatedUser.Principal = user;
```
