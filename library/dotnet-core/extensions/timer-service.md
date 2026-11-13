---
title: "Implement the IHostedService interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/timer-service.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Implement the `IHostedService` interface

When you need finite control beyond the provided `Microsoft.Extensions.Hosting.BackgroundService`, you can implement your own `Microsoft.Extensions.Hosting.IHostedService`. The `Microsoft.Extensions.Hosting.IHostedService` interface is the basis for all long running services in .NET. Custom implementations are registered with the `Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)` extension method.

In this tutorial, you learn how to:

>
> - Implement the `Microsoft.Extensions.Hosting.IHostedService`, and `System.IAsyncDisposable` interfaces.
> - Create a timer-based service.
> - Register the custom implementation with dependency injection and logging.

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

## Create timer service

The timer-based background service makes use of the `System.Threading.Timer` class. The timer triggers the `DoWork` method. The timer is disabled on `Microsoft.Extensions.Hosting.IHostLifetime.StopAsync(System.Threading.CancellationToken)` and disposed when the service container is disposed on `System.IAsyncDisposable.DisposeAsync`:

Replace the contents of the `Worker` from the template with the following C# code, and rename the file to *TimerService.cs*:

```csharp
﻿namespace App.TimerHostedService;

public sealed class TimerService(ILogger<TimerService> logger) : IHostedService, IAsyncDisposable
{
    private readonly Task _completedTask = Task.CompletedTask;
    private int _executionCount = 0;
    private Timer? _timer;

    public Task StartAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("{Service} is running.", nameof(TimerHostedService));
        _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(5));

        return _completedTask;
    }

    private void DoWork(object? state)
    {
        int count = Interlocked.Increment(ref _executionCount);

        logger.LogInformation(
            "{Service} is working, execution count: {Count:#,0}",
            nameof(TimerHostedService),
            count);
    }

    public Task StopAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation(
            "{Service} is stopping.", nameof(TimerHostedService));

        _timer?.Change(Timeout.Infinite, 0);

        return _completedTask;
    }

    public async ValueTask DisposeAsync()
    {
        if (_timer is IAsyncDisposable timer)
        {
            await timer.DisposeAsync();
        }

        _timer = null;
    }
}
```
> **Important:**
> The `Worker` was a subclass of `Microsoft.Extensions.Hosting.BackgroundService`. Now, the `TimerService` implements both the `Microsoft.Extensions.Hosting.IHostedService`, and `System.IAsyncDisposable` interfaces.

The `TimerService` is `sealed`, and cascades the `DisposeAsync` call from its `_timer` instance. For more information on the "cascading dispose pattern", see Implement a `DisposeAsync` method.

When `Microsoft.Extensions.Hosting.IHostedService.StartAsync*` is called, the timer is instantiated, thus starting the timer.

> **Tip:**
> The `System.Threading.Timer` doesn't wait for previous executions of `DoWork` to finish, so the approach shown might not be suitable for every scenario. `System.Threading.Interlocked.Increment*` is used to increment the execution counter as an atomic operation, which ensures that multiple threads don't update `_executionCount` concurrently.

Replace the existing `Program` contents with the following C# code:

```csharp
﻿using App.TimerHostedService;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHostedService<TimerService>();

IHost host = builder.Build();
host.Run();
```
The service is registered in (*Program.cs*) with the `AddHostedService` extension method. This is the same extension method you use when registering `Microsoft.Extensions.Hosting.BackgroundService` subclasses, as they both implement the `Microsoft.Extensions.Hosting.IHostedService` interface.

For more information on registering services, see Dependency injection in .NET.

## Verify service functionality

To run the application from Visual Studio, select `F5` or select the **Debug** > **Start Debugging** menu option. If you're using the .NET CLI, run the `dotnet run` command from the working directory:

```dotnetcli
dotnet run
```

For more information on the .NET CLI run command, see dotnet run.

Let the application run for a bit to generate several execution count increments. You will see output similar to the following:

```output
info: App.TimerHostedService.TimerService[0]
      TimerHostedService is running.
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: .\timer-service
info: App.TimerHostedService.TimerService[0]
      TimerHostedService is working, execution count: 1
info: App.TimerHostedService.TimerService[0]
      TimerHostedService is working, execution count: 2
info: App.TimerHostedService.TimerService[0]
      TimerHostedService is working, execution count: 3
info: App.TimerHostedService.TimerService[0]
      TimerHostedService is working, execution count: 4
info: Microsoft.Hosting.Lifetime[0]
      Application is shutting down...
info: App.TimerHostedService.TimerService[0]
      TimerHostedService is stopping.
```

If running the application from within Visual Studio, select **Debug** > **Stop Debugging...**. Alternatively, select `Ctrl` + `C` from the console window to signal cancellation.

## See also

There are several related tutorials to consider:

- Worker Services in .NET
- Create a Queue Service
- Use scoped services within a `BackgroundService`
- Create a Windows Service using `BackgroundService`
