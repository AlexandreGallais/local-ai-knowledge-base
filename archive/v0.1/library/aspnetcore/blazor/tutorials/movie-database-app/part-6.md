---
title: "Build a Blazor movie database app (Part 6 - Add search)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/tutorials/movie-database-app/part-6.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Build a Blazor movie database app (Part 6 - Add search)

-->
-->

This article is the sixth part of the Blazor movie database app tutorial that teaches you the basics of building an ASP.NET Core Blazor Web App with features to manage a movie database.

This part of the tutorial series covers adding a search feature to the movies `Index` component to filter movies by title.

## Implement a filter feature for the `QuickGrid` component

The `QuickGrid` component is used by the movie `Index` component (`Components/MoviePages/Index.razor`) to display movies from the database:

```razor
<QuickGrid Class="table" Items="context.Movie">
    ...
</QuickGrid>
```

The `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Items` parameter receives an `IQueryable<TGridItem>`, where `TGridItem` is the type of data represented by each row in the grid (`Movie`). `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Items` is assigned a collection of movie entities (`DbSet<Movie>`) obtained from the created database context (`Microsoft.EntityFrameworkCore.IDbContextFactory`1.CreateDbContext*`) of the injected database context factory (`DbFactory`).

To make the `QuickGrid` component filter on the movie title, the `Index` component should:

* Set a filter string as a *component parameter* from the query string.
* If the parameter has a value, filter the movies returned from the database.
* Provide an input for the user to provide the filter string and a button to trigger a reload using the filter.

Start by adding the following code to the `@code` block of the `Index` component (`MoviePages/Index.razor`):

```csharp
[SupplyParameterFromQuery]
private string? TitleFilter { get; set; }

private IQueryable<Movie> FilteredMovies => 
    context.Movie.Where(m => m.Title!.Contains(TitleFilter ?? string.Empty));
```

`TitleFilter` is the filter string. The property is provided the `[SupplyParameterFromQuery]` attribute, which lets Blazor know that the value of `TitleFilter` should be assigned from the query string when the query string contains a field of the same name (for example, `?titleFilter=road+warrior` yields a `TitleFilter` value of `road warrior`). Note that query string field names, such as `titleFilter`, aren't case sensitive.

The `FilteredMovies` property is an `IQueryable<Movie>`, which is the type for assignment to the QuickGrid's `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Items` parameter. The property filters the list of movies based on the supplied `TitleFilter`. If a `TitleFilter` isn't assigned a value from the query string (`TitleFilter` is `null`), an empty string (`string.Empty`) is used for the `System.String.Contains*` clause. Therefore, no movies are filtered for display.

Change the `QuickGrid` component's `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Items` parameter to use the `movies` collection:

```diff
- <QuickGrid Class="table" Items="context.Movie">
+ <QuickGrid Class="table" Items="FilteredMovies">
```

The `movie => movie.Title!.Contains(...)` code is a *lambda expression*. Lambdas are used in method-based LINQ queries as arguments to standard query operator methods such as the `System.Linq.Queryable.Where*` or `System.String.Contains*` methods. LINQ queries aren't executed when they're defined or when they're modified by calling a method, such as `System.Linq.Queryable.Where*`, `System.String.Contains*`, or `System.Linq.Queryable.OrderBy*`. Rather, query execution is deferred. The evaluation of an expression is delayed until its realized value is iterated.

The `System.Linq.Queryable.Where*` method is run on the database, not in the C# code. The case sensitivity of the query depends on the database and the collation. For SQL Server, `System.String.Contains*` maps to SQL `LIKE`, which is case insensitive. SQLite with default collation provides a mixture of case-sensitive and case-insensitive filtering, depending on the query.

Run the app and navigate to the movies `Index` page at `/movies`. The movies in the database load:

**vs:**

Append a query string to the URL in the address bar: `?titleFilter=road+warrior`. For example, the full URL appears as `https://localhost:7073/movies?titleFilter=road+warrior`, assuming the port number is `7073`. The filtered movie is displayed:

**vsc:**

Append a query string to the URL in the address bar: `?titleFilter=Road+Warrior`. For example, the full URL appears as `https://localhost:7073/movies?titleFilter=Road+Warrior`, assuming the port number is `7073`. The filtered movie is displayed:

**cli:**

Append a query string to the URL in the address bar: `?titleFilter=Road+Warrior`. For example, the full URL appears as `https://localhost:7073/movies?titleFilter=Road+Warrior`, assuming the port number is `7073`. The filtered movie is displayed:

Next, give users a way to provide the `titleFilter` filter string via the component's UI. Add the following HTML under the H1 heading (`<h1>Index</h1>`). The following HTML reloads the page with the contents of the textbox as a query string value:

```html
<div>
    <form action="/movies" data-enhance>
        <input type="search" name="titleFilter" />
        <input type="submit" value="Search" />
    </form>
</div>
```

The `data-enhance` attribute applies *enhanced navigation* to the component, where Blazor intercepts the GET request and performs a fetch request instead. Blazor then patches the response content into the page, which avoids a full-page reload and preserves more of the page state. The page loads faster, usually without losing the user's scroll position.

**vs:**

Save the file that you're working on. Apply the change by either restarting the app or using Hot Reload to apply the change to the running app.

**vsc:**

Close the browser window and in VS Code select **Run** > **Restart Debugging** or press `Ctrl`+`Shift`+`F5` on the keyboard. VS Code recompiles and runs the app with your saved changes and spawns a new browser window for the app.

**cli:**

Because the app is currently running with `dotnet watch`, saved changes are detected automatically and reflected in the existing browser window.

**vs:**

Type "`road warrior`" into the search box and select the **:::no-loc text="Search":::** button to filter the movies:

The result after searching on `road warrior`:

Notice that the search box loses the search value ("`road warrior`") when the movies are filtered. If you want to preserve the searched value, add the `data-permanent` attribute:

**vsc:**

Type "`Road Warrior`" into the search box and select the **:::no-loc text="Search":::** button to filter the movies:

The result after searching on `Road Warrior`:

Notice that the search box loses the search value ("`Road Warrior`") when the movies are filtered. If you want to preserve the searched value, add the `data-permanent` attribute:

**cli:**

Type "`Road Warrior`" into the search box and select the **:::no-loc text="Search":::** button to filter the movies:

The result after searching on `Road Warrior`:

Notice that the search box loses the search value ("`Road Warrior`") when the movies are filtered. If you want to preserve the searched value, add the `data-permanent` attribute:

```diff
- <form action="/movies" data-enhance>
+ <form action="/movies" data-enhance data-permanent>
```

## Stop the app

**vs:**

Stop the app by closing the browser's window.

**vsc:**

Stop the app by closing the browser's window and pressing `Shift`+`F5` on the keyboard in VS Code.

**cli:**

Stop the app by closing the browser's window and pressing `Ctrl`+`C` in the command shell.

## Troubleshoot with the completed sample

If you run into a problem while following the tutorial that you can't resolve from the text, compare your code to the completed project in the Blazor samples repository:

Blazor samples GitHub repository (`dotnet/blazor-samples`)

Select the latest version folder. The sample folder for this tutorial's project is named `BlazorWebAppMovies`.

## Related content

* LINQ documentation
* Write C# LINQ queries to query data (C# documentation)
* Lambda Expression (C# documentation

## Legal

*Mad Max*, *The Road Warrior*, *Mad Max: Beyond Thunderdome*, *Mad Max: Fury Road*, and *Furiosa: A Mad Max Saga* are trademarks and copyrights of Warner Bros. Entertainment.

## Next steps

> Previous: Add validation
> Next: Add a new field
