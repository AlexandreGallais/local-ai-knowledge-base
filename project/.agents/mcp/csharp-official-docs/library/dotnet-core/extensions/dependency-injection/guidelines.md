---
title: "Dependency injection guidelines (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/dependency-injection/guidelines.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Dependency injection guidelines

This article provides general guidelines and best practices for implementing dependency injection (DI) in .NET applications.

## Design services for dependency injection

When designing services for dependency injection:

- Avoid stateful, static classes and members. Avoid creating global state by designing apps to use singleton services instead.
- Avoid direct instantiation of dependent classes within services. Direct instantiation couples the code to a particular implementation.
- Make services small, well-factored, and easily tested.

If a class has many injected dependencies, it might be a sign that the class has too many responsibilities and violates the Single Responsibility Principle (SRP). Attempt to refactor the class by moving some of its responsibilities into new classes.

### Disposal of services

The container is responsible for cleanup of types it creates, and calls `System.IDisposable.Dispose*` on `System.IDisposable` (or `System.IAsyncDisposable.DisposeAsync*` on `System.IAsyncDisposable`) instances. Services resolved from the container should never be disposed by the developer. The container disposes services automatically based on their lifetime:

- **Transient** and **scoped** services are disposed at the end of the scope in which they were resolved. In apps that process requests, this is typically at the end of the request.
- **Singleton** services are disposed when the service container is disposed, usually at application shutdown.

In the following example, the services are created by the service container and disposed automatically:

```csharp
﻿namespace ConsoleDisposable.Example;

public sealed class TransientDisposable : IDisposable
{
    public void Dispose() => Console.WriteLine($"{nameof(TransientDisposable)}.Dispose()");
}
```
The preceding disposable is intended to have a transient lifetime.

```csharp
﻿namespace ConsoleDisposable.Example;

public sealed class ScopedDisposable : IDisposable
{
    public void Dispose() => Console.WriteLine($"{nameof(ScopedDisposable)}.Dispose()");
}
```
The preceding disposable is intended to have a scoped lifetime.

```csharp
﻿namespace ConsoleDisposable.Example;

public sealed class SingletonDisposable : IDisposable
{
    public void Dispose() => Console.WriteLine($"{nameof(SingletonDisposable)}.Dispose()");
}
```
The preceding disposable is intended to have a singleton lifetime.

```csharp
using ConsoleDisposable.Example;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Services.AddTransient<TransientDisposable>();
builder.Services.AddScoped<ScopedDisposable>();
builder.Services.AddSingleton<SingletonDisposable>();

using IHost host = builder.Build();

ExemplifyDisposableScoping(host.Services, "Scope 1");
Console.WriteLine();

ExemplifyDisposableScoping(host.Services, "Scope 2");
Console.WriteLine();

await host.RunAsync();

static void ExemplifyDisposableScoping(IServiceProvider services, string scope)
{
    Console.WriteLine($"{scope}...");

    using IServiceScope serviceScope = services.CreateScope();
    IServiceProvider provider = serviceScope.ServiceProvider;

    _ = provider.GetRequiredService<TransientDisposable>();
    _ = provider.GetRequiredService<ScopedDisposable>();
    _ = provider.GetRequiredService<SingletonDisposable>();
}
```
The debug console shows the following sample output after running:

```console
Scope 1...
ScopedDisposable.Dispose()
TransientDisposable.Dispose()

Scope 2...
ScopedDisposable.Dispose()
TransientDisposable.Dispose()

info: Microsoft.Hosting.Lifetime[0]
      Application started.Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
     Hosting environment: Production
info: Microsoft.Hosting.Lifetime[0]
     Content root path: .\configuration\console-di-disposable\bin\Debug\net5.0
info: Microsoft.Hosting.Lifetime[0]
     Application is shutting down...
SingletonDisposable.Dispose()
```

> **Note:**
> `Microsoft.Extensions.DependencyInjection.ServiceProvider.DisposeAsync` awaits each `System.IAsyncDisposable.DisposeAsync` with `ConfigureAwait(false)`, so continuations from disposal do not attempt to resume on the original synchronization context. Do not rely on disposal completing on any particular context.

### Services not created by the service container

Consider the following code:

```csharp
// Register example service in IServiceCollection.
builder.Services.AddSingleton(new ExampleService());
```

In the preceding code:

- The `ExampleService` instance is **not** created by the service container.
- The framework does **not** dispose of the services automatically.
- The developer is responsible for disposing the services.

### IDisposable guidance for transient and shared instances

#### Transient, limited lifetime

**Scenario**

The app requires an `System.IDisposable` instance with a transient lifetime for either of the following scenarios:

- The instance is resolved in the root scope (root container).
- The instance should be disposed before the scope ends.

**Solution**

Use the factory pattern to create an instance outside of the parent scope. In this situation, the app generally has a `Create` method that calls the final type's constructor directly. If the final type has other dependencies, the factory can:

- Receive an `System.IServiceProvider` in its constructor.
- Use `Microsoft.Extensions.DependencyInjection.ActivatorUtilities.CreateInstance*` to instantiate the instance outside of the container, while using the container for its dependencies.

#### Shared instance, limited lifetime

**Scenario**

The app requires a shared `System.IDisposable` instance across multiple services, but the `System.IDisposable` instance should have a limited lifetime.

**Solution**

Register the instance with a scoped lifetime. Use `Microsoft.Extensions.DependencyInjection.IServiceScopeFactory.CreateScope*` to create a new `Microsoft.Extensions.DependencyInjection.IServiceScope`. Use the scope's `System.IServiceProvider` to get required services. Dispose the scope when it's no longer needed.

#### General `IDisposable` guidelines

- Don't register `System.IDisposable` instances with a transient lifetime. Use the factory pattern instead so the solved service can be manually disposed when it's no longer in use.
- Don't resolve `System.IDisposable` instances with a transient or scoped lifetime in the root scope. The only exception to this is if the app creates or recreates and disposes `System.IServiceProvider`, but this isn't an ideal pattern.
- Receiving an `System.IDisposable` dependency via DI doesn't require that the receiver implement `System.IDisposable` itself. The receiver of the `System.IDisposable` dependency shouldn't call `System.IDisposable.Dispose*` on that dependency.
- Use scopes to control the lifetimes of services. Scopes aren't hierarchical, and there's no special connection among scopes.

For more information on resource cleanup, see Implement a `Dispose` method or Implement a `DisposeAsync` method. Additionally, consider the Disposable transient services captured by container scenario as it relates to resource cleanup.

## Default service container replacement

The built-in service container is designed to serve the needs of the framework and most consumer apps. We recommend using the built-in container unless you need a specific feature that it doesn't support, such as:

- Property injection
- Child containers
- Custom lifetime management
- `Func<T>` support for lazy initialization
- Convention-based registration

The following third-party containers can be used with ASP.NET Core apps:

- Autofac
- DryIoc
- Grace
- LightInject
- Lamar
- Stashbox
- Simple Injector

## Thread safety

Create thread-safe singleton services. If a singleton service has a dependency on a transient service, the transient service might also require thread safety depending on how it's used by the singleton. The factory method of a singleton service, such as the second argument to AddSingleton\<TService>(IServiceCollection, Func\<IServiceProvider,TService>), doesn't need to be thread-safe. Like a type (`static`) constructor, it's guaranteed to be called only once by a single thread.

Additionally, the process of resolving services from the built-in .NET dependency injection container is thread-safe.
Once an `IServiceProvider` or `IServiceScope` has been built, it's safe to resolve services concurrently from multiple threads.

> **Note:**
> Thread safety of the DI container itself only guarantees that constructing and resolving services is safe. It doesn't make the resolved service instances themselves thread-safe.
> Any service (especially singletons) that holds shared mutable state must implement its own synchronization logic if accessed concurrently.

## Recommendations

- `async/await` and `Task` based service resolution isn't supported. Because C# doesn't support asynchronous constructors, use asynchronous methods after synchronously resolving the service.
- Avoid storing data and configuration directly in the service container. For example, a user's shopping cart shouldn't typically be added to the service container. Configuration should use the options pattern. Similarly, avoid "data holder" objects that only exist to allow access to another object. It's better to request the actual item via DI.
- Avoid static access to services. For example, avoid capturing `Microsoft.AspNetCore.Builder.IApplicationBuilder.ApplicationServices` as a static field or property for use elsewhere.
- Keep DI factories fast and synchronous.
- Avoid using the *service locator pattern*. For example, don't invoke `System.IServiceProvider.GetService*` to obtain a service instance when you can use DI instead.
- Another service locator variation to avoid is injecting a factory that resolves dependencies at runtime. Both of these practices mix Inversion of Control strategies.
- Avoid calls to `Microsoft.Extensions.DependencyInjection.ServiceCollectionContainerBuilderExtensions.BuildServiceProvider*` when configuring services. Calling `BuildServiceProvider` typically happens when the developer wants to resolve a service when registering another service. Instead, use an overload that includes the `IServiceProvider` for this reason.
- Disposable transient services are captured by the container for disposal. This can turn into a memory leak if resolved from the top-level container.
- Enable scope validation to make sure the app doesn't have singletons that capture scoped services. For more information, see Scope validation.
- Only use singleton lifetime for services with their own state that is expensive to create or globally shared. Avoid using singleton lifetime for services that have no state themself. Most .NET IoC containers use "Transient" as the default scope. Considerations and drawbacks of singletons:
  - **Thread safety**: A singleton must be implemented in a thread-safe way.
  - **Coupling**: It can couple otherwise unrelated requests.
  - **Testing challenges**: Shared state and coupling can make unit testing more difficult.
  - **Memory impact**: A singleton may keep a large object graph alive in memory for the lifetime of the application.
  - **Fault tolerance**: If a singleton or any part of its dependency tree fails, it can't easily recover.
  - **Configuration reloading**: Singletons generally can't support "hot reload" of configuration values.
  - **Scope leakage**: A singleton can inadvertently capture scoped or transient dependencies, effectively promoting them to singletons and causing unintended side effects.
  - **Initialization overhead**: When resolving a service, the IoC container needs to look up the singleton instance. If it doesn't already exist, it needs to create it in a thread-safe manner. In contrast, a stateless transient service is very cheap to create and destroy.

Like all sets of recommendations, you might encounter situations where ignoring a recommendation is required. Exceptions are rare, and are mostly special cases within the framework itself.

DI is an *alternative* to static/global object access patterns. You might not realize the benefits of DI if you mix it with static object access.
