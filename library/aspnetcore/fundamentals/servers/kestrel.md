---
title: "Kestrel web server in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/kestrel.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Kestrel web server in ASP.NET Core

-->
-->

By Tom Dykstra, Chris Ross, and Stephen Halter

Kestrel is a cross-platform web server for ASP.NET Core. Kestrel is the recommended server for ASP.NET Core, and it's configured by default in ASP.NET Core project templates.

Kestrel's features include:

* **Cross-platform:** Kestrel is a cross-platform web server that runs on Windows, Linux, and macOS.
* **High performance:** Kestrel is optimized to handle a large number of concurrent connections efficiently.
* **Lightweight:** Optimized for running in resource-constrained environments, such as containers and edge devices.
* **Security hardened:** Kestrel supports HTTPS and is hardened against web server vulnerabilities.
* **Wide protocol support:** Kestrel supports common web protocols, including:
  * HTTP/1.1, HTTP/2 and HTTP/3. Starting in .NET 11, HTTP/3 uses early request processing to reduce first-request latency.
  * WebSockets
* **Integration with ASP.NET Core:** Seamless integration with other ASP.NET Core components, such as the middleware pipeline, dependency injection, and configuration system.
* **Flexible workloads**: Kestrel supports many workloads:
  * ASP.NET app frameworks such as Minimal APIs, MVC, Razor pages, SignalR, Blazor, and gRPC.
  * Building a reverse proxy with YARP.
* **Extensibility:** Customize Kestrel through configuration, middleware, and custom transports.
* **Performance diagnostics:** Kestrel provides built-in performance diagnostics features, such as logging and metrics.
* **Memory management:** Kestrel includes features for efficient memory management. For more information, see Memory management in Kestrel.

> **Note:**
> macOS is supported for ASP.NET Core development, testing, continuous integration (CI), and local services without external access, but not for production server workloads. There is no server edition of macOS, and Apple discontinued macOS Server. For production hosting, use Windows or Linux server distributions.

## Get started

ASP.NET Core project templates use Kestrel by default when not hosted with IIS. In the following template-generated `Program.cs`, the `Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder*` method calls `Microsoft.AspNetCore.Hosting.WebHostBuilderKestrelExtensions.UseKestrel*` internally:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```
For more information on configuring `WebApplication` and `WebApplicationBuilder`, see Minimal APIs quick reference.

## Related content

* Configure endpoints for Kestrel web server

* Configure options for the ASP.NET Core Kestrel web server

* Use HTTP/2 with the ASP.NET Core Kestrel web server

* When to use a reverse proxy with the ASP.NET Core Kestrel web server

* Host filtering with ASP.NET Core Kestrel web server
* Troubleshoot and debug ASP.NET Core projects
* Enforce HTTPS in ASP.NET Core
* Configure ASP.NET Core to work with proxy servers and load balancers
* RFC 9110: HTTP Semantics (Section 7.2: Host and :authority)
* When using UNIX sockets on Linux, the socket isn't automatically deleted on app shutdown. For more information, see this GitHub issue.
