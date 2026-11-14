---
title: "Technical differences between ASP.NET Framework and ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/migration/fx-to-core/areas/misc.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Technical differences between ASP.NET Framework and ASP.NET Core

This document outlines important technical differences between ASP.NET Framework and ASP.NET Core that you should understand before beginning your migration.

## URI decoding differences

ASP.NET Core handles URI encoding differently:

| Character | Encoded | ASP.NET Core | ASP.NET Framework |
|-----------|---------|--------------|-------------------|
| `\` | `%5C` | `\` | `/` |
| `/` | `%2F` | `%2F` | `/` |

**Recommendation**: Use `new Uri(this.AspNetCoreHttpRequest.GetEncodedUrl())` for proper URL handling.

## User Secrets migration

User Secrets require special handling. See GitHub issue #27611 for current guidance.

## CultureInfo.CurrentCulture differences

> **Note:**
> ASP.NET Core does not automatically set `CultureInfo.CurrentCulture` for requests like ASP.NET Framework does. You must explicitly configure localization middleware.

In ASP.NET Framework, `System.Globalization.CultureInfo.CurrentCulture` was set for a request, but this is not done automatically in ASP.NET Core. Instead, you must add the appropriate middleware to your pipeline.

**Recommendation**: See ASP.NET Core Localization for details on how to enable this.

Simplest way to enable this with similar behavior as ASP.NET Framework would be to add the following to your pipeline:

```csharp
app.UseRequestLocalization();
```

### Threading considerations

> **Note:**
> This makes use of the System.Web Adapters to simplify migration.

ASP.NET Core does not guarantee thread affinity for requests. If your code requires thread affinity, you must ensure proper synchronization or use the `SingleThreadedRequest` attribute:

```csharp
[SingleThreadedRequest]
public class LegacyController : Controller
{
    public IActionResult Index()
    {
        // Some code that requires to be run on a single thread
        return View();
    }
}
```
