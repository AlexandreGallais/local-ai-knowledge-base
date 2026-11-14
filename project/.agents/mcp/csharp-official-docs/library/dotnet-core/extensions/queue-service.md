---
title: "Create a Queue Service"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/queue-service.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Create a queue service

A queue service is a great example of a long-running service, where work items can be queued and worked on sequentially as previous work items are completed. Relying on the Worker Service template, you build out new functionality on top of the `Microsoft.Extensions.Hosting.BackgroundService`.

In this tutorial, you learn how to:

>
> - Create a queue service.
> - Delegate work to a task queue.
> - Register a console key-listener from `Microsoft.Extensions.Hosting.IHostApplicationLifetime` events.

> **Tip:**
> All of the "Workers in .NET" example source code is available in the **Samples Browser** for download. For more information, see Browse code samples: Workers in .NET.

## Prerequisites

- The .NET 8.0 SDK or later
- A .NET integrated development environment (IDE)
  - Feel free to use Visual Studio

## Create a new project

To create a new Worker Service project with Visual Studio, you'd select **File** > **New** > **Project...**. From the **Create a new project** dialog search for "Worker Service", and select Worker Service template. If you'd rather use the .NET CLI, open your favorite terminal in a working directory. Run the `dotnet new` command, and replace the `<Project.Name>` with your desired project name.

```dotnetcli
dotnet new worker --name <Project.Name>
```

For more information on the .NET CLI new worker service project command, see dotnet new worker.

> **Tip:**
> If you're using Visual Studio Code, you can run .NET CLI commands from the integrated terminal. For more information, see Visual Studio Code: Integrated Terminal.

## Create queuing services

You may be familiar with the `System.Web.Hosting.HostingEnvironment.QueueBackgroundWorkItem(System.Func{System.Threading.CancellationToken,System.Threading.Tasks.Task})` functionality from the `System.Web.Hosting` namespace.

> **Tip:**
> The functionality of the `System.Web` namespace was intentionally not ported over to .NET, and remains exclusive to .NET Framework. For more information, see Get started with incremental ASP.NET to ASP.NET Core migration.

In .NET, to model a service that is inspired by the `QueueBackgroundWorkItem` functionality, start by adding an `IBackgroundTaskQueue` interface to the project:

```csharp
﻿namespace App.QueueService;

public interface IBackgroundTaskQueue
{
    ValueTask QueueBackgroundWorkItemAsync(
        Func<CancellationToken, ValueTask> workItem);

    ValueTask<Func<CancellationToken, ValueTask>> DequeueAsync(
        CancellationToken <example-value>);
}
```
There are two methods, one that exposes queuing functionality, and another that dequeues previously queued work items. A *work item* is a `Func<CancellationToken, ValueTask>`. Next, add the default implementation to the project.

```csharp
﻿using System.Threading.Channels;

namespace App.QueueService;

public sealed class DefaultBackgroundTaskQueue : IBackgroundTaskQueue
{
    private readonly Channel<Func<CancellationToken, ValueTask>> _queue;

    public DefaultBackgroundTaskQueue(int capacity)
    {
        BoundedChannelOptions options = new(capacity)
        {
            FullMode = BoundedChannelFullMode.Wait
        };
        _queue = Channel.CreateBounded<Func<CancellationToken, ValueTask>>(options);
    }

    public async ValueTask QueueBackgroundWorkItemAsync(
        Func<CancellationToken, ValueTask> workItem)
    {
        ArgumentNullException.ThrowIfNull(workItem);

        await _queue.Writer.WriteAsync(workItem);
    }

    public async ValueTask<Func<CancellationToken, ValueTask>> DequeueAsync(
        CancellationToken <example-value>)
    {
        Func<CancellationToken, ValueTask>? workItem =
            await _queue.Reader.ReadAsync(cancellationToken);

        return workItem;
    }
}
```
The preceding implementation relies on a `System.Threading.Channels.Channel`1` as a queue. The `System.Threading.Channels.BoundedChannelOptions.#ctor(System.Int32)` is called with an explicit capacity. Capacity should be set based on the expected application load and number of concurrent threads accessing the queue. `System.Threading.Channels.BoundedChannelFullMode.Wait` causes calls to `System.Threading.Channels.ChannelWriter`1.WriteAsync*` to return a task, which completes only when space becomes available. Which leads to backpressure, in case too many publishers/calls start accumulating.

## Rewrite the Worker class

In the following `QueueHostedService` example:

- The `ProcessTaskQueueAsync` method returns a `System.Threading.Tasks.Task` in `ExecuteAsync`.
- Background tasks in the queue are dequeued and executed in `ProcessTaskQueueAsync`.
- Work items are awaited before the service stops in `StopAsync`.

Replace the existing `Worker` class with the following C# code, and rename the file to *QueueHostedService.cs*.

```csharp
﻿namespace App.QueueService;

public sealed class QueuedHostedService(
        IBackgroundTaskQueue taskQueue,
        ILogger<QueuedHostedService> logger) : BackgroundService
{
    protected override Task ExecuteAsync(CancellationToken <example-value>)
    {
        logger.LogInformation("""
            {Name} is running.
            Tap W to add a work item to the 
            background queue.
            """,
            nameof(QueuedHostedService));

        return ProcessTaskQueueAsync(stoppingToken);
    }

    private async Task ProcessTaskQueueAsync(CancellationToken <example-value>)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                Func<CancellationToken, ValueTask>? workItem =
                    await taskQueue.DequeueAsync(stoppingToken);

                await workItem(stoppingToken);
            }
            catch (OperationCanceledException)
            {
                // Prevent throwing if stoppingToken was signaled
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error occurred executing task work item.");
            }
        }
    }

    public override async Task StopAsync(CancellationToken <example-value>)
    {
        logger.LogInformation(
            $"{nameof(QueuedHostedService)} is stopping.");

        await base.StopAsync(stoppingToken);
    }
}
```
A `MonitorLoop` service handles enqueuing tasks for the hosted service whenever the `w` key is selected on an input device:

- The `IBackgroundTaskQueue` is injected into the `MonitorLoop` service.
- `IBackgroundTaskQueue.QueueBackgroundWorkItemAsync` is called to enqueue a work item.
- The work item simulates a long-running background task:
  - Three 5-second delays are executed `System.Threading.Tasks.Task.Delay*`.
  - A `try-catch` statement traps `System.OperationCanceledException` if the task is canceled.

```csharp
﻿namespace App.QueueService;

public sealed class MonitorLoop(
    IBackgroundTaskQueue taskQueue,
    ILogger<MonitorLoop> logger,
    IHostApplicationLifetime applicationLifetime)
{
    private readonly CancellationToken <example-value> = applicationLifetime.ApplicationStopping;

    public void StartMonitorLoop()
    {
        logger.LogInformation($"{nameof(MonitorAsync)} loop is starting.");

        // Run a console user input loop in a background thread
        Task.Run(async () => await MonitorAsync());
    }

    private async ValueTask MonitorAsync()
    {
        while (!_cancellationToken.IsCancellationRequested)
        {
            var keyStroke = Console.ReadKey();
            if (keyStroke.Key == ConsoleKey.W)
            {
                // Enqueue a background work item
                await taskQueue.QueueBackgroundWorkItemAsync(BuildWorkItemAsync);
            }
        }
    }

    private async ValueTask BuildWorkItemAsync(CancellationToken token)
    {
        // Simulate three 5-second tasks to complete
        // for each enqueued work item

        int delayLoop = 0;
        var guid = Guid.NewGuid();

        logger.LogInformation("Queued work item {Guid} is starting.", guid);

        while (!token.IsCancellationRequested && delayLoop < 3)
        {
            try
            {
                await Task.Delay(TimeSpan.FromSeconds(5), token);
            }
            catch (OperationCanceledException)
            {
                // Prevent throwing if the Delay is cancelled
            }

            ++ delayLoop;

            logger.LogInformation("Queued work item {Guid} is running. {DelayLoop}/3", guid, delayLoop);
        }

        if (delayLoop is 3)
        {
            logger.LogInformation("Queued Background Task {Guid} is complete.", guid);
        }
        else
        {
            logger.LogInformation("Queued Background Task {Guid} was cancelled.", guid);
        }
    }
}
```
Replace the existing `Program` contents with the following C# code:

```csharp
﻿using App.QueueService;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Services.AddSingleton<MonitorLoop>();
builder.Services.AddHostedService<QueuedHostedService>();
builder.Services.AddSingleton<IBackgroundTaskQueue>(_ => 
{
    if (!int.TryParse(builder.Configuration["QueueCapacity"], out var queueCapacity))
    {
        queueCapacity = 100;
    }

    return new DefaultBackgroundTaskQueue(queueCapacity);
});

IHost host = builder.Build();

MonitorLoop monitorLoop = host.Services.GetRequiredService<MonitorLoop>()!;
monitorLoop.StartMonitorLoop();

host.Run();
```
The services are registered in (*Program.cs*). The hosted service is registered with the `AddHostedService` extension method. `MonitorLoop` is started in *Program.cs* top-level statement:

```csharp
MonitorLoop monitorLoop = host.Services.GetRequiredService<MonitorLoop>()!;
monitorLoop.StartMonitorLoop();
```
For more information on registering services, see Dependency injection in .NET.

## Verify service functionality

To run the application from Visual Studio, select `F5` or select the **Debug** > **Start Debugging** menu option. If you're using the .NET CLI, run the `dotnet run` command from the working directory:

```dotnetcli
dotnet run
```

For more information on the .NET CLI run command, see dotnet run.

When prompted enter the `w` (or `W`) at least once to queue an emulated work item, as shown in the example output:

```output
info: App.QueueService.MonitorLoop[0]
      MonitorAsync loop is starting.
info: App.QueueService.QueuedHostedService[0]
      QueuedHostedService is running.

      Tap W to add a work item to the background queue.

info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: .\queue-service
winfo: App.QueueService.MonitorLoop[0]
      Queued work item 8453f845-ea4a-4bcb-b26e-c76c0d89303e is starting.
info: App.QueueService.MonitorLoop[0]
      Queued work item 8453f845-ea4a-4bcb-b26e-c76c0d89303e is running. 1/3
info: App.QueueService.MonitorLoop[0]
      Queued work item 8453f845-ea4a-4bcb-b26e-c76c0d89303e is running. 2/3
info: App.QueueService.MonitorLoop[0]
      Queued work item 8453f845-ea4a-4bcb-b26e-c76c0d89303e is running. 3/3
info: App.QueueService.MonitorLoop[0]
      Queued Background Task 8453f845-ea4a-4bcb-b26e-c76c0d89303e is complete.
info: Microsoft.Hosting.Lifetime[0]
      Application is shutting down...
info: App.QueueService.QueuedHostedService[0]
      QueuedHostedService is stopping.
```

If running the application from within Visual Studio, select **Debug** > **Stop Debugging...**. Alternatively, select `Ctrl` + `C` from the console window to signal cancellation.

## See also

- Worker Services in .NET
- Use scoped services within a `BackgroundService`
- Create a Windows Service using `BackgroundService`
- Implement the `IHostedService` interface
- Web-Queue-Worker architectural style
