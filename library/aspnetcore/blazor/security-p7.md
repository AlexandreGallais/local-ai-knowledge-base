---
title: "ASP.NET Core Blazor authentication and authorization (part 7 of 7)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor authentication and authorization (part 7 of 7)

## Resource authorization

To authorize users for resources, pass the request's route data to the `Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView.Resource` parameter of `Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView`.

In the `Microsoft.AspNetCore.Components.Routing.Router.Found` content for a requested route:

```razor
<AuthorizeRouteView Resource="routeData" RouteData="routeData"
    DefaultLayout="typeof(MainLayout)" />
```

For more information on how authorization state data is passed and used in procedural logic, see the Expose the authentication state as a cascading parameter section.

When the `Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView` receives the route data for the resource, authorization policies have access to `Microsoft.AspNetCore.Components.RouteData.PageType` and `Microsoft.AspNetCore.Components.RouteData.RouteValues` that permit custom logic to make authorization decisions.

In the following example, an `EditUser` policy is created in `Microsoft.AspNetCore.Authorization.AuthorizationOptions` for the app's authorization service configuration (`Microsoft.Extensions.DependencyInjection.AuthorizationServiceCollectionExtensions.AddAuthorizationCore*`) with the following logic:

* Determine if a route value exists with a key of `id`. If the key exists, the route value is stored in `value`.
* In a variable named `id`, store `value` as a string or set an empty string value (`string.Empty`).
* If `id` isn't an empty string, assert that the policy is satisfied (return `true`) if the string's value starts with `EMP`. Otherwise, assert that the policy fails (return `false`).

In the `Program` file:

* Add namespaces for `Microsoft.AspNetCore.Components` and `System.Linq`:

  ```csharp
  using Microsoft.AspNetCore.Components;
  using System.Linq;
  ```

* Add the policy:

  ```csharp
  options.AddPolicy("EditUser", policy =>
      policy.RequireAssertion(context =>
      {
          if (context.Resource is RouteData rd)
          {
              var routeValue = rd.RouteValues.TryGetValue("id", out var value);
              var id = Convert.ToString(value,
                  System.Globalization.CultureInfo.InvariantCulture) ?? string.Empty;

              if (!string.IsNullOrEmpty(id))
              {
                  return id.StartsWith("EMP", StringComparison.InvariantCulture);
              }
          }

          return false;
      })
  );
  ```

The preceding example is an oversimplified authorization policy, merely used to demonstrate the concept with a working example. For more information on creating and configuring authorization policies, see Policy-based authorization in ASP.NET Core.

In the following `EditUser` component, the resource at `/users/{id}/edit` has a route parameter for the user's identifier (`{id}`). The component uses the preceding `EditUser` authorization policy to determine if the route value for `id` starts with `EMP`. If `id` starts with `EMP`, the policy succeeds and access to the component is authorized. If `id` starts with a value other than `EMP` or if `id` is an empty string, the policy fails, and the component doesn't load.

`EditUser.razor`:

```razor
@page "/users/{id}/edit"
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize(Policy = "EditUser")]

<h1>Edit User</h1>

<p>The "EditUser" policy is satisfied! <code>Id</code> starts with 'EMP'.</p>

@code {
    [Parameter]
    public string? Id { get; set; }
}
```

## Customize unauthorized content with the `Router` component

The `Microsoft.AspNetCore.Components.Routing.Router` component, in conjunction with the `Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView` component, allows the app to specify custom content if:

* The user fails an `[Authorize]` condition applied to the component. The markup of the `<NotAuthorized>` element is displayed. The `[Authorize]` attribute is covered in the `[Authorize]` attribute section.
* Asynchronous authorization is in progress, which usually means that the process of authenticating the user is in progress. The markup of the `<Authorizing>` element is displayed.

> **Important:**
> Blazor router features that display `<NotAuthorized>` and `<NotFound>` content aren't operational during static server-side rendering (static SSR) because request processing is entirely handled by ASP.NET Core middleware pipeline request processing and Razor components aren't rendered at all for unauthorized or bad requests. Use server-side techniques to handle unauthorized and bad requests during static SSR. For more information, see ASP.NET Core Blazor render modes.

```razor
<Router ...>
    <Found ...>
        <AuthorizeRouteView ...>
            <NotAuthorized>
                ...
            </NotAuthorized>
            <Authorizing>
                ...
            </Authorizing>
        </AuthorizeRouteView>
    </Found>
</Router>
```

The content of `Microsoft.AspNetCore.Components.Authorization.AuthorizeViewCore.Authorized` and `Microsoft.AspNetCore.Components.Authorization.AuthorizeViewCore.NotAuthorized` can include arbitrary items, such as other interactive components.

> **Note:**
> The preceding requires cascading authentication state services registration in the app's `Program` file:
>
> ```csharp
> builder.Services.AddCascadingAuthenticationState();
> ```

If `Microsoft.AspNetCore.Components.Authorization.AuthorizeViewCore.NotAuthorized` content isn't specified, the `Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView` uses the following fallback message:

```html
Not authorized.
```

An app created from the Blazor WebAssembly project template with authentication enabled includes a `RedirectToLogin` component, which is positioned in the `<NotAuthorized>` content of the `Microsoft.AspNetCore.Components.Routing.Router` component. When a user isn't authenticated (`context.User.Identity?.IsAuthenticated != true`), the `RedirectToLogin` component redirects the browser to the `authentication/login` endpoint for authentication. The user is returned to the requested URL after authenticating with the identity provider.

## Procedural logic

If the app is required to check authorization rules as part of procedural logic, use a cascaded parameter of type `Task<``Microsoft.AspNetCore.Components.Authorization.AuthenticationState``>` to obtain the user's `System.Security.Claims.ClaimsPrincipal`. `Task<``Microsoft.AspNetCore.Components.Authorization.AuthenticationState``>` can be combined with other services, such as `IAuthorizationService`, to evaluate policies.

In the following example:

* The `user.Identity.IsAuthenticated` executes code for authenticated (signed-in) users.
* The `user.IsInRole("admin")` executes code for users in the 'Admin' role.
* The `(await AuthorizationService.AuthorizeAsync(user, "content-editor")).Succeeded` executes code for users satisfying the 'content-editor' policy.

A server-side Blazor app includes the appropriate namespaces when created from the project template. In a client-side Blazor app, confirm the presence of the `Microsoft.AspNetCore.Authorization` and `Microsoft.AspNetCore.Components.Authorization` namespaces either in the component or in the app's imports file (`_Imports.razor`):

```razor
@using Microsoft.AspNetCore.Authorization
@using Microsoft.AspNetCore.Components.Authorization
```

`ProceduralLogic.razor`:

```razor
@page "/procedural-logic"
@inject IAuthorizationService AuthorizationService

<h1>Procedural Logic Example</h1>

<button @onclick="@DoSomething">Do something important</button>

@code {
    [CascadingParameter]
    private Task<AuthenticationState>? authenticationState { get; set; }

    private async Task DoSomething()
    {
        if (authenticationState is not null)
        {
            var authState = await authenticationState;
            var user = authState?.User;

            if (user is not null)
            {
                if (user.Identity is not null && user.Identity.IsAuthenticated)
                {
                    // ...
                }

                if (user.IsInRole("Admin"))
                {
                    // ...
                }

                if ((await AuthorizationService.AuthorizeAsync(user, "content-editor"))
                    .Succeeded)
                {
                    // ...
                }
            }
        }
    }
}
```

## Troubleshoot errors

Common errors:

* **Authorization requires a cascading parameter of type `Task<AuthenticationState>`. Consider using `CascadingAuthenticationState` to supply this.**

* **`null` value is received for `authenticationStateTask`**

It's likely that the project wasn't created using a server-side Blazor template with authentication enabled.

In .NET 7 or earlier, wrap a `<CascadingAuthenticationState>` around some part of the UI tree, for example around the Blazor router:

```razor
<CascadingAuthenticationState>
    <Router ...>
        ...
    </Router>
</CascadingAuthenticationState>
```

In .NET 8 or later, don't use the `Microsoft.AspNetCore.Components.Authorization.CascadingAuthenticationState` component:

```diff
- <CascadingAuthenticationState>
      <Router ...>
          ...
      </Router>
- </CascadingAuthenticationState>
```

Instead, add cascading authentication state services to the service collection in the `Program` file:

```csharp
builder.Services.AddCascadingAuthenticationState();
```

The `Microsoft.AspNetCore.Components.Authorization.CascadingAuthenticationState` component (.NET 7 or earlier) or services provided by `Microsoft.Extensions.DependencyInjection.CascadingAuthenticationStateServiceCollectionExtensions.AddCascadingAuthenticationState*` (.NET 8 or later) supplies the `Task<``Microsoft.AspNetCore.Components.Authorization.AuthenticationState``>` cascading parameter, which in turn it receives from the underlying `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` dependency injection service.

## Personally Identifiable Information (PII)

Microsoft uses the GDPR definition for 'personal data' (GDPR 4.1) when documentation discusses Personally Identifiable Information (PII).

PII refers any information relating to an identified or identifiable natural person. An identifiable natural person is one who can be identified, directly or indirectly, with any of the following:

* Name
* Identification number
* Location coordinates
* Online identifier
* Other specific factors
  * Physical
  * Physiological
  * Genetic
  * Mental (psychological)
  * Economic
  * Cultural
  * Social identity

## Related content

* Server-side and Blazor Web App resources
  * Authorization patterns
  * Quickstart: Add sign-in with Microsoft to an ASP.NET Core web app
  * Quickstart: Protect an ASP.NET Core web API with Microsoft identity platform
  * Configure ASP.NET Core to work with proxy servers and load balancers: Includes guidance on:
    * Using forwarded headers middleware to preserve HTTPS scheme information across proxy servers and internal networks.
    * Additional scenarios and use cases, including manual scheme configuration, request path changes for correct request routing, and forwarding the request scheme for Linux and non-IIS reverse proxies.
* Microsoft identity platform documentation
  * Overview
  * OAuth 2.0 and OpenID Connect protocols on the Microsoft identity platform
  * Microsoft identity platform and OAuth 2.0 authorization code flow
  * Microsoft identity platform ID tokens
  * Microsoft identity platform access tokens
* ASP.NET Core security topics
* Configure Windows Authentication in ASP.NET Core
* IHttpContextAccessor/HttpContext in ASP.NET Core Blazor apps
* Replace the Microsoft Authentication Library for JavaScript (`MSAL.js`)
* Awesome Blazor: Authentication community sample links
* ASP.NET Core Blazor Hybrid authentication and authorization
* Opaque (reference) access token support
* Blazor WebAssembly authorization patterns
