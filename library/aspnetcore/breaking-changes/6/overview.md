---
title: "Breaking changes in ASP.NET Core 6"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/6/overview.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Breaking changes in ASP.NET Core 6

If you're migrating an app to ASP.NET Core 6, the breaking changes listed here might affect you.

This article indicates whether each breaking change is *binary compatible* or *source compatible*:

- **Binary compatible** - Existing binaries will load and execute successfully without recompilation, and the runtime behavior won't change.
- **Source compatible** - Source code will compile successfully without changes when targeting the new runtime or using the new SDK or component.

| Title                                                                                         | Binary compatible | Source compatible |
|-----------------------------------------------------------------------------------------------|:-----------------:|:-----------------:|
| ActionResult\<T> sets StatusCode to 200                         | ✔️               | ❌                 |
| AddDataAnnotationsValidation method made obsolete | ✔️               | ❌                 |
| Assemblies removed from Microsoft.AspNetCore.App shared framework | ❌ | ✔️ |
| Blazor: Parameter name changed in RequestImageFileAsync method | ✔️ | ❌ |
| Blazor: WebEventDescriptor.EventArgsType property replaced | ❌ | ❌ |
| Blazor: Byte array interop | ✔️ | ❌ |
| Changed MessagePack library in @microsoft/signalr-protocol-msgpack | ❌ | ✔️ |
| ClientCertificate property doesn't trigger renegotiation for HttpSys | ✔️ | ❌ |
| EndpointName metadata not set automatically | ✔️ | ❌ |
| Identity: Default Bootstrap version of UI changed | ❌ | ❌  |
| Kestrel: Log message attributes changed | ✔️ | ❌ |
| Microsoft.AspNetCore.Http.Features split | ❌ | ✔️ |
| Middleware: HTTPS redirection middleware throws exception on ambiguous HTTPS ports | ✔️ | ❌ |
| Middleware: New Use overload | ✔️ | ❌ |
| Minimal API renames in RC 1 | ❌ | ❌ |
| Minimal API renames in RC 2 | ❌ | ❌ |
| MVC doesn't buffer IAsyncEnumerable types when using System.Text.Json | ✔️ | ❌ |
| Nullable reference type annotations changed | ✔️ | ❌ |
| Obsoleted and removed APIs | ✔️ | ❌ |
| PreserveCompilationContext not configured by default | ❌ | ✔️ |
| Razor: Compiler no longer produces a Views assembly | ✔️ | ❌ |
| Razor: Logging ID changes | ❌ | ✔️ |
| Razor: RazorEngine APIs marked obsolete | ✔️ | ❌ |
| SignalR: Java Client updated to RxJava3 | ❌ | ✔️ |
| TryParse and BindAsync methods are validated | ❌ | ❌ |
