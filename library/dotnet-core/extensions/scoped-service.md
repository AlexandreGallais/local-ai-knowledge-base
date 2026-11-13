---
title: "Use scoped services within a BackgroundService"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/scoped-service.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Use scoped services within a `BackgroundService`

When you register implementations of `Microsoft.Extensions.Hosting.IHostedService` using any of the `Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService*` extension methods, the service is registered as a singleton. There might be scenarios where you'd like to rely on a scoped service. For more information, see Service lifetimes.

In this tutorial, you learn how to:

>
> - Correctly resolve scoped dependencies in a singleton `Microsoft.Extensions.Hosting.BackgroundService`.
> - Delegate work to a scoped service.
> - Implement an `override` of `Microsoft.Extensions.Hosting.BackgroundService.StopAsync(System.Threading.CancellationToken)`.

> **Tip:**
> All of the "Workers in .NET" example source code is available in the **Samples Browser** for download. For more information, see Browse code samples: Workers in .NET.

## Prerequisites

- The .NET 8.0 SDK or later
- A .NET integrated development environment (IDE), for example, Visual Studio

## Create a new project

To create a new Worker Service project with Visual Studio, you'd select **File** > **New** > **Project...**. From the **Create a new project** dialog search for "Worker Service", and select Worker Service template. If you'd rather use the .NET CLI, open your favorite terminal in a working directory. Run the `dotnet new` command, and replace the `<Project.Name>` with your desired project name.

```dotnetcli
dotnet new worker --name <Project.Name>
```

For more information on the .NET CLI new worker service project command, see dotnet new worker.

> **Tip:**
> If you're using Visual Studio Code, you can run .NET CLI commands from the integrated terminal. For more information, see Visual Studio Code: Integrated Terminal.

## Create scoped services

To use scoped services within a `BackgroundService`, create an async scope with the `Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.CreateAsyncScope*` API. No scope is created for a hosted service by default. The scoped background service contains the background task's logic.

```csharp
﻿namespace App.ScopedService;

public interface IScopedProcessingService
{
    Task DoWorkAsync(CancellationToken stoppingToken);
}
```
The preceding interface defines a single `DoWorkAsync` method. Create an implementation in a new class named *DefaultScopedProcessingService.cs*:

```csharp
﻿namespace App.ScopedService;

public sealed class DefaultScopedProcessingService(
    ILogger<DefaultScopedProcessingService> logger) : IScopedProcessingService
{
    private readonly string _instanceId = Guid.NewGuid().ToString();

    public Task DoWorkAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation(
            "{ServiceName} doing work, instance ID: {Id}",
            nameof(DefaultScopedProcessingService),
            _instanceId);

        return Task.CompletedTask;
    }
}
```
- An `Microsoft.Extensions.Logging.ILogger` is injected into the service using a primary constructor.
- The `DoWorkAsync` method returns a `Task` and accepts the `System.Threading.CancellationToken`.
  - The method logs the instance identifier—the `_instanceId` is assigned whenever the class is instantiated.

## Rewrite the Worker class

Replace the existing `Worker` class with the following C# code, and rename the file to *ScopedBackgroundService.cs*:

```csharp
﻿namespace App.ScopedService;

public sealed class ScopedBackgroundService(
    IServiceScopeFactory serviceScopeFactory,
    ILogger<ScopedBackgroundService> logger) : BackgroundService
{
    private const string ClassName = nameof(ScopedBackgroundService);

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation(
            "{Name} is running.", ClassName);

        while (!stoppingToken.IsCancellationRequested)
        {
            await using AsyncServiceScope scope = serviceScopeFactory.CreateAsyncScope();

            IScopedProcessingService scopedProcessingService =
                scope.ServiceProvider.GetRequiredService<IScopedProcessingService>();

            await scopedProcessingService.DoWorkAsync(stoppingToken);

            await Task.Delay(10_000, stoppingToken);
        }
    }

    public override async Task StopAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation(
            "{Name} is stopping.", ClassName);

        await base.StopAsync(stoppingToken);
    }
}
```
In the preceding code, while the `stoppingToken` isn't canceled, the `IServiceScopeFactory` is used to create an async scope. From the `AsyncServiceScope`, the `IScopedProcessingService` is resolved. The `DoWorkAsync` method is awaited, and the `stoppingToken` is passed to the method. Finally, the execution is delayed for 10 seconds and the loop continues. Each time the `DoWorkAsync` method is called, a new instance of the `DefaultScopedProcessingService` is created and the instance identifier is logged.

Replace the template *Program.cs* file contents with the following C# code:

```csharp
﻿using App.ScopedService;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHostedService<ScopedBackgroundService>();
builder.Services.AddScoped<IScopedProcessingService, DefaultScopedProcessingService>();

IHost host = builder.Build();
host.Run();
```
The services are registered in (*Program.cs*). The hosted service is registered with the `Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService*` extension method.

For more information on registering services, see Dependency injection in .NET.

## Verify service functionality

To run the application from Visual Studio, select `F5` or select the **Debug** > **Start Debugging** menu option. If you're using the .NET CLI, run the `dotnet run` command from the working directory:

```dotnetcli
dotnet run
```

For more information on the .NET CLI run command, see dotnet run.

Let the application run for a bit to generate several calls to `DoWorkAsync`, thus logging new instance identifiers. You see output similar to the following logs:

```output
info: App.ScopedService.ScopedBackgroundService[0]
      ScopedBackgroundService is running.
info: App.ScopedService.DefaultScopedProcessingService[0]
      DefaultScopedProcessingService doing work, instance ID: 8986a86f-b444-4139-b9ea-587daae4a6dd
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: .\scoped-service
info: App.ScopedService.DefaultScopedProcessingService[0]
      DefaultScopedProcessingService doing work, instance ID: 07a4a760-8e5a-4c0a-9e73-fcb2f93157d3
info: App.ScopedService.DefaultScopedProcessingService[0]
      DefaultScopedProcessingService doing work, instance ID: c847f432-acca-47ee-8720-1030859ce354
info: Microsoft.Hosting.Lifetime[0]
      Application is shutting down...
info: App.ScopedService.ScopedBackgroundService[0]
      ScopedBackgroundService is stopping.
```

If running the application from within Visual Studio, select **Debug** > **Stop Debugging...**. Alternatively, select `Ctrl` + `C` from the console window to signal cancellation.

## See also

- Worker Services in .NET
- Create a Queue Service
- Create a Windows Service using `BackgroundService`
- Implement the `IHostedService` interface
