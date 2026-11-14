---
title: "Serve static files in ASP.NET Core apps (part 4 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/static-files.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Serve static files in ASP.NET Core apps (part 4 of 4)

## Map file extensions to MIME types

Use `Microsoft.AspNetCore.StaticFiles.FileExtensionContentTypeProvider.Mappings` to add or modify file extension to MIME content type mappings.

> **Note:**
> `Microsoft.AspNetCore.StaticFiles.FileExtensionContentTypeProvider` is **not thread-safe** for concurrent writes. Its internal mappings dictionary is a standard `Dictionary<string, string>` without synchronization. The provider's mappings are intended to be configured once at startup. If only read operations (lookups) are performed afterward, the provider can safely be registered as a singleton. Do not add, remove, or modify mappings after the provider is in use by concurrent requests.

In the following example, several file extensions are mapped to known MIME types. The `.rtf` extension is replaced, and `.mp4` is removed:

```csharp
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;

...

// Set up custom content types - associating file extension to MIME type
var provider = new FileExtensionContentTypeProvider();
// Add new mappings
provider.Mappings[".myapp"] = "application/x-msdownload";
provider.Mappings[".htm3"] = "text/html";
provider.Mappings[".image"] = "image/png";
// Replace an existing mapping
provider.Mappings[".rtf"] = "application/x-msdownload";
// Remove MP4 videos
provider.Mappings.Remove(".mp4");

app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = provider
});
```

When you have several static file options to configure, you can alternatively set the provider by using `Microsoft.AspNetCore.Builder.StaticFileOptions`:

```csharp
var provider = new FileExtensionContentTypeProvider();

...

builder.Services.Configure<StaticFileOptions>(options =>
{
    options.ContentTypeProvider = provider;
});

app.UseStaticFiles();
```

For more information, see MIME content types.

## Non-standard content types

The static file middleware recognizes almost 400 known file content types. If the user requests a file with an unknown file type, the static file middleware passes the request to the next middleware in the pipeline. If no middleware handles the request, the server returns a *404 Not Found* response. If directory browsing is enabled, the server displays a link to the file in a directory listing.

The following code enables serving unknown content types and renders the unknown file as an image:

```csharp
app.UseStaticFiles(new StaticFileOptions
{
    ServeUnknownFileTypes = true,
    DefaultContentType = "image/png"
});
```

With the preceding code, a request for a file with an unknown content type is returned as an image.

> **Warning:**
> Enabling `Microsoft.AspNetCore.Builder.StaticFileOptions.ServeUnknownFileTypes` is a security risk. It's disabled by default, and its use is discouraged. Map file extensions to MIME types provides a safer alternative to serving files with nonstandard extensions.

## Provide a custom static files manifest

If `staticAssetsManifestPath` is `null`, the `Microsoft.Extensions.Hosting.IHostEnvironment.ApplicationName` is used to locate the manifest. Alternatively, specify a full path to the manifest file. If you use a relative path, the framework searches for the file in the `System.AppContext.BaseDirectory`.

## Security considerations for static files

> **Warning:**
> `Microsoft.AspNetCore.Builder.DirectoryBrowserExtensions.UseDirectoryBrowser*` and `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` can leak secrets. Disabling directory browsing in production is highly recommended. Carefully review which directories are enabled via `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` or `Microsoft.AspNetCore.Builder.DirectoryBrowserExtensions.UseDirectoryBrowser*`. The entire directory and its sub-directories become publicly accessible. Store files suitable for serving to the public in a dedicated directory, such as `<content_root>/wwwroot`. Separate these files from MVC views, Razor Pages, configuration files, etc.

> **Note:**
> A file with an accessible 8.3 short-name alias can also be served through that alias. Static file middleware determines the content type from the requested path, not the resolved file name. If the alias has a recognized extension, a file whose long-name extension is unrecognized can be served even when `ServeUnknownFileTypes` is disabled. Don't rely on file extension filtering to protect private files. Keep them outside all directories served by static file middleware.

* The URLs for content exposed through `Microsoft.AspNetCore.Builder.DirectoryBrowserExtensions.UseDirectoryBrowser*` and `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` follow the case sensitivity and character restrictions of the underlying file system. For example, Windows is case insensitive, but macOS and Linux aren't.

* ASP.NET Core apps hosted in IIS use the ASP.NET Core Module to forward all requests to the app, including static file requests. The IIS static file handler isn't used and doesn't handle requests.

* Complete the following steps in IIS Manager to remove the IIS static file handler at the server or website level:

  1. Navigate to the **Modules** feature.
  1. Select **StaticFileModule** in the list.
  1. Click **Remove** in the **Actions** sidebar.

  > **Warning:**
  > If the IIS static file handler is enabled **and** the ASP.NET Core Module is configured incorrectly, static files are served. This condition occurs, for example, if the `web.config` file isn't deployed.

* Place code files, including `.cs` and `.cshtml`, outside of the app project's web root. This configuration creates a logical separation between the app's client-side content and server-based code. This separation prevents server-side code from being leaked.

## MSBuild properties

The following tables show the static files MSBuild properties and metadata descriptions.

Property | Description
--- | ---
`EnableDefaultCompressedItems` | Enables default compression include and exclude patterns.
`CompressionIncludePatterns` | Semicolon-separated list of file patterns to include for compression.
`CompressionExcludePatterns` | Semicolon-separated list of file patterns to exclude from compression. See the example below.
`CompressionEnabled` | Completely disables static asset compression when set to `false`. See the example below.
`EnableDefaultCompressionFormats` | Enables default compression formats (Gzip and Brotli).
`BuildCompressionFormats` | Compression formats to use during build.
`PublishCompressionFormats` | Compression formats to use during publish.
`DisableBuildCompression` | Disables compression during build.
`CompressDiscoveredAssetsDuringBuild` | Compresses discovered assets during build.
`BrotliCompressionLevel` | Compression level for the Brotli algorithm.
`StaticWebAssetBuildCompressAllAssets` | Compresses all assets during build, not just assets discovered or computed during a build.
`StaticWebAssetPublishCompressAllAssets` | Compresses all assets during publish, not just assets discovered or computed during a build.

The following example excludes JavaScript files from compression:

```xml
<PropertyGroup>
  <CompressionExcludePatterns>$(CompressionExcludePatterns);**\*.js</CompressionExcludePatterns>
</PropertyGroup>
```

To completely disable static asset compression:

```xml
<PropertyGroup>
  <CompressionEnabled>false</CompressionEnabled>
</PropertyGroup>
```

Property | Description
--- | ---
`StaticWebAssetBasePath` | Base URL path for all the assets in a library.
`StaticWebAssetsFingerprintContent` | Enables content fingerprinting for cache busting.
`StaticWebAssetFingerprintingEnabled` | Enables fingerprinting feature for static web assets.
`StaticWebAssetsCacheDefineStaticWebAssetsEnabled` | Enables caching for static web asset definitions.
`StaticWebAssetEndpointExclusionPattern` | Pattern for excluding endpoints.

Item group | Description | Metadata
--- | ---
`StaticWebAssetContentTypeMapping` | Maps file patterns to content types and cache headers for endpoints. | `Pattern`, `Cache`, `Priority`
`StaticWebAssetFingerprintPattern` | Defines patterns for applying fingerprints to static web assets for cache busting. | `Pattern`, `Expression`

Metadata descriptions:

* **`Pattern`**: A glob pattern used to match files. For `StaticWebAssetContentTypeMapping`, it matches files to determine their content type (for example, `*.js` for JavaScript files). For `StaticWebAssetFingerprintPattern`, it identifies multi-extension files that require special fingerprinting treatment (for example, `*.lib.module.js`).

* **`Cache`**: Specifies the `Cache-Control` header value for the matched content type. This value controls browser caching behavior (for example, `max-age=3600, must-revalidate` for media files).

* **`Priority`**: Controls precedence when multiple `StaticWebAssetContentTypeMapping` items match the same file. Higher numeric values take precedence over lower ones. `Priority` is required.

* **`Expression`**: Defines how the fingerprint is inserted into the filename. The default is `#[.{FINGERPRINT}]`, which inserts the fingerprint (`{FINGERPRINT}` placeholder) before the extension.

The following example maps the bitmap file pattern (`.bmp`) to the `image/bmp` content type with the `{CACHE HEADER}` placeholder representing the `Cache-Control` header to use for non-fingerprinted endpoints:

```xml
<ItemGroup>
  <StaticWebAssetContentTypeMapping Include="image/bmp" Cache="{CACHE HEADER}"
    Pattern="*.bmp" Priority="1" />
</ItemGroup>
```

## Runtime configuration options

The following table describes the runtime configuration options.

Configuration key | Description
--- | ---
`ReloadStaticAssetsAtRuntime` | Enables dev-time hot reloading of static assets: serves modified web root (`wwwroot`) files (recomputes `ETag`, recompresses if required) instead of build-time manifest versions. Defaults to enabled only when serving a build manifest unless explicitly set.
`DisableStaticAssetNotFoundRuntimeFallback` | When `true`, suppresses the fallback endpoint that serves newly added files not present in the build manifest. When `false` or absent, a file-exists-checked `{**path}` fallback (GET/HEAD) logs a warning and serves the file with a computed `ETag`.
`EnableStaticAssetsDevelopmentCaching` | When `true`, preserves the original `Cache-Control` headers on asset descriptors. When `false` or absent, rewrites `Cache-Control` headers to `no-cache` to avoid aggressive client caching during development.
`EnableStaticAssetsDevelopmentIntegrity` | When `true`, keeps integrity properties on asset descriptors. When `false` or absent, removes any integrity property to prevent mismatches when files change during development.

## Related content

* ASP.NET Core Blazor static files
* ASP.NET Core middleware
