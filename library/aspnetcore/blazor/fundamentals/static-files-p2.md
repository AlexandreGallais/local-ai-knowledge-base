---
title: "ASP.NET Core Blazor static files (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/fundamentals/static-files.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor static files (part 2 of 2)

## Static Web Asset Project Mode

*This section applies to the `.Client` project of a Blazor Web App.*

The required `<StaticWebAssetProjectMode>Default</StaticWebAssetProjectMode>` setting in the `.Client` project of a Blazor Web App reverts Blazor WebAssembly static asset behaviors back to the defaults, so that the project behaves as part of the hosted project. The Blazor WebAssembly SDK (`Microsoft.NET.Sdk.BlazorWebAssembly`) configures static web assets in a specific way to work in "standalone" mode with a server simply consuming the outputs from the library. This isn't appropriate for a Blazor Web App, where the WebAssembly portion of the app is a logical part of the host and must behave more like a library. For example, the project doesn't expose the styles bundle (for example, `BlazorSample.Client.styles.css`) and instead only provides the host with the project bundle, so that the host can include it in its own styles bundle.

Changing the value (`Default`) of `<StaticWebAssetProjectMode>` or removing the property from the `.Client` project isn't supported.

## Prefix for Blazor WebAssembly assets

*This section applies to Blazor Web Apps.*

Use the `Microsoft.AspNetCore.Components.WebAssembly.Server.WebAssemblyComponentsEndpointOptions.PathPrefix` endpoint option to set the path string that indicates the prefix for Blazor WebAssembly assets. The path must correspond to a referenced Blazor WebAssembly application project.

```csharp
endpoints.MapRazorComponents<App>()
    .AddInteractiveWebAssemblyRenderMode(options => 
        options.PathPrefix = "{PATH PREFIX}");
```

In the preceding example, the `{PATH PREFIX}` placeholder is the path prefix and must start with a forward slash (`/`).

In the following example, the path prefix is set to `/path-prefix`:

```csharp
endpoints.MapRazorComponents<App>()
    .AddInteractiveWebAssemblyRenderMode(options => 
        options.PathPrefix = "/path-prefix");
```

## Static web asset base path

*This section applies to standalone Blazor WebAssembly apps.*

Publishing the app places the app's static assets, including Blazor framework files (`_framework` folder assets), at the root path (`/`) in published output. The `<StaticWebAssetBasePath>` property specified in the project file (`.csproj`) sets the base path to a non-root path:

```xml
<PropertyGroup>
  <StaticWebAssetBasePath>{PATH}</StaticWebAssetBasePath>
</PropertyGroup>
```

In the preceding example, the `{PATH}` placeholder is the path.

Without setting the `<StaticWebAssetBasePath>` property, a standalone app is published at `/BlazorStandaloneSample/bin/Release/{TFM}/publish/wwwroot/`.

In the preceding example, the `{TFM}` placeholder is the Target Framework Moniker (TFM).

If the `<StaticWebAssetBasePath>` property in a standalone Blazor WebAssembly app sets the published static asset path to `app1`, the root path to the app in published output is `/app1`.

In the standalone Blazor WebAssembly app's project file (`.csproj`):

```xml
<PropertyGroup>
  <StaticWebAssetBasePath>app1</StaticWebAssetBasePath>
</PropertyGroup>
```

In published output, the path to the standalone Blazor WebAssembly app is `/BlazorStandaloneSample/bin/Release/{TFM}/publish/wwwroot/app1/`.

In the preceding example, the `{TFM}` placeholder is the Target Framework Moniker (TFM).

## Serve files from multiple locations

*The guidance in this section only applies to Blazor Web Apps.*

To serve files from multiple locations with a `Microsoft.Extensions.FileProviders.CompositeFileProvider`:

* Add the namespace for `Microsoft.Extensions.FileProviders` to the top of the `Program` file of the server project.
* In the server project's `Program` file ***before*** the call to `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*`:
  * Create a `Microsoft.Extensions.FileProviders.PhysicalFileProvider` with the path to the static assets.
  * Create a `Microsoft.Extensions.FileProviders.CompositeFileProvider` from the `Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootFileProvider` and the `Microsoft.Extensions.FileProviders.PhysicalFileProvider`. Assign the composite file provider back to the app's `Microsoft.AspNetCore.Hosting.IWebHostEnvironment.WebRootFileProvider`.

Example:

Create a new folder in the server project named `AdditionalStaticAssets`. Place an image into the folder.

Add the following `using` statement to the top of the server project's `Program` file:

```csharp
using Microsoft.Extensions.FileProviders;
```

In the server project's `Program` file ***before*** any calls to `Microsoft.AspNetCore.Builder.StaticAssetsEndpointRouteBuilderExtensions.MapStaticAssets*` and `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*`, add the following code:

```csharp
var secondaryProvider = new PhysicalFileProvider(
    Path.Combine(builder.Environment.ContentRootPath, "AdditionalStaticAssets"));
app.Environment.WebRootFileProvider = new CompositeFileProvider(
    app.Environment.WebRootFileProvider, secondaryProvider);
```

In the app's `Home` component (`Home.razor`) markup, reference the image with an `` tag:

```razor
<img src="{IMAGE FILE NAME}" alt="{ALT TEXT}" />
```

In the preceding example:

* The `{IMAGE FILE NAME}` placeholder is the image file name. There's no need to provide a path segment if the image file is at the root of the `AdditionalStaticAssets` folder.
* The `{ALT TEXT}` placeholder is the image alternate text.

Run the app.

## Related content

* ASP.NET Core Blazor app base path
* Avoid file capture in a route parameter
