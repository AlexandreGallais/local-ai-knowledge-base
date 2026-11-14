---
title: "IApplicationLifetime interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/IApplicationLifetime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IApplicationLifetime interface

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public interface IApplicationLifetime
```

Allows consumers to perform cleanup during a graceful shutdown.

This type is obsolete and will be removed in a future version.
The recommended alternative is Microsoft.Extensions.Hosting.IHostApplicationLifetime.

To be added.

## IApplicationLifetime.ApplicationStarted property

```csharp
public System.Threading.CancellationToken <example-value> { get; }
```

Gets a cancellation token. Triggered when the application host has fully started and is about to wait
for a graceful shutdown.

Returns: To be added.

To be added.

## IApplicationLifetime.ApplicationStopped property

```csharp
public System.Threading.CancellationToken <example-value> { get; }
```

Gets a cancellation token. Triggered when the application host is performing a graceful shutdown.
All requests should be complete at this point. Shutdown will block
until this event completes.

Returns: To be added.

To be added.

## IApplicationLifetime.ApplicationStopping property

```csharp
public System.Threading.CancellationToken <example-value> { get; }
```

Gets a cancellation token. Triggered when the application host is performing a graceful shutdown.
Requests may still be in flight. Shutdown will block until this event completes.

Returns: To be added.

To be added.

## IApplicationLifetime.StopApplication() method

```csharp
public void StopApplication ();
```

Requests termination of the current application.

To be added.
