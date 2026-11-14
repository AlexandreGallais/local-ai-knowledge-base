---
title: "IHostedLifecycleService interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/IHostedLifecycleService.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IHostedLifecycleService interface

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public interface IHostedLifecycleService : Microsoft.Extensions.Hosting.IHostedService
```

Defines methods that are run before or after
`IHostedService.StartAsync` and
`IHostedService.StopAsync`.

To be added.

## IHostedLifecycleService.StartedAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task StartedAsync (System.Threading.CancellationToken <example-value>);
```

Triggered after `IHostedService.StartAsync`.

Parameters:

- `cancellationToken`: Indicates that the start process has been aborted.

Returns: A `Task` that represents the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## IHostedLifecycleService.StartingAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task StartingAsync (System.Threading.CancellationToken <example-value>);
```

Triggered before `IHostedService.StartAsync`.

Parameters:

- `cancellationToken`: Indicates that the start process has been aborted.

Returns: A `Task` that represents the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## IHostedLifecycleService.StoppedAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task StoppedAsync (System.Threading.CancellationToken <example-value>);
```

Triggered after `IHostedService.StopAsync`.

Parameters:

- `cancellationToken`: Indicates that the stop process has been aborted.

Returns: A `Task` that represents the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## IHostedLifecycleService.StoppingAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task StoppingAsync (System.Threading.CancellationToken <example-value>);
```

Triggered before `IHostedService.StopAsync`.

Parameters:

- `cancellationToken`: Indicates that the start process has been aborted.

Returns: A `Task` that represents the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
