---
title: "ASP.NET Core Razor component virtualization (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/components/virtualization.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Razor component virtualization

This article explains how to use component virtualization in ASP.NET Core Blazor apps.

## Virtualization

Improve the perceived performance of component rendering using the Blazor framework's built-in virtualization support with the `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component. Virtualization is a technique for limiting UI rendering to just the parts that are currently visible. For example, virtualization is helpful when the app must render a long list of items and only a subset of items is required to be visible at any given time.

Use the `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component when:

* Rendering a set of data items in a loop.
* Most of the items aren't visible due to scrolling.

When the user scrolls to an arbitrary point in the `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component's list of items, the component calculates the visible items to show. Unseen items aren't rendered.

Without virtualization, a typical list might use a C# `foreach` loop to render each item in a list. In the following example:

* `allFlights` is a collection of airplane flights.
* The `FlightSummary` component displays details about each flight.
* The `@key` directive attribute preserves the relationship of each `FlightSummary` component to its rendered flight by the flight's `FlightId`.

```razor
<div style="height:500px;overflow-y:scroll">
    @foreach (var flight in allFlights)
    {
        <FlightSummary @key="flight.FlightId" Details="@flight.Summary" />
    }
</div>
```

If the collection contains thousands of flights, rendering the flights takes a long time and users experience a noticeable UI lag. Most of the flights fall outside of the height of the `` element, so most of them aren't seen.

Instead of rendering the entire list of flights at once, replace the `foreach` loop in the preceding example with the `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component:

* Specify `allFlights` as a fixed item source to `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1.Items`. Only the currently visible flights are rendered by the `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component.

  If a non-generic collection supplies the items, for example a collection of `System.Data.DataRow`, follow the guidance in the Item provider delegate section to supply the items.
* Specify a context for each flight with the `Context` parameter. In the following example, `flight` is used as the context, which provides access to each flight's members.

```razor
<div style="height:500px;overflow-y:scroll">
    <Virtualize Items="allFlights" Context="flight">
        <FlightSummary @key="flight.FlightId" Details="@flight.Summary" />
    </Virtualize>
</div>
```

If a context isn't specified with the `Context` parameter, use the value of `context` in the item content template to access each flight's members:

```razor
<div style="height:500px;overflow-y:scroll">
    <Virtualize Items="allFlights">
        <FlightSummary @key="context.FlightId" Details="@context.Summary" />
    </Virtualize>
</div>
```

The `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component:

* Calculates the number of items to render based on the height of the container and the size of the rendered items.
* Recalculates and rerenders the items as the user scrolls.
* Only fetches the slice of records from an external API that correspond to the currently visible region, including overscan, when `ItemsProvider` is used instead of `Items` (see the Item provider delegate section).

The item content for the `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component can include:

* Plain HTML and Razor code, as the preceding example shows.
* One or more Razor components.
* A mix of HTML/Razor and Razor components.

## Item provider delegate

If you don't want to load all of the items into memory or the collection isn't a generic `System.Collections.Generic.ICollection`1`, you can specify an items provider delegate method to the component's `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1.ItemsProvider` parameter that asynchronously retrieves the requested items on demand. In the following example, the `LoadEmployees` method provides the items to the `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component:

```razor
<Virtualize Context="employee" ItemsProvider="LoadEmployees">
    <p>
        @employee.FirstName @employee.LastName has the 
        job title of @employee.JobTitle.
    </p>
</Virtualize>
```

The items provider receives an `Microsoft.AspNetCore.Components.Web.Virtualization.ItemsProviderRequest`, which specifies the required number of items starting at a specific start index. The items provider then retrieves the requested items from a database or other service and returns them as an `Microsoft.AspNetCore.Components.Web.Virtualization.ItemsProviderResult`1` along with a count of the total items. The items provider can choose to retrieve the items with each request or cache them so that they're readily available.

A `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component can only accept **one item source** from its parameters, so don't attempt to simultaneously use an items provider and assign a collection to `Items`. If both are assigned, an `System.InvalidOperationException` is thrown when the component's parameters are set at runtime.

The following example loads employees from an `EmployeeService` (not shown). The `totalEmployees` field would typically be assigned by calling a method on the same service (for example, `EmployeesService.GetEmployeesCountAsync`) elsewhere, such as during component initialization.

```csharp
private async ValueTask<ItemsProviderResult<Employee>> LoadEmployees(
    ItemsProviderRequest request)
{
    var numEmployees = Math.Min(request.Count, totalEmployees - request.StartIndex);
    var employees = await EmployeesService.GetEmployeesAsync(request.StartIndex, 
        numEmployees, request.CancellationToken);

    return new ItemsProviderResult<Employee>(employees, totalEmployees);
}
```

In the following example, a collection of `System.Data.DataRow` is a non-generic collection, so an items provider delegate is used for virtualization:

```razor
<Virtualize Context="row" ItemsProvider="GetRows">
    ...
</Virtualize>

@code{
    ...

    private ValueTask<ItemsProviderResult<DataRow>> GetRows(ItemsProviderRequest request) => 
        new(new ItemsProviderResult<DataRow>(
            dataTable.Rows.OfType<DataRow>().Skip(request.StartIndex).Take(request.Count),
            dataTable.Rows.Count));
}
```

`Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1.RefreshDataAsync*` instructs the component to rerequest data from its `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1.ItemsProvider`. This is useful when external data changes. There's usually no need to call `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1.RefreshDataAsync*` when using `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1.Items`.

`Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1.RefreshDataAsync*` updates a `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component's data without causing a rerender. If `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1.RefreshDataAsync*` is invoked from a Blazor event handler or component lifecycle method, triggering a render isn't required because a render is automatically triggered at the end of the event handler or lifecycle method. If `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1.RefreshDataAsync*` is triggered separately from a background task or event, such as in the following `ForecastUpdated` delegate, call `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` to update the UI at the end of the background task or event:

```csharp
<Virtualize ... @ref="virtualizeComponent">
    ...
</Virtualize>

...

private Virtualize<FetchData>? virtualizeComponent;

protected override void OnInitialized()
{
    WeatherForecastSource.ForecastUpdated += async () => 
    {
        await InvokeAsync(async () =>
        {
            await virtualizeComponent?.RefreshDataAsync();
            StateHasChanged();
        });
    });
}
```

In the preceding example:

* `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1.RefreshDataAsync*` is called first to obtain new data for the `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component.
* `StateHasChanged` is called to rerender the component.

## Placeholder

Because requesting items from a remote data source might take some time, you have the option to render a placeholder with item content:

* Use a `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1.Placeholder` (`<Placeholder>...</Placeholder>`) to display content until the item data is available.
* Use `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1.ItemContent` to set the item template for the list.

```razor
<Virtualize Context="employee" ItemsProvider="LoadEmployees">
    <ItemContent>
        <p>
            @employee.FirstName @employee.LastName has the 
            job title of @employee.JobTitle.
        </p>
    </ItemContent>
    <Placeholder>
        <p>
            Loading&hellip;
        </p>
    </Placeholder>
</Virtualize>
```

## Empty content

Use the `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1.EmptyContent` parameter to supply content when the component has loaded and either `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1.Items` is empty or `Microsoft.AspNetCore.Components.Web.Virtualization.ItemsProviderResult`1.TotalItemCount` is zero.

`EmptyContent.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/EmptyContent.razor._
Change the `OnInitialized` method lambda to see the component display strings:

```csharp
protected override void OnInitialized() =>
    stringList ??= [ "Here's a string!", "Here's another string!" ];
```

## Item size

The height of each item in pixels can be set initially with `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1.ItemSize` (default: 50). The following example sets the initial height of each item from 50 pixels to 25 pixels:

```razor
<Virtualize Context="employee" Items="employees" ItemSize="25">
    ...
</Virtualize>
```

The `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component measures actual item heights as they enter the viewport and maintains a running average of measured heights. All items use this running average for positioning (or the default `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1.ItemSize` parameter before any measurements exist).

## Overscan count

`Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1.OverscanCount` determines how many additional items are rendered before and after the visible region. This setting helps to reduce the frequency of rendering during scrolling. However, higher values result in more elements rendered in the page (default: 15). The following example changes the overscan count from the default of 15 items to 17 items:

```razor
<Virtualize Context="employee" Items="employees" OverscanCount="17">
    ...
</Virtualize>
```

## Scroll to a specific item

The `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component provides two ways to control scroll position: `InitialItemIndex` for the first render and `ScrollToItemAsync` for programmatic scrolling after the component is rendered.

### `InitialItemIndex` parameter

Set `InitialItemIndex` to open the list at a specific item index on the first interactive render. This is a one-shot parameter—changes after first render are ignored. Out-of-range values are clamped.

```razor
<Virtualize Items="allFlights" Context="flight" InitialItemIndex="500">
    <FlightSummary @key="flight.FlightId" Details="@flight.Summary" />
</Virtualize>
```

### `ScrollToItemAsync` method

Call `ScrollToItemAsync` to programmatically scroll to an item after the first render. The scroll is instant (no animation). The method returns a `System.Threading.Tasks.Task` that completes when the target item is aligned to the top of the viewport. Cancellation is supported via a `System.Threading.CancellationToken`.

If multiple calls occur, the last call wins—earlier calls complete normally but only the final target is honored. If the user scrolls during a programmatic scroll, the user's scroll takes precedence. Calling before the first interactive render throws an `System.InvalidOperationException`.

```razor
<Virtualize Items="allFlights" Context="flight" @ref="virtualizeComponent">
    <FlightSummary @key="flight.FlightId" Details="@flight.Summary" />
</Virtualize>

<button @onclick="ScrollToFlight">Go to flight 200</button>

@code {
    private Virtualize<Flight>? virtualizeComponent;

    private async Task ScrollToFlight()
    {
        if (virtualizeComponent is not null)
        {
            await virtualizeComponent.ScrollToItemAsync(200);
        }
    }
}
```
