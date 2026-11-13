---
title: "Breaking changes in ASP.NET Core 8"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/8/overview.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Breaking changes in ASP.NET Core 8

If you're migrating an app to ASP.NET Core 8, the breaking changes listed here might affect you.

This article categorizes each breaking change as *binary incompatible* or *source incompatible*, or as a *behavioral change*:

- **Binary incompatible** - When run against the new runtime or component, existing binaries may encounter a breaking change in behavior, such as failure to load or execute, and if so, require recompilation.

- **Source incompatible** - When recompiled using the new SDK or component or to target the new runtime, existing source code may require source changes to compile successfully.

- **Behavioral change** - Existing code and binaries may behave differently at runtime. If the new behavior is undesirable, existing code would need to be updated and recompiled.

| Title                                                                                | Type of change      |
|--------------------------------------------------------------------------------------|---------------------|
| ConcurrencyLimiterMiddleware is obsolete | Source incompatible |
| Custom converters for serialization removed   | Behavioral change   |
| Forwarded headers middleware ignores X-Forwarded-* headers from unknown proxies | Behavioral change   |
| HTTP logging middleware requires AddHttpLogging() | Behavioral change |
| ISystemClock is obsolete                                 | Source incompatible |
| Minimal APIs: IFormFile parameters require anti-forgery checks | Behavioral change   |
| Rate-limiting middleware requires AddRateLimiter    | Behavioral change   |
| Security token <example-value> return a JsonWebToken               | Behavioral change   |
| TrimMode defaults to full for Web SDK projects                   | Source incompatible |
