---
title: "MetricsServiceExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/MetricsServiceExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MetricsServiceExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class MetricsServiceExtensions
```

Extension methods for setting up metrics services in an `IServiceCollection`.

To be added.

## MetricsServiceExtensions.AddMetrics(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddMetrics (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds metrics services to the specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add services to.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.

## MetricsServiceExtensions.AddMetrics(IServiceCollection, IMetricsBuilder>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddMetrics (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Diagnostics.Metrics.IMetricsBuilder> configure);
```

Adds metrics services to the specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add services to.
- `configure`: A callback to configure the `IMetricsBuilder`.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.
