---
title: "HealthCheckPublisherOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.HealthChecks/HealthCheckPublisherOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HealthCheckPublisherOptions class

Namespace: `Microsoft.Extensions.Diagnostics.HealthChecks`

```csharp
public sealed class HealthCheckPublisherOptions
```

Options for the default service that executes `IHealthCheckPublisher` instances.

To be added.

## HealthCheckPublisherOptions.HealthCheckPublisherOptions() constructor

```csharp
public HealthCheckPublisherOptions ();
```

Creates a new instance of `HealthCheckPublisherOptions`.

To be added.

## HealthCheckPublisherOptions.Delay property

```csharp
public TimeSpan Delay { get; set; }
```

Gets or sets the initial delay applied after the application starts before executing
`IHealthCheckPublisher` instances. The delay is applied once at startup, and does
not apply to subsequent iterations. The default value is 5 seconds.

Returns: To be added.

To be added.

## HealthCheckPublisherOptions.Period property

```csharp
public TimeSpan Period { get; set; }
```

Gets or sets the period of `IHealthCheckPublisher` execution. The default value is
30 seconds.

Returns: To be added.

The `HealthCheckPublisherOptions.Period` cannot be set to a value lower than 1 second.

## HealthCheckPublisherOptions.Predicate property

```csharp
public Func<Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckRegistration,bool>? Predicate { get; set; }
```

Gets or sets a predicate that is used to filter the set of health checks executed.

Returns: To be added.

If `HealthCheckPublisherOptions.Predicate` is `null`, the health check publisher service will run all
registered health checks - this is the default behavior. To run a subset of health checks,
provide a function that filters the set of checks. The predicate will be evaluated each period.

## HealthCheckPublisherOptions.Timeout property

```csharp
public TimeSpan Timeout { get; set; }
```

Gets or sets the timeout for executing the health checks an all `IHealthCheckPublisher`
instances. Use `Timeout.InfiniteTimeSpan` to execute with no timeout.
The default value is 30 seconds.

Returns: To be added.

To be added.
