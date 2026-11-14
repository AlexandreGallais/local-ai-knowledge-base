---
title: "IHostApplicationBuilder interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/IHostApplicationBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IHostApplicationBuilder interface

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public interface IHostApplicationBuilder
```

Represents a hosted applications and services builder which helps manage configuration, logging, lifetime, and more.

To be added.

## IHostApplicationBuilder.Configuration property

```csharp
public Microsoft.Extensions.Configuration.IConfigurationManager Configuration { get; }
```

Gets the set of key/value configuration properties.

Returns: To be added.

This can be mutated by adding more configuration sources, which will update its current view.

## IHostApplicationBuilder.Environment property

```csharp
public Microsoft.Extensions.Hosting.IHostEnvironment Environment { get; }
```

Gets the information about the hosting environment an application is running in.

Returns: To be added.

To be added.

## IHostApplicationBuilder.Logging property

```csharp
public Microsoft.Extensions.Logging.ILoggingBuilder Logging { get; }
```

Gets a collection of logging providers for the application to compose. This is useful for adding new logging providers.

Returns: To be added.

To be added.

## IHostApplicationBuilder.Metrics property

```csharp
public Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder Metrics { get; }
```

Gets a builder that allows enabling metrics and directing their output.

Returns: To be added.

To be added.

## IHostApplicationBuilder.Properties property

```csharp
public System.Collections.Generic.IDictionary<object,object> Properties { get; }
```

Gets a central location for sharing state between components during the host building process.

Returns: To be added.

To be added.

## IHostApplicationBuilder.Services property

```csharp
public Microsoft.Extensions.DependencyInjection.IServiceCollection Services { get; }
```

Gets a collection of services for the application to compose. This is useful for adding user provided or framework provided services.

Returns: To be added.

To be added.

## IHostApplicationBuilder.ConfigureContainer<TContainerBuilder>(IServiceProviderFactory<TContainerBuilder>, Action<TContainerBuilder>) method

```csharp
public void ConfigureContainer<TContainerBuilder> (Microsoft.Extensions.DependencyInjection.IServiceProviderFactory<TContainerBuilder> factory, Action<TContainerBuilder>? configure = default);
```

Registers a `IServiceProviderFactory<T>` instance to be used to create the `IServiceProvider`.

Parameters:

- `TContainerBuilder`: The type of builder provided by the `IServiceProviderFactory<T>`.
- `factory`: The factory object that can create the `TContainerBuilder` and `IServiceProvider`.
- `configure`: A delegate used to configure the `TContainerBuilder`. This can be used to configure services using
APIS specific to the `IServiceProviderFactory<T>` implementation.

The `IServiceProvider` is created when this builder is built and so the delegate provided
by `configure` will run after all other services have been registered.

Multiple calls to `IHostApplicationBuilder.ConfigureContainer<T>` will replace
the previously stored `factory` and `configure` delegate.
