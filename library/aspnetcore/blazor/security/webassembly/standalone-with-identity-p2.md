---
title: "Secure ASP.NET Core Blazor WebAssembly with ASP.NET Core Identity (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/standalone-with-identity/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Secure ASP.NET Core Blazor WebAssembly with ASP.NET Core Identity (part 2 of 2)

## Test user seeding demonstration

The `SeedData` class (`SeedData.cs`) demonstrates how to create test users for development. The test user, named Leela, signs into the app with the email address `leela@contoso.com`. The user's password is set to `Passw0rd!`. Leela is given `Administrator` and `Manager` roles for authorization, which enables the user to access the manager page at `/private-manager-page` but not the editor page at `/private-editor-page`.

> **Warning:**
> Never allow test user code to run in a production environment. `SeedData.InitializeAsync` is only called in the `Development` environment in the `Program` file:
>
> ```csharp
> if (builder.Environment.IsDevelopment())
> {
>     await using var scope = app.Services.CreateAsyncScope();
>     await SeedData.InitializeAsync(scope.ServiceProvider);
> }
> ```

## Roles

Role claims aren't sent back from the `manage/info` endpoint to create user claims for users of the `BlazorWasmAuth` app. Role claims are managed independently via a separate request in the `GetAuthenticationStateAsync` method of the `CookieAuthenticationStateProvider` class (`Identity/CookieAuthenticationStateProvider.cs`) after the user is authenticated in the `Backend` project.

In the `CookieAuthenticationStateProvider`, a roles request is made to the `/roles` endpoint of the `Backend` server API project. The response is read into a string by calling `System.Net.Http.HttpContent.ReadAsStringAsync`. `System.Text.Json.JsonSerializer.Deserialize*` deserializes the string into a custom `RoleClaim` array. Finally, the claims are added to the user's claims collection.

In the `Backend` server API's `Program` file, a Minimal API manages the `/roles` endpoint. Claims of `System.Security.Claims.ClaimsIdentity.RoleClaimType` are selected into an anonymous type and serialized for return to the `BlazorWasmAuth` project with `Microsoft.AspNetCore.Http.TypedResults.Json*`.

The roles endpoint requires authorization by calling `Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization*`. If you decide not to use Minimal APIs in favor of controllers for secure server API endpoints, be sure to set the `[Authorize]` attribute on controllers or actions.

## Cross-domain hosting (same-site configuration)

The sample apps are configured for hosting both apps at the same domain. If you host the `Backend` app at a different domain than the `BlazorWasmAuth` app, uncomment the code that configures the cookie (`Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.ConfigureApplicationCookie*`) in the `Backend` app's `Program` file. The default values are:

* Same-site mode: `Microsoft.AspNetCore.Http.SameSiteMode.Lax`
* Secure policy: `Microsoft.AspNetCore.Http.CookieSecurePolicy.SameAsRequest`

Change the values to:

* Same-site mode: `Microsoft.AspNetCore.Http.SameSiteMode.None`
* Secure policy: `Microsoft.AspNetCore.Http.CookieSecurePolicy.Always`

```diff
- options.Cookie.SameSite = SameSiteMode.Lax;
- options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
+ options.Cookie.SameSite = SameSiteMode.None;
+ options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
```

For more information on same-site cookie settings, see the following resources:

* Set-Cookie: `SameSite=<samesite-value>` (MDN documentation)
* Cookies: HTTP State Management Mechanism (RFC Draft 6265, Section 4.1)

## Antiforgery support

Only the logout endpoint (`/logout`) in the `Backend` app requires attention to mitigate the threat of Cross-Site Request Forgery (CSRF).

The logout endpoint checks for an empty body to prevent CSRF attacks. By requiring a body, the request must be made from JavaScript, which is the only way to access the authentication cookie. The logout endpoint can't be accessed by a form-based POST. This prevents a malicious site from logging the user out.

Furthermore, the endpoint is protected by authorization (`Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization*`) to prevent anonymous access.

The `BlazorWasmAuth` client app is simply required to pass an empty object `{}` in the body of the request.

Outside of the logout endpoint, antiforgery mitigation is only required when submitting form data to the server encoded as `application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`. Blazor manages CSRF mitigation for forms in most cases. For more information, see ASP.NET Core Blazor authentication and authorization and ASP.NET Core Blazor forms overview.

Requests to other server API endpoints (web API) with `application/json`-encoded content and CORS enabled doesn't require CSRF protection. This is why no CSRF protection is required for the `Backend` app's data processing (`/data-processing`) endpoint. The roles (`/roles`) endpoint doesn't need CSRF protection because it's a GET endpoint that doesn't modify any state.

## Troubleshoot

### Logging

To enable debug or trace logging for Blazor WebAssembly authentication, see ASP.NET Core Blazor logging.

### Common errors

Check each project's configuration. Confirm that the URLs are correct:

* `Backend` project
  * `appsettings.json`
    * `BackendUrl`
    * `FrontendUrl`
  * `Backend.http`: `Backend_HostAddress`
* `BlazorWasmAuth` project: `wwwroot/appsettings.json`
  * `BackendUrl`
  * `FrontendUrl`

If the configuration appears correct:

* Analyze application logs.
* Examine the network traffic between the `BlazorWasmAuth` app and `Backend` app with the browser's developer tools. Often, an exact error message or a message with a clue to what's causing the problem is returned to the client by the backend app after making a request. Developer tools guidance is found in the following articles:

* Google Chrome (Google documentation)
* Microsoft Edge
* Mozilla Firefox (Mozilla documentation)

The documentation team responds to document feedback and bugs in articles. Open an issue using the **Open a documentation issue** link at the bottom of the article. The team isn't able to provide product support. Several public support forums are available to assist with troubleshooting an app. We recommend the following:

* Stack Overflow (tag: `blazor`)
* ASP.NET Core Slack Team
* Blazor Gitter

*The preceding forums are not owned or controlled by Microsoft.*

For non-security, non-sensitive, and non-confidential reproducible framework bug reports, open an issue with the ASP.NET Core product unit. Don't open an issue with the product unit until you've thoroughly investigated the cause of a problem and can't resolve it on your own and with the help of the community on a public support forum. The product unit isn't able to troubleshoot individual apps that are broken due to simple misconfiguration or use cases involving third-party services. If a report is sensitive or confidential in nature or describes a potential security flaw in the product that cyberattackers may exploit, see Reporting security issues and bugs (`dotnet/aspnetcore` GitHub repository).

### Cookies and site data

Cookies and site data can persist across app updates and interfere with testing and troubleshooting. Clear the following when making app code changes, user account changes, or app configuration changes:

* User sign-in cookies
* App cookies
* Cached and stored site data

One approach to prevent lingering cookies and site data from interfering with testing and troubleshooting is to:

* Configure a browser
  * Use a browser for testing that you can configure to delete all cookie and site data each time the browser is closed.
  * Make sure that the browser is closed manually or by the IDE for any change to the app, test user, or provider configuration.
* Use a custom command to open a browser in InPrivate or Incognito mode in Visual Studio:
  * Open **Browse With** dialog box from Visual Studio's **Run** button.
  * Select the **Add** button.
  * Provide the path to your browser in the **Program** field. The following executable paths are typical installation locations for Windows 10. If your browser is installed in a different location or you aren't using Windows 10, provide the path to the browser's executable.
    * Microsoft Edge: `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`
    * Google Chrome: `C:\Program Files (x86)\Google\Chrome\Application\chrome.exe`
    * Mozilla Firefox: `C:\Program Files\Mozilla Firefox\firefox.exe`
  * In the **Arguments** field, provide the command-line option that the browser uses to open in InPrivate or Incognito mode. Some browsers require the URL of the app.
    * Microsoft Edge: Use `-inprivate`.
    * Google Chrome: Use `--incognito --new-window {URL}`, where the `{URL}` placeholder is the URL to open (for example, `https://localhost:5001`).
    * Mozilla Firefox: Use `-private -url {URL}`, where the `{URL}` placeholder is the URL to open (for example, `https://localhost:5001`).
  * Provide a name in the **Friendly name** field. For example, `Firefox Auth Testing`.
  * Select the **OK** button.
  * To avoid having to select the browser profile for each iteration of testing with an app, set the profile as the default with the **Set as Default** button.
  * Make sure that the browser is closed by the IDE for any change to the app, test user, or provider configuration.

### App upgrades

A functioning app may fail immediately after upgrading either the .NET SDK on the development machine or changing package versions within the app. In some cases, incoherent packages may break an app when performing major upgrades. Most of these issues can be fixed by following these instructions:

1. Clear the local system's NuGet package caches by executing `dotnet nuget locals all --clear` from a command shell.
1. Delete the project's `bin` and `obj` folders.
1. Restore and rebuild the project.
1. Delete all of the files in the deployment folder on the server prior to redeploying the app.

> **Note:**
> Use of package versions incompatible with the app's target framework isn't supported. For information on a package, use the NuGet Gallery.

### Inspect the user's claims

To troubleshoot problems with user claims, the following `UserClaims` component can be used directly in apps or serve as the basis for further customization.

`UserClaims.razor`:

```razor
@page "/user-claims"
@using System.Security.Claims
@attribute [Authorize]

<PageTitle>User Claims</PageTitle>

<h1>User Claims</h1>

**Name**: @AuthenticatedUser?.Identity?.Name

<h2>Claims</h2>

@foreach (var claim in AuthenticatedUser?.Claims ?? Array.Empty<Claim>())
{
    <p class="claim">@(claim.Type): @claim.Value</p>
}

@code {
    [CascadingParameter]
    private Task<AuthenticationState>? AuthenticationState { get; set; }

    public ClaimsPrincipal? AuthenticatedUser { get; set; }

    protected override async Task OnInitializedAsync()
    {
        if (AuthenticationState is not null)
        {
            var state = await AuthenticationState;
            AuthenticatedUser = state.User;
        }
    }
}
```

## Related content

* `AuthenticationStateProvider` service
* Client-side SignalR cross-origin negotiation for authentication
