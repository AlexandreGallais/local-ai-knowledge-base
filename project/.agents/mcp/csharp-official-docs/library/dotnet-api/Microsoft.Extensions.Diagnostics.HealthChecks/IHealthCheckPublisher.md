---
title: "IHealthCheckPublisher interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Diagnostics.HealthChecks/IHealthCheckPublisher.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IHealthCheckPublisher interface

Namespace: `Microsoft.Extensions.Diagnostics.HealthChecks`

```csharp
public interface IHealthCheckPublisher
```

Represents a publisher of `HealthReport` information.

The default health checks implementation provided an `IHostedService` implementation that can
be used to execute health checks at regular intervals and provide the resulting `HealthReport`
data to all registered `IHealthCheckPublisher` instances.

To provide an `IHealthCheckPublisher` implementation, register an instance or type as a singleton
service in the dependency injection container.

`IHealthCheckPublisher` instances are provided with a `HealthReport` after executing
health checks in a background thread. The use of `IHealthCheckPublisher` depend on hosting in
an application using `IWebHost` or generic host (`IHost`). Execution of `IHealthCheckPublisher`
instance is not related to execution of health checks via a middleware.

## IHealthCheckPublisher.PublishAsync(HealthReport, CancellationToken) method

```csharp
public System.Threading.Tasks.Task PublishAsync (Microsoft.Extensions.Diagnostics.HealthChecks.HealthReport report, System.Threading.CancellationToken <example-value>);
```

Publishes the provided `report`.

Parameters:

- `report`: The `HealthReport`. The result of executing a set of health checks.
- `cancellationToken`: The `CancellationToken`.

Returns: A `Task` which will complete when publishing is complete.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
