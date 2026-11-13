---
title: "Policy-based authorization in ASP.NET Core MVC"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/mvc/security/authorization/policies.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Policy-based authorization in ASP.NET Core MVC

This article provides additional MVC policy-based authorization scenarios following Policy-based authorization in ASP.NET Core, which should be read before this article when learning about policy-based authorization.

## Apply policies to MVC controllers

Apply policies to controllers using the `[Authorize]` attribute with the policy name:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/policies/6.0/AuthorizationPoliciesSample/Controllers/AtLeast21Controller.cs._
If multiple policies are applied at the controller and action levels, ***all*** policies must pass before access is granted:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/policies/6.0/AuthorizationPoliciesSample/Controllers/AtLeast21Controller2.cs._
## Access MVC request context in handlers

The `Microsoft.AspNetCore.Authorization.AuthorizationHandler`1.HandleRequirementAsync*` method has two parameters: an `Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext` and the `TRequirement` being handled. Frameworks such as MVC or SignalR are free to add any object to the `Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.Resource` property to pass extra information.

When using endpoint routing, authorization is typically handled by the Authorization Middleware, and the `Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.Resource` property is an instance of `Microsoft.AspNetCore.Http.HttpContext`. The context is used to access the current endpoint, which can be used to probe the underlying resource to which you're routing:

```csharp
if (context.Resource is HttpContext httpContext)
{
    var endpoint = httpContext.GetEndpoint();
    var actionDescriptor = 
        endpoint?.Metadata.GetMetadata<ControllerActionDescriptor>();
    ...
}
```

With traditional routing, or when authorization happens as part of MVC's authorization filter, the value of `Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.Resource` is an `Microsoft.AspNetCore.Mvc.Filters.AuthorizationFilterContext` instance. This property provides access to `Microsoft.AspNetCore.Http.HttpContext`, `Microsoft.AspNetCore.Routing.RouteData`, and everything else provided by MVC and Razor Pages.

The use of the `Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.Resource` property is framework-specific. Using information in the property limits your authorization policies to particular frameworks. Cast the property using the `is` keyword, and then confirm the cast has succeeded to ensure your code doesn't crash with an `System.InvalidCastException` when run on other frameworks. When the cast succeeds, examine MVC-specific data, such as routing data:

```csharp
using Microsoft.AspNetCore.Mvc.Filters;

...

if (context.Resource is AuthorizationFilterContext mvcContext)
{
    var routeValues = mvcContext.RouteData.Values;
    ...
}
```

> **Note:**
> Endpoint routing passes `Microsoft.AspNetCore.Routing.RouteEndpoint` to authorization handlers, unlike traditional routing in MVC apps, which use an authorization handler context resource of type `Microsoft.AspNetCore.Mvc.Filters.AuthorizationFilterContext`. If the app uses MVC authorization filters along with endpoint routing authorization, it may be necessary to handle both types of resources.
