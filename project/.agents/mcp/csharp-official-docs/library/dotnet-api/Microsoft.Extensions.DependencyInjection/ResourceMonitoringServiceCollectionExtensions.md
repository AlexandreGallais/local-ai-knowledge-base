---
title: "ResourceMonitoringServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ResourceMonitoringServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ResourceMonitoringServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class ResourceMonitoringServiceCollectionExtensions
```

Lets you configure and register resource monitoring components.

To be added.

## ResourceMonitoringServiceCollectionExtensions.AddResourceMonitoring(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddResourceMonitoring (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Configures and adds an `IResourceMonitor` implementation to a service collection.

Parameters:

- `services`: The dependency injection container to add the monitor to.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` is `null`.

To be added.

## ResourceMonitoringServiceCollectionExtensions.AddResourceMonitoring(IServiceCollection, IResourceMonitorBuilder>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddResourceMonitoring (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Diagnostics.ResourceMonitoring.IResourceMonitorBuilder> configure);
```

Configures and adds an `IResourceMonitor` implementation to a service collection.

Parameters:

- `services`: The dependency injection container to add the monitor to.
- `configure`: Delegate to configure `IResourceMonitorBuilder`.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: Either `services` or `configure` is `null`.

To be added.
