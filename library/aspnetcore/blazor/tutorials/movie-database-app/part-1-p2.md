---
title: "Build a Blazor movie database app (Part 1 - Create a Blazor Web App) (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/tutorials/movie-database-app/part-1.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Build a Blazor movie database app (Part 1 - Create a Blazor Web App) (part 2 of 2)

## Examine the project files

The following sections contain an overview of the project's folders and files.

If you're building the app, you don't need to make changes to the project files in the following sections. As you read the descriptions of the folders and files, examine them in the project.

If you're only reading the articles and not building the app, you can refer to the completed sample app in the Blazor samples GitHub repository (`dotnet/blazor-samples`). Select the latest version folder in the repository. The sample folder for this tutorial's project is named `BlazorWebAppMovies`. The sample app is the *finished version* of the app after following all of the steps of the tutorial series. Code in the sample doesn't always match steps of the tutorial before the end of the series.

### `Properties` folder

The `Properties` folder holds development environment configuration in the `launchSettings.json` file.

### `wwwroot` folder

The `wwwroot` folder contains static assets, such as image, JavaScript (`.js`), and stylesheet (`.css`) files.

### `Components`, `Components/Pages`, and `Components/Layout` folders

These folders contain *Razor components*, often referred to as "components," and supporting files. A component is a self-contained portion of user interface (UI) with optional processing logic. Components can be nested, reused, and shared among projects.

Components are implemented using a combination of C# and HTML markup in Razor component files with the `.razor` file extension.

Typically, components that are nested within other components and not directly reachable ("routable") at a URL are placed in the `Components` folder. Components that are routable via a URL are usually placed in the `Components/Pages` folder.

The `Components/Layout` folder contains the following layout components and stylesheets:

* `MainLayout` component (`MainLayout.razor`): The app's main layout component.
* `MainLayout.razor.css`: Stylesheet for the app's main layout.
* `NavMenu` component (`NavMenu.razor`): Implements sidebar navigation. This component uses several `NavLink` components to render navigation links to other Razor components.
* `NavMenu.razor.css`: Stylesheet for the app's navigation menu.
* `ReconnectModal` component (`ReconnectModal.razor`): Reflects the server-side connection state in the UI.
* `ReconnectModal.razor.css`: Stylesheet for the `ReconnectModal` component.
* `ReconnectModal.razor.js`: JavaScript file for the `ReconnectModal` component.

### `Components/_Imports.razor` file

The imports file (`_Imports.razor`) includes common *Razor directives* to include in the app's Razor components. Razor directives are reserved keywords prefixed with `@` that appear in Razor markup and change the way component markup or component elements are compiled or function.

### `Components/App.razor` file

The `App` component (`App.razor`) is the root component of the app that includes:

* HTML markup.
* The `Routes` component.
* The Blazor script (`<script>` tag for `blazor.web.js`).

The root component is the first component that the app loads.

### `Components/Routes.razor` file

The `Routes` component (`Routes.razor`) sets up routing for the app.

### `appsettings.json` file

The `appsettings.json` file contains configuration data, such as connection strings.

> **Warning:**
> Don't store app secrets, connection strings, credentials, passwords, personal identification numbers (PINs), private C#/.NET code, or private keys/tokens in client-side code, which is ***always insecure***. In test/staging and production environments, server-side Blazor code and web APIs should use secure authentication flows that avoid maintaining credentials within project code or configuration files. Outside of local development testing, we recommend avoiding the use of environment variables to store sensitive data, as environment variables aren't the most secure approach. For local development testing, the Secret Manager tool is recommended for securing sensitive data. For more information, see Securely maintain sensitive data and credentials.

### `Program.cs` file

The `Program.cs` file contains code to create the app and configure the request processing pipeline of the app.

The order of the lines in the Blazor Web App project template changes across releases of .NET, so the order of the lines in the `Program.cs` file might not match the order of the lines covered in this section.

A `Microsoft.AspNetCore.Builder.WebApplicationBuilder` creates the app with preconfigured defaults:

```csharp
var builder = WebApplication.CreateBuilder(args);
```

Razor component services are added to the app by calling `Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents*`, which enables Razor components to render and execute code on the server, and `Microsoft.Extensions.DependencyInjection.ServerRazorComponentsBuilderExtensions.AddInteractiveServerComponents*` adds services to support rendering Interactive Server components:

```csharp
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();
```

The `Microsoft.AspNetCore.Builder.WebApplication` (held by the `app` variable in the following code) is built:

```csharp
var app = builder.Build();
```

Next, the HTTP request pipeline is configured.

When the app isn't running in the `Development` environment:

* Exception handler middleware (`Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler*`) processes errors and displays a custom error page.
* HTTP Strict Transport Security (HSTS) protocol middleware (`Microsoft.AspNetCore.Builder.HstsBuilderExtensions.UseHsts*`) processes HSTS.

```csharp
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    app.UseHsts();
}
```

By default, an ASP.NET Core app doesn't provide a status code page for HTTP error status codes, such as *404 - Not Found*. When the app sets an HTTP 400-599 error status code without a body, it returns the status code and an empty response body. However, an app generated from the Blazor Web App project template calls `Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute*` to add status code pages middleware to the request pipeline for pages that aren't found, which generates the response body by re-executing the request pipeline using the path to the Not Found error page (`/not-found`):

```csharp
app.UseStatusCodePagesWithReExecute("/not-found", 
    createScopeForStatusCodePages: true);
```

HTTPS redirection middleware (`Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection*`) enforces the HTTPS protocol by redirecting HTTP requests to HTTPS if an HTTPS port is available:

```csharp
app.UseHttpsRedirection();
```

Antiforgery middleware (`Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery*`) enforces antiforgery protection for form processing:

```csharp
app.UseAntiforgery();
```

Map Static Assets routing endpoint conventions (`Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*`) maps static files, such as images, scripts, and stylesheets, produced during the build as endpoints:

```csharp
app.MapStaticAssets();
```

`Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents*` maps components defined in the root `App` component to the given .NET assembly and renders routable components, and `Microsoft.AspNetCore.Builder.ServerRazorComponentsEndpointConventionBuilderExtensions.AddInteractiveServerRenderMode*` configures interactive server-side rendering (interactive SSR) support for the app:

```csharp
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();
```

> **Note:**
> The extension methods `Microsoft.Extensions.DependencyInjection.ServerRazorComponentsBuilderExtensions.AddInteractiveServerComponents*` on `Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents*` and `Microsoft.AspNetCore.Builder.ServerRazorComponentsEndpointConventionBuilderExtensions.AddInteractiveServerRenderMode*` on `Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents*` make the app capable of adopting interactive SSR, which isn't relevant until the last part of the tutorial series on interactivity. Over the next several articles, the app's components only adopt static SSR.

The app is run by calling `Microsoft.AspNetCore.Builder.WebApplication.Run*` on the `Microsoft.AspNetCore.Builder.WebApplication` (`app`):

```csharp
app.Run();
```

## Troubleshoot with the completed sample

If you run into a problem while following the tutorial that you can't resolve from the text, compare your code to the completed project in the Blazor samples repository:

Blazor samples GitHub repository (`dotnet/blazor-samples`)

Select the latest version folder. The sample folder for this tutorial's project is named `BlazorWebAppMovies`.

## Related content

When using VS Code or the .NET CLI, this tutorial series adopts insecure HTTP protocol to ease the transition of adopting SSL/HTTPS security for Linux and macOS users. For information on adopting SSL/HTTPS, see Enforce HTTPS in ASP.NET Core.

## Next steps

> Next: Add and scaffold a model
