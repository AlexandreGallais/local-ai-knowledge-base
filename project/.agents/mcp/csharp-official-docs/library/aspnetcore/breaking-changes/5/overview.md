---
title: "Breaking changes in ASP.NET Core 5"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/5/overview.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Breaking changes in ASP.NET Core 5

If you're migrating an app to ASP.NET Core 5, the breaking changes listed here might affect you. Changes are grouped by technology area, such as ASP.NET Core or cryptography.

This article indicates whether each breaking change is *binary compatible* or *source compatible*:

- **Binary compatible** - Existing binaries will load and execute successfully without recompilation, and the runtime behavior won't change.
- **Source compatible** - Source code will compile successfully without changes when targeting the new runtime or using the new SDK or component.

| Title | Binary compatible | Source compatible |
| - | - | - |
| ASP.NET Core apps deserialize quoted numbers | ✔️ | ❌ |
| AzureAD.UI and AzureADB2C.UI APIs obsolete | ✔️ | ❌ |
| BinaryFormatter serialization methods are obsolete | ✔️ | ❌ |
| Resource in endpoint routing is HttpContext | ✔️ | ❌ |
| Microsoft-prefixed Azure integration packages removed | ❌ | ✔️ |
| Blazor: Route precedence logic changed in Blazor apps | ✔️ | ❌ |
| Blazor: Updated browser support | ✔️ | ✔️ |
| Blazor: Insignificant whitespace trimmed by compiler | ✔️ | ❌ |
| Blazor: JSObjectReference and JSInProcessObjectReference types are internal | ✔️ | ❌ |
| Blazor: Target framework of NuGet packages changed | ❌ | ✔️ |
| Blazor: ProtectedBrowserStorage feature moved to shared framework | ✔️ | ❌ |
| Blazor: RenderTreeFrame readonly public fields are now properties | ❌ | ✔️ |
| Blazor: Updated validation logic for static web assets | ❌ | ✔️ |
| Cryptography APIs not supported on browser | ❌ | ✔️ |
| Extensions: Package reference changes | ❌ | ✔️ |
| Kestrel and IIS BadHttpRequestException types are obsolete | ✔️ | ❌ |
| HttpClient instances created by IHttpClientFactory log integer status codes | ✔️ | ❌ |
| HttpSys: Client certificate renegotiation disabled by default | ✔️ | ❌ |
| IIS: UrlRewrite middleware query strings are preserved | ✔️ | ❌ |
| Kestrel: Configuration changes detected by default | ✔️ | ❌ |
| Kestrel: Default supported TLS protocol versions changed | ✔️ | ❌ |
| Kestrel: HTTP/2 disabled over TLS on incompatible Windows versions | ✔️ | ✔️ |
| Kestrel: Libuv transport marked as obsolete | ✔️ | ❌ |
| Obsolete properties on ConsoleLoggerOptions | ✔️ | ❌ |
| ResourceManagerWithCultureStringLocalizer class and WithCulture interface member removed | ✔️ | ❌ |
| Pubternal APIs removed | ✔️ | ❌ |
| Obsolete constructor removed in request localization middleware | ✔️ | ❌ |
| Middleware: Database error page marked as obsolete | ✔️ | ❌ |
| Exception handler middleware throws original exception | ✔️ | ✔️ |
| ObjectModelValidator calls a new overload of Validate | ✔️ | ❌ |
| Cookie name encoding removed | ✔️ | ❌ |
| IdentityModel NuGet package versions updated | ❌ | ✔️ |
| SignalR: MessagePack Hub Protocol options type changed | ✔️ | ❌ |
| SignalR: MessagePack Hub Protocol moved | ✔️ | ❌ |
| UseSignalR and UseConnections methods removed | ✔️ | ❌ |
| CSV content type changed to standards-compliant | ✔️ | ❌ |
