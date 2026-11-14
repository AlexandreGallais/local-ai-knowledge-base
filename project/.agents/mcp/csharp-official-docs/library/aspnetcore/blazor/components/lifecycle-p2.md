---
title: "ASP.NET Core Razor component lifecycle (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/components/lifecycle.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Razor component lifecycle (part 2 of 3)

## After parameters are set (`OnParametersSet{Async}`)

`Microsoft.AspNetCore.Components.ComponentBase.OnParametersSet*` or `Microsoft.AspNetCore.Components.ComponentBase.OnParametersSetAsync*` are called:

* After the component is initialized in `Microsoft.AspNetCore.Components.ComponentBase.OnInitialized*` or `Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync*`.

* When the parent component rerenders and supplies:

  * Known or primitive immutable types when at least one parameter has changed.
  * Complex-typed parameters. The framework can't know whether the values of a complex-typed parameter have mutated internally, so the framework always treats the parameter set as changed when one or more complex-typed parameters are present.

  For more information on rendering conventions, see ASP.NET Core Razor component rendering.

The synchronous method is called prior to the asynchronous method.

The methods can be invoked even if the parameter values haven't changed. This behavior underscores the need for developers to implement additional logic within the methods to check whether parameter values have indeed changed before re-initializing data or state dependent on those parameters.

For the following example component, navigate to the component's page at a URL:

* With a start date that's received by `StartDate`: `/on-parameters-set/2021-03-19`
* Without a start date, where `StartDate` is assigned a value of the current local time: `/on-parameters-set`

> **Note:**
> In a component route, it isn't possible to both constrain a `System.DateTime` parameter with the route constraint `datetime` and make the parameter optional. Therefore, the following `OnParamsSet` component uses two `@page` directives to handle routing with and without a supplied date segment in the URL.

`OnParamsSet.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/OnParamsSet.razor._
Asynchronous work when applying parameters and property values must occur during the `Microsoft.AspNetCore.Components.ComponentBase.OnParametersSetAsync*` lifecycle event:

```csharp
protected override async Task OnParametersSetAsync()
{
    await ...
}
```

If a custom base class is used with custom initialization logic, call `Microsoft.AspNetCore.Components.ComponentBase.OnParametersSetAsync*` on the base class:

```csharp
protected override async Task OnParametersSetAsync()
{
    await ...

    await base.OnParametersSetAsync();
}
```

It isn't necessary to call `Microsoft.AspNetCore.Components.ComponentBase.OnParametersSetAsync*` unless a custom base class is used with custom logic. For more information, see the Base class lifecycle methods section.

A component must ensure that it's in a valid state for rendering when `Microsoft.AspNetCore.Components.ComponentBase.OnParametersSetAsync*` awaits a potentially incomplete `System.Threading.Tasks.Task`. If the method returns an incomplete `System.Threading.Tasks.Task`, the part of the method that completes synchronously must leave the component in a valid state for rendering. For more information, see the introductory remarks of ASP.NET Core Blazor synchronization context and ASP.NET Core Razor component disposal.

If event handlers are provided in developer code, unhook them on disposal. For more information, see ASP.NET Core Razor component disposal.

If a disposable component doesn't use a `System.Threading.CancellationToken`, `Microsoft.AspNetCore.Components.ComponentBase.OnParametersSet*` and `Microsoft.AspNetCore.Components.ComponentBase.OnParametersSetAsync*` should check if the component is disposed. If `Microsoft.AspNetCore.Components.ComponentBase.OnParametersSetAsync*` returns an incomplete `System.Threading.Tasks.Task`, the component must ensure that the part of the method that completes synchronously leaves the component in a valid state for rendering. For more information, see the introductory remarks of ASP.NET Core Blazor synchronization context and ASP.NET Core Razor component disposal.

For more information on route parameters and constraints, see ASP.NET Core Blazor routing.

For an example of implementing `SetParametersAsync` manually to improve performance in some scenarios, see ASP.NET Core Blazor rendering performance best practices.

## After component render (`OnAfterRender{Async}`)

`Microsoft.AspNetCore.Components.ComponentBase.OnAfterRender*` and `Microsoft.AspNetCore.Components.ComponentBase.OnAfterRenderAsync*` are invoked after a component has rendered interactively and the UI has finished updating (for example, after elements are added to the browser DOM). Element and component references are populated at this point. Use this stage to perform additional initialization steps with the rendered content, such as JS interop calls that interact with the rendered DOM elements. The synchronous method is called prior to the asynchronous method.

These methods aren't invoked during prerendering or static server-side rendering (static SSR) on the server because those processes aren't attached to a live browser DOM and are already complete before the DOM is updated.

For `Microsoft.AspNetCore.Components.ComponentBase.OnAfterRenderAsync*`, the component doesn't automatically rerender after the completion of any returned `Task` to avoid an infinite render loop.

The `firstRender` parameter for `Microsoft.AspNetCore.Components.ComponentBase.OnAfterRender*` and `Microsoft.AspNetCore.Components.ComponentBase.OnAfterRenderAsync*`:

* Is set to `true` the first time that the component instance is rendered.
* Can be used to ensure that initialization work is only performed once.

`AfterRender.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/AfterRender.razor._
The `AfterRender.razor` sample produces following output to console when the page is loaded and the button is selected:

> :::no-loc text="OnAfterRender: firstRender = True":::
> :::no-loc text="HandleClick called":::
> :::no-loc text="OnAfterRender: firstRender = False":::

Asynchronous work immediately after rendering must occur during the `Microsoft.AspNetCore.Components.ComponentBase.OnAfterRenderAsync*` lifecycle event:

```csharp
protected override async Task OnAfterRenderAsync(bool firstRender)
{
    ...
}
```

If a custom base class is used with custom initialization logic, call `Microsoft.AspNetCore.Components.ComponentBase.OnAfterRenderAsync*` on the base class:

```csharp
protected override async Task OnAfterRenderAsync(bool firstRender)
{
    ...

    await base.OnAfterRenderAsync(firstRender);
}
```

It isn't necessary to call `Microsoft.AspNetCore.Components.ComponentBase.OnAfterRenderAsync*` unless a custom base class is used with custom logic. For more information, see the Base class lifecycle methods section.

Even if you return a `System.Threading.Tasks.Task` from `Microsoft.AspNetCore.Components.ComponentBase.OnAfterRenderAsync*`, the framework doesn't schedule a further render cycle for your component once that task completes. This is to avoid an infinite render loop. This is different from the other lifecycle methods, which schedule a further render cycle once a returned `System.Threading.Tasks.Task` completes.

`Microsoft.AspNetCore.Components.ComponentBase.OnAfterRender*` and `Microsoft.AspNetCore.Components.ComponentBase.OnAfterRenderAsync*` *aren't called during the prerendering process on the server*. The methods are called when the component is rendered interactively after prerendering. When the app prerenders:

1. The component executes on the server to produce some static HTML markup in the HTTP response. During this phase, `Microsoft.AspNetCore.Components.ComponentBase.OnAfterRender*` and `Microsoft.AspNetCore.Components.ComponentBase.OnAfterRenderAsync*` aren't called.
1. When the Blazor script (`blazor.{server|webassembly|web}.js`) starts in the browser, the component is restarted in an interactive rendering mode. After a component is restarted, `Microsoft.AspNetCore.Components.ComponentBase.OnAfterRender*` and `Microsoft.AspNetCore.Components.ComponentBase.OnAfterRenderAsync*` **are** called because the app isn't in the prerendering phase any longer.

If event handlers are provided in developer code, unhook them on disposal. For more information, see ASP.NET Core Razor component disposal.

## Base class lifecycle methods

When overriding Blazor's lifecycle methods, it isn't necessary to call base class lifecycle methods for `Microsoft.AspNetCore.Components.ComponentBase`. However, a component should call an overridden base class lifecycle method in the following situations:

* When overriding `Microsoft.AspNetCore.Components.ComponentBase.SetParametersAsync*`, `await base.SetParametersAsync(parameters);` is usually invoked because the base class method calls other lifecycle methods and triggers rendering in a complex fashion. For more information, see the When parameters are set (`SetParametersAsync`) section.
* If the base class method contains logic that must be executed. Library consumers usually call base class lifecycle methods when inheriting a base class because library base classes often have custom lifecycle logic to execute. If the app uses a base class from a library, consult the library's documentation for guidance.

In the following example, `base.OnInitialized();` is called to ensure that the base class's `OnInitialized` method is executed. Without the call, `BlazorRocksBase2.OnInitialized` doesn't execute.

`BlazorRocks2.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/BlazorRocks2.razor._
`BlazorRocksBase2.cs`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/BlazorRocksBase2.cs._
## State changes (`StateHasChanged`)

`Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` notifies the component that its state has changed. When applicable, calling `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` enqueues a rerender that occurs when the app's main thread is free.

`Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` is called automatically for `Microsoft.AspNetCore.Components.EventCallback` methods. For more information on event callbacks, see ASP.NET Core Blazor event handling.

For more information on component rendering and when to call `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*`, including when to invoke it with `Microsoft.AspNetCore.Components.ComponentBase.InvokeAsync*`, see ASP.NET Core Razor component rendering.
