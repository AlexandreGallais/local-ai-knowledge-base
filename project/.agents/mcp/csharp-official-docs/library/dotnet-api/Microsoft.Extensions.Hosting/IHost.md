---
title: "IHost interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/IHost.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IHost interface

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public interface IHost : IDisposable
```

A program abstraction.

To be added.

## IHost.Services property

```csharp
public IServiceProvider Services { get; }
```

Gets the services configured for the program (for example, using `IHostBuilder.ConfigureServices`).

Returns: To be added.

To be added.

## IHost.StartAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task StartAsync (System.Threading.CancellationToken <example-value> = default);
```

Starts the `IHostedService` objects configured for the program.
The application will run until interrupted or until `IHostApplicationLifetime.StopApplication` is called.

Parameters:

- `cancellationToken`: Used to abort program start.

Returns: A `Task` that will be completed when the `IHost` starts.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## IHost.StopAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task StopAsync (System.Threading.CancellationToken <example-value> = default);
```

Attempts to gracefully stop the program.

Parameters:

- `cancellationToken`: Used to indicate when stop should no longer be graceful.

Returns: A `Task` that will be completed when the `IHost` stops.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
