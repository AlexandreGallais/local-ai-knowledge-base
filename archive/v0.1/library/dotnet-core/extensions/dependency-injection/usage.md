---
title: "Use dependency injection"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/dependency-injection/usage.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Tutorial: Use dependency injection in .NET

This tutorial shows how to use dependency injection (DI) in .NET. DI is managed by adding services and configuring them in an `Microsoft.Extensions.DependencyInjection.IServiceCollection`. The `Microsoft.Extensions.Hosting.IHost` interface exposes the `System.IServiceProvider` instance, which acts as a container of all the registered services.

In this tutorial, you learn how to:

>
> - Create a .NET console app that uses dependency injection.
> - Build and configure a Generic host.
> - Write several interfaces and corresponding implementations.
> - Use service lifetime and scoping for DI.

## Prerequisites

- .NET Core 8.0 SDK or later.
- Familiarity with creating new .NET applications and installing NuGet packages.

## Create a new console application

Using either the dotnet new command or an IDE new project wizard, create a new .NET console application named **ConsoleDI.Example**. Add the Microsoft.Extensions.Hosting NuGet package to the project.

Your new console app project file should resemble the following:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>true</ImplicitUsings>
    <RootNamespace>ConsoleDI.Example</RootNamespace>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Configuration.Binder" Version="10.0.13" />
    <PackageReference Include="Microsoft.Extensions.Hosting" Version="10.0.13" />
  </ItemGroup>

</Project>
```
> **Important:**
> In this example, the Microsoft.Extensions.Hosting NuGet package is required to build and run the app. Some metapackages might contain the `Microsoft.Extensions.Hosting` package, in which case an explicit package reference isn't required.

## Add interfaces

In this sample app, you learn how dependency injection handles service lifetime. You create several interfaces that represent different service lifetimes. Add the following interfaces to the project root directory:

*IReportServiceLifetime.cs*

```csharp
﻿using Microsoft.Extensions.DependencyInjection;

namespace ConsoleDI.Example;

public interface IReportServiceLifetime
{
    Guid Id { get; }

    ServiceLifetime Lifetime { get; }
}
```
The `IReportServiceLifetime` interface defines:

- A `Guid Id` property that represents the unique identifier of the service.
- A `Microsoft.Extensions.DependencyInjection.ServiceLifetime` property that represents the service lifetime.

*IExampleTransientService.cs*

```csharp
﻿using Microsoft.Extensions.DependencyInjection;

namespace ConsoleDI.Example;

public interface IExampleTransientService : IReportServiceLifetime
{
    ServiceLifetime IReportServiceLifetime.Lifetime => ServiceLifetime.Transient;
}
```
*IExampleScopedService.cs*

```csharp
﻿using Microsoft.Extensions.DependencyInjection;

namespace ConsoleDI.Example;

public interface IExampleScopedService : IReportServiceLifetime
{
    ServiceLifetime IReportServiceLifetime.Lifetime => ServiceLifetime.Scoped;
}
```
*IExampleSingletonService.cs*

```csharp
﻿using Microsoft.Extensions.DependencyInjection;

namespace ConsoleDI.Example;

public interface IExampleSingletonService : IReportServiceLifetime
{
    ServiceLifetime IReportServiceLifetime.Lifetime => ServiceLifetime.Singleton;
}
```
All of the subinterfaces of `IReportServiceLifetime` explicitly implement the `IReportServiceLifetime.Lifetime` with a default. For example, `IExampleTransientService` explicitly implements `IReportServiceLifetime.Lifetime` with the `ServiceLifetime.Transient` value.

## Add default implementations

The example implementations all initialize their `Id` property with the result of `System.Guid.NewGuid`. Add the following default implementation classes for the various services to the project root directory:

*ExampleTransientService.cs*

```csharp
﻿namespace ConsoleDI.Example;

internal sealed class ExampleTransientService : IExampleTransientService
{
    Guid IReportServiceLifetime.Id { get; } = Guid.NewGuid();
}
```
*ExampleScopedService.cs*

```csharp
﻿namespace ConsoleDI.Example;

internal sealed class ExampleScopedService : IExampleScopedService
{
    Guid IReportServiceLifetime.Id { get; } = Guid.NewGuid();
}
```
*ExampleSingletonService.cs*

```csharp
﻿namespace ConsoleDI.Example;

internal sealed class ExampleSingletonService : IExampleSingletonService
{
    Guid IReportServiceLifetime.Id { get; } = Guid.NewGuid();
}
```
Each implementation is defined as `internal sealed` and implements its corresponding interface. They're not required to be `internal` or `sealed`, however, it's common to treat implementations as `internal` to avoid leaking implementation types to external consumers. Furthermore, since each type isn't extended, it's marked as `sealed`. For example, `ExampleSingletonService` implements `IExampleSingletonService`.

## Add a service that requires DI

Add the following service lifetime reporter class, which acts as a service to the console app:

*ServiceLifetimeReporter.cs*

```csharp
﻿namespace ConsoleDI.Example;

internal sealed class ServiceLifetimeReporter(
    IExampleTransientService transientService,
    IExampleScopedService scopedService,
    IExampleSingletonService singletonService)
{
    public void ReportServiceLifetimeDetails(string lifetimeDetails)
    {
        Console.WriteLine(lifetimeDetails);

        LogService(transientService, "Always different");
        LogService(scopedService, "Changes only with lifetime");
        LogService(singletonService, "Always the same");
    }

    private static void LogService<T>(T service, string message)
        where T : IReportServiceLifetime =>
        Console.WriteLine(
            $"    {typeof(T).Name}: {service.Id} ({message})");
}
```
The `ServiceLifetimeReporter` defines a constructor that requires each of the aforementioned service interfaces, that is, `IExampleTransientService`, `IExampleScopedService`, and `IExampleSingletonService`. The object exposes a single method that allows the consumer to report on the service with a given `lifetimeDetails` parameter. When invoked, the `ReportServiceLifetimeDetails` method logs each service's unique identifier with the service lifetime message. The log messages help to visualize the service lifetime.

## Register services for DI

Update *Program.cs* with the following code:

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ConsoleDI.Example;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Services.AddTransient<IExampleTransientService, ExampleTransientService>();
builder.Services.AddScoped<IExampleScopedService, ExampleScopedService>();
builder.Services.AddSingleton<IExampleSingletonService, ExampleSingletonService>();
builder.Services.AddTransient<ServiceLifetimeReporter>();

using IHost host = builder.Build();

ExemplifyServiceLifetime(host.Services, "Lifetime 1");
ExemplifyServiceLifetime(host.Services, "Lifetime 2");

await host.RunAsync();

static void ExemplifyServiceLifetime(IServiceProvider hostProvider, string lifetime)
{
    using IServiceScope serviceScope = hostProvider.CreateScope();
    IServiceProvider provider = serviceScope.ServiceProvider;
    ServiceLifetimeReporter logger = provider.GetRequiredService<ServiceLifetimeReporter>();
    logger.ReportServiceLifetimeDetails(
        $"{lifetime}: Call 1 to provider.GetRequiredService<ServiceLifetimeReporter>()");

    Console.WriteLine("...");

    logger = provider.GetRequiredService<ServiceLifetimeReporter>();
    logger.ReportServiceLifetimeDetails(
        $"{lifetime}: Call 2 to provider.GetRequiredService<ServiceLifetimeReporter>()");

    Console.WriteLine();
}
```
Each `services.Add{LIFETIME}<{SERVICE}>` extension method adds (and potentially configures) services. We recommend that apps follow this convention. Don't place extension methods in the `Microsoft.Extensions.DependencyInjection` namespace unless you're authoring an official Microsoft package. Extension methods that are defined within the `Microsoft.Extensions.DependencyInjection` namespace:

- Are displayed in IntelliSense without requiring more `using` directives.
- Reduce the number of required `using` directives in the `Program` or `Startup` classes where these extension methods are typically called.

The app:

- Creates an `Microsoft.Extensions.Hosting.IHostApplicationBuilder` instance with host builder settings.
- Configures services and adds them with their corresponding service lifetime.
- Calls `Microsoft.Extensions.Hosting.IHostBuilder.Build` and assigns an instance of `Microsoft.Extensions.Hosting.IHost`.
- Calls `ExemplifyServiceLifetime`, passing in the `Microsoft.Extensions.Hosting.IHost.Services`.

## Conclusion

In this sample app, you created several interfaces and corresponding implementations. Each of these services is uniquely identified and paired with a `Microsoft.Extensions.DependencyInjection.ServiceLifetime`. The sample app demonstrates registering service implementations against an interface, and how to register pure classes without backing interfaces. The sample app then demonstrates how dependencies defined as constructor parameters are resolved at runtime.

When you run the app, it displays output similar to the following:

```csharp
// Sample output:
// Lifetime 1: Call 1 to provider.GetRequiredService<ServiceLifetimeReporter>()
//     IExampleTransientService: d08a27fa-87d2-4a06-98d7-2773af886125 (Always different)
//     IExampleScopedService: 402c83c9-b4ed-4be1-b78c-86be1b1d908d (Changes only with lifetime)
//     IExampleSingletonService: a61f1ff4-0b14-4508-bd41-21d852484a7b (Always the same)
// ...
// Lifetime 1: Call 2 to provider.GetRequiredService<ServiceLifetimeReporter>()
//     IExampleTransientService: b43d68fb-2c7b-4a9b-8f02-fc507c164326 (Always different)
//     IExampleScopedService: 402c83c9-b4ed-4be1-b78c-86be1b1d908d (Changes only with lifetime)
//     IExampleSingletonService: a61f1ff4-0b14-4508-bd41-21d852484a7b (Always the same)
// 
// Lifetime 2: Call 1 to provider.GetRequiredService<ServiceLifetimeReporter>()
//     IExampleTransientService: f3856b59-ab3f-4bbd-876f-7bab0013d392 (Always different)
//     IExampleScopedService: bba80089-1157-4041-936d-e96d81dd9d1c (Changes only with lifetime)
//     IExampleSingletonService: a61f1ff4-0b14-4508-bd41-21d852484a7b (Always the same)
// ...
// Lifetime 2: Call 2 to provider.GetRequiredService<ServiceLifetimeReporter>()
//     IExampleTransientService: a8015c6a-08cd-4799-9ec3-2f2af9cbbfd2 (Always different)
//     IExampleScopedService: bba80089-1157-4041-936d-e96d81dd9d1c (Changes only with lifetime)
//     IExampleSingletonService: a61f1ff4-0b14-4508-bd41-21d852484a7b (Always the same)
```
From the app output, you can see that:

- Transient services are always different. A new instance is created with every retrieval of the service.
- Scoped services change only with a new scope, but are the same instance within a scope.
- Singleton services are always the same. A new instance is only created once.

## See also

- Dependency injection guidelines
- Quickstart: Dependency injection basics
- Dependency injection in ASP.NET Core
