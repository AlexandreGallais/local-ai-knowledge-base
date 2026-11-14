---
title: "ServiceDiscoveryServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ServiceDiscoveryServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceDiscoveryServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class ServiceDiscoveryServiceCollectionExtensions
```

Extension methods for configuring service discovery.

To be added.

## ServiceDiscoveryServiceCollectionExtensions.AddConfigurationServiceEndpointProvider(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddConfigurationServiceEndpointProvider (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Configures a service discovery endpoint provider which uses `IConfiguration` to resolve endpoints.

Parameters:

- `services`: The service collection.

Returns: The service collection.

To be added.

## ServiceDiscoveryServiceCollectionExtensions.AddConfigurationServiceEndpointProvider(IServiceCollection, ConfigurationServiceEndpointProviderOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddConfigurationServiceEndpointProvider (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.ServiceDiscovery.ConfigurationServiceEndpointProviderOptions> configureOptions);
```

Configures a service discovery endpoint provider which uses `IConfiguration` to resolve endpoints.

Parameters:

- `configureOptions`: The delegate used to configure the provider.
- `services`: The service collection.

Returns: The service collection.

To be added.

## ServiceDiscoveryServiceCollectionExtensions.AddPassThroughServiceEndpointProvider(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddPassThroughServiceEndpointProvider (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Configures a service discovery endpoint provider which passes through the input without performing resolution.

Parameters:

- `services`: The service collection.

Returns: The service collection.

To be added.

## ServiceDiscoveryServiceCollectionExtensions.AddServiceDiscovery(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddServiceDiscovery (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds the core service discovery services and configures defaults.

Parameters:

- `services`: The service collection.

Returns: The service collection.

To be added.

## ServiceDiscoveryServiceCollectionExtensions.AddServiceDiscovery(IServiceCollection, ServiceDiscoveryOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddServiceDiscovery (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.ServiceDiscovery.ServiceDiscoveryOptions> configureOptions);
```

Adds the core service discovery services and configures defaults.

Parameters:

- `services`: The service collection.
- `configureOptions`: The delegate used to configure service discovery options.

Returns: The service collection.

To be added.

## ServiceDiscoveryServiceCollectionExtensions.AddServiceDiscoveryCore(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddServiceDiscoveryCore (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds the core service discovery services.

Parameters:

- `services`: The service collection.

Returns: The service collection.

To be added.

## ServiceDiscoveryServiceCollectionExtensions.AddServiceDiscoveryCore(IServiceCollection, ServiceDiscoveryOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddServiceDiscoveryCore (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.ServiceDiscovery.ServiceDiscoveryOptions> configureOptions);
```

Adds the core service discovery services.

Parameters:

- `services`: The service collection.
- `configureOptions`: The delegate used to configure service discovery options.

Returns: The service collection.

To be added.
