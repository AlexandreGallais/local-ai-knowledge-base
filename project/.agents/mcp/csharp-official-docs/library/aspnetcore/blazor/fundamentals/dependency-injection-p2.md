---
title: "ASP.NET Core Blazor dependency injection (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/fundamentals/dependency-injection.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor dependency injection (part 2 of 3)

## Utility base component classes to manage a DI scope

In non-Blazor ASP.NET Core apps, scoped and transient services are typically scoped to the current request. After the request completes, scoped and transient services are disposed by the DI system.

In interactive server-side Blazor apps, the DI scope lasts for the duration of the circuit (the SignalR connection between the client and server), which can result in scoped and disposable transient services living much longer than the lifetime of a single component. Therefore, don't directly inject a scoped service into a component if you intend the service lifetime to match the lifetime of the component. Transient services injected into a component that don't implement `System.IDisposable` are garbage collected when the component is disposed. However, injected transient services *that implement `System.IDisposable`* are maintained by the DI container for the lifetime of the circuit, which prevents service garbage collection when the component is disposed and results in a memory leak. An alternative approach for scoped services based on the `Microsoft.AspNetCore.Components.OwningComponentBase` type is described later in this section, and disposable transient services shouldn't be used at all. For more information, see Design for solving transient disposables on Blazor Server (`dotnet/aspnetcore` #26676).

Even in client-side Blazor apps that don't operate over a circuit, services registered with a scoped lifetime are treated as singletons, so they live longer than scoped services in typical ASP.NET Core apps. Client-side disposable transient services also live longer than the components where they're injected because the DI container, which holds references to disposable services, persists for the lifetime of the app, preventing garbage collection on the services. Although long-lived disposable transient services are of greater concern on the server, they should be avoided as client service registrations as well. Use of the `Microsoft.AspNetCore.Components.OwningComponentBase` type is also recommended for client-side scoped services to control service lifetime, and disposable transient services shouldn't be used at all.

An approach that limits a service lifetime is use of the `Microsoft.AspNetCore.Components.OwningComponentBase` type. `Microsoft.AspNetCore.Components.OwningComponentBase` is an abstract type derived from `Microsoft.AspNetCore.Components.ComponentBase` that creates a DI scope corresponding to the *lifetime of the component*. Using this scope, a component can inject services with a scoped lifetime and have them live as long as the component. When the component is destroyed, services from the component's scoped service provider are disposed as well. This can be useful for services reused within a component but not shared across components.

Two versions of `Microsoft.AspNetCore.Components.OwningComponentBase` type are available and described in the next two sections:

* `OwningComponentBase`
* `OwningComponentBase<TService>`

### `OwningComponentBase`

`Microsoft.AspNetCore.Components.OwningComponentBase` is an abstract, disposable child of the `Microsoft.AspNetCore.Components.ComponentBase` type with a protected `Microsoft.AspNetCore.Components.OwningComponentBase.ScopedServices` property of type `System.IServiceProvider`. The provider can be used to resolve services that are scoped to the lifetime of the component.

DI services injected into the component using `@inject` or the `[Inject]` attribute aren't created in the component's scope. To use the component's scope, services must be resolved using `Microsoft.AspNetCore.Components.OwningComponentBase.ScopedServices` with either `Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetRequiredService*` or `System.IServiceProvider.GetService*`. Any services resolved using the `Microsoft.AspNetCore.Components.OwningComponentBase.ScopedServices` provider have their dependencies provided in the component's scope.

The following example demonstrates the difference between injecting a scoped service directly and resolving a service using `Microsoft.AspNetCore.Components.OwningComponentBase.ScopedServices` on the server. The following interface and implementation for a time travel class include a `DT` property to hold a `System.DateTime` value. The implementation calls `System.DateTime.Now` to set `DT` when the `TimeTravel` class is instantiated.

`ITimeTravel.cs`:

```csharp
public interface ITimeTravel
{
    public DateTime DT { get; set; }
}
```

`TimeTravel.cs`:

```csharp
public class TimeTravel : ITimeTravel
{
    public DateTime DT { get; set; } = DateTime.Now;
}
```

The service is registered as scoped in the server-side `Program` file. Server-side, scoped services have a lifetime equal to the duration of the circuit.

In the `Program` file:

```csharp
builder.Services.AddScoped<ITimeTravel, TimeTravel>();
```

In the following `TimeTravel` component:

* The time travel service is directly injected with `@inject` as `TimeTravel1`.
* The service is also resolved separately with `Microsoft.AspNetCore.Components.OwningComponentBase.ScopedServices` and `Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetRequiredService*` as `TimeTravel2`.

`TimeTravel.razor`:

```razor
@page "/time-travel"
@inject ITimeTravel TimeTravel1
@inherits OwningComponentBase

<h1><code>OwningComponentBase</code> Example</h1>

<ul>
    <li>TimeTravel1.DT: @TimeTravel1?.DT</li>
    <li>TimeTravel2.DT: @TimeTravel2?.DT</li>
</ul>

@code {
    private ITimeTravel TimeTravel2 { get; set; } = default!;

    protected override void OnInitialized()
    {
        TimeTravel2 = ScopedServices.GetRequiredService<ITimeTravel>();
    }
}
```

Initially navigating to the `TimeTravel` component, the time travel service is instantiated twice when the component loads, and `TimeTravel1` and `TimeTravel2` have the same initial value:

> :::no-loc text="TimeTravel1.DT: 8/31/2022 2:54:45 PM":::
> :::no-loc text="TimeTravel2.DT: 8/31/2022 2:54:45 PM":::

When navigating away from the `TimeTravel` component to another component and back to the `TimeTravel` component:

* `TimeTravel1` is provided the same service instance that was created when the component first loaded, so the value of `DT` remains the same.
* `TimeTravel2` obtains a new `ITimeTravel` service instance in `TimeTravel2` with a new DT value.

> :::no-loc text="TimeTravel1.DT: 8/31/2022 2:54:45 PM":::
> :::no-loc text="TimeTravel2.DT: 8/31/2022 2:54:48 PM":::

`TimeTravel1` is tied to the user's circuit, which remains intact and isn't disposed until the underlying circuit is deconstructed. For example, the service is disposed if the circuit is disconnected for the disconnected circuit retention period.

In spite of the scoped service registration in the `Program` file and the longevity of the user's circuit, `TimeTravel2` receives a new `ITimeTravel` service instance each time the component is initialized.

### `OwningComponentBase<TService>`

`Microsoft.AspNetCore.Components.OwningComponentBase`1` derives from `Microsoft.AspNetCore.Components.OwningComponentBase` and adds a `Microsoft.AspNetCore.Components.OwningComponentBase`1.Service` property that returns an instance of `T` from the scoped DI provider. This type is a convenient way to access scoped services without using an instance of `System.IServiceProvider` when there's one primary service the app requires from the DI container using the component's scope. The `Microsoft.AspNetCore.Components.OwningComponentBase.ScopedServices` property is available, so the app can get services of other types, if necessary.

```razor
@page "/users"
@attribute [Authorize]
@inherits OwningComponentBase<AppDbContext>

<h1>Users (@Service.Users.Count())</h1>

<ul>
    @foreach (var user in Service.Users)
    {
        <li>@user.UserName</li>
    }
</ul>
```

### Detect client-side transient disposables

Custom code can be added to a client-side Blazor app to detect disposable transient services in an app that should use `Microsoft.AspNetCore.Components.OwningComponentBase`. This approach is useful if you're concerned that code added to the app in the future consumes one or more transient disposable services, including services added by libraries. Demonstration code is available in the Blazor samples GitHub repository (how to download).

Inspect the following in .NET 6 or later versions of the `BlazorSample_WebAssembly` sample:

* `DetectIncorrectUsagesOfTransientDisposables.cs`
* `Services/TransientDisposableService.cs`
* In `Program.cs`:
  * The app's `Services` namespace is provided at the top of the file (`using BlazorSample.Services;`).
  * `DetectIncorrectUsageOfTransients` is called immediately after the `builder` is assigned from `Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.CreateDefault*`.
  * The `TransientDisposableService` is registered (`builder.Services.AddTransient<TransientDisposableService>();`).
  * `EnableTransientDisposableDetection` is called on the built host in the processing pipeline of the app (`host.EnableTransientDisposableDetection();`).
* The app registers the `TransientDisposableService` service without throwing an exception. However, attempting to resolve the service in `TransientService.razor` throws an `System.InvalidOperationException` when the framework attempts to construct an instance of `TransientDisposableService`.

### Detect server-side transient disposables

Custom code can be added to a server-side Blazor app to detect server-side disposable transient services in an app that should use `Microsoft.AspNetCore.Components.OwningComponentBase`. This approach is useful if you're concerned that code added to the app in the future consumes one or more transient disposable services, including services added by libraries. Demonstration code is available in the Blazor samples GitHub repository (how to download).

Inspect the following in .NET 8 or later versions of the `BlazorSample_BlazorWebApp` sample:

* `DetectIncorrectUsagesOfTransientDisposables.cs`
* `Services/TransitiveTransientDisposableDependency.cs`:
* In `Program.cs`:
  * The app's `Services` namespace is provided at the top of the file (`using BlazorSample.Services;`).
  * `DetectIncorrectUsageOfTransients` is called on the host builder (`builder.DetectIncorrectUsageOfTransients();`).
  * The `TransientDependency` service is registered (`builder.Services.AddTransient<TransientDependency>();`).
  * The `TransitiveTransientDisposableDependency` is registered for `ITransitiveTransientDisposableDependency` (`builder.Services.AddTransient<ITransitiveTransientDisposableDependency, TransitiveTransientDisposableDependency>();`).
* The app registers the `TransientDependency` service without throwing an exception. However, attempting to resolve the service in `TransientService.razor` throws an `System.InvalidOperationException` when the framework attempts to construct an instance of `TransientDependency`.

### Transient service registrations for `IHttpClientFactory`/`HttpClient` handlers

Transient service registrations for `System.Net.Http.IHttpClientFactory`/`System.Net.Http.HttpClient` handlers are recommended. If the app contains `System.Net.Http.IHttpClientFactory`/`System.Net.Http.HttpClient` handlers and uses the `Microsoft.Extensions.DependencyInjection.IRemoteAuthenticationBuilder`2` to add support for authentication, the following transient disposables for client-side authentication are also discovered, which is expected and can be ignored:

* `Microsoft.AspNetCore.Components.WebAssembly.Authentication.BaseAddressAuthorizationMessageHandler`
* `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AuthorizationMessageHandler`

Other instances of `System.Net.Http.IHttpClientFactory`/`System.Net.Http.HttpClient` are also discovered. These instances can also be ignored.

The Blazor sample apps in the Blazor samples GitHub repository (how to download) demonstrate the code to detect transient disposables. However, the code is deactivated because the sample apps include `System.Net.Http.IHttpClientFactory`/`System.Net.Http.HttpClient` handlers.

To activate the demonstration code and witness its operation:

* Uncomment the transient disposable lines in `Program.cs`.

* Remove the conditional check in `NavMenu.razor` that prevents the `TransientService` component from displaying in the app's navigation sidebar:

  ```diff
  - && (c.Name != "TransientService")
  ```

* Run the sample app and navigate to the `TransientService` component at `/transient-service`.

## Use of an Entity Framework Core (EF Core) DbContext from DI

For more information, see ASP.NET Core Blazor with Entity Framework Core (EF Core).

## Access server-side Blazor services from a different DI scope

Circuit activity handlers provide an approach for accessing scoped Blazor services from other non-Blazor dependency injection (DI) scopes.

Prior to the release of ASP.NET Core in .NET 8, accessing circuit-scoped services from other dependency injection scopes required using a custom base component type. With circuit activity handlers, a custom base component type isn't required, as the following example demonstrates:

```csharp
public class CircuitServicesAccessor
{
    static readonly AsyncLocal<IServiceProvider> blazorServices = new();

    public IServiceProvider? Services
    {
        get => blazorServices.Value;
        set => blazorServices.Value = value!;
    }
}

public class ServicesAccessorCircuitHandler(
    IServiceProvider services, CircuitServicesAccessor servicesAccessor)
    : CircuitHandler
{
    public override Func<CircuitInboundActivityContext, Task> CreateInboundActivityHandler(
        Func<CircuitInboundActivityContext, Task> next) =>
            async context =>
            {
                servicesAccessor.Services = services;
                await next(context);
                servicesAccessor.Services = null;
            };
}

public static class CircuitServicesServiceCollectionExtensions
{
    public static IServiceCollection AddCircuitServicesAccessor(
        this IServiceCollection services)
    {
        services.AddScoped<CircuitServicesAccessor>();
        services.AddScoped<CircuitHandler, ServicesAccessorCircuitHandler>();

        return services;
    }
}
```

Call `AddCircuitServicesAccessor` in the app's `Program` file:

```csharp
builder.Services.AddCircuitServicesAccessor();
```

Access the circuit-scoped services by injecting the `CircuitServicesAccessor` where it's needed.

For an example that shows how to access the `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` from a `System.Net.Http.DelegatingHandler` set up using `System.Net.Http.IHttpClientFactory`, see the circuit activity handler approach in ASP.NET Core Blazor additional server-side security scenarios.
