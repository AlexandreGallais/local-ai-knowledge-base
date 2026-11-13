---
title: "ASP.NET Core Blazor event handling (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/event-handling.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor event handling (part 2 of 2)

## EventCallback

A common scenario with nested components is executing a method in a parent component when a child component event occurs. An `onclick` event occurring in the child component is a common use case. To expose events across components, use an `Microsoft.AspNetCore.Components.EventCallback`. A parent component can assign a callback method to a child component's `Microsoft.AspNetCore.Components.EventCallback`.

The following `Child` component demonstrates how a button's `onclick` handler is set up to receive an `Microsoft.AspNetCore.Components.EventCallback` delegate from the sample's `ParentComponent`. The `Microsoft.AspNetCore.Components.EventCallback` is typed with `Microsoft.AspNetCore.Components.Web.MouseEventArgs`, which is appropriate for an `onclick` event from a peripheral device.

`Child.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Child.razor._
The parent component sets the child's `Microsoft.AspNetCore.Components.EventCallback`1` (`OnClickCallback`) to its `ShowMessage` method.

`ParentChild.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/ParentChild.razor._
When the button is selected in the `ChildComponent`:

* The `Parent` component's `ShowMessage` method is called. `message` is updated and displayed in the `Parent` component.
* A call to `StateHasChanged` isn't required in the callback's method (`ShowMessage`). `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` is called automatically to rerender the `Parent` component, just as child events trigger component rerendering in event handlers that execute within the child. For more information, see ASP.NET Core Razor component rendering.

Use `Microsoft.AspNetCore.Components.EventCallback` and `Microsoft.AspNetCore.Components.EventCallback`1` for event handling and binding component parameters.

Prefer the strongly typed `Microsoft.AspNetCore.Components.EventCallback`1` over `Microsoft.AspNetCore.Components.EventCallback`. `Microsoft.AspNetCore.Components.EventCallback`1` provides enhanced error feedback when an inappropriate type is used, guiding users of the component towards correct implementation. Similar to other UI event handlers, specifying the event parameter is optional. Use `Microsoft.AspNetCore.Components.EventCallback` when there's no value passed to the callback.

`Microsoft.AspNetCore.Components.EventCallback` and `Microsoft.AspNetCore.Components.EventCallback`1` permit asynchronous delegates. `Microsoft.AspNetCore.Components.EventCallback` is weakly typed and allows passing any type argument in `InvokeAsync(Object)`. `Microsoft.AspNetCore.Components.EventCallback`1` is strongly typed and requires passing a `T` argument in `InvokeAsync(T)` that's assignable to `TValue`.

Invoke an `Microsoft.AspNetCore.Components.EventCallback` or `Microsoft.AspNetCore.Components.EventCallback`1` with `Microsoft.AspNetCore.Components.EventCallback.InvokeAsync*` and await the `System.Threading.Tasks.Task`:

```csharp
await OnClickCallback.InvokeAsync({ARGUMENT});
```

In the preceding example, the `{ARGUMENT}` placeholder is an optional argument.

The following parent-child example demonstrates the technique.

`Child2.razor`:

```razor
<h3>Child2 Component</h3>

<button @onclick="TriggerEvent">Click Me</button>

@code {
    [Parameter]
    public EventCallback<string> OnClickCallback { get; set; }

    private async Task TriggerEvent()
    {
        await OnClickCallback.InvokeAsync("Blaze It!");
    }
}
```

`ParentChild2.razor`:

```razor
@page "/parent-child-2"

<PageTitle>Parent Child 2</PageTitle>

<h1>Parent Child 2 Example</h1>

<div>
    <Child2 OnClickCallback="(value) => { message1 = value; }" />
    @message1
</div>

<div>
    <Child2 OnClickCallback=
        "async (value) => { await Task.Delay(2000); message2 = value; }" /> 
    @message2
</div>

@code {
    private string message1 = string.Empty;
    private string message2 = string.Empty;
}
```

The second occurrence of the `Child2` component demonstrates an asynchronous callback, and the new `message2` value is assigned and rendered with a delay of two seconds.

## Prevent default actions

Use the `@on{DOM EVENT}:preventDefault` directive attribute to prevent the default action for an event, where the `{DOM EVENT}` placeholder is a DOM event.

When a key is selected on an input device and the element focus is on a text box, a browser normally displays the key's character in the text box. In the following example, the default behavior is prevented by specifying the `@onkeydown:preventDefault` directive attribute. When the focus is on the `` element, the counter increments with the key <example-value> `Shift`+`+`. The `+` character isn't assigned to the `` element's value. For more information on `keydown`, see `MDN Web Docs: Document: keydown` event.

`EventHandler6.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler6.razor._
Specifying the `@on{DOM EVENT}:preventDefault` attribute without a value is equivalent to `@on{DOM EVENT}:preventDefault="true"`.

An expression is also a permitted value of the attribute. In the following example, `shouldPreventDefault` is a `bool` field set to either `true` or `false`:

```razor
<input @onkeydown:preventDefault="shouldPreventDefault" />

...

@code {
    private bool shouldPreventDefault = true;
}
```

## Stop event propagation

Use the `@on{DOM EVENT}:stopPropagation` directive attribute to stop event propagation within the Blazor scope. `{DOM EVENT}` is a placeholder for a DOM event.

The `stopPropagation` directive attribute's effect is limited to the Blazor scope and doesn't extend to the HTML DOM. Events must propagate to the HTML DOM root before Blazor can act upon them. For a mechanism to prevent HTML DOM event propagation, consider the following approach:

* Obtain the event's path by calling `Event.composedPath()`.
* Filter events based on the composed event targets (`EventTarget`).

In the following example, selecting the checkbox prevents click events from the second child `` from propagating to the parent ``. Since propagated click events normally fire the `OnSelectParentDiv` method, selecting the second child `` results in the parent `` message appearing unless the checkbox is selected.

`EventHandler7.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler7.razor._
## Focus an element

Call `Microsoft.AspNetCore.Components.ElementReferenceExtensions.FocusAsync*` on an element reference to focus an element in code. In the following example, select the button to focus the `` element.

`EventHandler8.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler8.razor._
