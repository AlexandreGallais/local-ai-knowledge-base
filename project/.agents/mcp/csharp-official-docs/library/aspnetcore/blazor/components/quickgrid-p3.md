---
title: "ASP.NET Core Blazor `QuickGrid` component (part 3 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/components/quickgrid.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor `QuickGrid` component (part 3 of 4)

## Entity Framework Core (EF Core) data source

Use the factory pattern to resolve an EF Core database context that provides data to a `QuickGrid` component. For more information on why the factory pattern is recommended, see ASP.NET Core Blazor with Entity Framework Core (EF Core).

A database context factory (`Microsoft.EntityFrameworkCore.IDbContextFactory`1`) is injected into the component with the `@inject` directive. The factory approach requires disposal of the database context, so the component implements the `System.IAsyncDisposable` interface with the `@implements` directive. The item provider for the `QuickGrid` component is a `DbSet<T>` obtained from the created database context (`Microsoft.EntityFrameworkCore.IDbContextFactory`1.CreateDbContext*`) of the injected database context factory.

QuickGrid recognizes EF-supplied `System.Linq.IQueryable` instances and knows how to resolve queries asynchronously for efficiency.

Add a package reference for the `Microsoft.AspNetCore.Components.QuickGrid.EntityFrameworkAdapter` NuGet package.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

Call `Microsoft.Extensions.DependencyInjection.EntityFrameworkAdapterServiceCollectionExtensions.AddQuickGridEntityFrameworkAdapter*` on the service collection in the `Program` file to register an EF-aware `Microsoft.AspNetCore.Components.QuickGrid.IAsyncQueryExecutor` implementation:

```csharp
builder.Services.AddQuickGridEntityFrameworkAdapter();
```

The following example uses an `ExampleTable` `Microsoft.EntityFrameworkCore.DbSet`1` (table) from a `AppDbContext` database context (`context`) as the data source for a `QuickGrid` component:

```razor
@using Microsoft.AspNetCore.Components.QuickGrid
@using Microsoft.EntityFrameworkCore
@implements IAsyncDisposable
@inject IDbContextFactory<AppDbContext> DbFactory

...

<QuickGrid ... Items="context.ExampleTable" ...>
    ...
</QuickGrid>

@code {
    private AppDbContext context = default!;

    protected override void OnInitialized()
    {
        context = DbFactory.CreateDbContext();
    }

    public async ValueTask DisposeAsync() => await context.DisposeAsync();
}
```

In the code block (`@code`) of the preceding example:

* The `context` field holds the database context, typed as an `AppDbContext`.
* The `OnInitialized` lifecycle method assigns a new database context (`Microsoft.EntityFrameworkCore.IDbContextFactory`1.CreateDbContext*`) to the `context` field from the injected factory (`DbFactory`).
* The asynchronous `DisposeAsync` method disposes of the database context when the component is disposed.

You may also use any EF-supported LINQ operator to filter the data before passing it to the `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Items` parameter.

The following example filters movies by a movie title entered in a search box. The database context is `BlazorWebAppMoviesContext`, and the model is `Movie`. The movie's `Title` property is used for the filter operation.

```razor
@using Microsoft.AspNetCore.Components.QuickGrid
@using Microsoft.EntityFrameworkCore
@implements IAsyncDisposable
@inject IDbContextFactory<BlazorWebAppMoviesContext> DbFactory

...

<p>
    <input type="search" @bind="titleFilter" @bind:event="oninput" />
</p>

<QuickGrid ... Items="FilteredMovies" ...>
    ...
</QuickGrid>

@code {
    private string titleFilter = string.Empty;
    private BlazorWebAppMoviesContext context = default!;

    protected override void OnInitialized()
    {
        context = DbFactory.CreateDbContext();
    }

    private IQueryable<Movie> FilteredMovies => 
        context.Movie.Where(m => m.Title!.Contains(titleFilter));

    public async ValueTask DisposeAsync() => await context.DisposeAsync();
}
```

For a working example, see the following resources:

* Build a Blazor movie database app tutorial
* Blazor movie database sample app: Select the latest version folder in the repository. The sample folder for the tutorial's project is named `BlazorWebAppMovies`.

## Display name support

A column title can be assigned using `Microsoft.AspNetCore.Components.QuickGrid.ColumnBase`1.Title` in the `Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn`2`'s tag. In the following movie example, the column is given the name "`Release Date`" for the column's movie release date data:

```razor
<PropertyColumn Property="movie => movie.ReleaseDate" Title="Release Date" />
```

However, managing column titles (names) from bound model properties is usually a better choice for maintaining an app. A model can control the display name of a property with the `[Display]` attribute. In the following example, the model specifies a movie release date display name of "`Release Date`" for its `ReleaseDate` property:

```csharp
[Display(Name = "Release Date")]
public DateTime ReleaseDate { get; set; }
```

To enable the `QuickGrid` component to use the `System.ComponentModel.DataAnnotations.DisplayAttribute.Name` property, subclass `Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn`2`, either in the component or in a separate class. Call the `System.ComponentModel.DataAnnotations.DisplayAttribute.GetName*` method to return the localized `System.ComponentModel.DataAnnotations.DisplayAttribute.Name` value if an unlocalized `System.ComponentModel.DisplayNameAttribute.DisplayName` (`[DisplayName]` attribute) doesn't hold the value:

```csharp
public class DisplayNameColumn<TGridItem, TProp> : PropertyColumn<TGridItem, TProp>
{
    protected override void OnParametersSet()
    {
        if (Title is null && Property.Body is MemberExpression memberExpression)
        {
            var memberInfo = memberExpression.Member;
            Title = 
                memberInfo.GetCustomAttribute<DisplayNameAttribute>().DisplayName ??
                memberInfo.GetCustomAttribute<DisplayAttribute>().GetName() ??
                memberInfo.Name;
        }

        base.OnParametersSet();
    }
}
```

Use the subclass in the `QuickGrid` component. In the following example, the preceding `DisplayNameColumn` is used. The name "`Release Date`" is provided by the `[Display]` attribute in the model, so there's no need to specify a `Microsoft.AspNetCore.Components.QuickGrid.ColumnBase`1.Title`:

```razor
<DisplayNameColumn Property="movie => movie.ReleaseDate" />
```

The `[DisplayName]` attribute is also supported:

```csharp
[DisplayName("Release Date")]
public DateTime ReleaseDate { get; set; }
```

However, the `[Display]` attribute is recommended because it makes additional properties available. For example, the `[Display]` attribute offers the ability to assign a resource type for localization.

## Remote data

In Blazor WebAssembly apps, fetching data from a JSON-based web API on a server is a common requirement. To fetch only the data that's required for the current page/viewport of data and apply sorting or filtering rules on the server, use the `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.ItemsProvider` parameter.

`Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.ItemsProvider` can also be used in a server-side Blazor app if the app is required to query an external endpoint or in other cases where the requirements aren't covered by an `System.Linq.IQueryable`.

Supply a callback matching the `Microsoft.AspNetCore.Components.QuickGrid.GridItemsProvider`1` delegate type, where `TGridItem` is the type of data displayed in the grid. The callback is given a parameter of type `Microsoft.AspNetCore.Components.QuickGrid.GridItemsProviderRequest`1`, which specifies the start index, maximum row count, and sort order of data to return. In addition to returning the matching items, a total item count (`totalItemCount`) is also required for paging and virtualization to function correctly.

The following example obtains data from the public OpenFDA Food Enforcement database.

The `Microsoft.AspNetCore.Components.QuickGrid.GridItemsProvider`1` converts the `Microsoft.AspNetCore.Components.QuickGrid.GridItemsProviderRequest`1` into a query against the OpenFDA database. Query parameters are translated into the particular URL format supported by the external JSON API. It's only possible to perform sorting and filtering via sorting and filtering that's supported by the external API. The OpenFDA endpoint doesn't support sorting, so none of the columns are marked as sortable. However, it does support skipping records (`skip` parameter) and limiting the return of records (`limit` parameter), so the component can enable virtualization and scroll quickly through tens of thousands of records.

`FoodRecalls.razor`:

```razor
@page "/food-recalls"
@inject HttpClient Http
@inject NavigationManager Navigation

<PageTitle>Food Recalls</PageTitle>

<h1>OpenFDA Food Recalls</h1>

<div class="grid" tabindex="-1">
    <QuickGrid ItemsProvider="@foodRecallProvider" Virtualize="true">
        <PropertyColumn Title="ID" Property="@(c => c.Event_Id)" />
        <PropertyColumn Property="@(c => c.State)" />
        <PropertyColumn Property="@(c => c.City)" />
        <PropertyColumn Title="Company" Property="@(c => c.Recalling_Firm)" />
        <PropertyColumn Property="@(c => c.Status)" />
    </QuickGrid>
</div>

<p>Total: <strong>@numResults results found</strong></p>

@code {
    private GridItemsProvider<FoodRecall>? foodRecallProvider;
    private int numResults;

    protected override async Task OnInitializedAsync()
    {
        foodRecallProvider = async req =>
        {
            var url = Navigation.GetUriWithQueryParameters(
                "https://api.fda.gov/food/enforcement.json", 
                new Dictionary<string, object?>
            {
                { "skip", req.StartIndex },
                { "limit", req.Count },
            });

            using var response = await Http.GetFromJsonAsync<FoodRecallQueryResult>(
                url, req.CancellationToken);

            return GridItemsProviderResult.From(
                items: response!.Results,
                totalItemCount: response!.Meta.Results.Total);
        };

        numResults = (await Http.GetFromJsonAsync<FoodRecallQueryResult>(
            "https://api.fda.gov/food/enforcement.json"))!.Meta.Results.Total;
    }
}
```

For more information on calling web APIs, see Call a web API from an ASP.NET Core Blazor app.
