---
title: "HttpClientLatencyTelemetryExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/HttpClientLatencyTelemetryExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpClientLatencyTelemetryExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class HttpClientLatencyTelemetryExtensions
```

Extensions to add http client latency telemetry.

To be added.

## HttpClientLatencyTelemetryExtensions.AddHttpClientLatencyTelemetry(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddHttpClientLatencyTelemetry (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds a `DelegatingHandler` to collect latency information and enrich outgoing request log for all http clients.

Parameters:

- `services`: The `IServiceCollection`.

Returns: The value of `services`.

This extension configures latency information collection globally for all http clients.

## HttpClientLatencyTelemetryExtensions.AddHttpClientLatencyTelemetry(IServiceCollection, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddHttpClientLatencyTelemetry (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Adds a `DelegatingHandler` to collect latency information and enrich outgoing request log for all http clients.

Parameters:

- `services`: The `IServiceCollection`.
- `section`: The `IConfigurationSection` to use for configuring `HttpClientLatencyTelemetryOptions`.

Returns: The value of `services`.

This extension configures outgoing request logs auto collection globally for all http clients.

## HttpClientLatencyTelemetryExtensions.AddHttpClientLatencyTelemetry(IServiceCollection, HttpClientLatencyTelemetryOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddHttpClientLatencyTelemetry (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Http.Latency.HttpClientLatencyTelemetryOptions> configure);
```

Adds a `DelegatingHandler` to collect latency information and enrich outgoing request log for all http clients.

Parameters:

- `services`: The `IServiceCollection`.
- `configure`: The delegate to configure `HttpClientLatencyTelemetryOptions` with.

Returns: The value of `services`.

This extension configures outgoing request logs auto collection globally for all http clients.
