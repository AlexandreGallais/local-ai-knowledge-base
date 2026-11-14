---
title: "IHostLifetime interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/IHostLifetime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IHostLifetime interface

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public interface IHostLifetime
```

Tracks host lifetime.

To be added.

## IHostLifetime.StopAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task StopAsync (System.Threading.CancellationToken <example-value>);
```

Called from `IHost.StopAsync` to indicate that the host is stopping and it's time to shut down.

Parameters:

- `cancellationToken`: Used to indicate when stop should no longer be graceful.

Returns: A `Task`.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## IHostLifetime.WaitForStartAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task WaitForStartAsync (System.Threading.CancellationToken <example-value>);
```

Called at the start of `IHost.StartAsync` which will wait until it's complete before
continuing. This can be used to delay startup until signaled by an external event.

Parameters:

- `cancellationToken`: Used to abort program start.

Returns: A `Task`.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
