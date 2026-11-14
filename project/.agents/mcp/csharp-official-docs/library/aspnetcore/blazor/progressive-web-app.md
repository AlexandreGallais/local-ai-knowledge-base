---
title: "ASP.NET Core Blazor Progressive Web Application (PWA) (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/progressive-web-app/index.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor Progressive Web Application (PWA)

A Blazor Progressive Web Application (PWA) is a single-page application (SPA) that uses modern browser APIs and capabilities to behave like a desktop app.

Blazor WebAssembly is a standards-based client-side web app platform, so it can use any browser API, including PWA APIs required for the following capabilities:

* Working offline and loading instantly, independent of network speed.
* Running in its own app window, not just a browser window.
* Being launched from the host's operating system start menu, dock, or home screen.
* Receiving push notifications from a backend server, even while the user isn't using the app.
* Automatically updating in the background.

The word *progressive* is used to describe these apps because:

* A user might first discover and use the app within their web browser like any other SPA.
* Later, the user progresses to installing it in their OS and enabling push notifications.

# Visual Studio

When creating a new **Blazor WebAssembly App**, select the **Progressive Web Application** checkbox.

# Visual Studio Code / .NET CLI

Use the following command to create a PWA project in a command shell with the `--pwa` switch:

```dotnetcli
dotnet new blazorwasm -o MyBlazorPwa --pwa
```

In the preceding command, the `-o|--output` option creates a new folder for the app named `MyBlazorPwa`.

---

## Convert an existing Blazor WebAssembly app into a PWA

Convert an existing Blazor WebAssembly app into a PWA following the guidance in this section.

In the app's project file:

* Add the following `ServiceWorkerAssetsManifest` property to a `PropertyGroup`:

  ```xml
    ...
    <ServiceWorkerAssetsManifest>service-worker-assets.js</ServiceWorkerAssetsManifest>
  </PropertyGroup>
   ```

* Add the following `ServiceWorker` item to an `ItemGroup`:

  ```xml
  <ItemGroup>
    <ServiceWorker Include="wwwroot\service-worker.js" 
      PublishedContent="wwwroot\service-worker.published.js" />
  </ItemGroup>
  ```

To obtain static assets, use **one** of the following approaches:

* Create a separate, new PWA project with the `dotnet new` command in a command shell:

  ```dotnetcli
  dotnet new blazorwasm -o MyBlazorPwa --pwa
  ```

  In the preceding command, the `-o|--output` option creates a new folder for the app named `MyBlazorPwa`.

  **If you aren't converting an app for the latest release**, pass the `-f|--framework` option. The following example creates the app for .NET 5:

  ```dotnetcli
  dotnet new blazorwasm -o MyBlazorPwa --pwa -f net5.0
  ```

* Navigate to the ASP.NET Core GitHub repository at the following URL, which links to `main` branch reference source and assets. Select the release that you're working with from the **Switch branches or tags** dropdown list that applies to your app.

  Blazor WebAssembly project template `wwwroot` folder (`dotnet/aspnetcore` GitHub repository `main` branch)

  > **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

  From the source `wwwroot` folder either in the app that you created or from the reference assets in the `dotnet/aspnetcore` GitHub repository, copy the following files into the app's `wwwroot` folder:

  * `icon-192.png`
  * `icon-512.png`
  * `manifest.webmanifest`
  * `service-worker.js`
  * `service-worker.published.js`

In the app's `wwwroot/index.html` file:

* Add `<link>` elements for the manifest and app icon:

  ```html
  <link href="manifest.webmanifest" rel="manifest" />
  <link rel="apple-touch-icon" sizes="512x512" href="icon-512.png" />
  <link rel="apple-touch-icon" sizes="192x192" href="icon-192.png" />
  ```

* Add the following JavaScript inside the closing `</body>` tag immediately after the `blazor.webassembly.js` script tag:

  ```html
  <script>
    navigator.serviceWorker.register('service-worker.js', { updateViaCache: 'none' });
  </script>
  ```

  The `updateViaCache: 'none'` option ensures that:

  * The browser doesn't use cached versions of the service worker script.
  * Service worker updates are applied reliably without being blocked by HTTP caching.
  * PWA applications can update their service workers more predictably.

  This addresses caching issues that can prevent service worker updates from being applied correctly, which is particularly important for PWAs that rely on service workers for offline functionality.

## Installation and app manifest

When visiting an app created using the PWA template, users have the option of installing the app into their OS's start menu, dock, or home screen. The way this option is presented depends on the user's browser. When using desktop Chromium-based browsers, such as Edge or Chrome, an **Add** button appears within the URL bar. After the user selects the **Add** button, they receive a confirmation dialog:

On iOS, visitors can install the PWA using Safari's **Share** button and its **Add to Homescreen** option. On Chrome for Android, users should select the **Menu** button in the upper-right corner, followed by **Add to Home screen**.

Once installed, the app appears in its own window without an address bar:

To customize the window's title, color scheme, icon, or other details, see the `manifest.json` file in the project's `wwwroot` directory. The schema of this file is defined by web standards. For more information, see MDN web docs: Web App Manifest.
