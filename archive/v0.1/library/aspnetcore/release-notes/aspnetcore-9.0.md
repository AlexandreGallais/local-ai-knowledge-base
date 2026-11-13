---
title: "What's new in ASP.NET Core in .NET 9 (part 1 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-9.0.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 9

This article highlights the most significant changes in ASP.NET Core in .NET 9 with links to relevant documentation.

## Static asset delivery optimization

`MapStaticAssets` routing endpoint conventions is a new feature that optimizes the delivery of static assets in ASP.NET Core apps.

For information on static asset delivery for Blazor apps, see ASP.NET Core Blazor static files.

Following production best practices for serving static assets requires a significant amount of work and technical expertise. Without optimizations like compression, caching, and fingerprints:

* The browser has to make additional requests on every page load.
* More bytes than necessary are transferred through the network.
* Sometimes stale versions of files are served to clients.

Creating performant web apps requires optimizing asset delivery to the browser. Possible optimizations include:

* Serve a given asset once until the file changes or the browser clears its cache. Set the ETag header.
* Prevent the browser from using old or stale assets after an app is updated. Set the Last-Modified header.
* Set up proper caching headers.
* Use caching middleware.
* Serve compressed versions of the assets when possible.
* Use a CDN to serve the assets closer to the user.
* Minimize the size of assets served to the browser. This optimization doesn't include minification.

`Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*` is a new feature that optimizes the delivery of static assets in an app. It's designed to work with all UI frameworks, including Blazor, Razor Pages, and MVC. It's typically a drop-in replacement for `UseStaticFiles`:

```diff
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

+app.MapStaticAssets();
-app.UseStaticFiles();
app.MapRazorPages();

app.Run();
```

`MapStaticAssets` operates by combining build and publish-time processes to collect information about all the static resources in an app. This information is then utilized by the runtime library to efficiently serve these files to the browser.

`MapStaticAssets` can replace `UseStaticFiles` in most situations, however, it's optimized for serving the assets that the app has knowledge of at build and publish time. If the app serves assets from other locations, such as disk or embedded resources, `UseStaticFiles` should be used.

`MapStaticAssets` provides the following benefits not found with `UseStaticFiles`:

* Build time compression for all the assets in the app:
  * `gzip` during development and `gzip + brotli` during publish.
  * All assets are compressed with the goal of reducing the size of the assets to the minimum.
* Content based `ETags`: The `Etags` for each resource are the Base64 encoded string of the SHA-256 hash of the content. This ensures that the browser only redownloads a file if its contents have changed.

The following table shows the original and compressed sizes of the CSS and JS files in the default Razor Pages template.

File | Original | Compressed | % Reduction
-- | -- | --
bootstrap.min.css | 163 | 17.5 | 89.26%
jquery.js | 89.6 | 28 | 68.75%
bootstrap.min.js | 78.5 | 20 | 74.52%
**Total** | 331.1 | 65.5 | 80.20%

The following table shows the original and compressed sizes using the Fluent UI Blazor components library.

File | Original | Compressed | % Reduction
-- | -- | -- | --
fluent.js | 384 | 73 | 80.99%
fluent.css | 94 | 11 | 88.30%
**Total** | 478 | 84 | 82.43%

For a total of 478 KB uncompressed to 84 KB compressed.

The following table shows the original and compressed sizes using the MudBlazor Blazor components library.

File | Original | Compressed | Reduction
-- | -- | -- | --
MudBlazor.min.css | 541 | 37.5 | 93.07%
MudBlazor.min.js | 47.4 | 9.2 | 80.59%
**Total** | 588.4 | 46.7 | 92.07%

Optimization happens automatically when using `MapStaticAssets`. When a library is added or updated, for example with new JavaScript or CSS, the assets are optimized as part of the build. Optimization is especially beneficial to mobile environments that can have a lower bandwidth or an unreliable connections.

For more information on the new file delivery features, see the following resources:

* Serve static files in ASP.NET Core apps
* ASP.NET Core Blazor static files

### Customize build-time compression with MSBuild properties

Several MSBuild properties can be used to customize or disable build-time compression behavior:

* `CompressionEnabled`: Completely disables compression when set to `false`.
* `CompressionExcludePatterns`: Semicolon-delimited list of glob patterns (for example, `**\*.js`) to exclude specific files from being considered for compression.

The following example excludes JavaScript files from compression:

```xml
<PropertyGroup>
  <CompressionExcludePatterns>$(CompressionExcludePatterns);**\*.js</CompressionExcludePatterns>
</PropertyGroup>
```

To completely disable compression:

```xml
<PropertyGroup>
  <CompressionEnabled>false</CompressionEnabled>
</PropertyGroup>
```

For more information, see Serve static files in ASP.NET Core apps.

### Enabling dynamic compression on the server vs using `MapStaticAssets`

`MapStaticAssets` has the following advantages over dynamic compression on the server:

* Is simpler because there is no server specific configuration.
* Is more performant because the assets are compressed at build time.
* Allows the developer to spend extra time during the build process to ensure that the assets are the minimum size.

Consider the following table comparing MudBlazor compression with IIS dynamic compression and `MapStaticAssets`.

IIS gzip | `MapStaticAssets` | `MapStaticAssets` reduction
-- | -- | --
 &#8773; 90 | 37.5 | 59%
