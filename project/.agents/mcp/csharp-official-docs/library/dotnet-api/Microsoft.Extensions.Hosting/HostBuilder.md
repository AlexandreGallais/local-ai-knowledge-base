---
title: "HostBuilder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/HostBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HostBuilder class

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public class HostBuilder : Microsoft.Extensions.Hosting.IHostBuilder
```

A program initialization utility.

To be added.

## HostBuilder.HostBuilder() constructor

```csharp
public HostBuilder ();
```

Initializes a new instance of `HostBuilder`.

To be added.

## HostBuilder.Properties property

```csharp
public System.Collections.Generic.IDictionary<object,object> Properties { get; }
```

Gets a central location for sharing state between components during the host building process.

Returns: To be added.

To be added.

## HostBuilder.Build() method

```csharp
public Microsoft.Extensions.Hosting.IHost Build ();
```

Run the given actions to initialize the host. This can only be called once.

Returns: An initialized `IHost`.

Adds basic <example-value> to the host such as application lifetime, host environment, and logging.

## HostBuilder.ConfigureAppConfiguration(IConfigurationBuilder>) method

```csharp
public Microsoft.Extensions.Hosting.IHostBuilder ConfigureAppConfiguration (Action<Microsoft.Extensions.Hosting.HostBuilderContext,Microsoft.Extensions.Configuration.IConfigurationBuilder> configureDelegate);
```

Sets up the configuration for the remainder of the build process and application. This can be called multiple times and
the results will be additive. The results will be available at `HostBuilderContext.Configuration` for
subsequent operations, as well as in `IHost.Services`.

Parameters:

- `configureDelegate`: The delegate for configuring the `IConfigurationBuilder` that will be used
to construct the `IConfiguration` for the host.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.

## HostBuilder.ConfigureContainer<TContainerBuilder>(HostBuilderContext,TContainerBuilder>) method

```csharp
public Microsoft.Extensions.Hosting.IHostBuilder ConfigureContainer<TContainerBuilder> (Action<Microsoft.Extensions.Hosting.HostBuilderContext,TContainerBuilder> configureDelegate);
```

Enables configuring the instantiated dependency container. This can be called multiple times and
the results will be additive.

Parameters:

- `TContainerBuilder`: The type of the builder to create.
- `configureDelegate`: The delegate for configuring the `IConfigurationBuilder` that will be used
to construct the `IConfiguration` for the host.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.

## HostBuilder.ConfigureHostConfiguration(IConfigurationBuilder>) method

```csharp
public Microsoft.Extensions.Hosting.IHostBuilder ConfigureHostConfiguration (Action<Microsoft.Extensions.Configuration.IConfigurationBuilder> configureDelegate);
```

Set up the configuration for the builder itself. This will be used to initialize the `IHostEnvironment`
for use later in the build process. This can be called multiple times and the results will be additive.

Parameters:

- `configureDelegate`: The delegate for configuring the `IConfigurationBuilder` that will be used
to construct the `IConfiguration` for the host.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.

## HostBuilder.ConfigureServices(IServiceCollection>) method

```csharp
public Microsoft.Extensions.Hosting.IHostBuilder ConfigureServices (Action<Microsoft.Extensions.Hosting.HostBuilderContext,Microsoft.Extensions.DependencyInjection.IServiceCollection> configureDelegate);
```

Adds services to the container. This can be called multiple times and the results will be additive.

Parameters:

- `configureDelegate`: The delegate for configuring the `IConfigurationBuilder` that will be used
to construct the `IConfiguration` for the host.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.

## HostBuilder.UseServiceProviderFactory<TContainerBuilder>(IServiceProviderFactory<TContainerBuilder>) method

```csharp
public Microsoft.Extensions.Hosting.IHostBuilder UseServiceProviderFactory<TContainerBuilder> (Microsoft.Extensions.DependencyInjection.IServiceProviderFactory<TContainerBuilder> factory);
```

Overrides the factory used to create the service provider.

Parameters:

- `TContainerBuilder`: The type of the builder to create.
- `factory`: A factory used for creating service providers.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.

## HostBuilder.UseServiceProviderFactory<TContainerBuilder>(IServiceProviderFactory<TContainerBuilder>>) method

```csharp
public Microsoft.Extensions.Hosting.IHostBuilder UseServiceProviderFactory<TContainerBuilder> (Func<Microsoft.Extensions.Hosting.HostBuilderContext,Microsoft.Extensions.DependencyInjection.IServiceProviderFactory<TContainerBuilder>> factory);
```

Overrides the factory used to create the service provider.

Parameters:

- `TContainerBuilder`: The type of the builder to create.
- `factory`: A factory used for creating service providers.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.
