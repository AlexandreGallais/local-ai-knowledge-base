---
title: "ASP.NET Core Blazor cascading values and parameters (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/cascading-values-and-parameters.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor cascading values and parameters

-->
-->

This article explains how to flow data from an ancestor Razor component to descendent components.

*Cascading values and parameters* provide a convenient way to flow data down a component hierarchy from an ancestor component to any number of descendent components. Unlike Component parameters, cascading values and parameters don't require an attribute assignment for each descendent component where the data is consumed. Cascading values and parameters also allow components to coordinate with each other across a component hierarchy.

> **Note:**
> The code examples in this article adopt nullable reference types (NRTs) and .NET compiler null-state static analysis, which are supported in ASP.NET Core in .NET 6 or later. When targeting .NET 5 or earlier, remove the null type designation (`?`) from the `CascadingType?`, `@ActiveTab?`, `RenderFragment?`, `ITab?`, `TabSet?`, and `string?` types in the article's examples.

## Root-level cascading values

Root-level cascading values can be registered for the entire component hierarchy. Named cascading values and subscriptions for update notifications are supported.

The following class is used in this section's examples.

`Dalek.cs`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Dalek.cs._
The following registrations are made in the app's `Program` file with `Microsoft.Extensions.DependencyInjection.CascadingValueServiceCollectionExtensions.AddCascadingValue*`:

* `Dalek` with a property value for `Units` is registered as a fixed cascading value.
* A second `Dalek` registration with a different property value for `Units` is named "`AlphaGroup`".

```csharp
builder.Services.AddCascadingValue(sp => new Dalek { Units = 123 });
builder.Services.AddCascadingValue("AlphaGroup", sp => new Dalek { Units = 456 });
```

The following `Daleks` component displays the cascaded values.

`Daleks.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/Daleks.razor._
In the following example, `Dalek` is registered as a cascading value using `CascadingValueSource<T>`, where `<T>` is the type. The `isFixed` flag indicates whether the value is fixed. If `false`, all recipients are subscribed for update notifications. Subscriptions create overhead and reduce performance, so set `isFixed` to `true` if the value doesn't change.

```csharp
builder.Services.AddCascadingValue(sp =>
{
    var dalek = new Dalek { Units = 789 };
    var source = new CascadingValueSource<Dalek>(dalek, isFixed: false);

    return source;
});
```

> **Warning:**
> Registering a component type as a root-level cascading value doesn't register additional services for the type or permit service activation in the component.
>
> Treat required services separately from cascading values, registering them separately from the cascaded type.
>
> Avoid using `Microsoft.Extensions.DependencyInjection.CascadingValueServiceCollectionExtensions.AddCascadingValue*` to register a component type as a cascading value. Instead, wrap the `<Router>...</Router>` in the `Routes` component (`Components/Routes.razor`) with the component and adopt global interactive server-side rendering (interactive SSR). For an example, see the `CascadingValue` component section.

## Root-level cascading values with notifications

Calling `Microsoft.AspNetCore.Components.CascadingValueSource`1.NotifyChangedAsync*` to issue update notifications can be used to signal multiple Razor component subscribers that a cascading value has changed. Notifications aren't possible for subscribers that adopt static server-side rendering (static SSR), so subscribers must adopt an interactive render mode.

In the following example:

* `NotifyingDalek` implements `System.ComponentModel.INotifyPropertyChanged` to notify clients that a property value has changed. When the `Units` property is set, the `System.ComponentModel.PropertyChangedEventHandler` (`PropertyChanged`) is invoked.
* The `SetUnitsToOneThousandAsync` method can be triggered by subscribers to set `Units` to 1,000 with a simulated processing delay.

Keep in mind for production code that any change in state (any property value change of the class) causes all subscribed components to rerender, regardless of which part of the state they use. We recommend creating granular classes, cascading them separately with specific subscriptions to ensure that only components subscribed to a specific portion of the application state are affected by changes.

> **Note:**
> For a Blazor Web App solution consisting of server and client (`.Client`) projects, the following `NotifyingDalek.cs` file is placed in the `.Client` project.

`NotifyingDalek.cs`:

```csharp
using System.ComponentModel;
using System.Runtime.CompilerServices;

public class NotifyingDalek : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler? PropertyChanged;
    private int units;

    public int Units
    {
        get => units;
        set
        {
            if (units != value)
            {
                units = value;
                OnPropertyChanged();
            }
        }
    }

    protected virtual void OnPropertyChanged(
        [CallerMemberName] string? propertyName = default)
            => PropertyChanged?.Invoke(this, new(propertyName));

    public async Task SetUnitsToOneThousandAsync()
    {
        // Simulate a three second delay in processing
        await Task.Delay(3000);

        Units = 1000;
    }
}
```

The following `CascadingStateServiceCollectionExtensions` creates a `Microsoft.AspNetCore.Components.CascadingValueSource`1` from a type that implements `System.ComponentModel.INotifyPropertyChanged`.

> **Note:**
> For a Blazor Web App solution consisting of server and client (`.Client`) projects, the following `CascadingStateServiceCollectionExtensions.cs` file is placed in the `.Client` project.

`CascadingStateServiceCollectionExtensions.cs`:

```csharp
using System.ComponentModel;
using Microsoft.AspNetCore.Components;

namespace Microsoft.Extensions.DependencyInjection;

public static class CascadingStateServiceCollectionExtensions
{
    public static IServiceCollection AddNotifyingCascadingValue<T>(
        this IServiceCollection services, T state, bool isFixed = false)
        where T : INotifyPropertyChanged
    {
        return services.AddCascadingValue<T>(sp =>
        {
            return new CascadingStateValueSource<T>(state, isFixed);
        });
    }

    private sealed class CascadingStateValueSource<T>
        : CascadingValueSource<T>, IDisposable where T : INotifyPropertyChanged
    {
        private readonly T state;
        private readonly CascadingValueSource<T> source;

        public CascadingStateValueSource(T state, bool isFixed = false)
            : base(state, isFixed = false)
        {
            this.state = state;
            source = new CascadingValueSource<T>(state, isFixed);
            this.state.PropertyChanged += HandlePropertyChanged;
        }

        private void HandlePropertyChanged(object? sender, PropertyChangedEventArgs e)
        {
            _ = NotifyChangedAsync();
        }

        public void Dispose()
        {
            state.PropertyChanged -= HandlePropertyChanged;
        }
    }
}
```

The type's `System.ComponentModel.PropertyChangedEventHandler` (`HandlePropertyChanged`) calls the `Microsoft.AspNetCore.Components.CascadingValueSource`1`'s `Microsoft.AspNetCore.Components.CascadingValueSource`1.NotifyChangedAsync*` method to notify subscribers that the cascading value has changed. The `System.Threading.Tasks.Task` is discarded when calling `Microsoft.AspNetCore.Components.CascadingValueSource`1.NotifyChangedAsync*` because the call only represents the duration of the dispatch to the synchronous context. Exceptions are handled internally by dispatching them to the renderer within the context of whichever component threw when receiving the update. This is the same way that exceptions are processed with a `Microsoft.AspNetCore.Components.CascadingValue`1`, which isn't notified about exceptions that happen inside notification recipients. The event handler is disconnected in the `Dispose` method to prevent a memory leak.

In the `Program` file, `NotifyingDalek` is passed to create a `Microsoft.AspNetCore.Components.CascadingValueSource`1` with an initial `Unit` value of 888 units:

```csharp
builder.Services.AddNotifyingCascadingValue(new NotifyingDalek() { Units = 888 });
```

> **Note:**
> For a Blazor Web App solution consisting of server and client (`.Client`) projects, the preceding code is placed into each project's `Program` file.

The following component is used to demonstrate how changing the value of `NotifyingDalek.Units` notifies subscribers.

`Daleks.razor`:

```razor
<h2>Daleks component</h2>

<div>
    <b>Dalek Units:</b> @Dalek?.Units
</div>

<div>
    <label>
        <span style="font-weight:bold">New Unit Count:</span>
        <input @bind="dalekCount" />
    </label>
    <button @onclick="Update">Update</button>
</div>

<div>
    <button @onclick="SetOneThousandUnits">Set Units to 1,000</button>
</div>

<p>
    Dalek© <a href="https://www.imdb.com/name/nm0622334/">Terry Nation</a><br>
    Doctor Who© <a href="https://www.bbc.co.uk/programmes/b006q2x0">BBC</a>
</p>

@code {
    private int dalekCount;

    [CascadingParameter]
    private NotifyingDalek? Dalek { get; set; }

    private void Update()
    {
        if (Dalek is not null)
        {
            Dalek.Units = dalekCount;
            dalekCount = 0;
        }
    }

    private async Task SetOneThousandUnits()
    {
        if (Dalek is not null)
        {
            await Dalek.SetUnitsToOneThousandAsync();
        }
    }
}
```

To demonstrate multiple subscriber notifications, the following `DaleksMain` component renders three `Daleks` components. When the unit count (`Units`) of one `Dalek` component is updated, the other two `Dalek` component subscribers are updated.

`DaleksMain.razor`:

```razor
@page "/daleks-main"

<PageTitle>Daleks Main</PageTitle>

<h1>Daleks Main</h1>

<Daleks />

<Daleks />

<Daleks />
```

Add a navigation link to the `DaleksMain` component in `NavMenu.razor`:

```razor
<div class="nav-item px-3">
    <NavLink class="nav-link" href="daleks-main">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Daleks
    </NavLink>
</div>
```

Because the `Microsoft.AspNetCore.Components.CascadingValueSource`1`'s type in this example (`NotifyingDalek`) is a class type, you can meet virtually any state management feature specification requirement. However, subscriptions create overhead and reduce performance, so benchmark the performance of this approach in your app and compare it to other state management approaches before adopting it in a production app with constrained processing and memory resources.

Any change in state (any property value change of the class) causes all subscribed components to rerender, regardless of which part of the state they use. **Avoid creating a single large class representing the entire global application state.** Instead, create granular classes and cascade them separately with specific subscriptions to cascading parameters, ensuring that only components subscribed to a specific portion of the application state are affected by changes.

## `CascadingValue` component

An ancestor component provides a cascading value using the Blazor framework's `CascadingValue` component, which wraps a subtree of a component hierarchy and supplies a single value to all of the components within its subtree.

The following example demonstrates the flow of theme information down the component hierarchy to provide a CSS style class to buttons in child components.

The following `ThemeInfo` C# class specifies the theme information.

> **Note:**
> For the examples in this section, the app's namespace is `BlazorSample`. When experimenting with the code in your own sample app, change the app's namespace to your sample app's namespace.

`ThemeInfo.cs`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/ThemeInfo.cs._
The following layout component specifies theme information (`ThemeInfo`) as a cascading value for all components that make up the layout body of the `Microsoft.AspNetCore.Components.LayoutComponentBase.Body` property. `ButtonClass` is assigned a value of `btn-success`, which is a Bootstrap button style. Any descendent component in the component hierarchy can use the `ButtonClass` property through the `ThemeInfo` cascading value.

`MainLayout.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Layout/MainLayout.razor._
Blazor Web Apps provide alternative approaches for cascading values that apply more broadly to the app than furnishing them via a single layout file:

* Wrap the markup of the `Routes` component in a `CascadingValue` component to specify the data as a cascading value for all of the app's components.

  The following example cascades `ThemeInfo` data from the `Routes` component.

  `Routes.razor`:

  ```razor
  <CascadingValue Value="theme">
      <Router ...>
          ...
      </Router>
  </CascadingValue>

  @code {
      private ThemeInfo theme = new() { ButtonClass = "btn-success" };
  }
  ```

  > **Note:**
  > Wrapping the `Routes` component instance in the `App` component (`Components/App.razor`) with a `CascadingValue` component isn't supported.

* Specify a *root-level cascading value* as a service by calling the `Microsoft.Extensions.DependencyInjection.CascadingValueServiceCollectionExtensions.AddCascadingValue*` extension method on the service collection builder.

  The following example cascades `ThemeInfo` data from the `Program` file.

  `Program.cs`

  ```csharp
  builder.Services.AddCascadingValue(sp => 
      new ThemeInfo() { ButtonClass = "btn-primary" });
  ```

For more information, see the following sections of this article:

* Root-level cascading values
* Root-level cascading values with notifications
* Cascading values/parameters and render mode boundaries
