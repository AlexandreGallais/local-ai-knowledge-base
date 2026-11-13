---
title: ".NET 6 breaking change: Exception handling in hosting"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/6.0/hosting-exception-handling.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Unhandled exceptions from a BackgroundService

In previous versions, when a `Microsoft.Extensions.Hosting.BackgroundService` throws an unhandled exception, the exception is lost and the service appears unresponsive. .NET 6 fixes this behavior by logging the exception and stopping the host.

## Change description

In previous .NET versions, when an exception is thrown from a `Microsoft.Extensions.Hosting.BackgroundService.ExecuteAsync(System.Threading.CancellationToken)` override, the exception is lost and the service appears unresponsive. The host continues to run, and no message is logged.

Starting in .NET 6, when an exception is thrown from a `Microsoft.Extensions.Hosting.BackgroundService.ExecuteAsync(System.Threading.CancellationToken)` override, the exception is logged to the current `Microsoft.Extensions.Logging.ILogger`. By default, the host is stopped when an unhandled exception is encountered.

## Version introduced

.NET 6

## Reason for change

The new behavior is consistent with the way other app models behave when unhandled exceptions are encountered. It's also confusing to developers when their `Microsoft.Extensions.Hosting.BackgroundService` encounters an error, but nothing is logged. The best default behavior is to stop the host, because unhandled exceptions shouldn't be ignored. They indicate a problem that needs attention.

## Recommended action

If you prefer to keep the previous behavior of allowing an unhandled exception in a `Microsoft.Extensions.Hosting.BackgroundService` to not stop the Host, you can set `Microsoft.Extensions.Hosting.HostOptions.BackgroundServiceExceptionBehavior` to `Microsoft.Extensions.Hosting.BackgroundServiceExceptionBehavior.Ignore`.

```csharp
Host.CreateBuilder(args)
    .ConfigureServices(services =>
    {
        services.Configure<HostOptions>(hostOptions =>
        {
            hostOptions.BackgroundServiceExceptionBehavior = BackgroundServiceExceptionBehavior.Ignore;
        });
    });
```

## Affected APIs

- `Microsoft.Extensions.Hosting.IHost.StartAsync(System.Threading.CancellationToken)`
- `Microsoft.Extensions.Hosting.BackgroundService.ExecuteAsync(System.Threading.CancellationToken)`
