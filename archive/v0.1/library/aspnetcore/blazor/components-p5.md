---
title: "ASP.NET Core Razor components (part 5 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Razor components (part 5 of 6)

The string-literal shortcut applies only to parameters declared as `string`. A parameter declared as a C# union type, even one whose cases include `string`, isn't a `string`-typed parameter, so the attribute value must be a C# expression. Use the `@` prefix, as demonstrated by `Content="@("Simple plain text slot")"` in the preceding example.

Populating a union-typed parameter via a child content render fragment (`<Slot>...</Slot>`) isn't supported at this time but might be introduced in a future preview release.

For more information, see Explore union types in C# 15.

## Route parameters

Components can specify route parameters in the route template of the `@page` directive. The Blazor router uses route parameters to populate corresponding component parameters.

`RouteParameter1.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/RouteParameter1.razor._
For more information, see the *Route parameters* section of ASP.NET Core Blazor routing. Optional route parameters are also supported and covered in the same section. For information on catch-all route parameters (`{*pageRoute}`), which capture paths across multiple folder boundaries, see the *Catch-all route parameters* section of ASP.NET Core Blazor routing.

> **Warning:**
> With compression, which is enabled by default, avoid creating secure (authenticated/authorized) interactive server-side components that render data from untrusted sources. Untrusted sources include route parameters, query strings, data from JS interop, and any other source of data that a third-party user can control (databases, external services). For more information, see ASP.NET Core Blazor SignalR guidance and Threat mitigation guidance for ASP.NET Core Blazor interactive server-side rendering.

## Child content render fragments

Components can set the content of another component. The assigning component provides the content between the child component's opening and closing tags.

In the following example, the `RenderFragmentChild` component has a `ChildContent` component parameter that represents a segment of the UI to render as a `Microsoft.AspNetCore.Components.RenderFragment`. The position of `ChildContent` in the component's Razor markup is where the content is rendered in the final HTML output.

`RenderFragmentChild.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/RenderFragmentChild.razor._
> **Important:**
> The property receiving the `Microsoft.AspNetCore.Components.RenderFragment` content must be named `ChildContent` by convention.
>
> Event callbacks aren't supported for `Microsoft.AspNetCore.Components.RenderFragment`.

The following component provides content for rendering the `RenderFragmentChild` by placing the content inside the child component's opening and closing tags.

`RenderFragments.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/RenderFragments.razor._
Render fragments are used to render child content throughout Blazor apps and are described with examples in the following articles and article sections:

* Blazor layouts
* Pass data across a component hierarchy
* Templated components
* Global exception handling

> **Note:**
> Blazor framework's built-in Razor components use the same `ChildContent` component parameter convention to set their content. You can see the components that set child content by searching for the component parameter property name `ChildContent` in the API documentation (filters API with the search term "ChildContent").

## Render fragments for reusable rendering logic

You can factor out child components purely as a way of reusing rendering logic. In any component's `@code` block, define a `Microsoft.AspNetCore.Components.RenderFragment` and render the fragment from any location as many times as needed:

```razor
@RenderWelcomeInfo

<p>Render the welcome info a second time:</p>

@RenderWelcomeInfo

@code {
    private RenderFragment RenderWelcomeInfo =  @<p>Welcome to your new app!</p>;
}
```

For more information, see Reuse rendering logic.

## Loop variables with component parameters and child content

Rendering components inside a `for` loop requires a local index variable if the incrementing loop variable is used by the component's parameters or `Microsoft.AspNetCore.Components.RenderFragment` child content.

Consider the following `RenderFragmentChild2` component that has both a component parameter (`Id`) and a render fragment to display child content (`ChildContent`).

`RenderFragmentChild2.razor`:

```razor
<div class="card w-25" style="margin-bottom:15px">
    <div class="card-header font-weight-bold">Child content (@Id)</div>
    <div class="card-body">@ChildContent</div>
</div>

@code {
    [Parameter]
    public string? Id { get; set; }

    [Parameter]
    public RenderFragment? ChildContent { get; set; }
}
```

When rendering the `RenderFragmentChild2` component in a parent component, use a local index variable (`ct` in the following example) instead of the loop variable (`c`) when assigning the component parameter value and providing the child component's content:

```razor
@for (int c = 1; c < 4; c++)
{
    var ct = c;

    <RenderFragmentChild2 Id="@($"Child{ct}")">
        Count: @ct
    </RenderFragmentChild2>
}
```

Alternatively, use a `foreach` loop with `System.Linq.Enumerable.Range*` instead of a `for` loop:

```razor
@foreach (var c in Enumerable.Range(1, 3))
{
    <RenderFragmentChild2 Id="@($"Child{c}")">
        Count: @c
    </RenderFragmentChild2>
}
```

## Capture references to components

Component references provide a way to reference a component instance for issuing commands. To capture a component reference:

* Add an `@ref` attribute to the child component.
* Define a field with the same type as the child component.

When the component is rendered, the field is populated with the component instance. You can then invoke .NET methods on the instance.

Consider the following `ReferenceChild` component that logs a message when its `ChildMethod` is called.

`ReferenceChild.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/ReferenceChild.razor._
A component reference is only populated after the component is rendered and its output includes `ReferenceChild`'s element. Until the component is rendered, there's nothing to reference. Don't attempt to call a referenced component method to an event handler directly (for example, `@onclick="childComponent!.ChildMethod(5)"`) because the reference variable may not be assigned at the time the click event is assigned.

To manipulate component references after the component has finished rendering, use the `OnAfterRender` or `OnAfterRenderAsync` methods.

The following example uses the preceding `ReferenceChild` component.

`ReferenceParent.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/ReferenceParent.razor._
While capturing component references use a similar syntax to capturing element references, capturing component references isn't a JavaScript interop feature. Component references aren't passed to JavaScript code. Component references are only used in .NET code.

> **Important:**
> Do **not** use component references to mutate the state of child components. Instead, use normal declarative component parameters to pass data to child components. Use of component parameters result in child components that rerender at the correct times automatically. For more information, see the component parameters section and the ASP.NET Core Blazor data binding article.

## Apply an attribute

Attributes can be applied to components with the `@attribute` directive. The following example applies the `[Authorize]` attribute to the component's class:

```razor
@page "/"
@attribute [Authorize]
```

## Conditional HTML element attributes and DOM properties

Blazor adopts the following general behaviors:

* For HTML attributes, Blazor sets or removes the attribute conditionally based on the .NET value. If the .NET value is `false` or `null`, the attribute isn't set or is removed if it was previously set.
* For DOM properties, such as `checked` or `value`, Blazor sets the DOM property based on the .NET value. If the .NET value is `false` or `null`, the DOM property is reset to a default value.

Which Razor syntax attributes correspond to HTML attributes and which ones correspond to DOM properties remains undocumented because this is a framework implementation detail that might change without notice.

> **Warning:**
> Some HTML attributes, such as `aria-pressed`, must have a string value of either "true" or "false". Since they require a string value and not a boolean, you must use a .NET `string` and not a `bool` for their value. This is a requirement set by browser DOM APIs.

## Raw HTML

Strings are normally rendered using DOM text nodes, which means that any markup they may contain is ignored and treated as literal text. To render raw HTML, wrap the HTML content in a `Microsoft.AspNetCore.Components.MarkupString` value. The value is parsed as HTML or SVG and inserted into the DOM.

> **Warning:**
> Rendering raw HTML constructed from any untrusted source is a **security risk** and should **always** be avoided.

The following example shows using the `Microsoft.AspNetCore.Components.MarkupString` type to add a block of static HTML content to the rendered output of a component.

`MarkupStrings.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/MarkupStrings.razor._
## Razor templates

Render fragments can be defined using Razor template syntax to define a UI snippet. Razor templates use the following format:

```razor
@<{HTML tag}>...</{HTML tag}>
```

The following example illustrates how to specify `Microsoft.AspNetCore.Components.RenderFragment` and `Microsoft.AspNetCore.Components.RenderFragment`1` values and render templates directly in a component. Render fragments can also be passed as arguments to templated components.

`RazorTemplate.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/RazorTemplate.razor._
Rendered output of the preceding code:

```html
<p>The time is 4/19/2021 8:54:46 AM.</p>
<p>Pet: Nutty Rex</p>
```

When the Razor delegate must return more than one HTML element, wrap the result in a `<text>` tag for an explicit delimited transition:

```razor
@RenderTwoElements()

<h2>ReturnIf</h2>
@ReturnIf()

<h2>ReturnForeach</h2>
@ReturnForeach()

@code {
    private bool showTrueStatement = true;

    private RenderFragment RenderTwoElements() =>
        @<text>
            <h2>Render Two Elements</h2>
            @ChildFragment
        </text>;

    private RenderFragment ChildFragment => @<p>This is a paragraph.</p>;

    private RenderFragment ReturnIf() =>
        @<text>
            @if (showTrueStatement)
            {
                <p>This is true!</p>
            }
            else
            {
                <p>This is false!</p>
            }
        </text>;

    private RenderFragment ReturnForeach() =>
        @<text>
            @foreach (var item in new[] { 1, 2, 3 })
            {
                <p>Item: @item</p>
            }
        </text>;
}
```

## Static assets

Blazor follows the convention of ASP.NET Core apps for static assets. Static assets are located in the project's `web root` (`wwwroot`) folder or folders under the `wwwroot` folder.

Use a base-relative path (`/`) to refer to the web root for a static asset. In the following example, `logo.png` is physically located in the `{PROJECT ROOT}/wwwroot/images` folder. `{PROJECT ROOT}` is the app's project root.

```razor
<img alt="Company logo" src="/images/logo.png" />
```

Components do **not** support tilde-slash notation (`~/`).

For information on setting an app's base path, see ASP.NET Core Blazor app base path.

## Tag Helpers aren't supported in components

`Tag Helpers` aren't supported in components. To provide Tag Helper-like functionality in Blazor, create a component with the same functionality as the Tag Helper and use the component instead.

## Scalable Vector Graphics (SVG) images

Since Blazor renders HTML, browser-supported images, including Scalable Vector Graphics (SVG) images (`.svg`), are supported via the `` tag:

```html
<img alt="Example image" src="image.svg" />
```

Similarly, SVG images are supported in the CSS rules of a stylesheet file (`.css`):

```css
.element-class {
    background-image: url("image.svg");
}
```

Blazor supports the `<foreignObject>` element to display arbitrary HTML within an SVG. The markup can represent arbitrary HTML, a `Microsoft.AspNetCore.Components.RenderFragment`, or a Razor component.

The following example demonstrates:

* Display of a `string` (`@message`).
* Two-way binding with an `` element and a `value` field.
* A `Robot` component.

```razor
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" rx="10" ry="10" width="200" height="200" stroke="black" 
        fill="none" />
    <foreignObject x="20" y="20" width="160" height="160">
        <p>@message</p>
    </foreignObject>
</svg>

<svg xmlns="http://www.w3.org/2000/svg">
    <foreignObject width="200" height="200">
        <label>
            Two-way binding:
            <input @bind="value" @bind:event="oninput" />
        </label>
    </foreignObject>
</svg>

<svg xmlns="http://www.w3.org/2000/svg">
    <foreignObject>
        <Robot />
    </foreignObject>
</svg>

@code {
    private string message = "Lorem ipsum dolor sit amet, consectetur adipiscing " +
        "elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

    private string? value;
}
```
