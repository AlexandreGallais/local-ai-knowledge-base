---
title: "Authorize with a specific scheme in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/authorization/authorize-with-a-specific-scheme.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Authorize with a specific scheme in ASP.NET Core

For an introduction to authentication schemes, see Overview of ASP.NET Core Authentication: Authentication scheme.

In some scenarios, such as Single Page Applications (SPAs), it's common to use multiple authentication methods. For example, the app may use cookie-based authentication to sign a user into an app and establish their identity and Bearer <example-value> (often relying on JWTs) for JavaScript-based requests to web API endpoints. In some cases, the app may have multiple instances of an authentication handler. For example, an app has two cookie handlers, where one contains a basic <example-value> and one is created when a multi-factor authentication (MFA) is triggered. MFA may be triggered because the user requested an operation that requires extra security.

For the following `Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication*` call without a default authentication scheme specified, two authentication handlers are added to the app using their default authentication scheme names:

* Cookie (scheme name: "Cookies"): `Microsoft.Extensions.DependencyInjection.CookieExtensions.AddCookie*`
* JWT bearer (scheme name: "Bearer"): `Microsoft.Extensions.DependencyInjection.JwtBearerExtensions.AddJwtBearer*`

```csharp
builder.Services.AddAuthentication()
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Unauthorized/";
        options.AccessDeniedPath = "/Account/Forbidden/";
    })
    .AddJwtBearer(options =>
    {
        options.Audience = "http://localhost:5001/";
        options.Authority = "http://localhost:5000/";
    });
```

Specifying the default scheme when calling `Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication*` results in setting the `Microsoft.AspNetCore.Http.HttpContext.User` property to a `System.Security.Claims.ClaimsPrincipal` that relies on that identity. If this behavior isn't desired, invoke the parameterless form of `Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication*`, as shown in the preceding example.

## JWT bearer NuGet package

Several examples in this article rely on API in the `Microsoft.AspNetCore.Authentication.JwtBearer` NuGet package. The package provides middleware that facilitates JSON Web Token (JWT) authentication, enabling secure authentication for APIs and web services.

## Select a scheme with an `[Authorize]` attribute

An app can specify an authentication handler for Razor components, Minimal API endpoints, controllers, action methods, Razor Pages, and `Microsoft.AspNetCore.Mvc.RazorPages.PageModel`s by passing a comma-delimited list of authentication schemes to the `[Authorize]` attribute. The attribute specifies the authentication schemes regardless of whether or not a default scheme is configured. In the following example, the Cookies (`Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme*`) and Bearer (`Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme*`) authentication schemes are set.

> **Note:**
> The following examples require the following namespaces: `Microsoft.AspNetCore.Authorization`, `Microsoft.AspNetCore.Authentication.Cookies`, and `Microsoft.AspNetCore.Authentication.JwtBearer`.

For a Razor component:

```razor
@attribute [Authorize(AuthenticationSchemes = 
    CookieAuthenticationDefaults.AuthenticationScheme + "," + 
    JwtBearerDefaults.AuthenticationScheme)]
```

For a Minimal API endpoint, decorate the constructor with an `Microsoft.AspNetCore.Authorization.AuthorizeAttribute` to set the schemes:

```csharp
app.MapGet("/api/data", [Authorize(AuthenticationSchemes = 
    CookieAuthenticationDefaults.AuthenticationScheme + "," + 
    JwtBearerDefaults.AuthenticationScheme)] () =>
{
    ...
});
```

Alternatively, you can pass the schemes via a custom policy:

```csharp
app.MapGet("/api/data", () =>
{
    ...
})
.RequireAuthorization(policy => 
    policy.AddAuthenticationSchemes(
        CookieAuthenticationDefaults.AuthenticationScheme + "," + 
        JwtBearerDefaults.AuthenticationScheme));
```

For an MVC controller:

```csharp
[Authorize(AuthenticationSchemes = AuthSchemes)]
public class MixedAuthSchemesController : Controller
{
    private const string AuthSchemes = 
    CookieAuthenticationDefaults.AuthenticationScheme + "," + 
    JwtBearerDefaults.AuthenticationScheme;

    ...
}
```

For a `Microsoft.AspNetCore.Mvc.RazorPages.PageModel` class:

```csharp
[Authorize(AuthenticationSchemes = 
    CookieAuthenticationDefaults.AuthenticationScheme + "," + 
    JwtBearerDefaults.AuthenticationScheme)]
public class MixedAuthSchemesModel : PageModel
{
    ...
}
```

Authorization middleware approves access with any of the specified schemes in the order listed. If both schemes authenticate the user (a valid cookie and a valid bearer token are present), authorization middleware merges the identities into a single `System.Security.Claims.ClaimsPrincipal` context.

By specifying a single scheme, the corresponding handler runs. In the following example, only the handler with the Bearer <example-value> runs, and any cookie-based identities are ignored for the endpoint:

```razor
@using Microsoft.AspNetCore.Authorization
@using Microsoft.AspNetCore.Authentication.JwtBearer
@attribute [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
```

## Select the scheme with an authorization policy

If you prefer to specify the desired schemes in a policy, set the `Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.AuthenticationSchemes` collection when adding the policy.

In the following example, the `Over18` policy only runs against the identity created by the JWT bearer <example-value> (`Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme*`). For an example of the `MinimumAgeRequirement` class used in the following example, see Policy-based authorization in ASP.NET Core. The `Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireAuthenticatedUser*` method enforces user authentication to endpoints where the policy is applied.

> **Note:**
> The following example requires the `Microsoft.AspNetCore.Authentication.JwtBearer` namespace.

```csharp
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("Over18", policy =>
    {
        policy.AuthenticationSchemes.Add(JwtBearerDefaults.AuthenticationScheme);
        policy.RequireAuthenticatedUser();
        policy.Requirements.Add(new MinimumAgeRequirement(18));
    });
```

Use the policy by setting `Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Policy`.

For a Razor component:

```razor
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize(Policy = "Over18")]
```

For a Minimal API endpoint, call `Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization*` with the policy name:

```csharp
app.MapGet("/api/data", () => 
{
    ...
})
.RequireAuthorization("Over18");
```

For a MVC controller:

```csharp
[Authorize(Policy = "Over18")]
public class RegistrationController : Controller
```

For a `Microsoft.AspNetCore.Mvc.RazorPages.PageModel` class:

```csharp
[Authorize(Policy = "Over18")]
public class MixedAuthSchemesModel : PageModel
{
    ...
}
```

## `[Authorize]` attribute scheme and policy scheme interaction

The authorization schemes for an endpoint with one or more `Authorize` attributes and one or more policy-based schemes are *combined* to set the final set of permitted schemes for the endpoint. This forms a union, and any listed scheme may authenticate the request. An attribute adding cookies to a policy restricted to Bearer <example-value> allows a cookie-only request, assuming the cookie creates a `System.Security.Claims.ClaimsPrincipal` meeting the policy requirements.

## Use multiple authentication schemes

Some apps require support for multiple methods of authentication. A typical scenario involves accepting bearer JWTs issued by several identity providers.

Only one JWT bearer <example-value> is registered with the default authentication scheme `Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme*`. Register additional JWT bearer <example-value> for additional identity providers with unique authentication scheme names. The following example names the second scheme "`MEID`" for the ME-ID issuer.

> **Note:**
> The following examples require the `Microsoft.AspNetCore.Authorization` and `Microsoft.AspNetCore.Authentication.JwtBearer` namespaces.

```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Audience = "https://localhost:5000/";
        options.Authority = "https://localhost:5000/identity/";
    })
    .AddJwtBearer("MEID", options =>
    {
        options.Audience = "https://localhost:5000/";
        options.Authority = 
            "https://sts.windows.net/00001111-aaaa-2222-bbbb-3333cccc4444/";
    });
```

Update the default authorization policy to accept both authentication schemes:

```csharp
var defaultAuthorizationPolicyBuilder = new AuthorizationPolicyBuilder(
    JwtBearerDefaults.AuthenticationScheme, "MEID");

defaultAuthorizationPolicyBuilder =
    defaultAuthorizationPolicyBuilder.RequireAuthenticatedUser();

builder.Services.AddAuthorizationBuilder()
    .SetDefaultPolicy(defaultAuthorizationPolicyBuilder.Build());
```

The preceding code configures default authorization with support for multiple authentication schemes:

1. A new `Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder` initializes a policy builder that accepts authentication from two schemes:

   * `Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme*` (JWT bearer <example-value>)
   * "MEID" (the custom authentication scheme for ME-ID, defined earlier)

   This means users can authenticate using either JWT tokens or the MEID scheme

2. `Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireAuthenticatedUser*` is called to require authenticated users for access to protected endpoints.

3. `Microsoft.AspNetCore.Authorization.AuthorizationBuilder.SetDefaultPolicy*` chained to `Microsoft.Extensions.DependencyInjection.PolicyServiceCollectionExtensions.AddAuthorizationBuilder*`:

   * Registers authorization services.
   * Sets this policy as the default for all `[Authorize]` attributes that don't specify a custom policy. Any endpoint marked with `[Authorize]` automatically uses this policy

The result of using the preceding API is that protected endpoints in the app require authentication via either JWT bearer <example-value> or the MEID scheme, providing flexibility in how users authenticate.

## Select a policy scheme based on the `Authorization` header

For guidance on how to use the `Microsoft.AspNetCore.Authentication.AuthenticationBuilder.AddPolicyScheme*` method with the `Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions.ForwardDefaultSelector` property to dynamically select an authentication scheme for each request, see Policy schemes in ASP.NET Core.

## Related content

* Multi-factor authentication in ASP.NET Core
* Protect section with MFA (`dotnet/AspNetCore.Docs` #15791)
* Multiple jwt authentication schemes can't validate signature key (`dotnet/aspnetcore` #26002)
