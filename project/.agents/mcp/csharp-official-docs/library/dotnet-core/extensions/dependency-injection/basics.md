---
title: "Dependency injection basics quickstart"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/dependency-injection/basics.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Quickstart: Dependency injection basics in .NET

In this quickstart, you create a .NET console app that manually creates a `Microsoft.Extensions.DependencyInjection.ServiceCollection` and corresponding `Microsoft.Extensions.DependencyInjection.ServiceProvider`. You learn how to register services and resolve them by using dependency injection (DI). This article uses the Microsoft.Extensions.DependencyInjection NuGet package to demonstrate the basics of DI in .NET.

> **Note:**
> This article doesn't take advantage of the Generic host features. For a more comprehensive guide, see Use dependency injection in .NET.

## Get started

To get started, create a new .NET console application named **DI.Basics**. In Visual Studio, choose **File > New > Project**, or using the .NET CLI, enter `dotnet new console`.

Next, add a package reference to the Microsoft.Extensions.DependencyInjection in the project file. After you add the package, ensure the project resembles the following XML of the _DI.Basics.csproj_ file:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.DependencyInjection" Version="10.0.13" />
  </ItemGroup>

</Project>
```
## Dependency injection basics

Dependency injection is a design pattern that you can use to remove hard-coded dependencies and make your application more maintainable and testable. DI is a technique for achieving Inversion of Control (IoC) between classes and their dependencies.

The Microsoft.Extensions.DependencyInjection.Abstractions NuGet package defines the abstractions for DI in .NET:

- `Microsoft.Extensions.DependencyInjection.IServiceCollection`: Defines a contract for a collection of service descriptors.
- `System.IServiceProvider`: Defines a mechanism for retrieving a service object.
- `Microsoft.Extensions.DependencyInjection.ServiceDescriptor`: Describes a service with its service type, implementation, and lifetime.

In .NET, you manage DI by adding services and configuring them in an `IServiceCollection`. After you register services, call the `Microsoft.Extensions.DependencyInjection.ServiceCollectionContainerBuilderExtensions.BuildServiceProvider*` method to build an `IServiceProvider` instance. The `IServiceProvider` acts as a container for all the registered services, and you use it to resolve services.

## Create example services

Not all services are created equally. Some services require a new instance each time that the service container gets them (_transient_), while others should be shared across requests (_scoped_) or for the entire lifetime of the app (_singleton_). For more information on service lifetimes, see Service lifetimes.

Likewise, some services only expose a concrete type, while others are expressed as a contract between an interface and an implementation type. You create several variations of services to help demonstrate these concepts.

Create a new C# file named _IConsole.cs_ and add the following code:

```csharp
﻿public interface IConsole
{
    void WriteLine(string message);
}
```
This file defines an `IConsole` interface that exposes a single method, `WriteLine`. Next, create a new C# file named _DefaultConsole.cs_ and add the following code:

```csharp
﻿internal sealed class DefaultConsole : IConsole
{
    public bool IsEnabled { get; set; } = true;

    void IConsole.WriteLine(string message)
    {
        if (IsEnabled is false)
        {
            return;
        }

        Console.WriteLine(message);
    }
}
```
The preceding code represents the default implementation of the `IConsole` interface. The `WriteLine` method conditionally writes to the console based on the `IsEnabled` property.

> **Tip:**
> The naming of an implementation is a choice that your dev team should agree on. The `Default` prefix is a common convention to indicate a _default_ implementation of an interface, but it's _not_ required.

Next, create an _IGreetingService.cs_ file and add the following C# code:

```csharp
﻿public interface IGreetingService
{
    string Greet(string name);
}
```
Then add a new C# file named _DefaultGreetingService.cs_ and add the following code:

```csharp
﻿internal sealed class DefaultGreetingService(
    IConsole console) : IGreetingService
{
    public string Greet(string name)
    {
        var greeting = $"Hello, {name}!";

        console.WriteLine(greeting);

        return greeting;
    }
}
```
The preceding code represents the default implementation of the `IGreetingService` interface. The service implementation requires an `IConsole` as a primary constructor parameter. The `Greet` method:

- Creates a `greeting` given the `name`.
- Calls the `WriteLine` method on the `IConsole` instance.
- Returns the `greeting` to the caller.

The `DefaultGreetingService` class demonstrates that you can `seal` service implementations to prevent inheritance and use `internal` to restrict access to the assembly.

The last service to create is the _FarewellService.cs_ file. Add the following C# code before continuing:

```csharp
﻿public class FarewellService(IConsole console)
{
    public string SayGoodbye(string name)
    {
        var farewell = $"Goodbye, {name}!";

        console.WriteLine(farewell);

        return farewell;
    }
}
```
The `FarewellService` represents a concrete type, not an interface. You should declare it as `public` to make it accessible to consumers. Unlike other service implementation types that you declare as `internal` and `sealed`, this code demonstrates that not all services need to be interfaces.

## Update the `Program` class

Open the _Program.cs_ file and replace the existing code with the following C# code:

```csharp
﻿using Microsoft.Extensions.DependencyInjection;

// 1. Create the service collection.
var services = new ServiceCollection();

// 2. Register (add and configure) the services.
services.AddSingleton<IConsole>(
    implementationFactory: static _ => new DefaultConsole
    {
        IsEnabled = true
    });
services.AddSingleton<IGreetingService, DefaultGreetingService>();
services.AddSingleton<FarewellService>();

// 3. Build the service provider from the service collection.
var serviceProvider = services.BuildServiceProvider();

// 4. Resolve the services that you need.
var greetingService = serviceProvider.GetRequiredService<IGreetingService>();
var farewellService = serviceProvider.GetRequiredService<FarewellService>();

// 5. Use the services
var greeting = greetingService.Greet("David");
var farewell = farewellService.SayGoodbye("David");
```
The preceding code demonstrates how to:

- Create a new `ServiceCollection` instance.
- Register and configure services in the `ServiceCollection`:
  - The `IConsole` service by using the implementation factory overload. Return a `DefaultConsole` type with the `IsEnabled` property set to `true`.
  - The `IGreetingService` service with a corresponding implementation type of `DefaultGreetingService`.
  - The `FarewellService` service as a concrete type.
- Build the `ServiceProvider` from the `ServiceCollection`.
- Resolve the `IGreetingService` and `FarewellService` services.
- Use the resolved services to greet and say goodbye to a person named `David`.

If you update the `IsEnabled` property of the `DefaultConsole` to `false`, the `Greet` and `SayGoodbye` methods omit writing the resulting messages to the console. This change helps demonstrate that the `IConsole` service is _injected_ into the `IGreetingService` and `FarewellService` services as a _dependency_ that influences the app's behavior.

All of these services are registered as singletons. For this sample, it works identically if you register them as _transient_ or _scoped_ services.

> **Important:**
> In this contrived example, the service lifetimes don't matter. In a real-world application, carefully consider the lifetime of each service.

## Run the sample app

To run the sample app, either press `F5` in Visual Studio or Visual Studio Code, or run the `dotnet run` command in the terminal. When the app completes, you see the following output:

```console
Hello, David!
Goodbye, David!
```

### Service descriptors

The most commonly used APIs for adding services to the `ServiceCollection` are lifetime-named generic extension methods, such as:

- `AddSingleton<TService>`
- `AddTransient<TService>`
- `AddScoped<TService>`

These methods are convenience methods that create a `Microsoft.Extensions.DependencyInjection.ServiceDescriptor` instance and add it to the `ServiceCollection`. The `ServiceDescriptor` is a simple class that describes a service with its service type, implementation type, and lifetime. It can also describe implementation factories and instances.

For each service that you registered in the `ServiceCollection`, you could instead call the `Add` method with a `ServiceDescriptor` instance directly. Consider the following examples:

```csharp
services.Add(ServiceDescriptor.Describe(
    serviceType: typeof(IConsole),
    implementationFactory: static _ => new DefaultConsole
    {
        IsEnabled = true
    },
    lifetime: ServiceLifetime.Singleton));
```
The preceding code is equivalent to how the `IConsole` service was registered in the `ServiceCollection`. The `Add` method adds a `ServiceDescriptor` instance that describes the `IConsole` service. The static method `ServiceDescriptor.Describe` delegates to various `ServiceDescriptor` constructors. Consider the equivalent code for the `IGreetingService` service:

```csharp
services.Add(ServiceDescriptor.Describe(
    serviceType: typeof(IGreetingService),
    implementationType: typeof(DefaultGreetingService),
    lifetime: ServiceLifetime.Singleton));
```
The preceding code describes the `IGreetingService` service with its service type, implementation type, and lifetime. Finally, consider the equivalent code for the `FarewellService` service:

```csharp
services.Add(ServiceDescriptor.Describe(
    serviceType: typeof(FarewellService),
    implementationType: typeof(FarewellService),
    lifetime: ServiceLifetime.Singleton));
```
The preceding code describes the concrete `FarewellService` type as both the service and implementation types. The service is registered as a singleton service.

## See also

- .NET dependency injection
- Dependency injection guidelines
- Dependency injection in ASP.NET Core
