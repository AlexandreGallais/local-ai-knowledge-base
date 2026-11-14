---
title: "ASP.NET Core Razor component virtualization (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/components/virtualization.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Razor component virtualization (part 2 of 2)

## Control viewport scroll position behavior when items are dynamically added

Assign a `VirtualizeAnchorMode` value to the `AnchorMode` parameter to control how the viewport behaves at list edges when items are dynamically added:

* `None`: No edge pinning. The viewport stays at the current scroll position regardless of item changes.
* `Start`: Pins the viewport to the start of the list. When the user is at a scroll position near the top of the list and new items arrive at the start, the viewport stays at the top showing the newest items. For example, this pinning behavior is useful for a news feed user experience.
* `End`: Pins the viewport to the end of the list. When the user is at a scroll position near the bottom of the list and new items arrive at the end, the viewport auto-scrolls to show them. If the user has scrolled away, auto-scroll disengages until they return to the bottom. For example, this pinning behavior is useful for a chat or logging user experience.

The following example pins the viewport to the start of a virtualized flight list:

```razor
<div style="height:500px;overflow-y:scroll">
    <Virtualize Items="allFlights" Context="flight" AnchorMode="Start">
        <FlightSummary @key="flight.FlightId" Details="@flight.Summary" />
    </Virtualize>
</div>
```

Modes can be combined. For example, assigning `Start | End` pins both edges. Combining `None` with other modes is supported but doesn't change the combined value.

`Virtualize.ItemComparer` gets or sets a comparer used to detect whether items were prepended or appended when using class-typed items with an `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1.ItemsProvider` (for more information, see the Item provider delegate section).

The comparer determines if the first loaded item changed between provider calls, which indicates items were inserted at the top. For records, the default comparer's value-equality behavior (`EqualityComparer<T>.Default`) works automatically. For an in-memory `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1.Items` assignment, an `ItemComparer` comparer isn't required because the component can detect prepends automatically. In cases where non-primative objects are virtualized and the framework can't detect if an item is prepended or appended, assign an `System.Collections.Generic.IEqualityComparer`1` to the `Virtualize` component:

```razor
<Virtualize ItemsProvider="LoadFlights" AnchorMode="Start" 
    ItemComparer="itemComparer">
    ...
</Virtualize>

@code {
    private static readonly IEqualityComparer<Flight> itemComparer =
        EqualityComparer<Flight>.Create((a, b) => 
            a.Index == b.Index, item => item.Index);

    private async ValueTask<ItemsProviderResult<Flight>> LoadFlights(
        ItemsProviderRequest request)
    {
        ...
    }
}
```

## State changes

When making changes to items rendered by the `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component, call `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` to enqueue re-evaluation and rerendering of the component. For more information, see ASP.NET Core Razor component rendering.

## Keyboard scroll support

To allow users to scroll virtualized content using their keyboard, ensure that the virtualized elements or scroll container itself is focusable. If you fail to take this step, keyboard scrolling doesn't work in Chromium-based browsers.

For example, you can use a `tabindex` attribute on the scroll container:

```razor
<div style="height:500px; overflow-y:scroll" tabindex="-1">
    <Virtualize Items="allFlights">
        <div class="flight-info">...</div>
    </Virtualize>
</div>
```

To learn more about the meaning of `tabindex` value `-1`, `0`, or other values, see `tabindex`.

## Advanced styles and scroll detection

The `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component is only designed to support specific element layout mechanisms. To understand which element layouts work correctly, the following explains how `Virtualize` detects which elements should be visible for display in the correct place.

If your source code looks like the following:

```razor
<div style="height:500px; overflow-y:scroll" tabindex="-1">
    <Virtualize Items="allFlights" ItemSize="100">
        <div class="flight-info">Flight @context.Id</div>
    </Virtualize>
</div>
```

At runtime, the `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component renders a DOM structure similar to the following:

```html
<div style="height:500px; overflow-y:scroll" tabindex="-1">
    <div data-blazor-virtualize-reserved-height="1100" aria-hidden="true"></div>
    <div class="flight-info">Flight 12</div>
    <div class="flight-info">Flight 13</div>
    <div class="flight-info">Flight 14</div>
    <div class="flight-info">Flight 15</div>
    <div class="flight-info">Flight 16</div>
    <div data-blazor-virtualize-reserved-height="3400" aria-hidden="true"></div>
</div>
```

The actual number of rows rendered and the size of the spacers vary according to your styling and `Items` collection size. However, notice that there are spacer `div` elements injected before and after your content. These serve two purposes:

* To provide an offset before and after your content, causing currently-visible items to appear at the correct location in the scroll range and the scroll range itself to represent the total size of all content.
* To detect when the user is scrolling beyond the current visible range, meaning that different content must be rendered.

> **Note:**
> To learn how to control the spacer HTML element tag, see the Control the spacer element tag name section later in this article.

The spacer elements internally use an Intersection Observer to receive notification when they're becoming visible. `Virtualize` depends on receiving these events.

`Virtualize` works under the following conditions:

* **All rendered content items, including placeholder content, are of identical height.** This makes it possible to calculate which content corresponds to a given scroll position without first fetching every data item and rendering the data into a DOM element.

* **Both the spacers and the content rows are rendered in a single vertical stack with every item filling the entire horizontal width.** In typical use cases, `Virtualize` works with `div` elements. If you're using CSS to create a more advanced layout, bear in mind the following requirements:

  * Scroll container styling requires a `display` with any of the following values:
    * `block` (the default for a `div`).
    * `table-row-group` (the default for a `tbody`).
    * `flex` with `flex-direction` set to `column`. Ensure that immediate children of the `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component don't shrink under flex rules. For example, add `.mycontainer > div { flex-shrink: 0 }`.
  * Content row styling requires a `display` with either of the following values:
    * `block` (the default for a `div`).
    * `table-row` (the default for a `tr`).
  * Don't use CSS to interfere with the layout for the spacer elements. The spacer elements have a `display` value of `block`, except if the parent is a table row group, in which case they default to `table-row`. Don't try to influence spacer element width or height, including by causing them to have a border or `content` pseudo-elements.

Any approach that stops the spacers and content elements from rendering as a single vertical stack, or causes the content items to vary in height, prevents correct functioning of the `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component.

## Root-level virtualization

The `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component supports using the document itself as the scroll root, as an alternative to having some other element with `overflow-y: scroll`. In the following example, the `<html>` or `<body>` elements are styled in a component with `overflow-y: scroll`:

```razor
<HeadContent>
    <style>
        html, body { overflow-y: scroll }
    </style>
</HeadContent>
```

## Control the spacer element tag name

If the `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component is placed inside an element that requires a specific child tag name, `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1.SpacerElement` allows you to obtain or set the virtualization spacer tag name. The default value is `div`. For the following example, the `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component renders inside a table body element (`tbody`), so the appropriate child element for a table row (`tr`) is set as the spacer.

`VirtualizedTable.razor`:

_Code sample not included: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/VirtualizedTable.razor._
In the preceding example, the document root is used as the scroll container, so the `html` and `body` elements are styled with `overflow-y: scroll`. For more information, see the following resources:

* Root-level virtualization section
* Control head content in ASP.NET Core Blazor apps

## Content Security Policy (CSP) compliance

CSP violations are avoided because `Virtualize` components:

* Render calculated spacer and placeholder heights as numeric values in `data-blazor-virtualize-reserved-height` attributes.
* When required, render the trailing spacer's vertical offset as a numeric value in a `data-blazor-virtualize-loop-breaker-transform` attribute to hide the spacer.

A JS `MutationObserver` validates the attribute values and applies them via the CSS Object Model (CSSOM) as pixel-based `height` and `transform` styles.
