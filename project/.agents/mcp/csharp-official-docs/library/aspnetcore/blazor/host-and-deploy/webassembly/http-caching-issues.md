---
title: "Avoid HTTP caching issues when upgrading ASP.NET Core Blazor apps"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/host-and-deploy/webassembly/http-caching-issues.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Avoid HTTP caching issues when upgrading ASP.NET Core Blazor apps

This article explains how to avoid HTTP caching issues when upgrading Blazor apps.

When Blazor apps are incorrectly upgraded or configured, it can result in non-seamless upgrades for existing users. This article discusses some of the common HTTP caching issues that can occur when upgrading Blazor apps across major versions. It also provides some recommended actions to ensure a smooth transition for your users.

While future Blazor releases might provide better solutions for dealing with HTTP caching issues, it's ultimately up to the app to correctly configure caching. Proper caching configuration ensures that the app's users always have the most up-to-date version of the app, improving their experience and reducing the likelihood of encountering errors.

Common problems that negatively impact the user upgrade experience include:

* **Incorrect handling of project and package updates**: This happens if you don't update all of the app's deployed projects to use the same major framework version or if you use packages from a previous version when a newer version is available as part of the major upgrade.
* **Incorrect configuration of caching headers**: HTTP caching headers control how, where, and for how long the app's responses are cached. If headers aren't configured correctly, users might receive stale or mismatched files. This includes Blazor bundle assets caching, where server caching headers must be properly set to avoid caching problems on the client.
* **Incorrect configuration of other layers**: Content Delivery Networks (CDNs) and other layers of the deployed app can cause issues if incorrectly configured. For example, CDNs are designed to cache and deliver content to improve performance and reduce latency. If a CDN is incorrectly serving cached versions of assets, it can lead to stale content delivery to the user.

## Detect and diagnose upgrade issues

Upgrade issues typically appear as a failure to start the app in the browser. Normally, a warning indicates the presence of a stale asset or an asset that's missing or inconsistent with the app.

* First, check if the app loads successfully within a clean browser instance. Use a private browser mode to load the app, such as Microsoft Edge InPrivate mode or Google Chrome Incognito mode. If the app fails to load, it likely means that one or more packages or the framework wasn't correctly updated.
* If the app loads correctly in a clean browser instance, then it's likely that the app is being served from a stale cache. In most cases, a hard browser refresh with `Ctrl`+`F5` flushes the cache, which permits the app to load and run with the latest assets.
* If the app continues to fail, then it's likely that a stale CDN cache is serving the app. Try to flush the DNS cache via whatever mechanism your CDN provider offers.

## Recommended actions before an upgrade

The prior process for serving the app might make the update process more challenging. For example, avoiding or incorrectly using caching headers in the past can lead to current caching problems for users. You can take the actions in the following sections to mitigate the issue and improve the upgrade process for users.

### Align framework packages with the framework version

Ensure that framework packages line up with the framework version. Using packages from a previous version when a newer version is available can lead to compatibility issues. It's also important to ensure that all of the app's deployed projects use the same major framework version. This consistency helps to avoid unexpected behavior and errors.

### Verify the presence of correct caching headers

The correct caching headers should be present on responses to resource requests. This includes `ETag`, `Cache-Control`, and other caching headers. The configuration of these headers is dependent on the hosting service or hosting server platform. They are particularly important for assets such as the Blazor script and anything the script downloads.

Incorrect HTTP caching headers may also impact service workers. Service workers rely on caching headers to manage cached resources effectively. Therefore, incorrect or missing headers can disrupt the service worker's functionality.

### Use `Clear-Site-Data` to delete state in the browser

Consider using the `Clear-Site-Data` header to delete state in the browser.

Usually the source of cache state problems is limited to the HTTP browser cache, so use of the `cache` directive should be sufficient. This action can help to ensure that the browser fetches the latest resources from the server, rather than serving stale content from the cache.

You can optionally include the `storage` directive to clear local storage caches at the same time that you're clearing the HTTP browser cache. However, apps that use client storage might experience a loss of important information if the `storage` directive is used.
