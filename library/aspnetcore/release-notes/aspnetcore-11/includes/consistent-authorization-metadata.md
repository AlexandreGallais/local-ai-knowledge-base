---
title: "consistent-authorization-metadata"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-11/includes/consistent-authorization-metadata.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# consistent-authorization-metadata

### Consistent authorization metadata across the stack

Authorization metadata can be expressed as `Microsoft.AspNetCore.Authorization.IAuthorizeData`, an `Microsoft.AspNetCore.Authorization.AuthorizationPolicy`, or an `Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData` attribute. MVC filters, SignalR hub methods, and Blazor's `AuthorizeView` and `AuthorizeRouteView` apply all three forms consistently.

A new `AuthorizationPolicy.CombineAsync` overload is the shared implementation:

```csharp
public class AuthorizationPolicy
{
    public static Task<AuthorizationPolicy?> CombineAsync(
        IAuthorizationPolicyProvider policyProvider,
        IEnumerable<object> metadata);
}
```

MVC, SignalR, and Blazor use this overload internally. A custom attribute that implements both `Microsoft.AspNetCore.Authorization.IAuthorizeData` and `Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData` contributes to the decision once. The legacy MVC path with `EnableEndpointRouting = false` is unchanged.
