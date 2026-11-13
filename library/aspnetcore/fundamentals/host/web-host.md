---
title: "ASP.NET Core Web Host (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/host/web-host.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Web Host

-->
-->

ASP.NET Core apps configure and launch a *host*. The host is responsible for app startup and lifetime management. At a minimum, the host configures a server and a request processing pipeline. The host can also set up logging, dependency injection, and configuration.

This article covers the Web Host, which remains available only for backward compatibility. The ASP.NET Core templates create a `Microsoft.AspNetCore.Builder.WebApplicationBuilder` and `Microsoft.AspNetCore.Builder.WebApplication`, which is recommended for web apps. For more information on `WebApplicationBuilder` and `WebApplication`, see Migrate from ASP.NET Core in .NET 5 to .NET 6.

## Set up a host

Create a host by using an instance of `Microsoft.AspNetCore.Hosting.IWebHostBuilder`. This task is typically performed in the app's entry point, the `Main` method in the _Program.cs_ file. A typical app calls the `Microsoft.AspNetCore.WebHost.CreateDefaultBuilder*` method to start setting up a host:

```csharp
public class Program
{
    public static void Main(string[] args)
    {
        CreateWebHostBuilder(args).Build().Run();
    }

    public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
        WebHost.CreateDefaultBuilder(args)
            .UseStartup<Startup>();
}
```

The code that calls `CreateDefaultBuilder` is in a method named `CreateWebHostBuilder`, which separates it from the code in `Main` that calls the `Run` method on the builder object. The separation is required if you use Entity Framework Core tools. The tools expect to find a `CreateWebHostBuilder` method that they can call at design time to configure the host without running the app. An alternative is to create an instance of `IDesignTimeDBContextfactory`. For more information, see Design-time DbContext Creation.

The `CreateDefaultBuilder` method performs the following tasks:

* Configures Kestrel server as the web server by using the app's hosting configuration providers. For the Kestrel server's default options, see Configure options for the ASP.NET Core Kestrel web server.

* Sets the content root to the path returned by `System.IO.Directory.GetCurrentDirectory*`.

* Loads the host configuration from the following sources:
  * Environment variables prefixed with `ASPNETCORE_` (for example, `ASPNETCORE_ENVIRONMENT`)
  * Command-line arguments

* Loads the app configuration in the following order:
  * _appsettings.json_ file
  * _appsettings.{Environment}.json_ file
  * User secrets (Loaded when the app runs in the `Development` environment by using the entry assembly.)
  * Environment variables
  * Command-line arguments

* Configures logging for console and debug output. Logging includes log filtering rules specified in a Logging configuration section of an _appsettings.json_ or _appsettings.{Environment}.json_ file.

* When the application runs behind IIS with the ASP.NET Core Module, `CreateDefaultBuilder` enables IIS Integration, which configures the application base address and port. IIS Integration also configures the app to capture startup errors. For the IIS default options, see Host ASP.NET Core on Windows with IIS.

* Sets the `Microsoft.Extensions.DependencyInjection.ServiceProviderOptions.ValidateScopes` property to `true`, if the application environment is `Development`. For more information, see Configure scope validation.

The content root determines where the host searches for content files, such as MVC view files. When the app launches from the project root folder, that folder is used as the content root. This behavior is the default for Visual Studio and the dotnet new templates.

For more information on app configuration, see Configuration in ASP.NET Core.

> **Note:**
> As an alternative to using the static `CreateDefaultBuilder` method, you can create a host from `Microsoft.AspNetCore.Hosting.WebHostBuilder` with ASP.NET Core 2.x.

When you set up a host, you can use the `Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.Configure*` and `Microsoft.AspNetCore.Hosting.WebHostBuilder.ConfigureServices*` methods. If a `Startup` class is specified, it must define a `Configure` method. For more information, see App startup in ASP.NET Core. Multiple calls to `ConfigureServices` append each other. Multiple calls to `Configure` or `UseStartup` on the `WebHostBuilder` instance replace any previous settings.

### Methods for overriding the configuration

You can override and augment the configuration defined by `CreateDefaultBuilder`. Use the `Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.ConfigureAppConfiguration*` and `Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.ConfigureLogging*` methods, and other methods and extension methods of `Microsoft.AspNetCore.Hosting.IWebHostBuilder`.

Here are some examples:

* `Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.ConfigureAppConfiguration*` is used to specify other `IConfiguration` properties for the app. The following call to the `ConfigureAppConfiguration` method adds a delegate to include app configuration in the _appsettings.xml_ file. `ConfigureAppConfiguration` can be called multiple times. This configuration doesn't apply to the host (for example, server URLs or environment). For more information, see the Host configuration values section.

    ```csharp
    WebHost.CreateDefaultBuilder(args)
        .ConfigureAppConfiguration((hostingContext, config) =>
        {
            config.AddXmlFile("appsettings.xml", optional: true, reloadOnChange: true);
        })
        ...
    ```

* The following `ConfigureLogging` call adds a delegate to configure the minimum logging level (`Microsoft.Extensions.Logging.LoggingBuilderExtensions.SetMinimumLevel*`) to `Microsoft.Extensions.Logging.LogLevel#microsoft-extensions-logging-loglevel-warning`. This setting overrides the settings in the _appsettings.Development.json_ file (`LogLevel.Debug`) and _appsettings.Production.json_ file (`LogLevel.Error`) configured by the `CreateDefaultBuilder` method. `ConfigureLogging` can be called multiple times.

    ```csharp
    WebHost.CreateDefaultBuilder(args)
        .ConfigureLogging(logging => 
        {
            logging.SetMinimumLevel(LogLevel.Warning);
        })
        ...
    ```

* The following call to `ConfigureKestrel` overrides the default Limits.MaxRequestBodySize of 30,000,000 bytes established when Kestrel is configured with the `CreateDefaultBuilder` method:

    ```csharp
    WebHost.CreateDefaultBuilder(args)
        .ConfigureKestrel((context, options) =>
        {
            options.Limits.MaxRequestBodySize = 20000000;
        });
    ```
