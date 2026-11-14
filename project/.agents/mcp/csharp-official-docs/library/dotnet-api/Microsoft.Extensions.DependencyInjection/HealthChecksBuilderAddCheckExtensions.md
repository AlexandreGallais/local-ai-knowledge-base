---
title: "HealthChecksBuilderAddCheckExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/HealthChecksBuilderAddCheckExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HealthChecksBuilderAddCheckExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class HealthChecksBuilderAddCheckExtensions
```

Provides basic <example-value> methods for registering `IHealthCheck` instances in an `IHealthChecksBuilder`.

To be added.

## HealthChecksBuilderAddCheckExtensions.AddCheck(IHealthChecksBuilder, String, IHealthCheck, HealthStatus>, String>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, string name, Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck instance, Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus? failureStatus, System.Collections.Generic.IEnumerable<string> tags);
```

Adds a new health check with the specified name and implementation.

Parameters:

- `builder`: The `IHealthChecksBuilder`.
- `name`: The name of the health check.
- `instance`: An `IHealthCheck` instance.
- `failureStatus`: The `HealthStatus` that should be reported when the health check reports a failure. If the provided value
is `null`, then `HealthStatus.Unhealthy` will be reported.
- `tags`: A list of tags that can be used to filter health checks.

Returns: The `IHealthChecksBuilder`.

To be added.

## HealthChecksBuilderAddCheckExtensions.AddCheck(IHealthChecksBuilder, String, IHealthCheck, HealthStatus>, String>, TimeSpan>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddCheck (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, string name, Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck instance, Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus? failureStatus = default, System.Collections.Generic.IEnumerable<string>? tags = default, TimeSpan? timeout = default);
```

Adds a new health check with the specified name and implementation.

Parameters:

- `builder`: The `IHealthChecksBuilder`.
- `name`: The name of the health check.
- `instance`: An `IHealthCheck` instance.
- `failureStatus`: The `HealthStatus` that should be reported when the health check reports a failure. If the provided value
is `null`, then `HealthStatus.Unhealthy` will be reported.
- `tags`: A list of tags that can be used to filter health checks.
- `timeout`: An optional `TimeSpan` representing the timeout of the check.

Returns: The `IHealthChecksBuilder`.

To be added.

## HealthChecksBuilderAddCheckExtensions.AddCheck<T>(IHealthChecksBuilder, String, HealthStatus>, String>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddCheck<T> (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, string name, Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus? failureStatus, System.Collections.Generic.IEnumerable<string> tags) where T : class, Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck;
```

Adds a new health check with the specified name and implementation.

Parameters:

- `T`: The health check implementation type.
- `builder`: The `IHealthChecksBuilder`.
- `name`: The name of the health check.
- `failureStatus`: The `HealthStatus` that should be reported when the health check reports a failure. If the provided value
is `null`, then `HealthStatus.Unhealthy` will be reported.
- `tags`: A list of tags that can be used to filter health checks.

Returns: The `IHealthChecksBuilder`.

This method will use `ActivatorUtilities.GetServiceOrCreateInstance<T>` to create the health check
instance when needed. If a service of type `T` is registered in the dependency injection container
with any lifetime it will be used. Otherwise an instance of type `T` will be constructed with
access to services from the dependency injection container.

## HealthChecksBuilderAddCheckExtensions.AddCheck<T>(IHealthChecksBuilder, String, HealthStatus>, String>, TimeSpan>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddCheck<T> (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, string name, Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus? failureStatus = default, System.Collections.Generic.IEnumerable<string>? tags = default, TimeSpan? timeout = default) where T : class, Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck;
```

Adds a new health check with the specified name and implementation.

Parameters:

- `T`: The health check implementation type.
- `builder`: The `IHealthChecksBuilder`.
- `name`: The name of the health check.
- `failureStatus`: The `HealthStatus` that should be reported when the health check reports a failure. If the provided value
is `null`, then `HealthStatus.Unhealthy` will be reported.
- `tags`: A list of tags that can be used to filter health checks.
- `timeout`: An optional `TimeSpan` representing the timeout of the check.

Returns: The `IHealthChecksBuilder`.

This method will use `ActivatorUtilities.GetServiceOrCreateInstance<T>` to create the health check
instance when needed. If a service of type `T` is registered in the dependency injection container
with any lifetime it will be used. Otherwise an instance of type `T` will be constructed with
access to services from the dependency injection container.

## HealthChecksBuilderAddCheckExtensions.AddTypeActivatedCheck<T>(IHealthChecksBuilder, String, Object[]) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddTypeActivatedCheck<T> (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, string name, params object[] args) where T : class, Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck;
```

Adds a new type activated health check with the specified name and implementation.

Parameters:

- `T`: The health check implementation type.
- `builder`: The `IHealthChecksBuilder`.
- `name`: The name of the health check.
- `args`: Additional arguments to provide to the constructor.

Returns: The `IHealthChecksBuilder`.

This method will use `ActivatorUtilities.CreateInstance<T>` to create the health check
instance when needed. Additional arguments can be provided to the constructor via `args`.

## HealthChecksBuilderAddCheckExtensions.AddTypeActivatedCheck<T>(IHealthChecksBuilder, String, HealthStatus>, Object[]) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddTypeActivatedCheck<T> (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, string name, Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus? failureStatus, params object[] args) where T : class, Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck;
```

Adds a new type activated health check with the specified name and implementation.

Parameters:

- `T`: The health check implementation type.
- `builder`: The `IHealthChecksBuilder`.
- `name`: The name of the health check.
- `failureStatus`: The `HealthStatus` that should be reported when the health check reports a failure. If the provided value
is `null`, then `HealthStatus.Unhealthy` will be reported.
- `args`: Additional arguments to provide to the constructor.

Returns: The `IHealthChecksBuilder`.

This method will use `ActivatorUtilities.CreateInstance<T>` to create the health check
instance when needed. Additional arguments can be provided to the constructor via `args`.

## HealthChecksBuilderAddCheckExtensions.AddTypeActivatedCheck<T>(IHealthChecksBuilder, String, HealthStatus>, String>, Object[]) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddTypeActivatedCheck<T> (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, string name, Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus? failureStatus, System.Collections.Generic.IEnumerable<string>? tags, params object[] args) where T : class, Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck;
```

Adds a new type activated health check with the specified name and implementation.

Parameters:

- `T`: The health check implementation type.
- `builder`: The `IHealthChecksBuilder`.
- `name`: The name of the health check.
- `failureStatus`: The `HealthStatus` that should be reported when the health check reports a failure. If the provided value
is `null`, then `HealthStatus.Unhealthy` will be reported.
- `tags`: A list of tags that can be used to filter health checks.
- `args`: Additional arguments to provide to the constructor.

Returns: The `IHealthChecksBuilder`.

This method will use `ActivatorUtilities.CreateInstance<T>` to create the health check
instance when needed. Additional arguments can be provided to the constructor via `args`.

## HealthChecksBuilderAddCheckExtensions.AddTypeActivatedCheck<T>(IHealthChecksBuilder, String, HealthStatus>, String>, TimeSpan, Object[]) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder AddTypeActivatedCheck<T> (this Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder builder, string name, Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus? failureStatus, System.Collections.Generic.IEnumerable<string> tags, TimeSpan timeout, params object[] args) where T : class, Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck;
```

Adds a new type activated health check with the specified name and implementation.

Parameters:

- `T`: The health check implementation type.
- `builder`: The `IHealthChecksBuilder`.
- `name`: The name of the health check.
- `failureStatus`: The `HealthStatus` that should be reported when the health check reports a failure. If the provided value
is `null`, then `HealthStatus.Unhealthy` will be reported.
- `tags`: A list of tags that can be used to filter health checks.
- `args`: Additional arguments to provide to the constructor.
- `timeout`: A `TimeSpan` representing the timeout of the check.

Returns: The `IHealthChecksBuilder`.

This method will use `ActivatorUtilities.CreateInstance<T>` to create the health check
instance when needed. Additional arguments can be provided to the constructor via `args`.
