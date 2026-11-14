---
title: "Serve static files in ASP.NET Core apps (part 2 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/static-files.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Serve static files in ASP.NET Core apps (part 2 of 4)

## Serve files from multiple locations

*The guidance in this section applies to Razor Pages and MVC apps. For guidance that applies to Blazor Web Apps, see ASP.NET Core Blazor static files.*

Consider the following markup that displays a company logo:

```html
<img src="~/logo.png" asp-append-version="true" alt="Company logo">
```

The developer intends to use the Image Tag Helper to append a version and serve the file from a custom location, a folder named `ExtraStaticFiles`.

The following example calls `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*` to serve files from `wwwroot` and `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` to serve files from `ExtraStaticFiles`:

In the request processing pipeline, after the existing call to either `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*` (.NET 9 or later) or `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` (.NET 8 or earlier):

```csharp
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "ExtraStaticFiles"))
});
```

Using the preceding code, the `ExtraStaticFiles/logo.png` file is displayed. However, the Image Tag Helper (`Microsoft.AspNetCore.Mvc.TagHelpers.ImageTagHelper.AppendVersion`) isn't applied because the Tag Helper depends on `Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootFileProvider`, which hasn't been updated to include the `ExtraStaticFiles` folder.

The following code updates the `Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootFileProvider` to include the `ExtraStaticFiles` folder by using a `Microsoft.Extensions.FileProviders.CompositeFileProvider`. This enables the Image Tag Helper to apply a version to images in the `ExtraStaticFiles` folder.

Namespace for the following API:

```csharp
using Microsoft.Extensions.FileProviders;
```

In the request processing pipeline before the existing call to `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*` (.NET 9 or later) or `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` (.NET 8 or earlier):

```csharp
var webRootProvider = new PhysicalFileProvider(builder.Environment.WebRootPath);
var newPathProvider = new PhysicalFileProvider(
    Path.Combine(builder.Environment.ContentRootPath, "ExtraStaticFiles"));

var compositeProvider = new CompositeFileProvider(webRootProvider, newPathProvider);

app.Environment.WebRootFileProvider = compositeProvider;
```

`Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` and `Microsoft.AspNetCore.Builder.FileServerExtensions.UseFileServer*` default to the file provider pointing at `wwwroot`. You can provide additional instances of `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` and `Microsoft.AspNetCore.Builder.FileServerExtensions.UseFileServer*` with other file providers to serve files from other locations. For more information, see UseStaticFiles still needed with UseFileServer for wwwroot (`dotnet/AspNetCore.Docs` #15578).

## Set HTTP response headers

Use `Microsoft.AspNetCore.Builder.StaticFileOptions` to set HTTP response headers. In addition to configuring static file middleware to serve static files, the following code sets the `Cache-Control` header to 604,800 seconds (one week).

Namespaces for the following API:

```csharp
using Microsoft.AspNetCore.Http;
```

In the request processing pipeline, after the existing call to either `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*` (.NET 9 or later) or `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` (.NET 8 or earlier):

```csharp
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        ctx.Context.Response.Headers.Append(
            "Cache-Control", "public, max-age=604800");
    }
});
```

## Large collection of assets

When you deal with large collections of assets, which is around 1,000 or more assets, use a bundler to reduce the final number of assets your app serves or combine `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*` with `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*`.

`Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*` eagerly loads the precomputed metadata captured during the build process for the resources in order to support compression, caching, and fingerprinting. These features come at the cost of greater memory usage by the app. For assets that are frequently accessed, it's usually worth the costs. For assets that aren't frequently accessed, the trade-off might not be worth the costs.

If you don't use bundling, combine `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*` with `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*`. The following example demonstrates the approach.

In the project file (`.csproj`), the `StaticWebAssetEndpointExclusionPattern` MSBuild property is used to filter endpoints from the final manifest for `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*`. Excluded files are served by `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` and don't benefit from compression, caching, and fingerprinting.

To keep the framework's default exclusion pattern, retain `$(StaticWebAssetEndpointExclusionPattern)` when setting the value of `StaticWebAssetEndpointExclusionPattern`. Add more patterns in a semicolon-separated list.

In the following example, the exclusion pattern adds the static files in the `lib/icons` folder, which represents a hypothetical batch of icons:

```xml
<StaticWebAssetEndpointExclusionPattern>
  $(StaticWebAssetEndpointExclusionPattern);lib/icons/**
</StaticWebAssetEndpointExclusionPattern>
```

After HTTPS redirection middleware (`app.UseHttpsRedirection();`) processing in the `Program` file:

* Call `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` to handle the excluded files (`lib/icons/**`) and any other files not covered by `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*`.
* Call `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*` after `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` to handle critical application files (CSS, JS, images).

```csharp
app.UseStaticFiles();

app.UseAuthorization();

app.MapStaticAssets();
```

## Static assets manifest

`Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*` serves assets from a *static assets manifest* rather than by scanning the web root at runtime. The manifest is generated at build and publish time and records the static web assets discovered for the app, along with metadata such as content fingerprints, `Content-Type` headers, caching headers, and the precomputed compressed representations (Gzip and Brotli). At runtime, `MapStaticAssets` reads the manifest, registers an endpoint for each asset, and serves the optimized responses.

The build process generates the manifest in the build output directory. Its file name is based on the project's assembly name (for example, `{ASSEMBLY NAME}.staticwebassets.endpoints.json`, where the `{ASSEMBLY NAME}` placeholder is the app's MSBuild `AssemblyName` value). To provide a manifest from a different location, see the Provide a custom static files manifest section.

Because `MapStaticAssets` only serves assets listed in the manifest, it doesn't serve files that aren't part of the manifest. Files aren't part of the manifest when they're:

* Located outside the build-time web root, such as files served from disk, embedded resources, or a custom `Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath` set at runtime.
* Excluded from the manifest with the `StaticWebAssetEndpointExclusionPattern` MSBuild property (see the Large collection of assets section).

To serve files that aren't in the manifest, call `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*`, which serves files directly from the web root at runtime. This is also why serving default documents with `MapStaticAssets` requires a call to `UseStaticFiles`.

## Integrate build-generated files into static web assets

Build tools, such as TypeScript compilers and JavaScript bundlers, often produce files during the build. To serve these generated files with the fingerprinting, compression, and caching that `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*` provides, the files must be discovered as static web assets during the build. Generated files are usually kept outside of the web root (`wwwroot`) and excluded from source control, so they aren't discovered as static web assets by default. Only files resolved as being under `wwwroot` when static web assets are resolved during the build are added to the static assets manifest and served by `MapStaticAssets`. Files linked into `wwwroot` (for example, with a `<Content>` item and a `Link`) are also included, even when the source file is stored outside of `wwwroot`.

To include build-generated files as static web assets, use either of the following approaches.

### Link generated files into the web root

Add a `<Content>` item with a `Link` that places each generated file under `wwwroot`. A file that's linked into `wwwroot` is discovered by the static web assets pipeline and served by `MapStaticAssets` with fingerprinting, compression, and caching, even though the source file is stored outside of `wwwroot`.

In the following example, a build step generates `main.js` in a `generated` folder, and the `<Content>` item links the file into `wwwroot`:

```xml
<ItemGroup>
  <Content Include="generated\main.js" Link="wwwroot\main.js"
    CopyToOutputDirectory="PreserveNewest" />
</ItemGroup>
```

The generated file must exist when the build process resolves static web assets.

### Use a JavaScript project for complex build pipelines

For a complex JavaScript or TypeScript client build, use a separate JavaScript project that builds the client assets with the JavaScript project system (the `Microsoft.VisualStudio.JavaScript.Sdk` MSBuild SDK and an `.esproj` project file). Reference the JavaScript project from the ASP.NET Core app so that its output is consumed as static web assets. For an example, see the `Microsoft.FluentUI.AspNetCore.Components.Scripts.esproj` project file.
