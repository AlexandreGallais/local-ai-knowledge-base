---
title: "Part 6, add search"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/tutorials/razor-pages/search.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Part 6, add search to ASP.NET Core Razor Pages

By Rick Anderson

In the following sections, you add the ability to search movies by *genre* or *name*.

Add the following highlighted code to `Pages/MoviePages/Index.cshtml.cs`:

```csharp
public class IndexModel : PageModel
{
    private readonly RazorPagesMovieContext _context;

    public IndexModel(RazorPagesMovieContext context)
    {
        _context = context;
    }

    public IList<Movie> Movie { get;set; }  = default!;

    [BindProperty(SupportsGet = true)]
    public string? SearchString { get; set; }

    public SelectList? Genres { get; set; }

    [BindProperty(SupportsGet = true)]
    public string? MovieGenre { get; set; }
```

In the previous code:

* `SearchString`: Contains the text users enter in the search text box. `SearchString` has the `[BindProperty]` attribute. `[BindProperty]` binds form values and query strings with the same name as the property. `[BindProperty(SupportsGet = true)]` is required for binding on HTTP GET requests.
* `Genres`: Contains the list of genres. `Genres` allows the user to select a genre from the list. `SelectList` requires `using Microsoft.AspNetCore.Mvc.Rendering;`
* `MovieGenre`: Contains the specific genre the user selects. For example, "Western".
* `Genres` and `MovieGenre` are used later in this tutorial.

> **Warning:**
> For security reasons, you must opt in to binding `GET` request data to page model properties. Verify user input before mapping it to properties. Opting into `GET` binding is useful when addressing scenarios that rely on query string or route values.
>
> To bind a property on `GET` requests, set the `[BindProperty]` attribute's `SupportsGet` property to `true`:
>
> ```csharp
> [BindProperty(SupportsGet = true)]
> ```
>
> For more information, see ASP.NET Core Community Standup: Bind on GET discussion (YouTube).

Update the `MoviePages/Index` page's `OnGetAsync` method with the following code:

```csharp
public async Task OnGetAsync()
{
    var movies = from m in _context.Movie
                 select m;
    if (!string.IsNullOrEmpty(SearchString))
    {
        movies = movies.Where(s => s.Title.Contains(SearchString));
    }

    Movie = await movies.ToListAsync();
}
```

The first line of the `OnGetAsync` method creates a LINQ query to select the movies:

```csharp
var movies = from m in _context.Movie
             select m;
```

The query is only ***defined*** at this point. It isn't run against the database.

If the `SearchString` property isn't `null` or empty, the movies query is modified to filter on the search string:

```csharp
if (!string.IsNullOrEmpty(SearchString))
{
    movies = movies.Where(s => s.Title.Contains(SearchString));
}
```

The `s => s.Title.Contains()` code is a Lambda Expression. Lambdas are used in method-based LINQ queries as arguments to standard query operator methods such as the Where method or `Contains`. LINQ queries aren't executed when you define them or when you modify them by calling a method, such as `Where`, `Contains`, or `OrderBy`. Rather, query execution is deferred. The evaluation of an expression is delayed until its realized value is iterated over or the `ToListAsync` method is called. For more information, see Query Execution.

> **Note:**
> The `System.Data.Objects.DataClasses.EntityCollection`1.Contains*` method runs on the database, not in the C# code. The case sensitivity on the query depends on the database and the collation. On SQL Server, `Contains` maps to SQL LIKE, which is case insensitive. SQLite with the default collation is a mixture of case sensitive and case ***IN***sensitive, depending on the query. For information on making case insensitive SQLite queries, see the following:
>
> * How to use case-insensitive query with Sqlite provider? (`dotnet/efcore` #11414)
> * How to make a SQLite column case insensitive (`dotnet/AspNetCore.Docs` #22314)
> * Collations and Case Sensitivity

Navigate to the MoviePages page and append a query string such as `?searchString=Ghost` to the URL. For example, `https://localhost:7247/MoviePages?searchString=Ghost`. The filtered movies are displayed.

If you add the following route template to the Index page, you can pass the search string as a URL segment. For example, `https://localhost:7247/MoviePages/Ghost`.

```cshtml
@page "{searchString?}"
```

The preceding route constraint allows searching the title as route data (a URL segment) instead of as a query string value.  The `?` in `"{searchString?}"` means this is an optional route parameter.

The ASP.NET Core runtime uses model binding to set the value of the `SearchString` property from the query string (`?searchString=Ghost`) or route data (`https://localhost:7247/MoviePages/Ghost`). Model binding isn't case sensitive.

However, users can't be expected to modify the URL to search for a movie. In this step, you add UI to filter movies. If you added the route constraint `"{searchString?}"`, remove it.

Open the `Pages/MoviePages/Index.cshtml` file, and add the markup highlighted in the following code:

```cshtml
﻿@page
@model RazorPagesMovie.Pages.MoviePages.IndexModel

@{
    ViewData["Title"] = "Index";
}

<h1>Index</h1>

<p>
    <a asp-page="Create">Create New</a>
</p>

<form>
    <p>
        <label>Title: <input type="text" asp-for="SearchString" /></label>
        <input type="submit" value="Filter" />
    </p>
</form>

<table class="table">
    <thead>
```

The HTML `<form>` tag uses the following Tag Helpers:

* Form Tag Helper. When you submit the form, it sends the filter string to the *Pages/MoviePages/Index* page through the query string.
* Input Tag Helper

Save your changes and test the filter.

## Search by genre

Update the `MoviePages/Index.cshtml.cs` page `OnGetAsync` method with the following code:

```csharp
public async Task OnGetAsync()
{
    // <snippet_search_linqQuery>
    IQueryable<string> genreQuery = from m in _context.Movie
                                    orderby m.Genre
                                    select m.Genre;
    // </snippet_search_linqQuery>

    var movies = from m in _context.Movie
                 select m;

    if (!string.IsNullOrEmpty(SearchString))
    {
        movies = movies.Where(s => s.Title.Contains(SearchString));
    }

    if (!string.IsNullOrEmpty(MovieGenre))
    {
        movies = movies.Where(x => x.Genre == MovieGenre);
    }

    // <snippet_search_selectList>
    Genres = new SelectList(await genreQuery.Distinct().ToListAsync());
    // </snippet_search_selectList>
    Movie = await movies.ToListAsync();
}
```

The following code is a LINQ query that retrieves all the genres from the database.

```csharp
IQueryable<string> genreQuery = from m in _context.Movie
                                orderby m.Genre
                                select m.Genre;
```

The `SelectList` of genres is created by projecting the distinct genres:

```csharp
Genres = new SelectList(await genreQuery.Distinct().ToListAsync());
```

### Add search by genre to the Razor Page

Update the `Index.cshtml` `<form>` element as highlighted in the following markup:

```cshtml
﻿@page
@model RazorPagesMovie.Pages.MoviePages.IndexModel

@{
    ViewData["Title"] = "Index";
}

<h1>Index</h1>

<p>
    <a asp-page="Create">Create New</a>
</p>

<form>
    <p>
        <select asp-for="MovieGenre" asp-items="Model.Genres">
            <option value="">All</option>
        </select>
        <label>Title: <input type="text" asp-for="SearchString" /></label>
        <input type="submit" value="Filter" />
    </p>
</form>
```

Test the app by searching by genre, by movie title, and by both:

## Next steps

> Previous: Update the pages
> Next: Add a new field
