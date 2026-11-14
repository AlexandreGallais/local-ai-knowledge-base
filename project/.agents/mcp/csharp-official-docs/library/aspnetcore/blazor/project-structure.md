---
title: "ASP.NET Core Blazor project structure"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/project-structure.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor project structure

This article describes the files and folders that make up a Blazor app generated from a Blazor project template.

## Blazor Web App

Blazor Web App project template: `blazor`

The Blazor Web App project template provides a single starting point for using Razor components (`.razor`) to build any style of web UI, both server-side rendered and client-side rendered. It combines the strengths of Blazor Server and Blazor WebAssembly with server-side and client-side rendering, streaming rendering, enhanced navigation and form handling, and the ability to add interactivity using either Blazor Server or Blazor WebAssembly on a per-component basis.

If both client-side rendering (CSR) and interactive server-side rendering (interactive SSR) are selected on app creation, the project template uses the Interactive Auto render mode. The automatic rendering mode initially uses interactive SSR while the .NET app bundle and runtime are downloaded to the browser. After the .NET WebAssembly runtime is activated, rendering switches to CSR.

The Blazor Web App template enables both static and interactive server-side rendering using a single project. If you also enable Interactive WebAssembly rendering, the project includes an additional client project (`.Client`) for your WebAssembly-based components. The built output from the client project is downloaded to the browser and executed on the client. Components using the Interactive WebAssembly or Interactive Auto render modes must be located in the `.Client` project.

The component folder structure of the `.Client` project differs from the Blazor Web App's main project folder structure because the main project is a standard ASP.NET Core project. The main project must take into account other assets for ASP.NET Core projects that are unrelated to Blazor. You're welcome to use whatever component folder structure you wish in the `.Client` project. You're free to mirror the component folder layout of the main project in the `.Client` project if you wish. Note that namespaces might require adjustments for such assets as layout files if you move components into different folders than the project template uses.

More information on components and render modes is found in the ASP.NET Core Razor components and ASP.NET Core Blazor render modes articles.

Based on the interactive render mode selected at app creation, the `Layout` folder is either in the server project in the `Components` folder or at the root of the `.Client` project. The folder contains the following layout components and stylesheets:

* The `MainLayout` component (`MainLayout.razor`) is the app's layout component.
* The `MainLayout.razor.css` is the collocated (next to the component) stylesheet for the app's main layout.
* The `NavMenu` component (`NavMenu.razor`) implements sidebar navigation. The component includes `NavLink` components (`Microsoft.AspNetCore.Components.Routing.NavLink`), which render navigation links to other Razor components. The `Microsoft.AspNetCore.Components.Routing.NavLink` component indicates to the user which component is currently displayed.
* The `NavMenu.razor.css` is the collocated stylesheet for the app's navigation menu.
* The `ReconnectModal` component reflects the server-side connection state in the UI and is included when the app's interactive render mode is either Interactive Server or Interactive Auto. For more information, see ASP.NET Core Blazor SignalR guidance.
* The `ReconnectModal.razor.css` is the collocated stylesheet for the `ReconnectModal` component.
* The `ReconnectModal.razor.js` is the collocated JavaScript file for the `ReconnectModal` component.

The `Routes` component (`Routes.razor`) is either in the server project or the `.Client` project and sets up routing using the `Microsoft.AspNetCore.Components.Routing.Router` component. For client-side interactive components, the `Microsoft.AspNetCore.Components.Routing.Router` component intercepts browser navigation and renders the page that matches the requested address.

The `Components` folder of the server project holds the app's server-side Razor components. Shared components are often placed at the root of the `Components` folder, while layout and page components are usually placed in folders within the `Components` folder.

The `Components/Pages` folder of the server project contains the app's routable server-side Razor components. The route for each page is specified using the `@page` directive.

The `NotFound` component (`NotFound.razor`) implements a Not Found page to display when content isn't found for a request path. For more information, see ASP.NET Core Blazor navigation.

The `App` component (`App.razor`) is the root component of the app with HTML `<head>` markup, the `Routes` component, and the Blazor `<script>` tag. The root component is the first component that the app loads.

An imports file (`_Imports.razor`) in each of the server and `.Client` projects includes common Razor directives for Razor components of either project, such as `@using` directives for namespaces.

The `Properties` folder of the server project holds development environment configuration in the `launchSettings.json` file.

> **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the `-lp|--launch-profile` option to `dotnet watch` or `dotnet run` or move the preferred profile to the top of the file.

The `wwwroot` folder of the server project is the Web Root folder for the server project that holds the app's public static assets.

The `Program.cs` file of the server project is the project's entry point that sets up the ASP.NET Core web application host and contains the app's startup logic, including service registrations, configuration, logging, and request processing pipeline:

* Services for Razor components are added by calling `Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents*`. `Microsoft.Extensions.DependencyInjection.ServerRazorComponentsBuilderExtensions.AddInteractiveServerComponents*` adds services to support rendering Interactive Server components. `Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddInteractiveWebAssemblyComponents*` adds services to support rendering Interactive WebAssembly components.
* `Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents*` discovers available components and specifies the root component for the app (the first component loaded), which by default is the `App` component (`App.razor`). `Microsoft.AspNetCore.Builder.ServerRazorComponentsEndpointConventionBuilderExtensions.AddInteractiveServerRenderMode*` configures interactive server-side rendering (interactive SSR) for the app. `Microsoft.AspNetCore.Builder.WebAssemblyRazorComponentsEndpointConventionBuilderExtensions.AddInteractiveWebAssemblyRenderMode*` configures the Interactive WebAssembly render mode for the app.

The app settings files (`appsettings.Development.json`, `appsettings.json`) in either the server or `.Client` project provide configuration settings. In the server project, settings files are at the root of the project. In the `.Client` project, settings files are consumed from the Web Root folder, `wwwroot`.

In the `.Client` project:

* The `Pages` folder contains routable client-side Razor components. The route for each page is specified using the `@page` directive.

* The `wwwroot` folder is the Web Root folder for the `.Client` project that holds the app's public static assets.

* The `Program.cs` file is the project's entry point that sets up the WebAssembly host and contains the project's startup logic, including service registrations, configuration, logging, and request processing pipeline.

Additional files and folders may appear in an app produced from a Blazor Web App project template when additional options are configured. For example, generating an app with ASP.NET Core Identity includes additional assets for authentication and authorization features.

## Standalone Blazor WebAssembly

Standalone Blazor WebAssembly project template: `blazorwasm`

The Blazor WebAssembly template creates the initial files and directory structure for a standalone Blazor WebAssembly app:

* If the `blazorwasm` template is used, the app is populated with the following:
  * Demonstration code for a `Weather` component that loads data from a static asset (`weather.json`) and user interaction with a `Counter` component.
  * Bootstrap frontend toolkit.
* The `blazorwasm` template can also be generated without sample pages and styling.

Project structure:

* `Layout` folder: Contains the following layout components and stylesheets:
  * `MainLayout` component (`MainLayout.razor`): The app's layout component.
  * `MainLayout.razor.css`: Stylesheet for the app's main layout.
  * `NavMenu` component (`NavMenu.razor`): Implements sidebar navigation. Includes the `NavLink` component (`Microsoft.AspNetCore.Components.Routing.NavLink`), which renders navigation links to other Razor components. The `Microsoft.AspNetCore.Components.Routing.NavLink` component automatically indicates a selected state when its component is loaded, which helps the user understand which component is currently displayed.
  * `NavMenu.razor.css`: Stylesheet for the app's navigation menu.

* `Pages` folder: Contains the Blazor app's routable Razor components (`.razor`). The route for each page is specified using the `@page` directive. The template includes the following components:
  * `Counter` component (`Counter.razor`): Implements the Counter page.
  * `Index` component (`Index.razor`): Implements the Home page.
  * `Weather` component (`Weather.razor`): Implements the Weather page.
  * `NotFound` component (`NotFound.razor`): Implements a Not Found page to display when content isn't found for a request path. For more information, see ASP.NET Core Blazor navigation.

* `_Imports.razor`: Includes common Razor directives to include in the app's components (`.razor`), such as `@using` directives for namespaces.

* `App.razor`: The root component of the app that sets up client-side routing using the `Microsoft.AspNetCore.Components.Routing.Router` component. The `Microsoft.AspNetCore.Components.Routing.Router` component intercepts browser navigation and renders the page that matches the requested address.

* `Properties` folder: Holds development environment configuration in the `launchSettings.json` file.

  > **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the `-lp|--launch-profile` option to `dotnet watch` or `dotnet run` or move the preferred profile to the top of the file.

* `wwwroot` folder: The Web Root folder for the app containing the app's public static assets, including `appsettings.json` and environmental app settings files for configuration settings and sample weather data (`sample-data/weather.json`). The `index.html` webpage is the root page of the app implemented as an HTML page:
  * When any page of the app is initially requested, this page is rendered and returned in the response.
  * The page specifies where the root `App` component is rendered. The component is rendered at the location of the `div` DOM element with an `id` of `app` (`Loading...`).

* `Program.cs`: The app's entry point that sets up the WebAssembly host:

  * The `App` component is the root component of the app. The `App` component is specified as the `div` DOM element with an `id` of `app` (`Loading...` in `wwwroot/index.html`) to the root component collection (`builder.RootComponents.Add<App>("#app")`).
  * Services are added and configured (for example, `builder.Services.AddSingleton<IMyDependency, MyDependency>()`).

Additional files and folders may appear in an app produced from a Blazor WebAssembly project template when additional options are configured. For example, generating an app with ASP.NET Core Identity includes additional assets for authentication and authorization features.

## Location of the Blazor script

The Blazor script is served as a static web asset with automatic compression and fingerprinting. For more information, see ASP.NET Core Blazor static files.

In a Blazor Web App, the Blazor script is located in the `Components/App.razor` file:

```razor
<script src="@Assets["_framework/blazor.web.js"]"></script>
```

In a Blazor Server app, the Blazor script is located in the `Pages/_Host.cshtml` file:

```html
<script src="_framework/blazor.server.js"></script>
```

For a Blazor Web App or a Blazor Server app, the project must contain at least one Razor component file (`.razor`) in order to automatically include the Blazor script when the app is published. If the project doesn't contain at least one Razor component, set the `RequiresAspNetWebAssets` MSBuild property to `true` in the app's project file to include the Blazor script:

```xml
<RequiresAspNetWebAssets>true</RequiresAspNetWebAssets>
```

In a Blazor WebAssembly app, the Blazor script content is located in the `wwwroot/index.html` file:

```html
<script src="_framework/blazor.webassembly#[.{fingerprint}].js"></script>
```

When the app is published, the `{fingerprint}` placeholder is automatically replaced with a unique hash for cache busting.

## Location of `<head>` and `<body>` content

In a Blazor Web App, `<head>` and `<body>` content is located in the `Components/App.razor` file.

In a Blazor WebAssembly app, `<head>` and `<body>` content is located in the `wwwroot/index.html` file.

## Related content

* Tooling for ASP.NET Core Blazor
* ASP.NET Core Blazor hosting models
* APIs overview
* Blazor samples GitHub repository (`dotnet/blazor-samples`) (how to download)
