---
title: "ASP.NET Core Blazor static files (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/fundamentals/static-files.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor static files

This article describes Blazor app configuration for serving static files.

For general information on serving static files with Map Static Assets routing endpoint conventions, see Serve static files in ASP.NET Core apps before reading this article.

## Preloaded Blazor framework static assets

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

> **Note:**
> Blazor Web App enhanced navigation doesn't attempt to preload resources in .NET 11 or later. For more information, see Blazor enhanced navigation no longer preloads resources.

## Static asset delivery in server-side Blazor apps

Serving static assets is managed by either routing endpoint conventions or a middleware described in the following table.

Feature | API | .NET Version | Description
--- | --- | :---: | ---
Map Static Assets routing endpoint conventions | `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*` | .NET 9 or later | Optimizes the delivery of static assets to clients.
Static file middleware | `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` | All .NET versions | Serves static assets to clients without the optimizations of Map Static Assets but useful for some tasks that Map Static Assets isn't capable of managing.

Map Static Assets can replace `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` in most situations. However, Map Static Assets is optimized for serving the assets from known locations in the app at build and publish time. If the app serves assets from other locations, such as disk or embedded resources, `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` should be used.

Map Static Assets (`Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*`) also replaces calling `Microsoft.AspNetCore.Builder.ComponentsWebAssemblyApplicationBuilderExtensions.UseBlazorFrameworkFiles*` in apps that serve Blazor WebAssembly framework files, and explicitly calling `Microsoft.AspNetCore.Builder.ComponentsWebAssemblyApplicationBuilderExtensions.UseBlazorFrameworkFiles*` in a Blazor Web App isn't necessary because the API is automatically called when invoking `Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddInteractiveWebAssemblyComponents*`.

When Interactive WebAssembly or Interactive Auto render modes are enabled:

* Blazor creates an endpoint to expose the resource collection as a JS module.
* The URL is emitted to the body of the request as persisted component state when a WebAssembly component is rendered into the page.
* During WebAssembly boot, Blazor retrieves the URL, imports the module, and calls a function to retrieve the asset collection and reconstruct it in memory. The URL is specific to the content and cached forever, so this overhead cost is only paid once per user until the app is updated.
* The resource collection is also exposed at a human-readable URL (`_framework/resource-collection.js`), so JS has access to the resource collection for enhanced navigation or to implement features of other frameworks and third-party components.

Static file middleware (`Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*`) is useful in the following situations that Map Static Assets (`Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*`) can't handle:

* Serving files from disk that aren't part of the build or publish process, for example, files added to the application folder during or after deployment.
* Applying a path prefix to Blazor WebAssembly static asset files, which is covered in the Prefix for Blazor WebAssembly assets section.
* Configuring file mappings of extensions to specific content types and setting static file options, which is covered in the File mappings and static file options section.

For more information, see Serve static files in ASP.NET Core apps.

## Deliver assets with Map Static Assets routing endpoint conventions

*This section applies to server-side Blazor apps.*

Assets are delivered via the `Microsoft.AspNetCore.Components.ComponentBase.Assets` property, which resolves the fingerprinted URL for a given asset. In the following example, Bootstrap, the Blazor project template app stylesheet (`app.css`), and the CSS isolation stylesheet (based on an app's namespace of `BlazorSample`) are linked in a root component, typically the `App` component (`Components/App.razor`):

```razor
<link rel="stylesheet" href="@Assets["bootstrap/bootstrap.min.css"]" />
<link rel="stylesheet" href="@Assets["app.css"]" />
<link rel="stylesheet" href="@Assets["BlazorSample.styles.css"]" />
```

## `ImportMap` component

*This section applies to Blazor Web Apps that call `Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents*`.*

The `ImportMap` component (`Microsoft.AspNetCore.Components.ImportMap`) represents an import map element (``) that defines the import map for module scripts. The Import Map component is placed in `<head>` content of the root component, typically the `App` component (`Components/App.razor`).

```razor
<ImportMap />
```

If a custom `Microsoft.AspNetCore.Components.ImportMapDefinition` isn't assigned to an Import Map component, the import map is generated based on the app's assets.

> **Note:**
> `Microsoft.AspNetCore.Components.ImportMapDefinition` instances are expensive to create, so we recommended caching them when creating an additional instance.

The following examples demonstrate custom import map definitions and the import maps that they create.

Basic <example-value> map:

```csharp
new ImportMapDefinition(
    new Dictionary<string, string>
    {
        { "jquery", "https://cdn.example.com/jquery.js" },
    },
    null,
    null);
```

The preceding code results in the following import map:

```json
{
  "imports": {
    "jquery": "https://cdn.example.com/jquery.js"
  }
}
```

Scoped import map:

```csharp
new ImportMapDefinition(
    null,
    new Dictionary<string, IReadOnlyDictionary<string, string>>
    {
        ["/scoped/"] = new Dictionary<string, string>
        {
            { "jquery", "https://cdn.example.com/jquery.js" },
        }
    },
    null);
```

The preceding code results in the following import map:

```json
{
  "scopes": {
    "/scoped/": {
      "jquery": "https://cdn.example.com/jquery.js"
    }
  }
}
```

Import map with integrity:

```csharp
new ImportMapDefinition(
    new Dictionary<string, string>
    {
        { "jquery", "https://cdn.example.com/jquery.js" },
    },
    null,
    new Dictionary<string, string>
    {
        { "https://cdn.example.com/jquery.js", "sha384-abc123" },
    });
```

The preceding code results in the following import map:

```json
{
  "imports": {
    "jquery": "https://cdn.example.com/jquery.js"
  },
  "integrity": {
    "https://cdn.example.com/jquery.js": "sha384-abc123"
  }
}
```

Combine import map definitions (`Microsoft.AspNetCore.Components.ImportMapDefinition`) with `Microsoft.AspNetCore.Components.ImportMapDefinition.Combine*`.

Import map created from a `Microsoft.AspNetCore.Components.ResourceAssetCollection` that maps static assets to their corresponding unique URLs:

```csharp
ImportMapDefinition.FromResourceCollection(
    new ResourceAssetCollection(
    [
        new ResourceAsset(
            "jquery.fingerprint.js",
            [
                new ResourceAssetProperty("integrity", "sha384-abc123"),
                new ResourceAssetProperty("label", "jquery.js"),
            ])
    ]));
```

The preceding code results in the following import map:

```json
{
  "imports": {
    "./jquery.js": "./jquery.fingerprint.js"
  },
  "integrity": {
    "jquery.fingerprint.js": "sha384-abc123"
  }
}
```

## Import map Content Security Policy (CSP) violations

*This section applies to Blazor Web Apps that call `Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents*`.*

The `ImportMap` component is rendered as an inline `<script>` tag, which violates a strict Content Security Policy (CSP) that sets the `default-src` or `script-src` directive.

For examples of how to address the policy violation with Subresource Integrity (SRI) or a cryptographic nonce, see Resolving CSP violations with Subresource Integrity (SRI) or a nonce.

## Fingerprint client-side static assets in standalone Blazor WebAssembly apps

In standalone Blazor WebAssembly apps during build and publish, the framework overrides placeholders in `index.html` with values computed during build to fingerprint static assets for client-side rendering. A fingerprint is placed into the `blazor.webassembly.js` script file name, and an import map is generated for other .NET assets.

The following configuration must be present in the `wwwwoot/index.html` file of a standalone Blazor WebAssembly app to adopt fingerprinting:

```html
<head>
    ...
    <script type="importmap"></script>
    ...
</head>

<body>
    ...
    <script src="_framework/blazor.webassembly#[.{fingerprint}].js"></script>
    ...
</body>

</html>
```

In the project file (`.csproj`), the `<OverrideHtmlAssetPlaceholders>` property is set to `true`:

```xml
<PropertyGroup>
  <OverrideHtmlAssetPlaceholders>true</OverrideHtmlAssetPlaceholders>
</PropertyGroup>
```

When resolving imports for JavaScript interop, the import map is used by the browser resolve fingerprinted files.

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

## Fingerprint client-side static assets in Blazor Web Apps

For client-side rendering (CSR) in Blazor Web Apps (Interactive Auto or Interactive WebAssembly render modes), static asset server-side fingerprinting is enabled by adopting Map Static Assets routing endpoint conventions (`MapStaticAssets`), `ImportMap` component, and the `Microsoft.AspNetCore.Components.ComponentBase.Assets` property (`@Assets["..."]`). For more information, see Serve static files in ASP.NET Core apps.

To fingerprint additional JavaScript modules for CSR, use the `<StaticWebAssetFingerprintPattern>` item in the app's project file (`.csproj`). In the following example, a fingerprint is added for all developer-supplied `.mjs` files in the app:

```xml
<ItemGroup>
  <StaticWebAssetFingerprintPattern Include="JSModule" Pattern="*.mjs" 
    Expression="#[.{fingerprint}]!" />
</ItemGroup>
```

When resolving imports for JavaScript interop, the import map is used by the browser resolve fingerprinted files.

## Summary of static file `<link>` `href` formats

*This section applies to all .NET releases and Blazor apps.*

The following tables summarize static file `<link>` `href` formats by .NET release.

For the location of `<head>` content where static file links are placed, see ASP.NET Core Blazor project structure. Static asset links can also be supplied using `<HeadContent>` components in individual Razor components.

### .NET 9 or later

App type | `href` value | Examples
--- | --- | ---
Blazor Web App | `@Assets["{PATH}"]` | `<link rel="stylesheet" href="@Assets["app.css"]" />``<link href="@Assets["_content/ComponentLib/styles.css"]" rel="stylesheet" />`
Blazor Server&dagger; | `@Assets["{PATH}"]` | `<link href="@Assets["css/site.css"]" rel="stylesheet" />``<link href="@Assets["_content/ComponentLib/styles.css"]" rel="stylesheet" />`
Standalone Blazor WebAssembly | `{PATH}` | `<link rel="stylesheet" href="css/app.css" />``<link href="_content/ComponentLib/styles.css" rel="stylesheet" />`

### .NET 8.x

App type | `href` value | Examples
--- | --- | ---
Blazor Web App | `{PATH}` | `<link rel="stylesheet" href="app.css" />``<link href="_content/ComponentLib/styles.css" rel="stylesheet" />`
Blazor Server&dagger; | `{PATH}` | `<link href="css/site.css" rel="stylesheet" />``<link href="_content/ComponentLib/styles.css" rel="stylesheet" />`
Standalone Blazor WebAssembly | `{PATH}` | `<link rel="stylesheet" href="css/app.css" />``<link href="_content/ComponentLib/styles.css" rel="stylesheet" />`

### .NET 7.x or earlier

App type | `href` value | Examples
--- | --- | ---
Blazor Server&dagger; | `{PATH}` | `<link href="css/site.css" rel="stylesheet" />``<link href="_content/ComponentLib/styles.css" rel="stylesheet" />`
Hosted Blazor WebAssembly&Dagger; | `{PATH}` | `<link href="css/app.css" rel="stylesheet" />``<link href="_content/ComponentLib/styles.css" rel="stylesheet" />`
Blazor WebAssembly | `{PATH}` | `<link href="css/app.css" rel="stylesheet" />``<link href="_content/ComponentLib/styles.css" rel="stylesheet" />`

&dagger;Blazor Server is supported in .NET 8 or later but is no longer a project template after .NET 7.
&Dagger;We recommend updating Hosted Blazor WebAssembly apps to Blazor Web Apps when adopting .NET 8 or later.
