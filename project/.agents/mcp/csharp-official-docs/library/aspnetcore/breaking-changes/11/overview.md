---
title: "Breaking changes in ASP.NET Core 11"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/11/overview.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Breaking changes in ASP.NET Core 11

If you're migrating an app to ASP.NET Core 11, the breaking changes listed here might affect you.

This article categorizes each breaking change as *binary incompatible* or *source incompatible*, or as a *behavioral change*:

- **Binary incompatible** - When run against the new runtime or component, existing binaries may encounter a breaking change in behavior, such as failure to load or execute, and if so, require recompilation.

- **Source incompatible** - When recompiled using the new SDK or component or to target the new runtime, existing source code may require source changes to compile successfully.

- **Behavioral change** - Existing code and binaries may behave differently at runtime. If the new behavior is undesirable, existing code would need to be updated and recompiled.

| Title | Type of change    |
|-------|-------------------|
| Blazor custom event registration throws when name matches a browser event | Behavioral change |
| Blazor enhanced navigation no longer preloads resources | Behavioral change |
| Blazor server-side rendering defers antiforgery validation to middleware | Behavioral change |
| ConcurrencyLimiter middleware removed | Binary/source incompatible |
| Hosting emits OpenTelemetry HTTP semantic-convention tags by default | Behavioral change |
| HttpSys enables TLS channel binding token <example-value> by default | Behavioral change |
| Identity external login keys use ordinal equality | Behavioral change |
| Kestrel tightens HTTP protocol compliance | Behavioral change |
| Microsoft.OpenApi upgraded to 3.x | Source incompatible |
| MVC compatibility options removed | Binary/source incompatible |
| Obsolete Blazor APIs removed | Source incompatible |
| Obsolete ImageTagHelper members removed | Binary/source incompatible |
| Obsolete ModelMetadataIdentity.ForProperty overload removed | Binary/source incompatible |
| OpenAPI document includes all ProducesResponseType entries per status code | Behavioral change |
| OpenAPI server URL no longer has a trailing slash when PathBase is empty | Behavioral change |
| OpenApiVersion defaults to OpenApi3_2 | Behavioral change |
| OpenID Connect `max_age` validates `auth_time` | Behavioral change |
| Passkey <example-value> enforces email/phone confirmation and lockout | Behavioral change |
| QuickGrid sorting and pagination controls render as links | Behavioral change |
| Response compression always emits Vary: Accept-Encoding | Behavioral change |
| SqlClient Active Directory authentication moved to a separate package | Behavioral change |
| WebAssemblyHostBuilder loads environment variables into IConfiguration | Behavioral change |
