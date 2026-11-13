---
title: "Serve static files in ASP.NET Core apps (part 1 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/static-files.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Serve static files in ASP.NET Core apps

-->
-->

Learn how to serve, secure, and optimize static files in ASP.NET Core apps by using Map Static Assets endpoint conventions or static file middleware. Static files, also called static assets, aren't dynamically generated and are served directly to clients, including HTML, CSS, images, and JavaScript.

For Blazor static files guidance, which adds to or supersedes the guidance in this article, see ASP.NET Core Blazor static files.

To enable static file handling in ASP.NET Core, call `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*`.

By default, store static files within the project's web root directory. The default directory is `{CONTENT ROOT}/wwwroot`, where the `{CONTENT ROOT}` placeholder is the app's content root. Only files in the `wwwroot` folder are addressable, so you don't need to worry about the rest of your code.

Only files with specific file extensions mapped to supported media types are treated as static web assets.

Static web assets are discovered at build time and optimized using content-based fingerprinting to prevent the reuse of old files. Assets are also compressed to reduce asset delivery time.

At runtime, the discovered static web assets are exposed as endpoints with HTTP headers applied, such as caching headers and content type headers. An asset is served once until the file changes or the browser clears its cache. The `ETag`, `Last-Modified`, and `Content-Type` headers are set. The browser is prevented from using stale assets after an app is updated.

Delivery of static assets is based on endpoint routing, so it works with other endpoint-aware features, such as authorization. It's designed to work with all UI frameworks, including Blazor, Razor Pages, and MVC.

Map Static Assets provides the following benefits:

* Build-time compression for all the assets in the app, including JavaScript (JS) and stylesheets but excluding image and font assets that are already compressed. Gzip (`Content-Encoding: gz`) compression is used during development. Gzip and Brotli (`Content-Encoding: br`) compression are both used during publish.
* Fingerprinting for all assets at build time with a Base64-encoded string of the SHA-256 hash of each file's content. This prevents reusing an old version of a file, even if the old file is cached. Fingerprinted assets are cached using the `immutable` directive, which results in the browser never requesting the asset again until it changes. For browsers that don't support the `immutable` directive, a `max-age` directive is added.
  * Even if an asset isn't fingerprinted, content based `ETags` are generated for each static asset using the fingerprint hash of the file as the `ETag` value. This ensures that the browser only downloads a file if its content changes (or the file is being downloaded for the first time).
  * Internally, the framework maps physical assets to their fingerprints, which allows the app to:
    * Find automatically generated assets, such as Razor component scoped CSS for Blazor's CSS isolation feature and JS assets described by JS import maps.
    * Generate link tags in the `<head>` content of the page to preload assets.

Map Static Assets doesn't provide features for minification or other file transformations. Minification is usually handled by custom code or third-party tooling.

> **Note:**
> `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*` doesn't serve default documents on its own. To serve default documents, call `Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles*` followed by `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*`. For more information, see the Serve default documents section.

You can also serve static web assets from referenced projects and packages.

## Change the web root directory

To change the web root, use the `Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseWebRoot*` method. For more information, see ASP.NET Core fundamentals overview.

Prevent publishing files in `wwwroot` by using the `<Content>` project item in the project file. The following example prevents publishing content in `wwwroot/local` and its subdirectories:

```xml
<ItemGroup>
  <Content Update="wwwroot\local\**\*.*" CopyToPublishDirectory="Never" />
</ItemGroup>
```

The `Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder*` method sets the content root to the current directory:

```csharp
var builder = WebApplication.CreateBuilder(args);
```

In the request processing pipeline, after the call to `Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection*`, call `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*` to enable serving static files from the app's web root:

```csharp
app.MapStaticAssets();
```

Static files are accessible via a path relative to the web root.

To access an image at `wwwroot/images/favicon.png`:

* URL format: `https://{HOST}/images/{FILE NAME}`
  * The `{HOST}` placeholder is the host.
  * The `{FILE NAME}` placeholder is the file name.
* Examples
  * Absolute URL: `https://localhost:5001/images/favicon.png`
  * Root relative URL: `images/favicon.png`

In a Blazor app, `images/favicon.png` loads the icon image (`favicon.png`) from the app's `wwwroot/images` folder:

```razor
<link rel="icon" type="image/png" href="images/favicon.png" />
```

In Razor Pages and MVC apps, the tilde character `~` points to the web root. In the following example, `~/images/favicon.png` loads the icon image (`favicon.png`) from the app's `wwwroot/images` folder:

```cshtml
<link rel="icon" type="image/png" href="~/images/favicon.png" />
```

## Short-circuit the middleware pipeline

To avoid running the entire middleware pipeline after a static asset is matched, which is the behavior of `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*`, call `Microsoft.AspNetCore.Builder.RouteShortCircuitEndpointConventionBuilderExtensions.ShortCircuit*` on `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*`. Calling `Microsoft.AspNetCore.Builder.RouteShortCircuitEndpointConventionBuilderExtensions.ShortCircuit*` immediately executes the endpoint and returns the response, preventing other middleware from executing for static asset requests:

```csharp
app.MapStaticAssets().ShortCircuit();
```

## Control static file caching during development

When running in the `Development` environment, for example during Visual Studio Hot Reload development testing, the framework overrides cache headers to prevent browsers from caching static files. This behavior helps ensure that the latest version of files are used when files change, avoiding issues with stale content. In production, the framework sets the correct cache headers, so browsers can cache static assets as expected.

To disable this behavior, set `EnableStaticAssetsDevelopmentCaching` to `true` in the `Development` environment's app setting file (`appsettings.Development.json`).

## Static files in non-`Development` environments

When running an app locally, the `Development` environment is the only environment that enables static web assets. To enable static files for environments other than `Development` during local development and testing (for example, in the `Staging` environment), call `Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseStaticWebAssets*` on the `Microsoft.AspNetCore.Builder.WebApplicationBuilder`.

> **Warning:**
> Call `Microsoft.AspNetCore.Hosting.WebHostBuilderExtensions.UseStaticWebAssets*` for the ***exact environment*** to prevent activating the feature in production, as it serves files from separate locations on disk *other than from the project*. The example in this section checks for the `Staging` environment with `Microsoft.Extensions.Hosting.HostEnvironmentEnvExtensions.IsStaging*`.

```csharp
if (builder.Environment.IsStaging())
{
    builder.WebHost.UseStaticWebAssets();
}
```

## Serve files outside of the web root directory via `IWebHostEnvironment.WebRootPath`

When you set `Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath` to a folder other than `wwwroot`, the app exhibits the following default behaviors:

* In the `Development` environment, static assets are served from `wwwroot` if assets with the same name are in both `wwwroot` and a different folder assigned to `Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath`.
* In any environment other than `Development`, duplicate static assets are served from the `Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath` folder.

Consider a web app created from the empty web template:

* Containing an `Index.html` file in `wwwroot` and `wwwroot-custom`.
* The `Program` file is updated to set `WebRootPath = "wwwroot-custom"`.

```csharp
var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    WebRootPath = "wwwroot-custom"
});
```

By default, for requests to `/`:

* In the `Development` environment, `wwwroot/Index.html` is returned.
* In any environment other than `Development`, `wwwroot-custom/Index.html` is returned.

To ensure assets from `wwwroot-custom` are always returned, use ***one*** of the following approaches:

* Delete duplicate-named assets in `wwwroot`.

* Set `ASPNETCORE_ENVIRONMENT` in `Properties/launchSettings.json` to any value other than `Development`.

* Disable static web assets by setting `<StaticWebAssetsEnabled>` to `false` in the app's project file. ***WARNING:*** Disabling static web assets disables Razor class libraries.

* Add the following XML to the project file:

  ```xml
  <ItemGroup>
    <Content Remove="wwwroot\**" />
  </ItemGroup>
  ```

The following code updates `Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath` to a non-Development value (`Staging`), guaranteeing duplicate content is returned from `wwwroot-custom` rather than `wwwroot`:

```csharp
var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    EnvironmentName = Environments.Staging,
    WebRootPath = "wwwroot-custom"
});
```

## Static file middleware

Static file middleware enables static file serving in specific static files scenarios, usually in addition to Map Static Assets endpoint routing conventions (`Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*`).

Include static file middleware in request processing when you call `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` in the app's request processing pipeline, typically after adding Map Static Assets endpoint conventions (`Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*`).

Use Map Static Assets endpoint conventions in apps that target .NET 9 or later. Use static file middleware in apps that target versions of .NET prior to .NET 9.

Static file middleware serves static files, but it doesn't provide the same level of optimization as Map Static Assets endpoint conventions. The build-time compression and fingerprinting features of Map Static Assets endpoint conventions aren't available when you rely only on static file middleware.

The endpoint conventions are optimized for serving assets that the app knows about at runtime. If the app serves assets from other locations, such as disk or embedded resources, use static file middleware.

The following features covered in this article are supported with static file middleware but not with Map Static Assets endpoint conventions:

* Serve files outside of the web root directory
* Set HTTP response headers
* Serving files from disk or embedded resources, or other locations
* Directory browsing
* Serve default documents (with `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*`, requires a call to `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*`)
* Combine static files, default documents, and directory browsing
* Map file extensions to MIME types
* Serving non-standard content types

## Serve files outside of the web root directory via `UseStaticFiles`

Consider the following directory hierarchy with static files residing outside of the app's web root in a folder named `ExtraStaticFiles`:

* `wwwroot`
  * `css`
  * `images`
  * `js`
* `ExtraStaticFiles`
  * `images`
    * `red-rose.jpg`

A request can access `red-rose.jpg` by configuring a new instance of static file middleware:

Namespaces for the following API:

```csharp
using Microsoft.Extensions.FileProviders;
```

In the request processing pipeline, after the existing call to either `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*` (.NET 9 or later) or `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` (.NET 8 or earlier):

```csharp
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "ExtraStaticFiles")),
    RequestPath = "/static-files"
});
```

In the preceding code, the `ExtraStaticFiles` directory hierarchy is publicly accessible through the `static-files` URL segment. A request to `https://{HOST}/StaticFiles/images/red-rose.jpg`, where the `{HOST}` placeholder is the host, serves the `red-rose.jpg` file.

The following markup references `ExtraStaticFiles/images/red-rose.jpg`:

```html
<img src="static-files/images/red-rose.jpg" alt="A red rose" />
```

For the preceding example, Razor Pages and MVC views support tilde-slash notation (`src="~/StaticFiles/images/red-rose.jpg"`), but Razor components in Blazor apps don't support this notation.
