---
title: "Breaking changes in ASP.NET Core 10"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/10/overview.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Breaking changes in ASP.NET Core 10

If you're migrating an app to ASP.NET Core 10, the breaking changes listed here might affect you.

This article categorizes each breaking change as *binary incompatible* or *source incompatible*, or as a *behavioral change*:

- **Binary incompatible** - When run against the new runtime or component, existing binaries may encounter a breaking change in behavior, such as failure to load or execute, and if so, require recompilation.

- **Source incompatible** - When recompiled using the new SDK or component or to target the new runtime, existing source code may require source changes to compile successfully.

- **Behavioral change** - Existing code and binaries may behave differently at runtime. If the new behavior is undesirable, existing code would need to be updated and recompiled.

| Title                                                                                             | Type of change      |
|---------------------------------------------------------------------------------------------------|---------------------|
| Cookie login redirects disabled for known API endpoints | Behavioral change   |
| Deprecation of WithOpenApi extension method                          | Source incompatible |
| Exception diagnostics suppressed when TryHandleAsync returns true | Behavioral change |
| IActionContextAccessor and ActionContextAccessor are obsolete | Source incompatible/behavioral change |
| IncludeOpenAPIAnalyzers property and MVC API analyzers are deprecated | Source incompatible |
| IPNetwork and ForwardedHeadersOptions.KnownNetworks are obsolete | Source incompatible |
| Microsoft.Extensions.ApiDescription.Client package deprecated | Source incompatible |
| Razor runtime compilation is obsolete | Source incompatible |
| WebHostBuilder, IWebHost, and WebHost are obsolete | Source incompatible |
