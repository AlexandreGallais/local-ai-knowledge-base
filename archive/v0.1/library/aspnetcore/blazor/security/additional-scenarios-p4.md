---
title: "ASP.NET Core Blazor additional server-side security scenarios (part 4 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/additional-scenarios.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor additional server-side security scenarios (part 4 of 4)

## Server-side Blazor app authorization patterns

*For patterns that apply to Blazor WebAssembly apps, see Secure ASP.NET Core Blazor WebAssembly.*

Server-side Blazor apps (Blazor Web Apps, Blazor Server apps) usually adopt **either** of the following approaches to require authorization:

* The app sets an authorization fallback policy that requires authorization globally across the app and applies the `[AllowAnonymous]` attribute to resources (for example, Razor components, static assets) that don't require an authenticated user. For more information, see the Global authorization via a fallback authorization policy section.
* Instead of requiring global authorization for resources, the app applies the `[Authorize]` attribute to resources that require an authorized user. For more information, see the Local authorization via `[Authorize]` attributes section.

### Global authorization via a fallback authorization policy

The following demonstration code can be used with the `BlazorWebAppAuthorization` sample app (`dotnet/AspNetCore.Docs.Samples` GitHub repository) (how to download).

Set the `Microsoft.AspNetCore.Authorization.AuthorizationOptions.FallbackPolicy` to a policy with `Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireAuthenticatedUser*`. The fallback policy is selected when no policy is produced from authorization metadata. For complete policy selection rules, see Policy-based authorization in ASP.NET Core.

```csharp
builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = options.DefaultPolicy;
});
```

The framework's `Microsoft.AspNetCore.Authorization.AuthorizationOptions.DefaultPolicy` requires an authenticated user. Unless the app uses a custom policy provider with a custom default policy, assigning the framework's default policy (`options.DefaultPolicy`), as shown in the preceding example, is equivalent to using the following code:

```csharp
builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});
```

The app requires an authenticated user for any resource where no specific policy is set.

If the app's security specification doesn't call for protecting static assets, call `Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.AllowAnonymous*` on `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*`:

```csharp
app.MapStaticAssets().AllowAnonymous();
```

To alternatively allow anonymous access for specific paths, apply the `Microsoft.AspNetCore.Authorization.AllowAnonymousAttribute` to the route pattern inside the endpoint convention lambda of `Microsoft.AspNetCore.StaticAssets.StaticAssetsEndpointConventionBuilder.Add*`.

> **Important:**
> When only authorizing specific endpoints for anonymous access, the Blazor script and other Blazor static assets, such as stylesheets, scripts, and modules, must be taken into consideration. If public Razor component pages require the assets to render and function correctly, the assets must be made available anonymously as well because they're requested separately via Map Static Assets routing endpoint conventions or static files middleware.

Place static assets for anonymous access into a single folder. In the following example, endpoint routes with the `/public/` path segment are served anonymously:

```csharp
app.MapStaticAssets()
    .Add(endpointBuilder =>
    {
        if (endpointBuilder is RouteEndpointBuilder routeBuilder &&
            routeBuilder.RoutePattern.RawText?.Contains(
            "/public/", StringComparison.OrdinalIgnoreCase) == true)
        {
            routeBuilder.Metadata.Add(new AllowAnonymousAttribute());
        }
    });
```

The next example demonstrates anonymously serving the uncompressed Blazor script (`_framework/blazor.web.{FINGERPRINT}.js`, where the `{FINGERPRINT}` placeholder is the file's fingerprint):

```csharp
// using System.Text.RegularExpressions;

var regex = new Regex(
    @"^_framework/blazor\.web\.[a-z0-9]{10}\.js$", RegexOptions.Compiled);

app.MapStaticAssets()
    .Add(endpointBuilder =>
    {
        if (endpointBuilder is RouteEndpointBuilder routeBuilder &&
            regex.IsMatch(routeBuilder.RoutePattern.RawText ?? string.Empty))
        {
            routeBuilder.Metadata.Add(new AllowAnonymousAttribute());
        }
    });
```

Use an `@using` directive for the `Microsoft.AspNetCore.Authorization` namespace with an `@attribute` directive for the `[AllowAnonymous]` attribute to permit anonymous access to individual components. In the following example, the `Home` component sets the attribute.

At the top of `Components/Pages/Home.razor`:

```razor
@page "/"
@using Microsoft.AspNetCore.Authorization
@attribute [AllowAnonymous]
```

Often, it's convenient to apply authorization to an entire folder of components. In the following example, a user account pages' imports file sets the `[AllowAnonymous]` attribute, so users can anonymously reach the app's sign-in, sign-out, access denied, and invalid user pages in the `Components/Account/Pages` folder.

In `Components/Account/Pages/_Imports.razor`:

```razor
@using Microsoft.AspNetCore.Authorization
@attribute [AllowAnonymous]
```

If the app uses one or more endpoint convention builder instances to provide additional endpoints, such as for Identity components, the endpoint builder's method call chains a call to `Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.AllowAnonymous*`. The following example maps additional Identity endpoints by calling `MapAdditionalIdentityEndpoints`, which returns an `Microsoft.AspNetCore.Builder.IEndpointConventionBuilder`:

```csharp
app.MapAdditionalIdentityEndpoints().AllowAnonymous();
```

> **Note:**
> For an example of the preceding `MapAdditionalIdentityEndpoints` method, see `IdentityComponentsEndpointRouteBuilderExtensions` in the `BlazorWebAppAuthorization` sample app (`dotnet/AspNetCore.Docs.Samples` GitHub repository).

### Local authorization via `[Authorize]` attributes

Apply `[Authorize]` attributes (API documentation) to Razor components using ***either*** of the following approaches:

* In the app's imports file, add an `@using` directive for the `Microsoft.AspNetCore.Authorization` namespace with an `@attribute` directive for the `[Authorize]` attribute.

  `_Imports.razor`:

  ```razor
  @using Microsoft.AspNetCore.Authorization
  @attribute [Authorize]
  ```

  Imports files can be applied at any level of a folder hierarchy to apply an `[Authorize]` attribute for that folder's components and its subfolders.

* Add the `[Authorize]` attribute to each Razor component that requires authorization under the `@page` directive with an `@using` directive for the `Microsoft.AspNetCore.Authorization` namespace:

  ```razor
  @using Microsoft.AspNetCore.Authorization
  @attribute [Authorize]
  ```

  The `@using` directive for the `Microsoft.AspNetCore.Authorization` namespace in the preceding example can be applied broadly to the app's components by placing it into the app's imports file (`_Imports.razor`) instead of in individual components.
