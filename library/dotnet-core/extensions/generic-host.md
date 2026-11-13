---
title: ".NET Generic Host (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/generic-host.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET Generic Host

In this article, you learn about the various patterns for configuring and building a .NET Generic Host available in the Microsoft.Extensions.Hosting NuGet package. The .NET Generic Host is responsible for app startup and lifetime management. The Worker Service templates create a .NET Generic Host, `Microsoft.Extensions.Hosting.HostApplicationBuilder`. The Generic Host can be used with other types of .NET applications, such as Console apps.

A *host* is an object that encapsulates an app's resources and lifetime functionality, such as:

- Dependency injection (DI)
- Logging
- Configuration
- App shutdown
- `IHostedService` implementations

When a host starts, it calls `Microsoft.Extensions.Hosting.IHostedService.StartAsync*` on each implementation of `Microsoft.Extensions.Hosting.IHostedService` registered in the service container's collection of hosted services. In a worker service app, all `IHostedService` implementations that contain `Microsoft.Extensions.Hosting.BackgroundService` instances have their `Microsoft.Extensions.Hosting.BackgroundService.ExecuteAsync*` methods called.

The main reason for including all of the app's interdependent resources in one object is lifetime management: control over app startup and graceful shutdown.

## Host builder options

.NET provides two approaches for configuring and building a Generic Host:

- `Microsoft.Extensions.Hosting.IHostApplicationBuilder` (`Host.CreateApplicationBuilder`): Introduced in .NET 6, this approach uses a linear, property-based configuration style. Services, configuration, and logging are configured by directly accessing properties on the builder object (for example, `builder.Services`, `builder.Configuration`). This approach is recommended for new projects and is the default in current .NET templates.

- `Microsoft.Extensions.Hosting.IHostBuilder` (`Host.CreateDefaultBuilder`): This is the traditional callback-based approach where configuration is done through chained extension methods (for example, `ConfigureServices`, `ConfigureAppConfiguration`). While fully supported, this legacy approach works best for maintaining compatibility with existing codebases.

Both approaches provide the same core functionality and default behaviors. Choose `IHostApplicationBuilder` for new projects to align with modern .NET patterns and simpler configuration code. Use `IHostBuilder` when maintaining existing applications or when third-party libraries require the callback-based pattern.

## Set up a host

The host is typically configured, built, and run by code in the `Program` class. The `Main` method:

# IHostApplicationBuilder

- Calls a `Microsoft.Extensions.Hosting.Host.CreateApplicationBuilder*` method to create and configure a builder object.
- Calls `Microsoft.Extensions.Hosting.HostApplicationBuilder.Build` to create an `Microsoft.Extensions.Hosting.IHost` instance.
- Calls `Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.Run*` or `Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.RunAsync*` method on the host object.

The .NET Worker Service templates generate the following code to create a Generic Host:

```csharp
using Example.WorkerService;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHostedService<Worker>();

IHost host = builder.Build();
host.Run();
```

# IHostBuilder

- Calls a `Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder` method to create and configure a builder object.
- Calls `Microsoft.Extensions.Hosting.HostApplicationBuilder.Build` to create an `Microsoft.Extensions.Hosting.IHost` instance.
- Calls `Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.Run*` or `Microsoft.Extensions.Hosting.HostingAbstractionsHostExtensions.RunAsync*` method on the host object.

The .NET Worker Service templates generate the following code to create a Generic Host:

```csharp
using Example.WorkerService;

IHostBuilder builder = Host.CreateDefaultBuilder(args);
builder.ConfigureServices(services =>
{
    services.AddHostedService<Worker>();
});

IHost host = builder.Build();
host.Run();
```

---

For more information on Worker Services, see Worker Services in .NET.

# IHostApplicationBuilder

The `Microsoft.Extensions.Hosting.Host.CreateApplicationBuilder*` method:

- Sets the content root to the path returned by `System.IO.Directory.GetCurrentDirectory`.
- Loads host configuration from:
  - Environment variables prefixed with `DOTNET_`.
  - Command-line arguments.
- Loads app configuration from:
  - *appsettings.json*.
  - *appsettings.{Environment}.json*.
  - Secret Manager when the app runs in the `Development` environment.
  - Environment variables.
  - Command-line arguments.
- Adds the following logging providers:
  - Console
  - Debug
  - EventSource
  - EventLog (only when running on Windows)
- Enables scope validation and dependency validation when the environment is `Development`.

The `Microsoft.Extensions.Hosting.HostApplicationBuilder.Services` is an `Microsoft.Extensions.DependencyInjection.IServiceCollection` instance. These services are used to build an `System.IServiceProvider` that's used with dependency injection to resolve the registered services.

# IHostBuilder

The `Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder*` method:

- Sets the content root to the path returned by `System.IO.Directory.GetCurrentDirectory`.
- Loads host configuration from:
  - Environment variables prefixed with `DOTNET_`.
  - Command-line arguments.
- Loads app configuration from:
  - *appsettings.json*.
  - *appsettings.{Environment}.json*.
  - Secret Manager when the app runs in the `Development` environment.
  - Environment variables.
  - Command-line arguments.
- Adds the following logging providers:
  - Console
  - Debug
  - EventSource
  - EventLog (only when running on Windows)
- Enables scope validation and dependency validation when the environment is `Development`.

Use the `Microsoft.Extensions.Hosting.IHostBuilder.ConfigureServices*` method to add services to the `Microsoft.Extensions.DependencyInjection.IServiceCollection` instance. These services are used to build an `System.IServiceProvider` that's used with dependency injection to resolve the registered services.

---

## Framework-provided services

When you call either `Microsoft.Extensions.Hosting.IHostBuilder.Build` or `Microsoft.Extensions.Hosting.HostApplicationBuilder.Build`, the following services are registered automatically:

- IHostApplicationLifetime
- IHostLifetime
- IHostEnvironment

## Additional scenario-based host builders

If you're building for the web or writing a distributed application, you might need to use a different host builder. Consider the following list of additional host builders:

- DistributedApplicationBuilder: A builder for creating distributed apps. For more information, see Aspire.
- `Microsoft.AspNetCore.Builder.WebApplicationBuilder`: A builder for web applications and services. For more information, see ASP.NET Core.
- `Microsoft.AspNetCore.Hosting.WebHostBuilder`: A builder for `IWebHost`. For more information, see ASP.NET Core web host.

## `IHostApplicationLifetime`

Inject the `Microsoft.Extensions.Hosting.IHostApplicationLifetime` service into any class to handle post-startup and graceful shutdown tasks. Three properties on the interface are cancellation tokens used to register app start and app stop event handler methods. The interface also includes a `Microsoft.Extensions.Hosting.IHostApplicationLifetime.StopApplication` method.

The following example is an `Microsoft.Extensions.Hosting.IHostedService` and `Microsoft.Extensions.Hosting.IHostedLifecycleService` implementation that registers `IHostApplicationLifetime` events:

```csharp
﻿using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace AppLifetime.Example;

public sealed class ExampleHostedService : IHostedService, IHostedLifecycleService
{
    private readonly ILogger _logger;

    public ExampleHostedService(
        ILogger<ExampleHostedService> logger,
        IHostApplicationLifetime appLifetime)
    {
        _logger = logger;

        appLifetime.ApplicationStarted.Register(OnStarted);
        appLifetime.ApplicationStopping.Register(OnStopping);
        appLifetime.ApplicationStopped.Register(OnStopped);
    }

    Task IHostedLifecycleService.StartingAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("1. StartingAsync has been called.");

        return Task.CompletedTask;
    }

    Task IHostedService.StartAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("2. StartAsync has been called.");

        return Task.CompletedTask;
    }

    Task IHostedLifecycleService.StartedAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("3. StartedAsync has been called.");

        return Task.CompletedTask;
    }

    private void OnStarted()
    {
        _logger.LogInformation("4. OnStarted has been called.");
    }

    private void OnStopping()
    {
        _logger.LogInformation("5. OnStopping has been called.");
    }

    Task IHostedLifecycleService.StoppingAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("6. StoppingAsync has been called.");

        return Task.CompletedTask;
    }

    Task IHostedService.StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("7. StopAsync has been called.");

        return Task.CompletedTask;
    }

    Task IHostedLifecycleService.StoppedAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("8. StoppedAsync has been called.");

        return Task.CompletedTask;
    }

    private void OnStopped()
    {
        _logger.LogInformation("9. OnStopped has been called.");
    }
}
```
The Worker Service template could be modified to add the `ExampleHostedService` implementation:

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using AppLifetime.Example;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Services.AddHostedService<ExampleHostedService>();
using IHost host = builder.Build();

await host.RunAsync();
```
The application would write the following sample output:

```csharp
// Sample output:
//     info: AppLifetime.Example.ExampleHostedService[0]
//           1.StartingAsync has been called.
//     info: AppLifetime.Example.ExampleHostedService[0]
//           2.StartAsync has been called.
//     info: AppLifetime.Example.ExampleHostedService[0]
//           3.StartedAsync has been called.
//     info: AppLifetime.Example.ExampleHostedService[0]
//           4.OnStarted has been called.
//     info: Microsoft.Hosting.Lifetime[0]
//           Application started. Press Ctrl+C to shut down.
//     info: Microsoft.Hosting.Lifetime[0]
//           Hosting environment: Production
//     info: Microsoft.Hosting.Lifetime[0]
//           Content root path: ..\app-lifetime\bin\Debug\net8.0
//     info: AppLifetime.Example.ExampleHostedService[0]
//           5.OnStopping has been called.
//     info: Microsoft.Hosting.Lifetime[0]
//           Application is shutting down...
//     info: AppLifetime.Example.ExampleHostedService[0]
//           6.StoppingAsync has been called.
//     info: AppLifetime.Example.ExampleHostedService[0]
//           7.StopAsync has been called.
//     info: AppLifetime.Example.ExampleHostedService[0]
//           8.StoppedAsync has been called.
//     info: AppLifetime.Example.ExampleHostedService[0]
//           9.OnStopped has been called.
```
The output shows the order of all of the various lifecycle events:

1. `IHostedLifecycleService.StartingAsync`
1. `IHostedService.StartAsync`
1. `IHostedLifecycleService.StartedAsync`
1. `IHostApplicationLifetime.ApplicationStarted`

When the application is stopped, for example with `Ctrl`+`C`, the following events are raised:

1. `IHostApplicationLifetime.ApplicationStopping`
1. `IHostedLifecycleService.StoppingAsync`
1. `IHostedService.StopAsync`
1. `IHostedLifecycleService.StoppedAsync`
1. `IHostApplicationLifetime.ApplicationStopped`

## `IHostLifetime`

The `Microsoft.Extensions.Hosting.IHostLifetime` implementation controls when the host starts and when it stops. The last implementation registered is used. `Microsoft.Extensions.Hosting.Internal.ConsoleLifetime` is the default `IHostLifetime` implementation. For more information on the lifetime mechanics of shutdown, see Host shutdown.

The `IHostLifetime` interface exposes a `Microsoft.Extensions.Hosting.IHostLifetime.WaitForStartAsync*` method, which is called at the start of `IHost.StartAsync` which will wait until it's complete before continuing. This can be used to delay startup until signaled by an external event.

Additionally, the `IHostLifetime` interface exposes a `Microsoft.Extensions.Hosting.IHostLifetime.StopAsync*` method, which is called from `IHost.StopAsync` to indicate that the host is stopping and it's time to shut down.

## `IHostEnvironment`

Inject the `Microsoft.Extensions.Hosting.IHostEnvironment` service into a class to get information about the following settings:

- `Microsoft.Extensions.Hosting.IHostEnvironment.ApplicationName`
- `Microsoft.Extensions.Hosting.IHostEnvironment.ContentRootFileProvider`
- `Microsoft.Extensions.Hosting.IHostEnvironment.ContentRootPath`
- `Microsoft.Extensions.Hosting.IHostEnvironment.EnvironmentName`

Additionally, the `IHostEnvironment` service exposes the ability to evaluate the environment with the help of these extension methods:

- `Microsoft.Extensions.Hosting.HostEnvironmentEnvExtensions.IsDevelopment*`
- `Microsoft.Extensions.Hosting.HostEnvironmentEnvExtensions.IsEnvironment*`
- `Microsoft.Extensions.Hosting.HostEnvironmentEnvExtensions.IsProduction*`
- `Microsoft.Extensions.Hosting.HostEnvironmentEnvExtensions.IsStaging*`
