---
title: "What's new in ASP.NET Core 3.0 (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-3.0.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core 3.0 (part 2 of 2)

## Template changes

The web UI templates (Razor Pages, MVC with controller and views) have the following removed:

* The cookie consent UI is no longer included. To enable the cookie consent feature in an ASP.NET Core 3.0 template-generated app, see General Data Protection Regulation (GDPR) support in ASP.NET Core.
* Scripts and related static assets are now referenced as local files instead of using CDNs. For more information, see Scripts and related static assets are now referenced as local files instead of using CDNs based on the current environment (dotnet/AspNetCore.Docs #14350).

The Angular template updated to use Angular 8.

The Razor class library (RCL) template defaults to Razor component development by default. A new template option in Visual Studio provides template support for pages and views. When creating an RCL from the template in a command shell, pass the `--support-pages-and-views` option (`dotnet new razorclasslib --support-pages-and-views`).

## Generic Host

The ASP.NET Core 3.0 templates use .NET Generic Host in ASP.NET Core. Previous versions used `Microsoft.AspNetCore.Hosting.WebHostBuilder`. Using the .NET Core Generic Host (`Microsoft.Extensions.Hosting.HostBuilder`) provides better integration of ASP.NET Core apps with other server scenarios that aren't web-specific. For more information, see HostBuilder replaces WebHostBuilder.

### Host configuration

Prior to the release of ASP.NET Core 3.0, environment variables prefixed with `ASPNETCORE_` were loaded for host configuration of the Web Host. In 3.0, `AddEnvironmentVariables` is used to load environment variables prefixed with `DOTNET_` for host configuration with `CreateDefaultBuilder`.

### Changes to Startup constructor injection

The Generic Host only supports the following types for `Startup` constructor injection:

* `Microsoft.Extensions.Hosting.IHostEnvironment`
* `IWebHostEnvironment`
* `Microsoft.Extensions.Configuration.IConfiguration`

All services can still be injected directly as arguments to the `Startup.Configure` method. For more information, see Generic Host restricts Startup constructor injection (aspnet/Announcements #353).

## Kestrel

* Kestrel configuration has been updated for the migration to the Generic Host. In 3.0, Kestrel is configured on the web host builder provided by `ConfigureWebHostDefaults`.
* Connection Adapters have been removed from Kestrel and replaced with connection middleware, which is similar to HTTP middleware in the ASP.NET Core pipeline but for lower-level connections.
* The Kestrel transport layer has been exposed as a public interface in `Connections.Abstractions`.
* Ambiguity between headers and trailers has been resolved by moving trailing headers to a new collection.
* Synchronous I/O APIs, such as `HttpRequest.Body.Read`, are a common source of thread starvation leading to app crashes. In 3.0, `AllowSynchronousIO` is disabled by default.

For more information, see Migrate from ASP.NET Core 2.2 to 3.0.

## HTTP/2 enabled by default

HTTP/2 is enabled by default in Kestrel for HTTPS endpoints. HTTP/2 support for IIS or HTTP.sys is enabled when supported by the operating system.

## EventCounters on request

The Hosting EventSource, `Microsoft.AspNetCore.Hosting`, emits the following new `System.Diagnostics.Tracing.EventCounter` types related to incoming requests:

* `requests-per-second`
* `total-requests`
* `current-requests`
* `failed-requests`

## Endpoint routing

Endpoint Routing, which allows frameworks (for example, MVC) to work well with middleware, is enhanced:

* The order of middleware and endpoints is configurable in the request processing pipeline of `Startup.Configure`.
* Endpoints and middleware compose well with other ASP.NET Core-based technologies, such as Health Checks.
* Endpoints can implement a policy, such as CORS or authorization, in both middleware and MVC.
* Filters and attributes can be placed on methods in controllers.

For more information, see Routing in ASP.NET Core.

## Health Checks

Health Checks use endpoint routing with the Generic Host. In `Startup.Configure`, call `MapHealthChecks` on the endpoint builder with the endpoint URL or relative path:

```csharp
app.UseEndpoints(endpoints =>
{
    endpoints.MapHealthChecks("/health");
});
```

Health Checks endpoints can:

* Specify one or more permitted hosts/ports.
* Require authorization.
* Require CORS.

For more information, see the following articles:

* Migrate from ASP.NET Core 2.2 to 3.0
* Health checks in ASP.NET Core

## Pipes on HttpContext

It's now possible to read the request body and write the response body using the `System.IO.Pipelines` API. The  `HttpRequest.BodyReader` property provides a `System.IO.Pipelines.PipeReader` that can be used to read the request body. The  `HttpResponse.BodyWriter` property provides a `System.IO.Pipelines.PipeWriter` that can be used to write the response body. `HttpRequest.BodyReader` is an analogue of the `HttpRequest.Body` stream. `HttpResponse.BodyWriter` is an analogue of the `HttpResponse.Body` stream.

## Improved error reporting in IIS

Startup errors when hosting ASP.NET Core apps in IIS now produce richer diagnostic data. These errors are reported to the Windows Event Log with stack traces wherever applicable. In addition, all warnings, errors, and unhandled exceptions are logged to the Windows Event Log.

## Worker Service and Worker SDK

.NET Core 3.0 introduces the new Worker Service app template. This template provides a starting point for writing long running services in .NET Core.

For more information, see:

* .NET Core Workers as Windows Services
* Background tasks with hosted services in ASP.NET Core
* Host ASP.NET Core in a Windows Service

## Forwarded headers middleware improvements

In previous versions of ASP.NET Core, calling `Microsoft.AspNetCore.Builder.HstsBuilderExtensions.UseHsts*` and  `Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection*` were problematic when deployed to an Azure Linux or behind any reverse proxy other than IIS. The fix for previous versions is documented in Forward the scheme for Linux and non-IIS reverse proxies.

This scenario is fixed in ASP.NET Core 3.0. The host enables the forwarded headers middleware when the `ASPNETCORE_FORWARDEDHEADERS_ENABLED` environment variable is set to `true`. `ASPNETCORE_FORWARDEDHEADERS_ENABLED` is set to `true` in our container images.

## Performance improvements

ASP.NET Core 3.0 includes many improvements that reduce memory usage and improve throughput:

* Reduction in memory usage when using the built-in dependency injection container for scoped services.
* Reduction in allocations across the framework, including middleware scenarios and routing.
* Reduction in memory usage for WebSocket connections.
* Memory reduction and throughput improvements for HTTPS connections.
* New optimized and fully asynchronous JSON serializer.
* Reduction in memory usage and throughput improvements in form parsing.

## ASP.NET Core 3.0 only runs on .NET Core 3.0

As of ASP.NET Core 3.0, .NET Framework is no longer a supported target framework. Projects targeting .NET Framework can continue in a fully supported fashion using the .NET Core 2.1 LTS release. Most ASP.NET Core 2.1.x related packages will be supported indefinitely, beyond the three-year LTS period for .NET Core 2.1.

For migration information, see Port your code from .NET Framework to .NET Core.

## Use the ASP.NET Core shared framework

The ASP.NET Core 3.0 shared framework, contained in the Microsoft.AspNetCore.App metapackage, no longer requires an explicit `<PackageReference />` element in the project file. The shared framework is automatically referenced when using the `Microsoft.NET.Sdk.Web` SDK in the project file:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
```

## Assemblies removed from the ASP.NET Core shared framework

The most notable assemblies removed from the ASP.NET Core 3.0 shared framework are:

* Newtonsoft.Json (Json.NET). To add Json.NET to ASP.NET Core 3.0, see Add Newtonsoft.Json-based JSON format support. ASP.NET Core 3.0 introduces `System.Text.Json` for reading and writing JSON. For more information, see New JSON serialization in this document.
* Entity Framework Core

For a complete list of assemblies removed from the shared framework, see Assemblies being removed from Microsoft.AspNetCore.App 3.0. For more information on the motivation for this change, see Breaking changes to Microsoft.AspNetCore.App in 3.0 and A first look at changes coming in ASP.NET Core 3.0.

## Breaking changes

Use the articles in Breaking changes in .NET to find breaking changes that might apply when upgrading an app to a newer version of .NET.
