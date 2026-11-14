---
title: "ASP.NET Core Blazor `QuickGrid` component (part 1 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/components/quickgrid.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor `QuickGrid` component

The `QuickGrid` component is a Razor component for quickly and efficiently displaying data in tabular form. QuickGrid provides a simple and convenient data grid component for common grid rendering scenarios and serves as a reference architecture and performance baseline for building data grid components. QuickGrid is highly optimized and uses advanced techniques to achieve optimal rendering performance.

## Package

Add a package reference for the `Microsoft.AspNetCore.Components.QuickGrid` package.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

## Sample app

For various QuickGrid demonstrations, see the **QuickGrid for Blazor** sample app. The demo site is hosted on GitHub Pages. The site loads fast thanks to static prerendering using the community-maintained `BlazorWasmPrerendering.Build` GitHub project.

## QuickGrid implementation

To implement a `QuickGrid` component:

* Specify tags for the `QuickGrid` component in Razor markup (`<QuickGrid>...</QuickGrid>`).
* Name a queryable source of data for the grid. Use ***either*** of the following data sources:
  * `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Items`: A nullable `IQueryable<TGridItem>`, where `TGridItem` is the type of data represented by each row in the grid.
  * `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.ItemsProvider`: A callback that supplies data for the grid.
* `QueryParameterNameOptions`: Controls the names of the query string parameters that persist the grid's sort column, sort direction, and page number in the URL. The default value is an instance that results in query parameters named "`sort`", "`direction`", and "`page`". Assigning unique names to these query string parameters allows the use of multiple `QuickGrid` components on the same page without their URL parameters conflicting with each other. For more information, see the Pagination modes, Query parameter names, and Multiple grids on the same page sections.
* `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Class`: An optional CSS class name. If provided, the class name is included in the `class` attribute of the rendered table.
* `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Theme`: A theme name (default value: `default`). This affects which styling rules match the table.
* `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Virtualize`: If true, the grid is rendered with virtualization. This is normally used in conjunction with scrolling and causes the grid to fetch and render only the data around the current scroll viewport. This can greatly improve the performance when scrolling through large data sets. If you use `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Virtualize`, you should supply a value for `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.ItemSize` and must ensure that every row renders with a constant height. Generally, it's preferable not to use `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Virtualize` if the amount of data rendered is small or if you're using pagination.
* `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.ItemSize`: Only applicable when using `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Virtualize`. `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.ItemSize` defines an expected height in pixels for each row, allowing the virtualization mechanism to fetch the correct number of items to match the display size and to ensure accurate scrolling.
* `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.ItemKey`: Optionally defines a value for `@key` on each rendered row. Typically, this is used to specify a unique identifier, such as a primary key value, for each data item. This allows the grid to preserve the association between row elements and data items based on their unique identifiers, even when the `TGridItem` instances are replaced by new copies (for example, after a new query against the underlying data store). If not set, the `@key` is the `TGridItem` instance.
* `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.OverscanCount`: Defines how many additional items to render before and after the visible region to reduce rendering frequency during scrolling. While higher values can improve scroll smoothness by rendering more items off-screen, a higher value can also result in an increase in initial load times. Finding a balance based on your data set size and user experience requirements is recommended. The default value is `3`. Only available when using `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Virtualize`.
* `InitialItemIndex`: Only applicable when using `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Virtualize`. Scrolls the grid to the given zero-based row index on the first interactive render. The value is applied once and clamped to the valid range. This forwards to the inner `Virtualize` component. For more information, see ASP.NET Core Razor component virtualization.
* `ScrollToItemAsync`: Only applicable when using `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Virtualize`. Programmatically scrolls the grid to the given zero-based row index, aligning it to the top. The last call wins, and the method throws an `System.InvalidOperationException` when virtualization is disabled or the grid isn't rendered yet. This forwards to the inner `Virtualize` component. For more information, see ASP.NET Core Razor component virtualization.
* `AnchorMode`: Only applicable when using `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Virtualize`. Controls how the viewport behaves at list edges when items are dynamically added (default: `Start`). This is an experimental API that requires opting in to the `ASP0030` diagnostic, and it forwards to the inner `Virtualize` component. For more information, see ASP.NET Core Razor component virtualization.
* `ItemComparer`: Only applicable when using `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Virtualize`. A comparer used to detect whether items were prepended or appended between data loads, which is useful for class-typed items supplied by an `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.ItemsProvider`. This is an experimental API that requires opting in to the `ASP0030` diagnostic, and it forwards to the inner `Virtualize` component. For more information, see ASP.NET Core Razor component virtualization.
* `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Pagination`: Optionally links this `TGridItem` instance with a `Microsoft.AspNetCore.Components.QuickGrid.PaginationState` model, causing the grid to fetch and render only the current page of data. This is normally used in conjunction with a `Microsoft.AspNetCore.Components.QuickGrid.Paginator` component or some other UI logic that displays and updates the supplied `Microsoft.AspNetCore.Components.QuickGrid.PaginationState` instance. `Microsoft.AspNetCore.Components.QuickGrid.PaginationState` includes API for interacting with the current zero-based page index, the number of items on each page, the zero-based index of the last page, and the total number of items across all pages.
* In the QuickGrid child content (`Microsoft.AspNetCore.Components.RenderFragment`), specify `Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn`2`s, which represent `TGridItem` columns whose cells display values:
  * `Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn`2.Property`: Defines the value to be displayed in this column's cells.
  * `Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn`2.Format`: Optionally specifies a format string for the value. Using `Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn`2.Format` requires the `TProp` type to implement `System.IFormattable`.
  * `Microsoft.AspNetCore.Components.QuickGrid.ColumnBase`1.Sortable`: Indicates whether the data should be sortable by this column. The default value may vary according to the column type. For example, a `Microsoft.AspNetCore.Components.QuickGrid.TemplateColumn`1` is sorted if any `Microsoft.AspNetCore.Components.QuickGrid.TemplateColumn`1.SortBy` parameter is specified.
  * `Microsoft.AspNetCore.Components.QuickGrid.ColumnBase`1.InitialSortDirection`: Indicates the sort direction if `Microsoft.AspNetCore.Components.QuickGrid.ColumnBase`1.IsDefaultSortColumn` is `true`.
  * `Microsoft.AspNetCore.Components.QuickGrid.ColumnBase`1.IsDefaultSortColumn`: Indicates whether this column should be sorted by default.
  * `Microsoft.AspNetCore.Components.QuickGrid.ColumnBase`1.PlaceholderTemplate`: If specified, virtualized grids use this template to render cells whose data hasn't been loaded.
  * `Microsoft.AspNetCore.Components.QuickGrid.ColumnBase`1.HeaderTemplate`: An optional template for this column's header cell. If not specified, the default header template includes the `Microsoft.AspNetCore.Components.QuickGrid.ColumnBase`1.Title`, along with any applicable sort indicators and options buttons.
  * `Microsoft.AspNetCore.Components.QuickGrid.ColumnBase`1.Title`: Title text for the column. The title is rendered automatically if `Microsoft.AspNetCore.Components.QuickGrid.ColumnBase`1.HeaderTemplate` isn't used.

For example, add the following component to render a grid.

`PromotionGrid.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/PromotionGrid.razor._
Access the component in a browser at the relative path `/promotion-grid`.

There aren't current plans to extend QuickGrid with features that full-blown commercial grids tend to offer, for example, hierarchical rows, drag-to-reorder columns, or Excel-like range selections. If you require advanced features that you don't wish to develop on your own, continue using third-party grids.

## Page items with a `Paginator` component

The `QuickGrid` component can page data from the data source.

Add a `Microsoft.AspNetCore.Components.QuickGrid.PaginationState` instance to the component's `@code` block. Set the `Microsoft.AspNetCore.Components.QuickGrid.PaginationState.ItemsPerPage` to the number of items to display per page. In the following example, the instance is named `pagination`, and ten items per page is set:

```csharp
PaginationState pagination = new PaginationState { ItemsPerPage = 10 };
```

Set the `QuickGrid` component's `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Pagination` property to `pagination`:

```razor
<QuickGrid Items="..." Pagination="pagination">
```

To provide a UI for pagination, add a `Paginator` component above, below, or both above and below the `QuickGrid` component. Set the `Microsoft.AspNetCore.Components.QuickGrid.Paginator.State` to `pagination`:

```razor
<Paginator State="pagination" />
```

In the running app, page through the items using a rendered `Paginator` component.

<!-- UPDATE 11.0 - Hold for December servicing release

The `Paginator` component supports passing custom attributes to its rendered navigation element (``). In the following example, the `aria-label` attribute and value are passed:

```razor
<Paginator State="@pagination" aria-label="Orders page" />
```

-->

`GetPageUrl` returns a URL with the one-based page number. Page index 0 (page 1) omits the query parameter entirely.

## Pagination modes

`QuickGrid` supports *URL-based navigation* with pagination and sort state persisted by the URL's query string. When users paginate or sort, the URL updates (example: `?page=2&sort=Name&direction=asc`). This enables link sharing, browser back/forward, and static SSR without interactivity.

Sortable column headers and paginator controls render as `` elements with `href` attributes. The links support standard browser behavior, such as opening a page in a new tab or window. The `StaticHtmlRenderer` renders these anchors. On each request, the server reads the query string to determine current page and sort state—no JavaScript runtime required.

Query string parameters:

* `page`: One-based page number. The first page omits the parameter for clean URLs.
* `sort`: Column title for sorting the grid.
* `direction`: Ascending (`asc`) or descending (`desc`).

If the `page` value is malformed, zero, or negative, `QuickGrid` displays the first page. If the value is greater than the number of available pages, `QuickGrid` displays the last page. This behavior applies when the grid receives data from either `Items` or `ItemsProvider`. An `ItemsProvider` must return an accurate total item count for `QuickGrid` to resolve the last page correctly.

Rename the preceding query string parameters with the `QueryParameterNameOptions` parameter. For more information, see the Query parameter names section.

The `sort` column is identified by the column's `Title` property. Columns without a `Title` render a non-clickable `` header.

`QuickGrid` reads the URL on initialization and subscribes to `NavigationManager.LocationChanged`, so browser back/forward and direct URL entry work. When sort parameters are removed from the URL, it falls back to the default sort column/direction.

> **Note:**
> Disabled paginator links are marked with `aria-disabled="true"`, removed from the tab order with `tabindex="-1"`, and made non-interactive with `pointer-events: none`.

To disable URL-based navigation, set the `AppContext` switch for the feature to `false`:

```csharp
AppContext.SetSwitch(
    "Microsoft.AspNetCore.Components.QuickGrid.EnableUrlBasedQuickGridNavigationAndSorting",
    false);
```

This restores `` elements with `@onclick` handlers. An interactive render mode is required.

The switch only controls the rendered HTML element (`` versus ``). Even when disabled, `QuickGrid` still reads and writes state to the URL query string internally. `SortByColumnAsync` and `Paginator.GoToPageAsync` navigate via `NavigationManager.NavigateTo` regardless of the flag.
