---
title: "Breaking changes in ASP.NET Core 9"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/9/overview.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Breaking changes in ASP.NET Core 9

If you're migrating an app to ASP.NET Core 9, the breaking changes listed here might affect you.

This article categorizes each breaking change as *binary incompatible* or *source incompatible*, or as a *behavioral change*:

- **Binary incompatible** - When run against the new runtime or component, existing binaries may encounter a breaking change in behavior, such as failure to load or execute, and if so, require recompilation.

- **Source incompatible** - When recompiled using the new SDK or component or to target the new runtime, existing source code may require source changes to compile successfully.

- **Behavioral change** - Existing code and binaries may behave differently at runtime. If the new behavior is undesirable, existing code would need to be updated and recompiled.

| Title                                                                          | Type of change    |
|--------------------------------------------------------------------------------|-------------------|
| DefaultKeyResolution.ShouldGenerateNewKey <example-value> meaning | Behavioral change |
| Dev cert export no longer creates folder              | Behavioral change |
| Forwarded headers middleware ignores X-Forwarded-* headers from unknown proxies | Behavioral change |
| HostBuilder enables ValidateOnBuild/ValidateScopes in development environment | Behavioral change |
| Legacy Mono and Emscripten APIs not exported to global namespace | Source incompatible |
| Middleware types with multiple constructors      | Behavioral change |
