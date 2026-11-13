---
title: "Service worker devops (part 1 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/ecosystem/service-workers/devops.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Service worker devops

This page is a reference for deploying and supporting production applications that use the Angular service worker.
It explains how the Angular service worker fits into the larger production environment, the service worker's behavior under various conditions, and available resources and fail-safes.

## Service worker and caching of application resources

Imagine the Angular service worker as a forward cache or a Content Delivery Network (CDN) edge that is installed in the end user's web browser.
The service worker responds to requests made by the Angular application for resources or data from a local cache, without needing to wait for the network.
Like any cache, it has rules for how content is expired and updated.

### Application versions

In the context of an Angular service worker, a "version" is a collection of resources that represent a specific build of the Angular application.
Whenever a new build of the application is deployed, the service worker treats that build as a new version of the application.
This is true even if only a single file is updated.
At any given time, the service worker might have multiple versions of the application in its cache and it might be serving them simultaneously.
For more information, see the Application tabs section.

To preserve application integrity, the Angular service worker groups all files into a version together.
The files grouped into a version usually include HTML, JS, and CSS files.
Grouping of these files is essential for integrity because HTML, JS, and CSS files frequently refer to each other and depend on specific content.
For example, an `index.html` file might have a `<script>` tag that references `bundle.js` and it might attempt to call a function `startApp()` from within that script.
Any time this version of `index.html` is served, the corresponding `bundle.js` must be served with it.
For example, assume that the `startApp()` function is renamed to `runApp()` in both files.
In this scenario, it is not valid to serve the old `index.html`, which calls `startApp()`, along with the new bundle, which defines `runApp()`.

This file integrity is especially important when lazy loading.
A JS bundle might reference many lazy chunks, and the filenames of the lazy chunks are unique to the particular build of the application.
If a running application at version `X` attempts to load a lazy chunk, but the server has already updated to version `X + 1`, the lazy loading operation fails.

The version identifier of the application is determined by the contents of all resources, and it changes if any of them change.
In practice, the version is determined by the contents of the `ngsw.json` file, which includes hashes for all known content.
If any of the cached files change, the file's hash changes in `ngsw.json`. This change causes the Angular service worker to treat the active set of files as a new version.

HELPFUL: The build process creates the manifest file, `ngsw.json`, using information from `ngsw-config.json`.

With the versioning behavior of the Angular service worker, an application server can ensure that the Angular application always has a consistent set of files.

#### Update checks

Every time the user opens or refreshes the application, the Angular service worker checks for updates to the application by looking for updates to the `ngsw.json` manifest.
If an update is found, it is downloaded and cached automatically, and is served the next time the application is loaded.

### Resource integrity

One of the potential side effects of long caching is inadvertently caching a resource that's not valid.
In a normal HTTP cache, a hard refresh or the cache expiring limits the negative effects of caching a file that's not valid.
A service worker ignores such constraints and effectively long-caches the entire application.
It's important that the service worker gets the correct content, so it keeps hashes of the resources to maintain their integrity.

#### Hashed content

To ensure resource integrity, the Angular service worker validates the hashes of all resources for which it has a hash.
For an application created with the Angular CLI, this is everything in the `dist` directory covered by the user's `src/ngsw-config.json` configuration.

If a particular file fails validation, the Angular service worker attempts to re-fetch the content using a "cache-busting" URL parameter to prevent browser or intermediate caching.
If that content also fails validation, the service worker considers the entire version of the application to not be valid and stops serving the application.
If necessary, the service worker enters a safe mode where requests fall back on the network. The service worker doesn't use its cache if there's a high risk of serving content that is broken, outdated, or not valid.

Hash mismatches can occur for a variety of reasons:

- Caching layers between the origin server and the end user could serve stale content
- A non-atomic deployment could result in the Angular service worker having visibility of partially updated content
- Errors during the build process could result in updated resources without `ngsw.json` being updated.
  The reverse could also happen resulting in an updated `ngsw.json` without updated resources.

#### Unhashed content

The only resources that have hashes in the `ngsw.json` manifest are resources that were present in the `dist` directory at the time the manifest was built.
Other resources, especially those loaded from CDNs, have content that is unknown at build time or are updated more frequently than the application is deployed.

If the Angular service worker does not have a hash to verify a resource is valid, it still caches its contents. At the same time, it honors the HTTP caching headers by using a policy of _stale while revalidate_.
The Angular service worker continues to serve a resource even after its HTTP caching headers indicate
that it is no longer valid. At the same time, it attempts to refresh the expired resource in the background.
This way, broken unhashed resources do not remain in the cache beyond their configured lifetimes.

### Application tabs

It can be problematic for an application if the version of resources it's receiving changes suddenly or without warning.
See the Application versions section for a description of such issues.

The Angular service worker provides a guarantee: a running application continues to run the same version of the application.
If another instance of the application is opened in a new web browser tab, then the most current version of the application is served.
As a result, that new tab can be running a different version of the application than the original tab.

IMPORTANT: This guarantee is **stronger** than that provided by the normal web deployment model. Without a service worker, there is no guarantee that lazily loaded code is from the same version as the application's initial code.

The Angular service worker might change the version of a running application under error conditions such as:

- The current version becomes non-valid due to a failed hash.
- An unrelated error causes the service worker to enter safe mode and deactivates it temporarily.

The Angular service worker cleans up application versions when no tab is using them.

Other reasons the Angular service worker might change the version of a running application are normal events:

- The page is reloaded/refreshed.
- The page requests an update be immediately activated using the `SwUpdate` service.

### Service worker updates

The Angular service worker is a small script that runs in web browsers.
From time to time, the service worker is updated with bug fixes and feature improvements.

The Angular service worker is downloaded when the application is first opened and when the application is accessed after a period of inactivity.
If the service worker changes, it's updated in the background.

Most updates to the Angular service worker are transparent to the application. The old caches are still valid and content is still served normally.
Occasionally, a bug fix or feature in the Angular service worker might require the invalidation of old caches.
In this case, the service worker transparently refreshes the application from the network.

#### Updating the service worker when only its response headers change

Browsers only install a new service worker when the service worker script is byte-different from the installed one.
Because `ngsw-worker.js` is usually identical across builds, changing only the response headers that the server sends with it, such as a `Content-Security-Policy`, does not update the installed service worker.
The service worker keeps running with the headers it was installed with.

To make browsers install the service worker again, register it with a versioned script URL, and change the version whenever those headers change:

```ts
provideServiceWorker('ngsw-worker.js?v=2', {
  enabled: !isDevMode(),
  registrationStrategy: 'registerWhenStable:30000',
});
```

Registering a different script URL makes the browser fetch and install the service worker again, even if its content is unchanged.
The Angular service worker resolves its caches and `ngsw.json` relative to its registration scope, not its script URL, so the query parameter doesn't affect cached content.

### Bypassing the service worker

In some cases, you might want to bypass the service worker entirely and let the browser handle the request.
An example is when you rely on a feature that is currently not supported in service workers, such as reporting progress on uploaded files.

To bypass the service worker, set `ngsw-bypass` as a request header, or as a query parameter.
The value of the header or query parameter is ignored and can be empty or omitted.

### Service worker requests when the server can't be reached

The service worker processes all requests unless the service worker is explicitly bypassed.
The service worker either returns a cached response or sends the request to the server, depending on the state and configuration of the cache.
The service worker only caches responses to non-mutating requests, such as `GET` and `HEAD`.

If the service worker receives an error from the server or it doesn't receive a response, it returns an error status that indicates the result of the call.
For example, if the service worker doesn't receive a response, it creates a 504 Gateway Timeout status to return. The `504` status in this example could be returned because the server is offline or the client is disconnected.
