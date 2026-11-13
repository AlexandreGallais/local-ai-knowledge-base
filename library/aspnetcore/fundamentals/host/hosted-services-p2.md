---
title: "Background tasks with hosted services in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/host/hosted-services.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Background tasks with hosted services in ASP.NET Core (part 2 of 2)

## Queued background tasks

A background task queue is based on the .NET Framework 4.x `System.Web.Hosting.HostingEnvironment.QueueBackgroundWorkItem*`:

```csharp
public interface IBackgroundTaskQueue
{
    ValueTask QueueBackgroundWorkItemAsync(Func<CancellationToken, ValueTask> workItem);

    ValueTask<Func<CancellationToken, ValueTask>> DequeueAsync(
        CancellationToken cancellationToken);
}

public class BackgroundTaskQueue(int capacity) : IBackgroundTaskQueue
{
    // Capacity should be set based on the expected application load and
    // number of concurrent threads accessing the queue.
    // BoundedChannelFullMode.Wait causes calls to WriteAsync() to return a task,
    // which only completes when space becomes available. In the event that many
    // publishers/calls start accumulating, using BoundedChannelFullMode.Wait can
    // lead to backpressure.
    private readonly Channel<Func<CancellationToken, ValueTask>> _queue =
        Channel.CreateBounded<Func<CancellationToken, ValueTask>>(new BoundedChannelOptions(capacity)
        {
            FullMode = BoundedChannelFullMode.Wait
        });

    public async ValueTask QueueBackgroundWorkItemAsync(
        Func<CancellationToken, ValueTask> workItem)
    {
        if (workItem == null)
        {
            throw new ArgumentNullException(nameof(workItem));
        }

        await _queue.Writer.WriteAsync(workItem);
    }

    public async ValueTask<Func<CancellationToken, ValueTask>> DequeueAsync(
        CancellationToken cancellationToken)
    {
        var workItem = await _queue.Reader.ReadAsync(cancellationToken);

        return workItem;
    }
}
```
In the following `QueueHostedService` example:

* The `BackgroundProcessing` method returns a `Task`, which is awaited in `ExecuteAsync`.
* Background tasks in the queue are dequeued and executed in `BackgroundProcessing`.
* Work items are awaited before the service stops in `StopAsync`.

```csharp
public class QueuedHostedService(
    IBackgroundTaskQueue taskQueue,
    ILogger<QueuedHostedService> logger) : BackgroundService
{
    public IBackgroundTaskQueue TaskQueue { get; } = taskQueue;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation(
            $"Queued Hosted Service is running.{Environment.NewLine}" +
            $"{Environment.NewLine}Tap W to add a work item to the " +
            $"background queue.{Environment.NewLine}");

        await BackgroundProcessing(stoppingToken);
    }

    private async Task BackgroundProcessing(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            var workItem =
                await TaskQueue.DequeueAsync(stoppingToken);

            try
            {
                await workItem(stoppingToken);
            }
            catch (Exception ex)
            {
                logger.LogError(ex,
                    "Error occurred executing {WorkItem}.", nameof(workItem));
            }
        }
    }

    public override async Task StopAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("Queued Hosted Service is stopping.");

        await base.StopAsync(stoppingToken);
    }
}
```
A `MonitorLoop` service handles enqueuing tasks for the hosted service whenever the `w` key is selected on an input device:

* The `IBackgroundTaskQueue` is injected into the `MonitorLoop` service.
* `IBackgroundTaskQueue.QueueBackgroundWorkItem` is called to enqueue a work item.
* The work item simulates a long-running background task:
  * Three 5-second delays are executed (`Task.Delay`).
  * A `try-catch` statement traps `System.OperationCanceledException` if the task is cancelled.

```csharp
public class MonitorLoop(
    IBackgroundTaskQueue taskQueue,
    ILogger<MonitorLoop> logger,
    IHostApplicationLifetime applicationLifetime)
{
    private readonly CancellationToken _cancellationToken = applicationLifetime.ApplicationStopping;

    public void StartMonitorLoop()
    {
        logger.LogInformation("MonitorAsync Loop is starting.");

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
                await taskQueue.QueueBackgroundWorkItemAsync(BuildWorkItem);
            }
        }
    }

    private async ValueTask BuildWorkItem(CancellationToken token)
    {
        // Simulate three 5-second tasks to complete
        // for each enqueued work item

        int delayLoop = 0;
        var guid = Guid.NewGuid().ToString();

        logger.LogInformation("Queued Background Task {Guid} is starting.", guid);

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

            delayLoop++;

            logger.LogInformation("Queued Background Task {Guid} is running. "
                                   + "{DelayLoop}/3", guid, delayLoop);
        }

        if (delayLoop == 3)
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
The services are registered in the `Program` file. The hosted service is registered with the `Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService*` extension method:

```csharp
services.AddSingleton<MonitorLoop>();
services.AddHostedService<QueuedHostedService>();
services.AddSingleton<IBackgroundTaskQueue>(ctx =>
{
    if (!int.TryParse(hostContext.Configuration["QueueCapacity"], out var queueCapacity))
        queueCapacity = 100;
    return new BackgroundTaskQueue(queueCapacity);
});
```
`MonitorLoop` is started in the `Program` file:

```csharp
var monitorLoop = host.Services.GetRequiredService<MonitorLoop>();
monitorLoop.StartMonitorLoop();
```
In a web app, an endpoint can queue work items instead of a console input loop. For an example, see the Hosted services in a web app section.

## Asynchronous timed background task

The following code creates an asynchronous timed background task:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/host/TimedBackgroundTasks/TimedHostedService.cs._
## Native AOT

The Worker Service templates support .NET native ahead-of-time (AOT) with the `--aot` flag:

# Visual Studio

1. Create a new project.
1. Select **Worker Service**. Select **Next**.
1. Provide a project name in the **Project name** field or accept the default project name.  Select **Next**.
1. In the **Additional information** dialog:
  1. Choose a **Framework**.
  1. Check the **Enable Native AOT publish** checkbox.
  1. Select **Create**.

# .NET CLI

Use the Worker Service (`worker`) template with the dotnet new command from a command shell with the AOT option:

```dotnetcli
dotnet new worker -o WorkerWithAot --aot
```

---

The AOT option adds `<PublishAot>true</PublishAot>` to the project file:

```diff

<Project Sdk="Microsoft.NET.Sdk.Worker">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <InvariantGlobalization>true</InvariantGlobalization>
+   <PublishAot>true</PublishAot>
    <UserSecretsId>dotnet-WorkerWithAot-e94b2</UserSecretsId>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Hosting" Version="8.0.0-preview.4.23259.5" />
  </ItemGroup>
</Project>
```

## Related content

* Background services unit tests on GitHub.
* View or download sample code (how to download)
* Implement background tasks in microservices with IHostedService and the BackgroundService class
* Run background tasks with WebJobs in Azure App Service
* `System.Threading.Timer`
