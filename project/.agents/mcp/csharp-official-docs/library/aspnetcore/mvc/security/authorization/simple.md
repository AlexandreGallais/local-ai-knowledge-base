---
title: "Simple authorization in ASP.NET Core MVC"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/mvc/security/authorization/simple.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Simple authorization in ASP.NET Core MVC

Authorization in ASP.NET Core is controlled with the `[Authorize]` attribute and its various parameters. In its most basic form, applying the `[Authorize]` attribute to a Razor component, controller, action, or Razor Page, limits access to that component to authenticated users.

This article covers scenarios that pertain to MVC apps. For the primary coverage on this subject, see Simple authorization in ASP.NET Core.

## `[Authorize]` attribute

The following example limits access to authenticated users by specifying the `[Authorize]` attribute:

```csharp
[Authorize]
public class AccountController : Controller
{
    public ActionResult Login() { ... }
    public ActionResult Logout() { ... }
}
```

The `[Authorize]` attribute also supports role-based or policy-based authorization. For role-based authorization, use the `Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Roles` parameter. In the following example, the user can only access the page if they're in the `Admin` or `Superuser` role:

```csharp
[Authorize(Roles = "Admin, Superuser")]
public class OrderController : Controller
{
    ...
}
```

For policy-based authorization, use the `Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Policy` parameter. In the following example, the user can only access the page if they satisfy the requirements of the `Over21` authorization policy:

```csharp
[Authorize(Policy = "Over21")]
public class LicenseApplicationController : Controller
{
    ...
}
```

If neither `Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Roles` nor `Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Policy` is specified, `[Authorize]` uses the default policy:

* Authenticated (signed-in) users are authorized.
* Unauthenticated (signed-out) users are unauthorized.

To apply authorization to an action rather than the controller, apply the `[Authorize]` attribute to the action. In the following example, only authenticated users can trigger a logout (call the `Logout` method):

```csharp
public class AccountController : Controller
{
   public ActionResult Login() { ... }

   [Authorize]
   public ActionResult Logout() { ... }
}
```

Use the `[AllowAnonymous]` attribute to allow access by non-authenticated users to individual actions:

```csharp
[AllowAnonymous]
```

> **Warning:**
> For MVC controllers, the `[AllowAnonymous]` attribute bypasses authorization statements. If you combine `[AllowAnonymous]` and one or more `[Authorize]` attributes, the `[Authorize]` attributes are ignored. If you apply `[AllowAnonymous]` at the controller level:
>
> * Any authorization requirements from `[Authorize]` attributes on the same controller or action methods on the controller are ignored.
> * Authentication middleware isn't short-circuited but doesn't need to succeed.

For information on how to require authentication for all app users, see Require global user authentication.

## Related content

* Simple authorization in ASP.NET Core
* Simple authorization in ASP.NET Core Razor Pages
