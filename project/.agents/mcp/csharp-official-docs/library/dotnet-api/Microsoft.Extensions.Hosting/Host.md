---
title: "Host class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/Host.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Host class

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public static class Host
```

Provides convenience methods for creating instances of `IHostBuilder` with pre-configured defaults.

To be added.

## Host.CreateApplicationBuilder() method

```csharp
public static Microsoft.Extensions.Hosting.HostApplicationBuilder CreateApplicationBuilder ();
```

Initializes a new instance of the `HostApplicationBuilder` class with pre-configured defaults.

Returns: The initialized `HostApplicationBuilder`.

The following defaults are applied to the returned `HostApplicationBuilder`:

- set the `IHostEnvironment.ContentRootPath` to the result of `Directory.GetCurrentDirectory`
- load host `IConfiguration` from "DOTNET_" prefixed environment variables
- load app `IConfiguration` from 'appsettings.json' and 'appsettings.[`IHostEnvironment.EnvironmentName`].json'
- load app `IConfiguration` from User Secrets when `IHostEnvironment.EnvironmentName` is '<example-value>' using the entry assembly
- load app `IConfiguration` from environment variables
- configure the `ILoggerFactory` to log to the console, debug, and event source output
- enables scope validation on the dependency injection container when `IHostEnvironment.EnvironmentName` is 'Development'

## Host.CreateApplicationBuilder(HostApplicationBuilderSettings) method

```csharp
public static Microsoft.Extensions.Hosting.HostApplicationBuilder CreateApplicationBuilder (Microsoft.Extensions.Hosting.HostApplicationBuilderSettings? settings);
```

Initializes a new instance of the  class with preconfigured defaults.

Parameters:

- `settings`: Controls the initial configuration and other settings for constructing the `HostApplicationBuilder`.

Returns: A new <xref data-throw-if-not-resolved="true" uid="Microsoft.Extensions.Hosting.HostApplicationBuilder"></xref> instance.

To be added.

## Host.CreateApplicationBuilder(String[]) method

```csharp
public static Microsoft.Extensions.Hosting.HostApplicationBuilder CreateApplicationBuilder (string[]? args);
```

Initializes a new instance of the `HostApplicationBuilder` class with pre-configured defaults.

Parameters:

- `args`: The command line args.

Returns: The initialized `HostApplicationBuilder`.

The following defaults are applied to the returned `HostApplicationBuilder`:

- set the `IHostEnvironment.ContentRootPath` to the result of `Directory.GetCurrentDirectory`
- load host `IConfiguration` from "DOTNET_" prefixed environment variables
- load host `IConfiguration` from supplied command line args
- load app `IConfiguration` from 'appsettings.json' and 'appsettings.[`IHostEnvironment.EnvironmentName`].json'
- load app `IConfiguration` from User Secrets when `IHostEnvironment.EnvironmentName` is '<example-value>' using the entry assembly
- load app `IConfiguration` from environment variables
- load app `IConfiguration` from supplied command line args
- configure the `ILoggerFactory` to log to the console, debug, and event source output
- enables scope validation on the dependency injection container when `IHostEnvironment.EnvironmentName` is 'Development'

## Host.CreateDefaultBuilder() method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder CreateDefaultBuilder ();
```

Initializes a new instance of the `HostBuilder` class with pre-configured defaults.

Returns: The initialized `IHostBuilder`.

The following defaults are applied to the returned `HostBuilder`:

- set the `IHostEnvironment.ContentRootPath` to the result of `Directory.GetCurrentDirectory`
- load host `IConfiguration` from "DOTNET_" prefixed environment variables
- load app `IConfiguration` from 'appsettings.json' and 'appsettings.[`IHostEnvironment.EnvironmentName`].json'
- load app `IConfiguration` from User Secrets when `IHostEnvironment.EnvironmentName` is '<example-value>' using the entry assembly
- load app `IConfiguration` from environment variables
- configure the `ILoggerFactory` to log to the console, debug, and event source output
- enables scope validation on the dependency injection container when `IHostEnvironment.EnvironmentName` is 'Development'

## Host.CreateDefaultBuilder(String[]) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder CreateDefaultBuilder (string[]? args);
```

Initializes a new instance of the `HostBuilder` class with pre-configured defaults.

Parameters:

- `args`: The command line args.

Returns: The initialized `IHostBuilder`.

The following defaults are applied to the returned `HostBuilder`:

- set the `IHostEnvironment.ContentRootPath` to the result of `Directory.GetCurrentDirectory`
- load host `IConfiguration` from "DOTNET_" prefixed environment variables
- load host `IConfiguration` from supplied command line args
- load app `IConfiguration` from 'appsettings.json' and 'appsettings.[`IHostEnvironment.EnvironmentName`].json'
- load app `IConfiguration` from User Secrets when `IHostEnvironment.EnvironmentName` is '<example-value>' using the entry assembly
- load app `IConfiguration` from environment variables
- load app `IConfiguration` from supplied command line args
- configure the `ILoggerFactory` to log to the console, debug, and event source output
- enables scope validation on the dependency injection container when `IHostEnvironment.EnvironmentName` is 'Development'

## Host.CreateEmptyApplicationBuilder(HostApplicationBuilderSettings) method

```csharp
public static Microsoft.Extensions.Hosting.HostApplicationBuilder CreateEmptyApplicationBuilder (Microsoft.Extensions.Hosting.HostApplicationBuilderSettings? settings);
```

Initializes a new instance of the `HostApplicationBuilder` class with no pre-configured defaults.

Parameters:

- `settings`: Controls the initial configuration and other settings for constructing the `HostApplicationBuilder`.

Returns: The initialized `HostApplicationBuilder`.

To be added.
