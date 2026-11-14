---
title: ".NET Generic Host (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/generic-host.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET Generic Host (part 2 of 2)

## Host configuration

Host configuration is used to configure properties of the IHostEnvironment implementation.

# IHostApplicationBuilder

The host configuration is available in `Microsoft.Extensions.Hosting.HostApplicationBuilderSettings.Configuration` property and the environment implementation is available in `Microsoft.Extensions.Hosting.IHostApplicationBuilder.Environment` property. To configure the host, access the `Configuration` property and call any of the available extension methods.

To add host configuration, consider the following example:

```csharp
﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

HostApplicationBuilderSettings settings = new()
{
    Args = args,
    Configuration = new ConfigurationManager(),
    ContentRootPath = Directory.GetCurrentDirectory(),
};

settings.Configuration.AddJsonFile("hostsettings.json", optional: true);
settings.Configuration.AddEnvironmentVariables(prefix: "PREFIX_");
settings.Configuration.AddCommandLine(args);

HostApplicationBuilder builder = Host.CreateApplicationBuilder(settings);

using IHost host = builder.Build();

// Application code should start here.

await host.RunAsync();
```
The preceding code:

- Sets the content root to the path returned by `System.IO.Directory.GetCurrentDirectory`.
- Loads host configuration from:
  - *hostsettings.json*.
  - Environment variables prefixed with `PREFIX_`.
  - Command-line arguments.

# IHostBuilder

The host configuration is available in HostBuilderContext.Configuration within the `Microsoft.Extensions.Hosting.HostBuilder.ConfigureAppConfiguration*` method. When you call the `ConfigureAppConfiguration` method, the `HostBuilderContext` and `IConfigurationBuilder` are passed into the `configureDelegate`. The `configureDelegate` is defined as an `Action<HostBuilderContext, IConfigurationBuilder>`. The `HostBuilderContext` exposes the `Configuration` property, which is an instance of `IConfiguration`. It represents the configuration built from the host, whereas the `IConfigurationBuilder` is the builder object used to configure the app.

> **Tip:**
> After `ConfigureAppConfiguration` is called the `HostBuilderContext.Configuration` is replaced with the app config.

To add host configuration, call `Microsoft.Extensions.Hosting.HostBuilder.ConfigureHostConfiguration*` on `IHostBuilder`. `ConfigureHostConfiguration` can be called multiple times with additive results. The host uses whichever option sets a value last on a given key.

---

# IHostApplicationBuilder

App configuration is accessed through the public `Microsoft.Extensions.Hosting.IHostApplicationBuilder.Configuration` property. This property allows consumers to read from or make changes to the existing configuration using available extension methods.

# IHostBuilder

App configuration is created by calling `Microsoft.Extensions.Hosting.HostBuilder.ConfigureAppConfiguration*` on an `Microsoft.Extensions.Hosting.IHostBuilder`. The `ConfigureAppConfiguration` method can be called multiple times with additive results. The app uses whichever option sets a value last on a given key.

The configuration created by `ConfigureAppConfiguration` is available in HostBuilderContext.Configuration for subsequent operations and as a service from DI. The host configuration is also added to the app configuration.

---

For more information, see Configuration in .NET.

## Host shutdown

There are several ways in which a hosted process is stopped. Most commonly, a hosted process can be stopped in the following ways:

- If someone doesn't call `Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.Run*` or `Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.WaitForShutdown*` and the app exits normally with `Main` completing.
- If the app crashes.
- If the app is forcefully shut down using SIGKILL (or `Ctrl`+`Z`).

The hosting code isn't responsible for handling these scenarios. The owner of the process needs to deal with them the same as any other app. There are several other ways in which a hosted service process can be stopped:

- If `ConsoleLifetime` is used (`Microsoft.Extensions.Hosting.HostingHostBuilderExtensions.UseConsoleLifetime*`), it listens for the following signals and attempts to stop the host gracefully.
  - SIGINT (or `Ctrl`+`C`).
  - SIGQUIT (or `Ctrl`+`BREAK` on Windows, `Ctrl`+`\\` on Unix).
  - SIGTERM (sent by other apps, such as `docker stop`).
- If the app calls `System.Environment.Exit*`.

The built-in hosting logic handles these scenarios, specifically the `ConsoleLifetime`
class. `ConsoleLifetime` tries to handle the "shutdown" signals SIGINT, SIGQUIT, and SIGTERM to allow for a graceful exit to the
application.

Before .NET 6, there wasn't a way for .NET code to gracefully handle SIGTERM. To work around this limitation, `ConsoleLifetime` would subscribe to `System.AppDomain.ProcessExit`. When `ProcessExit` was raised, `ConsoleLifetime` would signal the host to stop and block the `ProcessExit` thread, waiting for the host to stop.

The process exit handler would allow for the clean-up code in the application to run—for example, `Microsoft.Extensions.Hosting.IHost.StopAsync*` and code after `Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.Run*` in the `Main` method.

However, there were other issues with this approach because SIGTERM wasn't the only way `ProcessExit` was raised. SIGTERM is also raised when app code calls `Environment.Exit`. `Environment.Exit` isn't a graceful way of shutting down a process in the `Microsoft.Extensions.Hosting` app model. It raises the `ProcessExit` event and then exits the process. The end of the `Main` method doesn't get executed. Background and foreground threads are terminated, and `finally` blocks *aren't* executed.

Since `ConsoleLifetime` blocked `ProcessExit` while waiting for the host to shut down, this behavior led to deadlocks from `Environment.Exit` also blocks waiting for the call to `ProcessExit`. Additionally, since the SIGTERM handling was attempting to gracefully shut down the process, `ConsoleLifetime` would set the `System.Environment.ExitCode` to `0`, which clobbered the user's exit code passed to `Environment.Exit`.

In .NET 6, POSIX signals are supported and handled. The `ConsoleLifetime` handles SIGTERM gracefully, and no longer gets involved when `Environment.Exit` is invoked.

> **Tip:**
> For .NET 6+, `ConsoleLifetime` no longer has logic to handle scenario `Environment.Exit`. Apps that call `Environment.Exit` and need to perform clean-up logic can subscribe to `ProcessExit` themselves. Hosting will no longer attempt to gracefully stop the host in these scenarios.

If your application uses hosting, and you want to gracefully stop the host, you can call
`Microsoft.Extensions.Hosting.IHostApplicationLifetime.StopApplication*` instead of `Environment.Exit`.

### Hosting shutdown process

The following sequence diagram shows how the signals are handled internally in the hosting code. Most users don't need to understand this process. But for developers that need a deep understanding, a good visual may help you get started.

After the host has been started, when a user calls `Run` or `WaitForShutdown`, a handler gets registered for `Microsoft.Extensions.Hosting.IApplicationLifetime.ApplicationStopping`. Execution is paused in `WaitForShutdown`, waiting for the `ApplicationStopping` event to be raised. The `Main` method doesn't return right away, and the app stays running until `Run` or `WaitForShutdown` returns.

When a signal is sent to the process, it initiates the following sequence:

1. The control flows from `ConsoleLifetime` to `ApplicationLifetime` to raise the `ApplicationStopping` event. This signals
`WaitForShutdownAsync` to unblock the `Main` execution code. In the meantime, the POSIX signal handler returns with
`Cancel = true` since the POSIX signal has been handled.
1. The `Main` execution code starts executing again and tells the host to `StopAsync()`, which in turn stops all the hosted
services, and raises any other stopped events.
1. Finally, `WaitForShutdown` exits, allowing for any application clean-up code to execute, and for the `Main` method
to exit gracefully.

### Host shutdown in web server scenarios

There are various other common scenarios in which graceful shutdown works in Kestrel for both HTTP/1.1 and HTTP/2 protocols, and how you can configure it in different environments with a load balancer to drain traffic smoothly. While web server configuration is beyond the scope of this article, you can find more information on Configure options for the ASP.NET Core Kestrel web server documentation.

When the Host receives a shutdown signal (for example, `Ctrl`+`C` or `StopAsync`), it notifies the application by signaling `Microsoft.Extensions.Hosting.IHostApplicationLifetime.ApplicationStopping`. You should subscribe to this event if you have any long-running operations that need to finish gracefully.

Next, the Host calls `Microsoft.AspNetCore.Hosting.Server.IServer.StopAsync*` with a shutdown timeout that you can configure (default 30s). Kestrel (and Http.Sys) close their port bindings and stop accepting new connections. They also tell the current connections to stop processing new requests. For HTTP/2 and HTTP/3, a preliminary `GOAWAY` message is sent to the client. For HTTP/1.1, they stop the connection loop because requests are processed in order. IIS behaves differently, by rejecting new requests with a 503 status code.

The active requests have until the shutdown timeout to complete. If they're all complete before the timeout, the server returns control to the host sooner. If the timeout expires, the pending connections and requests are aborted forcefully, which can cause errors in the logs and to the clients.

#### Load balancer considerations

To ensure a smooth transition of clients to a new destination when working with a load balancer, you can follow these steps:

- Bring up the new instance and start balancing traffic to it (you may already have several instances for scaling purposes).
- Disable or remove the old instance in the load balancer configuration so it stops receiving new traffic.
- Signal the old instance to shut down.
- Wait for it to drain or time out.

## See also

- Dependency injection in .NET
- Logging in .NET
- Configuration in .NET
- Worker Services in .NET
- ASP.NET Core Web Host
- ASP.NET Core Kestrel web server configuration
- Generic host bugs should be created in the github.com/dotnet/runtime repo
