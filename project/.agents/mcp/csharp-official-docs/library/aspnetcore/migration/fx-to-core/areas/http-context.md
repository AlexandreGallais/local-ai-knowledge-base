---
title: "Migrate ASP.NET Framework HttpContext to ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/migration/fx-to-core/areas/http-context.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Migrate ASP.NET Framework HttpContext to ASP.NET Core

HttpContext is a fundamental component of web applications, providing access to HTTP request and response information. When migrating from ASP.NET Framework to ASP.NET Core, HttpContext presents unique challenges because the two frameworks have different APIs and approaches.

## Why HttpContext migration is complex

ASP.NET Framework and ASP.NET Core have fundamentally different HttpContext implementations:

* **ASP.NET Framework** uses `System.Web.HttpContext` with built-in properties and methods
* **ASP.NET Core** uses `Microsoft.AspNetCore.Http.HttpContext` with a more modular, extensible design

These differences mean you can't simply move your HttpContext code from Framework to Core without changes.

## Migration strategies overview

You have two main approaches for handling HttpContext during migration:

1. **Complete rewrite** - Rewrite all HttpContext code to use ASP.NET Core's native HttpContext implementation
2. **System.Web adapters** - Use adapters to minimize code changes while migrating incrementally

For most applications, migrating to ASP.NET Core's native HttpContext provides the best performance and maintainability. However, larger applications or those with extensive HttpContext usage may benefit from using System.Web adapters during incremental migration.

## Choose your migration approach

You have two main options for migrating HttpContext from ASP.NET Framework to ASP.NET Core. Your choice depends on your migration timeline, whether you need to run both applications simultaneously, and how much code you're willing to rewrite.

### Quick decision guide

**Answer these questions to choose your approach:**

1. **Are you doing a complete rewrite or incremental migration?**
   * Complete rewrite → Complete rewrite to ASP.NET Core HttpContext
   * Incremental migration → Continue to question 2

2. **Do you have extensive HttpContext usage across shared libraries?**
   * Yes, lots of shared code → System.Web adapters
   * No, isolated HttpContext usage → Complete rewrite to ASP.NET Core HttpContext

### Migration approaches comparison

| Approach | Code Changes | Performance | Shared Libraries | When to Use |
|----------|-------------|-------------|------------------|-------------|
| **Complete rewrite** | High - Rewrite all HttpContext code | Best | Requires updates | Complete rewrites, performance-critical apps |
| **System.Web adapters** | Low - Keep existing patterns | Good | Works with existing code | Incremental migrations, extensive HttpContext usage |

## Important differences

### HttpContext lifetime

The adapters are backed by `Microsoft.AspNetCore.Http.HttpContext` which cannot be used past the lifetime of a request. Thus, `System.Web.HttpContext` when run on ASP.NET Core cannot be used past a request as well, while on ASP.NET Framework it would work at times. An `System.ObjectDisposedException` will be thrown in cases where it is used past a request end.

**Recommendation**: Store the values needed into a POCO and hold onto that.

### Request threading considerations

> **Warning:**
> ASP.NET Core does not guarantee thread affinity for requests. If your code requires thread-safe access to `HttpContext`, you must ensure proper synchronization.

In ASP.NET Framework, a request had thread-affinity and `System.Web.HttpContext.Current` would only be available if on that thread. ASP.NET Core does not have this guarantee so `System.Web.HttpContext.Current` will be available within the same async context, but no guarantees about threads are made.

**Recommendation**: If reading/writing to the `System.Web.HttpContext`, you must ensure you are doing so in a single-threaded way. You can force a request to never run concurrently on any async context by setting the `ISingleThreadedRequestMetadata`. This will have performance implications and should only be used if you can't refactor usage to ensure non-concurrent access. There is an implementation available to add to controllers with `SingleThreadedRequestAttribute`:

```csharp
[SingleThreadedRequest]
public class SomeController : Controller
{
    ...
} 
```

### Request stream buffering

By default, the incoming request is not always seekable nor fully available. In order to get behavior seen in .NET Framework, you can opt into prebuffering the input stream. This will fully read the incoming stream and buffer it to memory or disk (depending on settings).

**Recommendation**: This can be enabled by applying endpoint metadata that implements the `IPreBufferRequestStreamMetadata` interface. This is available as an attribute `PreBufferRequestStreamAttribute` that can be applied to controllers or methods.

To enable this on all MVC endpoints, there is an extension method that can be used as follows:

```cs
app.MapDefaultControllerRoute()
    .PreBufferRequestStream();
```

### Response stream buffering

Some APIs on `System.Web.HttpContext.Response` require that the output stream is buffered, such as `System.Web.HttpResponse.Output`, `System.Web.HttpResponse.End`, `System.Web.HttpResponse.Clear`, and `System.Web.HttpResponse.SuppressContent`.

**Recommendation**: In order to support behavior for `System.Web.HttpContext.Response` that requires buffering the response before sending, endpoints must opt-into it with endpoint metadata implementing `IBufferResponseStreamMetadata`.

To enable this on all MVC endpoints, there is an extension method that can be used as follows:

```cs
app.MapDefaultControllerRoute()
    .BufferResponseStream();
```
