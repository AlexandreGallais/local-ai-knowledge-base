---
title: "Areas in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/mvc/controllers/areas.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Areas in ASP.NET Core

By Dhananjay Kumar and Rick Anderson

Areas are an ASP.NET feature used to organize related functionality into a group as a separate:

* Namespace for routing.
* Folder structure for views and Razor Pages.

Using areas creates a hierarchy for the purpose of routing by adding another route parameter, `area`, to `controller` and `action` or a Razor Page `page`.

Areas provide a way to partition an ASP.NET Core Web app into smaller functional groups, each  with its own set of Razor Pages, controllers, views, and models. An area is effectively a structure inside an app. In an ASP.NET Core web project, logical components like Pages, Model, Controller, and View are kept in different folders. The ASP.NET Core runtime uses naming conventions to create the relationship between these components. For a large app, it may be advantageous to partition the app into separate high level areas of functionality. For instance, an e-commerce app with multiple business units, such as checkout, billing, and search. Each of these units have their own area to contain views, controllers, Razor Pages, and models.

Consider using Areas in a project when:

* The app is made of multiple high-level functional components that can be logically separated.
* You want to partition the app so that each functional area can be worked on independently.

If you're using Razor Pages, see Areas with Razor Pages in this document.

## Areas for controllers with views

A typical ASP.NET Core web app using areas, controllers, and views contains the following:

* An Area folder structure.
* Controllers with the `[Area]` attribute to associate the controller with the area:

  ```csharp
[Area("Products")]
public class ManageController : Controller
{
```

* The area route added to `Program.cs`:

  ```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "MyArea",
    pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
```

### Area folder structure

Consider an app that has two logical groups, *Products* and *Services*. Using areas, the folder structure would be similar to the following:

* Project name
  * Areas
    * Products
      * Controllers
        * HomeController.cs
        * ManageController.cs
      * Views
        * Home
          * Index.cshtml
        * Manage
          * Index.cshtml
          * About.cshtml
    * Services
      * Controllers
        * HomeController.cs
      * Views
        * Home
          * Index.cshtml

While the preceding layout is typical when using Areas, only the view files are required to use this folder structure. View discovery searches for a matching area view file in the following order:

```text
/Areas/<Area-Name>/Views/<Controller-Name>/<Action-Name>.cshtml
/Areas/<Area-Name>/Views/Shared/<Action-Name>.cshtml
/Views/Shared/<Action-Name>.cshtml
/Pages/Shared/<Action-Name>.cshtml
```

### Associate the controller with an Area

Area controllers are designated with the `[Area]` attribute:

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.Docs.Samples;

namespace MVCareas.Areas.Products.Controllers;

[Area("Products")]
public class ManageController : Controller
{
```

### Add Area route

Area routes typically use  conventional routing rather than attribute routing. Conventional routing is order-dependent. In general, routes with areas should be placed earlier in the route table as they're more specific than routes without an area.

`{area:...}` can be used as a token in route templates if url space is uniform across all areas:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "MyArea",
    pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
```

In the preceding code, `exists` applies a constraint that the route must match an area. Using `{area:...}` with `MapControllerRoute`:

* Is the least complicated mechanism to adding routing to areas.
* Matches all controllers with the `[Area("Area name")]` attribute.

The following code uses `Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapAreaControllerRoute*` to create two named area routes:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapAreaControllerRoute(
    name: "MyAreaProducts",
    areaName: "Products",
    pattern: "Products/{controller=Home}/{action=Index}/{id?}");

app.MapAreaControllerRoute(
    name: "MyAreaServices",
    areaName: "Services",
    pattern: "Services/{controller=Home}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
```

For more information, see Area routing.

### Link generation with MVC areas

The following code from the sample download shows link generation with the area specified:

```cshtml
<li>Anchor Tag Helper links</li>
<ul>
    <li>
        <a asp-area="Products" asp-controller="Home" asp-action="About">
            Products/Home/About
        </a>
    </li>
    <li>
        <a asp-area="Services" asp-controller="Home" asp-action="About">
            Services About
        </a>
    </li>
    <li>
        <a asp-area="" asp-controller="Home" asp-action="About">
            /Home/About
        </a>
    </li>
</ul>
<li>Html.ActionLink generated links</li>
<ul>
    <li>
        @Html.ActionLink("Product/Manage/About", "About", "Manage",
                                                new { area = "Products" })
    </li>
</ul>
<li>Url.Action generated links</li>
<ul>
    <li>
        <a href='@Url.Action("About", "Manage", new { area = "Products" })'>
            Products/Manage/About
        </a>
    </li>
</ul>
```

The sample download includes a partial view that contains:

* The preceding links.
* Links similar to the preceding except `area` is not specified.

The partial view is referenced in the layout file, so every page in the app displays the generated links. The links generated without specifying the area are only valid when referenced from a page in the same area and controller.

When the area or controller is not specified, routing depends on the ambient values. The current route values of the current request are considered ambient values for link generation. In many cases for the sample app, using the ambient values generates incorrect links with the markup that doesn't specify the area.

For more information, see Routing to controller actions.

### Shared layout for Areas using the _ViewStart.cshtml file

To share a common layout for the entire app, keep the *_ViewStart.cshtml* in the application root folder. For more information, see Layout in ASP.NET Core

### Application root folder

The application root folder is the folder containing the `Program.cs` file in a web app created with the ASP.NET Core templates.

### _ViewImports.cshtml

 */Views/_ViewImports.cshtml*, for MVC, and */Pages/_ViewImports.cshtml* for Razor Pages, is not imported to views in areas. Use one of the following approaches to provide view imports to all views:

* Add *_ViewImports.cshtml* to the application root folder. A *_ViewImports.cshtml* in the application root folder will apply to all views in the app.
* Copy the *_ViewImports.cshtml* file to the appropriate view folder under areas. For example, a Razor Pages app created with individual accounts has a *_ViewImports.cshtml* file in the following folders:
  * */Areas/Identity/Pages/_ViewImports.cshtml*
  * */Pages/_ViewImports.cshtml*

The *_ViewImports.cshtml* file typically contains Tag Helpers imports, `@using`, and `@inject` statements. For more information, see Importing Shared Directives.

### Change default area folder where views are stored

The following code changes the default area folder from `"Areas"` to `"MyAreas"`:

```csharp
using Microsoft.AspNetCore.Mvc.Razor;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<RazorViewEngineOptions>(options =>
{
    options.AreaViewLocationFormats.Clear();
    options.AreaViewLocationFormats.Add("/MyAreas/{2}/Views/{1}/{0}.cshtml");
    options.AreaViewLocationFormats.Add("/MyAreas/{2}/Views/Shared/{0}.cshtml");
    options.AreaViewLocationFormats.Add("/Views/Shared/{0}.cshtml");
});

builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "MyArea",
    pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
```

## Areas with Razor Pages

Areas with Razor Pages require an `Areas/<area name>/Pages` folder in the root of the app. The following folder structure is used with the sample app:

* Project name
  * Areas
    * Products
      * Pages
        * _ViewImports
        * About
        * Index
    * Services
      * Pages
        * Manage
          * About
          * Index

### Link generation with Razor Pages and areas

The following code from the sample download shows link generation with the area specified (for example, `asp-area="Products"`):

```cshtml
<li>Anchor Tag Helper links</li>
<ul>
    <li>
        <a asp-area="Products" asp-page="/About">
            Products/About
        </a>
    </li>
    <li>
        <a asp-area="Services" asp-page="/Manage/About">
            Services/Manage/About
        </a>
    </li>
    <li>
        <a asp-area="" asp-page="/About">
            /About
        </a>
    </li>
</ul>
<li>Url.Page generated links</li>
<ul>
    <li>
        <a href='@Url.Page("/Manage/About", new { area = "Services" })'>
            Services/Manage/About
        </a>
    </li>
    <li>
        <a href='@Url.Page("/About", new { area = "Products" })'>
            Products/About
        </a>
    </li>
</ul>
```

The sample download includes a partial view that contains the preceding links and the same links without specifying the area. The partial view is referenced in the layout file, so every page in the app displays the generated links. The links generated without specifying the area are only valid when referenced from a page in the same area.

When the area is not specified, routing depends on the *ambient* values. The current route values of the current request are considered ambient values for link generation. In many cases for the sample app, using the ambient values generates incorrect links. For example, consider the links generated from the following code:

```cshtml
<li>
    <a asp-page="/Manage/About">
        Services/Manage/About
    </a>
</li>
<li>
    <a asp-page="/About">
        /About
    </a>
</li>
```

For the preceding code:

* The link generated from `` is correct only when the last request was for a page in `Services` area. For example, `/Services/Manage/`, `/Services/Manage/Index`, or `/Services/Manage/About`.
* The link generated from `` is correct only when the last request was for a page in `/Home`.
* The code is from the sample download.

### Import namespace and Tag Helpers with _ViewImports file

A *_ViewImports.cshtml* file can be added to each area *Pages* folder to import the namespace and Tag Helpers to each Razor Page in the folder.

Consider the *Services* area of the sample code, which doesn't contain a *_ViewImports.cshtml* file. The following markup shows the */Services/Manage/About* Razor Page:

```cshtml
@page
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@model RPareas.Areas.Services.Pages.Manage.AboutModel
@{
    ViewData["Title"] = "Srv Mng About";
}

<div>
  ViewData["routeInfo"]:  @ViewData["routeInfo"]
</div>

<a asp-area="Products" asp-page="/Index">
    Products/Index
</a>
```

In the preceding markup:

* The fully qualified class name must be used to specify the model (`@model RPareas.Areas.Services.Pages.Manage.AboutModel`).
* Tag Helpers are enabled by `@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers`

In the sample download, the Products area contains the following *_ViewImports.cshtml* file:

```cshtml
﻿@namespace RPareas.Areas.Products.Pages
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
```

The following markup shows the */Products/About* Razor Page:

```cshtml
﻿@page
@model AboutModel
@{
    ViewData["Title"] = "Prod About";
}
```

In the preceding file, the namespace and `@addTagHelper` directive is imported to the file by the *Areas/Products/Pages/_ViewImports.cshtml* file.

For more information, see Managing Tag Helper scope and Importing Shared Directives.

### Shared layout for Razor Pages Areas

To share a common layout for the entire app, move the *_ViewStart.cshtml* to the application root folder.

### Publishing Areas

All *.cshtml files and files within the *wwwroot* directory are published to output when `<Project Sdk="Microsoft.NET.Sdk.Web">` is included in the *.csproj file.

## Add MVC Area with Visual Studio

In Solution Explorer, right click the project and select **ADD > New Scaffolded Item**, then select **MVC Area**.

## Related content

* View or download sample code (how to download). The download sample provides a basic app for testing areas.
* MyDisplayRouteInfo and ToCtxString are provided by the Rick.Docs.Samples.RouteInfo NuGet package. The methods display `Controller` and `Razor Page` route information.
