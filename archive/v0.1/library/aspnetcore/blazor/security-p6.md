---
title: "ASP.NET Core Blazor authentication and authorization (part 6 of 7)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor authentication and authorization (part 6 of 7)

## Expose the authentication state as a cascading parameter

If authentication state data is required for procedural logic, such as when performing an action triggered by the user, obtain the authentication state data by defining a cascading parameter of type `Task<``Microsoft.AspNetCore.Components.Authorization.AuthenticationState``>`, as the following example demonstrates.

`CascadeAuthState.razor`:

```razor
@page "/cascade-auth-state"

<h1>Cascade Auth State</h1>

<p>@authMessage</p>

@code {
    private string authMessage = "The user is NOT authenticated.";

    [CascadingParameter]
    private Task<AuthenticationState>? authenticationState { get; set; }

    protected override async Task OnInitializedAsync()
    {
        if (authenticationState is not null)
        {
            var authState = await authenticationState;
            var user = authState?.User;

            if (user?.Identity is not null && user.Identity.IsAuthenticated)
            {
                authMessage = $"{user.Identity.Name} is authenticated.";
            }
        }
    }
}
```

If `user.Identity.IsAuthenticated` is `true`, claims can be enumerated and membership in roles evaluated.

Set up the `Task<``Microsoft.AspNetCore.Components.Authorization.AuthenticationState``>` cascading parameter using the `Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView` and cascading authentication state services.

When you create a Blazor app from one of the Blazor project templates with authentication enabled, the app includes the `Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView` and the call to `Microsoft.Extensions.DependencyInjection.CascadingAuthenticationStateServiceCollectionExtensions.AddCascadingAuthenticationState*` shown in the following example. A client-side Blazor app includes the required service registrations as well. Additional information is presented in the Customize unauthorized content with the `Router` component section.

```razor
<Router ...>
    <Found ...>
        <AuthorizeRouteView RouteData="routeData"
            DefaultLayout="typeof(Layout.MainLayout)" />
        ...
    </Found>
</Router>
```

In the `Program` file, register cascading authentication state services:

```csharp
builder.Services.AddCascadingAuthenticationState();
```

In a client-side Blazor app, add authorization services to the `Program` file:

```csharp
builder.Services.AddAuthorizationCore();
```

In a server-side Blazor app, services for options and authorization are already present, so no further steps are required.

## Authorization

After a user is authenticated, *authorization* rules are applied to control what the user can do.

Access is typically granted or denied based on whether:

* A user is authenticated (signed in).
* A user is in a *role*.
* A user has a *claim*.
* A *policy* is satisfied.

Each of these concepts is the same as in an ASP.NET Core MVC or Razor Pages app. For more information on ASP.NET Core security, see the articles under ASP.NET Core Security and Identity.

## `AuthorizeView` component

The `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` component selectively displays UI content depending on whether the user is authorized. This approach is useful when you only need to *display* data for the user and don't need to use the user's identity in procedural logic.

The component exposes a `context` variable of type `Microsoft.AspNetCore.Components.Authorization.AuthenticationState` (`@context` in Razor syntax), which you can use to access information about the signed-in user:

```razor
<AuthorizeView>
    <p>Hello, @context.User.Identity?.Name!</p>
</AuthorizeView>
```

You can also supply different content for display if the user isn't authorized with a combination of the `Microsoft.AspNetCore.Components.Authorization.AuthorizeViewCore.Authorized` and `Microsoft.AspNetCore.Components.Authorization.AuthorizeViewCore.NotAuthorized` parameters:

```razor
<AuthorizeView>
    <Authorized>
        <p>Hello, @context.User.Identity?.Name!</p>
        <p><button @onclick="HandleClick">Authorized Only Button</button></p>
    </Authorized>
    <NotAuthorized>
        <p>You're not authorized.</p>
    </NotAuthorized>
</AuthorizeView>

@code {
    private void HandleClick() { ... }
}
```

Although the `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` component controls the visibility of elements based on the user's authorization status, it doesn't enforce security on the event handler itself. In the preceding example, the `HandleClick` method is only associated with a button visible to authorized users, but nothing prevents invoking this method from other places. To ensure method-level security, implement additional authorization logic within the handler itself or in the relevant API.

Razor components of Blazor Web Apps never display `<NotAuthorized>` content when authorization fails server-side during static server-side rendering (static SSR). The server-side ASP.NET Core pipeline processes authorization on the server. Use server-side techniques, such as configuring `Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions.LoginPath` to handle unauthorized requests. For more information, see ASP.NET Core Blazor render modes.

> **Warning:**
> Client-side markup and methods associated with an `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` are only protected from view and execution in the ***rendered UI*** in client-side Blazor apps. In order to protect authorized content and secure methods in client-side Blazor, the content is usually supplied by a secure, authorized web API call to a server API and never stored in the app. For more information, see Call a web API from an ASP.NET Core Blazor app and ASP.NET Core Blazor WebAssembly additional security scenarios.

The content of `Microsoft.AspNetCore.Components.Authorization.AuthorizeViewCore.Authorized` and `Microsoft.AspNetCore.Components.Authorization.AuthorizeViewCore.NotAuthorized` can include arbitrary items, such as other interactive components.

Authorization conditions, such as roles or policies that control UI options or access, are covered in the Authorization section.

If authorization conditions aren't specified, `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` uses a default policy:

* Authenticated (signed-in) users are authorized.
* Unauthenticated (signed-out) users are unauthorized.

The `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` component can be used in the `NavMenu` component (`Shared/NavMenu.razor`) to display a `NavLink` component (`Microsoft.AspNetCore.Components.Routing.NavLink`), but note that this approach only removes the list item from the rendered output. It doesn't prevent the user from navigating to the component. Implement authorization separately in the destination component.

### Role-based and policy-based authorization

The `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` component supports *role-based* or *policy-based* authorization.

For role-based authorization, use the `Microsoft.AspNetCore.Components.Authorization.AuthorizeView.Roles` parameter. In the following example, the user must have a role claim for either the `Admin` or `Superuser` roles:

```razor
<AuthorizeView Roles="Admin, Superuser">
    <p>You have an 'Admin' or 'Superuser' role claim.</p>
</AuthorizeView>
```

To require both `Admin` and `Superuser` role claims, nest `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` components:

```razor
<AuthorizeView Roles="Admin">
    <p>User: @context.User</p>
    <p>You have the 'Admin' role claim.</p>
    <AuthorizeView Roles="Superuser" Context="innerContext">
        <p>User: @innerContext.User</p>
        <p>You have both 'Admin' and 'Superuser' role claims.</p>
    </AuthorizeView>
</AuthorizeView>
```

The preceding code establishes a `Context` for the inner `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` component to prevent an `Microsoft.AspNetCore.Components.Authorization.AuthenticationState` context collision. The `Microsoft.AspNetCore.Components.Authorization.AuthenticationState` context is accessed in the outer `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` with the standard approach for accessing the context (`@context.User`). The context is accessed in the inner `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` with the named `innerContext` context (`@innerContext.User`).

For more information, including configuration guidance, see Role-based authorization in ASP.NET Core.

For policy-based authorization, use the `Microsoft.AspNetCore.Components.Authorization.AuthorizeView.Policy` parameter with a single policy name:

```razor
<AuthorizeView Policy="Over21">
    <p>You satisfy the 'Over21' policy.</p>
</AuthorizeView>
```

To handle the case where the user should satisfy one of several policies, create a policy that confirms that the user satisfies other policies.

To handle the case where the user must satisfy several policies simultaneously, take *either* of the following approaches:

* Create a policy for `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` that confirms that the user satisfies several other policies.
* Nest the policies in multiple `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` components:

  ```razor
  <AuthorizeView Policy="Over21">
      <AuthorizeView Policy="LivesInCalifornia">
          <p>You satisfy the 'Over21' and 'LivesInCalifornia' policies.</p>
      </AuthorizeView>
  </AuthorizeView>
  ```

Claim-based authorization is a special case of policy-based authorization. For example, you can define a policy that requires users to have a certain claim. For more information, see Policy-based authorization in ASP.NET Core.

If both `Microsoft.AspNetCore.Components.Authorization.AuthorizeView.Roles` and `Microsoft.AspNetCore.Components.Authorization.AuthorizeView.Policy` are set, authorization succeeds only when both conditions are satisfied. That is, the user must belong to at least one of the specified roles *and* meet the requirements defined by the policy.

If neither `Microsoft.AspNetCore.Components.Authorization.AuthorizeView.Roles` nor `Microsoft.AspNetCore.Components.Authorization.AuthorizeView.Policy` is specified, `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` uses the default policy:

* Authenticated (signed-in) users are authorized.
* Unauthenticated (signed-out) users are unauthorized.

Role matching is typically case-sensitive because role names are stored and compared using .NET string comparisons. For example, `Admin` (uppercase `A`) isn't treated as the same role as `admin` (lowercase `a`). For more information, see Claim-based authorization in ASP.NET Core. By contrast, ASP.NET Core policy name lookup is typically case-insensitive, so `RequireAdministratorRole` and `requireadministratorrole` refer to the same policy.

### Content displayed during asynchronous authentication

Blazor allows for authentication state to be determined *asynchronously*. The primary scenario for this approach is in client-side Blazor apps that make a request to an external endpoint for authentication.

While authentication is in progress, `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` displays no content. To display content while authentication occurs, assign content to the `Microsoft.AspNetCore.Components.Authorization.AuthorizeViewCore.Authorizing` parameter:

```razor
<AuthorizeView>
    <Authorized>
        <p>Hello, @context.User.Identity?.Name!</p>
    </Authorized>
    <Authorizing>
        <p>You can only see this content while authentication is in progress.</p>
    </Authorizing>
</AuthorizeView>
```

This approach isn't normally applicable to server-side Blazor apps. Server-side Blazor apps know the authentication state as soon as the state is established. `Microsoft.AspNetCore.Components.Authorization.AuthorizeViewCore.Authorizing` content can be provided in an app's `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` component, but the content is never displayed.

## `[Authorize]` attribute

The `[Authorize]` attribute is available in Razor components:

```razor
@page "/"
@attribute [Authorize]

You can only see this if you're signed in.
```

> **Important:**
> Only use `[Authorize]` on `@page` components reached via the Blazor router. Authorization is only performed as an aspect of routing and *not* for child components rendered within a page. To authorize the display of specific parts within a page, use `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` instead.

The `[Authorize]` attribute also supports role-based or policy-based authorization. For role-based authorization, use the `Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Roles` parameter:

```razor
@page "/"
@attribute [Authorize(Roles = "Admin, Superuser")]

<p>You can only see this if you're in the 'Admin' or 'Superuser' role.</p>
```

For policy-based authorization, use the `Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Policy` parameter:

```razor
@page "/"
@attribute [Authorize(Policy = "Over21")]

<p>You can only see this if you satisfy the 'Over21' policy.</p>
```

If neither `Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Roles` nor `Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Policy` is specified, `[Authorize]` uses the default policy:

* Authenticated (signed-in) users are authorized.
* Unauthenticated (signed-out) users are unauthorized.

When the user isn't authorized and if the app doesn't customize unauthorized content with the `Router` component, the framework automatically displays the following fallback message:

```html
Not authorized.
```
