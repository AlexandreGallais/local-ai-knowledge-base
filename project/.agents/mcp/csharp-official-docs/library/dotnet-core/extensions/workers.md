---
title: "Worker Services (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/workers.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Worker services in .NET

There are numerous reasons for creating long-running services such as:

- Processing CPU-intensive data.
- Queuing work items in the background.
- Performing a time-based operation on a schedule.

Background service processing usually doesn't involve a user interface (UI), but UIs can be built around them. In the early days with .NET Framework, Windows developers could create Windows Services for these purposes. Now with .NET, you can use the `Microsoft.Extensions.Hosting.BackgroundService`, which is an implementation of `Microsoft.Extensions.Hosting.IHostedService`, or implement your own.

With .NET, you're no longer restricted to Windows. You can develop cross-platform background services. Hosted services are logging, configuration, and dependency-injection (DI) ready. They're a part of the extensions suite of libraries, meaning they're fundamental to all .NET workloads that work with the generic host.

> **Important:**
> Installing the .NET SDK also installs the `Microsoft.NET.Sdk.Worker` and the worker template. In other words, after installing the .NET SDK, you could create a new worker by using the dotnet new worker command. If you're using Visual Studio, the template is hidden until the optional ASP.NET and web development workload is installed.

## Terminology

Many terms are mistakenly used synonymously. This section defines some of these terms to make their intent in this article more apparent.

- **Background Service**: The `Microsoft.Extensions.Hosting.BackgroundService` type.
- **Hosted Service**: Implementations of `Microsoft.Extensions.Hosting.IHostedService`, or the `Microsoft.Extensions.Hosting.IHostedService` itself.
- **Long-running Service:** Any service that runs continuously.
- **Windows Service**: The *Windows Service* infrastructure, originally .NET Framework-centric but now accessible via .NET.
- **Worker Service**: The *Worker Service* template.

## Worker Service template

The Worker Service template is available in the .NET CLI and Visual Studio. For more information, see .NET CLI, `dotnet new worker` - template. The template consists of a `Program` and `Worker` class.

```csharp
﻿using App.WorkerService;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHostedService<Worker>();

IHost host = builder.Build();
host.Run();
```
The preceding `Program` class:

- Creates a `Microsoft.Extensions.Hosting.HostApplicationBuilder`.
- Calls `Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService*` to register the `Worker` as a hosted service.
- Builds an `Microsoft.Extensions.Hosting.IHost` from the builder.
- Calls `Run` on the `host` instance, which runs the app.

### Template defaults

The Worker template doesn't enable server garbage collection (GC) by default, as there are numerous factors that play a role in determining its necessity. All of the scenarios that require long-running services should consider performance implications of this default. To enable server GC, add the `ServerGarbageCollection` node to the project file:

```xml
<PropertyGroup>
    <ServerGarbageCollection>true</ServerGarbageCollection>
</PropertyGroup>
```

#### Tradeoffs and considerations

| Enabled | Disabled |
|---------|----------|
| Efficient memory management: Automatically reclaims unused memory to prevent memory leaks and optimize resource usage. | Improved real-time performance: Avoids potential pauses or interruptions caused by garbage collection in latency-sensitive applications. |
| Long-term stability: Helps maintain stable performance in long-running services by managing memory over extended periods. | Resource efficiency: May conserve CPU and memory resources in resource-constrained environments. |
| Reduced maintenance: Minimizes the need for manual memory management, simplifying maintenance. | Manual memory control: Provides fine-grained control over memory for specialized applications. |
| Predictable behavior: Contributes to consistent and predictable application behavior. | Suitable for Short-lived processes: Minimizes the overhead of garbage collection for short-lived or ephemeral processes. |

For more information regarding performance considerations, see Server GC. For more information on configuring server GC, see Server GC configuration examples.

### Worker class

As for the `Worker`, the template provides a simple implementation.

```csharp
﻿namespace App.WorkerService;

public sealed class Worker(ILogger<Worker> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken <example-value>)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
            await Task.Delay(1_000, stoppingToken);
        }
    }
}
```
The preceding `Worker` class is a subclass of `Microsoft.Extensions.Hosting.BackgroundService`, which implements `Microsoft.Extensions.Hosting.IHostedService`. The `Microsoft.Extensions.Hosting.BackgroundService` is an `abstract class` and requires the subclass to implement `Microsoft.Extensions.Hosting.BackgroundService.ExecuteAsync(System.Threading.CancellationToken)`. In the template implementation, the `ExecuteAsync` loops once per second, logging the current date and time until the process is signaled to cancel.

### The project file

The Worker template relies on the following project file `Sdk`:

```xml
<Project Sdk="Microsoft.NET.Sdk.Worker">
```

For more information, see .NET project SDKs.

### NuGet package

An app based on the Worker template uses the `Microsoft.NET.Sdk.Worker` SDK and has an explicit package reference to the Microsoft.Extensions.Hosting package.

### Containers and cloud adaptability

With most modern .NET workloads, containers are a viable option. When creating a long-running service from the Worker template in Visual Studio, you can opt in to **Docker support**. Doing so creates a *Dockerfile* that containerizes your .NET app. A *Dockerfile* is a set of instructions to build an image. For .NET apps, the *Dockerfile* usually sits in the root of the directory next to a solution file.

```dockerfile
# See https://aka.ms/containerfastmode to understand how Visual Studio uses this
# Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/runtime:8.0@sha256:e6b552fd7a0302e4db30661b16537f7efcdc0b67790a47dbf67a5e798582d3a5 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0@sha256:35792ea4ad1db051981f62b313f1be3b46b1f45cadbaa3c288cd0d3056eefb83 AS build
WORKDIR /src
COPY ["background-service/App.WorkerService.csproj", "background-service/"]
RUN dotnet restore "background-service/App.WorkerService.csproj"
COPY . .
WORKDIR "/src/background-service"
RUN dotnet build "App.WorkerService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "App.WorkerService.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "App.WorkerService.dll"]
```
The preceding *Dockerfile* steps include:

- Setting the base image from `mcr.microsoft.com/dotnet/runtime:8.0` as the alias `base`.
- Changing the working directory to */app*.
- Setting the `build` alias from the `mcr.microsoft.com/dotnet/sdk:8.0` image.
- Changing the working directory to */src*.
- Copying the contents and publishing the .NET app:
  - The app is published using the `dotnet publish` command.
- Re-layering the .NET SDK image from `mcr.microsoft.com/dotnet/runtime:8.0` (the `base` alias).
- Copying the published build output from the */publish*.
- Defining the entry point, which delegates to `dotnet App.BackgroundService.dll`.

> **Tip:**
> The MCR in `mcr.microsoft.com` stands for "Microsoft Container Registry", and is Microsoft's syndicated container catalog from the official Docker hub. The Microsoft syndicates container catalog article contains additional details.

When you target Docker as a deployment strategy for your .NET Worker Service, there are a few considerations in the project file:

```xml
<Project Sdk="Microsoft.NET.Sdk.Worker">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>true</ImplicitUsings>
    <RootNamespace>App.WorkerService</RootNamespace>
    <DockerDefaultTargetOS>Linux</DockerDefaultTargetOS>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Hosting" Version="10.0.13" />
    <PackageReference Include="Microsoft.VisualStudio.Azure.Containers.Tools.targets" Version="1.23.0" />
  </ItemGroup>
</Project>
```
In the preceding project file, the `<DockerDefaultTargetOS>` element specifies `Linux` as its target. To target Windows containers, use `Windows` instead. The `Microsoft.VisualStudio.Azure.Containers.Tools.Targets` NuGet package is automatically added as a package reference when **Docker support** is selected from the template.

For more information on Docker with .NET, see Tutorial: Containerize a .NET app. For more information on deploying to Azure, see Tutorial: Deploy a Worker Service to Azure.

> **Important:**
> If you want to leverage *User Secrets* with the Worker template, you'd have to explicitly reference the `Microsoft.Extensions.Configuration.UserSecrets` NuGet package.

## Hosted Service extensibility

The `Microsoft.Extensions.Hosting.IHostedService` interface defines two methods:

- `Microsoft.Extensions.Hosting.IHostedService.StartAsync(System.Threading.CancellationToken)`
- `Microsoft.Extensions.Hosting.IHostedService.StopAsync(System.Threading.CancellationToken)`

These two methods serve as *lifecycle* methods - they're called during host start and stop events respectively.

> **Note:**
> When overriding either `Microsoft.Extensions.Hosting.BackgroundService.StartAsync*` or `Microsoft.Extensions.Hosting.BackgroundService.StopAsync*` methods, you must call and `await` the `base` class method to ensure the service starts and/or shuts down properly.

> **Important:**
> The interface serves as a generic-type parameter constraint on the `Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)` extension method, meaning only implementations are permitted. You're free to use the provided `Microsoft.Extensions.Hosting.BackgroundService` with a subclass, or implement your own entirely.

## Signal completion

In most common scenarios, you don't need to explicitly signal the completion of a hosted service. When the host starts the services, they're designed to run until the host is stopped. In some scenarios, however, you might need to signal the completion of the entire host application when the service completes. To signal the completion, consider the following `Worker` class:

```csharp
﻿namespace App.SignalCompletionService;

public sealed class Worker(
    IHostApplicationLifetime hostApplicationLifetime,
    ILogger<Worker> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken <example-value>)
    {
        // TODO: implement single execution logic here.
        logger.LogInformation(
            "Worker running at: {Time}", DateTimeOffset.Now);

        await Task.Delay(1_000, stoppingToken);

        // When completed, the entire app host will stop.
        hostApplicationLifetime.StopApplication();
    }
}
```
In the preceding code, the `Microsoft.Extensions.Hosting.BackgroundService.ExecuteAsync(System.Threading.CancellationToken)` method doesn'<example-value>'s complete it calls `Microsoft.Extensions.Hosting.IHostApplicationLifetime.StopApplication`.

> **Important:**
> This will signal to the host that it should stop, and without this call to `StopApplication` the host will continue to run indefinitely. If you intend to run a short-lived hosted service (run once scenario), and you want to use the Worker template, you must call `StopApplication` to signal the host to stop.

For more information, see:

- .NET Generic Host: IHostApplicationLifetime
- .NET Generic Host: Host shutdown
- .NET Generic Host: Hosting shutdown process

### Alternative approach

For a short-lived app that needs dependency injection, logging, and configuration, use the .NET Generic Host instead of the Worker template. This lets you use these features without the `Worker` class. A simple example of a short-lived app using the generic host might define a project file like the following:

```xml
<Project Sdk="Microsoft.NET.Sdk.Worker">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>true</ImplicitUsings>
    <RootNamespace>ShortLived.App</RootNamespace>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Hosting" Version="10.0.13" />
  </ItemGroup>
</Project>
```
It's `Program` class might look something like the following:

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddSingleton<JobRunner>();

using var host = builder.Build();

try
{
    var runner = host.Services.GetRequiredService<JobRunner>();

    await runner.RunAsync();

    return 0; // success
}
catch (Exception ex)
{
    var logger = host.Services.GetRequiredService<ILogger<Program>>();
    
    logger.LogError(ex, "Unhandled exception occurred during job execution.");

    return 1; // failure
}
```
The preceding code creates a `JobRunner` service, which is a custom class that contains the logic for the job to run. The `RunAsync` method is called on the `JobRunner`, and if it completes successfully, the app returns `0`. If an unhandled exception occurs, it logs the error and returns `1`.

In this simple scenario, the `JobRunner` class could look like this:

```csharp
using Microsoft.Extensions.Logging;

internal sealed class JobRunner(ILogger<JobRunner> logger)
{
    public async Task RunAsync()
    {
        logger.LogInformation("Starting job...");

        // Simulate work
        await Task.Delay(1000);

        // Simulate failure
        // throw new InvalidOperationException("Something went wrong!");

        logger.LogInformation("Job completed successfully.");
    }
}
```
You'd obviously need to add real logic to the `RunAsync` method, but this example demonstrates how to use the generic host for a short-lived app without the need for a `Worker` class, and without the need for explicitly signaling the completion of the host.
