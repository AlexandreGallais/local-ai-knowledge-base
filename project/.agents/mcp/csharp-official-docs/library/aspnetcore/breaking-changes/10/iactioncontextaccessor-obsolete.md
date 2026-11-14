---
title: "IActionContextAccessor and ActionContextAccessor are obsolete"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/10/iactioncontextaccessor-obsolete.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# IActionContextAccessor and ActionContextAccessor are obsolete

`Microsoft.AspNetCore.Mvc.Infrastructure.IActionContextAccessor` and `Microsoft.AspNetCore.Mvc.Infrastructure.ActionContextAccessor` have been marked as obsolete with diagnostic ID `ASPDEPR006`. With the introduction of endpoint routing, `IActionContextAccessor` is no longer necessary as developers can access action descriptor and metadata information directly through `HttpContext.GetEndpoint()`.

## Version introduced

.NET 10 Preview 7

## Previous behavior

Previously, you could use `IActionContextAccessor` to access the current `Microsoft.AspNetCore.Mvc.ActionContext`:

```csharp
public class MyService
{
   private readonly IActionContextAccessor _actionContextAccessor;

   public MyService(IActionContextAccessor actionContextAccessor)
   {
       _actionContextAccessor = actionContextAccessor;
   }

   public void DoSomething()
   {
       var actionContext = _actionContextAccessor.ActionContext;
       var actionDescriptor = actionContext?.ActionDescriptor;
       // Use action descriptor metadata.
   }
}
```

## New behavior

Starting in .NET 10, using `IActionContextAccessor` and `ActionContextAccessor` produces a compiler warning with diagnostic ID `ASPDEPR006`:

> warning ASPDEPR006: ActionContextAccessor is obsolete and will be removed in a future version. For more information, visit <https://aka.ms/aspnet/deprecate/006>.

## Type of breaking change

This change can affect source compatibility.

## Reason for change

With the introduction of endpoint routing in ASP.NET Core, `IActionContextAccessor` is no longer necessary. The endpoint routing infrastructure provides a cleaner, more direct way to access endpoint metadata through `HttpContext.GetEndpoint()`, aligning with ASP.NET Core's architectural evolution toward endpoint routing.

## Recommended action

Migrate from `IActionContextAccessor` to `Microsoft.AspNetCore.Http.IHttpContextAccessor` and use `HttpContext.GetEndpoint()`:

Before:

```csharp
public class MyService
{
   private readonly IActionContextAccessor _actionContextAccessor;

   public MyService(IActionContextAccessor actionContextAccessor)
   {
       _actionContextAccessor = actionContextAccessor;
   }

   public void DoSomething()
   {
       var actionContext = _actionContextAccessor.ActionContext;
       var actionDescriptor = actionContext?.ActionDescriptor;
       // Use action descriptor metadata
   }
}
```

After:

```csharp
public class MyService
{
   private readonly IHttpContextAccessor _httpContextAccessor;

   public MyService(IHttpContextAccessor httpContextAccessor)
   {
       _httpContextAccessor = httpContextAccessor;
   }

   public void DoSomething()
   {
       var httpContext = _httpContextAccessor.HttpContext;
       var endpoint = httpContext?.GetEndpoint();
       var actionDescriptor = endpoint?.Metadata.GetMetadata<ActionDescriptor>();
       // Use action descriptor metadata.
   }
}
```

## Affected APIs

- `Microsoft.AspNetCore.Mvc.Infrastructure.IActionContextAccessor`
- `Microsoft.AspNetCore.Mvc.Infrastructure.ActionContextAccessor`
