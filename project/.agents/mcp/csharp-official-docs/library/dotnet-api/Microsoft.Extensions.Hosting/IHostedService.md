---
title: "IHostedService interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/IHostedService.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IHostedService interface

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public interface IHostedService
```

Defines methods for objects that are managed by the host.

To be added.

## IHostedService.StartAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task StartAsync (System.Threading.CancellationToken <example-value>);
```

Triggered when the application host is ready to start the service.

Parameters:

- `cancellationToken`: Indicates that the start process has been aborted.

Returns: A `Task` that represents the asynchronous Start operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## IHostedService.StopAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task StopAsync (System.Threading.CancellationToken <example-value>);
```

Triggered when the application host is performing a graceful shutdown.

Parameters:

- `cancellationToken`: Indicates that the shutdown process should no longer be graceful.

Returns: A `Task` that represents the asynchronous Stop operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
