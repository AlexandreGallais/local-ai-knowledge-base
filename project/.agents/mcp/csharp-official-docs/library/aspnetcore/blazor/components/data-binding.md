---
title: "ASP.NET Core Blazor data binding (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/components/data-binding.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor data binding

This article explains data binding features for Razor components and DOM elements in Blazor apps.

## Binding features

Razor components provide data binding features with the `@bind` Razor directive attribute with a field, property, or Razor expression value.

The following example binds:

* An `` element value to the C# `inputValue` field.
* A second `` element value to the C# `InputValue` property.

When an `` element loses focus, its bound field or property is updated.

`Bind.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Bind.razor._
The text box is updated in the UI only when the component is rendered, not in response to changing the field's or property's value. Since components render themselves after event handler code executes, field and property updates are usually reflected in the UI immediately after an event handler is triggered.

As a demonstration of how data binding composes in HTML, the following example binds the `InputValue` property to the second `` element's `value` and `onchange` attributes (`change`). *The second `` element in the following example is a concept demonstration and isn't meant to suggest how you should bind data in Razor components.*

`BindTheory.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/BindTheory.razor._
When the `BindTheory` component is rendered, the `value` of the HTML demonstration `` element comes from the `InputValue` property. When the user enters a value in the text box and changes element focus, the `onchange` event is fired and the `InputValue` property is set to the changed value. In reality, code execution is more complex because `@bind` handles cases where type conversions are performed. In general, `@bind` associates the current value of an expression with the `value` attribute of the `` and handles changes using the registered handler.

Default binding with `@bind` uses the `change` DOM event (`onchange`). Binding can also take place on the `input` DOM event using the `@bind:event="{EVENT}"` attribute, where the `{EVENT}` placeholder is either `oninput` or `onchange` (default).

The following example binds the `InputValue` property to the `` element's value when the element's `oninput` event is triggered. Unlike the `onchange` event, which fires when the element loses focus, `oninput` fires when the value of the text box changes.

`Page/BindEvent.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/BindEvent.razor._
To bind on other DOM events, use either of the following approaches:

* Delegate event handlers
* Custom event arguments

To execute asynchronous logic after binding, use `@bind:after="{DELEGATE}"`, where the `{DELEGATE}` placeholder is a C# delegate (method). An assigned C# delegate isn't executed until the bound value is assigned synchronously.

Using an event callback parameter (`EventCallback`/`EventCallback<T>`) with `@bind:after` isn't supported. Instead, pass a method that returns an `System.Action` or `System.Threading.Tasks.Task` to `@bind:after`.

In the following example:

* Each `` element's `value` is bound to the `searchText` field synchronously.
* The `PerformSearch` method executes asynchronously:
  * When the first box loses focus (`onchange` event) after the value is changed.
  * After each keystroke (`oninput` event) in the second box.
* `PerformSearch` calls a service with an asynchronous method (`FetchAsync`) to return search results.

```razor
@inject ISearchService SearchService

<input @bind="searchText" @bind:after="PerformSearch" />
<input @bind="searchText" @bind:event="oninput" @bind:after="PerformSearch" />

@code {
    private string? searchText;
    private string[]? searchResult;

    private async Task PerformSearch() => 
        searchResult = await SearchService.FetchAsync(searchText);
}
```

Additional examples

`BindAfter.razor`:

```razor
@page "/bind-after"
@using Microsoft.AspNetCore.Components.Forms

<h1>Bind After Examples</h1>

<h2>Elements</h2>

<input type="text" @bind="text" @bind:after="() => { }" />

<input type="text" @bind="text" @bind:after="After" />

<input type="text" @bind="text" @bind:after="AfterAsync" />

<h2>Components</h2>

<InputText @bind-Value="text" @bind-Value:after="() => { }" />

<InputText @bind-Value="text" @bind-Value:after="After" />

<InputText @bind-Value="text" @bind-Value:after="AfterAsync" />

@code {
    private string text = "";

    private void After() {}
    private Task AfterAsync() { return Task.CompletedTask; }
}
```

For more information on the `InputText` component, see ASP.NET Core Blazor input components.

Components support two-way data binding by defining a pair of `@bind` attributes with either a `:get` or `:set` modifier. The `{PARAMETER}` placeholder in the following examples is used to bind a component parameter:

* `@bind:get`/`@bind-{PARAMETER}:get`: Specifies the value to bind.
* `@bind:set`/`@bind-{PARAMETER}:set`: Specifies a callback for when the value changes.

The `:get`/`:set` modifiers are always used together.

For binding to HTML elements, use `:get`/`:set` modifiers to ensure an `` element stays synchronized with a bound value, even when the value is modified in the handler:

```razor
<input @bind:get="inputValue" @bind:set="HandleValueChange" />
```

> **Note:**
> The legacy approach prior to the release of .NET 7 used the `value` attribute with `@onchange`:
>
> ```razor
>
> ```
>
> The preceding approach can cause synchronization errors, where the `` element displays a different value than the value held in the bound variable. Migrate to `:get`/`:set` modifiers to avoid this issue.

For component parameters, the following syntaxes for a hypothetical `Child` component are functionally equivalent:

```razor
<Child Value="@inputValue" ValueChanged="@(v => inputValue = v)" />
<Child @bind-Value:get="inputValue" @bind-Value:set="@(v => inputValue = v)" />
```

With `:get`/`:set` modifier binding, you can react to a value change before it's applied to the DOM, and you can change the applied value, if necessary. Whereas with `@bind:event="{EVENT}"` attribute binding, where the `{EVENT}` placeholder is a DOM event, you receive the notification after the DOM is updated, and there's no capacity to modify the applied value while binding.

The following `BindGetSet` component demonstrates `:get`/`:set` syntax for `` elements and the `InputText` component used by Blazor forms in synchronous (`Set`) and asynchronous (`SetAsync`) scenarios.

`BindGetSet.razor`:

```razor
@page "/bind-get-set"
@using Microsoft.AspNetCore.Components.Forms

<h1>Bind Get Set Examples</h1>

<h2>Elements</h2>

<input type="text" @bind:get="text" @bind:set="(value) => { text = value; }" />
<input type="text" @bind:get="text" @bind:set="Set" />
<input type="text" @bind:get="text" @bind:set="SetAsync" />

<h2>Components</h2>

<InputText @bind-Value:get="text" @bind-Value:set="(value) => { text = value; }" />
<InputText @bind-Value:get="text" @bind-Value:set="Set" />
<InputText @bind-Value:get="text" @bind-Value:set="SetAsync" />

@code {
    private string text = string.Empty;

    private void Set(string value)
    {
        text = value;
    }

    private Task SetAsync(string value)
    {
        text = value;
        return Task.CompletedTask;
    }
}
```

For more information on the `InputText` component, see ASP.NET Core Blazor input components.

For another example use of `:get` and `:set` modifiers, see the Bind across more than two components section later in this article.

Razor attribute binding is case-sensitive:

* `@bind`, `@bind:event`, and `@bind:after` are valid.
* `@Bind`/`@bind:Event`/`@bind:aftEr` (capital letters) or `@BIND`/`@BIND:EVENT`/`@BIND:AFTER` (all capital letters) **are invalid**.

## Use `@bind:get`/`@bind:set` modifiers and avoid event handlers for two-way data binding

Two-way data binding isn't possible to implement with an event handler. Use `:get`/`:set` modifiers for two-way data binding.

❌ Consider the following ***dysfunctional approach*** for two-way data binding using an event handler:

```razor
<p>
    <input value="@inputValue" @oninput="OnInput" />
</p>

<p>
    <code>inputValue</code>: @inputValue
</p>

@code {
    private string? inputValue;

    private void OnInput(ChangeEventArgs args)
    {
        var newValue = args.Value?.ToString() ?? string.Empty;

        inputValue = newValue.Length > 4 ? "Long!" : newValue;
    }
}
```

The `OnInput` event handler updates the value of `inputValue` to `Long!` after a fourth character is provided. However, the user can continue adding characters to the element value in the UI. The value of `inputValue` isn't bound back to the element's value with each keystroke. The preceding example is only capable of one-way data binding.

The reason for this behavior is that Blazor isn't aware that your code intends to modify the value of `inputValue` in the event handler. Blazor doesn't try to force DOM element values and .NET variable values to match unless they're bound with `@bind` syntax. In earlier versions of Blazor, two-way data binding is implemented by binding the element to a property and controlling the property's value with its setter. In ASP.NET Core in .NET 7 or later, `:get`/`:set` modifier syntax is used to implement two-way data binding, as the next example demonstrates.

✔️ Consider the following ***correct approach*** using `:get`/`:set` for two-way data binding:

```razor
<p>
    <input @bind:event="oninput" @bind:get="inputValue" @bind:set="OnInput" />
</p>

<p>
    <code>inputValue</code>: @inputValue
</p>

@code {
    private string? inputValue;

    private void OnInput(string value)
    {
        var newValue = value ?? string.Empty;

        inputValue = newValue.Length > 4 ? "Long!" : newValue;
    }
}
```

Using `:get`/`:set` modifiers both controls the underlying value of `inputValue` via `:set` and binds the value of `inputValue` to the element's value via `:get`. The preceding example demonstrates the correct approach for implementing two-way data binding.

## Binding to a property with C# `get` and `set` accessors

C# `get` and `set` accessors can be used to create custom binding format behavior, as the following `DecimalBinding` component demonstrates. The component binds a positive or negative decimal with up to three decimal places to an `` element by way of a `string` property (`DecimalValue`).

`DecimalBinding.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/DecimalBinding.razor._
> **Note:**
> Across multiple components, two-way binding to a property with `get`/`set` accessors requires discarding the `System.Threading.Tasks.Task` returned by `Microsoft.AspNetCore.Components.EventCallback.InvokeAsync*` in the property's setter. For two-way data binding, we recommend using `@bind:get`/`@bind:set` modifiers. For more information, see the `@bind:get`/`@bind:set` guidance earlier in this article.
>
> To see an example of how the `System.Threading.Tasks.Task` returned by `Microsoft.AspNetCore.Components.EventCallback.InvokeAsync*` is discarded in .NET 6 or earlier before `@bind:get`/`@bind:set` modifiers became a framework feature, see the `NestedChild` component of the *Bind across more than two components* section in the .NET 6 version of this article.

## Multiple option selection with `<select>` elements

Binding supports `multiple` option selection with `<select>` elements. The `@onchange` event provides an array of the selected elements via event arguments (`ChangeEventArgs`). The value must be bound to an array type.

`BindMultipleInput.razor`:

```razor
@page "/bind-multiple-input"

<h1>Bind Multiple <code>input</code>Example</h1>

<p>
    <label>
        Select one or more cars: 
        <select @onchange="SelectedCarsChanged" multiple>
            <option value="audi">Audi</option>
            <option value="jeep">Jeep</option>
            <option value="opel">Opel</option>
            <option value="saab">Saab</option>
            <option value="volvo">Volvo</option>
        </select>
    </label>
</p>

<p>
    Selected Cars: @string.Join(", ", SelectedCars)
</p>

<p>
    <label>
        Select one or more cities: 
        <select @bind="SelectedCities" multiple>
            <option value="bal">Baltimore</option>
            <option value="la">Los Angeles</option>
            <option value="pdx">Portland</option>
            <option value="sf">San Francisco</option>
            <option value="sea">Seattle</option>
        </select>
    </label>
</p>

<span>
    Selected Cities: @string.Join(", ", SelectedCities)
</span>

@code {
    public string[] SelectedCars { get; set; } = [];
    public string[] SelectedCities { get; set; } = [ "bal", "sea" ];

    private void SelectedCarsChanged(ChangeEventArgs e)
    {
        if (e.Value is not null)
        {
            SelectedCars = (string[])e.Value;
        }
    }
}
```

For information on how empty strings and `null` values are handled in data binding, see the Binding `<select>` element options to C# object `null` values section.

## Binding `<select>` element options to C# object `null` values

There's no sensible way to represent a `<select>` element option value as a C# object `null` value, because:

* HTML attributes can't have `null` values. The closest equivalent to `null` in HTML is absence of the HTML `value` attribute from the `<option>` element.
* When selecting an `<option>` with no `value` attribute, the browser treats the value as the *text content* of that `<option>`'s element.

The Blazor framework doesn't attempt to suppress the default behavior because it would involve:

* Creating a chain of special-case workarounds in the framework.
* Breaking changes to current framework behavior.

The most plausible `null` equivalent in HTML is an *empty string* `value`. The Blazor framework handles `null` to empty string conversions for two-way binding to a `<select>`'s value.
