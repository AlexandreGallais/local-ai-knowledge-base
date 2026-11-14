---
title: "ASP.NET Core Web Host (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/host/web-host.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Web Host (part 2 of 3)

## Set Web Host configuration values

The `Microsoft.AspNetCore.Hosting.WebHostBuilder` instance relies on the following approaches to set the host configuration values:

* The host builder configuration, which includes environment variables that use the format `ASPNETCORE_{configurationKey}`. For example, `ASPNETCORE_ENVIRONMENT`.

* Extensions, such as `Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseContentRoot*` and `Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseConfiguration*`. For more information, see Override the Web Host configuration.

* The `Microsoft.AspNetCore.Hosting.WebHostBuilder.UseSetting*` method and the associated key. When you set a value with `UseSetting`, the value is set as a string, regardless of the type.

The host uses whichever option sets a value last. For more information, see Override the Web Host configuration.

### Application name

Defines the name of the assembly that contains the entry point for the application.

**Key**: `applicationName`
**Type**: *string*
**Default**: The name of the assembly that has the app entry point.
**Set using**: `UseSetting`
**Environment variable**: `ASPNETCORE_APPLICATIONNAME`

The `IWebHostEnvironment.ApplicationName` property is automatically set when the `Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseStartup*` or `Microsoft.AspNetCore.Hosting.IStartup.Configure*` method is called during host construction. To set the value explicitly, use the `Microsoft.AspNetCore.Hosting.WebHostDefaults.ApplicationKey` field.

```csharp
WebHost.CreateDefaultBuilder(args)
    .UseSetting(WebHostDefaults.ApplicationKey, "CustomApplicationName")
```

### Capture startup errors

Controls the capture of startup errors.

**Key**: `captureStartupErrors`
**Type**: *bool* (`true` or `1`)
**Default**: `false`. If the app runs with Kestrel behind IIS, the default is `true`.
**Set using**: `CaptureStartupErrors`
**Environment variable**: `ASPNETCORE_CAPTURESTARTUPERRORS`

When set to `false`, errors during startup result in the host exiting. When set to `true`, the host captures exceptions during startup and attempts to start the server.

```csharp
WebHost.CreateDefaultBuilder(args)
    .CaptureStartupErrors(true)
```

### Content root

Determines where ASP.NET Core begins searching for content files.

**Key**: `contentRoot`
**Type**: *string*
**Default**: The folder that contains the app assembly.
**Set using**: `UseContentRoot`
**Environment variable**: `ASPNETCORE_CONTENTROOT`

The content root is also used as the base path for the web root. If the content root path doesn't exist, the host fails to start.

```csharp
WebHost.CreateDefaultBuilder(args)
    .UseContentRoot("c:\\<content-root>")
```

For more information, see:

* Fundamentals: Content root
* Web root

### Detailed errors

Determines whether to capture detailed errors.

**Key**: `detailedErrors`
**Type**: *bool* (`true` or `1`)
**Default**: `false`
**Set using**: `UseSetting`
**Environment variable**: `ASPNETCORE_DETAILEDERRORS`

When enabled (or when the Environment value is set to `Development`), the app captures detailed exceptions.

```csharp
WebHost.CreateDefaultBuilder(args)
    .UseSetting(WebHostDefaults.DetailedErrorsKey, "true")
```

### Environment

Sets the application environment.

**Key**: `environment`
**Type**: *string*
**Default**: `Production`
**Set using**: `UseEnvironment`
**Environment variable**: `ASPNETCORE_ENVIRONMENT`

The environment can be set to any value. Framework-defined values include `Development`, `Staging`, and `Production`. Values aren't case sensitive.

By default, the *Environment* is read from the `ASPNETCORE_ENVIRONMENT` environment variable. When you use Visual Studio, environment variables can be set in the _launchSettings.json_ file. For more information, see ASP.NET Core runtime environments.

```csharp
WebHost.CreateDefaultBuilder(args)
    .UseEnvironment(EnvironmentName.Development)
```

### Hosting startup assemblies

Provides a semicolon-delimited string of hosting startup assemblies to load on startup.

**Key**: `hostingStartupAssemblies`
**Type**: *string*
**Default**: An empty string.
**Set using**: `UseSetting`
**Environment variable**: `ASPNETCORE_HOSTINGSTARTUPASSEMBLIES`

Although the configuration value defaults to an empty string, the hosting startup assemblies always include the app's assembly. When hosting startup assemblies are provided, they're added to the app's assembly for loading when the app builds its common services during startup.

```csharp
WebHost.CreateDefaultBuilder(args)
    .UseSetting(WebHostDefaults.HostingStartupAssembliesKey, "assembly1;assembly2")
```

### HTTPS port

Sets the HTTPS port for redirection if you get a non-HTTPS connection.

**Key**: `https_port`
**Type**: *string*
**Default**: No default.
**Set using**: `UseSetting`
**Environment variable**: `ASPNETCORE_HTTPS_PORT`

This setting is used in enforcing HTTPS. This setting doesn't cause the server to listen on the specified port. That is, it's possible to accidentally redirect requests to an unused port.

```csharp
WebHost.CreateDefaultBuilder(args)
    .UseSetting("https_port", "8080")
```

### Hosting startup exclude assemblies

Provides a semicolon-delimited string of hosting startup assemblies to exclude on startup.

**Key**: `hostingStartupExcludeAssemblies`
**Type**: *string*
**Default**: An empty string.
**Set using**: `UseSetting`
**Environment variable**: `ASPNETCORE_HOSTINGSTARTUPEXCLUDEASSEMBLIES`

```csharp
WebHost.CreateDefaultBuilder(args)
    .UseSetting(WebHostDefaults.HostingStartupExcludeAssembliesKey, "assembly1;assembly2")
```

### Prefer hosting URLs

Indicates whether the host should listen on the URLs configured with the `WebHostBuilder` instead of the URLs configured with the `IServer` implementation.

**Key**: `preferHostingUrls`
**Type**: *bool* (`true` or `1`)
**Default**: `false`
**Set using**: `PreferHostingUrls`
**Environment variable**: `ASPNETCORE_PREFERHOSTINGURLS`

```csharp
WebHost.CreateDefaultBuilder(args)
    .PreferHostingUrls(true)
```

### Prevent hosting startup

Prevents the automatic loading of hosting startup assemblies, including hosting startup assemblies configured by the app's assembly. For more information, see Use hosting startup assemblies in ASP.NET Core.

**Key**: `preventHostingStartup`
**Type**: *bool* (`true` or `1`)
**Default**: `false`
**Set using**: `UseSetting`
**Environment variable**: `ASPNETCORE_PREVENTHOSTINGSTARTUP`

```csharp
WebHost.CreateDefaultBuilder(args)
    .UseSetting(WebHostDefaults.PreventHostingStartupKey, "true")
```

### Server URLs

Indicates the IP addresses or host addresses with ports and protocols that the server should listen on for requests.

**Key**: `urls`
**Type**: *string*
**Default**: `http://localhost:5000`
**Set using**: `UseUrls`
**Environment variable**: `ASPNETCORE_URLS`

Set to a semicolon-separated `;` list of URL prefixes to which the server should respond. For example, `http://localhost:123`. Use a wildcard asterisk `*` to indicate that the server should listen for requests on any IP address or hostname by using the specified port and protocol (for example, `http://*:5000`). The protocol (`http://` or `https://`) must be included with each URL. Supported formats vary among servers.

```csharp
WebHost.CreateDefaultBuilder(args)
    .UseUrls("http://*:5000;http://localhost:5001;https://hostname:5002")
```

Kestrel has its own endpoint configuration API. For more information, see Configure endpoints for Kestrel web server.

### Shutdown timeout

Specifies the amount of time to wait for the Web Host to shut down.

**Key**: `shutdownTimeoutSeconds`
**Type**: *int*
**Default**: 5 seconds
**Set using**: `UseShutdownTimeout`
**Environment variable**: `ASPNETCORE_SHUTDOWNTIMEOUTSECONDS`

Although the key <example-value> an *int* with `UseSetting` (for example, `.UseSetting(WebHostDefaults.ShutdownTimeoutKey, "10")`), the `Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseShutdownTimeout*` extension method takes a `System.TimeSpan` parameter.

During the timeout period, the Web Host:

* Triggers `Microsoft.AspNetCore.Hosting.IApplicationLifetime.ApplicationStopping`.
* Attempts to stop hosted services, logging any errors for services that fail to stop.

If the timeout period expires before all hosted services stop, any remaining active services stop when the app shuts down. The services stop even if they're still processing. If services require more time to stop, increase the timeout.

```csharp
WebHost.CreateDefaultBuilder(args)
    .UseShutdownTimeout(TimeSpan.FromSeconds(10))
```

### Startup assembly

Specifies the assembly to search for the `Startup` class.

**Key**: `startupAssembly`
**Type**: *string*
**Default**: The application assembly.
**Set using**: `UseStartup`
**Environment variable**: `ASPNETCORE_STARTUPASSEMBLY`

You can reference the assembly by name (`string`) or type (`TStartup`). If multiple `UseStartup` methods are called, the last call takes precedence.

```csharp
WebHost.CreateDefaultBuilder(args)
    .UseStartup("StartupAssemblyName")
```

```csharp
WebHost.CreateDefaultBuilder(args)
    .UseStartup<TStartup>()
```

### Web root

Sets the relative path to the app's static assets.

**Key**: `webroot`
**Type**: *string*
**Default**: `wwwroot`
**Set using**: `UseWebRoot`
**Environment variable**: `ASPNETCORE_WEBROOT`

The path to `{content root}/wwwroot` must exist. If the path doesn't exist, a no-op file provider is used.

```csharp
WebHost.CreateDefaultBuilder(args)
    .UseWebRoot("public")
```

For more information, see:

* Fundamentals: Web root
* Content root

## Override the Web Host configuration

Use application configuration in ASP.NET Core to configure the Web Host.

In the following example, host configuration is optionally specified in a _hostsettings.json_ file. Command-line arguments can override any configuration loaded from the _hostsettings.json_ file. The built configuration (in config) is used to configure the host with the `Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseConfiguration*` method. `IWebHostBuilder` configuration is added to the application configuration, but the converse isn't true. The `ConfigureAppConfiguration` method doesn't affect the `IWebHostBuilder` configuration.

Overriding the configuration provided by `UseUrls` with the _hostsettings.json_ config followed by the command-line argument config:

```csharp
public class Program
{
    public static void Main(string[] args)
    {
        CreateWebHostBuilder(args).Build().Run();
    }

    public static IWebHostBuilder CreateWebHostBuilder(string[] args)
    {
        var config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("hostsettings.json", optional: true)
            .AddCommandLine(args)
            .Build();

        return WebHost.CreateDefaultBuilder(args)
            .UseUrls("http://*:5000")
            .UseConfiguration(config)
            .Configure(app =>
            {
                app.Run(context => 
                    context.Response.WriteAsync("Hello, World!"));
            });
    }
}
```

The _hostsettings.json_ file contents:

```json
{
    urls: "http://*:5005"
}
```

> **Note:**
> The `Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseConfiguration*` method only copies keys from the provided `IConfiguration` to the host builder configuration. Therefore, setting the `reloadOnChange: true` property for JSON, INI, and XML settings files have no effect.

To specify the host run on a particular URL, the desired value can be passed in from a command prompt when executing dotnet run. The command-line argument overrides the `urls` value from the _hostsettings.json_ file, and the server listens on port 8080:

```dotnetcli
dotnet run --urls "http://*:8080"
```
