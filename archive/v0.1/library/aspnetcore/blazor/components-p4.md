---
title: "ASP.NET Core Razor components (part 4 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Razor components (part 4 of 6)

## Component parameters

*Component parameters* pass data to components and are defined using public C# properties on the component class with the `[Parameter]` attribute.

In the following `ParameterChild` component, component parameters include:

* Built-in reference types.

  * `System.String` to pass a title in `Title`.
  * `System.Int32` to pass a count in `Count`.

* A user-defined reference type (`PanelBody`) to pass a Bootstrap card body in `Body`.

  `PanelBody.cs`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/PanelBody.cs._
`ParameterChild.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/ParameterChild.razor._
> **Warning:**
> Providing initial values for component parameters is supported, but don't create a component that writes to its own parameters after the component is rendered for the first time. For more information, see Avoid overwriting parameters in ASP.NET Core Blazor.

The component parameters of the `ParameterChild` component can be set by arguments in the HTML tag that renders an instance of the `ParameterChild` component. The following parent component renders two `ParameterChild` components:

* The first `ParameterChild` component is rendered without supplying parameter arguments.
* The second `ParameterChild` component receives values for `Title` and `Body` from the parent component, which uses an explicit C# expression to set the values of the `PanelBody`'s properties.

`Parameter1.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Parameter1.razor._
The following rendered HTML markup from the parent component shows `ParameterChild` component default values when the parent component doesn't supply component parameter values. When the parent component provides component parameter values, they replace the `ParameterChild` component's default values.

> **Note:**
> For clarity, most of the rendered CSS style classes and some elements aren't shown in the following rendered HTML markup. The main concept demonstrated by the following example is that the parent component assigned values to the child component using its component parameters.

```html
<h1>Child component (without attribute values)</h1>

<div>Set By Child</div>
<div style="font-style:normal">
    <p>Card content set by child.</p>
</div>

<h1>Child component (with attribute values)</h1>

<div>Set by Parent</div>
<div style="font-style:italic">
    <p>Set by parent.</p>
</div>
```

Assign a C# field, property, or result of a method to a component parameter as an HTML attribute value. The value of the attribute can typically be any C# expression that matches the type of the parameter. The value of the attribute can optionally lead with a Razor reserved `@` symbol, but it isn't required.

If the component parameter is of type string, then the attribute value is instead treated as a C# string literal. If you want to specify a C# expression instead, then use the `@` prefix.

The following parent component displays four instances of the preceding `ParameterChild` component and sets their `Title` parameter values to:

* The value of the `title` field.
* The result of the `GetTitle` C# method.
* The current local date in long format with `System.DateTime.ToLongDateString*`, which uses an implicit C# expression.
* The `panelData` object's `Title` property.

The fifth `ParameterChild` component instance also sets the `Count` parameter. Note how a `string`-typed parameter requires an `@` prefix to ensure that an expression isn't treated as a string literal. However, `Count` is a nullable integer (`System.Int32`), so `Count` can receive the value of `count` without an `@` prefix. You can establish an alternative code convention that requires developers in your organization to always prefix with `@`. Either way, we merely recommend that you adopt a consistent approach for how component parameters are passed in Razor markup.

Quotes around parameter attribute values are optional in most cases per the HTML5 specification. For example, `Value=this` is supported, instead of `Value="this"`. However, we recommend using quotes because it's easier to remember and widely adopted across web-based technologies.

Throughout the documentation, code examples:

* Always use quotes. Example: `Value="this"`.
* Don't use the `@` prefix with nonliterals unless required. Example: `Count="count"`, where `count` is a number-typed variable. `Count="@count"` is a valid stylistic approach, but the documentation and examples don't adopt the convention.
* Always avoid `@` for literals, outside of Razor expressions. Example: `IsFixed="true"`. This includes keywords (for example, `this`) and `null`, but you can choose to use them if you wish. For example, `IsFixed="@true"` is uncommon but supported.

`Parameter2.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Parameter2.razor._
> **Note:**
> When assigning a C# member to a component parameter, don't prefix the parameter's HTML attribute with `@`.
>
> Correct (`Title` is a string parameter, `Count` is a number-typed parameter):
>
> ```razor
> <ParameterChild Title="@title" Count="count" />
> ```
>
> ```razor
> <ParameterChild Title="@title" Count="@count" />
> ```
>
> Incorrect:
>
> ```razor
> <ParameterChild @Title="@title" @Count="count" />
> ```
>
> ```razor
> <ParameterChild @Title="@title" @Count="@count" />
> ```

Unlike in Razor pages (`.cshtml`), Blazor can't perform asynchronous work in a Razor expression while rendering a component. This is because Blazor is designed for rendering interactive UIs. In an interactive UI, the screen must always display something, so it doesn't make sense to block the rendering flow. Instead, asynchronous work is performed during one of the asynchronous lifecycle events. After each asynchronous lifecycle event, the component may render again. The following Razor syntax is **not** supported:

```razor
<ParameterChild Title="await ..." />
<ParameterChild Title="@await ..." />
```

The code in the preceding example generates a *compiler error* when the app is built:

> The 'await' operator can only be used within an async method. Consider marking this method with the 'async' modifier and changing its return type to 'Task'.

To obtain a value for the `Title` parameter in the preceding example asynchronously, the component can use the `OnInitializedAsync` lifecycle event, as the following example demonstrates:

```razor
<ParameterChild Title="@title" />

@code {
    private string? title;
    
    protected override async Task OnInitializedAsync()
    {
        title = await ...;
    }
}
```

For more information, see ASP.NET Core Razor component lifecycle.

Use of an explicit Razor expression to concatenate text with an expression result for assignment to a parameter is **not** supported. The following example seeks to concatenate the text "`Set by `" with an object's property value. Although this syntax is supported in a Razor page (`.cshtml`), it isn't valid for assignment to the child's `Title` parameter in a component. The following Razor syntax is **not** supported:

```razor
<ParameterChild Title="Set by @(panelData.Title)" />
```

The code in the preceding example generates a *compiler error* when the app is built:

> Component attributes do not support complex content (mixed C# and markup).

To support the assignment of a composed value, use a method, field, or property. The following example performs the concatenation of "`Set by `" and an object's property value in the C# method `GetTitle`:

`Parameter3.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Parameter3.razor._
For more information, see Razor syntax reference for ASP.NET Core.

> **Warning:**
> Providing initial values for component parameters is supported, but don't create a component that writes to its own parameters after the component is rendered for the first time. For more information, see Avoid overwriting parameters in ASP.NET Core Blazor.

Component parameters should be declared as automatically-implemented properties (*auto properties*), meaning that they shouldn't contain custom logic in their `get` or `set` accessors. For example, the following `StartData` property is an auto property:

```csharp
[Parameter]
public DateTime StartData { get; set; }
```

Don't place custom logic in the `get` or `set` accessor because component parameters are purely intended for use as a channel for a parent component to flow information to a child component. If a `set` accessor of a child component property contains logic that causes rerendering of the parent component, an infinite rendering loop results. Other side effects include unexpected extra renderings and parameter value overwrites.

To transform a received parameter value:

* Leave the parameter property as an auto-property to represent the supplied raw data.
* Create a different property or method to supply the transformed data based on the parameter property.

Override `OnParametersSetAsync` to transform a received parameter each time new data is received.

Writing an initial value to a component parameter is supported because initial value assignments don't interfere with the Blazor's automatic component rendering. The following assignment of the current local `System.DateTime` with `System.DateTime.Now` to `StartData` is valid syntax in a component:

```csharp
[Parameter]
public DateTime StartData { get; set; } = DateTime.Now;
```

After the initial assignment of `System.DateTime.Now`, do **not** assign a value to `StartData` in developer code. For more information, see Avoid overwriting parameters in ASP.NET Core Blazor.

Apply the `[EditorRequired]` attribute to specify a required component parameter. If a parameter value isn't provided, editors or build tools may display warnings to the user. This attribute is only valid on properties also marked with the `[Parameter]` attribute. The `Microsoft.AspNetCore.Components.EditorRequiredAttribute` is enforced at design-time and when the app is built. The attribute isn't enforced at runtime, and it doesn't guarantee a non-`null` parameter value.

```csharp
[Parameter]
[EditorRequired]
public string? Title { get; set; }
```

Single-line attribute lists are also supported:

```csharp
[Parameter, EditorRequired]
public string? Title { get; set; }
```

Don't use the `required` modifier or `init` accessor on component parameter properties. Components are usually instantiated and assigned parameter values using reflection, which bypasses the guarantees that `init` and `required` are designed to make. Instead, use the `[EditorRequired]` attribute to specify a required component parameter.

`Tuples` (API documentation) are supported for component parameters and `RenderFragment` types. The following component parameter example passes three values in a `Tuple`:

`RenderTupleChild.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/RenderTupleChild.razor._
`RenderTupleParent.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/RenderTupleParent.razor._
Named tuples are supported, as seen in the following example:

`NamedTupleChild.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/NamedTupleChild.razor._
`NamedTuples.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/NamedTuples.razor._
Quote &copy;2005 Universal Pictures: Serenity (Nathan Fillion)

Support for C# union types allows a single component parameter to represent a value that's exactly one of a fixed set of types with compiler-enforced exhaustive pattern matching. A component parameter is set by direct assignment when a component is rendered from Razor markup or through `Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder.AddComponentParameter*`.

> **Note:**
> During the preview of .NET 11, the following example requires the app's project file to specify the "`preview`" C# language version:
>
> ```xml
> <LangVersion>preview</LangVersion>
> ```

The following C# union type, `SlotContent`, accepts text, a `Microsoft.AspNetCore.Components.MarkupString`, or a `Microsoft.AspNetCore.Components.RenderFragment`:

```csharp
using Microsoft.AspNetCore.Components;

public union SlotContent(string, MarkupString, RenderFragment);
```

The following `Slot` component exposes a component parameter typed to the `SlotContent` union and renders the union's content using two implementations of the C# `switch` expression, one through an assignment to a `Microsoft.AspNetCore.Components.RenderFragment` (`ContentSwitch`) and one via an inline `switch` expression. In the following example, the `[EditorRequired]` attribute specifies that `Content` is a required component parameter at design-time or build-time.

`Slot.razor`:

```razor
<h2><code>ContentSwitch</code></h2>

<div>
    @ContentSwitch()
</div>

<h2>Inline <code>switch</code> expression</h2>

<div>
    @switch (Content)
    {
        case string text:
            @text
            break;
        case MarkupString html:
            @html
            break;
        case RenderFragment fragment:
            @fragment
            break;
        default:
            <em>Empty slot!</em>
            break;
    }
</div>

@code {
    [Parameter, EditorRequired] 
    public SlotContent Content { get; set; }

    private RenderFragment ContentSwitch() => Content switch
    {
        string text => @<span>@text</span>,
        MarkupString html => @<span>@html</span>,
        RenderFragment fragment => fragment,
        _ => @<em>Empty slot!</em>
    };
}
```

The following `SlotExample` component uses the preceding `SlotContent` type and `Slot` component.

`SlotExample.razor`:

```razor
@page "/slot-example"

<h1>Plain text</h1>

<Slot Content="@("Simple plain text slot")" />

<h1><code>MarkupString</code></h1>

<Slot Content='@((MarkupString)"<strong>Bold HTML slot</strong>")' />

<h1><code>RenderFragment</code></h1>

<Slot Content="@content" />

@code {
    private SlotContent content;

    protected override void OnInitialized()
    {
        content = new SlotContent((RenderFragment)(b =>
        {
            b.OpenElement(0, "button");
            b.AddAttribute(1, "onclick", EventCallback.Factory.Create(this, Increment));
            b.AddContent(2, "Count: ");
            b.AddContent(3, currentCount);
            b.CloseElement();
        }));
    }

    private int currentCount = 0;

    private void Increment() => currentCount++;
}
```
