---
title: "ServiceDiscoveryDnsServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/ServiceDiscoveryDnsServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceDiscoveryDnsServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public static class ServiceDiscoveryDnsServiceCollectionExtensions
```

Extensions for `IServiceCollection` to add service discovery.

To be added.

## ServiceDiscoveryDnsServiceCollectionExtensions.AddDnsServiceEndpointProvider(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddDnsServiceEndpointProvider (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds DNS service discovery to the `IServiceCollection`.

Parameters:

- `services`: The service collection.

Returns: The provided `IServiceCollection`.

DNS A/AAAA queries are widely available but are not able to provide port numbers for endpoints and cannot support multiple named endpoints per service.

## ServiceDiscoveryDnsServiceCollectionExtensions.AddDnsServiceEndpointProvider(IServiceCollection, DnsServiceEndpointProviderOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddDnsServiceEndpointProvider (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.ServiceDiscovery.Dns.DnsServiceEndpointProviderOptions> configureOptions);
```

Adds DNS service discovery to the `IServiceCollection`.

Parameters:

- `services`: The service collection.
- `configureOptions`: The DNS SRV service discovery configuration options.

Returns: The provided `IServiceCollection`.

DNS A/AAAA queries are widely available but are not able to provide port numbers for endpoints and cannot support multiple named endpoints per service.

## ServiceDiscoveryDnsServiceCollectionExtensions.AddDnsSrvServiceEndpointProvider(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddDnsSrvServiceEndpointProvider (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds DNS SRV service discovery to the `IServiceCollection`.

Parameters:

- `services`: The service collection.

Returns: The provided `IServiceCollection`.

DNS SRV queries are able to provide port numbers for endpoints and can support multiple named endpoints per service.
However, not all environment support DNS SRV queries, and in some environments, additional configuration may be required.

## ServiceDiscoveryDnsServiceCollectionExtensions.AddDnsSrvServiceEndpointProvider(IServiceCollection, DnsSrvServiceEndpointProviderOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddDnsSrvServiceEndpointProvider (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.ServiceDiscovery.Dns.DnsSrvServiceEndpointProviderOptions> configureOptions);
```

Adds DNS SRV service discovery to the `IServiceCollection`.

Parameters:

- `services`: The service collection.
- `configureOptions`: The DNS SRV service discovery configuration options.

Returns: The provided `IServiceCollection`.

DNS SRV queries are able to provide port numbers for endpoints and can support multiple named endpoints per service.
However, not all environment support DNS SRV queries, and in some environments, additional configuration may be required.

## ServiceDiscoveryDnsServiceCollectionExtensions.ConfigureDnsResolver(IServiceCollection, DnsResolverOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection ConfigureDnsResolver (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.ServiceDiscovery.Dns.DnsResolverOptions> configureOptions);
```

Configures the DNS resolver used for service discovery.

Parameters:

- `services`: The service collection.
- `configureOptions`: The DNS resolver options.

Returns: The provided `IServiceCollection`.

To be added.
