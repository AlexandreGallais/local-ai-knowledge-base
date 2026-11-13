---
title: ".NET Generic Host in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/host/generic-host.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# .NET Generic Host in ASP.NET Core

-->
-->

The ASP.NET Core templates create instances of `Microsoft.AspNetCore.Builder.WebApplicationBuilder` and `Microsoft.AspNetCore.Builder.WebApplication`. These objects provide a streamlined way to configure and run web applications without a `Startup` class. For more information on `WebApplicationBuilder` and `WebApplication`, see Migrate from ASP.NET Core in .NET 5 to .NET 6.

This article provides information on using the .NET Generic Host in ASP.NET Core. For information on using the .NET Generic Host in console apps, see .NET Generic Host.

## Understand the role of the host

A *host* is an object that encapsulates an application's resources, such as:

* Dependency injection (DI)
* Logging
* Configuration
* `IHostedService` implementations

When a host starts, it calls the `Microsoft.Extensions.Hosting.IHostedService.StartAsync*` method on each `Microsoft.Extensions.Hosting.IHostedService` instance registered in the service container's collection of hosted services. In a web app, one of the `IHostedService` implementations is a web service that starts an HTTP server implementation.

By including all of the app's interdependent resources in a single object, the host enables control of application startup and graceful shutdown.

## Set up a host

The host is typically configured, built, and run by code in the _Program.cs_ file.

The following code creates a host with an `IHostedService` implementation added to the DI container:

```csharp
await Host.CreateDefaultBuilder(args)
    .ConfigureServices(services =>
    {
        services.AddHostedService<SampleHostedService>();
    })
    .Build()
    .RunAsync();
```
For an HTTP workload, call the `Microsoft.Extensions.Hosting.GenericHostBuilderExtensions.ConfigureWebHostDefaults*` method after the `Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder*` method:

```csharp
await Host.CreateDefaultBuilder(args)
    .ConfigureWebHostDefaults(webBuilder =>
    {
        webBuilder.UseStartup<Startup>();
    })
    .Build()
    .RunAsync();
```
## Configure default builder settings

The `Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder*` method performs the following tasks:

* Sets the content root to the path returned by `System.IO.Directory.GetCurrentDirectory*`.

* Loads the host configuration from the following sources:
  * Environment variables prefixed with `DOTNET_`
  * Command-line arguments

* Loads the app configuration in the following order:
  * _appsettings.json_ file
  * _appsettings.{Environment}.json_ file
  * User secrets (Loaded when the app runs in the `Development` environment by using the entry assembly.)
  * Environment variables
  * Command-line arguments

* Adds the following logging providers:
  * Console
  * Debug
  * EventSource
  * EventLog (only when running on Windows)

* Enables scope validation and dependency validation when the environment is `Development`.

The `Microsoft.Extensions.Hosting.GenericHostBuilderExtensions.ConfigureWebHostDefaults*` method performs the following tasks:

* Loads host configuration from environment variables prefixed with `ASPNETCORE_`.

* Sets Kestrel server as the web server and configures it by using the app's hosting configuration providers. For the Kestrel server's default options, see Configure options for the ASP.NET Core Kestrel web server.

* Adds host-filtering middleware.

* Adds Forwarded Headers middleware if the `ASPNETCORE_FORWARDEDHEADERS_ENABLED` property is set to `true`.

* Enables IIS integration. For the IIS default options, see Host ASP.NET Core on Windows with IIS.

For information on how to override default builder settings, see Configure settings for all app types and Configure settings for web apps later in this article.

## Framework-provided services

The .NET Generic Host automatically registers the following services:

* IHostApplicationLifetime
* IHostLifetime
* IHostEnvironment / IWebHostEnvironment

For more information on framework-provided services, see Dependency injection in ASP.NET Core.

### IHostApplicationLifetime

Inject the `Microsoft.Extensions.Hosting.IHostApplicationLifetime` (formerly `IApplicationLifetime`) service into any class for handling post-startup and graceful shutdown tasks. Three properties on the interface are cancellation tokens used for registering app start and app stop event handler methods. The interface also includes a `StopApplication` method, which allows apps to request a graceful shutdown.

When performing a graceful shutdown, the host:

* Triggers the `Microsoft.Extensions.Hosting.IHostApplicationLifetime.ApplicationStopping` event handlers, which allows the app to run logic before the shutdown process begins.

* Stops the server, which disables new connections. The server waits for requests on existing connections to complete, for as long as the shutdown timeout allows. The server sends the connection close header for further requests on existing connections.

* Triggers the `Microsoft.Extensions.Hosting.IHostApplicationLifetime.ApplicationStopped` event handlers, which allows the app to run logic after the application has shutdown.

The following example is an `IHostedService` implementation that registers `IHostApplicationLifetime` event handlers:

```csharp
public class HostApplicationLifetimeEventsHostedService : IHostedService
{
    private readonly IHostApplicationLifetime _hostApplicationLifetime;

    public HostApplicationLifetimeEventsHostedService(
        IHostApplicationLifetime hostApplicationLifetime)
        => _hostApplicationLifetime = hostApplicationLifetime;

    public Task StartAsync(CancellationToken <example-value>)
    {
        _hostApplicationLifetime.ApplicationStarted.Register(OnStarted);
        _hostApplicationLifetime.ApplicationStopping.Register(OnStopping);
        _hostApplicationLifetime.ApplicationStopped.Register(OnStopped);

        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken <example-value>)
        => Task.CompletedTask;

    private void OnStarted()
    {
        // ...
    }

    private void OnStopping()
    {
        // ...
    }

    private void OnStopped()
    {
        // ...
    }
}
```
### IHostLifetime

The `Microsoft.Extensions.Hosting.IHostLifetime` implementation controls when the host starts and when it stops. The last implementation registered is used.

`Microsoft.Extensions.Hosting.Internal.ConsoleLifetime` is the default `IHostLifetime` implementation.

The `ConsoleLifetime` method performs the following tasks:

* Listens for `Ctrl`+`C`/SIGINT (Windows), `Ctrl`+`C` (macOS), or SIGTERM and calls `Microsoft.Extensions.Hosting.IHostApplicationLifetime.StopApplication*`, which starts the shutdown process.

* Unblocks extensions, such as by running the RunAsync and WaitForShutdownAsync methods.

### IHostEnvironment (IWebHostEnvironment)

Inject the `Microsoft.Extensions.Hosting.IHostEnvironment` service into a class to get information about the following settings:

* ApplicationName
* EnvironmentName
* ContentRootPath

Web apps implement the `IWebHostEnvironment` interface, which inherits `IHostEnvironment` and adds the WebRootPath.

## Set up host configuration

Host configuration is used for the properties of the `Microsoft.Extensions.Hosting.IHostEnvironment` implementation.

Host configuration is available from the `Microsoft.Extensions.Hosting.HostBuilderContext.Configuration` property inside the `Microsoft.Extensions.Hosting.HostBuilder.ConfigureAppConfiguration*` method. After `ConfigureAppConfiguration`, `HostBuilderContext.Configuration` is replaced with the app config.

To add host configuration, call the `Microsoft.Extensions.Hosting.HostBuilder.ConfigureHostConfiguration*` method on the `IHostBuilder` instance. `ConfigureHostConfiguration` can be called multiple times with additive results. The host uses whichever option sets a value last on a given key.

`CreateDefaultBuilder` includes the environment variable provider with the prefix `DOTNET_` and command-line arguments. For web apps, the environment variable provider with prefix `ASPNETCORE_` is added. The prefix is removed when the environment variables are read. For example, the environment variable value for `ASPNETCORE_ENVIRONMENT` becomes the host configuration value for the `environment` key.

The following example creates host configuration:

```csharp
Host.CreateDefaultBuilder(args)
    .ConfigureHostConfiguration(hostConfig =>
    {
        hostConfig.SetBasePath(Directory.GetCurrentDirectory());
        hostConfig.AddJsonFile("hostsettings.json", optional: true);
        hostConfig.AddEnvironmentVariables(prefix: "PREFIX_");
        hostConfig.AddCommandLine(args);
    });
```
## Create the app configuration

App configuration is created by calling the `Microsoft.Extensions.Hosting.HostBuilder.ConfigureAppConfiguration*` method on the `IHostBuilder` instance. `ConfigureAppConfiguration` can be called multiple times with additive results. The app uses whichever option sets a value last on a given key.

The configuration created by `ConfigureAppConfiguration` is available in the `Microsoft.Extensions.Hosting.HostBuilderContext.Configuration` property for subsequent operations and as a service from DI. The host configuration is also added to the app configuration.

For more information, see Configuration in ASP.NET Core.

## Configure settings for all app types

This section lists host settings that apply to both HTTP and non-HTTP workloads.

By default, environment variables used to configure these settings can have a `DOTNET_` or `ASPNETCORE_` prefix, which appear in the following list of settings as the `{PREFIX_}` placeholder.

For more information, see Configure default builder settings and Configuration: Environment variables.

### Application name

Defines the name of the assembly that contains the entry point for the application.

**Key**: `applicationName`
**Type**: *string*
**Default**: The name of the assembly that has the app entry point.
**Set using**: Environment variable
**Environment variable**: `{PREFIX_}APPLICATIONNAME`

The `Microsoft.Extensions.Hosting.IHostEnvironment.ApplicationName` property is set from the host configuration during host construction.

### Content root

Determines where the host begins the search for content files.

**Key**: `contentRoot`
**Type**: *string*
**Default**: The folder where the app assembly resides.
**Set using**: Environment variable or `UseContentRoot` on `IHostBuilder`
**Environment variable**: `{PREFIX_}CONTENTROOT`

The `Microsoft.Extensions.Hosting.IHostEnvironment.ContentRootPath` property identifies where the host begins searching. If the path doesn't exist, the host fails to start.

```csharp
Host.CreateDefaultBuilder(args)
    .UseContentRoot("/path/to/content/root")
    // ...
```
For more information, see:

* Fundamentals: Content root
* Web root

### Environment name

Provides a name for the environment.

**Key**: `environment`
**Type**: *string*
**Default**: `Production`
**Set using**: Environment variable or call `UseEnvironment` on `IHostBuilder`
**Environment variable**: `{PREFIX_}ENVIRONMENT`

The `Microsoft.Extensions.Hosting.IHostEnvironment.EnvironmentName` property can be set to any value. Framework-defined values include `Development`, `Staging`, and `Production`. Values aren't case-sensitive.

```csharp
Host.CreateDefaultBuilder(args)
    .UseEnvironment("Development")
    // ...
```
### Shutdown timeout

Specifies the amount of time to wait for the host to shut down.

**Key**: `shutdownTimeoutSeconds`
**Type**: *int*
**Default**: 30 seconds (In .NET 5.0 and earlier, the default is 5 seconds.)
**Set using**: Environment variable or `HostOptions`
**Environment variable**: `{PREFIX_}SHUTDOWNTIMEOUTSECONDS`

The `Microsoft.Extensions.Hosting.HostOptions.ShutdownTimeout` property sets the timeout for `Microsoft.Extensions.Hosting.IHost.StopAsync*`. The default value is 30 seconds.

During the timeout period, the host:

* Triggers `Microsoft.Extensions.Hosting.IHostApplicationLifetime.ApplicationStopping`.
* Attempts to stop hosted services, logging errors for services that fail to stop.

If the timeout period expires before all hosted services stop, any remaining active services stop when the app shuts down. The services stop even if they're still processing. If services require more time to stop, increase the timeout.

The following example sets the timeout to 20 seconds:

```csharp
Host.CreateDefaultBuilder(args)
    .ConfigureServices((hostContext, services) =>
    {
        services.Configure<HostOptions>(options =>
        {
            options.ShutdownTimeout = TimeSpan.FromSeconds(20);
        });
    });
```
### Reload config on change

Reloads the  _appsettings.json_ and _appsettings.{Environment}.json_ files when the files change. This behavior is by default, as described in Default app configuration sources.

**Key**: `hostBuilder:reloadConfigOnChange`
**Type**: *bool* (`true` or `false`)
**Default**: `true`
**Set using**: Command-line argument `hostBuilder:reloadConfigOnChange`
**Environment variable**: `{PREFIX_}hostBuilder:reloadConfigOnChange`

In .NET 5 and later, you can disable the reload behavior by setting the `hostBuilder:reloadConfigOnChange` argument to `false`.

> **Warning:**
> The colon (`:`) separator doesn't work with environment variable hierarchical keys on all platforms. For more information, see Environment variables.
