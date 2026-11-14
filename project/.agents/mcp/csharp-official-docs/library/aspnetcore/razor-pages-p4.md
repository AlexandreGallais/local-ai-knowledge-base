---
title: "Razor Pages architecture and concepts in ASP.NET Core (part 4 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/razor-pages/index.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Razor Pages architecture and concepts in ASP.NET Core (part 4 of 5)

## Handle HEAD requests with an OnGet handler fallback

`HEAD` requests allow retrieving the headers for a specific resource. Unlike `GET` requests, `HEAD` requests don't return a response body.

Ordinarily, an `OnHead` handler is created and called for `HEAD` requests:

```csharp
public void OnHead()
{
    HttpContext.Response.Headers.Add("Head Test", "Handled by OnHead!");
}
```

Razor Pages falls back to calling the `OnGet` handler if no `OnHead` handler is defined.

## XSRF/CSRF and Razor Pages

Razor Pages are protected by Antiforgery validation. The FormTagHelper injects antiforgery tokens into HTML form elements.

## Using Layouts, partials, templates, and Tag Helpers with Razor Pages

Pages work with all the capabilities of the Razor view engine. Layouts, partials, templates, Tag Helpers, `_ViewStart.cshtml`, and `_ViewImports.cshtml` work in the same way they do for conventional Razor views.

Let's declutter this page by taking advantage of some of those capabilities.

Add a layout page to `Pages/Shared/_Layout.cshtml`:

```cshtml
﻿<!DOCTYPE html>
<html>
<head>
    <title>RP Sample</title>
    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.css" />
</head>
<body>
    <a asp-page="/Index">Home</a>
    <a asp-page="/Customers/Create">Create</a>
    <a asp-page="/Customers/Index">Customers</a> <br />

    @RenderBody()
    <script src="~/lib/jquery/dist/jquery.js"></script>
    <script src="~/lib/jquery-validation/dist/jquery.validate.js"></script>
    <script src="~/lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.js"></script>
</body>
</html>
```

The Layout:

* Controls the layout of each page (unless the page opts out of layout).
* Imports HTML structures such as JavaScript and stylesheets.
* The contents of the Razor page are rendered where `@RenderBody()` is called.

For more information, see layout page.

The Layout property is set in `Pages/_ViewStart.cshtml`:

```cshtml
﻿@{
    Layout = "_Layout";
}
```

The layout is in the *Pages/Shared* folder. Pages look for other views (layouts, templates, partials) hierarchically, starting in the same folder as the current page. A layout in the *Pages/Shared* folder can be used from any Razor page under the *Pages* folder.

The layout file should go in the *Pages/Shared* folder.

We recommend you **not** put the layout file in the *Views/Shared* folder. *Views/Shared* is an MVC views pattern. Razor Pages are meant to rely on folder hierarchy, not path conventions.

View search from a Razor Page includes the *Pages* folder. The layouts, templates, and partials used with MVC controllers and conventional Razor views *just work*.

Add a `Pages/_ViewImports.cshtml` file:

```cshtml
﻿@namespace RazorPagesContacts.Pages
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
```

`@namespace` is explained later in the tutorial. The `@addTagHelper` directive brings in the built-in Tag Helpers to all the pages in the *Pages* folder.

The `@namespace` directive set on a page:

```cshtml
﻿@page
@namespace RazorPagesIntro.Pages.Customers

@model NameSpaceModel

<h2>Name space</h2>
<p>
    @Model.Message
</p>
```

The `@namespace` directive sets the namespace for the page. The `@model` directive doesn't need to include the namespace.

When the `@namespace` directive is contained in `_ViewImports.cshtml`, the specified namespace supplies the prefix for the generated namespace in the Page that imports the `@namespace` directive. The rest of the generated namespace (the suffix portion) is the dot-separated relative path between the folder containing `_ViewImports.cshtml` and the folder containing the page.

For example, the `PageModel` class `Pages/Customers/Edit.cshtml.cs` explicitly sets the namespace:

```csharp
namespace RazorPagesContacts.Pages
{
    public class EditModel : PageModel
    {
        private readonly AppDbContext _db;

        public EditModel(AppDbContext db)
        {
            _db = db;
        }

        // Code removed for brevity.
```

The `Pages/_ViewImports.cshtml` file sets the following namespace:

```cshtml
﻿@namespace RazorPagesContacts.Pages
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
```

The generated namespace for the `Pages/Customers/Edit.cshtml` Razor Page is the same as the `PageModel` class.

`@namespace` *also works with conventional Razor views.*

Consider the `Pages/Customers/Create.cshtml` view file:

```cshtml
@page
@model RazorPagesContacts.Pages.Customers.CreateModel
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers

<p>Validation: customer name:</p>

<form method="post">
    <div asp-validation-summary="ModelOnly"></div>
    <span asp-validation-for="Customer!.Name"></span>
    Name:
    <input asp-for="Customer!.Name" />
    <input type="submit" />
</form>

<script src="~/lib/jquery/dist/jquery.js"></script>
<script src="~/lib/jquery-validation/dist/jquery.validate.js"></script>
<script src="~/lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.js"></script>
```

The updated `Pages/Customers/Create.cshtml` view file with `_ViewImports.cshtml` and the preceding layout file:

```cshtml
@page
@model CreateModel

<p>Enter a customer name:</p>

<form method="post">
    Name:
    <input asp-for="Customer!.Name" />
    <input type="submit" />
</form>
```

In the preceding code, the `_ViewImports.cshtml` imported the namespace and Tag Helpers. The layout file imported the JavaScript files.

The Razor Pages starter project contains the `Pages/_ValidationScriptsPartial.cshtml`, which hooks up client-side validation.

For more information on partial views, see Partial views in ASP.NET Core.

## URL generation for Pages

The `Create` page, shown previously, uses `RedirectToPage`:

```csharp
public class CreateModel : PageModel
{
    private readonly Data.CustomerDbContext _context;

    public CreateModel(Data.CustomerDbContext context)
    {
        _context = context;
    }

    public IActionResult OnGet()
    {
        return Page();
    }

    [BindProperty]
    public Customer? Customer { get; set; }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
        {
            return Page();
        }

        if (Customer != null) _context.Customer.Add(Customer);
        await _context.SaveChangesAsync();

        return RedirectToPage("./Index");
    }
}
```

The app has the following file/folder structure:

* */Pages*

  * `Index.cshtml`
  * `Privacy.cshtml`
  * */Customers*

    * `Create.cshtml`
    * `Edit.cshtml`
    * `Index.cshtml`

The `Pages/Customers/Create.cshtml` and `Pages/Customers/Edit.cshtml` pages redirect to `Pages/Customers/Index.cshtml` after success. The string `./Index` is a relative page name used to access the preceding page. It is used to generate URLs to the `Pages/Customers/Index.cshtml` page. For example:

* `Url.Page("./Index", ...)`
* `Customers Index Page`
* `RedirectToPage("./Index")`

The absolute page name `/Index` is used to generate URLs to the `Pages/Index.cshtml` page. For example:

* `Url.Page("/Index", ...)`
* `Home Index Page`
* `RedirectToPage("/Index")`

The page name is the path to the page from the root */Pages* folder including a leading `/` (for example, `/Index`). The preceding URL generation samples offer enhanced options and functional capabilities over hard-coding a URL. URL generation uses routing and can generate and encode parameters according to how the route is defined in the destination path.

URL generation for pages supports relative names. The following table shows which Index page is selected using different `RedirectToPage` parameters in `Pages/Customers/Create.cshtml`.

| RedirectToPage(x)| Page |
| ----------------- | ------------ |
| RedirectToPage("/Index") | *Pages/Index* |
| RedirectToPage("./Index"); | *Pages/Customers/Index* |
| RedirectToPage("../Index") | *Pages/Index* |
| RedirectToPage("Index")  | *Pages/Customers/Index* |

`RedirectToPage("Index")`, `RedirectToPage("./Index")`, and `RedirectToPage("../Index")` are *relative names*. The `RedirectToPage` parameter is *combined* with the path of the current page to compute the name of the destination page.

Relative name linking is useful when building sites with a complex structure. When relative names are used to link between pages in a folder:

* Renaming a folder doesn't break the relative links.
* Links are not broken because they don't include the folder name.

To redirect to a page in a different Area, specify the area:

```csharp
RedirectToPage("/Index", new { area = "Services" });
```

For more information, see Areas in ASP.NET Core and Razor Pages route and app conventions in ASP.NET Core.

## ViewData attribute

Data can be passed to a page with `Microsoft.AspNetCore.Mvc.ViewDataAttribute`. Properties with the `[ViewData]` attribute have their values stored and loaded from the `Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary`.

In the following example, the `AboutModel` applies the `[ViewData]` attribute to the `Title` property:

```csharp
public class AboutModel : PageModel
{
    [ViewData]
    public string Title { get; } = "About";

    public void OnGet()
    {
    }
}
```

In the About page, access the `Title` property as a model property:

```cshtml
<h1>@Model.Title</h1>
```

In the layout, the title is read from the ViewData dictionary:

```cshtml
<!DOCTYPE html>
<html lang="en">
<head>
    <title>@ViewData["Title"] - WebApplication</title>
    ...
```

## TempData

ASP.NET Core exposes the `Microsoft.AspNetCore.Mvc.Controller.TempData`. This property stores data until it's read. The `Microsoft.AspNetCore.Mvc.ViewFeatures.TempDataDictionary.Keep*` and `Microsoft.AspNetCore.Mvc.ViewFeatures.TempDataDictionary.Peek*` methods can be used to examine the data without deletion. `TempData` is useful for redirection, when data is needed for more than a single request.

The following code sets the value of `Message` using `TempData`:

```csharp
public class CreateDotModel : PageModel
{
    private readonly AppDbContext _db;

    public CreateDotModel(AppDbContext db)
    {
        _db = db;
    }

    [TempData]
    public string Message { get; set; }

    [BindProperty]
    public Customer Customer { get; set; }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
        {
            return Page();
        }

        _db.Customers.Add(Customer);
        await _db.SaveChangesAsync();
        Message = $"Customer {Customer.Name} added";
        return RedirectToPage("./Index");
    }
}
```

The following markup in the `Pages/Customers/Index.cshtml` file displays the value of `Message` using `TempData`.

```cshtml
<h3>Msg: @Model.Message</h3>
```

The `Pages/Customers/Index.cshtml.cs` page model applies the `[TempData]` attribute to the `Message` property.

```csharp
[TempData]
public string Message { get; set; }
```

For more information, see TempData.

## Multiple handlers per page

The following page generates markup for two handlers using the `asp-page-handler` Tag Helper:

```cshtml
﻿@page
@model CreateFATHModel

<html>
<body>
    <p>
        Enter your name.
    </p>
    <div asp-validation-summary="All"></div>
    <form method="POST">
        <div><label>Name: <input asp-for="Customer.Name" /></label></div>
        <input type="submit" asp-page-handler="JoinList" value="Join" />
        <input type="submit" asp-page-handler="JoinListUC" value="JOIN UC" />
    </form>
</body>
</html>
```

The form in the preceding example has two submit buttons, each using the `FormActionTagHelper` to submit to a different URL. The `asp-page-handler` attribute is a companion to `asp-page`. `asp-page-handler` generates URLs that submit to each of the handler methods defined by a page. `asp-page` isn't specified because the sample is linking to the current page.

The page model:

```csharp
﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using RazorPagesContacts.Data;

namespace RazorPagesContacts.Pages.Customers
{
    public class CreateFATHModel : PageModel
    {
        private readonly AppDbContext _db;

        public CreateFATHModel(AppDbContext db)
        {
            _db = db;
        }

        [BindProperty]
        public Customer Customer { get; set; }

        public async Task<IActionResult> OnPostJoinListAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _db.Customers.Add(Customer);
            await _db.SaveChangesAsync();
            return RedirectToPage("/Index");
        }

        public async Task<IActionResult> OnPostJoinListUCAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }
            Customer.Name = Customer.Name?.ToUpperInvariant();
            return await OnPostJoinListAsync();
        }
    }
}
```

The preceding code uses *named handler methods*. Named handler methods are created by taking the text in the name after `On<HTTP Verb>` and before `Async` (if present). In the preceding example, the page methods are OnPost**JoinList**Async and OnPost**JoinListUC**Async. With *OnPost* and *Async* removed, the handler names are `JoinList` and `JoinListUC`.

```cshtml
<input type="submit" asp-page-handler="JoinList" value="Join" />
<input type="submit" asp-page-handler="JoinListUC" value="JOIN UC" />
```

Using the preceding code, the URL path that submits to `OnPostJoinListAsync` is `https://localhost:5001/Customers/CreateFATH?handler=JoinList`. The URL path that submits to `OnPostJoinListUCAsync` is `https://localhost:5001/Customers/CreateFATH?handler=JoinListUC`.
