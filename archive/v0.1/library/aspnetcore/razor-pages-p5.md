---
title: "Razor Pages architecture and concepts in ASP.NET Core (part 5 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/razor-pages/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Razor Pages architecture and concepts in ASP.NET Core (part 5 of 5)

## Custom routes

Use the `@page` directive to:

* Specify a custom route to a page. For example, the route to the About page can be set to `/Some/Other/Path` with `@page "/Some/Other/Path"`.
* Append segments to a page's default route. For example, an "item" segment can be added to a page's default route with `@page "item"`.
* Append parameters to a page's default route. For example, an ID parameter, `id`, can be required for a page with `@page "{id}"`.

A root-relative path designated by a tilde (`~`) at the beginning of the path is supported. For example, `@page "~/Some/Other/Path"` is the same as `@page "/Some/Other/Path"`.

If you don't like the query string `?handler=JoinList` in the URL, change the route to put the handler name in the path portion of the URL. The route can be customized by adding a route template enclosed in double quotes after the `@page` directive.

```cshtml
﻿@page "{handler?}"
@model CreateRouteModel

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

Using the preceding code, the URL path that submits to `OnPostJoinListAsync` is `https://localhost:5001/Customers/CreateFATH/JoinList`. The URL path that submits to `OnPostJoinListUCAsync` is `https://localhost:5001/Customers/CreateFATH/JoinListUC`.

The `?` following `handler` means the route parameter is optional.

## Collocation of JavaScript (JS) files

Collocation of JavaScript (JS) files for pages and views is a convenient way to organize scripts in an app.

Collocate JS files using the following filename extension conventions:

* Pages of Razor Pages apps and views of MVC apps: `.cshtml.js`. Examples:
  * `Pages/Index.cshtml.js` for the `Index` page of a Razor Pages app at `Pages/Index.cshtml`.
  * `Views/Home/Index.cshtml.js` for the `Index` view of an MVC app at `Views/Home/Index.cshtml`.

Collocated JS files are publicly addressable using the ***path to the file in the project***:

* Pages and views from a collocated scripts file in the app:

  `{PATH}/{PAGE, VIEW, OR COMPONENT}.{EXTENSION}.js`

  * The `{PATH}` placeholder is the path to the page, view, or component.
  * The `{PAGE, VIEW, OR COMPONENT}` placeholder is the page, view, or component.
  * The `{EXTENSION}` placeholder matches the extension of the page, view, or component, either `razor` or `cshtml`.

  Razor Pages example:

  A JS file for the `Index` page is placed in the `Pages` folder (`Pages/Index.cshtml.js`) next to the `Index` page (`Pages/Index.cshtml`). In the `Index` page, the script is referenced at the path in the `Pages` folder:

  ```razor
  @section Scripts {
    <script src="~/Pages/Index.cshtml.js"></script>
  }
  ```

The default layout `Pages/Shared/_Layout.cshtml` can be configured to include collocated JS files, eliminating the need to configure each page individually:

```razor
<script asp-src-include="@(ViewContext.View.Path).js"></script>
```
The sample download uses the preceding code snippet to include collocated JS files in the default layout.

  When the app is published, the framework automatically moves the script to the web root. In the preceding example, the script is moved to `bin\Release\{TARGET FRAMEWORK MONIKER}\publish\wwwroot\Pages\Index.cshtml.js`, where the `{TARGET FRAMEWORK MONIKER}` placeholder is the Target Framework Moniker (TFM). No change is required to the script's relative URL in the `Index` page.

  When the app is published, the framework automatically moves the script to the web root. In the preceding example, the script is moved to `bin\Release\{TARGET FRAMEWORK MONIKER}\publish\wwwroot\Components\Pages\Index.razor.js`, where the `{TARGET FRAMEWORK MONIKER}` placeholder is the Target Framework Moniker (TFM). No change is required to the script's relative URL in the `Index` component.

* For scripts provided by a Razor class library (RCL):

  `_content/{PACKAGE ID}/{PATH}/{PAGE, VIEW, OR COMPONENT}.{EXTENSION}.js`

  * The `{PACKAGE ID}` placeholder is the RCL's package identifier (or library name for a class library referenced by the app).
  * The `{PATH}` placeholder is the path to the page, view, or component. If a Razor component is located at the root of the RCL, the path segment isn't included.
  * The `{PAGE, VIEW, OR COMPONENT}` placeholder is the page, view, or component.
  * The `{EXTENSION}` placeholder matches the extension of page, view, or component, either `razor` or `cshtml`.

## Advanced configuration and settings

The configuration and settings in following sections is not required by most apps.

To configure advanced options, use the `Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddRazorPages*` overload that configures `Microsoft.AspNetCore.Mvc.RazorPages.RazorPagesOptions`:
```csharp
using Microsoft.EntityFrameworkCore;
using RazorPagesContacts.Data;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages(options =>
{
    options.RootDirectory = "/MyPages";
    options.Conventions.AuthorizeFolder("/MyPages/Admin");
});

builder.Services.AddDbContext<CustomerDbContext>(options =>
    options.UseInMemoryDatabase("name"));

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

Use the `Microsoft.AspNetCore.Mvc.RazorPages.RazorPagesOptions` to set the root directory for pages, or add application model conventions for pages. For more information on conventions, see Razor Pages authorization conventions.

To precompile views, see Razor view compilation.

### Specify that Razor Pages are at the content root

By default, Razor Pages are rooted in the */Pages* directory. Add `Microsoft.Extensions.DependencyInjection.MvcRazorPagesMvcBuilderExtensions.WithRazorPagesAtContentRoot*` to specify that your Razor Pages are at the content root (`Microsoft.AspNetCore.Hosting.IHostingEnvironment.ContentRootPath`) of the app:

```csharp
using Microsoft.EntityFrameworkCore;
using RazorPagesContacts.Data;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages(options =>
{
    options.Conventions.AuthorizeFolder("/MyPages/Admin");
})
  .WithRazorPagesAtContentRoot();

builder.Services.AddDbContext<CustomerDbContext>(options =>
    options.UseInMemoryDatabase("name"));

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

### Specify that Razor Pages are at a custom root directory

Add `Microsoft.Extensions.DependencyInjection.MvcRazorPagesMvcCoreBuilderExtensions.WithRazorPagesRoot*` to specify that Razor Pages are at a custom root directory in the app (provide a relative path):

```csharp
using Microsoft.EntityFrameworkCore;
using RazorPagesContacts.Data;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages(options =>
{
    options.Conventions.AuthorizeFolder("/MyPages/Admin");
})
  .WithRazorPagesRoot("/path/to/razor/pages");

builder.Services.AddDbContext<CustomerDbContext>(options =>
    options.UseInMemoryDatabase("name"));

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

## Related content

* See Get started with Razor Pages, which builds on this introduction.
* `[Authorize]` attribute in Razor Pages apps
* Download or view sample code
* Overview of ASP.NET Core
* Razor syntax reference for ASP.NET Core
* Areas in ASP.NET Core
* Tutorial: Get started with Razor Pages in ASP.NET Core
* Razor Pages authorization conventions in ASP.NET Core
* Razor Pages route and app conventions in ASP.NET Core
* Razor Pages unit tests in ASP.NET Core
* Partial views in ASP.NET Core
