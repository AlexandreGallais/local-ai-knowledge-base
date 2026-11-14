---
title: "Secure an ASP.NET Core Blazor Web App with OpenID Connect (OIDC) (part 7 of 9)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/security/blazor-web-app-with-oidc.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Secure an ASP.NET Core Blazor Web App with OpenID Connect (OIDC) (part 7 of 9)

## Supply configuration with the JSON configuration provider (app settings)

The sample solution projects configure OIDC and JWT bearer <example-value> in their `Program` files in order to make configuration settings discoverable using C# autocompletion. Professional apps usually use a *configuration provider* to configure OIDC options, such as the default JSON configuration provider. The JSON configuration provider loads configuration from app settings files `appsettings.json`/`appsettings.{ENVIRONMENT}.json`, where the `{ENVIRONMENT}` placeholder is the app's runtime environment. Follow the guidance in this section to use app settings files for configuration.

In the app settings file (`appsettings.json`) of the `BlazorWebAppOidc` or `BlazorWebAppOidcServer` project, add the following JSON configuration:

```json
"Authentication": {
  "Schemes": {
    "MicrosoftOidc": {
      "Authority": "https://login.microsoftonline.com/{TENANT ID (BLAZOR APP)}/v2.0",
      "ClientId": "{CLIENT ID (BLAZOR APP)}",
      "CallbackPath": "/signin-oidc",
      "SignedOutCallbackPath": "/signout-callback-oidc",
      "RemoteSignOutPath": "/signout-oidc",
      "SignedOutRedirectUri": "/",
      "Scope": [
        "openid",
        "profile",
        "offline_access",
        "{APP ID URI (WEB API)}/Weather.Get"
      ]
    }
  }
},
```

Update the placeholders in the preceding configuration to match the values that the app uses in the `Program` file:

* `{TENANT ID (BLAZOR APP)}`: The Tenant Id of the Blazor app.
* `{CLIENT ID (BLAZOR APP)}`: The Client Id of the Blazor app.
* `{APP ID URI (WEB API)}`: The App ID URI of the web API.

The "common" Authority (`https://login.microsoftonline.com/common/v2.0`) should be used for multi-tenant apps. To use the "common" Authority for single-tenant apps, see the Use the "common" Authority for single-tenant apps section.

Update any other values in the preceding configuration to match custom/non-default values used in the `Program` file.

The configuration is automatically picked up by the authentication builder.

Remove the following lines from the `Program` file:

```diff
- oidcOptions.Scope.Add(OpenIdConnectScope.OpenIdProfile);
- oidcOptions.Scope.Add("...");
- oidcOptions.CallbackPath = new PathString("...");
- oidcOptions.SignedOutCallbackPath = new PathString("...");
- oidcOptions.RemoteSignOutPath = new PathString("...");
- oidcOptions.Authority = "...";
- oidcOptions.ClientId = "...";
```

In the `ConfigureCookieOidc` method of `CookieOidcServiceCollectionExtensions.cs`, remove the following line:

```diff
- oidcOptions.Scope.Add(OpenIdConnectScope.OfflineAccess);
```

In the `MinimalApiJwt` project, add the following app settings configuration to the `appsettings.json` file:

```json
"Authentication": {
  "Schemes": {
    "Bearer": {
      "Authority": "https://sts.windows.net/{TENANT ID (WEB API)}/",
      "ValidAudiences": [ "{APP ID URI (WEB API)}" ]
    }
  }
},
```

The preceding example uses the V1 STS token URL format. For guidance on V2 STS tokens, see Secure an ASP.NET Core Blazor Web App with Microsoft Entra ID.

Update the placeholders in the preceding configuration to match the values that the app uses in the `Program` file:

* `{TENANT ID (WEB API)}`: The Tenant Id of the web API.
* `{APP ID URI (WEB API)}`: The App ID URI of the web API.

Authority formats adopt the following patterns:

* ME-ID tenant type: `https://sts.windows.net/{TENANT ID}/`
* Microsoft Entra External ID: `https://{DIRECTORY NAME}.ciamlogin.com/{TENANT ID}/v2.0`
* B2C tenant type: `https://login.microsoftonline.com/{TENANT ID}/v2.0`

The preceding example for the ME-ID tenant type uses the V1 STS token URL format. For guidance on V2 STS tokens, see Secure an ASP.NET Core Blazor Web App with Microsoft Entra ID.

Audience formats adopt the following patterns (`{CLIENT ID}` is the Client Id of the web API; `{DIRECTORY NAME}` is the directory name, for example, `contoso`):

* ME-ID tenant type: `api://{CLIENT ID}`
* Microsoft Entra External ID: `{CLIENT ID}`
* B2C tenant type: `https://{DIRECTORY NAME}.onmicrosoft.com/{CLIENT ID}`

The configuration is automatically picked up by the JWT bearer <example-value> builder.

Remove the following lines from the `Program` file:

```diff
- jwtOptions.Authority = "...";
- jwtOptions.Audience = "...";
```

For more information on configuration, see the following resources:

* Configuration in ASP.NET Core
* ASP.NET Core Blazor configuration

## Use the "common" Authority for single-tenant apps

You can use the "common" Authority for single-tenant apps, but you must take the following steps to implement a custom issuer validator.

Add the `Microsoft.IdentityModel.Validators` NuGet package to the server project.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

At the top of the `Program` file, make the `Microsoft.IdentityModel.Validators` namespace available:

```csharp
using Microsoft.IdentityModel.Validators;
```

Use the following code in the `Program` file where OIDC options are configured:

```csharp
var microsoftIssuerValidator = 
    AadIssuerValidator.GetAadIssuerValidator(oidcOptions.Authority);
oidcOptions.TokenValidationParameters.IssuerValidator = 
    microsoftIssuerValidator.Validate;
```

For more information, see SecurityTokenInvalidIssuerException with OpenID Connect and the Azure AD "<example-value>" endpoint (`AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet` #1731).

## Redirect to the home page on logout

The `LogInOrOut` component (`Layout/LogInOrOut.razor`) sets a hidden field for the return URL (`ReturnUrl`) to the current URL (`currentURL`). When the user signs out of the app, the identity provider returns the user to the page from which they logged out. If the user logs out from a secure page, they're returned to the same secure page and sent back through the authentication process. This authentication flow is reasonable when users need to change accounts regularly.

Alternatively, use the following `LogInOrOut` component, which doesn't supply a return URL when logging out.

`Layout/LogInOrOut.razor`:

```razor
<div class="nav-item px-3">
    <AuthorizeView>
        <Authorized>
            <form action="authentication/logout" method="post">
                <AntiforgeryToken />
                <button type="submit" class="nav-link">
                    <span class="bi bi-arrow-bar-left-nav-menu" aria-hidden="true">
                    </span> Logout
                </button>
            </form>
        </Authorized>
        <NotAuthorized>
            <a class="nav-link" href="authentication/login">
                <span class="bi bi-person-badge-nav-menu" aria-hidden="true"></span> 
                Login
            </a>
        </NotAuthorized>
    </AuthorizeView>
</div>
```

## Cryptographic nonce

A *nonce* is a string value that associates a client's session with an ID token to mitigate replay attacks.

If you receive a nonce error during authentication development and testing, use a new InPrivate/incognito browser session for each test run, no matter how small the change made to the app or test user because stale cookie data can lead to a nonce error. For more information, see the Cookies and site data section.

A nonce isn't required or used when a refresh token is exchanged for a new access token. In the sample app, the `CookieOidcRefresher` (`CookieOidcRefresher.cs`) deliberately sets `Microsoft.IdentityModel.Protocols.OpenIdConnect.OpenIdConnectProtocolValidator.RequireNonce` to `false`.

## Application roles for apps not registered with Microsoft Entra (ME-ID)

*This section pertains to apps that don't use Microsoft Entra ID (ME-ID) as the identity provider. For apps registered with ME-ID, see the Application roles for apps registered with Microsoft Entra (ME-ID) section.*

Configure the role claim type (`Microsoft.IdentityModel.Tokens.TokenValidationParameters.RoleClaimType`) in the `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions` of `Program.cs`:

```csharp
oidcOptions.TokenValidationParameters.RoleClaimType = "<example-value>";
```

For many OIDC identity providers, the role claim type is `role`. Check your identity provider's documentation for the correct value.

Replace the `UserInfo` class in the `BlazorWebAppOidc.Client` project with the following class.

`UserInfo.cs`:

```csharp
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using System.Security.Claims;

namespace BlazorWebAppOidc.Client;

// Add properties to this class and update the server and client 
// AuthenticationStateProviders to expose more information about 
// the authenticated user to the client.
public sealed class UserInfo
{
    public required string UserId { get; init; }
    public required string Name { get; init; }
    public required string[] Roles { get; init; }

    public const string UserIdClaimType = "sub";
    public const string NameClaimType = "name";
    private const string RoleClaimType = "role";

    public static UserInfo FromClaimsPrincipal(ClaimsPrincipal principal) =>
        new()
        {
            UserId = GetRequiredClaim(principal, UserIdClaimType),
            Name = GetRequiredClaim(principal, NameClaimType),
            Roles = principal.FindAll(RoleClaimType).Select(c => c.Value)
                .ToArray(),
        };

    public ClaimsPrincipal ToClaimsPrincipal() =>
        new(new ClaimsIdentity(
            Roles.Select(role => new Claim(RoleClaimType, role))
                .Concat([
                    new Claim(UserIdClaimType, UserId),
                    new Claim(NameClaimType, Name),
                ]),
            authenticationType: nameof(UserInfo),
            nameType: NameClaimType,
            roleType: RoleClaimType));

    private static string GetRequiredClaim(ClaimsPrincipal principal,
        string claimType) =>
            principal.FindFirst(claimType)?.Value ??
            throw new InvalidOperationException(
                $"Could not find required '{claimType}' claim.");
}
```

At this point, Razor components can adopt role-based and policy-based authorization. Application roles appear in `role` claims, one claim per role.
