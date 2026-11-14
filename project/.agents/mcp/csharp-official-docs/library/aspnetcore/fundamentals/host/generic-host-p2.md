---
title: ".NET Generic Host in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/host/generic-host.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# .NET Generic Host in ASP.NET Core (part 2 of 2)

## Configure settings for web apps

Some host settings apply only to HTTP workloads. By default, environment variables used to configure these settings can have a `DOTNET_` or `ASPNETCORE_` prefix, which appear in the following list of settings as the `{PREFIX_}` placeholder.

Extension methods on `IWebHostBuilder` are available for these settings. Code samples that show how to call the extension methods assume `webBuilder` is an instance of `IWebHostBuilder`, as in the following example:

```csharp
Host.CreateDefaultBuilder(args)
    .ConfigureWebHostDefaults(webBuilder =>
    {
        // ...
    });
```
### Capture startup errors

Controls the capture of startup errors.

**Key**: `captureStartupErrors`
**Type**: *bool* (`true`/`1` or `false`/`0`)
**Default**: `false`. If the app runs with Kestrel behind IIS, the default is `true`.
**Set using**: Configuration or `CaptureStartupErrors`
**Environment variable**: `{PREFIX_}CAPTURESTARTUPERRORS`

When `false`, errors during startup result in the host exiting. When `true`, the host captures exceptions during startup and attempts to start the server.

```csharp
webBuilder.CaptureStartupErrors(true);
```
### Detailed errors

Determines whether to capture detailed errors.

**Key**: `detailedErrors`
**Type**: *bool* (`true`/`1` or `false`/`0`)
**Default**: `false`
**Set using**: Configuration or `UseSetting`
**Environment variable**: `{PREFIX_}DETAILEDERRORS`

When enabled, or when the environment is set to `Development`, the app captures detailed errors.

```csharp
webBuilder.UseSetting(WebHostDefaults.DetailedErrorsKey, "true");
```
### Hosting startup assemblies

Provides a semicolon-delimited string of hosting startup assemblies to load on startup.

**Key**: `hostingStartupAssemblies`
**Type**: *string*
**Default**: Empty string
**Set using**: `UseSetting`
**Environment variable**: `{PREFIX_}HOSTINGSTARTUPASSEMBLIES`

Although the configuration value defaults to an empty string, the hosting startup assemblies always include the app's assembly. When hosting startup assemblies are provided, they're added to the app's assembly for loading when the app builds its common services during startup.

```csharp
webBuilder.UseSetting(
    WebHostDefaults.HostingStartupAssembliesKey, "assembly1;assembly2");
```
### Hosting startup exclude assemblies

Provides a semicolon-delimited string of hosting startup assemblies to exclude on startup.

**Key**: `hostingStartupExcludeAssemblies`
**Type**: *string*
**Default**: Empty string
**Set using**: Configuration or `UseSetting`
**Environment variable**: `{PREFIX_}HOSTINGSTARTUPEXCLUDEASSEMBLIES`

```csharp
webBuilder.UseSetting(
    WebHostDefaults.HostingStartupExcludeAssembliesKey, "assembly1;assembly2");
```
### HTTPS port

Sets the HTTPS port for redirection if you get a non-HTTPS connection.

**Key**: `https_port`
**Type**: *string*
**Default**: No default.
**Set using**: Configuration or `UseSetting`
**Environment variable**: `{PREFIX_}HTTPS_PORT`

This setting is used in enforcing HTTPS. This setting doesn't cause the server to listen on the specified port. That is, it's possible to accidentally redirect requests to an unused port.

```csharp
webBuilder.UseSetting("https_port", "8080");
```
### HTTPS ports

Specifies the possible ports to listen on for HTTPS connections.

**Key**: `https_ports`
**Type**: *string*
**Default**: No default.
**Set using**: Configuration or `UseSetting`
**Environment variable**: `{PREFIX_}HTTPS_PORTS`

```csharp
webBuilder.UseSetting("https_ports", "8080");
```

### Prefer hosting URLs

Indicates whether the host should listen on the URLs configured with the `IWebHostBuilder` instead of URLs configured with the `IServer` implementation.

**Key**: `preferHostingUrls`
**Type**: *bool* (`true`/`1` or `false`/`0`)
**Default**: `false`
**Set using**: Environment variable or `PreferHostingUrls`
**Environment variable**: `{PREFIX_}PREFERHOSTINGURLS`

```csharp
webBuilder.PreferHostingUrls(true);
```
### Prevent hosting startup

Prevents the automatic loading of hosting startup assemblies, including hosting startup assemblies configured by the app's assembly. For more information, see Use hosting startup assemblies in ASP.NET Core.

**Key**: `preventHostingStartup`
**Type**: *bool* (`true`/`1` or `false`/`0`)
**Default**: `false`
**Set using**: Environment variable or `UseSetting`
**Environment variable**: `{PREFIX_}PREVENTHOSTINGSTARTUP`

```csharp
webBuilder.UseSetting(WebHostDefaults.PreventHostingStartupKey, "true");
```
### Startup assembly

Specifies the assembly to search for the `Startup` class.

**Key**: `startupAssembly`
**Type**: *string*
**Default**: The application assembly.
**Set using**: Environment variable or `UseStartup`
**Environment variable**: `{PREFIX_}STARTUPASSEMBLY`

You can reference the assembly by name (`string`) or type (`TStartup`). If multiple `UseStartup` methods are called, the last call takes precedence.

```csharp
webBuilder.UseStartup("StartupAssemblyName");
```
```csharp
webBuilder.UseStartup<Startup>();
```
### Suppress status messages

Indicates whether to suppress hosting startup status messages.

**Key**: `suppressStatusMessages`
**Type**: *bool* (`true`/`1` or `false`/`0`)
**Default**: `false`
**Set using**: Configuration or `UseSetting`
**Environment variable**: `{PREFIX_}SUPPRESSSTATUSMESSAGES`

```csharp
webBuilder.UseSetting(WebHostDefaults.SuppressStatusMessagesKey, "true");
```
### Server URLs

Indicates the IP addresses or host addresses with ports and protocols that the server should listen on for requests.

**Key**: `urls`
**Type**: *string*
**Default**: `http://localhost:5000` and `https://localhost:5001`
**Set using**: Environment variable or `UseUrls`
**Environment variable**: `{PREFIX_}URLS`

Set to a semicolon-separated `;` list of URL prefixes to which the server should respond. For example, `http://localhost:123`. Use a wildcard asterisk `*` to indicate that the server should listen for requests on any IP address or hostname by using the specified port and protocol (for example, `http://*:5000`). The protocol (`http://` or `https://`) must be included with each URL. Supported formats vary among servers.

```csharp
webBuilder.UseUrls("http://*:5000;http://localhost:5001;https://hostname:5002");
```
Kestrel has its own endpoint configuration API. For more information, see Configure endpoints for Kestrel web server.

### Web root

Sets the relative path to the app's static assets.

**Key**: `webroot`
**Type**: *string*
**Default**: `wwwroot`
**Set using**: Environment variable or `UseWebRoot` on `IWebHostBuilder`
**Environment variable**: `{PREFIX_}WEBROOT`

The `Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath` property determines the relative path to the app's static assets.

The path to `{content root}/wwwroot` must exist. If the path doesn't exist, a no-op file provider is used.

```csharp
webBuilder.UseWebRoot("public");
```
For more information, see:

* Fundamentals: Web root
* Content root

## Manage the host lifetime

To start and stop the application, call methods on the `Microsoft.Extensions.Hosting.IHost` implementation. The methods affect all `Microsoft.Extensions.Hosting.IHostedService` implementations registered in the service container.

The difference between the `Run*` and `Start*` methods is that `Run*` methods wait for the host to complete before returning, whereas `Start*` methods return immediately. The `Run*` methods are typically used in console apps, whereas the `Start*` methods are typically used in long-running services.

### Run

The `Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.Run*` method runs the app and blocks the calling thread until the host is shut down.

### RunAsync

The `Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.RunAsync*` method runs the app and returns a `System.Threading.Tasks.Task` object that completes when the cancellation token or shutdown is triggered.

### RunConsoleAsync

The `Microsoft.Extensions.Hosting.HostingHostBuilderExtensions.RunConsoleAsync*` method enables console support, builds and starts the host, and waits for `Ctrl`+`C`/SIGINT (Windows), `Ctrl`+`C` (macOS), or SIGTERM to shut down.

### Start

The `Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.Start*` method launches the host synchronously.

### StartAsync

The `Microsoft.Extensions.Hosting.IHost.StartAsync*` method starts the host and returns a `System.Threading.Tasks.Task` object that completes when the cancellation token or shutdown is triggered.

The `Microsoft.Extensions.Hosting.IHostLifetime.WaitForStartAsync*` method is called at the start of `StartAsync`, which waits until it's complete before continuing. This method can be used to delay startup until signaled by an external event.

### StopAsync

The `Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.StopAsync*` method attempts to stop the host within the provided timeout.

### WaitForShutdown

The `Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.WaitForShutdown*` method blocks the calling thread until the IHostLifetime implementation triggers shutdown via `Ctrl`+`C`/SIGINT (Windows), `Ctrl`+`C` (macOS), or SIGTERM.

### WaitForShutdownAsync

The `Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.WaitForShutdownAsync*` method returns a `System.Threading.Tasks.Task` object that completes when shutdown is triggered via the given token, and then it calls the `Microsoft.Extensions.Hosting.IHost.StopAsync*` method.

## Related content

* Background tasks with hosted services in ASP.NET Core
* Generic Host source on GitHub

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.
