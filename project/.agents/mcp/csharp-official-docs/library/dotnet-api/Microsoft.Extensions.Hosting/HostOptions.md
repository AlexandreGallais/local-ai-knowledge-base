---
title: "HostOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/HostOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HostOptions class

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public class HostOptions
```

Options for `IHost`.

To be added.

## HostOptions.HostOptions() constructor

```csharp
public HostOptions ();
```

Initializes a new instance of the `HostOptions` class.

To be added.

## HostOptions.BackgroundServiceExceptionBehavior property

```csharp
public Microsoft.Extensions.Hosting.BackgroundServiceExceptionBehavior BackgroundServiceExceptionBehavior { get; set; }
```

Gets or sets the behavior the `IHost` will follow when any of
its `BackgroundService` instances throw an unhandled exception.

Returns: The default is `BackgroundServiceExceptionBehavior.StopHost`.

Defaults to `BackgroundServiceExceptionBehavior.StopHost`.

## HostOptions.ServicesStartConcurrently property

```csharp
public bool ServicesStartConcurrently { get; set; }
```

Gets or sets a value that indicates if the `IHost` will start registered instances of `IHostedService` concurrently or sequentially.

Returns: `true` if the `IHost` will start registered instances of `IHostedService` concurrently; `false` if the `IHost` will start registered instances sequentially. The default is `false` .

To be added.

## HostOptions.ServicesStopConcurrently property

```csharp
public bool ServicesStopConcurrently { get; set; }
```

Gets or sets a value that indicates if the `IHost` will stop registered instances of `IHostedService` concurrently or sequentially.

Returns: `true` if the `IHost` will stop registered instances of `IHostedService` concurrently; `false` if the `IHost` will stop registered instances sequentially. The default is `false` .

To be added.

## HostOptions.ShutdownTimeout property

```csharp
public TimeSpan ShutdownTimeout { get; set; }
```

Gets or sets the default timeout for `IHost.StopAsync`.

Returns: To be added.

This timeout also encompasses all host services implementing
`IHostedLifecycleService.StoppingAsync` and
`IHostedLifecycleService.StoppedAsync`.

## HostOptions.StartupTimeout property

```csharp
public TimeSpan StartupTimeout { get; set; }
```

Gets or sets the default timeout for `IHost.StartAsync`.

Returns: To be added.

This timeout also encompasses all host services implementing
`IHostedLifecycleService.StartingAsync` and
`IHostedLifecycleService.StartedAsync`.
