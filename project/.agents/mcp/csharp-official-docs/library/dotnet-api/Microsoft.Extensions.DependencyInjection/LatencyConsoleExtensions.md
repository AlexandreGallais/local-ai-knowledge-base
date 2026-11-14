---
title: "LatencyConsoleExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/LatencyConsoleExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LatencyConsoleExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class LatencyConsoleExtensions
```

Extensions to add console latency data exporter.

To be added.

## LatencyConsoleExtensions.AddConsoleLatencyDataExporter(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddConsoleLatencyDataExporter (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Add latency data exporter for the console.

Parameters:

- `services`: Dependency injection container.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` is `null`.

To be added.

## LatencyConsoleExtensions.AddConsoleLatencyDataExporter(IServiceCollection, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddConsoleLatencyDataExporter (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Add latency data exporter for the console.

Parameters:

- `services`: Dependency injection container.
- `section`: Configuration of `LatencyConsoleOptions`.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: Either `services` or `section` is `null`.

To be added.

## LatencyConsoleExtensions.AddConsoleLatencyDataExporter(IServiceCollection, LatencyConsoleOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddConsoleLatencyDataExporter (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Diagnostics.Latency.LatencyConsoleOptions> configure);
```

Add latency data exporter for the console.

Parameters:

- `services`: Dependency injection container.
- `configure`: `LatencyConsoleOptions` configuration delegate.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: Either `services` or `configure` is `null`.

To be added.
