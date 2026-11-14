---
title: "LatencyContextExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/LatencyContextExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LatencyContextExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class LatencyContextExtensions
```

Extensions to add latency context.

To be added.

## LatencyContextExtensions.AddLatencyContext(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddLatencyContext (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds latency context.

Parameters:

- `services`: The dependency injection container.

Returns: The value of `services`.

To be added.

## LatencyContextExtensions.AddLatencyContext(IServiceCollection, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddLatencyContext (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Adds latency context.

Parameters:

- `services`: The dependency injection container.
- `section`: The configuration of `LatencyContextOptions`.

Returns: The value of `services`.

To be added.

## LatencyContextExtensions.AddLatencyContext(IServiceCollection, LatencyContextOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddLatencyContext (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Diagnostics.Latency.LatencyContextOptions> configure);
```

Adds latency context.

Parameters:

- `services`: The dependency injection container.
- `configure`: The `LatencyContextOptions` configuration delegate.

Returns: The value of `services`.

To be added.
