---
title: "Serve static files in ASP.NET Core apps (part 3 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/static-files.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Serve static files in ASP.NET Core apps (part 3 of 4)

## Static file authorization

When an app adopts a fallback authorization policy, it requires authorization for requests processed by authorization middleware when no policy is produced from authorization metadata. This requirement includes requests for static assets mapped as endpoints. To allow anonymous access to static assets, apply `Microsoft.AspNetCore.Authorization.AllowAnonymousAttribute` to the endpoint builder:

```csharp
app.MapStaticAssets().Add(endpointBuilder =>
    endpointBuilder.Metadata.Add(new AllowAnonymousAttribute()));
```

> **Warning:**
> Don't store files that require authorization in `wwwroot` and rely only on `MapStaticAssets().RequireAuthorization()` to protect them. Map Static Assets endpoint conventions apply only to assets in the static web assets manifest, which is generated at build time. They don't protect other files that can be served from `wwwroot`, such as files added after the build.
>
> To protect files, use one of the following approaches:
>
> * Store protected files outside `wwwroot` and serve them through an authorized endpoint or through a `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` instance placed after `Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization*`.
> * Configure `Microsoft.AspNetCore.Authorization.AuthorizationOptions.FallbackPolicy` to require authenticated users by default for all endpoints that don't specify explicit authorization metadata. Endpoints that must remain anonymous, such as login endpoints, must opt out by applying `Microsoft.AspNetCore.Authorization.AllowAnonymousAttribute`.

To serve static files based on authorization:

* Confirm that the app sets the fallback authorization policy to require authenticated users.
* Store the static file outside of the app's web root.
* After calling `Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization*`, call `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*`, specifying the path to the static files folder outside of the web root.

Namespaces for the following API:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/static-files/6.0/StaticFileAuth/Program.cs._
Service registration:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/static-files/6.0/StaticFileAuth/Program.cs._
In the request processing pipeline after the call to `Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization*`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/static-files/6.0/StaticFileAuth/Program.cs._
In the preceding code, the fallback authorization policy requires authenticated users. Endpoints that specify authorization requirements use the policy produced from their authorization metadata instead of the fallback policy. For complete policy selection rules, see Policy-based authorization in ASP.NET Core.

`Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireAuthenticatedUser*` adds `Microsoft.AspNetCore.Authorization.Infrastructure.DenyAnonymousAuthorizationRequirement` to the current instance, which enforces that the current user is authenticated.

Static assets stored in the app's web root are publicly accessible because the default static file middleware (`Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*`) is called before `Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization*`. Static assets in the `MyStaticFiles` folder require authentication and are requested using the `/StaticFiles` URL segment.

An alternative approach to serve files based on authorization is to:

* Store the files outside of the web root and any directory accessible to static file middleware.
* Serve the files via an action method to which authorization is applied and return a `Microsoft.AspNetCore.Mvc.FileResult` object.

From a Razor page (`Pages/BannerImage.cshtml.cs`):

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/static-files/6.0/StaticFileAuth/Pages/BannerImage.cshtml.cs._
From a controller (`Controllers/HomeController.cs`):

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/static-files/3.1/StaticFilesSample/Controllers/HomeController.cs._
The preceding approach requires a page or endpoint per file.

The following route endpoint example returns files for authenticated users.

In the `Program` file:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/static-files/9.0/StaticFileAuth/Program.cs._
The following route endpoint example uploads files for authenticated users in the administrator role (`admin`).

In the `Program` file:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/static-files/9.0/StaticFileAuth/Program.cs._
Both endpoints validate stored file names with the following helper:

_Code sample not included: ~/../AspNetCore.Docs.Samples/fundamentals/static-files/9.0/StaticFileAuth/Program.cs._
The upload endpoint uses buffered model binding. For large files, use streaming instead. For more information, see Upload files in ASP.NET Core.

## Directory browsing

Directory browsing allows directory listing within specified directories.

For security reasons, directory browsing is disabled by default. For more information, see Security considerations for static files.

Enable directory browsing by using the following APIs:

* `Microsoft.Extensions.DependencyInjection.DirectoryBrowserServiceExtensions.AddDirectoryBrowser*`
* `Microsoft.AspNetCore.Builder.DirectoryBrowserExtensions.UseDirectoryBrowser*`

In the following example:

* An `images` folder at the root of the app holds images for directory browsing.
* The request path to browse the images is `/DirectoryImages`.
* Calling `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` and setting the `Microsoft.AspNetCore.StaticFiles.Infrastructure.SharedOptionsBase.FileProvider` of `Microsoft.AspNetCore.Builder.StaticFileOptions` enables displaying browser links to the individual files.

Namespaces for the following API:

```csharp
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;
```

Service registration:

```csharp
builder.Services.AddDirectoryBrowser();
```

In the request processing pipeline, after the existing call to either `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*` (.NET 9 or later) or `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` (.NET 8 or earlier):

```csharp
var fileProvider = new PhysicalFileProvider(
    Path.Combine(builder.Environment.WebRootPath, "images"));
var requestPath = "/DirectoryImages";

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = fileProvider,
    RequestPath = requestPath
});

app.UseDirectoryBrowser(new DirectoryBrowserOptions
{
    FileProvider = fileProvider,
    RequestPath = requestPath
});
```

The preceding code allows directory browsing of the `wwwroot/images` folder using the URL `https://{HOST}/DirectoryImages` with links to each file and folder, where the `{HOST}` placeholder is the host.

`Microsoft.Extensions.DependencyInjection.DirectoryBrowserServiceExtensions.AddDirectoryBrowser*` adds services required by the directory-browsing middleware, including `System.Text.Encodings.Web.HtmlEncoder`. These services might be added by other calls, such as `Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddRazorPages*`, but call `Microsoft.Extensions.DependencyInjection.DirectoryBrowserServiceExtensions.AddDirectoryBrowser*` to ensure the services are added.

## Serve default documents

Setting a default page provides visitors a starting point on a site. To serve a default file from `wwwroot` without requiring the request URL to include the file's name, call the `Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles*` method.

`Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles*` is a URL rewriter that doesn't serve the file. It rewrites the request URL to the default document (for example, `/` to `/index.html`), and another component serves the file.

Because `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*` serves assets discovered at build time through endpoint routing, it doesn't serve default documents on its own. Call `Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles*` to rewrite the request, followed by `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` to serve the rewritten request for the default document:

```csharp
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapStaticAssets();
```

> **Important:**
> Configuring only `Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles*` and `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*` (without `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*`) returns a *404 - Not Found* response for a request to `/`. This behavior occurs because minimal hosting adds routing middleware at the start of the request processing pipeline, so endpoint routing matches the request before `UseDefaultFiles` rewrites it to the default document. The problem is especially apparent when you change the web root to a custom path with `Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootPath`, because files in a custom web root aren't part of the build-time static assets manifest that `MapStaticAssets` serves. Add a call to `UseStaticFiles` after `UseDefaultFiles`, as shown in the preceding example, to serve default documents.

With `Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles*`, requests to a folder in `wwwroot` search for:

* `default.htm`
* `default.html`
* `index.htm`
* `index.html`

The first file found from the list is served as though the request included the file's name. The browser URL continues to reflect the URI requested.

The following code changes the default file name to `default-document.html`:

```csharp
var options = new DefaultFilesOptions();
options.DefaultFileNames.Clear();
options.DefaultFileNames.Add("default-document.html");
app.UseDefaultFiles(options);
```

## Combine static files, default documents, and directory browsing

`Microsoft.AspNetCore.Builder.FileServerExtensions.UseFileServer*` combines the functionality of `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*`, `Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles*`, and optionally `Microsoft.AspNetCore.Builder.DirectoryBrowserExtensions.UseDirectoryBrowser*`.

In the request processing pipeline, after the existing call to either `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*` (.NET 9 or later) or `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*` (.NET 8 or earlier), call `Microsoft.AspNetCore.Builder.FileServerExtensions.UseFileServer*` to enable the serving of static files and the default file:

```csharp
app.UseFileServer();
```

Directory browsing isn't enabled for the preceding example.

The following code enables the serving of static files, the default file, and directory browsing.

Service registration:

```csharp
builder.Services.AddDirectoryBrowser();
```

In the request processing pipeline, after the existing call to `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*`:

```csharp
app.UseFileServer(enableDirectoryBrowsing: true);
```

For the host address (`/`), `Microsoft.AspNetCore.Builder.FileServerExtensions.UseFileServer*` returns the default HTML document before the default Razor Page (`Pages/Index.cshtml`) or default MVC view (`Home/Index.cshtml`).

Consider the following directory hierarchy:

* `wwwroot`
  * `css`
  * `images`
  * `js`
* `ExtraStaticFiles`
  * `images`
    * `logo.png`
  * `default.html`

The following code enables the serving of static files, the default file, and directory browsing of `ExtraStaticFiles`.

Namespaces for the following API:

```csharp
using Microsoft.Extensions.FileProviders;
```

Service registration:

```csharp
builder.Services.AddDirectoryBrowser();
```

In the request processing pipeline, after the existing call to `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*`:

```csharp
app.UseFileServer(new FileServerOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "ExtraStaticFiles")),
    RequestPath = "/static-files",
    EnableDirectoryBrowsing = true
});
```

`Microsoft.Extensions.DependencyInjection.DirectoryBrowserServiceExtensions.AddDirectoryBrowser*` must be called when the `EnableDirectoryBrowsing` property value is `true`.

Using the preceding file hierarchy and code, URLs resolve as shown in the following table (the `{HOST}` placeholder is the host).

| URI | Response file |
| --- | --- |
| `https://{HOST}/static-files/images/logo.png` | `ExtraStaticFiles/images/logo.png` |
| `https://{HOST}/static-files` | `ExtraStaticFiles/default.html` |

If no default-named file exists in the `ExtraStaticFiles` directory, `https://{HOST}/static-files` returns the directory listing with clickable links, where the `{HOST}` placeholder is the host.

`Microsoft.AspNetCore.Builder.DefaultFilesExtensions.UseDefaultFiles*` and `Microsoft.AspNetCore.Builder.DirectoryBrowserExtensions.UseDirectoryBrowser*` perform a client-side redirect from the target URI without a trailing `/` to the target URI with a trailing `/`. For example, from `https://{HOST}/static-files` (no trailing `/`) to `https://{HOST}/static-files/` (includes a trailing `/`). Relative URLs within the `ExtraStaticFiles` directory are invalid without a trailing slash (`/`) unless the `Microsoft.AspNetCore.StaticFiles.Infrastructure.SharedOptions.RedirectToAppendTrailingSlash` option of `Microsoft.AspNetCore.Builder.DefaultFilesOptions` is used.
