---
title: "HealthCheckRegistration class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.HealthChecks/HealthCheckRegistration.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HealthCheckRegistration class

Namespace: `Microsoft.Extensions.Diagnostics.HealthChecks`

```csharp
public sealed class HealthCheckRegistration
```

Represent the registration information associated with an `IHealthCheck` implementation.

The health check registration is provided as a separate object so that application developers can customize
how health check implementations are configured.

The registration is provided to an `IHealthCheck` implementation during execution through
`HealthCheckContext.Registration`. This allows a health check implementation to access named
options or perform other operations based on the registered name.

## HealthCheckRegistration.HealthCheckRegistration(String, IHealthCheck, HealthStatus>, String>) constructor

```csharp
public HealthCheckRegistration (string name, Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck instance, Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus? failureStatus, System.Collections.Generic.IEnumerable<string>? tags);
```

Creates a new `HealthCheckRegistration` for an existing `IHealthCheck` instance.

Parameters:

- `name`: The health check name.
- `instance`: The `IHealthCheck` instance.
- `failureStatus`: The `HealthStatus` that should be reported upon failure of the health check. If the provided value
is `null`, then `HealthStatus.Unhealthy` will be reported.
- `tags`: A list of tags that can be used for filtering health checks.

To be added.

## HealthCheckRegistration.HealthCheckRegistration(String, IHealthCheck>, HealthStatus>, String>) constructor

```csharp
public HealthCheckRegistration (string name, Func<IServiceProvider,Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck> factory, Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus? failureStatus, System.Collections.Generic.IEnumerable<string>? tags);
```

Creates a new `HealthCheckRegistration` for an existing `IHealthCheck` instance.

Parameters:

- `name`: The health check name.
- `factory`: A delegate used to create the `IHealthCheck` instance.
- `failureStatus`: The `HealthStatus` that should be reported when the health check reports a failure. If the provided value
is `null`, then `HealthStatus.Unhealthy` will be reported.
- `tags`: A list of tags that can be used for filtering health checks.

To be added.

## HealthCheckRegistration.HealthCheckRegistration(String, IHealthCheck, HealthStatus>, String>, TimeSpan>) constructor

```csharp
public HealthCheckRegistration (string name, Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck instance, Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus? failureStatus, System.Collections.Generic.IEnumerable<string>? tags, TimeSpan? timeout);
```

Creates a new `HealthCheckRegistration` for an existing `IHealthCheck` instance.

Parameters:

- `name`: The health check name.
- `instance`: The `IHealthCheck` instance.
- `failureStatus`: The `HealthStatus` that should be reported upon failure of the health check. If the provided value
is `null`, then `HealthStatus.Unhealthy` will be reported.
- `tags`: A list of tags that can be used for filtering health checks.
- `timeout`: An optional `TimeSpan` representing the timeout of the check.

To be added.

## HealthCheckRegistration.HealthCheckRegistration(String, IHealthCheck>, HealthStatus>, String>, TimeSpan>) constructor

```csharp
public HealthCheckRegistration (string name, Func<IServiceProvider,Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck> factory, Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus? failureStatus, System.Collections.Generic.IEnumerable<string>? tags, TimeSpan? timeout);
```

Creates a new `HealthCheckRegistration` for an existing `IHealthCheck` instance.

Parameters:

- `name`: The health check name.
- `factory`: A delegate used to create the `IHealthCheck` instance.
- `failureStatus`: The `HealthStatus` that should be reported when the health check reports a failure. If the provided value
is `null`, then `HealthStatus.Unhealthy` will be reported.
- `tags`: A list of tags that can be used for filtering health checks.
- `timeout`: An optional `TimeSpan` representing the timeout of the check.

To be added.

## HealthCheckRegistration.Delay property

```csharp
public TimeSpan? Delay { get; set; }
```

Gets or sets the individual delay applied to the health check after the application starts before executing
`IHealthCheckPublisher` instances. The delay is applied once at startup, and does
not apply to subsequent iterations.

Returns: To be added.

To be added.

## HealthCheckRegistration.Factory property

```csharp
public Func<IServiceProvider,Microsoft.Extensions.Diagnostics.HealthChecks.IHealthCheck> Factory { get; set; }
```

Gets or sets a delegate used to create the `IHealthCheck` instance.

Returns: To be added.

To be added.

## HealthCheckRegistration.FailureStatus property

```csharp
public Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus FailureStatus { get; set; }
```

Gets or sets the `HealthStatus` that should be reported upon failure of the health check.

Returns: To be added.

To be added.

## HealthCheckRegistration.Name property

```csharp
public string Name { get; set; }
```

Gets or sets the health check name.

Returns: To be added.

To be added.

## HealthCheckRegistration.Period property

```csharp
public TimeSpan? Period { get; set; }
```

Gets or sets the individual period used for the check.

Returns: To be added.

To be added.

## HealthCheckRegistration.Tags property

```csharp
public System.Collections.Generic.ISet<string> Tags { get; }
```

Gets a list of tags that can be used for filtering health checks.

Returns: To be added.

To be added.

## HealthCheckRegistration.Timeout property

```csharp
public TimeSpan Timeout { get; set; }
```

Gets or sets the timeout used for the test.

Returns: To be added.

To be added.
