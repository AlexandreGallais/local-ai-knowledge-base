---
title: "Dependency injection auto-activation"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/dependency-injection/auto-activation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Dependency injection auto-activation

The 📦 `Microsoft.Extensions.DependencyInjection.AutoActivation` NuGet package provides functionality to automatically activate singleton services at application startup, rather than waiting for their first use. This approach can help minimize latency for initial requests by ensuring services are ready to handle requests immediately when the application starts.

## When to use auto-activation

Auto-activation is beneficial in scenarios where:

- You want to minimize the latency of the first request by avoiding the overhead of lazy initialization.
- Services need to perform initialization work at startup, such as warming up caches or establishing connections.
- You want consistent response times from the start of your application's lifetime.
- Services have expensive constructors that you want to execute during startup rather than during request processing.

## Get started

To get started with auto-activation, install the `Microsoft.Extensions.DependencyInjection.AutoActivation` NuGet package.

### .NET CLI

```dotnetcli
dotnet add package Microsoft.Extensions.DependencyInjection.AutoActivation
```

### PackageReference

```xml
<PackageReference Include="Microsoft.Extensions.DependencyInjection.AutoActivation" Version="10.0.0" />
```

---

For more information, see dotnet add package or Manage package dependencies in .NET applications.

## Register services for auto-activation

The auto-activation package provides extension methods to register services that are automatically activated when the service provider is built. There are several ways to register services for auto-activation:

### AddActivatedSingleton

The `Microsoft.Extensions.DependencyInjection.AutoActivationExtensions.AddActivatedSingleton*` method registers a service as a singleton and ensures it's activated at startup:

```csharp
using Microsoft.Extensions.DependencyInjection;

var services = new ServiceCollection();

services.AddActivatedSingleton<MyService>();

ServiceProvider provider = services.BuildServiceProvider();
```

In this example, `MyService` is instantiated when `BuildServiceProvider()` is called, not when it's first requested from the service provider.

### ActivateSingleton

The `Microsoft.Extensions.DependencyInjection.AutoActivationExtensions.ActivateSingleton*` method marks an already-registered singleton service for activation at startup:

```csharp
using Microsoft.Extensions.DependencyInjection;

var services = new ServiceCollection();

services.AddSingleton<MyService>();
services.ActivateSingleton<MyService>();

ServiceProvider provider = services.BuildServiceProvider();
```

This approach is useful when you have existing service registrations that you want to activate at startup without changing the registration code.

### TryAddActivatedSingleton

The `Microsoft.Extensions.DependencyInjection.AutoActivationExtensions.TryAddActivatedSingleton*` method conditionally registers a service for auto-activation only if it hasn't been registered already:

```csharp
using Microsoft.Extensions.DependencyInjection;

var services = new ServiceCollection();

services.TryAddActivatedSingleton<MyService>();
services.TryAddActivatedSingleton<MyService>(); // This has no effect

ServiceProvider provider = services.BuildServiceProvider();
```

This method follows the same pattern as other `TryAdd*` methods in the dependency injection framework, ensuring services are only registered once.

## Complete example

Here's a complete example showing how to use auto-activation in a console application:

```csharp
public class CacheWarmer
{
    public CacheWarmer()
    {
        Console.WriteLine("Warming up cache at startup...");
        // Perform expensive initialization
        WarmUpCache();
    }

    private void WarmUpCache()
    {
        // Cache warming logic here
        Console.WriteLine("Cache warmed up successfully!");
    }
}
```
When this application starts, you'll see the messages from the `CacheWarmer` constructor printed before the application begins processing requests, confirming that the service was activated at startup.

## Auto-activation with dependencies

Auto-activated services can depend on other services through dependency injection:

```csharp
public class StartupTaskRunner
{
    private readonly ILogger<StartupTaskRunner> _logger;

    public StartupTaskRunner(ILogger<StartupTaskRunner> logger)
    {
        _logger = logger;
        _logger.LogInformation("Running startup tasks...");
        RunTasks();
    }

    private void RunTasks()
    {
        // Execute startup tasks
        _logger.LogInformation("Startup tasks completed.");
    }
}
```
In this example, the `StartupTaskRunner` service depends on `ILogger<StartupTaskRunner>`, which is automatically provided by the dependency injection container.

## Best practices

When using auto-activation, consider the following best practices:

- **Use for singletons only**: Auto-activation is designed for singleton services. Services with shorter lifetimes (scoped or transient) should not be auto-activated.
- **Keep startup fast**: Auto-activated services should complete their initialization quickly to avoid delaying application startup. For longer-running initialization, consider using background services or hosted services.
- **Handle errors gracefully**: Exceptions thrown during the construction of auto-activated services will prevent the application from starting. Ensure robust error handling in service constructors.
- **Consider hosted services**: For services that need to perform ongoing work or asynchronous initialization, consider using `Microsoft.Extensions.Hosting.IHostedService` instead of auto-activation.

## See also

- Dependency injection in .NET
- Dependency injection guidelines
- Worker Services in .NET
