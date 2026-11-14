---
title: "Host and deploy ASP.NET Core Blazor"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/host-and-deploy/index.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Host and deploy ASP.NET Core Blazor

This article explains how to host and deploy Blazor apps.

## Publish the app

Apps are published for deployment in Release configuration.

# Visual Studio

1. Select the **Publish {APPLICATION}** command from the **Build** menu, where the `{APPLICATION}` placeholder the app's name.
1. Select the *publish target*. To publish locally, select **Folder**. Select **Next**.
1. When publishing locally, accept the default folder location or specify a different location. Select **Finish** to save the profile. Select **Close**.
1. To clean the target's publish folder prior to publishing the app, select **Show all settings**. Select **Settings** > **File Publish Options** > **Delete all existing files prior to publish**. Select **Save**.
1. Select the **Publish** button.

# Visual Studio Code and .NET CLI

Open a command shell to the project's root directory.

Use the `dotnet publish` command to publish the app:

```dotnetcli
dotnet publish
```

Prior to .NET 8, the default publish configuration is `Debug`. When publishing an app that targets .NET 7 or earlier, pass the `-c|--configuration` option to the command with "`Release`" to publish in `Release` configuration:

```dotnetcli
dotnet publish -c Release
```

---

Publishing the app triggers a restore of the project's dependencies and builds the project before creating the assets for deployment. As part of the build process, unused methods and assemblies are removed to reduce app download size and load times.

## Empty the target publish folder

When using the `dotnet publish` command in a command shell to publish an app, the command generates the necessary files for deployment based on the current state of the project and places the files into the specified output folder. The command doesn't automatically clean the target folder before publishing the app.

To empty the target folder automatically before the app is published, add the following MSBuild target to the app's project file (`.csproj`) under the root `<Project>` element:

```xml
<Target Name="_RemovePublishDirBeforePublishing" BeforeTargets="BeforePublish">
  <RemoveDir Directories="$(PublishDir)" Condition="'$(PublishDir)' != ''" />
</Target>
```

## Default publish locations

* Blazor Web App: The app is published into the `/bin/Release/{TARGET FRAMEWORK}/publish` folder, where the `{TARGET FRAMEWORK}` placeholder is the target framework. Deploy the contents of the `publish` folder to the host.
* Standalone Blazor WebAssembly: The app is published into the `bin/Release/{TARGET FRAMEWORK}/publish` or `bin/Release/{TARGET FRAMEWORK}/browser-wasm/publish` folder. To deploy the app as a static site, copy the contents of the `wwwroot` folder to the static site host.

## IIS

To host a Blazor app in IIS, see the following resources:

* IIS hosting
  * Publish an ASP.NET Core app to IIS
  * Host ASP.NET Core on Windows with IIS
* Host and deploy ASP.NET Core server-side Blazor apps: Blazor Web Apps (.NET 8 or later) and Blazor Server apps (.NET 7 or earlier) running on IIS, including IIS with Azure Virtual Machines (VMs) running Windows OS and Azure App Service.
* Host and deploy ASP.NET Core Blazor WebAssembly with IIS: Standalone Blazor WebAssembly apps (all .NET releases) and hosted Blazor WebAssembly apps (.NET 7 or earlier).
* IIS sub-application hosting
  * Follow the app base path guidance prior to publishing the app. The examples use an app base path of `/CoolApp` and show how to obtain the base path from app settings or other configuration providers.
  * Follow the sub-application configuration guidance in Advanced configuration. The sub-app's folder path under the root site becomes the virtual path of the sub-app. For an app base path of `/CoolApp`, the Blazor app is placed in a folder named `CoolApp` under the root site and the sub-app takes on a virtual path of `/CoolApp`.

Sharing an app pool among ASP.NET Core apps isn't supported, including for Blazor apps. Use one app pool per app when hosting with IIS, and avoid the use of IIS's virtual directories for hosting multiple apps.

## JavaScript bundler support

The Blazor runtime relies on JavaScript (JS) files, the .NET runtime compiled into WebAssembly code, and managed assemblies packed as WebAssembly files. When a Blazor app is built, the Blazor runtime depends on these files from different build locations. Due to this constraint, Blazor's build output isn't compatible with JS bundlers, such as Gulp, Webpack, and Rollup.

To produce build output compatible with JS bundlers *during publish*, set the `WasmBundlerFriendlyBootConfig` MSBuild property to `true` in the app's project file:

```xml
<WasmBundlerFriendlyBootConfig>true</WasmBundlerFriendlyBootConfig>
```

> **Important:**
> This feature only produces the bundler-friendly output when publishing the app.

The output isn't directly runnable in the browser, but it can be consumed by JS tools to bundle JS files with the rest of the developer-supplied scripts.

When `WasmBundlerFriendlyBootConfig` is enabled, the produced JS contains `import` directives for all of the assets in the app, which makes the dependencies visible for the bundler. Many of the assets aren't loadable by the browser, but bundlers usually can be configured to recognize the assets by their file type to handle loading. For details on how to configure your bundler, refer to the bundler's documentation.

> **Note:**
> Bundling build output should be possible by mapping imports to individual file locations using a JS bundler custom plugin. We don't provide such a plugin at the moment.

> **Note:**
> Replacing the `files` plugin with `url`, all of the app's JS files, including the Blazor-WebAssembly runtime (base64 encoded in the JS), are bundled into the output. The size of the file is significantly larger (for example, 300% larger) than when the files are curated with the `files` plugin, so we don't recommend using the `url` plugin as a general practice when producing bundler-friendly output for JS bundler processing.

The following sample apps are based on Rollup. Similar concepts apply when using other JS bundlers.

Demonstration sample apps for Blazor WebAssembly in a React app (`BlazorWebAssemblyReact`) and .NET on WebAssembly in a React app (`DotNetWebAssemblyReact`) for .NET 10 or later are available in the Blazor samples GitHub repository (`dotnet/blazor-samples`).

## Aspects of Blazor WebAssembly caching apply to Blazor Web Apps

Blazor bundle caching and HTTP caching guidance in the *Blazor WebAssembly* node focus on standalone Blazor WebAssembly apps, but several aspects of client-side caching in these articles also apply to Blazor Web Apps that adopt Interactive WebAssembly or Interactive Auto render modes. If a Blazor Web App that renders content client-side encounters a static asset or bundle caching problem, see the guidance in these articles to troubleshoot the problem:

* ASP.NET Core Blazor WebAssembly caching and integrity check failures
* Avoid HTTP caching issues when upgrading ASP.NET Core Blazor apps

## Blazor Server `MapFallbackToPage` configuration

*This section only applies to Blazor Server apps. `Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapFallbackToPage*` isn't supported in Blazor Web Apps and Blazor WebAssembly apps.*

In scenarios where an app requires a separate area with custom resources and Razor components:

* Create a folder within the app's `Pages` folder to hold the resources. For example, an administrator section of an app is created in a new folder named `Admin` (`Pages/Admin`).
* Create a root page (`_Host.cshtml`) for the area. For example, create a `Pages/Admin/_Host.cshtml` file from the app's main root page (`Pages/_Host.cshtml`). Don't provide an `@page` directive in the Admin `_Host` page.
* Add a layout to the area's folder (for example, `Pages/Admin/_Layout.razor`). In the layout for the separate area, set the `<base>` tag `href` to match the area's folder (for example, `<base href="/Admin/" />`). For demonstration purposes, add `~/` to the static resources in the page. For example:
  * `~/css/bootstrap/bootstrap.min.css`
  * `~/css/site.css`
  * `~/BlazorSample.styles.css` (the example app's namespace is `BlazorSample`)
  * `~/_framework/blazor.server.js` (Blazor script)
* If the area should have its own static asset folder, add the folder and specify its location to static file middleware in `Program.cs` (for example, `app.UseStaticFiles("/Admin/wwwroot")`).
* Razor components are added to the area's folder. At a minimum, add an `Index` component to the area folder with the correct `@page` directive for the area. For example, add a `Pages/Admin/Index.razor` file based on the app's default `Pages/Index.razor` file. Indicate the Admin area as the route template at the top of the file (`@page "/admin"`). Add additional components as needed. For example, `Pages/Admin/Component1.razor` with an `@page` directive and route template of `@page "/admin/component1`.
* In `Program.cs`, call `Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapFallbackToPage*` for the area's request path immediately before the fallback root page path to the `_Host` page:

  ```csharp
  ...
  app.UseRouting();

  app.MapBlazorHub();
  app.MapFallbackToPage("~/Admin/{*clientroutes:nonfile}", "/Admin/_Host");
  app.MapFallbackToPage("/_Host");

  app.Run();
  ```
