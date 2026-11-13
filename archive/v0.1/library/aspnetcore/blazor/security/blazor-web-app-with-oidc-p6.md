---
title: "Secure an ASP.NET Core Blazor Web App with OpenID Connect (OIDC) (part 6 of 9)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/blazor-web-app-with-oidc.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Secure an ASP.NET Core Blazor Web App with OpenID Connect (OIDC) (part 6 of 9)

## `BlazorWebAppOidcServer` project

Automatic non-interactive token <example-value> is managed by a custom cookie refresher (`CookieOidcRefresher.cs`).

A `System.Net.Http.DelegatingHandler` (`TokenHandler`) manages attaching a user's access token to outgoing requests. The token <example-value> only executes during static server-side rendering (static SSR), so using `Microsoft.AspNetCore.Http.HttpContext` is safe in this scenario. For more information, see IHttpContextAccessor/HttpContext in ASP.NET Core Blazor apps and ASP.NET Core Blazor additional server-side security scenarios.

`TokenHandler.cs`:

```csharp
public class TokenHandler(IHttpContextAccessor httpContextAccessor) : 
    DelegatingHandler
{
    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken <example-value>)
    {
        if (httpContextAccessor.HttpContext is null)
        {
            throw new Exception("HttpContext not available");
        }

        var accessToken = await httpContextAccessor.HttpContext
            .GetTokenAsync("<example-value>");

        request.Headers.Authorization =
            new AuthenticationHeaderValue("<example-value>", accessToken);

        return await base.SendAsync(request, cancellationToken);
    }
}
```

In the project's `Program` file, the token <example-value> (`TokenHandler`) is registered as a service and specified as the message handler with `Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.AddHttpMessageHandler*` for making secure requests to the backend `MinimalApiJwt` web API using a named HTTP client ("<example-value>").

```csharp
builder.Services.AddScoped<TokenHandler>();

builder.Services.AddHttpClient("ExternalApi",
      client => client.BaseAddress = new Uri(builder.Configuration["ExternalApiUri"] ?? 
          throw new Exception("Missing base address!")))
      .AddHttpMessageHandler<TokenHandler>();
```

The `Weather` component uses the `[Authorize]` attribute to prevent unauthorized access. For more information on requiring authorization across the app via an authorization policy and opting out of authorization at a subset of public endpoints, see the Razor Pages OIDC guidance.

The `ExternalApi` HTTP client is used to make a request for weather data to the secure web API. In the `OnInitializedAsync` lifecycle event of `Weather.razor`:

```csharp
using var request = new HttpRequestMessage(HttpMethod.Get, "/weather-forecast");
var client = ClientFactory.CreateClient("ExternalApi");
using var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();

forecasts = await response.Content.ReadFromJsonAsync<WeatherForecast[]>() ??
    throw new IOException("No weather forecast!");
```

In the project's `appsettings.json` file, configure the external API URI:

```json
"ExternalApiUri": "{BASE ADDRESS}"
```

Example:

```json
"ExternalApiUri": "https://localhost:7277"
```

The following `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions` configuration is found in the project's `Program` file on the call to `Microsoft.Extensions.DependencyInjection.OpenIdConnectExtensions.AddOpenIdConnect*`:

`Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.PushedAuthorizationBehavior`: Controls Pushed Authorization Requests (PAR) support. By default, the setting is to use PAR if the identity provider's discovery document (usually found at `.well-known/openid-configuration`) advertises support for PAR. If you wish to require PAR support for the app, you can assign a value of `PushedAuthorizationBehavior.Require`. PAR isn't supported by Microsoft Entra, and there are no plans for Entra to ever support it in the future.

```csharp
oidcOptions.PushedAuthorizationBehavior = PushedAuthorizationBehavior.UseIfAvailable;
```

`Microsoft.AspNetCore.Builder.RemoteAuthenticationOptions.SignInScheme`: Sets the authentication scheme corresponding to the middleware responsible of persisting user's identity after a successful authentication. The OIDC handler needs to use a sign-in scheme that's capable of persisting user credentials <example-value> requests. The following line is present merely for demonstration purposes. If omitted, `Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultSignInScheme` is used as a fallback value.

```csharp
oidcOptions.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
```

Scopes for `openid` and `profile` (`Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Scope`) (Optional): The `openid` and `profile` scopes are also configured by default because they're required for the OIDC handler to work, but these may need to be re-added if scopes are included in the `Authentication:Schemes:MicrosoftOidc:Scope` configuration. For general configuration guidance, see Configuration in ASP.NET Core and ASP.NET Core Blazor configuration.

```csharp
oidcOptions.Scope.Add(OpenIdConnectScope.OpenIdProfile);
```

Configure the `Weather.Get` scope for accessing the external web API for weather data. The following example is based on using Entra ID in an ME-ID tenant domain. In the following example, the `{APP ID URI}` placeholder is found in the Entra or Azure portal where the web API is exposed. For any other identity provider, use the appropriate scope.

```csharp
oidcOptions.Scope.Add("{APP ID URI}/Weather.Get");
```

The format of the scope depends on the type of tenant in use. In the following examples, the Tenant Domain is `contoso.onmicrosoft.com`, and the Client ID is `11112222-bbbb-3333-cccc-4444dddd5555`.

ME-ID tenant App ID URI example:

```csharp
oidcOptions.Scope.Add("api://11112222-bbbb-3333-cccc-4444dddd5555/Weather.Get");
```

AAD B2C tenant App ID URI example:

```csharp
oidcOptions.Scope.Add("https://contoso.onmicrosoft.com/11112222-bbbb-3333-cccc-4444dddd5555/Weather.Get");
```

`Microsoft.AspNetCore.Authentication.RemoteAuthenticationOptions.SaveTokens`: Defines whether access and refresh tokens should be stored in the `Microsoft.AspNetCore.Authentication.AuthenticationProperties` after a successful authorization. This property is set to `true` so the refresh token gets stored for non-interactive token refresh.

```csharp
oidcOptions.SaveTokens = true;
```

Scope for offline access (`Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Scope`): The `offline_access` scope is required for the refresh token.

```csharp
oidcOptions.Scope.Add(OpenIdConnectScope.OfflineAccess);
```

`Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.Authority` and `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.ClientId`: Sets the Authority and Client ID for OIDC calls.

```csharp
oidcOptions.Authority = "{AUTHORITY}";
oidcOptions.ClientId = "{CLIENT ID}";
```

The following example uses a Tenant ID of `aaaabbbb-0000-cccc-1111-dddd2222eeee` and a Client ID of `00001111-aaaa-2222-bbbb-3333cccc4444`:

```csharp
oidcOptions.Authority = "https://login.microsoftonline.com/aaaabbbb-0000-cccc-1111-dddd2222eeee/v2.0";
oidcOptions.ClientId = "00001111-aaaa-2222-bbbb-3333cccc4444";
```

For multi-tenant apps, the "<example-value>" authority should be used. You can also use the "<example-value>" authority for single-tenant apps, but a custom `Microsoft.IdentityModel.Tokens.TokenValidationParameters.IssuerValidator` is required, as shown later in this section.

```csharp
oidcOptions.Authority = "https://login.microsoftonline.com/common/v2.0";
```

`Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.ResponseType`: Configures the OIDC handler to only perform authorization code flow. Implicit grants and hybrid flows are unnecessary in this mode. The OIDC handler automatically requests the appropriate tokens using the code returned from the authorization endpoint.

```csharp
oidcOptions.ResponseType = OpenIdConnectResponseType.Code;
```

`Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MapInboundClaims` and configuration of `Microsoft.IdentityModel.Tokens.TokenValidationParameters.NameClaimType` and `Microsoft.IdentityModel.Tokens.TokenValidationParameters.RoleClaimType`: Many OIDC servers use "<example-value>" and "<example-value>" rather than the SOAP/WS-Fed defaults in `System.Security.Claims.ClaimTypes`. When `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MapInboundClaims` is set to `false`, the handler doesn'<example-value>'s documentation for more information.

> **Note:**
> `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MapInboundClaims` must be set to `false` for most OIDC providers, which prevents renaming claims.

```csharp
oidcOptions.MapInboundClaims = false;
oidcOptions.TokenValidationParameters.NameClaimType = "<example-value>";
oidcOptions.TokenValidationParameters.RoleClaimType = "<example-value>";
```

Path configuration: Paths must match the redirect URI (login callback path) and post logout redirect (signed-out callback path) paths configured when registering the application with the OIDC provider. In the Azure portal, paths are configured in the **Authentication** blade of the app's registration. Both the sign-in and sign-out paths must be registered as redirect URIs. The default values are `/signin-oidc` and `/signout-callback-oidc`.

`Microsoft.AspNetCore.Builder.RemoteAuthenticationOptions.CallbackPath`: The request path within the app's base path where the user-agent is returned.

Configure the signed-out callback path in the app's OIDC provider registration. In the following example, the `{PORT}` placeholder is the app's port:

> :::no-loc text="https://localhost:{PORT}/signin-oidc":::

> **Note:**
> A port isn't required for `localhost` addresses when using Microsoft Entra ID. Most other OIDC providers require the correct port.

`Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.SignedOutCallbackPath` (configuration key: "`SignedOutCallbackPath`"): The request path within the app's base path intercepted by the OIDC handler where the user agent is first returned after signing out from the identity provider. The sample app doesn't set a value for the path because the default value of "`/signout-callback-oidc`" is used. After intercepting the request, the OIDC handler redirects to the `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.SignedOutRedirectUri` or `Microsoft.AspNetCore.Authentication.AuthenticationProperties.RedirectUri`, if specified.

Configure the signed-out callback path in the app's OIDC provider registration. In the following example, the `{PORT}` placeholder is the app's port:

> :::no-loc text="https://localhost:{PORT}/signout-callback-oidc":::

> **Note:**
> When using Microsoft Entra ID, set the path in the **Web** platform configuration's **Redirect URI** entries in the Entra or Azure portal. A port isn't required for `localhost` addresses when using Entra. Most other OIDC providers require the correct port. If you don't add the signed-out callback path URI to the app's registration in Entra, Entra refuses to redirect the user back to the app and merely asks them to close their browser window.

`Microsoft.AspNetCore.Builder.OpenIdConnectOptions.RemoteSignOutPath`: Requests received on this path cause the handler to invoke sign-out using the sign-out scheme.

In the following example, the `{PORT}` placeholder is the app's port:

> :::no-loc text="https://localhost/signout-oidc":::

> **Note:**
> When using Microsoft Entra ID, set the **Front-channel logout URL** in the Entra or Azure portal. A port isn't required for `localhost` addresses when using Entra. Most other OIDC providers require the correct port.

```csharp
oidcOptions.CallbackPath = new PathString("{PATH}");
oidcOptions.SignedOutCallbackPath = new PathString("{PATH}");
oidcOptions.RemoteSignOutPath = new PathString("{PATH}");
```

Examples (default values):

```csharp
oidcOptions.CallbackPath = new PathString("/signin-oidc");
oidcOptions.SignedOutCallbackPath = new PathString("/signout-callback-oidc");
oidcOptions.RemoteSignOutPath = new PathString("/signout-oidc");
```

(*Microsoft Azure only with the "<example-value>" endpoint*) `Microsoft.IdentityModel.Tokens.TokenValidationParameters.IssuerValidator`: Many OIDC providers work with the default issuer validator, but we need to account for the issuer parameterized with the Tenant ID (`{TENANT ID}`) returned by `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration`. For more information, see SecurityTokenInvalidIssuerException with OpenID Connect and the Azure AD "<example-value>" endpoint (`AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet` #1731).

Only for apps using Microsoft Entra ID with the "common" endpoint:

```csharp
var microsoftIssuerValidator = AadIssuerValidator.GetAadIssuerValidator(oidcOptions.Authority);
oidcOptions.TokenValidationParameters.IssuerValidator = microsoftIssuerValidator.Validate;
```

## Only serialize the name and role claims

*This section only applies to the Interactive Auto render mode sample apps.*

In the `Program` file, all claims are serialized by setting `Microsoft.AspNetCore.Components.WebAssembly.Server.AuthenticationStateSerializationOptions.SerializeAllClaims` to `true`. If you only want the name and role claims serialized for CSR, remove the option or set it to `false`.
