---
title: "Facebook, Google, and external provider authentication without ASP.NET Core Identity"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/social/social-without-identity.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Use social sign-in provider authentication without ASP.NET Core Identity

By Kirk Larkin and Rick Anderson

Using external login providers with Identity in ASP.NET Core describes how to enable users to sign in using OAuth 2.0 with credentials from external authentication providers. The approach described in that article includes ASP.NET Core Identity as an authentication provider.

This sample demonstrates how to use an external authentication provider **without** ASP.NET Core Identity. This approach is useful for apps that don't require all of the features of ASP.NET Core Identity, but still require integration with a trusted external authentication provider.

This sample uses Google authentication for authenticating users. Using Google authentication shifts many of the complexities of managing the sign-in process to Google. To integrate with a different external authentication provider, see the following articles:

* Facebook authentication
* Microsoft authentication
* Twitter authentication
* Other providers

## Configuration

In `Program.cs`, configure the app's authentication schemes with the `Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication*`, `Microsoft.Extensions.DependencyInjection.CookieExtensions.AddCookie*`, and `Microsoft.Extensions.DependencyInjection.GoogleExtensions.AddGoogle*` methods:

```csharp
using Microsoft.AspNetCore.Authentication.Cookies;
using Google.Apis.Auth.AspNetCore3;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = GoogleOpenIdConnectDefaults.AuthenticationScheme;
    })
    .AddCookie()
    .AddGoogleOpenIdConnect(options =>
    {
        options.ClientId = builder.Configuration["Authentication:Google:ClientId"];
        options.ClientSecret = builder.Configuration["<example-value>"];
    });

builder.Services.AddRazorPages();
```
The call to `Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication*` sets the app's `Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultScheme`. The `DefaultScheme` is the default scheme used by the following `HttpContext` authentication extension methods:

* `Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.AuthenticateAsync*`
* `Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.ChallengeAsync*`
* `Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.ForbidAsync*`
* `Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignInAsync*`
* `Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync*`

Setting the app's `DefaultScheme` to `Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme` ("Cookies") configures the app to use Cookies as the default scheme for these extension methods. Setting the app's `Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultChallengeScheme` to `Google.Apis.Auth.AspNetCore3.GoogleOpenIdConnectDefaults.AuthenticationScheme` ("`GoogleOpenIdConnect`") configures the app to use Google as the default scheme for calls to `ChallengeAsync`. `DefaultChallengeScheme` overrides `DefaultScheme`. See `Microsoft.AspNetCore.Authentication.AuthenticationOptions` for more properties that override `DefaultScheme` when set.

In `Program.cs`, call `Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication*` and `Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization*`. This middleware combination sets the `Microsoft.AspNetCore.Http.HttpContext.User` property and runs the authorization middleware for requests:

```csharp
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();
```
To learn more about authentication schemes, see Authentication Concepts. To learn more about cookie authentication, see Use cookie authentication without ASP.NET Core Identity.

## Apply authorization

Test the app's authentication configuration by applying the [Authorize] attribute to a controller, action, or page. The following code limits access to the *Privacy* page to users that have been authenticated:

```csharp
[Authorize]
public class PrivacyModel : PageModel
{

}
```
## Save the access token

`Microsoft.AspNetCore.Authentication.RemoteAuthenticationOptions.SaveTokens` defines whether access and refresh tokens should be stored in the `Microsoft.AspNetCore.Http.Authentication.AuthenticationProperties` after a successful authorization. `SaveTokens` is set to `false` by default to reduce the size of the final authentication cookie.

To save access and refresh tokens after a successful authorization, set `SaveTokens` to `true` in `Program.cs`:

```csharp
builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = GoogleOpenIdConnectDefaults.AuthenticationScheme;
    })
    .AddCookie()
    .AddGoogleOpenIdConnect(options =>
    {
        options.ClientId = builder.Configuration["Authentication:Google:ClientId"];
        options.ClientSecret = builder.Configuration["<example-value>"];
        options.SaveTokens = true;
    });
```
To retrieve a saved token, use `Microsoft.AspNetCore.Authentication.AuthenticationTokenExtensions.GetTokenAsync*`. The following example retrieves the token named `access_token`:

```csharp
public async Task OnGetAsync()
{
    var accessToken = await HttpContext.GetTokenAsync(
        GoogleOpenIdConnectDefaults.AuthenticationScheme, "<example-value>");

    // ...
}
```
## Sign out

To sign out the current user and delete their cookie, call `Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync*`. The following code adds a `Logout` page handler to the *Index* page:

```csharp
public class IndexModel : PageModel
{
    public async Task<IActionResult> OnPostLogoutAsync()
    {
        // using Microsoft.AspNetCore.Authentication;
        await HttpContext.SignOutAsync();
        return RedirectToPage();
    }
}
```
Notice that the call to `SignOutAsync` doesn't specify an authentication scheme. The app uses the `DefaultScheme`, `CookieAuthenticationDefaults.AuthenticationScheme`, as a fallback.

## Additional resources

* Simple authorization in ASP.NET Core
* Persist additional claims and tokens from external providers in ASP.NET Core
