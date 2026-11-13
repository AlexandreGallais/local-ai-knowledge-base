---
title: "Learn to upgrade from ASP.NET MVC and Web API to ASP.NET Core MVC"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/migration/fx-to-core/examples/overview.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Upgrade from ASP.NET MVC and Web API to ASP.NET Core MVC

This article shows how to start migrating an ASP.NET MVC project to ASP.NET Core MVC. In the process, it highlights related changes from ASP.NET MVC.

Migrating from ASP.NET MVC is a multi-step process. This article covers:

* Initial setup.
* Basic <example-value> and views.
* Static content.
* Client-side dependencies.

For migrating configuration and Identity code, see Migrate configuration to ASP.NET Core and Migrate Authentication and Identity to ASP.NET Core.

## Prerequisites

* Visual Studio 2019 16.4 or later with the **ASP.NET and web development** workload
* .NET Core 3.1 SDK

## Create the starter ASP.NET MVC project

Create an example ASP.NET MVC project in Visual Studio to migrate:

1. From the **File** menu, select **New** > **Project**.
1. Select **ASP.NET Web Application (.NET Framework)** and then select **Next**.
1. Name the project *WebApp1* so the namespace matches the ASP.NET Core project created in the next step. Select **Create**.
1. Select **MVC**, and then select **Create**.

## Create the ASP.NET Core project

Create a new solution with a new ASP.NET Core project to migrate to:

1. Launch a second instance of Visual Studio.
1. From the **File** menu, select **New** > **Project**.
1. Select **ASP.NET Core Web Application** and then select **Next**.
1. In the **Configure your new project** dialog, Name the project *WebApp1*.
1. Set the location to a different directory than the previous project to use the same project name. Using the same namespace makes it easier to copy code between the two projects. Select **Create**.
1. In the **Create a new ASP.NET Core Web Application** dialog, confirm that **.NET Core** and **ASP.NET Core 3.1** are selected. Select the **Web Application (Model-View-Controller)** project template, and select **Create**.

## Configure the ASP.NET Core site to use MVC

In ASP.NET Core 3.0 or later projects, .NET Framework is no longer a supported target framework. Your project must target .NET Core. The ASP.NET Core shared framework, which includes MVC, is part of the .NET Core runtime installation. The shared framework is automatically referenced when using the `Microsoft.NET.Sdk.Web` SDK in the project file:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
```

For more information, see Framework reference.

In ASP.NET Core, the `Startup` class:

* Replaces `Global.asax`.
* Handles all app startup tasks.

For more information, see App startup in ASP.NET Core.

In the ASP.NET Core project, open the `Startup.cs` file:

```csharp
public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllersWithViews();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseExceptionHandler("/Home/Error");
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }
        app.UseHttpsRedirection();
        app.UseStaticFiles();

        app.UseRouting();

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
        });
    }
}
```

ASP.NET Core apps must opt in to framework features with middleware. The previous template-generated code adds the following services and middleware:

* The `Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllersWithViews*` extension method registers MVC service support for controllers, API-related features, and views. For more information on MVC service registration options, see MVC service registration
* The `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` extension method adds the static file handler `Microsoft.AspNetCore.StaticFiles`. The `UseStaticFiles` extension method must be called before `UseRouting`. For more information, see Serve static files in ASP.NET Core apps.
* The `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting*` extension method adds routing. For more information, see Routing in ASP.NET Core.

This existing configuration includes what is needed to migrate the example ASP.NET MVC project. For more information on ASP.NET Core middleware options, see App startup in ASP.NET Core.

## Migrate controllers and views

In the ASP.NET Core project, a new empty controller class and view class would be added to serve as placeholders using the same names as the controller and view classes in any ASP.NET MVC project to migrate from.

The ASP.NET Core *WebApp1* project already includes a minimal example controller and view by the same name as the ASP.NET MVC project. So those will serve as placeholders for the ASP.NET MVC controller and views to be migrated from the ASP.NET MVC *WebApp1* project.

1. Copy the methods from the ASP.NET MVC `HomeController` to replace the new ASP.NET Core `HomeController` methods. There's no need to change the return type of the action methods. The ASP.NET MVC built-in template's controller action method return type is `System.Web.Mvc.ActionResult`; in ASP.NET Core MVC, the action methods return `IActionResult` instead. `ActionResult` implements `IActionResult`.
1. In the ASP.NET Core project, right-click the *Views/Home* directory, select **Add** > **Existing Item**.
1. In the **Add Existing Item** dialog, navigate to the ASP.NET MVC *WebApp1* project's *Views/Home* directory.
1. Select the `About.cshtml`, `Contact.cshtml`, and `Index.cshtml` Razor view files, then select **Add**, replacing the existing files.

For more information, see Handle requests with controllers in ASP.NET Core MVC and Views in ASP.NET Core MVC.

## Test each method

Each controller endpoint can be tested, however, layout and styles are covered later in the document.

1. Run the ASP.NET Core app.
1. Invoke the rendered views from the browser on the running ASP.NET Core app by replacing the current port number with the port number used in the ASP.NET Core project. For example, `https://localhost:44375/home/about`.

## Migrate static content

In ASP.NET MVC 5 or earlier, static content was hosted from the web project's root directory and was intermixed with server-side files. In ASP.NET Core, static files are stored within the project's web root directory. The default directory is `{content root}/wwwroot`, but it can be changed. For more information, see Static files in ASP.NET Core.

Copy the static content from the ASP.NET MVC *WebApp1* project to the `wwwroot` directory in the ASP.NET Core *WebApp1* project:

1. In the ASP.NET Core project, right-click the `wwwroot` directory, select **Add** > **Existing Item**.
1. In the **Add Existing Item** dialog, navigate to the ASP.NET MVC *WebApp1* project.
1. Select the `favicon.ico` file, then select **Add**, replacing the existing file.

## Migrate the layout files

Copy the ASP.NET MVC project layout files to the ASP.NET Core project:

1. In the ASP.NET Core project, right-click the `Views` directory, select **Add** > **Existing Item**.
1. In the **Add Existing Item** dialog, navigate to the ASP.NET MVC *WebApp1* project's `Views` directory.
1. Select the `_ViewStart.cshtml` file then select **Add**.

Copy the ASP.NET MVC project shared layout files to the ASP.NET Core project:

1. In the ASP.NET Core project, right-click the `Views/Shared` directory, select **Add** > **Existing Item**.
1. In the **Add Existing Item** dialog, navigate to the ASP.NET MVC *WebApp1* project's `Views/Shared` directory.
1. Select the `_Layout.cshtml` file, then select **Add**, replacing the existing file.

In the ASP.NET Core project, open the `_Layout.cshtml` file. Make the following changes to match the completed code shown below:

Update the Bootstrap CSS inclusion to match the completed code below:

1. Replace `@Styles.Render("~/Content/css")` with a `<link>` element to load `bootstrap.css` (see below).
1. Remove `@Scripts.Render("~/bundles/modernizr")`.

The completed replacement markup for Bootstrap CSS inclusion:

```html
<link rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css"
    integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
    crossorigin="anonymous">
```

Update the jQuery and Bootstrap JavaScript inclusion to match the completed code below:

1. Replace `@Scripts.Render("~/bundles/jquery")` with a `<script>` element (see below).
1. Replace `@Scripts.Render("~/bundles/bootstrap")` with a `<script>` element (see below).

The completed replacement markup for jQuery and Bootstrap JavaScript inclusion:

```html
<script src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.js"
    integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
```

The updated `_Layout.cshtml` file is shown below:

```cshtml
﻿<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@ViewBag.Title - My ASP.NET Application</title>
    <link rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
          crossorigin="anonymous">
</head>
<body>
    <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                @Html.ActionLink("Application name", "Index", "Home", new { area = "" }, new { @class = "navbar-brand" })
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li>@Html.ActionLink("Home", "Index", "Home")</li>
                    <li>@Html.ActionLink("About", "About", "Home")</li>
                    <li>@Html.ActionLink("Contact", "Contact", "Home")</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="container body-content">
        @RenderBody()
        <hr />
        <footer>
            <p>&copy; @DateTime.Now.Year - My ASP.NET Application</p>
        </footer>
    </div>

    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.js"
            integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    @RenderSection("scripts", required: false)
</body>
</html>
```

View the site in the browser. It should render with the expected styles in place.

## Configure bundling and minification

ASP.NET Core is compatible with several open-source bundling and minification solutions such as WebOptimizer and other similar libraries. ASP.NET Core doesn't provide a native bundling and minification solution. For information on configuring bundling and minification, see Bundling and Minification.

## Solve HTTP 500 errors

There are many problems that can cause an HTTP 500 error message that contains no information on the source of the problem. For example, if the `Views/_ViewImports.cshtml` file contains a namespace that doesn't exist in the project, an HTTP 500 error is generated. By default in ASP.NET Core apps, the `UseDeveloperExceptionPage` extension is added to the `IApplicationBuilder` and executed when the environment is *Development*. This is detailed in the following code:

```csharp
public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllersWithViews();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseExceptionHandler("/Home/Error");
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }
        app.UseHttpsRedirection();
        app.UseStaticFiles();

        app.UseRouting();

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
        });
    }
}
```

ASP.NET Core converts unhandled exceptions into HTTP 500 error responses. Normally, error details aren't included in these responses to prevent disclosure of potentially sensitive information about the server. For more information, see Developer Exception Page.

## Next steps

* <identity.md>

## Additional resources

* ASP.NET Core Blazor
* Tag Helpers in ASP.NET Core
