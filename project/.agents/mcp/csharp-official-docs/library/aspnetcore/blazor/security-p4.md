---
title: "ASP.NET Core Blazor authentication and authorization (part 4 of 7)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/security/index.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor authentication and authorization (part 4 of 7)

### Authentication state management at sign out

The default revalidation interval is 30 minutes for either ASP.NET Core Identity-based authentication or cookie-based authentication without Identity. Within the 30-minute window, it remains possible under certain sign-out conditions for a user to retain access to areas of the app that you might wish to prevent.

To control the revalidation period and enforce a complete sign out process for users, begin by implementing a `Microsoft.AspNetCore.Components.Server.RevalidatingServerAuthenticationStateProvider` with a shorter `Microsoft.AspNetCore.Components.Server.RevalidatingServerAuthenticationStateProvider.RevalidationInterval`.

For an example implementation showing the default 30-minute interval, see the `IdentityRevalidatingAuthenticationStateProvider` class (reference source) in the Blazor Web App project template.

In the following example, the interval is set to five minutes:

```csharp
protected override TimeSpan RevalidationInterval => TimeSpan.FromMinutes(5);
```

Implementing `Microsoft.AspNetCore.Components.Server.RevalidatingServerAuthenticationStateProvider` with a short `Microsoft.AspNetCore.Components.Server.RevalidatingServerAuthenticationStateProvider.RevalidationInterval` only revalidates the authentication state held by the current Blazor circuit. Returning `false` from `Microsoft.AspNetCore.Components.Server.RevalidatingServerAuthenticationStateProvider.ValidateAuthenticationStateAsync*` flips the circuit's state to unauthenticated, so instances of `Microsoft.AspNetCore.Components.Authorization.AuthorizeView`/`Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView` re-evaluate and redirect the user to sign in. However, returning `false` from `Microsoft.AspNetCore.Components.Server.RevalidatingServerAuthenticationStateProvider.ValidateAuthenticationStateAsync*` doesn't affect the underlying authentication cookie. The next full navigation that occurs before the cookie expires or is invalidated recreates the principal from the cookie. When that happens, the cookie indicates a signed-in user to the `Microsoft.AspNetCore.Components.Server.RevalidatingServerAuthenticationStateProvider`, so the user appears signed in until the next `Microsoft.AspNetCore.Components.Server.RevalidatingServerAuthenticationStateProvider.RevalidationInterval` tick fires.

> **Note:**
> Each browser tab requires a separate circuit, so additional tabs opened by a user don't observe an authentication state change until their circuits revalidate. However, the approach in this section sets the revalidation interval for all of the tabs opened by a user.

To control the revalidation interval in apps that adopt ASP.NET Core Identity with cookie authentication, see the following Sign out for ASP.NET Core Identity subsection for details. For apps that adopt cookie-based authentication without Identity, see the following Sign out for cookie-based authentication subsection.

#### Sign out for ASP.NET Core Identity

To force a complete sign-out within less than the default 30-minute revalidation interval in apps that adopt ASP.NET Core Identity, use the guidance in this section.

For Blazor apps that target .NET 8 or later, reduce the default 30-minute `Microsoft.AspNetCore.Components.Server.RevalidatingServerAuthenticationStateProvider.RevalidationInterval` in the `IdentityRevalidatingAuthenticationStateProvider` class (`Components/Account/IdentityRevalidatingAuthenticationStateProvider.cs`). If the app targets .NET earlier than .NET 8, reduce the interval in `RevalidatingIdentityAuthenticationStateProvider`.

Whether or not the authentication cookie remains valid is checked by the *security stamp validator* (`Microsoft.AspNetCore.Identity.SecurityStampValidator`), which hooks into the `Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationEvents.OnValidatePrincipal` event of an authentication cookie and queries the user datastore to determine if the user is still signed in. The security stamp validator's interval is governed by `Microsoft.AspNetCore.Identity.SecurityStampValidatorOptions.ValidationInterval`, which defaults to 30 minutes because validating users on every request triggers a database query on every request for every user.

The following example shortens the default 30-minute interval to four minutes:

```csharp
builder.Services.Configure<SecurityStampValidatorOptions>(
    o => o.ValidationInterval = TimeSpan.FromMinutes(4));
```

The call interval is a tradeoff between hitting the user datastore too frequently and not often enough. Checking with a short interval can result in high demand on the user datastore and reduced app performance but with the benefit of more timely sign-outs. Checking with a long interval results in stale claims, which can make it appear that a user is still signed in if a full navigation recreates the principal from the authentication cookie before it naturally expires.

To catch the next interval tick of the `Microsoft.AspNetCore.Components.Server.RevalidatingServerAuthenticationStateProvider`, set the `Microsoft.AspNetCore.Identity.SecurityStampValidatorOptions.ValidationInterval` to a period just inside the value set for `Microsoft.AspNetCore.Components.Server.RevalidatingServerAuthenticationStateProvider.RevalidationInterval`.

Custom C# code that's required to force a sign out on a user can call `Microsoft.AspNetCore.Identity.UserManager`1.UpdateSecurityStampAsync*`, which immediately invalidates existing cookies the next time they're checked.

For more information, see Configure ASP.NET Core Identity.

#### Sign out for cookie-based authentication

To proactively, completely sign a user off within less than the default 30-minute revalidation interval in apps that adopt cookie-based authentication without ASP.NET Core Identity, use the guidance in this section.

There are two approaches that you can take. The first approach is to wait for a revalidation check to occur and ensure cookie invalidation when the check is made. To adopt this approach, pair an implementation of `Microsoft.AspNetCore.Components.Server.RevalidatingServerAuthenticationStateProvider` with a shorter `Microsoft.AspNetCore.Components.Server.RevalidatingServerAuthenticationStateProvider.RevalidationInterval` (default: 30 minutes) and a sign-out trigger. Implement the sign-out trigger using ***either*** of the following approaches.

* Sign out on GET in the app's login page. This approach is only valid for static SSR because `Microsoft.AspNetCore.Http.HttpContext` is `null` during interactive rendering:

  ```csharp
  [CascadingParameter]
  private HttpContext HttpContext { get; set; } = default!;

  protected override async Task OnInitializedAsync()
  {
      ...

      if (HttpMethods.IsGet(HttpContext.Request.Method))
      {
          await HttpContext.SignOutAsync(
            CookieAuthenticationDefaults.AuthenticationScheme);
      }
  }
  ```

* Call `NavigationManager.NavigateTo("/Account/Logout", forceLoad: true)` where you sign out users. Create an endpoint for `/Account/Logout` with a call to `Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapGet*` in the app's `Program` file, which in turn calls `Microsoft.AspNetCore.Authentication.AuthenticationService.SignOutAsync*`:

  ```csharp
  app.MapGet("/Account/Logout", async (HttpContext context) =>
  {
      await context.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

      return TypedResults.LocalRedirect("/");
  })
  .RequireAuthorization();
  ```

The alternative second approach is aimed at first-request freshness without waiting for the next revalidation check. To adopt this approach, perform a user datastore authentication check in `Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationEvents.OnValidatePrincipal` and call `Microsoft.AspNetCore.Authentication.Cookies.CookieValidatePrincipalContext.RejectPrincipal*` with `Microsoft.AspNetCore.Authentication.AuthenticationService.SignOutAsync*`.

For more information, see the following sections of the *Use cookie authentication without ASP.NET Core Identity* article:

* Sign out
* React to back-end changes

### Temporary redirection URL validity duration

*This section applies to Blazor Web Apps.*

Use the `Microsoft.AspNetCore.Components.Endpoints.RazorComponentsServiceOptions.TemporaryRedirectionUrlValidityDuration` option to get or set the lifetime of ASP.NET Core Data Protection validity for temporary redirection URLs emitted by Blazor server-side rendering. These are only used transiently, so the lifetime only needs to be long enough for a client to receive the URL and begin navigation to it. However, it should also be long enough to allow for clock skew across servers. The default value is five minutes.

In the following example the value is extended to seven minutes:

```csharp
builder.Services.AddRazorComponents(options =>
    options.TemporaryRedirectionUrlValidityDuration =
        TimeSpan.FromMinutes(7));
```

## Client-side Blazor authentication

In client-side Blazor apps, client-side authentication checks can be bypassed because all client-side code can be modified by users. The same is true for all client-side app technologies, including JavaScript SPA frameworks and native apps for any operating system.

Add the following:

* A package reference for the `Microsoft.AspNetCore.Components.Authorization` NuGet package.

  > **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

* The `Microsoft.AspNetCore.Components.Authorization` namespace to the app's imports file (`_Imports.razor`).

To handle authentication, use the built-in or custom `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` service.

For more information on client-side authentication, see Secure ASP.NET Core Blazor WebAssembly.
