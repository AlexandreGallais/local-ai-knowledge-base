---
title: "Part 3, scaffolded Razor Pages"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/tutorials/razor-pages/page.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Part 3, scaffolded Razor Pages in ASP.NET Core

-->
-->

By Rick Anderson

This tutorial examines the Razor Pages created by scaffolding in the previous tutorial.

## The Create, Delete, Details, and Edit pages

Examine the `Pages/MoviePages/Index.cshtml.cs` Page Model:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using RazorPagesMovie.Models;

namespace RazorPagesMovie.Pages.MoviePages
{
    public class IndexModel : PageModel
    {
        private readonly RazorPagesMovieContext _context;

        public IndexModel(RazorPagesMovieContext context)
        {
            _context = context;
        }

        public IList<Movie> Movie { get;set; } = default!;

        public async Task OnGetAsync()
        {
            Movie = await _context.Movie.ToListAsync();
        }
    }
}
```

Razor Pages derive from `Microsoft.AspNetCore.Mvc.RazorPages.PageModel`. By convention, the `PageModel` derived class is named `PageNameModel`. For example, the Index page is named `IndexModel`.

The constructor uses dependency injection to add the `RazorPagesMovieContext` to the page:

```csharp
public class IndexModel : PageModel
{
    private readonly RazorPagesMovieContext _context;

    public IndexModel(RazorPagesMovieContext context)
    {
        _context = context;
    }
```

For more information on asynchronous programming with Entity Framework, see Asynchronous code.

When a `GET` request is made for the page, the `OnGetAsync` method returns a list of movies to the Razor Page. On a Razor Page, `OnGetAsync` or `OnGet` is called to initialize the state of the page. In this case, `OnGetAsync` gets a list of movies and displays them.

When `OnGet` returns `void` or `OnGetAsync` returns `Task`, don't use a return statement. For example, examine the Privacy Page:

```csharp
﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RazorPagesMovie.Pages
{
    public class PrivacyModel : PageModel
    {
        private readonly ILogger<PrivacyModel> _logger;

        public PrivacyModel(ILogger<PrivacyModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }

}
```

When the return type is `Microsoft.AspNetCore.Mvc.IActionResult` or `Task<IActionResult>`, you must provide a return statement. For example, the `Pages/MoviePages/Create.cshtml.cs OnPostAsync` method:

```csharp
public async Task<IActionResult> OnPostAsync()
{
    if (!ModelState.IsValid)
    {
        return Page();
    }

    _context.Movie.Add(Movie);
    await _context.SaveChangesAsync();

    return RedirectToPage("./Index");
}
```

Examine the `Pages/MoviePages/Index.cshtml` Razor Page:

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
<table class="table">
    <thead>
        <tr>
            <th>
                @Html.DisplayNameFor(model => model.Movie[0].Title)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Movie[0].ReleaseDate)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Movie[0].Genre)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Movie[0].Price)
            </th>
            <th></th>
        </tr>
    </thead>
    <tbody>
@foreach (var item in Model.Movie) {
        <tr>
            <td>
                @Html.DisplayFor(modelItem => item.Title)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.ReleaseDate)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.Genre)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.Price)
            </td>
            <td>
                <a asp-page="./Edit" asp-route-id="@item.Id">Edit</a> |
                <a asp-page="./Details" asp-route-id="@item.Id">Details</a> |
                <a asp-page="./Delete" asp-route-id="@item.Id">Delete</a>
            </td>
        </tr>
}
    </tbody>
</table>
```

Razor can transition from HTML into C# or into Razor-specific markup. When an `@` symbol is followed by a Razor reserved keyword, it transitions into Razor-specific markup. Otherwise, it transitions into C#.

### The @page directive

The `@page` Razor directive makes the file an MVC action, which means that it can handle requests. `@page` must be the first Razor directive on a page. `@page` and `@model` are examples of transitioning into Razor-specific markup. For more information, see Razor syntax.

### The @model directive

```cshtml
﻿@page
@model RazorPagesMovie.Pages.MoviePages.IndexModel
```

The `@model` directive specifies the type of the model passed to the Razor Page. In the preceding example, the `@model` line makes the `PageModel` derived class available to the Razor Page. The model is used in the `@Html.DisplayNameFor` and `@Html.DisplayFor` HTML Helpers on the page.

Examine the lambda expression used in the following HTML Helper:

```cshtml
@Html.DisplayNameFor(model => model.Movie[0].Title)
```

The `Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper`1.DisplayNameFor*` HTML Helper inspects the `Title` property referenced in the lambda expression to determine the display name. The lambda expression is inspected rather than evaluated. That means there's no access violation when `model`, `model.Movie`, or `model.Movie[0]` is `null` or empty. When the lambda expression is evaluated, for example, by using `@Html.DisplayFor(modelItem => item.Title)`, the model's property values are evaluated.

### The layout page

Select the menu links **RazorPagesMovie**, **Home**, and **Privacy**. Each page shows the same menu layout. The `Pages/Shared/_Layout.cshtml` file implements the menu layout.

Open and examine the `Pages/Shared/_Layout.cshtml` file.

Layout templates let you:

* Specify the HTML container layout in one place.
* Apply the layout to multiple pages in the site.

Find the `@RenderBody()` line. `RenderBody` is a placeholder where all the page-specific views appear, *wrapped* in the layout page. For example, when you select the **Privacy** link, the `Pages/Privacy.cshtml` view renders inside the `RenderBody` method.

### ViewData and layout

Consider the following markup from the `Pages/MoviePages/Index.cshtml` file:

```cshtml
﻿@page
@model RazorPagesMovie.Pages.MoviePages.IndexModel

@{
    ViewData["Title"] = "Index";
}
```

The preceding highlighted markup is an example of Razor transitioning into C#. The `{` and `}` characters enclose a block of C# code.

The `PageModel` base class contains a `ViewData` dictionary property that you can use to pass data to a view. Add objects to the `ViewData` dictionary by using a ***key value*** pattern. In the preceding sample, the `Title` property is added to the `ViewData` dictionary.

The `Title` property is used in the `Pages/Shared/_Layout.cshtml` file. The following markup shows the first few lines of the `_Layout.cshtml` file.

```cshtml
﻿<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - RazorPagesMovie</title>
    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.css" />
    <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
    <link rel="stylesheet" href="~/RazorPagesMovie.styles.css" asp-append-version="true" />
```

### Update the layout

1. Change the `<title>` element in the `Pages/Shared/_Layout.cshtml` file to display **Movie** rather than **RazorPagesMovie**.
   ```cshtml
﻿<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - Movie</title>
```

1. Find the following anchor element in the `Pages/Shared/_Layout.cshtml` file.

   ```cshtml
   <a class="navbar-brand" asp-area="" asp-page="/Index">RazorPagesMovie</a>
   ```

1. Replace the preceding element with the following markup:

   ```cshtml
   <a class="navbar-brand" asp-page="/MoviePages/Index">RpMovie</a>
   ```

   The preceding anchor element is a Tag Helper. In this case, it's the Anchor Tag Helper. The `asp-page="/MoviePages/Index"` Tag Helper attribute and value creates a link to the `/MoviePages/Index` Razor Page. The `asp-area` attribute value is empty, so the area isn't used in the link. See Areas for more information.

1. Save the changes and test the app by selecting the **RpMovie** link. See the _Layout.cshtml file in GitHub if you have any problems.

1. Test the **Home**, **RpMovie**, **Create**, **Edit**, and **Delete** links. Each page sets the title, which you can see in the browser tab. When you bookmark a page, the title is used for the bookmark.

> **Note:**
> You may not be able to enter decimal commas in the `Price` field. To support jQuery validation for non-English locales that use a comma (",") for a decimal point, and non US-English date formats, you must take steps to globalize the app. See this GitHub issue 4076 for instructions on adding decimal comma.

The `Layout` property is set in the `Pages/_ViewStart.cshtml` file:

```cshtml
﻿@{
    Layout = "_Layout";
}
```

The preceding markup sets the layout file to `Pages/Shared/_Layout.cshtml` for all Razor files under the *Pages* folder. See Layout for more information.

### The Create page model

Examine the `Pages/MoviePages/Create.cshtml.cs` page model:

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using RazorPagesMovie.Models;

namespace RazorPagesMovie.Pages.MoviePages;

public class CreateModel : PageModel
{
    private readonly RazorPagesMovieContext _context;

    public CreateModel(RazorPagesMovieContext context)
    {
        _context = context;
    }

    public IActionResult OnGet()
    {
        return Page();
    }

    [BindProperty]
    public Movie Movie { get; set; } = default!;

    // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD.
    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
        {
            return Page();
        }

        _context.Movie.Add(Movie);
        await _context.SaveChangesAsync();

        return RedirectToPage("./Index");
    }
}
```

The `OnGet` method initializes any state needed for the page. The Create page doesn't have any state to initialize, so `Page` is returned. Later in the tutorial, an example of `OnGet` initializing state is shown. The `Page` method creates a `PageResult` object that renders the `Create.cshtml` page.

The `Movie` property uses the [BindProperty] attribute to opt-in to model binding. When the Create form posts the form values, the ASP.NET Core runtime binds the posted values to the `Movie` model.

The `OnPostAsync` method runs when the page posts form data:

```csharp
public async Task<IActionResult> OnPostAsync()
{
    if (!ModelState.IsValid)
    {
        return Page();
    }

    _context.Movie.Add(Movie);
    await _context.SaveChangesAsync();

    return RedirectToPage("./Index");
}
```

If there are any model errors, the form is redisplayed, along with any form data posted. Most model errors are caught on the client before the form is posted. An example of a model error is posting a value for the date field that can't be converted to a date. Client-side validation and model validation are discussed later in the tutorial.

If there are no model errors:

* The data is saved.
* The browser is redirected to the Index page.

### The Create Razor Page

Examine the `Pages/MoviePages/Create.cshtml` Razor Page file:

```cshtml
﻿@page
@model RazorPagesMovie.Pages.MoviePages.CreateModel

@{
    ViewData["Title"] = "Create";
}

<h1>Create</h1>

<h4>Movie</h4>
<hr />
<div class="row">
    <div class="col-md-4">
        <form method="post">
            <div asp-validation-summary="ModelOnly" class="text-danger"></div>
            <div class="form-group">
                <label asp-for="Movie.Title" class="control-label"></label>
                <input asp-for="Movie.Title" class="form-control" />
                <span asp-validation-for="Movie.Title" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="Movie.ReleaseDate" class="control-label"></label>
                <input asp-for="Movie.ReleaseDate" class="form-control" />
                <span asp-validation-for="Movie.ReleaseDate" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="Movie.Genre" class="control-label"></label>
                <input asp-for="Movie.Genre" class="form-control" />
                <span asp-validation-for="Movie.Genre" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="Movie.Price" class="control-label"></label>
                <input asp-for="Movie.Price" class="form-control" />
                <span asp-validation-for="Movie.Price" class="text-danger"></span>
            </div>
            <div class="form-group">
                <input type="submit" value="Create" class="btn btn-primary" />
            </div>
        </form>
    </div>
</div>

<div>
    <a asp-page="Index">Back to List</a>
</div>

@section Scripts {
    @{await Html.RenderPartialAsync("_ValidationScriptsPartial");}
}
```

# Visual Studio

Visual Studio displays the following tags in a distinctive bold font used for Tag Helpers:

* `<form method="post">`
* ``
* ``
* ``
* ``

---

The `<form method="post">` element is a Form Tag Helper. The Form Tag Helper automatically includes an antiforgery token.

The scaffolding engine creates Razor markup for each field in the model, except the ID, similar to the following code:

```cshtml
<div asp-validation-summary="ModelOnly" class="text-danger"></div>
<div class="form-group">
    <label asp-for="Movie.Title" class="control-label"></label>
    <input asp-for="Movie.Title" class="form-control" />
    <span asp-validation-for="Movie.Title" class="text-danger"></span>
</div>
```

The Validation Tag Helpers (``) generates the label caption and `[for]` attribute for the `Title` property.

The Input Tag Helper (``) uses the DataAnnotations attributes and produces HTML attributes needed for jQuery Validation on the client side.

For more information on Tag Helpers such as `<form method="post">`, see Tag Helpers in ASP.NET Core.

## Next steps

> Previous: Add a model
> Next: Work with a database
