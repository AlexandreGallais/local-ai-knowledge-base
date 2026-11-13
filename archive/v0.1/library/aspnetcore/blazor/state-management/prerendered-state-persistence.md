---
title: "ASP.NET Core Blazor prerendered state persistence (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/state-management/prerendered-state-persistence.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor prerendered state persistence

This article explains how to persist component state across prerendering in Blazor apps using the Persistent Component State service. You'll learn how to use the `[PersistentState]` attribute, the `PersistentComponentState` service directly, and how to create custom serializers for persistent state.

Without persisting component state, state used during prerendering is lost and must be recreated when the app is fully loaded. If any state is created asynchronously, the UI may flicker as the prerendered UI is replaced with temporary loading content and then fully rendered again.

Consider the following `PrerenderedCounter1` counter component. The component sets an initial random counter value during prerendering in `OnInitialized` lifecycle method. When the component then renders interactively, the initial count value is replaced when `OnInitialized` executes a second time.

`PrerenderedCounter1.razor`:

_Code sample not included: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/PrerenderedCounter1.razor._
> **Note:**
> If the app adopts interactive routing and the page is reached via an internal enhanced navigation, prerendering doesn't occur. Therefore, you must perform a full page reload for the `PrerenderedCounter1` component to see the following output. For more information, see the Interactive routing and prerendering section.

Run the app and inspect logging from the component. The following is example output.

> :::no-loc text="info: BlazorSample.Components.Pages.PrerenderedCounter1[0]":::
> :::no-loc text="      currentCount set to 41":::
> :::no-loc text="info: BlazorSample.Components.Pages.PrerenderedCounter1[0]":::
> :::no-loc text="      currentCount set to 92":::

The first logged count occurs during prerendering. The count is set again after prerendering when the component is rerendered. There's also a flicker in the UI when the count updates from 41 to 92.

To retain the initial value of the counter during prerendering, Blazor supports persisting state in a prerendered page using the `Microsoft.AspNetCore.Components.PersistentComponentState` service (and for components embedded into pages or views of Razor Pages or MVC apps, the Persist Component State Tag Helper).

By initializing components with the same state used during prerendering, any expensive initialization steps are only executed once. The rendered UI also matches the prerendered UI, so no flicker occurs in the browser.

The persisted prerendered state is transferred to the client, where it's used to restore the component state. During client-side rendering (CSR, `InteractiveWebAssembly`), the data is exposed to the browser and must not contain sensitive, private information. During interactive server-side rendering (interactive SSR, `InteractiveServer`), ASP.NET Core Data Protection ensures that the data is transferred securely. The `InteractiveAuto` render mode combines WebAssembly and Server interactivity, so it's necessary to consider data exposure to the browser, as in the CSR case.

To persist prerendered state using the `Microsoft.AspNetCore.Components.PersistentComponentState` service, apply the `[PersistentState]` attribute to `public` properties. The state is retrieved when the component renders interactively or the `Microsoft.AspNetCore.Components.PersistentComponentState` service is instantiated.

Use `public` properties because reflection is used by the framework for tasks such as trimming unused code and source generation.

By default, properties are serialized using the `System.Text.Json` serializer with default settings and persisted in the prerendered HTML. Serialization isn't trimmer safe and requires preservation of the types used. For more information, see Configure the Trimmer for ASP.NET Core Blazor.

The following counter component persists counter state during prerendering and retrieves the state to initialize the component:

* The `[PersistentState]` attribute is applied to the public nullable `CurrentCount` property of type `int?`.
* The counter's state is assigned when `null` in `OnInitialized` and restored automatically when the component renders interactively.

`PrerenderedCounter2.razor`:

```razor
@page "/prerendered-counter-2"
@inject ILogger<PrerenderedCounter2> Logger

<PageTitle>Prerendered Counter 2</PageTitle>

<h1>Prerendered Counter 2</h1>

<p role="status">Current count: @CurrentCount</p>

<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    [PersistentState]
    public int? CurrentCount { get; set; }

    protected override void OnInitialized()
    {
        if (CurrentCount is null)
        {
            CurrentCount = Random.Shared.Next(100);
            Logger.LogInformation("CurrentCount set to {Count}", CurrentCount);
        }
        else
        {
            Logger.LogInformation("CurrentCount restored to {Count}", CurrentCount);
        }
    }

    private void IncrementCount() => CurrentCount++;
}
```

When the component executes, `CurrentCount` is only set once during prerendering. The value is restored when the component is rerendered. The following is example output.

> **Note:**
> If the app adopts interactive routing and the page is reached via an internal enhanced navigation, prerendering doesn't occur. Therefore, you must perform a full page reload for the component to see the following output. For more information, see the Interactive routing and prerendering section.

> :::no-loc text="info: BlazorSample.Components.Pages.PrerenderedCounter2[0]":::
> :::no-loc text="      CurrentCount set to 96":::
> :::no-loc text="info: BlazorSample.Components.Pages.PrerenderedCounter2[0]":::
> :::no-loc text="      CurrentCount restored to 96":::

In the following example that serializes state for multiple components of the same type:

* Public properties annotated with the `[PersistentState]` attribute are serialized during prerendering.
* The `@key` directive attribute is used to ensure that the state is correctly associated with the component instance.
* The `Element` property is initialized in the `OnInitialized` lifecycle method to avoid null reference exceptions, similarly to how null references are avoided for query parameters and form data.

`PersistentChild.razor`:

```razor
<div>
    <p>Current count: @Element.CurrentCount</p>
    <button class="btn btn-primary" @onclick="IncrementCount">Click me</button>
</div>

@code {
    [PersistentState]
    public State Element { get; set; }

    protected override void OnInitialized()
    {
        Element ??= new State();
    }

    private void IncrementCount()
    {
        Element.CurrentCount++;
    }

    private class State
    {
        public int CurrentCount { get; set; }
    }
}
```

`Parent.razor`:

```razor
@page "/parent"

@foreach (var element in elements)
{
    <PersistentChild @key="element.Name" />
}
```

> **Note:**
> A user-configured `System.Text.Json.Serialization.JsonSerializerContext` doesn't flow into C# union deserialization. Instead, use `[JsonUnion(TypeClassifier = typeof({TYPE CLASSIFIER}))]`, where the `{TYPE CLASSIFIER}` placeholder is the type classifier.

## Serialize state for services

In the following example that serializes state for a dependency injection service:

* Properties annotated with the `[PersistentState]` attribute are serialized during prerendering and deserialized when the app becomes interactive.
* The `Microsoft.Extensions.DependencyInjection.RazorComponentsRazorComponentBuilderExtensions.RegisterPersistentService*` extension method is used to register the service for persistence. The render mode is required because the render mode can't be inferred from the service type. Use any of the following values:
  * `RenderMode.Server`: The service is available for the Interactive Server render mode.
  * `RenderMode.Webassembly`: The service is available for the Interactive Webassembly render mode.
  * `RenderMode.InteractiveAuto`: The service is available for both the Interactive Server and Interactive Webassembly render modes if a component renders in either of those modes.
* The service is resolved during the initialization of an interactive render mode, and the properties annotated with the `[PersistentState]` attribute are deserialized.

> **Note:**
> Only persisting scoped services is supported on the **server**. On the WebAssembly client (`InteractiveAuto` or `InteractiveWebAssembly` render modes), the service must be registered as a **singleton**. See Client project service registration for details.

Serialized properties are identified from the actual service instance:

* This approach allows marking an abstraction as a persistent service.
* Enables actual implementations to be internal or different types.
* Supports shared code in different assemblies.
* Results in each instance exposing the same properties.

The following counter service, `CounterTracker`, marks its current count property, `CurrentCount` with the `[PersistentState]` attribute. The public property is serialized during prerendering and deserialized when the app becomes interactive wherever the service is injected.

`CounterTracker.cs`:

```csharp
public class CounterTracker
{
    [PersistentState]
    public int CurrentCount { get; set; }

    public void IncrementCount()
    {
        CurrentCount++;
    }
}
```

### Server project service registration

In the server project's `Program` file, register the scoped service and register the service for persistence with `RegisterPersistentService`. In the following example, the `CounterTracker` service is available for both the Interactive Server and Interactive WebAssembly render modes if a component renders in either of those modes because it's registered with `RenderMode.InteractiveAuto`.

If the `Program` file doesn't already use the `Microsoft.AspNetCore.Components.Web` namespace, add the following `using` statement to the top of the file:

```csharp
using Microsoft.AspNetCore.Components.Web;
```

Where services are registered in the server project's `Program` file:

```csharp
builder.Services.AddScoped<CounterTracker>();

builder.Services.AddRazorComponents()
    .RegisterPersistentService<CounterTracker>(RenderMode.InteractiveAuto);
```

### Client project service registration

For `RenderMode.InteractiveAuto` or `RenderMode.InteractiveWebAssembly`, the service must also be registered in the `.Client` project's `Program` file. Register it as a **singleton**, not scoped:

```csharp
builder.Services.AddSingleton<CounterTracker>();
```

The client-side `ComponentStatePersistenceManager` is registered as a singleton, so it resolves its dependencies from the root service provider. *Avoid a scoped service registration.* If the service is incorrectly registered as scoped on the client, resolving it from the root provider throws a `DirectScopedResolvedFromRootException` in Development environments. Beyond the exception, a scoped registration produces two separate instances on the client: one resolved from the root during state restoration and another from the app scope for injected components. This means the restored state doesn't reach the instance the components use. Registering the service as a singleton on the client ensures that the same instance is used for both state restoration and component injection.

Inject the `CounterTracker` service into a component and use it to increment a counter. For demonstration purposes in the following example, the value of the service's `CurrentCount` property is set to 10 only during prerendering.

`Pages/Counter.razor`:

```razor
@page "/counter"
@inject CounterTracker CounterTracker

<PageTitle>Counter</PageTitle>

<h1>Counter</h1>

<p>Rendering: @RendererInfo.Name</p>

<p role="status">Current count: @CounterTracker.CurrentCount</p>

<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    protected override void OnInitialized()
    {
        if (!RendererInfo.IsInteractive)
        {
            CounterTracker.CurrentCount = 10;
        }
    }

    private void IncrementCount()
    {
        CounterTracker.IncrementCount();
    }
}
```

To use preceding component to demonstrate persisting the count of 10 in `CounterTracker.CurrentCount`, navigate to the component and refresh the browser, which triggers prerendering. When prerendering occurs, you briefly see `Microsoft.AspNetCore.Components.RendererInfo.Name` indicate "`Static`" before displaying "`Server`" after final rendering. The counter starts at 10.
