---
title: "TcpEndpointProbesExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/TcpEndpointProbesExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TcpEndpointProbesExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class TcpEndpointProbesExtensions
```

Extension methods for setting up TCP-based health check probes.

To be added.

## TcpEndpointProbesExtensions.AddTcpEndpointProbe(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddTcpEndpointProbe (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Registers health status reporting using a TCP port
if service is considered as healthy `IHealthCheck`.

Parameters:

- `services`: The `IServiceCollection` to add the services to.

Returns: The value of `services`.

To be added.

## TcpEndpointProbesExtensions.AddTcpEndpointProbe(IServiceCollection, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddTcpEndpointProbe (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.Configuration.IConfigurationSection configurationSection);
```

Registers health status reporting using a TCP port
if service is considered as healthy `IHealthCheck`.

Parameters:

- `services`: The `IServiceCollection` to add the services to.
- `configurationSection`: Configuration for `TcpEndpointProbesOptions`.

Returns: The value of `services`.

To be added.

## TcpEndpointProbesExtensions.AddTcpEndpointProbe(IServiceCollection, TcpEndpointProbesOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddTcpEndpointProbe (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Diagnostics.Probes.TcpEndpointProbesOptions> configure);
```

Registers health status reporting using a TCP port
if service is considered as healthy `IHealthCheck`.

Parameters:

- `services`: The `IServiceCollection` to add the services to.
- `configure`: Configuration for `TcpEndpointProbesOptions`.

Returns: The value of `services`.

To be added.

## TcpEndpointProbesExtensions.AddTcpEndpointProbe(IServiceCollection, String) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddTcpEndpointProbe (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, string name);
```

Registers health status reporting using a TCP port
if service is considered as healthy `IHealthCheck`.

Parameters:

- `services`: The `IServiceCollection` to add the services to.
- `name`: Name used to retrieve the options.

Returns: The value of `services`.

To be added.

## TcpEndpointProbesExtensions.AddTcpEndpointProbe(IServiceCollection, String, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddTcpEndpointProbe (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, string name, Microsoft.Extensions.Configuration.IConfigurationSection configurationSection);
```

Registers health status reporting using a TCP port
if service is considered as healthy `IHealthCheck`.

Parameters:

- `services`: The `IServiceCollection` to add the services to.
- `name`: Name for the options.
- `configurationSection`: Configuration for `TcpEndpointProbesOptions`.

Returns: The value of `services`.

To be added.

## TcpEndpointProbesExtensions.AddTcpEndpointProbe(IServiceCollection, String, TcpEndpointProbesOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddTcpEndpointProbe (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, string name, Action<Microsoft.Extensions.Diagnostics.Probes.TcpEndpointProbesOptions> configure);
```

Registers health status reporting using a TCP port
if service is considered as healthy `IHealthCheck`.

Parameters:

- `services`: The `IServiceCollection` to add the services to.
- `name`: Name for the options.
- `configure`: Configuration for `TcpEndpointProbesOptions`.

Returns: The value of `services`.

To be added.
