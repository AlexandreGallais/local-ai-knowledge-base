---
title: "blazor (part 2 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-11/includes/blazor.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# blazor (part 2 of 4)

### `QuickGrid` improvements

The `QuickGrid` component receives several new features in .NET 11.

For more information on the following features, see ASP.NET Core Blazor \`QuickGrid\` component.

#### Pagination modes

Prior to the release of .NET 11, pagination and sort state is managed in memory inside the `QuickGrid` component without changing the URL, called *inner-state navigation*. An interactive render mode is required.

With the release of .NET 11, `QuickGrid` supports *URL-based navigation*.

Pagination and sort state is persisted in the URL query string. When users paginate or sort, the URL updates (example: `?page=2&sort=Name&direction=asc`). This enables link sharing, browser back/forward, and static SSR without interactivity.

Sortable column headers and paginator controls render as `` elements with `href` attributes. The `StaticHtmlRenderer` renders these anchors. On each request, the server reads the query string to determine current page and sort state—no JavaScript runtime required.

Query string parameters:

* `page`: One-based page number. The first page omits the parameter for clean URLs.
* `sort`: Column title for sorting the grid.
* `direction`: Ascending (`asc`) or descending (`desc`).

The `sort` column is identified by the column's `Title` property. Columns without a `Title` render a non-clickable `` header.

`QuickGrid` reads the URL on initialization and subscribes to `NavigationManager.LocationChanged`, so browser back/forward and direct URL entry work. When sort parameters are removed from the URL, it falls back to the default sort column/direction.

Disabled paginator links use `aria-disabled="true"` and `pointer-events: none` instead of the HTML `disabled` attribute, which doesn't exist on `` elements.

#### Query parameter names

The new `QueryParameterNameOptions` parameter of the `QuickGrid` component controls the names of the query string parameters that persist grid state in the URL. The `QueryParameterNameOptions` class has three settable properties:

* `Sort`: Name of the query string parameter that holds the sort column. The default value is `sort`.
* `Direction`: Name of the query string parameter that holds the sort direction. The default value is `direction`.
* `Page`: Name of the query string parameter that holds the page number. The default value is `page`.

The constructor takes an optional prefix argument that's prepended to all three default names. The prefix must include any separator character that you want to appear between the prefix and the name. In the following example, the query string parameters are named `products_sort`, `products_direction`, and `products_page`:

```razor
@using Microsoft.AspNetCore.Components.QuickGrid

<QuickGrid ...
    QueryParameterNameOptions="@(new QueryParameterNameOptions("products_"))">
    ...
</QuickGrid>
```

To control the names individually, set the properties of the class. Properties set explicitly take precedence over a prefix passed to the constructor, so the two approaches can be combined:

```razor
@using Microsoft.AspNetCore.Components.QuickGrid

<QuickGrid ... QueryParameterNameOptions="@queryParameterNames">
    ...
</QuickGrid>

@code {
    private QueryParameterNameOptions queryParameterNames = new()
    {
        Sort = "orderBy",
        Direction = "orderDir",
        Page = "p"
    };
}
```

#### Multiple grids on the same page

Multiple `QuickGrid` components on the same page require unique query parameter names to avoid query string conflicts. Assign a `QueryParameterNameOptions` parameter to all but one of the grids.

Each `QuickGrid` must have its own `PaginationState` instance. Multiple grids must not share a `PaginationState` if they use different query parameter names—the last grid to render overwrites the query parameter name on the shared state, causing the `Paginator` to read from the wrong parameter.

In releases prior to .NET 11, the following `QuickGrid` components worked implicitly:

```razor
<QuickGrid ... Pagination="@pagination1">
    ...
</QuickGrid>

<QuickGrid ... Pagination="@pagination2">
    ...
</QuickGrid>
```

With the release of .NET 11, the following `QuickGrid` components require unique query parameter names. The first `QuickGrid` uses the default names, while the second one uses a `cities_` prefix:

```razor
<QuickGrid ... Pagination="@pagination1">
    ...
</QuickGrid>

<QuickGrid ... Pagination="@pagination2"
    QueryParameterNameOptions="@(new QueryParameterNameOptions("cities_"))">
    ...
</QuickGrid>
```

Example query string for the preceding `QuickGrid` components:

```
?page=2&sort=Name&direction=asc&cities_page=3&cities_sort=Population&cities_direction=desc
```

#### Sort by column

Add `Sortable="true"` to a `PropertyColumn`. With URL-based navigation, selecting a header navigates to a URL with updated `sort` and `direction` parameters. With inner-state navigation, selecting a header triggers `@onclick`, which calls `SortByColumnAsync`. In both cases, `SortByColumnAsync` navigates via `NavigationManager.NavigateTo(GetSortQueryStringUrl(...))`, so the URL always reflects the sort state.

#### Title-based sort identification

Sort state in the URL uses the column's `Title` property as the identifier. The `sort` query parameter is set to `column.Title` (example for column title `Name`: `?sort=Name&direction=asc`). On a URL change, `QuickGrid` matches the `sort` value back to a column by executing `_columns.FirstOrDefault(c => c.Title == sort.ColumnTitle)`. If no column title matches, the sort is ignored and the grid falls back to its default sort.

Renaming a column's `Title` is a URL-breaking change. Any bookmarked or shared URLs containing the old title in the `sort` parameter stop matching, and the grid silently falls back to the default sort instead of sorting by the intended column. For `PropertyColumn`, the `Title` defaults to the property name (example: `Property="@(p => p.FirstName)"` produces `Title="First Name"`), so renaming the property or explicitly changing the `Title` parameter both break existing URLs.

#### Paginator

`Paginator` injects `NavigationManager`, subscribes to `LocationChanged`, and reads the page index from the query string on every location change. `GoToPageAsync` navigates to the target URL rather than directly mutating `PaginationState`. State is updated through the `LocationChanged` callback flow.

`GetPageUrl` returns a URL with the one-based page number. Page index 0 (page 1) omits the query parameter entirely.

<!-- UPDATE 11.0 - Hold for December servicing release

The `Paginator` component now supports passing custom attributes to its rendered navigation element (``). In the following example, the `aria-label` attribute and value are passed:

```razor
<Paginator State="@pagination" aria-label="Orders page" />
```

-->

#### CSS breaking change

When URL-based navigation is enabled, selectors targeting `button.col-title` must also target `a.col-title`, and `nav button`/`nav button:disabled` require `nav a`/`nav a[aria-disabled="true"]`. The built-in QuickGrid stylesheet provides both by default.

#### How to disable URL-based navigation

To disable URL-based navigation, set the `AppContext` switch for the feature to `false`:

```csharp
AppContext.SetSwitch(
    "Microsoft.AspNetCore.Components.QuickGrid.EnableUrlBasedQuickGridNavigationAndSorting",
    false);
```

This restores `` elements with `@onclick` handlers. An interactive render mode is required.

The switch only controls the rendered HTML element (`` versus ``). Even when disabled, `QuickGrid` still reads and writes state to the URL query string internally. `SortByColumnAsync` and `Paginator.GoToPageAsync` navigate via `NavigationManager.NavigateTo` regardless of the flag.

#### Row click event (`OnRowClick`)

The `QuickGrid` component now supports row click events through the new `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.OnRowClick` parameter. When set, the grid automatically applies appropriate styling (cursor pointer) and invokes the callback with the clicked item:

```razor
@using Microsoft.AspNetCore.Components.QuickGrid
@inject NavigationManager NavigationManager

<QuickGrid Items="@people.AsQueryable()"
    OnRowClick="@((Person args) => HandleRowClick(args))">
    <PropertyColumn Property="@(p => p.Name)" />
    <PropertyColumn Property="@(p => p.Email)" />
</QuickGrid>

@code {
    private List<Person> people = new()
    {
        new(1, "Alice Smith", "alice@example.com", "Engineering"),
        new(2, "Bob Johnson", "bob@example.com", "Marketing"),
        new(3, "Carol Williams", "carol@example.com", "Engineering"),
    };

    private void HandleRowClick(Person person)
    {
        NavigationManager.NavigateTo($"/person/{person.Id}");
    }

    private record Person(int Id, string Name, string Email, string Department);
}
```

The feature includes built-in CSS styling that applies a pointer cursor to clickable rows through the row-clickable CSS class, providing clear visual feedback to users.

### Client-side prerendering in a Blazor Web App preserves the server's culture

By default, client-side prerendering on the server (`.Client` project in a Blazor Web App) persists the server's `System.Globalization.CultureInfo.CurrentCulture` and `System.Globalization.CultureInfo.CurrentUICulture` into component state and applies them on the client before satellite assemblies load.

Apps that require the client to choose a culture independently of the server can opt out with `WebAssemblyComponentsOptions.UseCultureFromServer` in the Blazor Web App's `Program` file:

```csharp
builder.Services.AddRazorComponents()
    .AddInteractiveWebAssemblyComponents(options =>
    {
        options.UseCultureFromServer = false;
    });
```

### Persist session data between HTTP requests during static server-side rendering (static SSR)

Session data persistence reads and writes cookie-based HTTP session values during static server-side rendering (static SSR), which is useful for scenarios such as shopping cart IDs or multi-step form progress. Unlike temporary data persistence (`ITempData`), session values aren't cleared after reading. Values persist across multiple requests for the session lifetime.

Session storage configuration requires adding services by calling `AddSession` and request pipeline configuration with `UseSession`:

```csharp
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession();
builder.Services.AddRazorComponents();

var app = builder.Build();

app.UseSession();
```

When supplied to a parameter, use the `[SupplyParameterFromSession]` attribute without or with a key (string):

```csharp
[SupplyParameterFromSession]
public string? Message { get; set; }

[SupplyParameterFromSession(Name = "flash_message")]
public string? FlashMessage { get; set; }
```

For more information, see ASP.NET Core Blazor server-side state management.

### `GetUriWithFragment` extension method

A new `GetUriWithFragment` extension method permits `NavigationManager` to easily construct URIs with hash fragments. This helper method provides an efficient, zero-allocation way to append hash fragments to the current URI. The following example demonstrates two use cases:

* Inline call that jumps to Section 1 (`id="section-1"`) of the rendered page.
* Method call that receives a section Id (`sectionId`) and navigates to the section of the page.

```razor
@inject NavigationManager Navigation

<a href="@Navigation.GetUriWithFragment("section-1")">
    Jump to Section 1
</a>

@code {
    private void NavigateToSection(string sectionId)
    {
        var uri = Navigation.GetUriWithFragment(sectionId);
        Navigation.NavigateTo(uri);
    }
}
```

The method uses `string.Create` for optimal performance and works correctly with non-root base URIs (for example, when using `<base href="/app/">`).

### `EnvironmentView` component

Blazor now includes a built-in `EnvironmentView` component for conditional rendering based on the hosting environment. This component provides a consistent way to render content based on the current environment across both server-side and client-side hosting models.

The `EnvironmentView` component accepts `Include` and `Exclude` parameters for specifying environment names. The component performs case-insensitive matching and follows the same semantics as MVC's `EnvironmentTagHelper`.

```razor
@using Microsoft.AspNetCore.Components.Web

<EnvironmentView Include="Development">
    <div class="alert alert-warning">
        Debug mode enabled
    </div>
</EnvironmentView>

<EnvironmentView Include="Development,Staging">
    <p>Pre-production environment</p>
</EnvironmentView>

<EnvironmentView Exclude="Production">
    <p>@DateTime.Now</p>
</EnvironmentView>
```

### MathML namespace support

Blazor now supports MathML elements in interactive rendering. MathML elements, such as `<math>`, `<mrow>`, `<mi>`, and `<mn>`, are created with the correct namespace (http://www.w3.org/1998/Math/MathML) using `document.createElementNS()`, similar to how SVG elements are handled:

```html
<math>
    <mrow>
        <mi>x</mi>
        <mo>=</mo>
        <mfrac>
            <mrow>
                <mo>−</mo>
                <mi>b</mi>
                <mo>±</mo>
                <msqrt>
                    <mrow>
                        <msup><mi>b</mi><mn>2</mn></msup>
                        <mo>−</mo>
                        <mn>4</mn>
                        <mi>a</mi>
                        <mi>c</mi>
                    </mrow>
                </msqrt>
            </mrow>
            <mrow>
                <mn>2</mn>
                <mi>a</mi>
            </mrow>
        </mfrac>
    </mrow>
</math>
```

This fix ensures that MathML content renders correctly in browsers when added dynamically through Blazor's renderer, resolving issues where MathML elements were previously created as regular HTML elements without the proper namespace.

### `InvokeVoidAsync()` analyzer

A new Blazor analyzer (BL0010) has been added that recommends using `InvokeVoidAsync` instead of `InvokeAsync<object>` when calling JavaScript functions that don't return values. This analyzer helps developers write more efficient JSInterop code.

**Problematic code:**

```csharp
// ⚠️ BL0010: Use InvokeVoidAsync for JavaScript functions that don't return a value
await JSRuntime.InvokeAsync<object>("console.log", "Hello");
```

**Recommended code:**

```csharp
// ✅ Correct: Use InvokeVoidAsync
await JSRuntime.InvokeVoidAsync("console.log", "Hello");
```

The analyzer helps catch performance issues where `InvokeAsync` is unnecessarily used with `object` or ignored return values, guiding developers toward the more appropriate `InvokeVoidAsync` method.
