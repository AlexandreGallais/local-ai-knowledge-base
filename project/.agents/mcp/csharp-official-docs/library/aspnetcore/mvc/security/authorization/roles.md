---
title: "Role-based authorization in ASP.NET Core MVC"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/mvc/security/authorization/roles.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Role-based authorization in ASP.NET Core MVC

When a user's identity is created after authentication, the user may belong to one or more *roles*, reflecting various authorizations that the user has to access data and perform operations. For example, Tracy may belong to the "Administrator" and "User" roles with access to administrative web pages in the app, while Scott may only belong to the "User" role and not have access to administrative data or operations. How these roles are created and managed depends on the backing store of the authorization process. Roles are exposed to the developer through `System.Security.Claims.ClaimsPrincipal.IsInRole*`. `Microsoft.AspNetCore.Identity.IdentityBuilder.AddRoles*` must be called to add Role services when setting up the app's identity system.

While roles are claims, not all claims are roles. Depending on the identity issuer, a role may be a collection of users that may apply claims for group members, as well as an actual claim on an identity. However, claims are meant to be information about an individual user. Using roles to add claims to a user can confuse the boundary between the user and their individual claims. This confusion is why the single-page application (SPA) templates aren't designed around roles. In addition, for organizations migrating from an on-premises legacy system, the proliferation of roles over the years can mean a role claim may be too large to be contained within a token <example-value> by a SPA. To secure SPAs, see Use Identity to secure a Web API backend for SPAs.

This article uses MVC examples and focuses on MVC scenarios. For Blazor and Razor Pages guidance, see the following resources:

* Role-based authorization in ASP.NET Core
* Role-based authorization in ASP.NET Core Razor Pages

## Add Role services to Identity

Register role-based authorization services in the `Program` file by calling `Microsoft.AspNetCore.Identity.IdentityBuilder.AddRoles*` with the role type in the app's Identity configuration. The role type in the following example is `IdentityRole`:

```csharp
builder.Services.AddDefaultIdentity<IdentityUser>( ... )
    .AddRoles<IdentityRole>()
    ...
```

The preceding code requires the `Microsoft.AspNetCore.Identity.UI` NuGet package and a `using` directive for `Microsoft.AspNetCore.Identity`.

In cases where the app takes granular control to build Identity manually, call `Microsoft.AspNetCore.Identity.IdentityBuilder.AddRoles*` on `Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.AddIdentityCore*`:

```csharp
builder.Services.AddIdentityCore<IdentityUser>()
    .AddRoles<IdentityRole>()
    ...
```

## Role-based authorization checks

Role-based authorization checks:

* Are declarative and specify roles which the current user must be a member of to access the requested resource.
* Are applied to controllers or actions within a controller.

For example, the following code limits access to any actions on a controller to users who are a member of the `Administrator` role:

```csharp
[Authorize(Roles = "Administrator")]
public class AdministrationController : Controller
{
    ...
}
```

Multiple roles can be specified as a comma-separated list. In the following example, access is limited to users who are members of the `HRManager` role *or* the `Finance` role:

```csharp
[Authorize(Roles = "HRManager, Finance")]
public class SalaryController : Controller
{
    ...
}
```

When multiple attributes are applied, the user must be a member of *all* of the roles specified. The following example requires *both* `PowerUser` *and* `ControlPanelUser` roles to call the `SetTime` and `Shutdown` actions:

```csharp
[Authorize(Roles = "PowerUser")]
[Authorize(Roles = "ControlPanelUser")]
public class ControlPanelController : Controller
{
    public IActionResult SetTime() { ... }
    public IActionResult ShutDown() { ... }
}
```

Access to an action can be limited by applying additional role authorization attributes at the action level:

```csharp
[Authorize(Roles = "Administrator, PowerUser")]
public class ControlPanelController : Controller
{
    public IActionResult SetTime() { ... }

    [Authorize(Roles = "Administrator")]
    public IActionResult ShutDown() { ... }
}
```

In the preceding controller:

* Members of the `Administrator` role or the `PowerUser` role can access the controller and the `SetTime` action.
* Only members of the `Administrator` role can access the `ShutDown` action.

A controller can be secured but still allow anonymous, unauthenticated access to individual actions with the `[AllowAnonymous]` attribute:

```csharp
[Authorize]
public class Control3PanelController : Controller
{
    public IActionResult SetTime() { ... }

    [AllowAnonymous]
    public IActionResult Login() { ... }
}
```

Role matching is typically case-sensitive because role names are stored and compared using .NET string comparisons. For example, `Admin` (uppercase `A`) isn't treated as the same role as `admin` (lowercase `a`). For more information, see Claim-based authorization in ASP.NET Core.

## Policy-based authorization checks

Role requirements can be expressed using policy syntax, where the app registers a policy at startup as part of the Authorization service configuration. In the following example, the `RequireAdministratorRole` policy specifies that all users must be in the `Administrator` role:

```csharp
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("RequireAdministratorRole",
         policy => policy.RequireRole("Administrator"));
```

Policies are applied using the `Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Policy` property on the `[Authorize]` attribute:

```csharp
[Authorize(Policy = "RequireAdministratorRole")]
public IActionResult Shutdown() { ... }
```

In contrast to role matching, which is typically case-sensitive, ASP.NET Core policy name lookup is typically case-insensitive, so `RequireAdministratorRole` and `requireadministratorrole` refer to the same policy.

To specify multiple allowed roles in a requirement, specify the roles as parameters to the `Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireRole*` method. In the following example, users are authorized if they belong to the `Administrator`, `PowerUser`, *or* `BackupAdministrator` roles:

```csharp
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("ElevatedRights", policy =>
          policy.RequireRole("Administrator", "PowerUser", "BackupAdministrator"));
```

If you want the policy to require all of the preceding roles, either chain the roles to the policy builder or specify them to the policy builder individually in a statement lambda.

Chained to the policy builder:

```csharp
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("ElevatedRights", policy => 
        policy
            .RequireRole("Administrator")
            .RequireRole("PowerUser")
            .RequireRole("BackupAdministrator"));
```

Alternatively, use a statement lambda:

```csharp
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("ElevatedRights",
        policy =>
        {
            policy.RequireRole("Administrator");
            policy.RequireRole("PowerUser");
            policy.RequireRole("BackupAdministrator");
        });
```

## Windows Authentication security groups as app roles

After the app is configured for Windows Authentication with the client and server machines part of the same Windows domain, user security groups are automatically included as claims in the user's `System.Security.Claims.ClaimsPrincipal`.

The `User.Identity` is typically a `System.Security.Principal.WindowsIdentity` when using Windows Authentication, and you can retrieve the SID group claims or check if a user is in a role with the following code, where the `{DOMAIN}` placeholder is the domain and the `{SID GROUP NAME}` is the SID group name:

```csharp
if (User.Identity is WindowsIdentity windowsIdentity)
{
    var groups = windowsIdentity.Groups;

    // If needed, obtain a list of the SID groups
    var securityGroups = 
        groups.Select(g => g.Translate(typeof(NTAccount)).ToString()).ToList();

    // If needed, obtain the user's Windows identity name
    var windowsIdentityName = windowsIdentity.Name;

    // Check if the user is in a specific SID group
    if (User.IsInRole(@"{DOMAIN}\{SID GROUP NAME}"))
    {
        // User is in the specified group
    }
    else
    {
        // User isn't in the specified group
    }
}
else
{
    // The user isn't authenticated with Windows Authentication
}
```

For a demonstration of related code that translates SID group claims into human-readable values in a Blazor app, see the `UserClaims` component in Secure an ASP.NET Core Blazor Web App with Windows Authentication. Such an approach to retrieving SID group claims can be combined with adding claims with an `IClaimsTransformation` to create custom role claims when a user is authenticated.

## Related content

* Role-based authorization in ASP.NET Core
* ASP.NET Core Blazor authentication and authorization
* ASP.NET Core Blazor WebAssembly with Microsoft Entra ID groups and roles
* Role-based authorization in ASP.NET Core Razor Pages
* Extend or add custom claims, including role claims, using `IClaimsTransformation`
