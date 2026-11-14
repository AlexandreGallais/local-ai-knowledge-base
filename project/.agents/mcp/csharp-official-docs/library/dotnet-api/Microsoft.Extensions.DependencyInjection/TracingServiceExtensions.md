---
title: "TracingServiceExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/TracingServiceExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TracingServiceExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class TracingServiceExtensions
```

Extension methods for setting up tracing services in an `IServiceCollection`.

To be added.

## TracingServiceExtensions.AddTracing(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddTracing (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds tracing services to the specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add services to.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.

## TracingServiceExtensions.AddTracing(IServiceCollection, ITracingBuilder>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddTracing (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Diagnostics.Tracing.ITracingBuilder> configure);
```

Adds tracing services to the specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add services to.
- `configure`: A callback to configure the `ITracingBuilder`.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.
