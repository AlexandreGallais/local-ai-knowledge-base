---
title: "Multiple hosted ASP.NET Core Blazor WebAssembly apps (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/host-and-deploy/webassembly/multiple-hosted-webassembly.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Multiple hosted ASP.NET Core Blazor WebAssembly apps (part 3 of 3)

```csharp
  app.MapWhen(ctx => ctx.Request.Path.StartsWithSegments("/FirstApp", 
      StringComparison.OrdinalIgnoreCase), first =>
  {
      first.UseBlazorFrameworkFiles("/FirstApp");
      first.UseStaticFiles();
      first.UseStaticFiles("/FirstApp");
      first.UseRouting();

      first.UseEndpoints(endpoints =>
      {
          endpoints.MapControllers();
          endpoints.MapFallbackToFile("/FirstApp/{*path:nonfile}",
              "FirstApp/index.html");
      });
  });

  app.MapWhen(ctx => ctx.Request.Path.StartsWithSegments("/SecondApp", 
      StringComparison.OrdinalIgnoreCase), second =>
  {
      second.UseBlazorFrameworkFiles("/SecondApp");
      second.UseStaticFiles();
      second.UseStaticFiles("/SecondApp");
      second.UseRouting();

      second.UseEndpoints(endpoints =>
      {
          endpoints.MapControllers();
          endpoints.MapFallbackToFile("/SecondApp/{*path:nonfile}",
              "SecondApp/index.html");
      });
  });
  ```

* Set the base path in each client app:

  In the first client app's `index.html` file (`Client/wwwroot/index.html`), update the `<base>` tag value to reflect the subpath. The trailing slash is required:

  ```html
  <base href="/FirstApp/" />
  ```

  In the second client app's `index.html` file (`SecondClient/wwwroot/index.html`), update the `<base>` tag value to reflect the subpath. The trailing slash is required:

  ```html
  <base href="/SecondApp/" />
  ```

For more information on `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*`, see ASP.NET Core Blazor static files.

For more information on `UseBlazorFrameworkFiles` and `MapFallbackToFile`, see the following resources:

* `Microsoft.AspNetCore.Builder.ComponentsWebAssemblyApplicationBuilderExtensions.UseBlazorFrameworkFiles*` (reference source)
* `Microsoft.AspNetCore.Builder.StaticFilesEndpointRouteBuilderExtensions.MapFallbackToFile*` (reference source)

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

Requests from the client apps to `/WeatherForecast` in the server API are either to `/FirstApp/WeatherForecast` or `/SecondApp/WeatherForecast` depending on which client app makes the request. Therefore, the controller routes that return weather data from the server API require a modification to include the path segments.

In the server app's weather forecast controller (`Controllers/WeatherForecastController.cs`), replace the existing route (`[Route("[controller]")]`) to `WeatherForecastController` with the following routes, which take into account the client request paths:

```csharp
[Route("FirstApp/[controller]")]
[Route("SecondApp/[controller]")]
```

If you plan to serve pages from the server app, add an `Index` Razor page to the `Pages` folder of the server app:

`Pages/Index.cshtml`:

```cshtml
@page
@model MultipleBlazorApps.Server.Pages.IndexModel
@{
    ViewData["Title"] = "Home";
}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Home</title>
</head>
<body>
    <div class="main">
        <div class="content px-4">

            <div>
                <h1>Welcome</h1>
                <p>Hello from Razor Pages!</p>
            </div>
        </div>
    </div>
</body>
</html>
```

`Pages/Index.cshtml.cs`:

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MultipleBlazorApps.Server.Pages;

public class IndexModel : PageModel
{
    public void OnGet()
    {
    }
}
```

> **Note:**
> The preceding `Index` page is a minimal example purely for demonstration purposes. If the app requires additional Razor Pages assets, such as a layout, styles, scripts, and imports, obtain them from an app created from the Razor Pages project template. For more information, see Razor Pages architecture and concepts in ASP.NET Core.

If you plan to serve MVC views from the server app, add an `Index` view and a `Home` controller:

`Views/Home/Index.cshtml`:

```cshtml
@{
    ViewData["Title"] = "Home";
}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Home</title>
</head>
<body>
    <div class="main">
        <div class="content px-4">

            <div>
                <h1>Welcome</h1>
                <p>Hello from MVC!</p>
            </div>
        </div>
    </div>
</body>
</html>
```

`Controllers/HomeController.cs`:

```csharp
using Microsoft.AspNetCore.Mvc;

namespace MultipleBlazorApps.Server.Controllers;

public class HomeController : Controller
{
    public IActionResult Index() => View();
}
```

> **Note:**
> The preceding `Index` view is a minimal example purely for demonstration purposes. If the app requires additional MVC assets, such as a layout, styles, scripts, and imports, obtain them from an app created from the MVC project template. For more information, see Get started with ASP.NET Core MVC.

For more information on using the Razor components from either of the client apps in pages or views of the server app, see Integrate ASP.NET Core Razor components with MVC or Razor Pages in hosted Blazor WebAssembly solutions.

## Run the app

Run the `MultipleBlazorApps.Server` project:

**port-domain:**

* Access the initial client app at `https://localhost:5001`.
* Access the added client app at `https://localhost:5002`.
* If the server app is configured to serve pages or views, access the `Index` page or view at `https://localhost:5000`.

**route-subpath:**

* Access the initial client app at `https://localhost:{DEFAULT PORT}/FirstApp`.
* Access the added client app at `https://localhost:{DEFAULT PORT}/SecondApp`.
* If the server app is configured to serve pages or views, access the `Index` page or view at `https://localhost:{DEFAULT PORT}`.

In the preceding example URLs, the `{DEFAULT PORT}` placeholder is the default port defined by the `MultipleBlazorApps.Server` project's `Properties/launchSettings.json` file in its `applicationUrl` value.

> **Important:**
> When running the app with the `dotnet watch` (or `dotnet run`) command (.NET CLI), confirm that the command shell is open in the `Server` folder of the solution.
>
> When using Visual Studio's start button to run the app, confirm that the `MultipleBlazorApps.Server` project is set as the startup project (highlighted in Solution Explorer).

## Static assets

When an asset is in a client app's `wwwroot` folder, provide the static asset request path in components:

```razor
<img alt="..." src="{PATH AND FILE NAME}" />
```

The `{PATH AND FILE NAME}` placeholder is the path and file name under `wwwroot`.

For example, the source for a Jeep image (`jeep-yj.png`) in the `vehicle` folder of `wwwroot`:

```razor
<img alt="Jeep Wrangler YJ" src="vehicle/jeep-yj.png" />
```

## Razor class library (RCL) support

Add the Razor class library (RCL) to the solution as a new project:

* Right-click the solution in **Solution Explorer** and select **Add** > **New Project**.
* Use the **Razor Class Library** project template to create the project. The examples in this section use the project name `ComponentLibrary`, which is also the RCL's assembly name. Don't select the **Support pages and views** checkbox.

For each hosted Blazor WebAssembly client app, create a project reference for the RCL project by right-clicking each client project in **Solution Explorer** and selecting **Add** > **Project Reference**.

Use components from the RCL in the client apps with either of the following approaches:

* Place an `@using` directive at the top of the component for the RCL's namespace and add Razor syntax for the component. The following example is for an RCL with the assembly name `ComponentLibrary`:

  ```razor
  @using ComponentLibrary

  ...

  <Component1 />
  ```

* Provide the RCL's namespace along with the Razor syntax for the component. This approach doesn't require an `@using` directive at the top of the component file. The following example is for an RCL with the assembly name `ComponentLibrary`:

  ```razor
  <ComponentLibrary.Component1 />
  ```

> **Note:**
> An `@using` directive can also be placed into each client app's `_Import.razor` file, which makes the RCL's namespace globally available to components in that project.

When any other static asset is in the `wwwroot` folder of an RCL, reference the static asset in a client app per the guidance in Reusable Razor UI in class libraries with ASP.NET Core:

```razor
<img alt="..." src="_content/{PACKAGE ID}/{PATH AND FILE NAME}" />
```

The `{PACKAGE ID}` placeholder is the RCL's package ID. The package ID defaults to the project's assembly name if `<PackageId>` isn't specified in the project file. The `{PATH AND FILE NAME}` placeholder is path and file name under `wwwroot`.

The following example shows the markup for a Jeep image (`jeep-yj.png`) in the `vehicle` folder of the RCL's `wwwroot` folder. The following example is for an RCL with the assembly name `ComponentLibrary`:

```razor
<img alt="Jeep Wrangler YJ" src="_content/ComponentLibrary/vehicle/jeep-yj.png" />
```

## Related content

* Consume ASP.NET Core Razor components from a Razor class library (RCL)
* Reusable Razor UI in class libraries with ASP.NET Core
* ASP.NET Core Blazor CSS isolation
