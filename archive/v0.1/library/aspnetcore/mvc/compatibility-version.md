---
title: "Compatibility version for ASP.NET Core MVC"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/mvc/compatibility-version.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Compatibility version for ASP.NET Core MVC

By Rick Anderson

The `Microsoft.Extensions.DependencyInjection.MvcCoreMvcBuilderExtensions.SetCompatibilityVersion*` method is a no-op for ASP.NET Core 3.0 apps. That is, calling `SetCompatibilityVersion` with any value of `Microsoft.AspNetCore.Mvc.CompatibilityVersion` has no impact on the application.

* The next minor version of ASP.NET Core may provide a new `CompatibilityVersion` value.
* `CompatibilityVersion` values `Version_2_0` through `Version_2_2` are marked `[Obsolete(...)]`.
* The compatibility version APIs are removed in ASP.NET Core 11. For more information, see MVC compatibility options removed.
* See Breaking API changes in Antiforgery, CORS, Diagnostics, Mvc, and Routing. This list includes breaking changes for compatibility switches.

To see how `SetCompatibilityVersion` works with ASP.NET Core 2.x apps, select the ASP.NET Core 2.2 version of this article.
