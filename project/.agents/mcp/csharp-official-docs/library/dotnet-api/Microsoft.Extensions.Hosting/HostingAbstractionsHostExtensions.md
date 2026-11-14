---
title: "HostingAbstractionsHostExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/HostingAbstractionsHostExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HostingAbstractionsHostExtensions class

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public static class HostingAbstractionsHostExtensions
```

Provides extension methods for the `IHost` from the hosting abstractions package.

To be added.

## HostingAbstractionsHostExtensions.Run(IHost) method

```csharp
public static void Run (this Microsoft.Extensions.Hosting.IHost host);
```

Runs an application and blocks the calling thread until host shutdown is triggered and all `IHostedService` instances are stopped.

Parameters:

- `host`: The `IHost` to run.

To be added.

## HostingAbstractionsHostExtensions.RunAsync(IHost, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task RunAsync (this Microsoft.Extensions.Hosting.IHost host, System.Threading.CancellationToken token = <example-value>);
```

Runs an application and returns a `Task` that only completes when the token is triggered or shutdown is triggered.
The `host` instance is disposed of after running.

Parameters:

- `host`: The `IHost` to run.
- `token`: The token to trigger shutdown.

Returns: The `Task` that represents the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `HostingAbstractionsHostExtensions.Run`.

## HostingAbstractionsHostExtensions.Start(IHost) method

```csharp
public static void Start (this Microsoft.Extensions.Hosting.IHost host);
```

Starts the host synchronously.

Parameters:

- `host`: The `IHost` to start.

To be added.

## HostingAbstractionsHostExtensions.StopAsync(IHost, TimeSpan) method

```csharp
public static System.Threading.Tasks.Task StopAsync (this Microsoft.Extensions.Hosting.IHost host, TimeSpan timeout);
```

Attempts to gracefully stop the host with the given timeout.

Parameters:

- `host`: The `IHost` to stop.
- `timeout`: The timeout for stopping gracefully. Once expired the
server may terminate any remaining active connections.

Returns: The `Task` that represents the asynchronous operation.

To be added.

## HostingAbstractionsHostExtensions.WaitForShutdown(IHost) method

```csharp
public static void WaitForShutdown (this Microsoft.Extensions.Hosting.IHost host);
```

Blocks the calling thread until shutdown is triggered via Ctrl+C or SIGTERM.

Parameters:

- `host`: The running `IHost`.

To be added.

## HostingAbstractionsHostExtensions.WaitForShutdownAsync(IHost, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task WaitForShutdownAsync (this Microsoft.Extensions.Hosting.IHost host, System.Threading.CancellationToken token = <example-value>);
```

Returns a Task that completes when shutdown is triggered via the given token.

Parameters:

- `host`: The running `IHost`.
- `token`: The token to trigger shutdown.

Returns: The `Task` that represents the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `HostingAbstractionsHostExtensions.WaitForShutdown`.
