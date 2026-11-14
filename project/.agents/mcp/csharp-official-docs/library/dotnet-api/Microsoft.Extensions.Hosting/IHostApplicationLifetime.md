---
title: "IHostApplicationLifetime interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/IHostApplicationLifetime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IHostApplicationLifetime interface

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public interface IHostApplicationLifetime
```

Allows consumers to be notified of application lifetime events. This interface is not intended to be user-replaceable.

To be added.

## IHostApplicationLifetime.ApplicationStarted property

```csharp
public System.Threading.CancellationToken <example-value> { get; }
```

Gets a cancellation token that is triggered when the application host has fully started and is about to wait
for a graceful shutdown.

Returns: To be added.

To be added.

## IHostApplicationLifetime.ApplicationStopped property

```csharp
public System.Threading.CancellationToken <example-value> { get; }
```

Gets a cancellation token that is triggered when the application host has completed a graceful shutdown.
All requests should be complete at this point.
The application will not exit until all callbacks registered on this token have completed.

Returns: To be added.

To be added.

## IHostApplicationLifetime.ApplicationStopping property

```csharp
public System.Threading.CancellationToken <example-value> { get; }
```

Gets a cancellation token that is triggered when the application host is starting a graceful shutdown.
Requests might still be in flight. Shutdown will block until all callbacks registered on this token have completed.

Returns: To be added.

To be added.

## IHostApplicationLifetime.StopApplication() method

```csharp
public void StopApplication ();
```

Requests termination of the current application.

To be added.
