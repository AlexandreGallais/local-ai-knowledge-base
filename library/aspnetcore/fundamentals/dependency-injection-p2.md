---
title: "Dependency injection in ASP.NET Core (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/dependency-injection.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Dependency injection in ASP.NET Core (part 2 of 3)

## Keyed services

*Keyed services* registers and retrieves services using keys. A service is associated with a key by calling any of the following extension methods for service registration:

* `Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddKeyedSingleton*`
* `Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddKeyedScoped*`
* `Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddKeyedTransient*`

The following example demonstrates keyed services with the following API:

* `IStringCache` is the service interface with a `Get` method signature.
* `StringCache1` and `StringCache2` are concrete service implementations for `IStringCache`.

`Interfaces/IStringCache.cs`:

```csharp
public interface IStringCache
{
    string Get(int key);
}
```

`Services/StringCache1.cs`:

```csharp
public class StringCache1 : IStringCache
{
    public string Get(int key) => $"Resolving {key} from StringCache1.";
}
```

`Services/StringCache2.cs`:

```csharp
public class StringCache2 : IStringCache
{
    public string Get(int key) => $"Resolving {key} from StringCache2.";
}
```

Access a registered service by specifying the key with the `[FromKeyedServices]` attribute.

Keyed service and example Minimal API endpoints in the `Program` file:

```csharp
builder.Services.AddKeyedSingleton<IStringCache, StringCache1>("cache1");
builder.Services.AddKeyedSingleton<IStringCache, StringCache2>("cache2");

...

app.MapGet("/cache1", ([FromKeyedServices("cache1")] IStringCache stringCache1) =>
    stringCache1.Get(1));
app.MapGet("/cache2", ([FromKeyedServices("cache2")] IStringCache stringCache2) =>
    stringCache2.Get(2));
```

Example use in a Razor componment (`Pages/KeyedServicesExample.razor`) using the `[Inject]` attribute. Use the `Microsoft.AspNetCore.Components.InjectAttribute.Key` property to specify the key for the service to inject:

```razor
@page "/keyed-services-example"

@Cache?.Get(3)

@code {
    [Inject(Key = "cache1")]
    public IStringCache? Cache { get; set; }
}
```

For more information on using keyed services with Razor components, see ASP.NET Core Blazor dependency injection.

Example use in a SignalR hub (`Hubs/MyHub1.cs`) with primary constructor injection:

```csharp
using Microsoft.AspNetCore.SignalR;

public class MyHub1([FromKeyedServices("cache2")] IStringCache cache) : Hub
{
    public void Method()
    {
        Console.WriteLine(cache.Get(4));
    }
}
```

Example use in a SignalR hub (`Hubs/MyHub2.cs`) with method injection:

```csharp
using Microsoft.AspNetCore.SignalR;

public class MyHub2 : Hub
{
    public void Method([FromKeyedServices("cache2")] IStringCache cache)
    {
        Console.WriteLine(cache.Get(5));
    }
}
```

For more information on DI with SignalR hubs, see Use hubs in ASP.NET Core SignalR.

Middleware supports keyed services in both the middleware's constructor and its `Invoke`/`InvokeAsync` method:

```csharp
internal class MyMiddleware
{
    private readonly RequestDelegate _next;

    public MyMiddleware(RequestDelegate next,
        [FromKeyedServices("cache1")] IStringCache cache)
    {
        _next = next;

        Console.WriteLine(cache.Get(6));
    }

    public Task Invoke(HttpContext context,
        [FromKeyedServices("cache2")] IStringCache cache)
        {
            Console.WriteLine(cache.Get(7));

            return _next(context);
        }
}
```

In the app processing pipeline of the `Program` file (.NET 6 or later) or the `Startup.Configure` method (.NET 5 or earlier):

```csharp
app.UseMiddleware<MyMiddleware>();
```

For more information on creating middleware, see Write custom ASP.NET Core middleware.

## Constructor injection behavior

For more information on constructor injection behavior, see the following resources:

* Constructor injection behavior
* ASP.NET Core Blazor dependency injection

## Entity Framework contexts

For guidance on EF Core in server-side Blazor apps, see ASP.NET Core Blazor with Entity Framework Core (EF Core).

By default, Entity Framework contexts are added to the service container using the scoped lifetime because web app database operations are normally scoped to the client request. To use a different lifetime, specify the lifetime by using an `Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContext*` overload. Services of a given lifetime shouldn't use a database context with a lifetime that's shorter than the service's lifetime.

## Lifetime and registration options

To demonstrate the difference between service lifetimes and their registration options, consider the following interfaces that represent a task as an operation with an identifier, `OperationId`. Depending on how the lifetime of an operation's service is configured for the following interfaces, the container provides either the same or different instances of the service when requested by a class.

`IOperation.cs`:

```csharp
public interface IOperation
{
    string OperationId { get; }
}

public interface IOperationTransient : IOperation { }
public interface IOperationScoped : IOperation { }
public interface IOperationSingleton : IOperation { }
```

The following `Operation` class implements all of the preceding interfaces. The `Operation` constructor generates a GUID and stores the last four characters in the `OperationId` property.

`Operation.cs`:

```csharp
public class Operation : IOperationTransient, IOperationScoped, IOperationSingleton
{
    public Operation()
    {
        OperationId = Guid.NewGuid().ToString()[^4..];
    }

    public string OperationId { get; }
}
```

The following code creates multiple registrations of the `Operation` class according to the named lifetimes.

Where services are registered:

```csharp
builder.Services.AddTransient<IOperationTransient, Operation>();
builder.Services.AddScoped<IOperationScoped, Operation>();
builder.Services.AddSingleton<IOperationSingleton, Operation>();
```

The following example demonstrates object lifetimes both within and between requests. The `Operation` component and the middleware request each kind of `IOperation` type and log the `OperationId` for each.

`Pages/OperationExample.razor`:

```razor
@page "/operation-example"
@inject IOperationTransient TransientOperation
@inject IOperationScoped ScopedOperation
@inject IOperationSingleton SingletonOperation

<ul>
    <li>Transient: @TransientOperation.OperationId</li>
    <li>Scoped: @ScopedOperation.OperationId</li>
    <li>Singleton: @SingletonOperation.OperationId</li>
</ul>
```

Middleware can also resolve and use the same services. Scoped and transient services must be resolved in the `InvokeAsync` method.

`MyMiddleware.cs`:

```csharp
public class MyMiddleware(ILogger<IndexModel> logger,
    IOperationSingleton singletonOperation)
{
    public async Task InvokeAsync(HttpContext context,
        IOperationTransient transientOperation, IOperationScoped scopedOperation)
    {
        logger.LogInformation($"Transient: {transientOperation.OperationId}");
        logger.LogInformation($"Scoped: {scopedOperation.OperationId}");
        logger.LogInformation($"Singleton: {singletonOperation.OperationId}");

        await _next(context);
    }
}
```

In the app processing pipeline of the `Program` file (.NET 6 or later) or the `Startup.Configure` method (.NET 5 or earlier):

```csharp
app.UseMiddleware<MyMiddleware>();
```

For more information on creating middleware, see Write custom ASP.NET Core middleware.

Output from the preceding examples shows:

* *Transient* objects are always different. The transient `OperationId` value is different for the Razor component and in the middleware.
* *Scoped* objects are the same for a given request but differ across new Blazor circuits.
* *Singleton* objects are the same for every request or Blazor circuit.

## Resolve a service at app startup

The following code shows how to resolve a scoped service for a limited duration when the app starts:

```csharp
var app = builder.Build();

using (var serviceScope = app.Services.CreateScope())
{
    var services = serviceScope.ServiceProvider;
    var dependency = services.GetRequiredService<IMyDependency>();
    dependency.WriteMessage("Call services from main");
}
```

## Scope validation

For guidance on scope validation, see the following resources:

* .NET dependency injection: Scope validation
* ASP.NET Core Web Host: Scope validation

## Request Services

Services and their dependencies within an ASP.NET Core request are exposed through `Microsoft.AspNetCore.Http.HttpContext.RequestServices`.

The framework creates a scope per request, and `RequestServices` exposes the scoped service provider. All scoped services are valid for as long as the request is active.

> **Note:**
> Prefer requesting dependencies as constructor parameters over resolving services from `RequestServices`. Requesting dependencies as constructor parameters yields classes that are easier to test.

## Design services for dependency injection

When designing services for DI:

* Avoid stateful, static classes and members. Avoid creating global state by designing apps to use singleton services instead.
* Avoid direct instantiation of dependent classes within services. Direct instantiation couples the code to a particular implementation.
* Make services small, well-factored, and easily tested.

If a class has many injected dependencies, it might be a sign that the class has too many responsibilities and violates the Single Responsibility Principle (SRP). Attempt to refactor the class by moving some of its responsibilities into new classes. Keep in mind that Razor Pages page model classes and MVC controller classes should focus on UI concerns.

### Disposal of services

The container calls `System.IDisposable.Dispose*` for the `System.IDisposable` types it creates. Services resolved from the container should never be disposed by the developer. If a type or factory is registered as a singleton, the container disposes the singleton automatically.

In the following example, the services are created by the service container and disposed automatically.

`Services/Service1.cs`:

```csharp
public class Service1 : IDisposable
{
    private bool _disposed;

    public void Write(string message)
    {
        Console.WriteLine($"Service1: {message}");
    }

    public void Dispose()
    {
        if (_disposed)
        {
            return;
        }

        Console.WriteLine("Service1.Dispose");
        _disposed = true;

        GC.SuppressFinalize(this);
    }
}
```

`Services/Service2.cs`:

```csharp
public class Service2 : IDisposable
{
    private bool _disposed;

    public void Write(string message)
    {
        Console.WriteLine($"Service2: {message}");
    }

    public void Dispose()
    {
        if (_disposed)
        {
            return;
        }

        Console.WriteLine("Service2.Dispose");
        _disposed = true;

        GC.SuppressFinalize(this);
    }
}
```

`Services/Service3.cs`:

```csharp
public interface IService3
{
    public void Write(string message);
}

public class Service3(string myKey) : IService3, IDisposable
{
    private bool _disposed;

    public void Write(string message)
    {
        Console.WriteLine($"Service3: {message}, Key = {myKey}");
    }

    public void Dispose()
    {
        if (_disposed)
        {
            return;
        }

        Console.WriteLine("Service3.Dispose");
        _disposed = true;

        GC.SuppressFinalize(this);
    }
}
```

In `appsettings.Development.json`:

```json
"Key": "Value from appsettings.Development.json"
```

Where services are registered by the app:

```csharp
builder.Services.AddScoped<Service1>();
builder.Services.AddSingleton<Service2>();

var key = builder.Configuration["Key"] ?? string.Empty;
builder.Services.AddSingleton<IService3>(sp => new Service3(key));
```

```csharp
services.AddScoped<Service1>();
services.AddSingleton<Service2>();

var myKey = builder.Configuration["Key"] ?? string.Empty;
services.AddSingleton<IService3>(sp => new Service3(myKey));
```

`Pages/DisposalExample.razor`:

```razor
@page "/disposal-example"
@inject Service1 Service1
@inject Service2 Service2
@inject IService3 Service3

@code {
    protected override void OnInitialized()
    {
        Service1.Write("DisposalExample.OnInitialized");
        Service2.Write("DisposalExample.OnInitialized");
        Service3.Write("DisposalExample.OnInitialized");
    }
}
```

The debug console shows the following output after each refresh of the Index page:

```console
Service1: DisposalExample.OnInitialized
Service2: DisposalExample.OnInitialized
Service3: DisposalExample.OnInitialized, Key = Value from appsettings.Development.json
Service1.Dispose
```

To see the entry for the disposal of `Service1`, navigate away from the `DisposalExample` component to trigger its disposal.

### Services not created by the service container

Consider the following code:

```csharp
builder.Services.AddSingleton(new Service1());
builder.Services.AddSingleton(new Service2());
```

```csharp
services.AddSingleton(new Service1());
services.AddSingleton(new Service2());
```

For the preceding code:

* The service instances aren't created by the service container.
* The framework doesn't dispose of the services automatically.
* The developer is responsible for disposing of the services.

### `IDisposable` guidance for transient and shared instances

For more information, see Dependency injection in .NET: IDisposable guidance for transient and shared instance.

## Default service container replacement

For more information, see Dependency injection in .NET: Default service container replacement.

## Recommendations

For more information, see Dependency injection guidelines: Recommendations.

Avoid using the *service locator pattern*. For example, don't invoke `System.IServiceProvider.GetService*` to obtain a service instance when you can use DI instead:

**Incorrect:**

**Correct**:

```csharp
public class MyClass(IOptionsMonitor<MyOptions> optionsMonitor)
{
    public void MyMethod()
    {
        var option = optionsMonitor.CurrentValue.Option;

        ...
    }
}
```

Another service locator variation to avoid is injecting a factory that resolves dependencies at runtime. Both of these practices mix Inversion of Control strategies.

Avoid static access to `Microsoft.AspNetCore.Http.HttpContext` (for example, `Microsoft.AspNetCore.Http.IHttpContextAccessor.HttpContext`).

DI is an *alternative* to static/global object access patterns. You might not be able to realize the benefits of DI if you mix it with static object access.
