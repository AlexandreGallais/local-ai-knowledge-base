---
title: "Background tasks with hosted services in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/host/hosted-services.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Background tasks with hosted services in ASP.NET Core

By Jeow Li Huan

-->
-->

In ASP.NET Core, background tasks can be implemented as *hosted services*. A hosted service is a class with background task logic that implements the `Microsoft.Extensions.Hosting.IHostedService` interface. Hosted services can be used in Worker Service apps and in web apps. This article provides three hosted service examples:

* Background task that runs on a timer.
* Hosted service that activates a scoped service. The scoped service can use dependency injection (DI).
* Queued background tasks that run sequentially.

## Worker Service template

The ASP.NET Core Worker Service template provides a starting point for writing long running service apps. An app created from the Worker Service template specifies the Worker SDK in its project file:

```xml
<Project Sdk="Microsoft.NET.Sdk.Worker">
```

To use the template as a basis for a hosted services app:

# Visual Studio

1. Create a new project.
1. Select **Worker Service**. Select **Next**.
1. Provide a project name in the **Project name** field or accept the default project name. Select **Next**.
1. In the **Additional information** dialog, Choose a **Framework**. Select **Create**.

# .NET CLI

Use the Worker Service (`worker`) template with the dotnet new command from a command shell. In the following example, a Worker Service app is created named `ContosoWorker`. A folder for the `ContosoWorker` app is created automatically when the command is executed.

```dotnetcli
dotnet new worker -o ContosoWorker
```

---

## Package

An app based on the Worker Service template uses the `Microsoft.NET.Sdk.Worker` SDK and has an explicit package reference to the `Microsoft.Extensions.Hosting` NuGet package. For example, see the Worker Service sample app's project file (`BackgroundTasksSample.csproj`).

For web apps that use the `Microsoft.NET.Sdk.Web` SDK, the `Microsoft.Extensions.Hosting` NuGet package is referenced implicitly from the shared framework. An explicit package reference in the app's project file isn't required.

## Hosted services in a web app

Hosted services aren't limited to Worker Service apps. A web app that uses the `Microsoft.NET.Sdk.Web` SDK registers hosted services in the `Program` file by calling the same `Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService*` extension method on `Microsoft.AspNetCore.Builder.WebApplicationBuilder.Services`. The host automatically starts and stops registered hosted services, as described in the `IHostedService` interface section.

The following `Program` file is from the web sample app (`BackgroundTasksWebSample`). It registers the three hosted services that are described in the rest of this article, maps a root endpoint that returns a status message, and adds an endpoint that queues a work item for one of them:

```csharp
using BackgroundTasksWebSample.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHostedService<TimedHostedService>();

builder.Services.AddHostedService<ConsumeScopedServiceHostedService>();
builder.Services.AddScoped<IScopedProcessingService, ScopedProcessingService>();

builder.Services.AddHostedService<QueuedHostedService>();
builder.Services.AddSingleton<IBackgroundTaskQueue>(_ =>
    new BackgroundTaskQueue(builder.Configuration.GetValue("QueueCapacity", 100)));

var app = builder.Build();

app.MapGet("/", () => "Hosted service is running in the background.");

app.MapPost("/queue", async (
    IBackgroundTaskQueue taskQueue,
    ILogger<Program> logger,
    CancellationToken <example-value>) =>
{
    await taskQueue.QueueBackgroundWorkItemAsync(async token =>
    {
        var guid = Guid.NewGuid();

        logger.LogInformation("Queued Background Task {Guid} is starting.", guid);

        try
        {
            await Task.Delay(TimeSpan.FromSeconds(5), token);
        }
        catch (OperationCanceledException)
        {
            logger.LogInformation("Queued Background Task {Guid} was cancelled.", guid);

            return;
        }

        logger.LogInformation("Queued Background Task {Guid} is complete.", guid);
    }, cancellationToken);

    return Results.Accepted();
});

app.Run();
```
In the preceding code:

* `TimedHostedService`, `ConsumeScopedServiceHostedService`, and `QueuedHostedService` are registered with the `Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService*` extension method.
* A hosted service is registered as a singleton, so it can't receive scoped services, such as an Entity Framework Core `DbContext`, by constructor injection. `IScopedProcessingService` is registered as a scoped service, and `ConsumeScopedServiceHostedService` creates a scope to resolve it. For more information, see the Consuming a scoped service in a background task section.
* The `IBackgroundTaskQueue` singleton is consumed by the `/queue` endpoint and `QueuedHostedService`. A `POST` request to `/queue` returns a `202 Accepted` response once the work item is enqueued without waiting for it to execute. If the bounded queue is full, the request waits until space is available to enqueue the work item. `QueuedHostedService` runs the queued work items in the background. For more information, see the Queued background tasks section.

The following service registration snippets are from the Worker Service sample app (`BackgroundTasksSample`), where `services` is the `Microsoft.Extensions.DependencyInjection.IServiceCollection` parameter passed to `ConfigureServices`. In a web app, use `builder.Services` instead of `services`.

## IHostedService interface

The `Microsoft.Extensions.Hosting.IHostedService` interface defines two methods for objects that are managed by the host:

* StartAsync(CancellationToken)
* StopAsync(CancellationToken)

### `StartAsync`

StartAsync(CancellationToken) contains the logic to start the background task. `StartAsync` is called *before*:

* The app's request processing pipeline is configured.
* The server is started and IApplicationLifetime.ApplicationStarted is triggered.

`StartAsync` should be limited to short running tasks because hosted services are run sequentially, and no further services are started until `StartAsync` runs to completion.

Hosted service instances start in the order that they're registered in the dependency injection container unless the app opts into concurrent startup by setting `Microsoft.Extensions.Hosting.HostOptions.ServicesStartConcurrently` to `true`:

```csharp
builder.Services.Configure<HostOptions>(options =>
{
    options.ServicesStartConcurrently = true;
});
```

### `StopAsync`

* StopAsync(CancellationToken) is triggered when the host is performing a graceful shutdown. `StopAsync` contains the logic to end the background task. Implement `System.IDisposable` and finalizers (destructors) to dispose of any unmanaged resources.

The cancellation token has a default 30 second timeout to indicate that the shutdown process should no longer be graceful. When cancellation is requested on the token:

* Any remaining background operations that the app is performing should be aborted.
* Any methods called in `StopAsync` should return promptly.

However, tasks aren't abandoned after cancellation is requested—the caller awaits all tasks to complete.

If the app shuts down unexpectedly (for example, the app's process fails), `StopAsync` might not be called. Therefore, any methods called or operations conducted in `StopAsync` might not occur.

To extend the default 30 second shutdown timeout, set:

* `Microsoft.Extensions.Hosting.HostOptions.ShutdownTimeout` when using Generic Host. For more information, see .NET Generic Host in ASP.NET Core.
* Shutdown timeout host configuration setting when using Web Host. For more information, see ASP.NET Core Web Host.

The hosted service is activated once at app startup and gracefully shut down at app shutdown. If an error is thrown during background task execution, `Dispose` should be called even if `StopAsync` isn't called.

Hosted service instances stop in the reverse order that they're registered in the dependency injection container unless the app opts into concurrent shutdown behavior by setting `Microsoft.Extensions.Hosting.HostOptions.ServicesStopConcurrently` to `true`:

```csharp
builder.Services.Configure<HostOptions>(options =>
{
    options.ServicesStopConcurrently = true;
});
```

## BackgroundService base class

`Microsoft.Extensions.Hosting.BackgroundService` is a base class for implementing a long running `Microsoft.Extensions.Hosting.IHostedService`.

ExecuteAsync(CancellationToken) is called on the thread pool to run the background service. The implementation returns a `System.Threading.Tasks.Task` that represents the entire lifetime of the background service. The host blocks in StopAsync(CancellationToken) waiting for `ExecuteAsync` to complete.

The cancellation token is triggered when IHostedService.StopAsync is called. Your implementation of `ExecuteAsync` should finish promptly when the cancellation token is fired in order to gracefully shut down the service. Otherwise, the service ungracefully shuts down at the shutdown timeout. For more information, see the IHostedService interface section.

For more information, see the BackgroundService source code.

## Timed background tasks

A timed background task makes use of the System.Threading.Timer class. The timer triggers the task's `DoWork` method. The timer is disabled on `StopAsync` and disposed when the service container is disposed on `Dispose`:

```csharp
public class TimedHostedService(ILogger<TimedHostedService> logger) : IHostedService, IDisposable
{
    private int executionCount = 0;
    private Timer? _timer = null;

    public Task StartAsync(CancellationToken <example-value>)
    {
        logger.LogInformation("Timed Hosted Service running.");

        _timer = new Timer(DoWork, null, TimeSpan.Zero,
            TimeSpan.FromSeconds(5));

        return Task.CompletedTask;
    }

    private void DoWork(object? state)
    {
        var count = Interlocked.Increment(ref executionCount);

        logger.LogInformation(
            "Timed Hosted Service is working. Count: {Count}", count);
    }

    public Task StopAsync(CancellationToken <example-value>)
    {
        logger.LogInformation("Timed Hosted Service is stopping.");

        _timer?.Change(Timeout.Infinite, 0);

        return Task.CompletedTask;
    }

    public void Dispose()
    {
        _timer?.Dispose();
    }
}
```
The `System.Threading.Timer` doesn't wait for previous executions of `DoWork` to finish, so the approach shown might not be suitable for every scenario. Interlocked.Increment is used to increment the execution counter as an atomic operation, which ensures that multiple threads don't update `executionCount` concurrently.

The service is registered in the `Program` file with the `Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService*` extension method:

```csharp
services.AddHostedService<TimedHostedService>();
```
## Consuming a scoped service in a background task

To use scoped services within a BackgroundService, create a scope. No scope is created for a hosted service by default.

The scoped background task service contains the background task's logic. In the following example:

* The service is asynchronous. The `DoWork` method returns a `Task`. For demonstration purposes, a delay of ten seconds is awaited in the `DoWork` method.
* An `Microsoft.Extensions.Logging.ILogger` is injected into the service.

```csharp
internal interface IScopedProcessingService
{
    Task DoWork(CancellationToken <example-value>);
}

internal class ScopedProcessingService(
    ILogger<ScopedProcessingService> logger) : IScopedProcessingService
{
    private int executionCount = 0;

    public async Task DoWork(CancellationToken <example-value>)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            executionCount++;

            logger.LogInformation(
                "Scoped Processing Service is working. Count: {Count}", executionCount);

            await Task.Delay(10000, stoppingToken);
        }
    }
}
```
The hosted service creates a scope to resolve the scoped background task service to call its `DoWork` method. `DoWork` returns a `Task`, which is awaited in `ExecuteAsync`:

```csharp
public class ConsumeScopedServiceHostedService(
    IServiceProvider services,
    ILogger<ConsumeScopedServiceHostedService> logger) : BackgroundService
{
    public IServiceProvider Services { get; } = services;

    protected override async Task ExecuteAsync(CancellationToken <example-value>)
    {
        logger.LogInformation(
            "Consume Scoped Service Hosted Service running.");

        await DoWork(stoppingToken);
    }

    private async Task DoWork(CancellationToken <example-value>)
    {
        logger.LogInformation(
            "Consume Scoped Service Hosted Service is working.");

        using (var scope = Services.CreateScope())
        {
            var scopedProcessingService =
                scope.ServiceProvider
                    .GetRequiredService<IScopedProcessingService>();

            await scopedProcessingService.DoWork(stoppingToken);
        }
    }

    public override async Task StopAsync(CancellationToken <example-value>)
    {
        logger.LogInformation(
            "Consume Scoped Service Hosted Service is stopping.");

        await base.StopAsync(stoppingToken);
    }
}
```
The services are registered in the `Program` file. The hosted service is registered with the `Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService*` extension method:

```csharp
services.AddHostedService<ConsumeScopedServiceHostedService>();
services.AddScoped<IScopedProcessingService, ScopedProcessingService>();
```
