---
title: "Integrate ASP.NET Core Razor components with MVC or Razor Pages in hosted Blazor WebAssembly solutions (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/integration-hosted-webassembly.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Integrate ASP.NET Core Razor components with MVC or Razor Pages in hosted Blazor WebAssembly solutions

> **Note:**
> Hosted Blazor WebAssembly solutions remain supported, but the project template was removed and is no longer supported in .NET 8 or later. This article appears in the table of contents up to .NET 7 for reference, but note that .NET 7 is a Standard Support Term release that's no longer supported.

This article explains Razor component integration scenarios for hosted Blazor WebAssembly apps, including prerendering of Razor components on the server.

> **Important:**
> Framework changes across ASP.NET Core releases led to different sets of instructions in this article. Before using this article's guidance, confirm that the document version selector at the top of this article matches the version of ASP.NET Core that you intend to use for your app.

Prerendering can improve Search Engine Optimization (SEO) by rendering content for the initial HTTP response that search engines can use to calculate page rank.

## Solution configuration

### Prerendering configuration

To set up prerendering for a hosted Blazor WebAssembly app:

1. Host the Blazor WebAssembly app in an ASP.NET Core app. A standalone Blazor WebAssembly app can be added to an ASP.NET Core solution, or you can use a hosted Blazor WebAssembly app created from the Blazor WebAssembly project template with the hosted option:

   * Visual Studio: In the **Additional information** dialog, select the **ASP.NET Core Hosted** checkbox when creating the Blazor WebAssembly app. In this article's examples, the solution is named `BlazorHosted`.
   * Visual Studio Code/.NET CLI command shell: `dotnet new blazorwasm -ho` (use the `-ho|--hosted` option). Use the `-o|--output {LOCATION}` option to create a folder for the solution and set the solution's project namespaces. In this article's examples, the solution is named `BlazorHosted` (`dotnet new blazorwasm -ho -o BlazorHosted`).

   For the examples in this article, the hosted solution's name (assembly name) is `BlazorHosted`. The client project's namespace is `BlazorHosted.Client`, and the server project's namespace is `BlazorHosted.Server`.

1. **Delete** the `wwwroot/index.html` file from the Blazor WebAssembly **:::no-loc text="Client":::** project.

1. In the **:::no-loc text="Client":::** project, **delete** the following lines in `Program.cs`:

   ```diff
   - builder.RootComponents.Add<App>("#app");
   - builder.RootComponents.Add<HeadOutlet>("head::after");
   ```

1. Add `_Host.cshtml` file to the **:::no-loc text="Server":::** project's `Pages` folder. You can obtain the files from a project created from the Blazor Server template using Visual Studio or using the .NET CLI with the `dotnet new blazorserver -o BlazorServer` command in a command shell (the `-o BlazorServer` option creates a folder for the project). After placing the files into the **:::no-loc text="Server":::** project's `Pages` folder, make the following changes to the files.

   Make the following changes to the `_Host.cshtml` file:

   * Update the `Pages` namespace at the top of the file to match the namespace of the **:::no-loc text="Server":::** app's pages. The `{APP NAMESPACE}` placeholder in the following example represents the namespace of the donor app's pages that provided the `_Host.cshtml` file:

     Delete:

     ```diff
     - @namespace {APP NAMESPACE}.Pages
     ```

     Add:

     ```razor
     @namespace BlazorHosted.Server.Pages
     ```

   * Add an `@using` directive for the **:::no-loc text="Client":::** project at the top of the file:

     ```razor
     @using BlazorHosted.Client
     ```

   * Update the stylesheet links to point to the WebAssembly project's stylesheets. In the following example, the client project's namespace is `BlazorHosted.Client`. The `{APP NAMESPACE}` placeholder represents the namespace of the donor app that provided the `_Host.cshtml` file. Update the Component Tag Helper (`<component>` tag) for the `HeadOutlet` component to prerender the component.

     Delete:

     ```diff
     - <link href="css/site.css" rel="stylesheet" />
     - <link href="{APP NAMESPACE}.styles.css" rel="stylesheet" />
     - <component type="typeof(HeadOutlet)" render-mode="ServerPrerendered" />
     ```

     Add:

     ```cshtml
     <link href="css/app.css" rel="stylesheet" />
     <link href="BlazorHosted.Client.styles.css" rel="stylesheet" />
     <component type="typeof(HeadOutlet)" render-mode="WebAssemblyPrerendered" />
     ```

     > **Note:**
     > Leave the `<link>` element that requests the Bootstrap stylesheet (`css/bootstrap/bootstrap.min.css`) in place.

   * Update the Blazor script source to use the client-side Blazor WebAssembly script:

     Delete:

     ```diff
     - <script src="_framework/blazor.server.js"></script>
     ```

     Add:

     ```html
     <script src="_framework/blazor.webassembly.js"></script>
     ```

   * Update the `render-mode` of the Component Tag Helper to prerender the root `App` component with `Microsoft.AspNetCore.Mvc.Rendering.RenderMode.WebAssemblyPrerendered`:

     Delete:

     ```diff
     - <component type="typeof(App)" render-mode="ServerPrerendered" />
     ```

     Add:

     ```cshtml
     <component type="typeof(App)" render-mode="WebAssemblyPrerendered" />
     ```

     > **Important:**
     > Prerendering isn't supported for authentication endpoints (`/authentication/` path segment). For more information, see ASP.NET Core Blazor WebAssembly additional security scenarios.

1. In the `Program.cs` file of the **:::no-loc text="Server":::** project, change the fallback endpoint from the `index.html` file to the `_Host.cshtml` page:

   Delete:

   ```diff
   - app.MapFallbackToFile("index.html");
   ```

   Add:

   ```csharp
   app.MapFallbackToPage("/_Host");
   ```

1. If the **:::no-loc text="Client":::** and **:::no-loc text="Server":::** projects use one or more common services during prerendering, factor the service registrations into a method that can be called from both projects. For more information, see ASP.NET Core Blazor dependency injection.

1. Run the **:::no-loc text="Server":::** project. The hosted Blazor WebAssembly app is prerendered by the **:::no-loc text="Server":::** project for clients.

### Configuration for embedding Razor components into pages or views

The following sections and examples for embedding Razor components from the **:::no-loc text="Client":::** Blazor WebAssembly app into pages or views of the server app require additional configuration.

The **:::no-loc text="Server":::** project must have the following files and folders.

Razor Pages:

* `Pages/Shared/_Layout.cshtml`
* `Pages/Shared/_Layout.cshtml.css`
* `Pages/_ViewImports.cshtml`
* `Pages/_ViewStart.cshtml`

MVC:

* `Views/Shared/_Layout.cshtml`
* `Views/Shared/_Layout.cshtml.css`
* `Views/_ViewImports.cshtml`
* `Views/_ViewStart.cshtml`

The preceding files can be obtained by generating an app from the ASP.NET Core project templates using:

* Visual Studio's new project creation tools.
* Opening a command shell and executing `dotnet new webapp -o {PROJECT NAME}` (Razor Pages) or `dotnet new mvc -o {PROJECT NAME}` (MVC). The option `-o|--output` with a value for the `{PROJECT NAME}` placeholder provides a name for the app and creates a folder for the app.

Update the namespaces in the imported `_ViewImports.cshtml` file to match those in use by the **:::no-loc text="Server":::** project receiving the files.

`Pages/_ViewImports.cshtml` (Razor Pages):

```razor
@using BlazorHosted.Server
@namespace BlazorHosted.Server.Pages
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
```

`Views/_ViewImports.cshtml` (MVC):

```razor
@using BlazorHosted.Server
@using BlazorHosted.Server.Models
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
```

Update the imported layout file, which is `Pages/Shared/_Layout.cshtml` for Razor Pages or `Views/Shared/_Layout.cshtml` for MVC.

First, delete the title and the stylesheet from the donor project, which is `RPDonor.styles.css` in the following example. The `{PROJECT NAME}` placeholder represents the donor project's app name.

```diff
- <title>@ViewData["Title"] - {PROJECT NAME}</title>
- <link rel="stylesheet" href="~/RPDonor.styles.css" asp-append-version="true" />
```

Include the **:::no-loc text="Client":::** project's styles in the layout file. In the following example, the **:::no-loc text="Client":::** project's namespace is `BlazorHosted.Client`. The `<title>` element can be updated at the same time.

Place the following lines in the `<head>` content of the layout file:

```cshtml
<title>@ViewData["Title"] - BlazorHosted</title>
<link href="css/app.css" rel="stylesheet" />
<link rel="stylesheet" href="BlazorHosted.Client.styles.css" asp-append-version="true" />
<component type="typeof(HeadOutlet)" render-mode="WebAssemblyPrerendered" />
```

The imported layout contains two `Home` (`Index` page) and `Privacy` navigation links. To make the `Home` links point to the hosted Blazor WebAssembly app, change the hyperlinks:

```diff
- <a class="navbar-brand" asp-area="" asp-page="/Index">{PROJECT NAME}</a>
+ <a class="navbar-brand" href="/">BlazorHosted</a>
```

```diff
- <a class="nav-link text-dark" asp-area="" asp-page="/Index">Home</a>
+ <a class="nav-link text-dark" href="/">Home</a>
```

In an MVC layout file:

```diff
- <a class="navbar-brand" asp-area="" asp-controller="Home" 
-     asp-action="Index">{PROJECT NAME}</a>
+ <a class="navbar-brand" href="/">BlazorHosted</a>
```

```diff
- <a class="nav-link text-dark" asp-area="" asp-controller="Home" 
-     asp-action="Index">Home</a>
+ <a class="nav-link text-dark" href="/">Home</a>
```

Update the `` element's app name. The following example uses the app name `BlazorHosted`:

```diff
- &copy; {DATE} - {DONOR NAME} - <a asp-area="" asp-page="/Privacy">Privacy</a>
+ &copy; {DATE} - BlazorHosted - <a asp-area="" asp-page="/Privacy">Privacy</a>
```

In the preceding example, the `{DATE}` placeholder represents the copyright date in an app generated from the Razor Pages or MVC project template.

To make the `Privacy` link lead to a privacy page (Razor Pages), add a privacy page to the **:::no-loc text="Server":::** project.

`Pages/Privacy.cshtml` in the **:::no-loc text="Server":::** project:

```cshtml
@page
@model PrivacyModel
@{
    ViewData["Title"] = "Privacy Policy";
}
<h1>@ViewData["Title"]</h1>

<p>Use this page to detail your site's privacy policy.</p>
```

For an MVC-based privacy view, create a privacy view in the **:::no-loc text="Server":::** project.

`View/Home/Privacy.cshtml` in the **:::no-loc text="Server":::** project:

```cshtml
@{
    ViewData["Title"] = "Privacy Policy";
}
<h1>@ViewData["Title"]</h1>

<p>Use this page to detail your site's privacy policy.</p>
```

In the `Home` controller of the MVC app, return the view.

Add the following code to `Controllers/HomeController.cs`:

```csharp
public IActionResult Privacy()
{
    return View();
}
```

If you import files from a donor app, be sure to update any namespaces in the files to match that of the **:::no-loc text="Server":::** project (for example, `BlazorHosted.Server`).

Import static assets to the **:::no-loc text="Server":::** project from the donor project's `wwwroot` folder:

* `wwwroot/css` folder and contents
* `wwwroot/js` folder and contents
* `wwwroot/lib` folder and contents

If the donor project is created from an ASP.NET Core project template and the files aren't modified, you can copy the entire `wwwroot` folder from the donor project into the **:::no-loc text="Server":::** project and remove the :::no-loc text="favicon"::: icon file.

> **Warning:**
> Avoid placing the static asset into both the **:::no-loc text="Client":::** and **:::no-loc text="Server":::** `wwwroot` folders. If the same file is present in both folders, an exception is thrown because the static assets share the same web root path. Therefore, host a static asset in either of the `wwwroot` folders, not both.

After adopting the preceding configuration, embed Razor components into pages or views of the **:::no-loc text="Server":::** project. Use the guidance in the following sections of this article:

* *Render components in a page or view with the Component Tag Helper*
* *Render components in a page or view with a CSS selector*
