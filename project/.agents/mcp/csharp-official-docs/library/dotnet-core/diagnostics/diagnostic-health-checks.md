---
title: "App health checks in C#"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/diagnostic-health-checks.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET app health checks in C\#

In a distributed system, health checks are periodic assessments of the status, availability, and performance of individual nodes or services. These checks ensure that the system functions correctly and efficiently. Health checks are essential for system reliability, and they are typically performed at regular intervals with the results analyzed for decision-making and corrective actions.

The following health check status results are possible:

- `Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus.Healthy`
- `Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus.Degraded`
- `Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus.Unhealthy`

In addition, health checks often report various diagnostic metrics. For more information, see Diagnostic Metrics: `Microsoft.Extensions.Diagnostics.HealthChecks`.

## Resource utilization health checks

To perform health checks on the resource utilization of your .NET apps, add a package reference to Microsoft.Extensions.Diagnostics.HealthChecks.ResourceUtilization. On an `Microsoft.Extensions.DependencyInjection.IServiceCollection` instance, chain a call from `Microsoft.Extensions.DependencyInjection.HealthCheckServiceCollectionExtensions.AddHealthChecks*` to `Microsoft.Extensions.DependencyInjection.ResourceUtilizationHealthCheckExtensions.AddResourceUtilizationHealthCheck*`. The following example demonstrates how to use the `AddResourceUtilizationHealthCheck` extension method to add a resource utilization health check to an `IServiceCollection` instance:

```csharp
﻿using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddHealthChecks()
    .AddResourceUtilizationHealthCheck();

var app = builder.Build();

var healthCheckService = app.Services.GetRequiredService<HealthCheckService>();

var result = await healthCheckService.CheckHealthAsync();

Console.WriteLine($"{result.Status} {result.TotalDuration}");

app.Run();
```
The preceding code:

- Creates a new `Microsoft.Extensions.Hosting.HostApplicationBuilder` instance.
- Adds a health check for resource utilization by chaining a call from the `Microsoft.Extensions.DependencyInjection.HealthCheckServiceCollectionExtensions.AddHealthChecks*` call to the `Microsoft.Extensions.DependencyInjection.ResourceUtilizationHealthCheckExtensions.AddResourceUtilizationHealthCheck*` extension method.
- Builds the `Microsoft.Extensions.Hosting.IHost` instance as the `app` variable.
- Gets an instance of the `Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckService` class from the service provider.
- Performs a health check and displays the result.
- Runs the application.

## Application lifetime health checks

To perform health checks on the application lifetime events of `Microsoft.Extensions.Hosting.IHostApplicationLifetime`, use the `Microsoft.Extensions.DependencyInjection.CommonHealthChecksExtensions.AddApplicationLifecycleHealthCheck*` extension method available in the Microsoft.Extensions.Diagnostics.HealthChecks.Common NuGet package.

This provider will indicate that the application is healthy only when it is fully active. Until the lifetime object indicates the application has started, the provider will report the application as not healthy. When the application starts shutting down, the provider will report the application as unhealthy.

The library exposes a `Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckService` enabling consumers to request a health check at any time. Consider the following `ExampleService` implementation:

```csharp
﻿using System.Runtime.CompilerServices;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

internal class ExampleLifecycle(
    HealthCheckService healthCheckService,
    ILogger<ExampleLifecycle> logger) : IHostedLifecycleService
{
    Task IHostedService.StartAsync(
        CancellationToken <example-value>) =>
        CheckHealthAsync(cancellationToken: <example-value>);

    Task IHostedLifecycleService.StartedAsync(
        CancellationToken <example-value>) =>
        CheckHealthAsync(cancellationToken: <example-value>);

    Task IHostedLifecycleService.StartingAsync(
        CancellationToken <example-value>) =>
        CheckHealthAsync(cancellationToken: <example-value>);

    Task IHostedService.StopAsync(
        CancellationToken <example-value>) =>
        CheckHealthAsync(cancellationToken: <example-value>);

    Task IHostedLifecycleService.StoppedAsync(
        CancellationToken <example-value>) =>
        CheckHealthAsync(cancellationToken: <example-value>);

    Task IHostedLifecycleService.StoppingAsync(
        CancellationToken <example-value>) =>
        CheckHealthAsync(cancellationToken: <example-value>);

    public Task ReadyAsync() => CheckHealthAsync();

    private async Task CheckHealthAsync(
         [CallerMemberName] string eventName = "",
         CancellationToken <example-value> = default)
    {
        HealthReport result =
            await healthCheckService.CheckHealthAsync(cancellationToken);

        logger.LogInformation(
            "{EventName}: {Status}", eventName, result.Status);
    }
}
```
The preceding code:

- Defines a new `ExampleLifecycle` class that implements the `Microsoft.Extensions.Hosting.IHostedService` interface.
- Defines a primary constructor accepting the following parameters:
  - An instance of the `Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckService` class.
  - An instance of the `Microsoft.Extensions.Logging.ILogger`1` class.
- Implements the `Microsoft.Extensions.Hosting.IHostedLifecycleService` interface, with each method invoking the `CheckHealthAsync` method.
- Defines a `ReadyAsync` method that invokes the `CheckHealthAsync` method.
- Defines a custom `CheckHealthAsync` method that captures the caller name and cancellation token, then requests a health check from the `HealthCheckService` instance. The `result` is then logged.

The only time that the health check service will report a status of `Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus.Healthy` is after the app has started and before stopping is called. Please consider the following _Program.cs_:

```csharp
﻿using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);

var healthChecksBuilder = builder.Services
    .AddHostedService<ExampleLifecycle>()
    .AddHealthChecks()
    .AddApplicationLifecycleHealthCheck();

// You could use the healthChecksBuilder instance to add more checks...

var app = builder.Build();

var services = app.Services.GetRequiredService<IEnumerable<IHostedService>>();

await Task.WhenAll(DelayAndReportAsync(services), app.RunAsync());

static async Task DelayAndReportAsync(IEnumerable<IHostedService> services)
{
    // Ensure app started...
    await Task.Delay(500);

    var service = services.FirstOrDefault(static s => s is ExampleLifecycle);
    if (service is ExampleLifecycle example)
    {
        await example.ReadyAsync();
    }
}
```
The preceding code:

- Creates a new `Microsoft.Extensions.Hosting.HostApplicationBuilder` instance assigning to as the `builder` variable.
- Registers the `ExampleService` as the app's only `Microsoft.Extensions.Hosting.IHostedService`.
- Adds a health check for the application lifetime events of `Microsoft.Extensions.Hosting.IHostApplicationLifetime` by chaining a call from the `Microsoft.Extensions.DependencyInjection.IHealthChecksBuilder` instance returned by the `Microsoft.Extensions.DependencyInjection.HealthCheckServiceCollectionExtensions.AddHealthChecks*` call to the `Microsoft.Extensions.DependencyInjection.CommonHealthChecksExtensions.AddApplicationLifecycleHealthCheck*` extension method.
  - The `healthChecksBuilder` instance can be used to add more health checks.
- Builds the `Microsoft.Extensions.Hosting.IHost` instance as the `app` variable.
- Gets an `IHostedService` from the service provider, this is the `ExampleService` instance.
- Calls `System.Threading.Tasks.Task.WhenAll*` given two task references:
  - The `DelayAndReportAsync` method, which delays for 500 milliseconds and then invokes the `ReadyAsync` method on the `ExampleService` instance, will evaluate the health check.
  - The `Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.RunAsync(Microsoft.Extensions.Hosting.IHost,System.Threading.CancellationToken)` method, starts the `app`.

The app outputs logs in the following order, reporting the health check status as it relates to the lifecycle events:

1. `StartingAsync`: Unhealthy
1. `StartAsync`: Unhealthy
1. `StartedAsync`: Unhealthy
1. `ReadyAsync`: Healthy
1. `StoppingAsync`: Unhealthy
1. `StopAsync`: Unhealthy
1. `StoppedAsync`: Unhealthy

In other words, this provider ensures that the application instance only receives traffic when it's ready. If you're developing web apps with ASP.NET Core, there's health checks middleware available. For more information, Health checks in ASP.NET Core.

## See also

- .NET extensions metrics
