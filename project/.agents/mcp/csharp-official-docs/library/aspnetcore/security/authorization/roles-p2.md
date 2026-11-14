---
title: "Role-based authorization in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/authorization/roles.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Role-based authorization in ASP.NET Core (part 2 of 2)

## Windows Authentication security groups as app roles

After the app is configured for Windows Authentication (Blazor-specific guidance) with the client and server machines part of the same Windows domain, user security groups are automatically included as claims in the user's `System.Security.Claims.ClaimsPrincipal`.

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

* ASP.NET Core Blazor authentication and authorization
* ASP.NET Core Blazor WebAssembly with Microsoft Entra ID groups and roles
* Role-based authorization in ASP.NET Core Razor Pages
* Role-based authorization in ASP.NET Core MVC
* Extend or add custom claims, including role claims, using `IClaimsTransformation`
