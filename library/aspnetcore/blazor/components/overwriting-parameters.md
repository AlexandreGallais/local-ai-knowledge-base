---
title: "Avoid overwriting parameters in ASP.NET Core Blazor"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/overwriting-parameters.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Avoid overwriting parameters in ASP.NET Core Blazor

-->
-->

By Robert Haken

This article explains how to avoid overwriting parameters in Blazor apps during rerendering.

## Overwritten parameters

The Blazor framework generally imposes safe parent-to-child parameter assignment:

* Parameters aren't overwritten unexpectedly.
* Side effects are minimized. For example, additional renders are avoided because they may create infinite rendering loops.

A child component receives new parameter values that possibly overwrite existing values when the parent component rerenders. Accidentally overwriting parameter values in a child component often occurs when developing the component with one or more data-bound parameters and the developer writes directly to a parameter in the child:

* The child component is rendered with one or more parameter values from the parent component.
* The child writes directly to the value of a parameter.
* The parent component rerenders and overwrites the value of the child's parameter.

The potential for overwriting parameter values extends into the child component's property `set` accessors, too.

> **Important:**
> Our general guidance is not to create components that directly write to their own parameters after the component is rendered for the first time.

Consider the following `ShowMoreExpander` component that:

* Renders the title.
* Shows the child content when selected.
* Allows you to set initial state with a component parameter (`InitiallyExpanded`).

After the following `ShowMoreExpander` component demonstrates an overwritten parameter, a modified `ShowMoreExpander` component is shown to demonstrate the correct approach for this scenario. The following examples can be placed in a local sample app to experience the behaviors described.

`ShowMoreExpander.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/BadShowMoreExpander.razor._
The `ShowMoreExpander` component is added to the following `Expanders` parent component that may call `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*`:

* Calling `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` in developer code notifies a component that its state has changed and typically enqueues component rerendering to update the UI. `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` is covered in more detail later in ASP.NET Core Razor component lifecycle and ASP.NET Core Razor component rendering.
* The button's `@onclick` directive attribute attaches an event handler to the button's `onclick` event. Event handling is covered in more detail later in ASP.NET Core Blazor event handling.

`Expanders.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Expanders.razor._
Initially, the `ShowMoreExpander` components behave independently when their `InitiallyExpanded` properties are set. The child components maintain their states as expected.

If `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` is called in a parent component, the Blazor framework rerenders child components if their parameters might have changed:

* For a group of parameter types that Blazor explicitly checks, Blazor rerenders a child component if it detects that any of the parameters have changed.
* For unchecked parameter types, Blazor rerenders the child component *regardless of whether or not the parameters have changed*. Child content falls into this category of parameter types because child content is of type `Microsoft.AspNetCore.Components.RenderFragment`, which is a delegate that refers to other mutable objects.

For the `Expanders` component:

* The first `ShowMoreExpander` component sets child content in a potentially mutable `Microsoft.AspNetCore.Components.RenderFragment`, so a call to `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` in the parent component automatically rerenders the component and potentially overwrites the value of `InitiallyExpanded` to its initial value of `false`.
* The second `ShowMoreExpander` component doesn't set child content. Therefore, a potentially mutable `Microsoft.AspNetCore.Components.RenderFragment` doesn't exist. A call to `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` in the parent component doesn't automatically rerender the child component, so the component's `InitiallyExpanded` value isn't overwritten.

To maintain state in the preceding scenario, use a *private field* in the `ShowMoreExpander` component to maintain its state.

The following revised `ShowMoreExpander` component:

* Accepts the `InitiallyExpanded` component parameter value from the parent.
* Assigns the component parameter value to a *private field* (`expanded`) in the `OnInitialized` event.
* Uses the private field to maintain its internal toggle state, which demonstrates how to avoid writing directly to a parameter.

> **Note:**
> The advice in this section extends to similar logic in component parameter `set` accessors, which can result in similar undesirable side effects.

`ShowMoreExpander.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/ShowMoreExpander.razor._
> **Note:**
> The revised `ShowMoreExpander` doesn't reflect changes to the `InitiallyExpanded` parameter after initialization (`OnInitialized`). In certain scenarios, an already initialized component might receive new parameter values. This can happen, for example, in a primary-subordinate view where the same component is used to render different detail views or when the `/item/{id}` route parameter changes to display a different item.

Consider following `ToggleExpander` component that:

* Allows you to change the state both from inside and outside.
* Handles new parameter values even if the same component instance is reused.

`ToggleExpander.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/ToggleExpander.razor._
The `ToggleExpander` component should be used with the `@bind-Expanded="{field}"` binding syntax, allowing two-way synchronization of the parameter.

`ExpandersToggle.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/ExpandersToggle.razor._
For more information on parent-child binding, see the following resources:

* Binding with component parameters
* Bind across more than two components
* Blazor Two Way Binding Error (dotnet/aspnetcore #24599)

For more information on change detection, including information on the exact types that Blazor checks, see ASP.NET Core Razor component rendering.
