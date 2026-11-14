---
title: "Configure OpenID Connect Web (UI) authentication in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/authentication/configure-oidc-web-authentication.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Configure OpenID Connect Web (UI) authentication in ASP.NET Core

By Damien Bowden

View or download sample code

This article covers the following areas:

* What is an OpenID Connect confidential interactive client
* Create an OpenID Connect client in ASP.NET Core
* Examples of OpenID Connect client with code snippets
* Using third party OpenID Connect provider clients
* Backend for frontend (BFF) security architecture
* Advanced features, standards, extending the an OpenID Connect client

For an alternative experience using Microsoft Authentication Library for .NET, Microsoft Identity Web, and Microsoft Entra ID, see Quickstart: Sign in users and call the Microsoft Graph API from an ASP.NET Core web app (Azure documentation).

For an example using Microsoft Entra External ID OIDC server, see Sign in users for a sample ASP.NET Core web app in an external tenant and An ASP.NET Core web app authenticating users against Microsoft Entra External ID using Microsoft Identity Web.

## What is an OpenID Connect confidential interactive client

OpenID Connect can be used to implement authentication in ASP.NET Core applications. The recommended way is to use an OpenID Connect confidential client using the code flow. Using the Proof Key for Code Exchange by OAuth Public Clients (PKCE) is recommended for this implementation. Both the application client and the user of the application are authenticated in the confidential flow. The application client uses a client secret or a client assertion to authenticate.

Public OpenID Connect/OAuth clients are no longer recommended for web applications.

The default flow works as shown in the following diagram:

OpenID Connect comes in many variations and all server implementations have slightly different parameters and requirements. Some servers don'<example-value>'t support PKCE and others require special parameters in the token request. Client assertions can be used instead of client secrets. New standards also exist which add extra security on top of the OpenID Connect Core, for example FAPI, CIBA or DPoP for downstream APIs.

> **Note:**
> From .NET 9, OAuth 2.0 Pushed Authorization Requests (PAR) RFC 9126 is used per default, if the OpenID Connect server supports this. This is a three step flow and not a two step flow as shown above. (User Info request is an optional step.)

> **Important:**
> When an authorization request includes `max_age`, the OpenID Connect handler validates the signed ID token's `auth_time` against that value and the configured clock skew. Ensure that the identity provider honors `max_age` and returns a valid `auth_time`. For PAR, set `max_age` in `OnRedirectToIdentityProvider`, not `OnPushAuthorization`. For details and a temporary compatibility switch, see OpenID Connect `max_age` validates `auth_time`.

## Create an Open ID Connect code flow client using Razor Pages

The following section shows how to implement an OpenID Connect client in an empty ASP.NET Core Razor page project. The same logic can be applied to any ASP.NET Core web project with only the UI integration being different.

### Add OpenID Connect support

Add the `Microsoft.AspNetCore.Authentication.OpenIdConnect` Nuget packages to the ASP.NET Core project.

### Setup the OpenID Connect client

Add the authentication to the web application using the builder.Services in the `Program.cs` file. The configuration is dependent on the OpenID Connect server. Each OpenID Connect server requires small differences in the setup.

The OpenID Connect handler is used for challenges and signout. The cookie is used to handle the session in the web application. The default schemes for the authentication can be specified as required.

For more information, see the ASP.NET Core `authentication-handler` guidance.

```csharp
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
.AddCookie()
.AddOpenIdConnect(options =>
{
    var oidcConfig = builder.Configuration.GetSection("OpenIDConnectSettings");

    options.Authority = oidcConfig["Authority"];
    options.ClientId = oidcConfig["ClientId"];
    options.ClientSecret = <example-value>["<example-value>"];

    options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.ResponseType = OpenIdConnectResponseType.Code;

    options.SaveTokens = true;
    options.GetClaimsFromUserInfoEndpoint = true;

    options.MapInboundClaims = false;
    options.TokenValidationParameters.NameClaimType = JwtRegisteredClaimNames.Name;
    options.TokenValidationParameters.RoleClaimType = "<example-value>";
});
```

For details on the different OpenID Connect options, see Secure an ASP.NET Core Blazor Web App with OpenID Connect (OIDC).

For the different claims mapping possibilities, see Map, customize, transform claims in ASP.NET Core.

> **Note:**
> The following namespaces are required:
>
> ```csharp
> using Microsoft.AspNetCore.Authentication.Cookies;
> using Microsoft.AspNetCore.Authentication.OpenIdConnect;
> using Microsoft.IdentityModel.Protocols.OpenIdConnect;
> using Microsoft.IdentityModel.Tokens;
> ```

### Setup the configuration properties

Add the OpenID Connect client settings to the application configuration properties. The settings must match the client configuration in the OpenID Connect server. No secrets should be persisted in application settings where they might get accidentally checked in. Secrets should be stored in a secure location like Azure Key Vault in production environments or in user secrets in a development environment. For more information, see Safe storage of app secrets in development.

```json
"OpenIDConnectSettings": {
  // OpenID Connect URL. (The base URL for the /.well-known/openid-configuration)
  "Authority": "<Authority>",
  // client ID from the OpenID Connect server
  "ClientId": "<Client ID>",
  //"ClientSecret": "<example-value>"
},
```

### Signed-out callback path configuration

The `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.SignedOutCallbackPath` (configuration key: "`SignedOutCallbackPath`") is the request path within the app's base path intercepted by the OpenID Connect handler where the user agent is first returned after signing out from the identity provider. The sample app doesn't set a value for the path because the default value of "`/signout-callback-oidc`" is used. After intercepting the request, the OpenID Connect handler redirects to the `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.SignedOutRedirectUri` or `Microsoft.AspNetCore.Authentication.AuthenticationProperties.RedirectUri`, if specified.

Configure the signed-out callback path in the app's OIDC provider registration. In the following example, the `{PORT}` placeholder is the app's port:

> :::no-loc text="https://localhost:{PORT}/signout-callback-oidc":::

> **Note:**
> When using Microsoft Entra ID, set the path in the **Web** platform configuration's **Redirect URI** entries in the Entra or Azure portal. A port isn't required for `localhost` addresses when using Entra. Most other OIDC providers require the correct port. If you don't add the signed-out callback path URI to the app's registration in Entra, Entra refuses to redirect the user back to the app and merely asks them to close their browser window.

### Update the ASP.NET Core pipeline method in the program class.

The `UseRouting` method must be implemented before the `UseAuthorization` method.

```csharp
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseAuthentication();
// Authorization is applied for middleware after the UseAuthorization method
app.UseAuthorization();
app.MapRazorPages();
```

### Force authorization

Add the `[Authorize]` attribute to the protected Razor pages:

```csharp
[Authorize]
```

A better approach is to force authorization for the whole app and opt out for unsecure pages:

```csharp
var requireAuthPolicy = new AuthorizationPolicyBuilder()
    .RequireAuthenticatedUser()
    .Build();

builder.Services.AddAuthorizationBuilder()
    .SetFallbackPolicy(requireAuthPolicy);
```

The fallback policy requires authentication for requests processed by the authorization middleware when no authorization policy is produced from endpoint metadata. For complete policy selection rules, see Policy-based authorization in ASP.NET Core.

Opt out of authorization at public endpoints by applying the `[AllowAnonymous]` attribute to the public endpoints. For examples, see the Add a new `Logout.cshtml` and `SignedOut.cshtml` Razor pages to the project and Implement `Login` page sections.

### Add a new `Logout.cshtml` and `SignedOut.cshtml` Razor pages to the project

A logout is required to sign out both the cookie session and the OpenID Connect session. The whole app needs to redirect to the OpenID Connect server to sign out. After a successful sign out, the app opens the `RedirectUri` route.

Implement a default sign-out page and change the `Logout` razor page code to the following:

```csharp
[Authorize]
public class LogoutModel : PageModel
{
    public IActionResult OnGetAsync()
    {
        return SignOut(new AuthenticationProperties
        {
            RedirectUri = "/SignedOut"
        },
        // Clear auth cookie
        CookieAuthenticationDefaults.AuthenticationScheme,
        // Redirect to OIDC provider signout endpoint
        OpenIdConnectDefaults.AuthenticationScheme);
    }
}
```

The `SignedOut.cshtml` requires the `[AllowAnonymous]` attribute:

```csharp
[AllowAnonymous]
public class SignedOutModel : PageModel
{
    public void OnGet()
    {
    }
}
```

### Implement `Login` page

A `Login` Razor page can also be implemented to call the `ChallengeAsync` directly with the required `AuthProperties`. This isn't required if the web app requires authentication and the default challenge is used.

The `Login.cshtml` page requires the `[AllowAnonymous]` attribute:

```cshtml
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RazorPageOidc.Pages;

[AllowAnonymous]
public class LoginModel : PageModel
{
    [BindProperty(SupportsGet = true)]
    public string? ReturnUrl { get; set; }

    public async Task OnGetAsync()
    {
        var properties = GetAuthProperties(ReturnUrl);
        await HttpContext.ChallengeAsync(properties);
    }

    private static AuthenticationProperties GetAuthProperties(string? returnUrl)
    {
        const string pathBase = "/";

        // Prevent open redirects.
        if (string.IsNullOrEmpty(returnUrl))
        {
            returnUrl = pathBase;
        }
        else if (!Uri.IsWellFormedUriString(returnUrl, UriKind.Relative))
        {
            returnUrl = new Uri(returnUrl, UriKind.Absolute).PathAndQuery;
        }
        else if (returnUrl[0] != '/')
        {
            returnUrl = $"{pathBase}{returnUrl}";
        }

        return new AuthenticationProperties { RedirectUri = returnUrl };
    }
}

```

### Add a login and logout button for the user

```
@if (Context.User.Identity!.IsAuthenticated)
{
	<li class="nav-item">
		<a class="nav-link text-dark" asp-area="" asp-page="/Logout">Logout</a>
	</li>

	<span class="nav-link text-dark">Hi @Context.User.Identity.Name</span>
}
else
{
	<li class="nav-item">
		<a class="nav-link text-dark" asp-area="" asp-page="/Index">Login</a>
	</li>
}
```

## Examples with code snippets

### Example Using User Info endpoint

The OpenID Connect options can be used to map claims, implement handlers or even save the tokens in the session for later usage.

The `Scope` option can be used to request different claims or a refresh token which is sent as information to the OpenID Connect server. Requesting the `offline_access` is asking the server to return a reference token which can be used to refresh the session without authenticating the user of the application again.

```csharp
services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
.AddCookie()
.AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options =>
{
    var oidcConfig = builder.Configuration.GetSection("OpenIDConnectSettings");
    options.Authority = oidcConfig["IdentityProviderUrl"];
    options.ClientSecret = <example-value>["<example-value>"];
    options.ClientId = oidcConfig["Audience"];
    options.ResponseType = OpenIdConnectResponseType.Code;

    options.Scope.Clear();
    options.Scope.Add("openid");
    options.Scope.Add("profile");
    options.Scope.Add("email");
    options.Scope.Add("offline_access");

    options.ClaimActions.Remove("amr");
    options.ClaimActions.MapUniqueJsonKey("website", "website");

    options.GetClaimsFromUserInfoEndpoint = true;
    options.SaveTokens = true;

    // .NET 9 feature
    options.PushedAuthorizationBehavior = PushedAuthorizationBehavior.Require;

    options.TokenValidationParameters.NameClaimType = "<example-value>";
    options.TokenValidationParameters.RoleClaimType = "<example-value>";
});
```

### Implementing Microsoft identity providers

Microsoft has multiple identity providers and OpenID Connect implementations. Microsoft has different OpenID Connect servers:

* Microsoft Entra ID
* Microsoft Entra External ID

If authenticating using one of the Microsoft identity providers in ASP.NET Core, it is recommended to use the `Microsoft.Identity.Web` Nuget packages.

The `Microsoft.Identity.Web` Nuget packages is a Microsoft specific client built on top on the ASP.NET Core OpenID Connect client with some changes to the default client.

## Using third party OpenID Connect provider clients

Many OpenID Connect server implementations create Nuget packages which are optimized for the same OpenID Connect implementation. These packages implement the OpenID Connect client specifics with the extras required by the specific OpenID Connect server. `Microsoft.Identity.Web` is one example of this.

If implementing multiple OpenID Connect clients from different OpenID Connect servers in a single application, it's normally better to revert to the default ASP.NET Core implementation as the different clients overwrite some options which affect the other clients.

OpenIddict Web providers is a client implementation which supports many different server implementations.

`IdentityModel` is a .NET standard helper library for claims-based identity, OAuth 2.0 and OpenID Connect. This can also be used to help with the client implementation.
