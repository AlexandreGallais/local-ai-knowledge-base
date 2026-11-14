---
title: "ASP.NET Core Blazor `QuickGrid` component (part 2 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/components/quickgrid.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor `QuickGrid` component (part 2 of 4)

## Query parameter names

The `QueryParameterNameOptions` parameter of the `QuickGrid` component controls the names of the query string parameters that persist grid state in the URL. The `QueryParameterNameOptions` class has three settable properties:

* `Sort`: Name of the query string parameter that holds the sort column. The default value is `sort`.
* `Direction`: Name of the query string parameter that holds the sort direction. The default value is `direction`.
* `Page`: Name of the query string parameter that holds the page number. The default value is `page`.

The parameter is never `null`. If the parameter isn't set, the `QuickGrid` component uses an instance created by the parameterless constructor, which results in the default names of the preceding list.

The constructor takes an optional prefix argument that's prepended to all three default names. The prefix must include any separator character that you want to appear between the prefix and the name. In the following example, the query string parameters are named `products_sort`, `products_direction`, and `products_page`:

```razor
@using Microsoft.AspNetCore.Components.QuickGrid

<QuickGrid ... 
    QueryParameterNameOptions="@(new QueryParameterNameOptions("products_"))">
    ...
</QuickGrid>
```

To control the names individually, set the properties of the class. Properties set explicitly take precedence over a prefix passed to the constructor, so the two approaches can be combined. The following example names the query string parameters `orderBy`, `orderDir`, and `p`:

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

The page query parameter name is applied to the `PaginationState` instance assigned to the grid's `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Pagination` parameter, so a linked `Paginator` component reads and writes the same parameter name automatically.

## Multiple grids on the same page

Multiple `QuickGrid` components on the same page require unique query parameter names to avoid query string conflicts. Assign a `QueryParameterNameOptions` parameter to all but one of the grids. For more information, see the Query parameter names section.

Each `QuickGrid` must have its own `PaginationState` instance. Multiple grids must not share a `PaginationState` if they use different query parameter names—the last grid to render overwrites the query parameter name on the shared state, causing the `Paginator` to read from the wrong parameter.

In the following example, the first `QuickGrid` uses the default query parameter names, while the second one uses a `cities_` prefix:

```razor
<QuickGrid ... Pagination="@pagination1">
    ...
</QuickGrid>

<Paginator State="pagination1" />

<QuickGrid ... Pagination="@pagination2" 
    QueryParameterNameOptions="@(new QueryParameterNameOptions("cities_"))">
    ...
</QuickGrid>

<Paginator State="pagination2" />
```

In the following query string:

* The `page=2&sort=Name&direction=asc` portion applies to the first `QuickGrid` component.
* The `cities_page=3&cities_sort=Population&cities_direction=desc` portion applies to the second `QuickGrid` component.

```
?page=2&sort=Name&direction=asc&cities_page=3&cities_sort=Population&cities_direction=desc
```

#### Row click event (`OnRowClick`)

The `QuickGrid` component supports row click events through the `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.OnRowClick` parameter. When set, the grid automatically applies appropriate styling (cursor pointer) and invokes the callback with the clicked item:

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
        new(1, "Alice Smith", "user@example.com", "Engineering"),
        new(2, "Bob Johnson", "user@example.com", "Marketing"),
        new(3, "Carol Williams", "user@example.com", "Engineering"),
    };

    private void HandleRowClick(Person person)
    {
        NavigationManager.NavigateTo($"/person/{person.Id}");
    }

    private record Person(int Id, string Name, string Email, string Department);
}
```

The feature includes built-in CSS styling that applies a pointer cursor to clickable rows through the `row-clickable` CSS class, providing clear visual feedback to users. The class is applied to the `tr` element of every data row when `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.OnRowClick` is set, and it's combined with any class returned by the `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.RowClass` parameter.

##### Event propagation from interactive cell content

The row click handler is registered on the row's `tr` element, so a click on an interactive control inside a cell, such as a button, a checkbox, or a link, bubbles up and also invokes `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.OnRowClick`. Keyboard activation of a control can also generate a click that invokes the row callback. To run only the control's own handler, stop propagation on the control with the `@onclick:stopPropagation` directive attribute:

```razor
<QuickGrid Items="@people.AsQueryable()" 
    OnRowClick="@((Person args) => HandleRowClick(args))">
    <PropertyColumn Property="@(p => p.Name)" />
    <TemplateColumn Title="Actions">
        <button @onclick="@(() => Delete(context))" 
            @onclick:stopPropagation="true">
            Delete
        </button>
    </TemplateColumn>
</QuickGrid>
```

## Sort by column

The `QuickGrid` component can sort items by columns. Selecting a header navigates to a URL with updated `sort` and `direction` parameters. `SortByColumnAsync` navigates via `NavigationManager.NavigateTo(GetSortQueryStringUrl(...))`, so the URL always reflects the sort state.

Add `Sortable="true"` (`Microsoft.AspNetCore.Components.QuickGrid.ColumnBase`1.Sortable`) to the `Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn`2` tag:

```razor
<PropertyColumn Property="..." Sortable="true" />
```

In the running app, sort the QuickGrid column by selecting the rendered column title.

Sort state in the URL uses the column's `Title` property as the identifier. The `sort` query parameter is set to `column.Title` (example for column title `Name`: `?sort=Name&direction=asc`). On a URL change, `QuickGrid` matches the `sort` value back to a column by executing `_columns.FirstOrDefault(c => c.Title == sort.ColumnTitle)`. If no column title matches, the sort is ignored and the grid falls back to its default sort.

Renaming a column's `Title` is a URL-breaking change. Any bookmarked or shared URLs containing the old title in the `sort` parameter stop matching, and the grid silently falls back to the default sort instead of sorting by the intended column. For `PropertyColumn`, the `Title` defaults to the property name (example: `Property="@(p => p.FirstName)"` produces `Title="First Name"`), so renaming the property or explicitly changing the `Title` parameter both break existing URLs.

> **Note:**
> If you want to share stylesheet classes between URL-based and inner-state based pagination, selectors targeting `button.col-title` must also target `a.col-title`, and `nav button`/`nav button:disabled` require `nav a`/`nav a[aria-disabled="true"]`. The built-in QuickGrid stylesheet provides both by default.

## Open and return from a details page with a paged QuickGrid component

A paged QuickGrid component can open a details page for a record and return to the correct page of results using the approach in this section. URL-based navigation is used to save the page number and return the user to the same page of items from a details page.

The `Details` component receives the page number from the query string in the `Page` property and uses it to form a link back to the `QuickGrid` component at `/scifi-characters`.

`Details.razor`:

```razor
@page "/details"

<ul>
    <li>Character ID for this detail record: @Id</li>
    <li>QuickGrid page number: @Page</li>
</ul>
<div>
    @if (Page.HasValue)
    {
        <a href="@($"/scifi-characters?page={Page}")">Back to List</a>
    }
    else
    {
        <a href="/scifi-characters">Back to List</a>
    }
</div>

@code {
    [SupplyParameterFromQuery]
    private int? Id { get; set; }

    [SupplyParameterFromQuery]
    private int? Page { get; set; }
}
```

The `SciFiCharacters` component:

* Automatically pages the `QuickGrid` component on component initialization using URL-based navigation, which sets the page index from the value of a `page` query string value, if it exists.
* Opens the preceding `Details` component with the current page number, which is the current page index (`Microsoft.AspNetCore.Components.QuickGrid.PaginationState.CurrentPageIndex`) incremented by one to make the value a one-based index in the query string. A one-based index for the `page` query string parameter matches the rendered `Paginator` component's rendered one-based page number in the UI.

`ScifiCharacters.razor`:

```razor
@page "/scifi-characters"
@using Microsoft.AspNetCore.Components.QuickGrid
@inject NavigationManager Navigation

<QuickGrid Items="characters" Pagination="pagination" 
    OnRowClick="@((Character args) => HandleRowClick(args))">
    <PropertyColumn Property="@(c => c.Id)" />
    <PropertyColumn Property="@(c => c.Name)" />
</QuickGrid>

<Paginator State="pagination" />

@code {
    PaginationState pagination = new PaginationState { ItemsPerPage = 3 };

    private record Character(int Id, string Name);

    private IQueryable<Character> characters = new[]
    {
        new Character(0, "Ellen Ripley"),
        new Character(1, "Darth Vader"),
        new Character(2, "Rick Deckard"),
        new Character(3, "Sarah Connor"),
        new Character(4, "Malcolm Reynolds"),
        new Character(5, "Kara Thrace"),
        new Character(6, "James Kirk"),
        new Character(7, "Flash Gordon"),
        new Character(8, "Max Rockatansky"),
        new Character(9, "Katniss Everdeen"),
        new Character(10, "Ellie Sattler"),
        new Character(11, "Leela")
    }.AsQueryable();

    private void HandleRowClick(Character character)
    {
        Navigation.NavigateTo(
            $"/details?id={character.Id}&page={pagination.CurrentPageIndex + 1}");
    }
}
```

If the `QuickGrid` component sets `QueryParameterNameOptions`, set the query string parameter key for the results page in the `Details` component to match the `Page` property of the options. In the following example, the `QuickGrid` component is assigned a `QueryParameterNameOptions` instance with a `scifi-characters-quickgrid_` prefix, which results in a page query string parameter named `scifi-characters-quickgrid_page`.

In `Characters.razor`:

```razor
<QuickGrid ... 
    QueryParameterNameOptions="@(new QueryParameterNameOptions("scifi-characters-quickgrid_"))">
```

In `Details.razor`:

```razor
<a href="@($"/scifi-characters?scifi-characters-quickgrid_page={Page}")">Back to List</a>
```

> **Note:**
> To disable URL-based navigation, set the following feature flag in the app's `Program` file:
>
> ```csharp
> AppContext.SetSwitch(
>     "Microsoft.AspNetCore.Components.QuickGrid.EnableUrlBasedQuickGridNavigationAndSorting",
>     false);
> ```

## Apply row styles

Apply styles to rows using CSS isolation, which can include styling empty rows for `QuickGrid` components that page data with a `Paginator` component.

Wrap the `QuickGrid` component in a wrapper block element, for example a ``:

```diff
+ <div>
    <QuickGrid ...>
        ...
    </QuickGrid>
+ </div>
```

Apply a row style with the `::deep` pseudo-element. In the following example, row height is set to `2em`, including for empty data rows.

`{COMPONENT}.razor.css`:

```css
::deep tr {
    height: 2em;
}
```

Alternatively, use the following CSS styling approach:

* Display row cells populated with data.
* Don't display empty row cells, which avoids empty row cell borders from rendering per Bootstrap styling.

`{COMPONENT}.razor.css`:

```css
::deep tr:has(> td:not(:empty)) > td {
    display: table-cell;
}

::deep td:empty {
    display: none;
}
```

For more information on using `::deep` pseudo-elements with CSS isolation, see ASP.NET Core Blazor CSS isolation.

## Custom attributes and styles

QuickGrid also supports passing custom attributes and style classes (`Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Class`) to the rendered table element:

```razor
<QuickGrid Items="..." custom-attribute="value" Class="custom-class">
```

## Style a table row based on the row item

Apply a stylesheet class to a row of the grid based on the row item using the `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.RowClass` parameter.

In the following example:

* A row item is represented by the `Person` record. The `Person` record includes a `FirstName` property.
* The `GetRowCssClass` method applies the `highlight-row` class styles to any row where the person's first name is "`Julie`."

```razor
<QuickGrid ... RowClass="GetRowCssClass">
    ...
</QuickGrid>

@code {
    private record Person(int PersonId, string FirstName, string LastName);

    private string GetRowCssClass(Person person) =>
        person.FirstName == "Julie" ? "highlight-row" : null;
}
```

### Close `QuickGrid` column options

Close the `QuickGrid` column options UI with the `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.HideColumnOptionsAsync*` method.

The following example closes the column options UI as soon as the title filter is applied:

```razor
<QuickGrid @ref="movieGrid" Items="movies">
    <PropertyColumn Property="@(m => m.Title)" Title="Title">
        <ColumnOptions>
            <input type="search" @bind="titleFilter" placeholder="Filter by title" 
                @bind:after="@(() => movieGrid.HideColumnOptionsAsync())" />
        </ColumnOptions>
    </PropertyColumn>
    <PropertyColumn Property="@(m => m.Genre)" Title="Genre" />
    <PropertyColumn Property="@(m => m.ReleaseYear)" Title="Release Year" />
</QuickGrid>

@code {
    private QuickGrid<Movie>? movieGrid;
    private string titleFilter = string.Empty;
    private IQueryable<Movie> movies = new List<Movie> { ... }.AsQueryable();
    private IQueryable<Movie> filteredMovies => 
        movies.Where(m => m.Title!.Contains(titleFilter));
}
```
