---
title: "HealthCheckService class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.HealthChecks/HealthCheckService.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HealthCheckService class

Namespace: `Microsoft.Extensions.Diagnostics.HealthChecks`

```csharp
public abstract class HealthCheckService
```

A service which can be used to check the status of `IHealthCheck` instances
registered in the application.

The default implementation of `HealthCheckService` is registered in the dependency
injection container as a singleton service by calling
`HealthCheckServiceCollectionExtensions.AddHealthChecks`.

The `IHealthChecksBuilder` returned by
`HealthCheckServiceCollectionExtensions.AddHealthChecks`
provides a convenience API for registering health checks.

`IHealthCheck` implementations can be registered through extension methods provided by
`IHealthChecksBuilder`.

## HealthCheckService.HealthCheckService() constructor

```csharp
protected HealthCheckService ();
```

To be added.

To be added.

## HealthCheckService.CheckHealthAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task<Microsoft.Extensions.Diagnostics.HealthChecks.HealthReport> CheckHealthAsync (System.Threading.CancellationToken <example-value> = default);
```

Runs all the health checks in the application and returns the aggregated status.

Parameters:

- `cancellationToken`: A `CancellationToken` which can be used to cancel the health checks.

Returns: A `Task<T>` which will complete when all the health checks have been run,
yielding a `HealthReport` containing the results.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HealthCheckService.CheckHealthAsync(Boolean>, CancellationToken) method

```csharp
public abstract System.Threading.Tasks.Task<Microsoft.Extensions.Diagnostics.HealthChecks.HealthReport> CheckHealthAsync (Func<Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckRegistration,bool>? predicate, System.Threading.CancellationToken <example-value> = default);
```

Runs the provided health checks and returns the aggregated status

Parameters:

- `predicate`: A predicate that can be used to include health checks based on user-defined criteria.
- `cancellationToken`: A `CancellationToken` which can be used to cancel the health checks.

Returns: A `Task<T>` which will complete when all the health checks have been run,
yielding a `HealthReport` containing the results.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
