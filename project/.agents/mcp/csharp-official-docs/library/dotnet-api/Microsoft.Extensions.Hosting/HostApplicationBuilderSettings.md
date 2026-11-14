---
title: "HostApplicationBuilderSettings class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/HostApplicationBuilderSettings.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HostApplicationBuilderSettings class

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public sealed class HostApplicationBuilderSettings
```

Settings for constructing an `HostApplicationBuilder`.

To be added.

## HostApplicationBuilderSettings.HostApplicationBuilderSettings() constructor

```csharp
public HostApplicationBuilderSettings ();
```

Initializes an instance of the `HostApplicationBuilderSettings` class.

To be added.

## HostApplicationBuilderSettings.ApplicationName property

```csharp
public string? ApplicationName { get; set; }
```

Gets or sets the application name.

Returns: To be added.

To be added.

## HostApplicationBuilderSettings.Args property

```csharp
public string[]? Args { get; set; }
```

Gets or sets the command-line arguments to add to the `HostApplicationBuilder.Configuration`.

Returns: To be added.

To be added.

## HostApplicationBuilderSettings.Configuration property

```csharp
public Microsoft.Extensions.Configuration.ConfigurationManager? Configuration { get; set; }
```

Gets or sets the initial configuration sources to be added to the `HostApplicationBuilder.Configuration`. These sources can influence
the `HostApplicationBuilder.Environment` through the use of `HostDefaults` keys. Disposing the built
`IHost` disposes the `ConfigurationManager`.

Returns: To be added.

These sources can influence the `HostApplicationBuilder.Environment` through the use of `HostDefaults` keys. Disposing the built `IHost` disposes the `ConfigurationManager`.

## HostApplicationBuilderSettings.ContentRootPath property

```csharp
public string? ContentRootPath { get; set; }
```

Gets or sets the content root path.

Returns: To be added.

To be added.

## HostApplicationBuilderSettings.DisableDefaults property

```csharp
public bool DisableDefaults { get; set; }
```

Gets or sets a value that indicates whether the `HostApplicationBuilder` instance is configured with pre-configured defaults.

Returns: `false` if the `HostApplicationBuilder` instance is configured with pre-configured defaults.
This has a similar effect to calling `HostingHostBuilderExtensions.ConfigureDefaults`.

The following defaults are applied to the `IHostBuilder`:
* set the `IHostEnvironment.ContentRootPath` to the result of `Directory.GetCurrentDirectory`
* load `IConfiguration` from "DOTNET_" prefixed environment variables
* load `IConfiguration` from 'appsettings.json' and 'appsettings.[`IHostEnvironment.EnvironmentName`].json'
* load `IConfiguration` from User Secrets when `IHostEnvironment.EnvironmentName` is '<example-value>' using the entry assembly
* load `IConfiguration` from environment variables
* load `IConfiguration` from supplied command line args
* configure the `ILoggerFactory` to log to the console, debug, and event source output
* enables scope validation on the dependency injection container when `IHostEnvironment.EnvironmentName` is 'Development'

## HostApplicationBuilderSettings.EnvironmentName property

```csharp
public string? EnvironmentName { get; set; }
```

Gets or sets the environment name.

Returns: To be added.

To be added.
