---
title: "Breaking change: Authorization: Resource in endpoint routing is HttpContext"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/5/authorization-resource-in-endpoint-routing.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Authorization: Resource in endpoint routing is HttpContext

When using endpoint routing in ASP.NET Core 3.1, the resource used for authorization is the endpoint. This approach was insufficient for gaining access to the route data (`Microsoft.AspNetCore.Routing.RouteData`). Previously in MVC, an `Microsoft.AspNetCore.Http.HttpContext` resource was passed in, which allows access to both the endpoint (`Microsoft.AspNetCore.Http.Endpoint`) and the route data. This change ensures that the resource passed to authorization is always the `HttpContext`.

## Version introduced

ASP.NET Core 5.0

## Old behavior

When using endpoint routing and the authorization middleware (`Microsoft.AspNetCore.Authorization.AuthorizationMiddleware`) or [Authorize] attributes, the resource passed to authorization is the matching endpoint.

## New behavior

Endpoint routing passes the `HttpContext` to authorization.

## Reason for change

You can get to the endpoint from the `HttpContext`. However, there was no way to get from the endpoint to things like the route data. There was a loss in functionality from non-endpoint routing.

## Recommended action

If your app uses the endpoint resource, call `Microsoft.AspNetCore.Http.EndpointHttpContextExtensions.GetEndpoint*` on the `HttpContext` to continue accessing the endpoint.

You can revert to the old behavior with `System.AppContext.SetSwitch*`. For example:

```csharp
AppContext.SetSwitch(
    "Microsoft.AspNetCore.Authorization.SuppressUseHttpContextAsAuthorizationResource",
    isEnabled: true);
```

## Affected APIs

None
