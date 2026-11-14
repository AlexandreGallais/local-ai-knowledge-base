---
title: "Dependency injection in ASP.NET Core (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/dependency-injection.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Dependency injection in ASP.NET Core

By Kirk Larkin, Steve Smith, and Brandon Dahler

ASP.NET Core supports the dependency injection (DI) software design pattern, which is a technique for achieving Inversion of Control (IoC) between classes and their dependencies.

This article provides information on DI in ASP.NET Core web apps. For information on DI in all types of apps, including apps other than web apps, see Dependency injection in .NET.

Guidance that adds to or supersedes the guidance in this article is found the following articles:

* ASP.NET Core Blazor dependency injection
* Dependency injection into controllers in ASP.NET Core
* Use DI services to configure options

Code examples in this article are based on Blazor. To see Razor Pages examples, see the 7.0 version of this article.

View or download sample code (how to download)

When using the sample code in this article in a local Blazor Web App for demonstration purposes, adopt an interactive render mode.

## Overview of dependency injection

A *dependency* is an object that another object depends on. Consider the following `MyDependency` class with a `WriteMessage` method:

```csharp
public class MyDependency
{
    public void WriteMessage(string message)
    {
        Console.WriteLine($"MyDependency.WriteMessage: {message}");
    }
}
```

A class can create an instance of the `MyDependency` class to call its `WriteMessage` method. In the following example, the `MyDependency` class is a dependency of a Razor component.

`Pages/DependencyExample1.razor`:

```razor
@page "/dependency-example-1"

<button @onclick="WriteMessage">Write message</button>

@code {
    private readonly MyDependency dependency = new MyDependency();

    private void WriteMessage() =>
        dependency.WriteMessage("DependencyExample1.WriteMessage called");
}
```

The consuming class creates and directly depends on the `MyDependency` class. Taking a direct dependency, such as in the previous example, is problematic and should be avoided for the following reasons:

* To replace `MyDependency` with a different implementation while retaining `MyDependency` in the app, the consuming class must be modified. This situation is made worse when `MyDependency` is also a direct dependency of several other classes: All of the direct dependencies on `MyDependency` in the app must be changed.
* If `MyDependency` has dependencies, they must also be configured by the consuming class. In a large project with multiple classes depending on `MyDependency`, the configuration code becomes scattered around the app.
* The consuming class is difficult to unit test because it directly creates `MyDependency`, making it difficult to substitute a custom service for testing, such as an in-memory database or a different database provider.

DI addresses these problems through:

* The use of an interface or base class to abstract the dependency implementation.
* Registration of the dependency in a *service container*, also called a *DI container*. ASP.NET Core provides a built-in service container, `System.IServiceProvider`. Services are typically registered in the app's `Program` file (.NET 6 or later) or the app's `Startup` file (.NET 5 or earlier).
* *Injection* of the service into classes where it's used. The framework creates instances of dependencies and disposes of them when they're no longer required.

In the following example, the `IMyDependency` interface defines the `WriteMessage` method signature.

`Interfaces/IMyDependency.cs`:

```csharp
public interface IMyDependency
{
    void WriteMessage(string message);
}
```

The preceding interface is implemented by the following concrete type, `MyDependency`.

`Services/MyDependency.cs`:

```csharp
public class MyDependency : IMyDependency
{
    public void WriteMessage(string message)
    {
        Console.WriteLine($"MyDependency.WriteMessage: {message}");
    }
}
```

The app registers the `IMyDependency` service with the concrete type `MyDependency` where services are added to the service container, usually either in the `Program` file (.NET 6 or later) or `Startup.ConfigureServices` method (.NET 5 or earlier). The `Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddScoped*` method registers the service with a scoped lifetime, which is the lifetime of a Blazor circuit (.NET 8 or later) or a single request in an MVC or Razor Pages app. Service lifetimes are described later in this article.

```csharp
builder.Services.AddScoped<IMyDependency, MyDependency>();
```

The `IMyDependency` service is requested and used to call the `WriteMessage` method, as the following Razor component demonstrates.

`Pages/DependencyExample2.razor`:

```razor
@page "/dependency-example-2"
@inject IMyDependency Dependency

<button @onclick="WriteMessage">Write message</button>

@code {
    private void WriteMessage() =>
        Dependency.WriteMessage("DependencyExample2.WriteMessage called");
}
```

By using the DI pattern, the class that consumes the dependency:

* Doesn't use the concrete type `MyDependency`, only the `IMyDependency` interface it implements. That makes it easy to change the implementation without modifying the consumer.
* Doesn't directly create an instance of `MyDependency` or dispose of it. The dependency is created and disposed by the service container.

The `IMyDependency` interface implementation can be improved by using the built-in logging API, which is injected as a dependency in the following example.

`Services/MyDependency.cs`:

```csharp
public class MyDependency(ILogger<MyDependency> logger) : IMyDependency
{
    public void WriteMessage(string message)
    {
        logger.LogInformation($"MyDependency.WriteMessage: {message}");
    }
}
```

`MyDependency` depends on `Microsoft.Extensions.Logging.ILogger`1`, a framework-provided service.

It's common to use DI in a chained fashion. Each requested dependency in turn requests its own dependencies. The container resolves the dependencies in the graph and returns the fully resolved service. The collective set of dependencies that must be resolved is typically referred to as a *dependency tree*, *dependency graph*, or *object graph*.

The container resolves `Microsoft.Extensions.Logging.ILogger`1` by taking advantage of (generic) open types, eliminating the need to register every (generic) constructed type.

In DI terminology, a service:

* Is typically an object that provides a service to other objects, such as the preceding `IMyDependency` service.
* Isn't related to a web service, although the service might use a web service.

The `IMyDependency` implementations shown in the preceding examples were written to demonstrate general DI principles, not to implement logging. Most apps shouldn't need to create loggers, as the preceding examples show. The following code demonstrates directly using the framework's built-in logging API, which doesn't require the registration of a custom service (`IMyDependency`).

`Pages/LoggingExample.razor`:

```razor
@page "/logging-example"
@inject ILogger<LoggingExample> Logger

<button @onclick="WriteMessage">Write message</button>

@code {
    private void WriteMessage() =>
        Logger.LogInformation("LoggingExample.WriteMessage called");
}
```

## Service registration methods

For general guidance on service registrations, see Service registration.

It's common to use multiple implementations when mocking types for testing. For more information, see Integration tests in ASP.NET Core.

Registering a service with only an implementation type is equivalent to registering the service with the same implementation and service type:

```csharp
builder.Services.AddSingleton<MyDependency>();
```

Service registration methods can be used to register multiple service instances of the same service type. In the following example, `Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddSingleton*` is called twice with `IMyDependency` as the service type. The second call to `AddSingleton` overrides the previous one when resolved as `IMyDependency` and adds to the previous one when multiple services are resolved via `IEnumerable<IMyDependency>`.

```csharp
builder.Services.AddSingleton<IMyDependency, MyDependency>();
builder.Services.AddSingleton<IMyDependency, DifferentDependency>();

public class MyService
{
    public MyService(IMyDependency myDependency,
       IEnumerable<IMyDependency> myDependencies)
    {
        Trace.Assert(myDependency is DifferentDependency);

        var dependencyArray = myDependencies.ToArray();
        Trace.Assert(dependencyArray[0] is MyDependency);
        Trace.Assert(dependencyArray[1] is DifferentDependency);
    }
}
```

## Register groups of services with extension methods

The ASP.NET Core framework convention for registering a group of related services is to use a single `Add{GROUP NAME}` extension method to register all of the services required by a framework feature, where the `{GROUP NAME}` placeholder is a descriptive group name. For example, the `Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents*` extension method registers services required for server-side rendering of Razor components.

Consider the following example that configures options and registers services:

```csharp
builder.Services.Configure<PositionOptions>(
    builder.Configuration.GetSection(PositionOptions.Position));
builder.Services.Configure<ColorOptions>(
    builder.Configuration.GetSection(ColorOptions.Color));

builder.Services.AddScoped<IMyDependency, MyDependency>();
builder.Services.AddScoped<IMyDependency2, MyDependency2>();
```

Related groups of registrations can be moved to an extension method to register services. In the following example:

* The `AddConfig` extension method binds configuration data to strongly-typed C# classes and registers the classes in the service container.
* The `AddDependencyGroup` extension method adds additional class (service) dependencies.

```csharp
namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigServiceCollectionExtensions
{
    public static IServiceCollection AddConfig(
        this IServiceCollection services, IConfiguration config)
    {
        services.Configure<PositionOptions>(
            config.GetSection(PositionOptions.Position));
        services.Configure<ColorOptions>(
            config.GetSection(ColorOptions.Color));

        return services;
    }

    public static IServiceCollection AddDependencyGroup(
        this IServiceCollection services)
    {
        services.AddScoped<IMyDependency, MyDependency>();
        services.AddScoped<IMyDependency2, MyDependency2>();

        return services;
    }
}
```

The following code calls the preceding `AddConfig` and `AddDependencyGroup` extension methods to register the services:

```csharp
builder.Services
    .AddConfig(builder.Configuration)
    .AddDependencyGroup();
```

We recommend that apps follow the naming convention of creating extension methods in the `Microsoft.Extensions.DependencyInjection` namespace, which:

* Encapsulates groups of service registrations.
* Provides convenient IntelliSense access to the service.

## Service lifetimes

For general guidance on service lifetimes, see Service lifetimes. For additional service lifetime guidance that applies to Blazor apps, see ASP.NET Core Blazor dependency injection.

To use scoped services in middleware, use one of the following approaches:

* Inject the service into the middleware's `Invoke` or `InvokeAsync` method. Using constructor injection throws a runtime exception because it forces the scoped service to behave like a singleton. The sample in the Lifetime and registration options section demonstrates the `InvokeAsync` approach.
* Use factory-based middleware. Middleware registered using this approach is activated per client request (connection), which allows scoped services to be injected into the middleware's constructor.

For more information, see the following resources:

* Write custom ASP.NET Core middleware
* For more information on using keyed services with Razor components, see ASP.NET Core Blazor dependency injection.
