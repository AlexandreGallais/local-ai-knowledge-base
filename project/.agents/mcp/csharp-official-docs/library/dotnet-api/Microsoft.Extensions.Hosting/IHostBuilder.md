---
title: "IHostBuilder interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/IHostBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IHostBuilder interface

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public interface IHostBuilder
```

A program initialization abstraction.

To be added.

## IHostBuilder.Properties property

```csharp
public System.Collections.Generic.IDictionary<object,object> Properties { get; }
```

Gets a central location for sharing state between components during the host building process.

Returns: To be added.

To be added.

## IHostBuilder.Build() method

```csharp
public Microsoft.Extensions.Hosting.IHost Build ();
```

Runs the given actions to initialize the host. This can only be called once.

Returns: An initialized `IHost`.

To be added.

## IHostBuilder.ConfigureAppConfiguration(IConfigurationBuilder>) method

```csharp
public Microsoft.Extensions.Hosting.IHostBuilder ConfigureAppConfiguration (Action<Microsoft.Extensions.Hosting.HostBuilderContext,Microsoft.Extensions.Configuration.IConfigurationBuilder> configureDelegate);
```

Sets up the configuration for the remainder of the build process and application. This can be called multiple times and
the results will be additive. The results will be available at `HostBuilderContext.Configuration` for
subsequent operations, as well as in `IHost.Services`.

Parameters:

- `configureDelegate`: The delegate for configuring the `IConfigurationBuilder` that will be used
to construct the `IConfiguration` for the application.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.

## IHostBuilder.ConfigureContainer<TContainerBuilder>(HostBuilderContext,TContainerBuilder>) method

```csharp
public Microsoft.Extensions.Hosting.IHostBuilder ConfigureContainer<TContainerBuilder> (Action<Microsoft.Extensions.Hosting.HostBuilderContext,TContainerBuilder> configureDelegate);
```

Enables configuring the instantiated dependency container. This can be called multiple times and
the results will be additive.

Parameters:

- `TContainerBuilder`: The type of builder.
- `configureDelegate`: The delegate which configures the builder.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.

## IHostBuilder.ConfigureHostConfiguration(IConfigurationBuilder>) method

```csharp
public Microsoft.Extensions.Hosting.IHostBuilder ConfigureHostConfiguration (Action<Microsoft.Extensions.Configuration.IConfigurationBuilder> configureDelegate);
```

Sets up the configuration for the builder itself. This will be used to initialize the `IHostEnvironment`
for use later in the build process. This can be called multiple times and the results will be additive.

Parameters:

- `configureDelegate`: The delegate for configuring the `IConfigurationBuilder` that will be used
to construct the `IConfiguration` for the host.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.

## IHostBuilder.ConfigureServices(IServiceCollection>) method

```csharp
public Microsoft.Extensions.Hosting.IHostBuilder ConfigureServices (Action<Microsoft.Extensions.Hosting.HostBuilderContext,Microsoft.Extensions.DependencyInjection.IServiceCollection> configureDelegate);
```

Adds services to the container. This can be called multiple times and the results will be additive.

Parameters:

- `configureDelegate`: The delegate for configuring the `IServiceCollection` that will be used
to construct the `IServiceProvider`.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.

## IHostBuilder.UseServiceProviderFactory<TContainerBuilder>(IServiceProviderFactory<TContainerBuilder>) method

```csharp
public Microsoft.Extensions.Hosting.IHostBuilder UseServiceProviderFactory<TContainerBuilder> (Microsoft.Extensions.DependencyInjection.IServiceProviderFactory<TContainerBuilder> factory);
```

Overrides the factory used to create the service provider.

Parameters:

- `TContainerBuilder`: The type of builder.
- `factory`: The factory to register.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.

## IHostBuilder.UseServiceProviderFactory<TContainerBuilder>(IServiceProviderFactory<TContainerBuilder>>) method

```csharp
public virtual Microsoft.Extensions.Hosting.IHostBuilder UseServiceProviderFactory<TContainerBuilder> (Func<Microsoft.Extensions.Hosting.HostBuilderContext,Microsoft.Extensions.DependencyInjection.IServiceProviderFactory<TContainerBuilder>> factory);
```

Overrides the factory used to create the service provider.

Parameters:

- `TContainerBuilder`: The type of builder.
- `factory`: The factory to register.

Returns: The same instance of the `IHostBuilder` for chaining.

To be added.
