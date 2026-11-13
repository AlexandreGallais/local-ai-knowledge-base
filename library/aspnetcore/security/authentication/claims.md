---
title: "Map, customize, transform claims in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/claims.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Map, customize, and transform claims in ASP.NET Core

By Damien Bowden

Claims can be created from any user or identity data that can be issued by using a trusted identity provider or ASP.NET Core identity. A claim is a name-value pair that represents what the subject is, not what the subject can do.

This article describes how to configure and map claims by using an OpenID Connect client and covers the following tasks:

* Set name and role claims
* Reset the claims namespaces
* Customize and extend the claims with the `Microsoft.AspNetCore.Authentication.IClaimsTransformation.TransformAsync*` method

## Map claims with OpenID Connect authentication

The profile claims can be returned in the `id_token`, which is returned after a successful authentication. The ASP.NET Core client app only requires the profile scope. When you use the `id_token` for claims, no extra claims mapping is required.

```csharp
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
   .AddCookie()
   .AddOpenIdConnect(options =>
   {
       options.SignInScheme = "Cookies";
       options.Authority = "-your-identity-provider-";
       options.RequireHttpsMetadata = true;
       options.ClientId = "-your-clientid-";
       options.ClientSecret = "-your-client-secret-from-user-secrets-or-keyvault";
       options.ResponseType = "code";
       options.UsePkce = true;
       options.Scope.Add("profile");
       options.SaveTokens = true;
   });

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

The preceding code requires the Microsoft.AspNetCore.Authentication.OpenIdConnect NuGet package.

Another way to get the user claims is to use the OpenID Connect User Info API. The ASP.NET Core client app uses the `GetClaimsFromUserInfoEndpoint` property to do the configuration. In this scenario, you must explicitly specify the required claims by using the `MapUniqueJsonKey` method. Otherwise, only the `name`, `given_name`, and `email` standard claims are available in the client app. The claims included in the `id_token` are mapped per default.

```csharp
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
   .AddCookie()
   .AddOpenIdConnect(options =>
   {
       options.SignInScheme = "Cookies";
       options.Authority = "-your-identity-provider-";
       options.RequireHttpsMetadata = true;
       options.ClientId = "-your-clientid-";
       options.ClientSecret = "-client-secret-from-user-secrets-or-keyvault";
       options.ResponseType = "code";
       options.UsePkce = true;
       options.Scope.Add("profile");
       options.SaveTokens = true;
       options.GetClaimsFromUserInfoEndpoint = true;
       options.ClaimActions.MapUniqueJsonKey("preferred_username",
                                             "preferred_username");
       options.ClaimActions.MapUniqueJsonKey("gender", "gender");
   });

var app = builder.Build();

// Code removed for brevity.
```

> **Note:**
> The default Open ID Connect handler uses Pushed Authorization Requests (PAR) if the identity provider's discovery document advertises support for PAR. The common location for the identity provider's discovery document is the _.well-known/openid-configuration_ folder. If you can't use PAR in the client configuration on the identity provider, PAR can be disabled by using the `PushedAuthorizationBehavior` option.

```csharp
builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
    })
    .AddCookie()
    .AddOpenIdConnect("oidc", oidcOptions =>
    {
        // Other provider-specific configuration goes here.

        // The default value is PushedAuthorizationBehavior.UseIfAvailable.

        // 'OpenIdConnectOptions' does not contain a definition for 'PushedAuthorizationBehavior'
        // and no accessible extension method 'PushedAuthorizationBehavior' accepting a first argument
        // of type 'OpenIdConnectOptions' could be found
        oidcOptions.PushedAuthorizationBehavior = PushedAuthorizationBehavior.Disable;
    });
```
To ensure authentication succeeds only if PAR is used, use the PushedAuthorizationBehavior.Require enum instead. This change also introduces a new `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectEvents.OnPushAuthorization` event to `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectEvents`, which can be used to customize the pushed authorization request or handle it manually. For more information, see the API proposal in GitHub dotnet/aspnetcore issue #51686 - _Support for Pushed Authorization Requests in OidcHandler_.

To preserve `max_age` validation for PAR, set `max_age` in `OnRedirectToIdentityProvider`. While validation is active, changes to `max_age` in `OnPushAuthorization` are rejected unless the handler skips the push. See OpenID Connect `max_age` validates `auth_time`.

## Name claim and role claim mapping

The **name** claim and **role** claim are mapped to default properties in the ASP.NET Core HTTP context. Sometimes, you need to use different claims for the default properties, or the name claim and role claim don't match the default values. The claims can be mapped by using the `TokenValidationParameters` property and set to any claim as required. The values from the claims can be used directly in the HttpContext `User.Identity.Name` property and the roles.

If the `User.Identity.Name` property has no value, or the roles are missing, check the values in the returned claims and set the `NameClaimType` and the `RoleClaimType` values. The returned claims from the client authentication can be viewed in the HTTP context.

```csharp
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
  .AddCookie()
  .AddOpenIdConnect(options =>
  {
       // Other options...
       options.TokenValidationParameters = new TokenValidationParameters
       {
          NameClaimType = "email"
          //, RoleClaimType = "role"
       };
  });
```

## Claims namespaces, default namespaces

ASP.NET Core adds default namespaces to some known claims. The default claims might not be required in the app. As an option, you can disable the added namespaces and use the exact claims that the OpenID Connect server created.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

JsonWebTokenHandler.DefaultInboundClaimTypeMap.Clear();

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
   .AddCookie()
   .AddOpenIdConnect(options =>
   {
       options.SignInScheme = "Cookies";
       options.Authority = "-your-identity-provider-";
       options.RequireHttpsMetadata = true;
       options.ClientId = "-your-clientid-";
       options.ClientSecret = "-your-client-secret-from-user-secrets-or-keyvault";
       options.ResponseType = "code";
       options.UsePkce = true;
       options.Scope.Add("profile");
       options.SaveTokens = true;
   });

var app = builder.Build();

// Code removed for brevity.
```

If you need to disable the namespaces per scheme and not globally, you can use the `MapInboundClaims = false` option.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
   .AddCookie()
   .AddOpenIdConnect(options =>
   {
       options.SignInScheme = "Cookies";
       options.Authority = "-your-identity-provider-";
       options.RequireHttpsMetadata = true;
       options.ClientId = "-your-clientid-";
       options.ClientSecret = "-your-client-secret-from-user-secrets-or-keyvault";
       options.ResponseType = "code";
       options.UsePkce = true;
       options.MapInboundClaims = false;
       options.Scope.Add("profile");
       options.SaveTokens = true;
   });

var app = builder.Build();

// Code removed for brevity.
```

## Extend or add custom claims using 'IClaimsTransformation'

The `Microsoft.AspNetCore.Authentication.IClaimsTransformation` interface can be used to add extra claims to the `System.Security.Claims.ClaimsPrincipal` class. The interface requires a single method, `Microsoft.AspNetCore.Authentication.IClaimsTransformation.TransformAsync*`.

```csharp
﻿using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

public class MyClaimsTransformation : IClaimsTransformation
{
    public Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
    {
        ClaimsIdentity claimsIdentity = new ClaimsIdentity();
        var claimType = "myNewClaim";
        if (!principal.HasClaim(claim => claim.Type == claimType))
        {
            claimsIdentity.AddClaim(new Claim(claimType, "myClaimValue"));
        }

        principal.AddIdentity(claimsIdentity);
        return Task.FromResult(principal);
    }
}
```

The `Microsoft.AspNetCore.Authentication.IClaimsTransformation` interface and the `MyClaimsTransformation` class can be registered as a service:

```csharp
builder.Services.AddTransient<IClaimsTransformation, MyClaimsTransformation>();
```

> **Note:**
> * **When it is called:** `TransformAsync` is called by the authentication service only after a successful authentication (`Microsoft.AspNetCore.Authentication.AuthenticateResult.Success*`). If authentication fails or no user is authenticated, `TransformAsync` isn't called.
> * **Multiple invocations:** `TransformAsync` can be called multiple times for a single request when authentication is evaluated more than once, such as by authentication middleware, authorization checks, calls to `Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.AuthenticateAsync*`, or calls to `Microsoft.AspNetCore.Authentication.AuthenticationService.AuthenticateAsync*`. Ensure transformations are idempotent; always verify whether a claim already exists before adding it.
> * **Single implementation resolved:** The authentication service resolves a single `IClaimsTransformation` from the dependency injection container, using a last-registration-wins approach. Registering multiple implementations doesn't chain them automatically; the authentication service uses only the last registered implementation (earlier registrations remain in the container and are accessible when resolving `IEnumerable<IClaimsTransformation>`).

## Map claims from external identity providers

If you want to map claims from external identity providers for your app, see Persist other claims and tokens from external providers in ASP.NET Core.

## Related content

- `Microsoft.AspNetCore.Authentication.IClaimsTransformation`
- `System.Security.Claims.ClaimsPrincipal`
