---
title: "ServiceDiscoveryReverseProxyServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ServiceDiscoveryReverseProxyServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceDiscoveryReverseProxyServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class ServiceDiscoveryReverseProxyServiceCollectionExtensions
```

Extensions for `IServiceCollection` used to register the ReverseProxy's components.

To be added.

## ServiceDiscoveryReverseProxyServiceCollectionExtensions.AddHttpForwarderWithServiceDiscovery(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddHttpForwarderWithServiceDiscovery (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds the `IHttpForwarder` with service discovery support.

Parameters:

- `services`: To be added.

Returns: To be added.

To be added.

## ServiceDiscoveryReverseProxyServiceCollectionExtensions.AddServiceDiscoveryDestinationResolver(IReverseProxyBuilder) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IReverseProxyBuilder AddServiceDiscoveryDestinationResolver (this Microsoft.Extensions.DependencyInjection.IReverseProxyBuilder builder);
```

Provides a `IDestinationResolver` implementation which uses service discovery to resolve destinations.

Parameters:

- `builder`: To be added.

Returns: To be added.

To be added.

## ServiceDiscoveryReverseProxyServiceCollectionExtensions.AddServiceDiscoveryForwarderFactory(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddServiceDiscoveryForwarderFactory (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Provides a `IForwarderHttpClientFactory` implementation which uses service discovery to resolve service names.

Parameters:

- `services`: To be added.

Returns: To be added.

To be added.
