---
title: "Configuration in ASP.NET Core (part 1 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/configuration/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Configuration in ASP.NET Core

-->
-->

App configuration in ASP.NET Core is performed using one or more configuration providers. Configuration providers read configuration data from key-value pairs using a variety of configuration sources:

* Settings files, such as `appsettings.json`
* Environment variables, including Azure App configuration
* Azure Key Vault
* Command-line arguments
* Custom providers, installed or created
* In-memory .NET objects

This article provides information on configuration in ASP.NET Core. For information on using configuration in non-ASP.NET Core apps, see .NET Configuration.

For additional Blazor configuration guidance, which adds to or supersedes the guidance here, see ASP.NET Core Blazor configuration.

This article primarily pertains to app configuration. Other types of configuration, such as launch settings files and the `web.config` file, are mentioned here, but their primary documentation is elsewhere:

* Launch settings files (`launch.json`/`launchSettings.json`), which are tooling configuration files for the `Development` environment. For more information, see ASP.NET Core runtime environments. Some details on launch settings are covered by this article in the Launch settings override environment variable settings section.
* `web.config`, which is a server configuration file for Internet Information Services (IIS). For more information, see Host ASP.NET Core on Windows with IIS and ASP.NET Core Module (ANCM) for IIS.

For more information on migrating app configuration from earlier versions of ASP.NET, see Migrate configuration to ASP.NET Core.

> **Warning:**
> This article shows the use of connection strings. When a local database is used for development and testing, database user authentication via the connection string isn't required.
> In production environments, connection strings sometimes include a password for authenticating database access or database operations. A resource owner password credential (ROPC) in a connection string is a security risk that should be avoided in production apps. Production apps should use the most secure authentication flow available.
> For more information on authentication for apps deployed to test or production environments, see ASP.NET Core security topics.

Examples in this article use *primary constructors*, available in C# 12 (.NET 8) or later. For more information, see Declare primary constructors for classes and structs (C# documentation tutorial) and Primary constructors (C# Guide).

## Service manager working directory configuration

Service managers, such as macOS `launchd` and Linux `systemd`, can set the app's working directory to a location outside of the directory that contains the app's configuration files. For example, a service manager on a Unix system might set the working directory to the system's root directory (`/`).

If the host uses a working directory broader than the app's directory as its content root, the file system watcher for configuration providers using reload-on-change behavior, where configuration is automatically reloaded when configuration files update, might monitor an excessively large portion of the file system. This can lead to unintended side effects, including permission errors when accessing files outside the app's directory and unnecessary performance overhead due to the volume of observed files. To avoid these issues, configure the service manager to use the directory containing the app and its configuration files as its working directory, or explicitly set that directory as the host's content root.

## Read configuration values

Configuration is typically read by resolving the `Microsoft.Extensions.Configuration.IConfiguration` service (`Microsoft.Extensions.Configuration` namespace) and using the key of configuration key-value pairs to obtain a configuration value.

The following Razor component code shows how a configuration value, a technical contact email address, is obtained from configuration by the key `TechnicalContactEmail`.

```razor
@inject IConfiguration Config

Technical Contact: @Config["TechnicalContactEmail"]
```

## App and host configuration

ASP.NET Core apps configure and launch a *host*. The host is responsible for app startup and lifetime management. Host configuration key-value pairs are included in the app's configuration. Although you can perform some app configuration with host configuration providers, we only recommend performing configuration that's necessary for the host in host configuration.

App configuration is the highest priority. For more information on how the configuration providers are used when the host is built and how configuration sources affect host configuration, see ASP.NET Core fundamentals overview.

## Default app configuration sources

ASP.NET Core web apps call `Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder*` to initialize a new instance of the `Microsoft.AspNetCore.Builder.WebApplicationBuilder` class with preconfigured defaults:

```csharp
var builder = WebApplication.CreateBuilder(args);
```

For more information, see .NET Generic Host in ASP.NET Core.

Default app configuration is loaded in the following order, from highest to lowest priority:

1. Command-line arguments using the Command-line Configuration Provider.
1. Environment variables ***not*** prefixed by `ASPNETCORE_` or `DOTNET_` using the Environment Variables Configuration Provider.
1. User secrets when the app runs in the `Development` environment using the File Configuration Provider.
1. Environmental app settings file configuration via `appsettings.{ENVIRONMENT}.json`, where the `{ENVIRONMENT}` placeholder is the app's environment, using the JSON Configuration Provider. For example, `appsettings.Production.json` is used in production, and `appsettings.Development.json` is used during development.
1. General app settings file configuration via `appsettings.json` using the JSON Configuration Provider.
1. Fallback host configuration.

> **Note:**
> We don't recommend calling `Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder*` more than once solely for the purpose of obtaining configuration values at runtime. We recommend using a `Microsoft.Extensions.Configuration.ConfigurationManager` (for example: `builder.Configuration`, `Microsoft.AspNetCore.Builder.WebApplicationBuilder.Configuration`) or using a `Microsoft.Extensions.Configuration.ConfigurationBuilder` from the appropriate configuration source.

To permit command-line arguments to control settings such as the environment name, which is important for determining which environment-based app settings file to load, the Command-line Configuration Provider is used twice as a configuration source, at the start and end of configuration. Because the provider is used at the end, it has the highest priority.

When a configuration value is set in host and app configuration, the app configuration is used.

## Default host configuration sources

Default host configuration sources from highest to lowest priority when applied to the web app's configuration (`Microsoft.AspNetCore.Builder.WebApplicationBuilder`):

1. Command-line arguments using the Command-line Configuration Provider.
1. `DOTNET_`-prefixed environment variables using the Environment Variables Configuration Provider.
1. `ASPNETCORE_`-prefixed environment variables using the Environment Variables Configuration Provider.

Default host configuration sources from highest to lowest priority applied to either the Generic Host or Web Host:

1. `ASPNETCORE_`-prefixed environment variables using the Environment Variables Configuration Provider.
1.  Command-line arguments using the Command-line Configuration Provider.
1. `DOTNET_`-prefixed environment variables using the Environment Variables Configuration Provider.

For more information on host configuration, see the following resources:

* Generic Host: Recommended for ASP.NET Core apps targeting .NET 6 or later that adopt the minimal hosting model.
* Web Host: Required for ASP.NET Core apps that target releases prior to .NET 6 and only maintained by the framework for backward compatibility in .NET 6 or later.

## Host variables

The following variables are set early in host builder initialization and can't be influenced by app configuration:

* Application name.
* Environment name.
* Content root.
* Web root.
* Whether to scan for hosting startup assemblies and which assemblies to scan for.
* Variables read by app and library code from `Microsoft.Extensions.Hosting.HostBuilderContext.Configuration` in `Microsoft.Extensions.Hosting.IHostBuilder.ConfigureAppConfiguration*` callbacks.

Other host settings are read from app configuration instead of host configuration.

`URLS` is one of the many common host settings that isn't bootstrapped by host configuration. `URLS` is read later from app configuration. Host configuration is a fallback for app configuration, so host configuration can be used to set `URLS`, but the value is overridden by any configuration source that sets `URLS` in app configuration, such as app settings files (`appsettings.{ENVIRONMENT}.json`, where the `{ENVIRONMENT}` placeholder is the environment name, or `appsettings.json`).

For more information, see Change the content root, app name, and environment and Change the content root, app name, and environment by environment variables or command line.

## Security and user secrets

Configuration data guidelines:

* Never store passwords or other sensitive data in configuration provider code or in plain text configuration files. The Secret Manager tool can be used to store secrets in development.
* Don't use production secrets in development or test environments.
* Specify secrets outside of the project so that they can't be accidentally committed to a source code repository.
* Production apps should use the most secure authentication flow available. For more information, see Secure authentication flows.

The User Secrets file configuration source of the default configuration sources is registered after the JSON configuration sources for app settings files. Therefore, user secrets keys take precedence over keys in `appsettings.json` and `appsettings.{ENVIRONMENT}.json`.

For more information on storing passwords or other sensitive data:

* ASP.NET Core runtime environments
* Safe storage of app secrets in development: Includes advice on using environment variables to store sensitive data. The Secret Manager tool uses the File Configuration Provider to store user secrets in a JSON file on the local system.
* Azure Key Vault safely stores app secrets for ASP.NET Core apps. For more information, see Azure Key Vault configuration provider.

## Access configuration with Dependency Injection (DI)

Configuration can be injected into services using Dependency Injection (DI) by resolving the `Microsoft.Extensions.Configuration.IConfiguration` service. In the following example, the configuration value stored for the configuration key represented by the `{KEY}` placeholder is assigned to `value`. If the key isn't found, `null` is assigned to `value`:

```csharp
public class CustomService(IConfiguration config)
{
    public void CustomMethod()
    {
        var value = config["{KEY}"];
    }
}
```

## Access configuration in the `Program` file

The following code accesses configuration in the `Program` file using `Microsoft.AspNetCore.Builder.WebApplicationBuilder.Configuration` (`builder.Configuration`):

```csharp
var defaultConnectionString = 
   builder.Configuration.GetValue<string>("ConnectionStrings:DefaultConnection");
```

After the app is built (after the line `var app = builder.Build();`), use `Microsoft.AspNetCore.Builder.WebApplication.Configuration` (`app.Configuration`):

```csharp
var defaultLogLevel = app.Configuration.GetValue<string>("Logging:LogLevel:Default");
```

## Access configuration in the `Startup` class

*This section generally applies to ASP.NET Core apps prior to the release of .NET 6.*

The following code displays configuration data in `Startup` methods:

```csharp
public class Startup
{
    public Startup(IConfiguration config)
    {
        Config = config;
    }

    public IConfiguration Config { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        var connectionString = Config["ConnectionStrings.DefaultConnection"];

        ...
    }

    public void Configure(...)
    {
        var defaultLogLevel = Config["Logging:LogLevel:Default"];

        ...
    }
}
```

## Display configuration settings on startup for debugging

The following code displays the app's configuration key-value pairs at app startup.

After the app is built in the `Program` file (after the line `var app = builder.Build();`), place the following code, which includes a compiler directive for the DEBUG configuration:

```csharp
#if DEBUG
foreach (var c in app.Configuration.AsEnumerable())
{
    Console.WriteLine($"CONFIG: Key: {c.Key} Value: {c.Value}");
}
#endif
```

## Configuration keys and values

Configuration keys:

* Are case-insensitive. For example, `ConnectionString` and `connectionstring` are treated as equivalent keys.
* If a key and value is set by more than one configuration provider, the value from the last provider added is used. For more information, see Default configuration.
* Hierarchical keys
  * Within the Configuration API, a colon separator (`:`) works on all platforms.
  * In environment variables, a colon separator doesn't work on all platforms. A double underscore (`__`) is supported by all platforms and is automatically converted into a colon (`:`) when the configuration is read by the app.
  * In Azure Key Vault, hierarchical keys use double dashes (`--`) as a separator. The Azure Key Vault Configuration Provider automatically replaces the double dashes (`--`) with a colon (`:`) when the secrets are loaded into the app's configuration.
* The `Microsoft.Extensions.Configuration.ConfigurationBinder` supports binding arrays to objects using array indices in configuration keys. Array binding is described in the Bind an array section.

Configuration values are strings. Null values can't be stored in configuration or bound to objects.
