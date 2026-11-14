---
title: "Dynamically-rendered ASP.NET Core Razor components"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/components/dynamiccomponent.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Dynamically-rendered ASP.NET Core Razor components

By Dave Brock

Use the built-in `Microsoft.AspNetCore.Components.DynamicComponent` component to render components by type.

## Dynamic components

A `Microsoft.AspNetCore.Components.DynamicComponent` is useful for rendering components without iterating through possible types or using conditional logic. For example, `Microsoft.AspNetCore.Components.DynamicComponent` can render a component based on a user selection from a dropdown list.

In the following example:

* `componentType` specifies the type.
* `parameters` specifies component parameters to pass to the `componentType` component.

```razor
<DynamicComponent Type="componentType" Parameters="parameters" />

@code {
    private Type componentType = ...;
    private IDictionary<string, object> parameters = ...;
}
```

For more information on passing parameter values, see the Pass <example-value> section later in this article.

## Example

In the following example, a Razor component renders a component based on the user's selection from a dropdown list of four possible values.

| User spaceflight carrier selection | Shared Razor component to render    |
| ---------------------------------- | ----------------------------------- |
| Rocket Lab&reg;                    | `RocketLab.razor`            |
| SpaceX&reg;                        | `SpaceX.razor`               |
| ULA&reg;                           | `UnitedLaunchAlliance.razor` |
| Virgin Galactic&reg;               | `VirginGalactic.razor`       |

`RocketLab.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/RocketLab.razor._
`SpaceX.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/SpaceX.razor._
`UnitedLaunchAlliance.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/UnitedLaunchAlliance.razor._
`VirginGalactic.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/VirginGalactic.razor._
`DynamicComponent1.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/DynamicComponent1.razor._
In the preceding example:

* An `System.Collections.Generic.Dictionary`2` is used to manage components to be displayed.
* Names serve as the dictionary keys and are provided as selection options.
* Component types are stored as dictionary values using the `typeof` operator.

## Pass <example-value>

If dynamically-rendered components have component parameters, pass them into the `Microsoft.AspNetCore.Components.DynamicComponent` as an `IDictionary<string, object>`. The `string` is the name of the parameter, and the `object` is the parameter's value.

The following example configures a component metadata object (`ComponentMetadata`) to supply parameter values to dynamically-rendered components based on the type name. The example is just one of several approaches that you can adopt. Parameter data can also be provided from a web API, a database, or a method. The only requirement is that the approach returns an `IDictionary<string, object>`.

`ComponentMetadata.cs`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/ComponentMetadata.cs._
The following `RocketLabWithWindowSeat` component (`RocketLabWithWindowSeat.razor`) has been updated from the preceding example to include a component parameter named `WindowSeat` to specify if the passenger prefers a window seat on their flight:

`RocketLabWithWindowSeat.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/RocketLabWithWindowSeat.razor._
In the following example:

* Only the `RocketLabWithWindowSeat` component's parameter for a window seat (`WindowSeat`) receives the value of the **`Window Seat`** checkbox.
* Component names are used as dictionary keys using the `nameof` operator, which returns component names as constant strings.
* The dynamically-rendered components are shared components:
  * Shown in this article section: `RocketLabWithWindowSeat` (`RocketLabWithWindowSeat.razor`)
  * Components shown in the Example section earlier in this article:
    * `SpaceX` (`SpaceX.razor`)
    * `UnitedLaunchAlliance` (`UnitedLaunchAlliance.razor`)
    * `VirginGalactic` (`VirginGalactic.razor`)

`DynamicComponent2.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/DynamicComponent2.razor._
Dictionary values for C# union-typed parameters must be boxed as the union, not the raw case value, because an implicit conversion is only valid at compile-time.

> **Note:**
> During the preview of .NET 11, the following example requires the app's project file to specify the "`preview`" C# language version:
>
> ```xml
> <LangVersion>preview</LangVersion>
> ```

Consider the following C# union type, `SlotContent`, that accepts text, a `Microsoft.AspNetCore.Components.MarkupString`, or a `Microsoft.AspNetCore.Components.RenderFragment`:

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

To box the union, wrap the raw value explicitly into the union wrapper type (`new SlotContent(...)`), as the following example demonstrates.

`SlotTest2.razor`:

```razor
@page "/slot-test-2"

<DynamicComponent Type="@TargetComponent" Parameters="@ValidParameters" />

@code {
    [Parameter]
    public Type TargetComponent { get; set; } = typeof(Slot);

    [Parameter]
    public string RawTextPayload { get; set; } = "Hello from dynamic data!";

    private Dictionary<string, object> ValidParameters => new()
    {
        { "Content", new SlotContent(RawTextPayload) }
    };
}
```

## Event callbacks (`EventCallback`)

Event callbacks (`Microsoft.AspNetCore.Components.EventCallback`) can be passed to a `Microsoft.AspNetCore.Components.DynamicComponent` in its parameter dictionary.

`ComponentMetadata.cs`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/ComponentMetadata.cs._
Implement an event callback parameter (`Microsoft.AspNetCore.Components.EventCallback`) within each dynamically-rendered component.

`RocketLab2.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/RocketLab2.razor._
`SpaceX2.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/SpaceX2.razor._
`UnitedLaunchAlliance2.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/UnitedLaunchAlliance2.razor._
`VirginGalactic2.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/VirginGalactic2.razor._
In the following parent component example, the `ShowDTMessage` method assigns a string with the current time to `message`, and the value of `message` is rendered.

The parent component passes the callback method, `ShowDTMessage` in the parameter dictionary:

* The `string` key is the callback method's name, `OnClickCallback`.
* The `object` value is created by `Microsoft.AspNetCore.Components.EventCallbackFactory.Create*` for the parent callback method, `ShowDTMessage`. Note that the `this` keyword isn't supported in C# field initialization, so a C# property is used for the parameter dictionary.

`DynamicComponent3.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/DynamicComponent3.razor._
## Avoid catch-all parameters

Avoid the use of catch-all parameters. If catch-all parameters are used, every explicit parameter on `Microsoft.AspNetCore.Components.DynamicComponent` effectively is a reserved word that you can't pass to a dynamic child. Any new parameters passed to `Microsoft.AspNetCore.Components.DynamicComponent` are a breaking change, as they start shadowing child component parameters that happen to have the same name. It's unlikely that the caller always knows a fixed set of parameter names to pass to all possible dynamic children.

## Access the dynamically-created component instance

Use the `Microsoft.AspNetCore.Components.DynamicComponent.Instance` property to access the dynamically-created component instance.

Create an interface to describe the dynamically-created component instance with any methods and properties that you need to access from the parent component when the component is dynamically loaded. The following example specifies a `Log` method for implementation in components.

`Interfaces/ILoggable.cs`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Interfaces/ILoggable.cs._
Each component definition implements the interface. The following example is a modified Rocket Lab&reg; component from the Example section that logs a string via its `Log` method.

`RocketLab3.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/RocketLab3.razor._
The remaining three shared components (`VirginGalactic3`, `UnitedLaunchAlliance3`, `SpaceX3`) receive similar treatment:

* The following directives are added to the components, where the `{COMPONENT TYPE}` placeholder is the component type:

  ```razor
  @using BlazorSample.Interfaces
  @implements ILoggable
  @inject ILogger<{COMPONENT TYPE}> Logger
  ```

* Each component implements a `Log` method. The log category written by the logger includes the fully-qualified name of the component type when `Microsoft.Extensions.Logging.LoggerExtensions.LogInformation*` is called:

  ```razor
  @code {
      public void Log()
      {
          Logger.LogInformation("Woot! I logged this call!");
      }
  }
  ```

The parent component casts the dynamically-loaded component instance as an `ILoggable` to access members of the interface. In the following example, the loaded component's `Log` method is called when a button is selected in the UI:

```razor
...
@using BlazorSample.Interfaces

...

<DynamicComponent Type="..." @ref="dc" />

...

<button @onclick="LogFromLoadedComponent">Log from loaded component</button>

@code {
    private DynamicComponent? dc;

    ...

    private void LogFromLoadedComponent() => (dc?.Instance as ILoggable)?.Log();
}
```

For a working demonstration of the preceding example, see the `DynamicComponent4` component in the Blazor sample app.

## Trademarks

Rocket Lab is a registered trademark of Rocket Lab USA Inc. SpaceX is a registered trademark of Space Exploration Technologies Corp. United Launch Alliance and ULA are registered trademarks of United Launch Alliance, LLC. Virgin Galactic is a registered trademark of Galactic Enterprises, LLC.

## Related content

* ASP.NET Core Blazor event handling
* `Microsoft.AspNetCore.Components.DynamicComponent`
