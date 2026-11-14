---
title: "BackgroundServiceExceptionBehavior enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/BackgroundServiceExceptionBehavior.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BackgroundServiceExceptionBehavior enum

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public enum BackgroundServiceExceptionBehavior
```

Specifies a behavior that the `IHost` will honor if an
unhandled exception occurs in one of its `BackgroundService` instances.

To be added.

## BackgroundServiceExceptionBehavior.Ignore field

```csharp
Ignore
```

Ignore exceptions thrown in `BackgroundService`.

If a `BackgroundService` throws an exception, the `IHost` will log the error, but otherwise ignore it.
The `BackgroundService` is not restarted.

## BackgroundServiceExceptionBehavior.StopHost field

```csharp
StopHost
```

Stops the `IHost` instance.

If a `BackgroundService` throws an exception, the `IHost` instance stops, and the process continues.
