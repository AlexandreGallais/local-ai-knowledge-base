---
title: "Host ASP.NET Core SignalR in background services"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/signalr/background-services.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Host ASP.NET Core SignalR in background services

By Dave Pringle and Brady Gaster

This article provides guidance for:

* Hosting SignalR Hubs using a background worker process hosted with ASP.NET Core.
* Sending messages to connected clients from within a .NET `Microsoft.Extensions.Hosting.BackgroundService`.

View or download sample code (how to download)

## Enable SignalR at app startup

Hosting ASP.NET Core SignalR Hubs in the context of a background worker process is identical to hosting a Hub in an ASP.NET Core web app. In `Program.cs`, calling `builder.Services.AddSignalR` adds the required services to the ASP.NET Core Dependency Injection (DI) layer to support SignalR. The `MapHub` method is called on the `WebApplication` `app` to connect the Hub endpoints in the ASP.NET Core request pipeline.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddHostedService<Worker>();

var app = builder.Build();

app.MapHub<ClockHub>("/hubs/clock");

app.Run();
```

In the preceding example, the `ClockHub` class implements the `Hub<T>` class to create a strongly typed Hub. The `ClockHub` has been configured in `Program.cs` to respond to requests at the endpoint `/hubs/clock`.

For more information on strongly typed Hubs, see Use hubs in SignalR for ASP.NET Core.

> **Note:**
> This functionality isn't limited to the Hub\<T> class. Any class that inherits from Hub, such as DynamicHub, works.

```csharp
public class ClockHub : Hub<IClock>
{
    public async Task SendMyLocalTimeToOtherClients(DateTime dateTime)
    {
        await Clients.All.ShowTime(dateTime);
    }
}
```

The interface used by the strongly typed `ClockHub` is the `IClock` interface.

```csharp
public interface IClock
{
    Task ShowTime(DateTime currentTime);
}
```

## Call a SignalR Hub from a background service

During startup, the `Worker` class, a `BackgroundService`, is enabled using `AddHostedService`.

```csharp
builder.Services.AddHostedService<Worker>();
```

Since SignalR is also enabled up during the startup phase, in which each Hub is attached to an individual endpoint in ASP.NET Core's HTTP request pipeline, each Hub is represented by an `IHubContext<T>` on the server. Using ASP.NET Core's DI features, other classes instantiated by the hosting layer, like `BackgroundService` classes, MVC Controller classes, or Razor page models, can get references to server-side Hubs by accepting instances of `IHubContext<ClockHub, IClock>` during construction.

```csharp
public class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;
    private readonly IHubContext<ClockHub, IClock> _clockHub;

    public Worker(ILogger<Worker> logger, IHubContext<ClockHub, IClock> clockHub)
    {
        _logger = logger;
        _clockHub = clockHub;
    }

    protected override async Task ExecuteAsync(CancellationToken <example-value>)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            _logger.LogInformation("Worker running at: {Time}", DateTime.Now);
            await _clockHub.Clients.All.ShowTime(DateTime.Now);
            await Task.Delay(1000, stoppingToken);
        }
    }
}
```

As the `ExecuteAsync` method is called iteratively in the background service, the server's current date and time are sent to the connected clients using the `ClockHub`.

## React to SignalR events with background services

Like a Single Page App using the JavaScript client for SignalR, or a .NET desktop app using the ASP.NET Core SignalR .NET client, a `BackgroundService` or `IHostedService` implementation can also be used to connect to SignalR Hubs and respond to events.

The `ClockHubClient` class implements both the `IClock` interface and the `IHostedService` interface. This way it can be enabled during startup to run continuously and respond to Hub events from the server.

```csharp
public partial class ClockHubClient : IClock, IHostedService
{
}
```

During initialization, the `ClockHubClient` creates an instance of a `HubConnection` and enables the `IClock.ShowTime` method as the handler for the Hub's `ShowTime` event.

```csharp
private readonly ILogger<ClockHubClient> _logger;
private HubConnection _connection;

public ClockHubClient(ILogger<ClockHubClient> logger)
{
    _logger = logger;
    
    _connection = new HubConnectionBuilder()
        .WithUrl(Strings.HubUrl)
        .Build();

    _connection.On<DateTime>(Strings.Events.TimeSent, ShowTime);
}

public Task ShowTime(DateTime currentTime)
{
    _logger.LogInformation("{CurrentTime}", currentTime.ToShortTimeString());

    return Task.CompletedTask;
}
```

In the `IHostedService.StartAsync` implementation, the `HubConnection` is started asynchronously.

```csharp
public async Task StartAsync(CancellationToken <example-value>)
{
    // Loop is here to wait until the server is running
    while (true)
    {
        try
        {
            await _connection.StartAsync(cancellationToken);

            break;
        }
        catch
        {
            await Task.Delay(1000, cancellationToken);
        }
    }
}
```

During the `IHostedService.StopAsync` method, the `HubConnection` is disposed of asynchronously.

```csharp
public async Task StopAsync(CancellationToken <example-value>)
{
    await _connection.DisposeAsync();
}
```

## Related content

* Get started
* Hubs
* Publish to Azure
* Strongly typed Hubs
