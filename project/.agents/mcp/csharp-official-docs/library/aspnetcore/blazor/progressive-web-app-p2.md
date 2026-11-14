---
title: "ASP.NET Core Blazor Progressive Web Application (PWA) (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/progressive-web-app/index.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor Progressive Web Application (PWA) (part 2 of 3)

## Offline support

Apps created using the PWA template option have support for running offline. A user must first visit the app while they're online. The browser automatically downloads and caches all of the resources required to operate offline.

> **Important:**
> Development support would interfere with the usual development cycle of making changes and testing them. Therefore, offline support is only enabled for *published* apps.

> **Warning:**
> If you intend to distribute an offline-enabled PWA, there are several important warnings and caveats. These scenarios are inherent to offline PWAs and not specific to Blazor. Be sure to read and understand these caveats before making assumptions about how your offline-enabled app works.

To see how offline support works:

1. Publish the app. For more information, see Host and deploy ASP.NET Core Blazor.
1. Deploy the app to a server that supports HTTPS, and access the app in a browser at its secure HTTPS address.
1. Open the browser's dev tools and verify that a *Service Worker* is registered for the host on the **Application** tab:

1. Reload the page and examine the **Network** tab. **Service Worker** or **memory cache** are listed as the sources for all of the page's assets:

1. To verify that the browser isn't dependent on network access to load the app, either:

   * Shut down the web server and see how the app continues to function normally, which includes page reloads. Likewise, the app continues to function normally when there's a slow network connection.
   * Instruct the browser to simulate offline mode in the **Network** tab:

Offline support using a service worker is a web standard, not specific to Blazor. For more information on service workers, see MDN web docs: Service Worker API. To learn more about common usage patterns for service workers, see Google Web: The Service Worker Lifecycle.

Blazor's PWA template produces two service worker files:

* `wwwroot/service-worker.js`, which is used during development.
* `wwwroot/service-worker.published.js`, which is used after the app is published.

To share logic between the two service worker files, consider the following approach:

* Add a third JavaScript file to hold the common logic.
* Use `self.importScripts` to load the common logic into both service worker files.

### Cache-first fetch strategy

The built-in `service-worker.published.js` service worker resolves requests using a *cache-first* strategy. This means that the service worker prefers to return cached content, regardless of whether the user has network access or newer content is available on the server.

The cache-first strategy is valuable because:

* **It ensures reliability.** Network access isn't a boolean state. A user isn't simply online or offline:

  * The user's device may assume it's online, but the network might be so slow as to be impractical to wait for.
  * The network might return invalid results for certain URLs, such as when there's a captive WIFI portal that's currently blocking or redirecting certain requests.

  This is why the browser's `navigator.onLine` API isn't reliable and shouldn't be depended upon.

* **It ensures correctness.** When building a cache of offline resources, the service worker uses content hashing to guarantee it has fetched a complete and self-consistent snapshot of resources at a single instant in time. This cache is then used as an atomic unit. There's no point asking the network for newer resources, since the only versions required are the ones already cached. Anything else risks inconsistency and incompatibility (for example, trying to use versions of .NET assemblies that weren't compiled together).

To prevent the browser from fetching `service-worker-assets.js` from its HTTP cache, for example to resolve temporary integrity check failures when deploying a new version of the service worker, the service worker registration in `wwwroot/index.html` uses `updateViaCache` set to `none`:

```html
<script>
  navigator.serviceWorker.register('/service-worker.js', { updateViaCache: 'none' });
</script>
```

The `updateViaCache: 'none'` option ensures that:

* The browser doesn't use cached versions of the service worker script.
* Service worker updates are applied reliably without being blocked by HTTP caching.
* PWA applications can update their service workers more predictably.

This addresses caching issues that can prevent service worker updates from being applied correctly, which is particularly important for PWAs that rely on service workers for offline functionality.

### Background updates

As a mental model, you can think of an offline-first PWA as behaving like a mobile app that can be installed. The app starts up immediately regardless of network connectivity, but the installed app logic comes from a point-in-time snapshot that might not be the latest version.

The Blazor PWA template produces apps that automatically try to update themselves in the background whenever the user visits and has a working network connection. The way this works is as follows:

* During compilation, the project generates a *service worker assets manifest*, which is named `service-worker-assets.js`. The manifest lists all the static resources that the app requires to function offline, such as .NET assemblies, JavaScript files, and CSS, including their content hashes. The resource list is loaded by the service worker so that it knows which resources to cache.
* Each time the user visits the app, the browser re-requests `service-worker.js` and `service-worker-assets.js` in the background. The files are compared byte-for-byte with the existing installed service worker. If the server returns changed content for either of these files, the service worker attempts to install a new version of itself.
* When installing a new version of itself, the service worker creates a new, separate cache for offline resources and starts populating the cache with resources listed in `service-worker-assets.js`. This logic is implemented in the `onInstall` function inside `service-worker.published.js`.
* The process completes successfully when all of the resources are loaded without error and all content hashes match. If successful, the new service worker enters a *waiting for activation* state. As soon as the user closes the app (no remaining app tabs or windows), the new service worker becomes *active* and is used for subsequent app visits. The old service worker and its cache are deleted.
* If the process doesn't complete successfully, the new service worker instance is discarded. The update process is attempted again on the user's next visit, when hopefully the client has a better network connection that can complete the requests.

Customize this process by editing the service worker logic. None of the preceding behavior is specific to Blazor but is merely the default experience provided by the PWA template option. For more information, see MDN web docs: Service Worker API.

### How requests are resolved

As described in the Cache-first fetch strategy section, the default service worker uses a *cache-first* strategy, meaning that it tries to serve cached content when available. If there is no content cached for a certain URL, for example when requesting data from a backend API, the service worker falls back on a regular network request. The network request succeeds if the server is reachable. This logic is implemented inside `onFetch` function within `service-worker.published.js`.

If the app's Razor components rely on requesting data from backend APIs and you want to provide a friendly user experience for failed requests due to network unavailability, implement logic within the app's components. For example, use `try/catch` around `System.Net.Http.HttpClient` requests.

### Support server-rendered pages

Consider what happens when the user first navigates to a URL such as `/counter` or any other deep link in the app. In these cases, you don't want to return content cached as `/counter`, but instead need the browser to load the content cached as `/index.html` to start up your Blazor WebAssembly app. These initial requests are known as *navigation* requests, as opposed to:

* `subresource` requests for images, stylesheets, or other files.
* `fetch/XHR` requests for API data.

The default service worker contains special-case logic for navigation requests. The service worker resolves the requests by returning the cached content for `/index.html`, regardless of the requested URL. This logic is implemented in the `onFetch` function inside `service-worker.published.js`.

If your app has certain URLs that must return server-rendered HTML, and not serve `/index.html` from the cache, then you need to edit the logic in your service worker. If all URLs containing `/Identity/` need to be handled as regular online-only requests to the server, then modify `service-worker.published.js` `onFetch` logic. Locate the following code:

```javascript
const shouldServeIndexHtml = event.request.mode === 'navigate';
```

Change the code to the following:

```javascript
const shouldServeIndexHtml = event.request.mode === 'navigate'
  && !event.request.url.includes('/Identity/');
```

If you don't do this, then regardless of network connectivity, the service worker intercepts requests for such URLs and resolves them using `/index.html`.

Add additional endpoints for external authentication providers to the check. In the following example, `/signin-google` for Google authentication is added to the check:

```javascript
const shouldServeIndexHtml = event.request.mode === 'navigate'
  && !event.request.url.includes('/Identity/')
  && !event.request.url.includes('/signin-google');
```

No action is required for the `Development` environment, where content is always fetched from the network.

### Control asset caching

If your project defines the `ServiceWorkerAssetsManifest` MSBuild property, Blazor's build tooling generates a service worker assets manifest with the specified name. The default PWA template produces a project file containing the following property:

```xml
<ServiceWorkerAssetsManifest>service-worker-assets.js</ServiceWorkerAssetsManifest>
```

The file is placed in the `wwwroot` output directory, so the browser can retrieve this file by requesting `/service-worker-assets.js`. To see the contents of this file, open `/bin/Debug/{TARGET FRAMEWORK}/wwwroot/service-worker-assets.js` in a text editor. However, don't edit the file, as it's regenerated on each build.

The manifest lists:

* Any Blazor-managed resources, such as .NET assemblies and the .NET WebAssembly runtime files required to function offline.
* All resources for publishing to the app's `wwwroot` directory, such as images, stylesheets, and JavaScript files, including static web assets supplied by external projects and NuGet packages.

You can control which of these resources are fetched and cached by the service worker by editing the logic in `onInstall` in `service-worker.published.js`. The service worker fetches and caches files matching typical web file name extensions such as `.html`, `.css`, `.js`, and `.wasm`, plus file types specific to Blazor WebAssembly, such as `.pdb` files (all versions) and `.dll` files (ASP.NET Core in .NET 7 or earlier).

To include additional resources that aren't present in the app's `wwwroot` directory, define extra MSBuild `ItemGroup` entries, as shown in the following example:

```xml
<ItemGroup>
  <ServiceWorkerAssetsManifestItem Include="MyDirectory\AnotherFile.json"
    RelativePath="MyDirectory\AnotherFile.json" AssetUrl="files/AnotherFile.json" />
</ItemGroup>
```

The `AssetUrl` metadata specifies the base-relative URL that the browser should use when fetching the resource to cache. This can be independent of its original source file name on disk.

> **Important:**
> Adding a `ServiceWorkerAssetsManifestItem` doesn't cause the file to be published in the app's `wwwroot` directory. The publish output must be controlled separately. The `ServiceWorkerAssetsManifestItem` only causes an additional entry to appear in the service worker assets manifest.

## Push notifications

Like any other PWA, a Blazor WebAssembly PWA can receive push notifications from a backend server. The mechanism is independent of Blazor WebAssembly, and the server can send push notifications at any time, even when the user isn't actively using the app. For more information, see Push notifications for ASP.NET Core Blazor Progressive Web Applications (PWAs).
