---
title: "ASP.NET Core Blazor app base path"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/host-and-deploy/app-base-path.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor app base path

This article explains the *app base path* in ASP.NET Core Blazor apps, including configuration guidance.

The *app base path* is the app's root URL path. Successful routing in Blazor apps requires framework configuration for any root URL path that isn't at the default app base path `/`.

Consider the following ASP.NET Core app and Blazor sub-app:

* The ASP.NET Core app is named `MyApp`:
  * The app physically resides at `d:/MyApp`.
  * Requests are received at `https://www.contoso.com/{MYAPP RESOURCE}`.
* A Blazor app named `CoolApp` is a sub-app of `MyApp`:
  * The sub-app physically resides at `d:/MyApp/CoolApp`.
  * Requests are received at `https://www.contoso.com/CoolApp/{COOLAPP RESOURCE}`.

Without specifying additional configuration for `CoolApp`, the sub-app in this scenario has no knowledge of where it resides on the server. For example, the app can't construct correct relative URLs to its resources without knowing that it resides at the relative URL path `/CoolApp/`. This scenario also applies in various hosting and reverse proxy scenarios when an app isn't hosted at a root URL path.

## Background

An anchor tag's destination (`href`) can be composed with either of two endpoints:

* Absolute locations that include a scheme (defaults to the page's scheme if omitted), host, port, and path or just a forward slash (`/`) followed by the path.

  Examples: `https://example.com/a/b/c` or `/a/b/c`

* Relative locations that contain just a path and do not start with a forward slash (`/`). These are resolved relative to the current document URL or the `<base>` tag's value, if specified.

  Example: `a/b/c`

The presence of a trailing slash (`/`) in a configured app base path is significant to compute the base path for URLs of the app. For example, `https://example.com/a` has a base path of `https://example.com/`, while `https://example.com/a/` with a trailing slash has a base path of `https://example.com/a`.

For the sources of links that pertain to Blazor in ASP.NET Core apps:

* URLs in Razor components (`.razor`) are typically relative.
* URLs in scripts, such as the Blazor scripts (`blazor.*.js`), are relative to the document.

If you're rendering a Blazor app from different documents (for example, `/Admin/B/C/` and `/Admin/D/E/`), you must take the app base path into account, or the base path is different when the app renders in each document and the resources are fetched from the wrong URLs.

Choose one of the following strategies to keep relative links resolving correctly:

* Map resources dynamically using the document they were rendered on as the root. This requires custom routing logic (for example, `Microsoft.AspNetCore.Routing.IDynamicEndpointMetadata` or a `Microsoft.AspNetCore.Routing.MatcherPolicy`) and is typically reserved for highly dynamic sites.

* Establish a consistent base path for the document and map all app resources beneath that path. Blazor Web Apps can rely on the `BasePath` component to render `<base href>` automatically, while standalone WebAssembly apps (or scenarios that always use a fixed value) configure the literal `<base>` tag in the host page.

The remainder of this article focuses on implementing a consistent base path.

## Server-side Blazor

Map the SignalR hub of a server-side Blazor app by passing the path to `Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub*` in the `Program` file. The default Blazor hub path is `/_blazor`, and the following example sets the base path of the default hub to `base/path`:

```csharp
app.MapBlazorHub("base/path/_blazor");
```

The benefit of using `Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub*` is that you can map patterns, such as `"{tenant}"` and not just concrete paths.

You can also map the SignalR hub when the app is in a virtual folder with a branched middleware pipeline. In the following example, requests to `/base/path/` are handled by Blazor's SignalR hub:

```csharp
app.Map("/base/path", subapp => {
    subapp.UsePathBase("/base/path");
    subapp.UseRouting();
	  subapp.UseAntiforgery();
    subapp.UseEndpoints(endpoints => {
        endpoints.MapBlazorHub("/base/path/_blazor");
        endpoints.MapStaticAssets();
		    endpoints.MapRazorComponents<App>()
				.AddInteractiveServerRenderMode();
	});
});
```

> **Note:**
> The default Blazor hub path is `/_blazor`.

Configure the `<base>` tag, per the guidance in the Configure the app base path section.

## Standalone Blazor WebAssembly

In a standalone Blazor WebAssembly app, only the `<base>` tag is configured, per the guidance in the Configure the app base path section.

## Configure the app base path

To provide configuration for the Blazor app's base path of `https://www.contoso.com/CoolApp/`, set the app base path (`<base>`), which is also called the relative root path.

By configuring the app base path, a component that isn't in the root directory can construct URLs relative to the app's root path. Components at different levels of the directory structure can build links to other resources at locations throughout the app. The app base path is also used to intercept selected hyperlinks where the `href` target of the link is within the app base path URI space. The `Microsoft.AspNetCore.Components.Routing.Router` component handles the internal navigation.

Place the `<base>` tag in `<head>` markup (location of `<head>` content) before any elements with attribute values that are URLs, such as the `href` attributes of `<link>` elements.

In many hosting scenarios, the relative URL path to the app is the root of the app. When the app runs at `/`, the `BasePath` component (`<BasePath />`) renders `<base href="/" />` automatically in `<head>` content. For any other deployment path, the component emits a `<base>` element that matches the current request's path base.

> **Note:**
> In some hosting scenarios, such as GitHub Pages and IIS sub-apps, the app base path must be set to the server's relative URL path of the app.

* In a server-side Blazor app, use the following approach:

  * Option 1: Use the `BasePath` component to set the app's base path (location of `<head>` content):

    ```razor
    <BasePath />
    ```

    The component renders `<base href>` automatically based on the current request path base.

  * Option 2: Call `Microsoft.AspNetCore.Builder.UsePathBaseExtensions.UsePathBase*` ***first*** in the app's request processing pipeline (`Program.cs`) immediately after the `Microsoft.AspNetCore.Builder.WebApplicationBuilder` is built (`builder.Build()`) to configure the base path for any following middleware that interacts with the request path:

    ```csharp
    app.UsePathBase("/CoolApp");
    ```

    Calling `Microsoft.AspNetCore.Builder.UsePathBaseExtensions.UsePathBase*` is recommended when you also wish to run the Blazor Server app locally. For example, supply the launch URL in `Properties/launchSettings.json`:

    ```xml
    "launchUrl": "https://localhost:{PORT}/CoolApp",
    ```

    The `{PORT}` placeholder in the preceding example is the port that matches the secure port in the `applicationUrl` configuration path. The following example shows the full launch profile for an app at port 7279:

    ```xml
    "BlazorSample": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "https://localhost:7279;http://localhost:5279",
      "launchUrl": "https://localhost:7279/CoolApp",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
    }
    ```

    > **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the `-lp|--launch-profile` option to `dotnet watch` or `dotnet run` or move the preferred profile to the top of the file.

    For more information on the `launchSettings.json` file, see ASP.NET Core runtime environments. For additional information on Blazor app base paths and hosting, see `<base href="/" />` or base-tag alternative for Blazor MVC integration (dotnet/aspnetcore #43191).

* Standalone Blazor WebAssembly (`wwwroot/index.html`):

  ```html
  <base href="/CoolApp/">
  ```

  **The trailing slash is required.**

> **Note:**
> When using `Microsoft.AspNetCore.Builder.WebApplication` (see Migrate from ASP.NET Core in .NET 5 to .NET 6), `app.UseRouting` must be called after `Microsoft.AspNetCore.Builder.UsePathBaseExtensions.UsePathBase*` so that the routing middleware can observe the modified path before matching routes. Otherwise, routes are matched before the path is rewritten by `Microsoft.AspNetCore.Builder.UsePathBaseExtensions.UsePathBase*` as described in the ASP.NET Core middleware and Routing in ASP.NET Core.

Don't prefix links throughout the app with a forward slash. Either avoid the use of a path segment separator or use dot-slash (`./`) relative path notation:

* ❌ Incorrect: ``
* ✔️ Correct: ``
* ✔️ Correct: ``

In Blazor WebAssembly web API requests with the `HttpClient` service, confirm that JSON helpers (`System.Net.Http.Json.HttpClientJsonExtensions`) don't prefix URLs with a forward slash (`/`):

* ❌ Incorrect: `var rsp = await client.GetFromJsonAsync("/api/Account");`
* ✔️ Correct: `var rsp = await client.GetFromJsonAsync("api/Account");`

Don't prefix Navigation Manager relative links with a forward slash. Either avoid the use of a path segment separator or use dot-slash (`./`) relative path notation (`Navigation` is an injected `Microsoft.AspNetCore.Components.NavigationManager`):

* ❌ Incorrect: `Navigation.NavigateTo("/other");`
* ✔️ Correct: `Navigation.NavigateTo("other");`
* ✔️ Correct: `Navigation.NavigateTo("./other");`

In typical configurations for Azure/IIS hosting, additional configuration usually isn't required. In some non-IIS hosting and reverse proxy hosting scenarios, additional static file middleware configuration might be required:

* To serve static files correctly (for example, `app.UseStaticFiles("/CoolApp");`).
* To serve the Blazor script (`_framework/blazor.*.js`). For more information, see ASP.NET Core Blazor static files.

For a Blazor WebAssembly app with a non-root relative URL path (for example, `<base href="/CoolApp/">`), the app fails to find its resources *when run locally*. To overcome this problem during local development and testing, you can supply a *path base* argument that matches the `href` value of the `<base>` tag at runtime. **Don't include a trailing slash.** To pass the path base argument when running the app locally, execute the `dotnet watch` (or `dotnet run`) command from the app's directory with the `--pathbase` option:

```dotnetcli
dotnet watch --pathbase=/{RELATIVE URL PATH (no trailing slash)}
```

For a Blazor WebAssembly app with a relative URL path of `/CoolApp/` (`<base href="/CoolApp/">`), the command is:

```dotnetcli
dotnet watch --pathbase=/CoolApp
```

If you prefer to configure the app's launch profile to specify the `pathbase` automatically instead of manually with `dotnet watch` (or `dotnet run`), set the `commandLineArgs` property in `Properties/launchSettings.json`. The following also configures the launch URL (`launchUrl`):

```json
"commandLineArgs": "--pathbase=/{RELATIVE URL PATH (no trailing slash)}",
"launchUrl": "{RELATIVE URL PATH (no trailing slash)}",
```

Using `CoolApp` as the example:

```json
"commandLineArgs": "--pathbase=/CoolApp",
"launchUrl": "CoolApp",
```

Using either `dotnet watch` (or `dotnet run`) with the `--pathbase` option or a launch profile configuration that sets the base path, the Blazor WebAssembly app responds locally at `http://localhost:port/CoolApp`.

For more information on the `launchSettings.json` file, see ASP.NET Core runtime environments. For additional information on Blazor app base paths and hosting, see `<base href="/" />` or base-tag alternative for Blazor MVC integration (dotnet/aspnetcore #43191).

## Obtain the app base path from configuration

The following guidance explains how to obtain the path for the `<base>` tag from an app settings file for different environments.

Add the app settings file to the app. The following example is for the `Staging` environment (`appsettings.Staging.json`):

```json
{
  "AppBasePath": "staging/"
}
```

In a server-side Blazor app, load the base path from configuration in `<head>` content:

```razor
@inject IConfiguration Config

...

<head>
    ...
    <base href="/@(Config.GetValue<string>("AppBasePath"))" />
    ...
</head>
```

Alternatively, a server-side app can obtain the value from configuration for `Microsoft.AspNetCore.Builder.UsePathBaseExtensions.UsePathBase*`. Place the following code ***first*** in the app's request processing pipeline (`Program.cs`) immediately after the `Microsoft.AspNetCore.Builder.WebApplicationBuilder` is built (`builder.Build()`). The following example uses the configuration key `AppBasePath`:

```csharp
app.UsePathBase($"/{app.Configuration.GetValue<string>("AppBasePath")}");
```

In a client-side Blazor WebAssembly app:

* Remove the `<base>` tag from `wwwroot/index.html`:

  ```diff
  - <base href="..." />
  ```

* Supply the app base path via a `HeadContent` component in the `App` component (`App.razor`):

  ```razor
  @inject IConfiguration Config

  ...

  <HeadContent>
      <base href="/@(Config.GetValue<string>("AppBasePath"))" />
  </HeadContent>
  ```

If there's no configuration value to load, for example in non-staging environments, the preceding `href` resolves to the root path `/`.

The examples in this section focus on supplying the app base path from app settings, but the approach of reading the path from `Microsoft.Extensions.Configuration.IConfiguration` is valid for any configuration provider. For more information, see the following resources:

* ASP.NET Core Blazor configuration
* Configuration in ASP.NET Core
