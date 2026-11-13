---
title: "ASP.NET Core Blazor dependency injection (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/fundamentals/dependency-injection.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor dependency injection

-->
-->

By Rainer Stropek and Mike Rousos

This article explains how Blazor apps can inject services into components.

Dependency injection (DI) is a technique for accessing services configured in a central location:

* Framework-registered services can be injected directly into Razor components.
* Blazor apps define and register custom services and make them available throughout the app via DI.

> **Note:**
> We recommend reading Dependency injection in ASP.NET Core before reading this topic.

## Default services

The services shown in the following table are commonly used in Blazor apps.

| Service | Lifetime | Description |
| ------- | -------- | ----------- |
| `System.Net.Http.HttpClient` | Scoped | Provides methods for sending HTTP requests and receiving HTTP responses from a resource identified by a URI.Client-side, an instance of `System.Net.Http.HttpClient` is registered by the app in the `Program` file and uses the browser for handling the HTTP traffic in the background.Server-side, an `System.Net.Http.HttpClient` isn't configured as a service by default. In server-side code, provide an `System.Net.Http.HttpClient`.For more information, see Call a web API from an ASP.NET Core Blazor app.An `System.Net.Http.HttpClient` is registered as a scoped service, not singleton. For more information, see the Service lifetime section. |
| `Microsoft.JSInterop.IJSRuntime` | **Client-side**: Singleton**Server-side**: ScopedThe Blazor framework registers `Microsoft.JSInterop.IJSRuntime` in the app's service container. | Represents an instance of a JavaScript runtime where JavaScript calls are dispatched. For more information, see Call JavaScript functions from .NET methods in ASP.NET Core Blazor.When seeking to inject the service into a singleton service on the server, take either of the following approaches:Change the service registration to scoped to match `Microsoft.JSInterop.IJSRuntime`'s registration, which is appropriate if the service deals with user-specific state.Pass the `Microsoft.JSInterop.IJSRuntime` into the singleton service's implementation as an argument of its method calls instead of injecting it into the singleton. |
| `Microsoft.AspNetCore.Components.NavigationManager` | **Client-side**: Singleton**Server-side**: ScopedThe Blazor framework registers `Microsoft.AspNetCore.Components.NavigationManager` in the app's service container. | Contains helpers for working with URIs and navigation state. For more information, see URI and navigation state helpers. |

Additional services registered by the Blazor framework are described in the documentation where they're used to describe Blazor features, such as configuration and logging.

A custom service provider doesn't automatically provide the default services listed in the table. If you use a custom service provider and require any of the services shown in the table, add the required services to the new service provider.

## Add client-side services

Configure services for the app's service collection in the `Program` file. In the following example, the `ExampleDependency` implementation is registered for `IExampleDependency`:

```csharp
var builder = WebAssemblyHostBuilder.CreateDefault(args);
...
builder.Services.AddSingleton<IExampleDependency, ExampleDependency>();
...

await builder.Build().RunAsync();
```

After the host is built, services are available from the root DI scope before any components are rendered. This can be useful for running initialization logic before rendering content:

```csharp
var builder = WebAssemblyHostBuilder.CreateDefault(args);
...
builder.Services.AddSingleton<WeatherService>();
...

var host = builder.Build();

var weatherService = host.Services.GetRequiredService<WeatherService>();
await weatherService.InitializeWeatherAsync();

await host.RunAsync();
```

The host provides a central configuration instance for the app. Building on the preceding example, the weather service's URL is passed from a default configuration source (for example, `appsettings.json`) to `InitializeWeatherAsync`:

```csharp
var builder = WebAssemblyHostBuilder.CreateDefault(args);
...
builder.Services.AddSingleton<WeatherService>();
...

var host = builder.Build();

var weatherService = host.Services.GetRequiredService<WeatherService>();
await weatherService.InitializeWeatherAsync(
    host.Configuration["WeatherServiceUrl"]);

await host.RunAsync();
```

## Add server-side services

After creating a new app, examine part of the `Program` file:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();
```

The `builder` variable represents a `Microsoft.AspNetCore.Builder.WebApplicationBuilder` with an `Microsoft.Extensions.DependencyInjection.IServiceCollection`, which is a list of service descriptor objects. Services are added by providing service descriptors to the service collection. The following example demonstrates the concept with the `IDataAccess` interface and its concrete implementation `DataAccess`:

```csharp
builder.Services.AddSingleton<IDataAccess, DataAccess>();
```

## Register common services

If one or more common services are required client- and server-side, you can place the common service registrations in a method client-side and call the method to register the services in both projects.

First, factor common service registrations into a separate method. For example, create a `ConfigureCommonServices` method client-side:

```csharp
public static void ConfigureCommonServices(IServiceCollection services)
{
    services.Add...;
}
```

For the client-side `Program` file, call `ConfigureCommonServices` to register the common services:

```csharp
var builder = WebAssemblyHostBuilder.CreateDefault(args);

...

ConfigureCommonServices(builder.Services);
```

In the server-side `Program` file, call `ConfigureCommonServices` to register the common services:

```csharp
var builder = WebApplication.CreateBuilder(args);

...

Client.Program.ConfigureCommonServices(builder.Services);
```

For an example of this approach, see ASP.NET Core Blazor WebAssembly additional security scenarios.

## Client-side services that fail during prerendering

*This section only applies to WebAssembly components in Blazor Web Apps.*

Blazor Web Apps normally prerender client-side WebAssembly components. If an app is run with a required service only registered in the `.Client` project, executing the app results in a runtime error similar to the following when a component attempts to use the required service during prerendering:

> :::no-loc text="InvalidOperationException: Cannot provide a value for {PROPERTY} on type '{ASSEMBLY}}.Client.Pages.{COMPONENT NAME}'. There is no registered service of type '{SERVICE}'.":::

Use ***either*** of the following approaches to resolve this problem:

* Register the service in the main project to make it available during component prerendering.
* If prerendering isn't required for the component, disable prerendering by following the guidance in Prerender ASP.NET Core Razor components. If you adopt this approach, you don't need to register the service in the main project.

For more information, see the Client-side services fail to resolve during prerendering section of the *Prerendering* article, which appears later in the Blazor documentation.

## Service lifetime

Services can be configured with the lifetimes shown in the following table.

| Lifetime | Description |
| -------- | ----------- |
| `Microsoft.Extensions.DependencyInjection.ServiceDescriptor.Scoped*` | Client-side doesn't currently have a concept of DI scopes. `Scoped`-registered services behave like `Singleton` services.Server-side development supports the `Scoped` lifetime across HTTP requests but not across SignalR connection/circuit messages among components that are loaded on the client. The Razor Pages or MVC portion of the app treats scoped services normally and recreates the services on *each HTTP request* when navigating among pages or views or from a page or view to a component. Scoped services aren't reconstructed when navigating among components on the client, where the communication to the server takes place over the SignalR connection of the user's circuit, not via HTTP requests. In the following component scenarios on the client, scoped services are reconstructed because a new circuit is created for the user:The user closes the browser's window. The user opens a new window and navigates back to the app.The user closes a tab of the app in a browser window. The user opens a new tab and navigates back to the app.The user selects the browser's reload/refresh button.For more information on preserving user state in server-side apps, see ASP.NET Core Blazor state management overview and ASP.NET Core Blazor server-side state management. |
| `Microsoft.Extensions.DependencyInjection.ServiceDescriptor.Singleton*` | DI creates a *single instance* of the service. All components requiring a `Singleton` service receive the same instance of the service. |
| `Microsoft.Extensions.DependencyInjection.ServiceDescriptor.Transient*` | Whenever a component obtains an instance of a `Transient` service from the service container, it receives a *new instance* of the service. |

The DI system is based on the DI system in ASP.NET Core. For more information, see Dependency injection in ASP.NET Core.

## Request a service in a component

For injecting services into components, Blazor supports constructor injection and property injection.

### Constructor injection

After services are added to the service collection, inject one or more services into components with constructor injection. The following example injects the `NavigationManager` service.

`ConstructorInjection.razor`:

```razor
@page "/constructor-injection"

<button @onclick="HandleClick">
    Take me to the Counter component
</button>
```

`ConstructorInjection.razor.cs`:

```csharp
using Microsoft.AspNetCore.Components;

public partial class ConstructorInjection(NavigationManager navigation)
{
    private void HandleClick()
    {
        navigation.NavigateTo("/counter");
    }
}
```

### Property injection

After services are added to the service collection, inject one or more services into components with the `@inject` Razor directive, which has two parameters:

* Type: The type of the service to inject.
* Property: The name of the property receiving the injected app service. The property doesn't require manual creation. The compiler creates the property.

For more information, see Dependency injection into views in ASP.NET Core.

Use multiple `@inject` statements to inject different services.

The following example demonstrates shows how to use the `@inject` directive. The service implementing `Services.NavigationManager` is injected into the component's property `Navigation`. Note how the code is only using the `NavigationManager` abstraction.

`PropertyInjection.razor`:

```razor
@page "/property-injection"
@inject NavigationManager Navigation

<button @onclick="@(() => Navigation.NavigateTo("/counter"))">
    Take me to the Counter component
</button>
```

Internally, the generated property (`Navigation`) uses the `[Inject]` attribute. Typically, this attribute isn't used directly. If a base class is required for components and injected properties are also required for the base class, manually add the `[Inject]` attribute:

```csharp
using Microsoft.AspNetCore.Components;

public class ComponentBase : IComponent
{
    [Inject]
    protected NavigationManager Navigation { get; set; } = default!;

    ...
}
```

> **Note:**
> Since injected services are expected to be available, the default literal with the null-forgiving operator (`default!`) is assigned in .NET 6 or later. For more information, see Nullable reference types (NRTs) and .NET compiler null-state static analysis.

In components derived from a base class, the `@inject` directive isn't required. The `Microsoft.AspNetCore.Components.InjectAttribute` of the base class is sufficient. The component only requires the `@inherits` directive. In the following example, any injected services of `CustomComponentBase` are available to the `Demo` component:

```razor
@page "/demo"
@inherits CustomComponentBase
```

## Service injection via a top-level imports file (`_Imports.razor`)

*This section only applies to Blazor Web Apps.*

A top-level imports file in the `Components` folder (`Components/_Imports.razor`) injects its references into all of the components in the folder hierarchy, which includes the `App` component (`App.razor`). The `App` component is always rendered statically even if prerendering of a page component is disabled. Therefore, injecting services via the top-level imports file results in resolving *two instances* of the service in page components.

To address this scenario, inject the service in a new imports file placed in the `Pages` folder (`Components/Pages/_Imports.razor`). From that location, the service is only resolved once in page components.

## Use DI in services

Complex services might require additional services. In the following example, `DataAccess` requires the `System.Net.Http.HttpClient` default service. `@inject` (or the `[Inject]` attribute) isn't available for use in services. *Constructor injection* must be used instead. Required services are added by adding parameters to the service's constructor. When DI creates the service, it recognizes the services it requires in the constructor and provides them accordingly. In the following example, the constructor receives an `System.Net.Http.HttpClient` via DI. `System.Net.Http.HttpClient` is a default service.

```csharp
using System.Net.Http;

public class DataAccess : IDataAccess
{
    public DataAccess(HttpClient http)
    {
        ...
    }

    ...
}
```

Constructor injection is supported with primary constructors in C# 12 (.NET 8) or later:

```csharp
using System.Net.Http;

public class DataAccess(HttpClient http) : IDataAccess
{
    ...
}
```

Prerequisites for constructor injection:

* One constructor must exist whose arguments can all be fulfilled by DI. Additional parameters not covered by DI are allowed if they specify default values.
* The applicable constructor must be `public`.
* One applicable constructor must exist. In case of an ambiguity, DI throws an exception.

## Inject keyed services into components

Blazor supports injecting keyed services using the `[Inject]` attribute. Keys allow for scoping of registration and consumption of services when using dependency injection. Use the `Microsoft.AspNetCore.Components.InjectAttribute.Key` property to specify the key for the service to inject:

```csharp
[Inject(Key = "my-service")]
public IMyService MyService { get; set; }
```
