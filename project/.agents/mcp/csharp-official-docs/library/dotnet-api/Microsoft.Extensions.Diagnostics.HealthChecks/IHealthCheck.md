---
title: "IHealthCheck interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.HealthChecks/IHealthCheck.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IHealthCheck interface

Namespace: `Microsoft.Extensions.Diagnostics.HealthChecks`

```csharp
public interface IHealthCheck
```

Represents a health check, which can be used to check the status of a component in the application, such as a backend service, database or some internal
state.

To be added.

## IHealthCheck.CheckHealthAsync(HealthCheckContext, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult> CheckHealthAsync (Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckContext context, System.Threading.CancellationToken <example-value> = default);
```

Runs the health check, returning the status of the component being checked.

Parameters:

- `context`: A context object associated with the current execution.
- `cancellationToken`: A `CancellationToken` that can be used to cancel the health check.

Returns: A `Task<T>` that completes when the health check has finished, yielding the status of the component being checked.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
