---
title: "blazor (part 1 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-10/includes/blazor.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# blazor

### New and updated Blazor Web App security samples

We've added and updated the Blazor Web App security samples linked in the following articles:

* Secure an ASP.NET Core Blazor Web App with OpenID Connect (OIDC)
* Secure an ASP.NET Core Blazor Web App with Microsoft Entra ID
* Secure an ASP.NET Core Blazor Web App with Windows Authentication

All of our OIDC and Entra sample solutions now include a separate web API project (`MinimalApiJwt`) to demonstrate how to configure and call an external web API securely. Calling web APIs is demonstrated with a token <example-value> and named HTTP client for an OIDC identity provider or Microsoft Identity Web packages/API for Microsoft Entra ID.

The sample solutions are configured in C# code in their `Program` files. To configure the solutions from app settings files (for example, `appsettings.json`) see the ***new*** *Supply configuration with the JSON configuration provider (app settings)* section of the OIDC or Entra articles.

Our Entra article and sample apps also include new guidance on the following approaches:

* How to use an encrypted distributed token cache for web farm hosting scenarios.
* How to use Azure Key Vault with Azure Managed Identities for data protection.

### QuickGrid `RowClass` parameter

Apply a stylesheet class to a row of the grid based on the row item using the new `RowClass` parameter. In the following example, the `GetRowCssClass` method is called on each row to conditionally apply a stylesheet class based on the row item:

```razor
<QuickGrid ... RowClass="GetRowCssClass">
    ...
</QuickGrid>

@code {
    private string GetRowCssClass(MyGridItem item) =>
        item.IsArchived ? "row-archived" : null;
}
```

For more information, see ASP.NET Core Blazor \`QuickGrid\` component.

### Blazor script as static web asset

In prior releases of .NET, the Blazor script is served from an embedded resource in the ASP.NET Core shared framework. In .NET 10 or later, the Blazor script is served as a static web asset with automatic compression and fingerprinting.

The Blazor script (`blazor.web.js` or `blazor.server.js`) is included by the framework if the project contains at least one Razor component file (`.razor`). If your app requires the Blazor script but doesn't contain at least one component, add the following MSBuild property to the app's project file to force unconditional script inclusion:

```xml
<RequiresAspNetWebAssets>true</RequiresAspNetWebAssets>
```

For more information, see the following resources:

* ASP.NET Core Blazor project structure
* ASP.NET Core Blazor static files

### Route template highlights

The `[Route]` attribute now supports route syntax highlighting to help visualize the structure of the route template:

### `NavigateTo` no longer scrolls to the top for same-page navigations

Previously, `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*` scrolled to the top of the page for same-page navigations. This behavior has been changed in .NET 10 so that the browser no longer scrolls to the top of the page when navigating to the same page. This means the viewport is no longer reset when making updates to the address for the current page, such as changing the query string or fragment.

### Reconnection UI component added to the Blazor Web App project template

The Blazor Web App project template now includes a `ReconnectModal` component, including collocated stylesheet and JavaScript files, for improved developer control over the reconnection UI when the client loses the WebSocket connection to the server. The component doesn't insert styles programmatically, ensuring compliance with stricter Content Security Policy (CSP) settings for the `style-src` policy. In prior releases, the default reconnection UI was created by the framework in a way that could cause CSP violations. Note that the default reconnection UI is still used as fallback when the app doesn't define the reconnection UI, such as by using the project template's `ReconnectModal` component or a similar custom component.

New reconnection UI features:

* Apart from indicating the reconnection state by setting a specific CSS class on the reconnection UI element, the new `components-reconnect-state-changed` event is dispatched for reconnection state changes.
* Code can better differentiate the stages of the reconnection process with the new reconnection state "`retrying`," indicated by both the CSS class and the new event.

For more information, see ASP.NET Core Blazor SignalR guidance.

### Ignore the query string and fragment when using `NavLinkMatch.All`

The `NavLink` component now ignores the query string and fragment when using the `NavLinkMatch.All` value for the `Match` parameter. This means that the link retains the `active` class if the URL path matches but the query string or fragment change. To revert to the original behavior, use the `Microsoft.AspNetCore.Components.Routing.NavLink.EnableMatchAllForQueryStringAndFragment` `AppContext` switch set to `true`.

You can also override the `ShouldMatch` method on `NavLink` to customize the matching behavior:

```csharp
public class CustomNavLink : NavLink
{
    protected override bool ShouldMatch(string currentUriAbsolute)
    {
        // Custom matching logic
    }
}
```

For more information, see ASP.NET Core Blazor navigation.

### Close `QuickGrid` column options

You can now close the `QuickGrid` column options UI using the new `HideColumnOptionsAsync` method.

The following example uses the `HideColumnOptionsAsync` method to close the column options UI as soon as the title filter is applied:

```razor
<QuickGrid @ref="movieGrid" Items="movies">
    <PropertyColumn Property="@(m => m.Title)" Title="Title">
        <ColumnOptions>
            <input type="search" @bind="titleFilter" placeholder="Filter by title" 
                @bind:after="@(() => movieGrid.HideColumnOptionsAsync())" />
        </ColumnOptions>
    </PropertyColumn>
    <PropertyColumn Property="@(m => m.Genre)" Title="Genre" />
    <PropertyColumn Property="@(m => m.ReleaseYear)" Title="Release Year" />
</QuickGrid>

@code {
    private QuickGrid<Movie>? movieGrid;
    private string titleFilter = string.Empty;
    private IQueryable<Movie> movies = new List<Movie> { ... }.AsQueryable();
    private IQueryable<Movie> filteredMovies => 
        movies.Where(m => m.Title!.Contains(titleFilter));
}
```

### HttpClient response streaming enabled by default

In prior Blazor releases, response streaming for `System.Net.Http.HttpClient` requests was opt-in. Now, response streaming is enabled by default.

This is a breaking change because calling `System.Net.Http.HttpContent.ReadAsStreamAsync*` for an `System.Net.Http.HttpResponseMessage.Content` (`response.Content.ReadAsStreamAsync()`) returns a `BrowserHttpReadStream` and no longer a `System.IO.MemoryStream`. `BrowserHttpReadStream` doesn't support synchronous operations, such as `Stream.Read(Span<Byte>)`. If your code uses synchronous operations, you can opt-out of response streaming or copy the `System.IO.Stream` into a `System.IO.MemoryStream` yourself.

To opt-out of response streaming globally, use either of the following approaches:

* Add the `<WasmEnableStreamingResponse>` property to the project file with a value of `false`:

  ```xml
  <WasmEnableStreamingResponse>false</WasmEnableStreamingResponse>
  ```

* Set the `DOTNET_WASM_ENABLE_STREAMING_RESPONSE` environment variable to `false` or `0`.

To opt-out of response streaming for an individual request, set `Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserResponseStreamingEnabled*` to `false` on the `System.Net.Http.HttpRequestMessage` (`requestMessage` in the following example):

```csharp
requestMessage.SetBrowserResponseStreamingEnabled(false);
```

For more information, see `HttpClient` and `HttpRequestMessage` with Fetch API request options (*Call web API* article).

### Client-side fingerprinting

The release of .NET 9 introduced server-side fingerprinting of static assets in Blazor Web Apps with the introduction of Map Static Assets routing endpoint conventions (`MapStaticAssets`), the `ImportMap` component, and the `Microsoft.AspNetCore.Components.ComponentBase.Assets` property (`@Assets["..."]`) to resolve fingerprinted JavaScript (JS) modules. For .NET 10, you can opt-into client-side fingerprinting of JS modules for standalone Blazor WebAssembly apps.

In standalone Blazor WebAssembly apps during build and publish, the framework overrides placeholders in `index.html` with values computed during build to fingerprint static assets. A fingerprint is placed into the `blazor.webassembly.js` script file name.

The following markup must be present in the `wwwroot/index.html` file to adopt the fingerprinting feature:

```diff
<head>
    ...
+   <script type="importmap"></script>
</head>

<body>
    ...
-   <script src="_framework/blazor.webassembly.js"></script>
+   <script src="_framework/blazor.webassembly#[.{fingerprint}].js"></script>
</body>

</html>
```

In the project file (`.csproj`), add the `<OverrideHtmlAssetPlaceholders>` property set to `true`:

```diff
<Project Sdk="Microsoft.NET.Sdk.BlazorWebAssembly">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
+   <OverrideHtmlAssetPlaceholders>true</OverrideHtmlAssetPlaceholders>
  </PropertyGroup>
</Project>
```

In the following example, all developer-supplied JS files are modules with a `.js` file extension.

A module named `scripts.js` in the app's `wwwroot/js` folder is fingerprinted by adding `#[.{fingerprint}]` before the file extension (`.js`):

```html
<script type="module" src="js/scripts#[.{fingerprint}].js"></script>
```

Specify the fingerprint expression with the `<StaticWebAssetFingerprintPattern>` property in the app's project file (`.csproj`):

```xml
<ItemGroup>
  <StaticWebAssetFingerprintPattern Include="JSModule" Pattern="*.js" 
    Expression="#[.{fingerprint}]!" />
</ItemGroup>
```

Any JS file (`*.js`) in `index.html` with the fingerprint marker is fingerprinted by the framework, including when the app is published.

If you adopt the `.mjs` file extension for JS modules, set the file extension with the `Pattern` parameter:

```xml
<ItemGroup>
  <StaticWebAssetFingerprintPattern Include="JSModule" Pattern="*.mjs" 
    Expression="#[.{fingerprint}]!" />
</ItemGroup>
```

Files are placed into the import map:

* Automatically for Blazor Web App client-side rendering (CSR).
* When opting-into module fingerprinting in standalone Blazor WebAssembly apps per the preceding instructions.

When resolving the import for JavaScript interop, the import map is used by the browser resolve fingerprinted files.

### Preloaded Blazor framework static assets

In Blazor Web Apps, framework static assets are automatically preloaded using `Link` headers, which allows the browser to preload resources before the initial page is fetched and rendered.

In standalone Blazor WebAssembly apps, framework assets are scheduled for high priority downloading and caching early in browser `index.html` page processing when:

* The `OverrideHtmlAssetPlaceholders` MSBuild property in the app's project file (`.csproj`) is set to `true`:

  ```xml
  <PropertyGroup>
    <OverrideHtmlAssetPlaceholders>true</OverrideHtmlAssetPlaceholders>
  </PropertyGroup>
  ```

* The following `<link>` element containing `rel="preload"` is present in the `<head>` content of `wwwroot/index.html`:

  ```html
  <link rel="preload" id="webassembly" />
  ```

For more information, see ASP.NET Core Blazor static files.

> **Note:**
> This feature is disabled for Blazor Web App enhanced navigation in .NET 11 or later. For more information, see Blazor enhanced navigation no longer preloads resources.

### Set the environment in standalone Blazor WebAssembly apps

The `Blazor-Environment` header and `Properties/launchSettings.json` file (`ASPNETCORE_ENVIRONMENT` environment variable) are no longer used to control the environment in standalone Blazor WebAssembly apps.

Starting in .NET 10, set the environment with the `<WasmApplicationEnvironmentName>` property in the app's project file (`.csproj`).

The following example sets the app's environment to `Staging`:

```xml
<WasmApplicationEnvironmentName>Staging</WasmApplicationEnvironmentName>
```

The default environments are:

* `Development` for build.
* `Production` for publish.

For more information, see ASP.NET Core Blazor environments.

### Boot configuration file inlined

Blazor's boot configuration, which prior to the release of .NET 10 existed in a file named `blazor.boot.json`, has been inlined into the `dotnet.js` script. This only affects developers who are interacting directly with the `blazor.boot.json` file, such as when developers are:

* Checking file integrity for published assets with the troubleshoot integrity PowerShell script per the guidance in ASP.NET Core Blazor WebAssembly caching and integrity check failures.
* Changing the file name extension of DLL files when not using the default Webcil file format per the guidance in Host and deploy ASP.NET Core Blazor WebAssembly.

Currently, there's no documented replacement strategy for the preceding approaches. If you require either of the preceding strategies, open a new documentation issue describing your scenario using the **Open a documentation issue** link at the bottom of either article.
