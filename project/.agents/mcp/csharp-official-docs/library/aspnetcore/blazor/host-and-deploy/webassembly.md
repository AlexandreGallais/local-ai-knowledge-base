---
title: "Host and deploy ASP.NET Core Blazor WebAssembly (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/host-and-deploy/webassembly/index.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Host and deploy ASP.NET Core Blazor WebAssembly

This article explains how to host and deploy Blazor WebAssembly apps.

With the Blazor WebAssembly hosting model:

* The Blazor app, its dependencies, and the .NET runtime are downloaded to the browser in parallel.
* The app is executed directly on the browser UI thread.

This article pertains to the deployment scenario where the Blazor app is placed on a static hosting web server or service, .NET isn't used to serve the Blazor app. This strategy is covered in the Standalone deployment section and other articles in this node for IIS, Azure services, Apache, Nginx, and GitHub Pages.

## Serve a Blazor WebAssembly app locally for testing

Many open-source and commercial HTTP servers can serve a published Blazor WebAssembly app locally. For a simple command-line HTTP server, consider using the `natemcmaster/dotnet-serve` .NET tool.

> **Warning:**
> The `natemcmaster/dotnet-serve` .NET tool isn't owned or maintained by Microsoft and isn't covered by any Microsoft support agreement or license. Use caution when using a third-party tool, especially for testing security scenarios. Confirm that the tool follows official specifications and adopts security best practices. Keep the tool's version current to obtain the latest bug fixes.

## Subdomain and IIS sub-application hosting

Subdomain hosting doesn't require special configuration of the app. You ***don't*** need to configure the app base path (the `<base>` tag in `wwwroot/index.html`) to host the app at a subdomain.

IIS sub-application hosting ***does*** require you to set the app base path. For more information and cross-links to further guidance on IIS sub-application hosting, see Host and deploy ASP.NET Core Blazor.

## Decrease maximum heap size for some mobile device browsers

When building a Blazor app that runs on the client (`.Client` project of a Blazor Web App or standalone Blazor WebAssembly app) and targets mobile device browsers, especially Safari on iOS, decreasing the maximum memory for the app with the MSBuild property `EmccMaximumHeapSize` may be required. The default value is 2,147,483,648 bytes, which may be too large and result in the app crashing if the app attempts to allocate more memory with the browser failing to grant it. The following example sets the value to 268,435,456 bytes in the `Program` file:

```xml
<EmccMaximumHeapSize>268435456</EmccMaximumHeapSize>
```

For more information on Mono/WebAssembly MSBuild properties and targets, see `WasmApp.Common.targets` (`dotnet/runtime` GitHub repository).

## Webcil packaging format for .NET assemblies

Webcil is a web-friendly packaging format for .NET assemblies designed to enable using Blazor WebAssembly in restrictive network environments. Webcil files use a standard WebAssembly wrapper, where the assemblies are deployed as WebAssembly files that use the standard `.wasm` file extension.

Webcil is the default packaging format when you publish a Blazor WebAssembly app. To disable the use of Webcil, set the following MSBuild property in the app's project file:

```xml
<PropertyGroup>
  <WasmEnableWebcil>false</WasmEnableWebcil>
</PropertyGroup>
```

## Customize how boot resources are loaded

Customize how boot resources are loaded using the `loadBootResource` API. For more information, see ASP.NET Core Blazor startup.

## Compression

When a Blazor WebAssembly app is published, the output is statically compressed during publish to reduce the app's size and remove the overhead for runtime compression. The following compression algorithms are used:

* Brotli (highest level)
* Gzip

Blazor relies on the host to serve the appropriate compressed files. When hosting a Blazor WebAssembly standalone app, additional work might be required to ensure that statically-compressed files are served:

* For IIS `web.config` compression configuration, see the IIS: Brotli and Gzip compression section.
* When hosting on static hosting solutions that don't support statically-compressed file content negotiation, consider configuring the app to fetch and decode Brotli compressed files:

Obtain the JavaScript Brotli decoder from the `google/brotli` GitHub repository. The minified decoder file is named `decode.min.js` and found in the repository's `js` folder.

> **Note:**
> If the minified version of the `decode.js` script (`decode.min.js`) fails, try using the unminified version (`decode.js`) instead.

Update the app to use the decoder.

In the `wwwroot/index.html` file, set `autostart` to `false` on Blazor's `<script>` tag:

```html
<script src="_framework/blazor.webassembly.js" autostart="false"></script>
```

After Blazor's `<script>` tag and before the closing `</body>` tag, add the following JavaScript code `<script>` block. The following function calls `fetch` with `cache: 'no-cache'` to keep the browser's cache updated.

```html
<script type="module">
  import { BrotliDecode } from './decode.min.js';
  Blazor.start({
    webAssembly: {
      loadBootResource: function (type, name, defaultUri, integrity) {
        if (type !== 'dotnetjs' && location.hostname !== 'localhost' && type !== 'configuration' && type !== 'manifest') {
          return (async function () {
            const response = await fetch(defaultUri + '.br', { cache: 'no-cache' });
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            const originalResponseBuffer = await response.arrayBuffer();
            const originalResponseArray = new Int8Array(originalResponseBuffer);
            const decompressedResponseArray = BrotliDecode(originalResponseArray);
            const contentType = type === 
              'dotnetwasm' ? 'application/wasm' : 'application/octet-stream';
            return new Response(decompressedResponseArray, 
              { headers: { 'content-type': contentType } });
          })();
        }
      }
    }
  });
</script>
```

For more information on loading boot resources, see ASP.NET Core Blazor startup.

To disable compression, add the `CompressionEnabled` MSBuild property to the app's project file and set the value to `false`:

```xml
<PropertyGroup>
  <CompressionEnabled>false</CompressionEnabled>
</PropertyGroup>
```

The `CompressionEnabled` property can be passed to the `dotnet publish` command with the following syntax in a command shell:

```dotnetcli
dotnet publish -p:CompressionEnabled=false
```

## Rewrite URLs for correct routing

Routing requests for page components in a Blazor WebAssembly app isn't as straightforward as routing requests in a Blazor Server app. Consider a Blazor WebAssembly app with two components:

* `Main.razor`: Loads at the root of the app and contains a link to the `About` component (`href="About"`).
* `About.razor`: `About` component.

When the app's default document is requested using the browser's address bar (for example, `https://www.contoso.com/`):

1. The browser makes a request.
1. The default page is returned, which is usually `index.html`.
1. `index.html` bootstraps the app.
1. `Microsoft.AspNetCore.Components.Routing.Router` component loads, and the Razor `Main` component is rendered.

In the Main page, selecting the link to the `About` component works on the client because the Blazor router stops the browser from making a request on the Internet to `www.contoso.com` for `About` and serves the rendered `About` component itself. All of the requests for internal endpoints *within the Blazor WebAssembly app* work the same way: Requests don't trigger browser-based requests to server-hosted resources on the Internet. The router handles the requests internally.

If a request is made using the browser's address bar for `www.contoso.com/About`, the request fails. No such resource exists on the app's Internet host, so a *404 - Not Found* response is returned.

Because browsers make requests to Internet-based hosts for client-side pages, web servers and hosting services must rewrite all requests for resources not physically on the server to the `index.html` page. When `index.html` is returned, the app's Blazor router takes over and responds with the correct resource.

When deploying to an IIS server, you can use the URL Rewrite Module with the app's published `web.config` file. For more information, see Host and deploy ASP.NET Core Blazor WebAssembly with IIS.

## Standalone deployment

A *standalone deployment* serves the Blazor WebAssembly app as a set of static files that are requested directly by clients. Any static file server is able to serve the Blazor app.

Standalone deployment assets are published into either the `/bin/Release/{TARGET FRAMEWORK}/publish/wwwroot` or `bin/Release/{TARGET FRAMEWORK}/browser-wasm/publish` folder, where the `{TARGET FRAMEWORK}` placeholder is the target framework.

## Publish without an HTML document

When an app isn't using an HTML document produced as part of the .NET build/publish process, there's no place to write the site's import map. For example, this scenario occurs when publishing a standalone Blazor app for consumption by a JavaScript/SPA app through a Blazor custom element.

To avoid problems loading app resources on the client, disable fingerprinting for `blazor.webassembly.js` and `dotnet.js` by removing `<OverrideHtmlAssetPlaceholders>` MSBuild property (or set it to `false`) in the app's project file (`.csproj`).

## Azure App Service

Blazor WebAssembly apps can be deployed to Azure App Services on Windows, which hosts the app on IIS.

Deploying a standalone Blazor WebAssembly app to Azure App Service for Linux isn't currently supported. We recommend hosting a standalone Blazor WebAssembly app using Azure Static Web Apps, which supports this scenario.

## Standalone with Docker

A standalone Blazor WebAssembly app is published as a set of static files for hosting by a static file server.

To host the app in Docker:

* Choose a Docker container with web server support, such as Nginx or Apache.
* Copy the `publish` folder assets to a location folder defined in the web server for serving static files.
* Apply additional configuration as needed to serve the Blazor WebAssembly app.

For configuration guidance, see the following resources:

* Nginx or Apache articles
* Docker Documentation

## Host configuration values

Blazor WebAssembly apps can accept the following host configuration values as command-line arguments at runtime in the `Development` environment.

### Content root

The `--contentroot` argument sets the absolute path to the directory that contains the app's content files (content root). In the following examples, `/content-root-path` is the app's content root path.

* Pass the argument when running the app locally at a command prompt. From the app's directory, execute:

  ```dotnetcli
  dotnet watch --contentroot=/content-root-path
  ```

* Add an entry to the app's `launchSettings.json` file in the **IIS Express** profile. This setting is used when the app is run with the Visual Studio Debugger and from a command prompt with `dotnet watch` (or `dotnet run`).

  ```json
  "commandLineArgs": "--contentroot=/content-root-path"
  ```

  > **Note:**
> When an app is run with the .NET CLI, the first launch profile in `launchSettings.json` whose `commandName` is `Project` is used by default. To use a different profile (for example, `https`), pass the `-lp|--launch-profile` option to `dotnet watch` or `dotnet run` or move the preferred profile to the top of the file.

* In Visual Studio, specify the argument in **Properties** > **Debug** > **Application arguments**. Setting the argument in the Visual Studio property page adds the argument to the `launchSettings.json` file.

  ```console
  --contentroot=/content-root-path
  ```

### Path base

The `--pathbase` argument sets the app base path for an app run locally with a non-root relative URL path (the `<base>` tag `href` is set to a path other than `/` for staging and production). In the following examples, `/relative-URL-path` is the app's path base. For more information, see ASP.NET Core Blazor app base path.

> **Important:**
> Unlike the path provided to `href` of the `<base>` tag, don't include a trailing slash (`/`) when passing the `--pathbase` argument value. If the app base path is provided in the `<base>` tag as `<base href="/CoolApp/">` (includes a trailing slash), pass the command-line argument value as `--pathbase=/CoolApp` (no trailing slash).

* Pass the argument when running the app locally at a command prompt. From the app's directory, execute:

  ```dotnetcli
  dotnet watch --pathbase=/relative-URL-path
  ```

* Add an entry to the app's `launchSettings.json` file in the **IIS Express** profile. This setting is used when running the app with the Visual Studio Debugger and from a command prompt with `dotnet watch` (or `dotnet run`).

  ```json
  "commandLineArgs": "--pathbase=/relative-URL-path"
  ```

* In Visual Studio, specify the argument in **Properties** > **Debug** > **Application arguments**. Setting the argument in the Visual Studio property page adds the argument to the `launchSettings.json` file.

  ```console
  --pathbase=/relative-URL-path
  ```

For more information, see ASP.NET Core Blazor app base path.

### URLs

The `--urls` argument sets the IP addresses or host addresses with ports and protocols to listen on for requests.

* Pass the argument when running the app locally at a command prompt. From the app's directory, execute:

  ```dotnetcli
  dotnet watch --urls=http://127.0.0.1:0
  ```

* Add an entry to the app's `launchSettings.json` file in the **IIS Express** profile. This setting is used when running the app with the Visual Studio Debugger and from a command prompt with `dotnet watch` (or `dotnet run`).

  ```json
  "commandLineArgs": "--urls=http://127.0.0.1:0"
  ```

* In Visual Studio, specify the argument in **Properties** > **Debug** > **Application arguments**. Setting the argument in the Visual Studio property page adds the argument to the `launchSettings.json` file.

  ```console
  --urls=http://127.0.0.1:0
  ```

## Configure the Trimmer

Blazor performs Intermediate Language (IL) trimming on each Release build to remove unnecessary IL from the output assemblies. For more information, see Configure the Trimmer for ASP.NET Core Blazor.
