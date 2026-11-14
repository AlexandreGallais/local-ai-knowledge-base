---
title: "ASP.NET Core Blazor rendering performance best practices (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/performance/rendering.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor rendering performance best practices

Optimize rendering speed to minimize rendering workload and improve UI responsiveness, which can yield a *ten-fold or higher improvement* in UI rendering speed.

## Avoid unnecessary rendering of component subtrees

You might be able to remove the majority of a parent component's rendering cost by skipping the rerendering of child component subtrees when an event occurs. You should only be concerned about skipping the rerendering subtrees that are particularly expensive to render and are causing UI lag.

At runtime, components exist in a hierarchy. A root component (the first component loaded) has child components. In turn, the root's children have their own child components, and so on. When an event occurs, such as a user selecting a button, the following process determines which components to rerender:

1. The event is dispatched to the component that rendered the event's handler. After executing the event handler, the component is rerendered.
1. When a component is rerendered, it supplies a new copy of parameter values to each of its child components.
1. After a new set of parameter values is received, Blazor decides whether to rerender the component. Components rerender if `ShouldRender` returns `true`, which is the default behavior unless overridden, and the parameter values may have changed, for example, if they're mutable objects.

The last two steps of the preceding sequence continue recursively down the component hierarchy. In many cases, the entire subtree is rerendered. Events targeting high-level components can cause expensive rerendering because every component below the high-level component must rerender.

To prevent rendering recursion into a particular subtree, use either of the following approaches:

* Ensure that child component parameters are of specific immutable types&dagger;, such as `string`, `int`, `bool`, and `DateTime`. The built-in logic for detecting changes automatically skips rerendering if the immutable parameter values haven't changed. If you render a child component with `<Customer CustomerId="item.CustomerId" />`, where `CustomerId` is an `int` type, then the `Customer` component isn't rerendered unless `item.CustomerId` changes.
* Override `ShouldRender`, returning `false`:
  * When parameters are nonprimitive types or unsupported immutable types&dagger;, such as complex custom model types or `Microsoft.AspNetCore.Components.RenderFragment` values, and the parameter values haven't changed,
  * If authoring a UI-only component that doesn't change after the initial render, regardless of parameter value changes.

&dagger;For more information, see the change detection logic in Blazor's reference source (`ChangeDetection.cs`).

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

The following airline flight search tool example uses private fields to track the necessary information to detect changes. The previous inbound flight identifier (`prevInboundFlightId`) and previous outbound flight identifier (`prevOutboundFlightId`) track information for the next potential component update. If either of the flight identifiers change when the component's parameters are set in `OnParametersSet`, the component is rerendered because `shouldRender` is set to `true`. If `shouldRender` evaluates to `false` after checking the flight identifiers, an expensive rerender is avoided:

```razor
@code {
    private int prevInboundFlightId = 0;
    private int prevOutboundFlightId = 0;
    private bool shouldRender;

    [Parameter]
    public FlightInfo? InboundFlight { get; set; }

    [Parameter]
    public FlightInfo? OutboundFlight { get; set; }

    protected override void OnParametersSet()
    {
        shouldRender = InboundFlight?.FlightId != prevInboundFlightId
            || OutboundFlight?.FlightId != prevOutboundFlightId;

        prevInboundFlightId = InboundFlight?.FlightId ?? 0;
        prevOutboundFlightId = OutboundFlight?.FlightId ?? 0;
    }

    protected override bool ShouldRender() => shouldRender;
}
```

An event handler can also set `shouldRender` to `true`. For most components, determining rerendering at the level of individual event handlers usually isn't necessary.

For more information, see the following resources:

* ASP.NET Core Razor component lifecycle
* `Microsoft.AspNetCore.Components.ComponentBase.ShouldRender*`
* ASP.NET Core Razor component rendering

## Virtualization

When rendering large amounts of UI within a loop, for example, a list or grid with thousands of entries, the sheer quantity of rendering operations can lead to a lag in UI rendering. Given that the user can only see a small number of elements at once without scrolling, it's often wasteful to spend time rendering elements that aren't currently visible.

Blazor provides the `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component to create the appearance and scroll behaviors of an arbitrarily-large list while only rendering the list items that are within the current scroll viewport. For example, a component can render a list with 100,000 entries but only pay the rendering cost of 20 items that are visible.

For more information, see ASP.NET Core Razor component virtualization.

## Create lightweight, optimized components

Most Razor components don't require aggressive optimization efforts because most components don't repeat in the UI and don't rerender at high frequency. For example, routable components with an `@page` directive and components used to render high-level pieces of the UI, such as dialogs or forms, most likely appear only one at a time and only rerender in response to a user gesture. These components don't usually create high rendering workload, so you can freely use any combination of framework features without much concern about rendering performance.

However, there are common scenarios where components are repeated at scale and often result in poor UI performance:

* Large nested forms with hundreds of individual elements, such as inputs or labels.
* Grids with hundreds of rows or thousands of cells.
* Scatter plots with millions of data points.

If modelling each element, cell, or data point as a separate component instance, there are often so many of them that their rendering performance becomes critical. This section provides advice on making such components lightweight so that the UI remains fast and responsive.

## Avoid thousands of component instances

Each component is a separate island that can render independently of its parents and children. By choosing how to split the UI into a hierarchy of components, you are taking control over the granularity of UI rendering. This can result in either good or poor performance.

By splitting the UI into separate components, you can have smaller portions of the UI rerender when events occur. In a table with many rows that have a button in each row, you may be able to have only that single row rerender by using a child component instead of the whole page or table. However, each component requires additional memory and CPU overhead to deal with its independent state and rendering lifecycle.

In a test performed by the ASP.NET Core product unit engineers, a rendering overhead of around 0.06 ms per component instance was seen in a Blazor WebAssembly app. The test app rendered a simple component that accepts three parameters. Internally, the overhead is largely due to retrieving per-component state from dictionaries and passing and receiving parameters. By multiplication, you can see that adding 2,000 extra component instances would add 0.12 seconds to the rendering time and the UI would begin feeling slow to users.

It's possible to make components more lightweight so that you can have more of them. However, a more powerful technique is often to avoid having so many components to render. The following sections describe two approaches that you can take.

For more information on memory management, see Manage memory in deployed ASP.NET Core server-side Blazor apps.

**Inline child components into their parents:** Consider the following portion of a parent component that renders child components in a loop:

```razor
<div class="chat">
    @foreach (var message in messages)
    {
        <ChatMessageDisplay Message="message" />
    }
</div>
```

`ChatMessageDisplay.razor`:

```razor
<div class="chat-message">
    <span class="author">@Message.Author</span>
    <span class="text">@Message.Text</span>
</div>

@code {
    [Parameter]
    public ChatMessage? Message { get; set; }
}
```

The preceding example performs well if thousands of messages aren't shown at once. To show thousands of messages at once, consider *not* factoring out the separate `ChatMessageDisplay` component. Instead, inline the child component into the parent. The following approach avoids the per-component overhead of rendering so many child components at the cost of losing the ability to rerender each child component's markup independently:

```razor
<div class="chat">
    @foreach (var message in messages)
    {
        <div class="chat-message">
            <span class="author">@message.Author</span>
            <span class="text">@message.Text</span>
        </div>
    }
</div>
```

**Define reusable `RenderFragments` in code:** You might be factoring out child components purely as a way of reusing rendering logic. If that's the case, you can create reusable rendering logic without implementing additional components. In any component's `@code` block, define a `Microsoft.AspNetCore.Components.RenderFragment`. Render the fragment from any location as many times as needed:

```razor
@RenderWelcomeInfo

<p>Render the welcome content a second time:</p>

@RenderWelcomeInfo

@code {
    private RenderFragment RenderWelcomeInfo = @<p>Welcome to your new app!</p>;
}
```

To make `Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder` code reusable across multiple components, declare the `Microsoft.AspNetCore.Components.RenderFragment` `public` and `static`:

```razor
public static RenderFragment SayHello = @<h1>Hello!</h1>;
```

`SayHello` in the preceding example can be invoked from an unrelated component. This technique is useful for building libraries of reusable markup snippets that render without per-component overhead.

`Microsoft.AspNetCore.Components.RenderFragment` delegates can accept parameters. The following component passes the message (`message`) to the `Microsoft.AspNetCore.Components.RenderFragment` delegate:

```razor
<div class="chat">
    @foreach (var message in messages)
    {
        @ChatMessageDisplay(message)
    }
</div>

@code {
    private RenderFragment<ChatMessage> ChatMessageDisplay = message =>
        @<div class="chat-message">
            <span class="author">@message.Author</span>
            <span class="text">@message.Text</span>
        </div>;
}
```

The preceding approach reuses rendering logic without per-component overhead. However, the approach doesn't permit refreshing the subtree of the UI independently, nor does it have the ability to skip rendering the subtree of the UI when its parent renders because there's no component boundary. Assignment to a `Microsoft.AspNetCore.Components.RenderFragment` delegate is only supported in Razor component files (`.razor`).

For a non-static field, method, or property that can't be referenced by a field initializer, such as `TitleTemplate` in the following example, use a property instead of a field for the `Microsoft.AspNetCore.Components.RenderFragment`:

```csharp
protected RenderFragment DisplayTitle =>
    @<div>
        @TitleTemplate
    </div>;
```

## Don't receive too many parameters

If a component repeats extremely often, for example, hundreds or thousands of times, the overhead of passing and receiving each parameter builds up.

It's rare that too many parameters severely restricts performance, but it can be a factor. For a `TableCell` component that renders 4,000 times within a grid, each parameter passed to the component adds around 15 ms to the total rendering cost. Passing ten parameters requires around 150 ms and causes a UI rendering lag.

To reduce parameter load, bundle multiple parameters in a custom class. For example, a table cell component might accept a common object. In the following example, `Data` is different for every cell, but `Options` is common across all cell instances:

```razor
@typeparam TItem

...

@code {
    [Parameter]
    public TItem? Data { get; set; }
    
    [Parameter]
    public GridOptions? Options { get; set; }
}
```

However, keep in mind that bundling primitive parameters into a class isn't always an advantage. While it can reduce parameter count, it also impacts how change detection and rendering behave. Passing non-primitive parameters always triggers a re-render, because Blazor can't know whether arbitrary objects have internally mutable state, whereas passing primitive parameters only triggers a re-render if their values have actually changed.

Also, consider that it might be an improvement not to have a table cell component, as shown in the preceding example, and instead inline its logic into the parent component.

> **Note:**
> When multiple approaches are available for improving performance, benchmarking the approaches is usually required to determine which approach yields the best results.

For more information on generic type parameters (`@typeparam`), see the following resources:

* Razor syntax reference for ASP.NET Core
* ASP.NET Core Razor components
* ASP.NET Core Blazor templated components
