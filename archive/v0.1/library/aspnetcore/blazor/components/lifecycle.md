---
title: "ASP.NET Core Razor component lifecycle (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/lifecycle.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Razor component lifecycle

-->
-->

This article explains the ASP.NET Core Razor component lifecycle and how to use lifecycle events.

## Lifecycle events

The Razor component processes Razor component lifecycle events in a set of synchronous and asynchronous lifecycle methods. The lifecycle methods can be overridden to perform additional operations in components during component initialization and rendering.

This article simplifies component lifecycle event processing in order to clarify complex framework logic and doesn't cover every change that was made over the years. You may need to access the `ComponentBase` reference source to integrate custom event processing with Blazor's lifecycle event processing. Code comments in the reference source include additional remarks on lifecycle event processing that don't appear in this article or in the API documentation.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

The following simplified diagrams illustrate Razor component lifecycle event processing. The C# methods associated with the lifecycle events are defined with examples in the following sections of this article.

Component lifecycle events:

1. If the component is rendering for the first time on a request:
   * Create the component's instance.
   * Perform property injection.
   * Call `OnInitialized{Async}`. If an incomplete `System.Threading.Tasks.Task` is returned, the `System.Threading.Tasks.Task` is awaited and then the component is rerendered. The synchronous method is called prior to the asynchronous method.
1. Call `OnParametersSet{Async}`. If an incomplete `System.Threading.Tasks.Task` is returned, the `System.Threading.Tasks.Task` is awaited and then the component is rerendered. The synchronous method is called prior to the asynchronous method.
1. Render for all synchronous work and complete `System.Threading.Tasks.Task`s.

> **Note:**
> Asynchronous actions performed in lifecycle events might delay component rendering or displaying data. For more information, see the Handle incomplete asynchronous actions at render section later in this article.

A parent component renders before its children components because rendering is what determines which children are present. If synchronous parent component initialization is used, the parent initialization is guaranteed to complete first. If asynchronous parent component initialization is used, the completion order of parent and child component initialization can't be determined because it depends on the initialization code running.

DOM event processing:

1. The event handler is run.
1. If an incomplete `System.Threading.Tasks.Task` is returned, the `System.Threading.Tasks.Task` is awaited and then the component is rerendered.
1. Render for all synchronous work and complete `System.Threading.Tasks.Task`s.

The `Render` lifecycle:

1. Avoid further rendering operations on the component when both of the following conditions are met:
   * It is not the first render.
   * `ShouldRender` returns `false`.
1. Build the render tree diff (difference) and render the component.
1. Await the DOM to update.
1. Call `OnAfterRender{Async}`. The synchronous method is called prior to the asynchronous method.

Developer calls to `StateHasChanged` result in a rerender. For more information, see ASP.NET Core Razor component rendering.

## Quiescence during prerendering

In server-side Blazor apps, prerendering waits for *quiescence*, which means that a component doesn't render until all of the components in the render tree have finished rendering. Quiescence can lead to noticeable delays in rendering when a component performs long-running tasks during initialization and other lifecycle methods, leading to a poor user experience. For more information, see the Handle incomplete asynchronous actions at render section later in this article.

## When parameters are set (`SetParametersAsync`)

`Microsoft.AspNetCore.Components.ComponentBase.SetParametersAsync*` sets parameters supplied by the component's parent in the render tree or from route parameters.

The method's `Microsoft.AspNetCore.Components.ParameterView` parameter contains the set of component parameter values for the component each time `Microsoft.AspNetCore.Components.ComponentBase.SetParametersAsync*` is called. By overriding the `Microsoft.AspNetCore.Components.ComponentBase.SetParametersAsync*` method, developer code can interact directly with `Microsoft.AspNetCore.Components.ParameterView`'s parameters.

The default implementation of `Microsoft.AspNetCore.Components.ComponentBase.SetParametersAsync*` sets the value of each property with the `[Parameter]` or `[CascadingParameter]` attribute that has a corresponding value in the `Microsoft.AspNetCore.Components.ParameterView`. Parameters that don't have a corresponding value in `Microsoft.AspNetCore.Components.ParameterView` are left unchanged.

Generally, your code should call the base class method (`await base.SetParametersAsync(parameters);`) when overriding `Microsoft.AspNetCore.Components.ComponentBase.SetParametersAsync*`. In advanced scenarios, developer code can interpret the incoming parameters' values in any way required by not invoking the base class method. For example, there's no requirement to assign the incoming parameters to the properties of the class. However, you must refer to the `ComponentBase` reference source when structuring your code without calling the base class method because it calls other lifecycle methods and triggers rendering in a complex fashion.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

If you want to rely on the initialization and rendering logic of `Microsoft.AspNetCore.Components.ComponentBase.SetParametersAsync*` but not process incoming parameters, you have the option of passing an empty `Microsoft.AspNetCore.Components.ParameterView` to the base class method:

```csharp
await base.SetParametersAsync(ParameterView.Empty);
```

If event handlers are provided in developer code, unhook them on disposal. For more information, see ASP.NET Core Razor component disposal.

In the following example, `Microsoft.AspNetCore.Components.ParameterView.TryGetValue*` assigns the `Param` parameter's value to `value` if parsing a route parameter for `Param` is successful. When `value` isn't `null`, the value is displayed by the component.

Although route parameter matching is case insensitive, `Microsoft.AspNetCore.Components.ParameterView.TryGetValue*` only matches case-sensitive parameter names in the route template. The following example requires the use of `/{Param?}` in the route template in order to get the value with `Microsoft.AspNetCore.Components.ParameterView.TryGetValue*`, not `/{param?}`. If `/{param?}` is used in this scenario, `Microsoft.AspNetCore.Components.ParameterView.TryGetValue*` returns `false` and `message` isn't set to either `message` string.

`SetParamsAsync.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/SetParamsAsync.razor._
## Component initialization (`OnInitialized{Async}`)

`Microsoft.AspNetCore.Components.ComponentBase.OnInitialized*` and `Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync*` are used exclusively to initialize a component for the entire lifetime of the component instance. Parameter values and parameter value changes shouldn't affect the initialization performed in these methods. For example, loading static options into a dropdown list that doesn't change for the lifetime of the component and that isn't dependent on parameter values is performed in one of these lifecycle methods. If parameter values or changes in parameter values affect component state, use `OnParametersSet{Async}` instead.

These methods are invoked when the component is initialized after having received its initial parameters in `Microsoft.AspNetCore.Components.ComponentBase.SetParametersAsync*`. The synchronous method is called prior to the asynchronous method.

If synchronous parent component initialization is used, the parent initialization is guaranteed to complete before child component initialization. If asynchronous parent component initialization is used, the completion order of parent and child component initialization can't be determined because it depends on the initialization code running.

For a synchronous operation, override `Microsoft.AspNetCore.Components.ComponentBase.OnInitialized*`:

`OnInit.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/OnInit.razor._
To perform an asynchronous operation, override `Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync*` and use the `await` operator:

```csharp
protected override async Task OnInitializedAsync()
{
    await ...
}
```

If a custom base class is used with custom initialization logic, call `Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync*` on the base class:

```csharp
protected override async Task OnInitializedAsync()
{
    await ...

    await base.OnInitializedAsync();
}
```

It isn't necessary to call `Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync*` unless a custom base class is used with custom logic. For more information, see the Base class lifecycle methods section.

A component must ensure that it's in a valid state for rendering when `Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync*` awaits a potentially incomplete `System.Threading.Tasks.Task`. If the method returns an incomplete `System.Threading.Tasks.Task`, the part of the method that completes synchronously must leave the component in a valid state for rendering. For more information, see the introductory remarks of ASP.NET Core Blazor synchronization context and ASP.NET Core Razor component disposal.

Blazor apps that prerender their content on the server call `Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync*` *twice*:

* Once when the component is initially rendered statically as part of the page.
* A second time when the browser renders the component.

To prevent developer code in `Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync*` from running twice when prerendering, see the Stateful reconnection after prerendering section. The content in the section focuses on Blazor Web Apps and stateful SignalR *reconnection*. To preserve state during the execution of initialization code while prerendering, see ASP.NET Core Blazor prerendered state persistence.

While a Blazor app is prerendering, certain actions, such as calling into JavaScript (JS interop), aren't possible. Components may need to render differently when prerendered. For more information, see the Prerendering with JavaScript interop section.

If event handlers are provided in developer code, unhook them on disposal. For more information, see ASP.NET Core Razor component disposal.

Use *streaming rendering* with static server-side rendering (static SSR) or prerendering to improve the user experience for components that perform long-running asynchronous tasks in `Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync*` to fully render. For more information, see the following resources:

* Handle incomplete asynchronous actions at render (this article)
* ASP.NET Core Razor component rendering
