---
title: "Simple authorization in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authorization/simple.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Simple authorization in ASP.NET Core

Authorization in ASP.NET Core is controlled with the `[Authorize]` attribute and its various parameters. In its most basic form, applying the `[Authorize]` attribute to a Razor component, controller, action, or Razor Page, limits access to that component to authenticated users.

This article uses Blazor Razor component examples and focuses on Blazor authorization scenarios. For Razor Pages and MVC guidance, see the following resources after reading this article:

* Simple authorization in ASP.NET Core Razor Pages
* Simple authorization in ASP.NET Core MVC

## `[Authorize]` attribute

In Blazor apps, specify the `[Authorize]` attribute at the top of a Razor component file (`.razor`). In the following example, only authenticated users can access the page:

```razor
@page "/"
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize]

You can only see this if you're signed in.
```

> **Important:**
> Only use the `[Authorize]` attribute on `@page` components reached via the Blazor router. Authorization is only performed as an aspect of routing and *not* for child components rendered within a page. To authorize the display of specific parts within a page, use an `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` component instead, which is described in ASP.NET Core Blazor authentication and authorization.

The `[Authorize]` attribute can also be applied to all of the Razor components in a Blazor app or a subset of Razor components in a folder using an imports file (`_Imports.razor`). Add an `@using` directive for the `Microsoft.AspNetCore.Authorization` namespace with an `@attribute` directive for the `[Authorize]` attribute:

```razor
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize]
```

The `[Authorize]` attribute also supports role-based or policy-based authorization. For role-based authorization, use the `Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Roles` parameter. In the following example, the user can only access the page if they're in the `Admin` or `Superuser` role:

```razor
@page "/"
@attribute [Authorize(Roles = "Admin, Superuser")]

<p>You can only see this if you're in the 'Admin' or 'Superuser' role.</p>
```

For policy-based authorization, use the `Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Policy` parameter. In the following example, the user can only access the page if they satisfy the requirements of the `Over21` authorization policy:

```razor
@page "/"
@attribute [Authorize(Policy = "Over21")]

<p>You can only see this if you satisfy the 'Over21' policy.</p>
```

If neither `Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Roles` nor `Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Policy` is specified, `[Authorize]` uses the default policy:

* Authenticated (signed-in) users are authorized.
* Unauthenticated (signed-out) users are unauthorized.

Endpoints without authorization metadata don't use the default policy. Such endpoints don't require authorization unless the app configures a fallback policy. For a comparison of named, default, and fallback policies, see Policy-based authorization in ASP.NET Core.

When the user isn't authorized and if the app doesn't customize unauthorized content with the `Router` component, the framework automatically displays the following fallback message:

```html
Not authorized.
```

For more information on Blazor authentication and authorization, see ASP.NET Core Blazor authentication and authorization.

Use the `[AllowAnonymous]` attribute to allow access by non-authenticated users to individual actions:

```razor
@using Microsoft.AspNetCore.Authorization
@attribute [AllowAnonymous]
```

For server-side apps where most endpoints require authentication, see Require global user authentication.

## Related content

* Simple authorization in ASP.NET Core Razor Pages
* Simple authorization in ASP.NET Core MVC
