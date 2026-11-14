---
title: "CommonHealthChecksExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/CommonHealthChecksExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CommonHealthChecksExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class CommonHealthChecksExtensions
```

Controls various health check features.

To be added.

## CommonHealthChecksExtensions.AddApplicationLifecycleHealthCheck(IHealthChecksBuilder, String>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddApplicationLifecycleHealthCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, System.Collections.Generic.IEnumerable<string> tags);
```

Registers a health check provider that's tied to the application's lifecycle.

Parameters:

- `builder`: The builder to add the provider to.
- `tags`: A list of tags that can be used to filter health checks.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder` or `tags` is `null`.

To be added.

## CommonHealthChecksExtensions.AddApplicationLifecycleHealthCheck(IHealthChecksBuilder, String[]) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddApplicationLifecycleHealthCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, params string[] tags);
```

Registers a health check provider that's tied to the application's lifecycle.

Parameters:

- `builder`: The builder to add the provider to.
- `tags`: A list of tags that can be used to filter health checks.

Returns: The value of `builder`.

To be added.

## CommonHealthChecksExtensions.AddManualHealthCheck(IHealthChecksBuilder, String>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddManualHealthCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, System.Collections.Generic.IEnumerable<string> tags);
```

Registers a health check provider that enables manual control of the application's health.

Parameters:

- `builder`: The builder to add the provider to.
- `tags`: A list of tags that can be used to filter health checks.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder` or `tags` is `null`.

To be added.

## CommonHealthChecksExtensions.AddManualHealthCheck(IHealthChecksBuilder, String[]) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddManualHealthCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, params string[] tags);
```

Registers a health check provider that enables manual control of the application's health.

Parameters:

- `builder`: The builder to add the provider to.
- `tags`: A list of tags that can be used to filter health checks.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder` or `tags` is `null`.

To be added.

## CommonHealthChecksExtensions.AddTelemetryHealthCheckPublisher(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddTelemetryHealthCheckPublisher (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Registers a health check publisher which emits telemetry representing the application's health.

Parameters:

- `services`: The dependency injection container to add the publisher to.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` is `null`.

To be added.

## CommonHealthChecksExtensions.AddTelemetryHealthCheckPublisher(IServiceCollection, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddTelemetryHealthCheckPublisher (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Registers a health check publisher which emits telemetry representing the application's health.

Parameters:

- `services`: The dependency injection container to add the publisher to.
- `section`: Configuration for `TelemetryHealthCheckPublisherOptions`.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` or `section` is `null`.

To be added.

## CommonHealthChecksExtensions.AddTelemetryHealthCheckPublisher(IServiceCollection, TelemetryHealthCheckPublisherOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddTelemetryHealthCheckPublisher (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Diagnostics.HealthChecks.TelemetryHealthCheckPublisherOptions> configure);
```

Registers a health check publisher which emits telemetry representing the application's health.

Parameters:

- `services`: The dependency injection container to add the publisher to.
- `configure`: Configuration for `TelemetryHealthCheckPublisherOptions`.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` or `configure` is `null`.

To be added.

## CommonHealthChecksExtensions.ReportHealthy(IManualHealthCheck) method

```csharp
public static void ReportHealthy (this Microsoft.Extensions.Diagnostics.HealthChecks.IManualHealthCheck manualHealthCheck);
```

Sets the manual health check to the healthy state.

Parameters:

- `manualHealthCheck`: The `IManualHealthCheck`.

Exceptions:

- `ArgumentNullException`: `manualHealthCheck` is `null`.

To be added.

## CommonHealthChecksExtensions.ReportUnhealthy(IManualHealthCheck, String) method

```csharp
public static void ReportUnhealthy (this Microsoft.Extensions.Diagnostics.HealthChecks.IManualHealthCheck manualHealthCheck, string reason);
```

Sets the manual health check to return an unhealthy states and an associated reason.

Parameters:

- `manualHealthCheck`: The `IManualHealthCheck`.
- `reason`: The reason why the health check is unhealthy.

Exceptions:

- `ArgumentNullException`: `manualHealthCheck` is `null`.

To be added.
