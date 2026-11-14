---
title: "HostApplicationBuilder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/HostApplicationBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HostApplicationBuilder class

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public sealed class HostApplicationBuilder : Microsoft.Extensions.Hosting.IHostApplicationBuilder
```

Represents a hosted applications and services builder that helps manage configuration, logging, lifetime, and more.

To be added.

## HostApplicationBuilder.HostApplicationBuilder() constructor

```csharp
public HostApplicationBuilder ();
```

Initializes a new instance of the `HostApplicationBuilder` class with preconfigured defaults.

The following defaults are applied to the returned `HostApplicationBuilder`:

- set the `IHostEnvironment.ContentRootPath` to the result of `Directory.GetCurrentDirectory`
- load host `IConfiguration` from "DOTNET_" prefixed environment variables
- load host `IConfiguration` from supplied command line args
- load app `IConfiguration` from 'appsettings.json' and 'appsettings.[`IHostEnvironment.EnvironmentName`].json'
- load app `IConfiguration` from '[`IHostEnvironment.ApplicationName`].settings.json' and '[`IHostEnvironment.ApplicationName`].settings.[`IHostEnvironment.EnvironmentName`].json' when `IHostEnvironment.ApplicationName` is not empty
- load app `IConfiguration` from User Secrets when `IHostEnvironment.EnvironmentName` is '<example-value>' using the entry assembly
- load app `IConfiguration` from environment variables
- load app `IConfiguration` from supplied command line args
- configure the `ILoggerFactory` to log to the console, debug, and event source output
- enables scope validation on the dependency injection container when `IHostEnvironment.EnvironmentName` is 'Development'

## HostApplicationBuilder.HostApplicationBuilder(HostApplicationBuilderSettings) constructor

```csharp
public HostApplicationBuilder (Microsoft.Extensions.Hosting.HostApplicationBuilderSettings? settings);
```

Initializes a new instance of the `HostApplicationBuilder`.

Parameters:

- `settings`: Settings controlling initial configuration and whether default settings should be used.

To be added.

## HostApplicationBuilder.HostApplicationBuilder(String[]) constructor

```csharp
public HostApplicationBuilder (string[]? args);
```

Initializes a new instance of the `HostApplicationBuilder` class with preconfigured defaults.

Parameters:

- `args`: The command line args.

The following defaults are applied to the returned `HostApplicationBuilder`:

- set the `IHostEnvironment.ContentRootPath` to the result of `Directory.GetCurrentDirectory`
- load host `IConfiguration` from "DOTNET_" prefixed environment variables
- load host `IConfiguration` from supplied command line args
- load app `IConfiguration` from 'appsettings.json' and 'appsettings.[`IHostEnvironment.EnvironmentName`].json'
- load app `IConfiguration` from '[`IHostEnvironment.ApplicationName`].settings.json' and '[`IHostEnvironment.ApplicationName`].settings.[`IHostEnvironment.EnvironmentName`].json' when `IHostEnvironment.ApplicationName` is not empty
- load app `IConfiguration` from User Secrets when `IHostEnvironment.EnvironmentName` is '<example-value>' using the entry assembly
- load app `IConfiguration` from environment variables
- load app `IConfiguration` from supplied command line args
- configure the `ILoggerFactory` to log to the console, debug, and event source output
- enables scope validation on the dependency injection container when `IHostEnvironment.EnvironmentName` is 'Development'

## HostApplicationBuilder.Configuration property

```csharp
public Microsoft.Extensions.Configuration.ConfigurationManager Configuration { get; }
```

Gets the set of key/value configuration properties.

Returns: To be added.

This can be mutated by adding more configuration sources, which will update its current view.

## HostApplicationBuilder.Environment property

```csharp
public Microsoft.Extensions.Hosting.IHostEnvironment Environment { get; }
```

Gets information about the hosting environment an application is running in.

Returns: To be added.

To be added.

## HostApplicationBuilder.Logging property

```csharp
public Microsoft.Extensions.Logging.ILoggingBuilder Logging { get; }
```

Gets a collection of logging providers for the application to compose. This property is useful for adding new logging providers.

Returns: To be added.

To be added.

## HostApplicationBuilder.Metrics property

```csharp
public Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder Metrics { get; }
```

Allows enabling metrics and directing their output.

Returns: To be added.

To be added.

## HostApplicationBuilder.Microsoft.Extensions.Hosting.IHostApplicationBuilder.Configuration property

```csharp
Microsoft.Extensions.Configuration.IConfigurationManager Microsoft.Extensions.Hosting.IHostApplicationBuilder.Configuration { get; }
```

Gets the set of key/value configuration properties.

Returns: To be added.

This member is an explicit interface member implementation. It can be used only when the `HostApplicationBuilder` instance is cast to an `IHostApplicationBuilder` interface.

## HostApplicationBuilder.Microsoft.Extensions.Hosting.IHostApplicationBuilder.Properties property

```csharp
System.Collections.Generic.IDictionary<object,object> Microsoft.Extensions.Hosting.IHostApplicationBuilder.Properties { get; }
```

Gets a central location for sharing state between components during the host building process.

Returns: To be added.

To be added.

## HostApplicationBuilder.Services property

```csharp
public Microsoft.Extensions.DependencyInjection.IServiceCollection Services { get; }
```

Gets a collection of services for the application to compose. This property is useful for adding user-provided or framework-provided services.

Returns: To be added.

To be added.

## HostApplicationBuilder.Build() method

```csharp
public Microsoft.Extensions.Hosting.IHost Build ();
```

Builds the host. This method can only be called once.

Returns: An initialized `IHost`.

To be added.

## HostApplicationBuilder.ConfigureContainer<TContainerBuilder>(IServiceProviderFactory<TContainerBuilder>, Action<TContainerBuilder>) method

```csharp
public void ConfigureContainer<TContainerBuilder> (Microsoft.Extensions.DependencyInjection.IServiceProviderFactory<TContainerBuilder> factory, Action<TContainerBuilder>? configure = default);
```

Registers a  instance to be used to create the .

Parameters:

- `TContainerBuilder`: The type of builder provided by the <xref data-throw-if-not-resolved="true" uid="Microsoft.Extensions.DependencyInjection.IServiceProviderFactory`1"></xref>.
- `factory`: The <xref data-throw-if-not-resolved="true" uid="Microsoft.Extensions.DependencyInjection.IServiceProviderFactory`1"></xref>.
- `configure`: A delegate used to configure the . This delegate can be used to configure services using APIs that are specific to the <xref data-throw-if-not-resolved="true" uid="Microsoft.Extensions.DependencyInjection.IServiceProviderFactory`1"></xref> implementation.

#### Remarks

This method is called by `Build`, and so the delegate specified by `configure` will run after all other services have been registered.

If you call this method multiple times, the previously stored `factory` and `configure` delegates are replaced.
