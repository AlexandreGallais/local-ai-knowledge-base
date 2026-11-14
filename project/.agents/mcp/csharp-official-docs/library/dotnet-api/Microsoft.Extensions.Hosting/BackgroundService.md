---
title: "BackgroundService class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/BackgroundService.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BackgroundService class

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public abstract class BackgroundService : IDisposable, Microsoft.Extensions.Hosting.IHostedService
```

Base class for implementing a long running `IHostedService`.

To be added.

## BackgroundService.BackgroundService() constructor

```csharp
protected BackgroundService ();
```

Initializes a new instance of the `BackgroundService` class.

To be added.

## BackgroundService.ExecuteTask property

```csharp
public virtual System.Threading.Tasks.Task? ExecuteTask { get; }
```

Gets the Task that executes the background operation.

Returns: To be added.

Will return `null` if the background operation hasn't started.

## BackgroundService.Dispose() method

```csharp
public virtual void Dispose ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

To be added.

## BackgroundService.ExecuteAsync(CancellationToken) method

```csharp
protected abstract System.Threading.Tasks.Task ExecuteAsync (System.Threading.CancellationToken <example-value>);
```

This method is called when the `IHostedService` starts. The implementation should return a task that represents
the lifetime of the long running operation(s) being performed.

Parameters:

- `stoppingToken`: Triggered when `IHostedService.StopAsync` is called.

Returns: A `Task` that represents the long running operations.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

See Worker Services in .NET for implementation guidelines.

## BackgroundService.StartAsync(CancellationToken) method

```csharp
public virtual System.Threading.Tasks.Task StartAsync (System.Threading.CancellationToken <example-value>);
```

Triggered when the application host is ready to start the service.

Parameters:

- `cancellationToken`: Indicates that the start process has been aborted.

Returns: A `Task` that represents the asynchronous Start operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## BackgroundService.StopAsync(CancellationToken) method

```csharp
public virtual System.Threading.Tasks.Task StopAsync (System.Threading.CancellationToken <example-value>);
```

Triggered when the application host is performing a graceful shutdown.

Parameters:

- `cancellationToken`: Indicates that the shutdown process should no longer be graceful.

Returns: A `Task` that represents the asynchronous Stop operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
