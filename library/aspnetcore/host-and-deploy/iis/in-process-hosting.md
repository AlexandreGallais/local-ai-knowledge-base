---
title: "In-process hosting with IIS and ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/host-and-deploy/iis/in-process-hosting.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# In-process hosting with IIS and ASP.NET Core

-->
-->

In-process hosting runs an ASP.NET Core app in the same process as its IIS worker process. In-process hosting provides improved performance over out-of-process hosting because requests aren't proxied over the loopback adapter, a network interface that returns outgoing network traffic back to the same machine.

The following diagram illustrates the relationship between IIS, the ASP.NET Core Module, and an app hosted in-process:

## Enable in-process hosting

Since ASP.NET Core 3.0, in-process hosting has been enabled by default for all app deployed to IIS.

To explicitly configure an app for in-process hosting, set the value of the `<AspNetCoreHostingModel>` property to `InProcess` in the project file (`.csproj`):

```xml
<PropertyGroup>
  <AspNetCoreHostingModel>InProcess</AspNetCoreHostingModel>
</PropertyGroup>
```

## General architecture

The general flow of a request is as follows:

1. A request arrives from the web to the kernel-mode HTTP.sys driver.
1. The driver routes the native request to IIS on the website's configured port, usually 80 (HTTP) or 443 (HTTPS).
1. The ASP.NET Core Module receives the native request and passes it to IIS HTTP Server (`IISHttpServer`). IIS HTTP Server is an in-process server implementation for IIS that converts the request from native to managed.

After the IIS HTTP Server processes the request:

1. The request is sent to the ASP.NET Core middleware pipeline.
1. The middleware pipeline handles the request and passes it on as an `HttpContext` instance to the app's logic.
1. The app's response is passed back to IIS through IIS HTTP Server.
1. IIS sends the response to the client that initiated the request.

`CreateDefaultBuilder` adds an `Microsoft.AspNetCore.Hosting.Server.IServer` instance by calling the `Microsoft.AspNetCore.Hosting.WebHostBuilderIISExtensions.UseIIS*` method to boot the CoreCLR and host the app inside of the IIS worker process (`w3wp.exe` or `iisexpress.exe`). Performance tests indicate that hosting a .NET app in-process delivers significantly higher request throughput compared to hosting the app out-of-process and proxying requests to Kestrel.

Apps published as a single file executable can't be loaded by the in-process hosting model.

## Application configuration

To configure IIS options, include a service configuration for `Microsoft.AspNetCore.Builder.IISServerOptions` in `Program.cs`. The following example disables `Microsoft.AspNetCore.Builder.IISServerOptions.AutomaticAuthentication`:

```csharp
builder.Services.Configure<IISServerOptions>(options =>
{
    options.AutomaticAuthentication = false;
});
```

| Option | Default | Setting |
| ------ | :-----: | ------- |
| `AutomaticAuthentication` | `true` | If `true`, IIS Server sets the `HttpContext.User` authenticated by Windows Authentication. If `false`, the server only provides an identity for `HttpContext.User` and responds to challenges when explicitly requested by the `AuthenticationScheme`. Windows Authentication must be enabled in IIS for `AutomaticAuthentication` to function. For more information, see Windows Authentication. |
| `AuthenticationDisplayName` | `null` | Sets the display name shown to users on login pages. |
| `AllowSynchronousIO` | `false` | Whether synchronous I/O is allowed for the `HttpContext.Request` and the `HttpContext.Response`. |
| `MaxRequestBodySize` | `30000000` | Gets or sets the max request body size for the `HttpRequest`. Note that IIS itself has the limit `maxAllowedContentLength` which will be processed before the `MaxRequestBodySize` set in the `IISServerOptions`. Changing the `MaxRequestBodySize` won't affect the `maxAllowedContentLength`. To increase `maxAllowedContentLength`, add an entry in the `web.config` to set `maxAllowedContentLength` to a higher value. For more details, see Configuration. |

## Differences between in-process and out-of-process hosting

The following characteristics apply when hosting in-process:

* IIS HTTP Server (`IISHttpServer`) is used instead of Kestrel server. For in-process, `CreateDefaultBuilder` calls `Microsoft.AspNetCore.Hosting.WebHostBuilderIISExtensions.UseIIS*` to:

  * Register the `IISHttpServer`.
  * Configure the port and base path the server should listen on when running behind the ASP.NET Core Module.
  * Configure the host to capture startup errors.

* The `requestTimeout` attribute doesn't apply to in-process hosting.

* Sharing an app pool among apps isn't supported. Use one app pool per app.

* The architecture (bitness) of the app and installed runtime (x64 or x86) must match the architecture of the app pool. For example, apps published for 32-bit (x86) must have 32-bit enabled for their IIS Application Pools. For more information, see the Create the IIS site section.

* Client disconnects are detected. The `HttpContext.RequestAborted` cancellation token is cancelled when the client disconnects.

* When hosting in-process, `Microsoft.AspNetCore.Authentication.AuthenticationService.AuthenticateAsync*` isn't called internally to initialize a user. Therefore, an `Microsoft.AspNetCore.Authentication.IClaimsTransformation` implementation used to transform claims after every authentication isn't activated by default. When transforming claims with an `Microsoft.AspNetCore.Authentication.IClaimsTransformation` implementation, call `Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication*` to add authentication services:

```csharp
builder.Services.AddTransient<IClaimsTransformation, MyClaimsTransformation>();
builder.Services.AddAuthentication(IISServerDefaults.AuthenticationScheme);
```

* Web Package (single-file) deployments aren't supported.

## Get timing information

See Get detailed timing information with IHttpSysRequestTimingFeature.
