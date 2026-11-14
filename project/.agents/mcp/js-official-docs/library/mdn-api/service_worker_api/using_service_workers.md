---
title: "Using Service Workers (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/service_worker_api/using_service_workers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using Service Workers

This article provides information on getting started with service workers, including basic <example-value>, registering a service worker, the installation and activation process for a new service worker, updating your service worker, cache control and custom responses, all in the context of an app with offline functionality.

## The premise of service workers

One overriding problem that web users have suffered with for years is loss of connectivity. The best web app in the world will provide a terrible user experience if you can't download it. There have been various attempts to create technologies to solve this problem, and some of the issues have been solved. But the overriding problem is that there wasn't a good overall control mechanism for asset caching and custom network requests.

Service workers fix these issues. Using a service worker you can set an app up to use cached assets first, thus providing a default experience even when offline, before then getting more data from the network (commonly known as "offline first"). This is already available with native apps, which is one of the main reasons native apps are often chosen over web apps.

A service worker functions like a proxy server, allowing you to modify requests and responses replacing them with items from its own cache.

## Setting up to play with service workers

Service workers are enabled by default in all modern browsers. To run code using service workers, you'll need to serve your code via HTTPS — Service workers are restricted to running across HTTPS for security reasons. A server supporting HTTPS is necessary. To host experiments, you can use a service such as GitHub, Netlify, Vercel, etc. In order to facilitate local development, `localhost` is considered a secure origin by browsers as well.

## Basic <example-value>

With service workers, the following steps are generally observed for initial installation and for replacing an existing service worker. The diagrams show an example that populates versioned caches during installation and removes old caches during activation.

### Initial installation

In this example, two pages are already open before the first service worker is registered. One of the pages calls `serviceWorkerContainer.register()`, which initiates the process.

1. The service worker code is fetched and then registered. If successful, the service worker is executed in a `ServiceWorkerGlobalScope`; this is basically a special kind of worker context, running off the main script execution thread, with no DOM access. The service worker is now ready to process events.

2. Installation takes place. An `install` event is always the first one sent to a service worker (this can be used to start the process of populating an IndexedDB, and caching site assets). During this step, the application is preparing to make everything available for use offline.

3. When installation completes successfully, the service worker is considered installed.

4. Because this is the first service worker, it receives an `activate` event without waiting for open pages to close. The `activate` handler can finish setting up the service worker.

5. After activation, the service worker will control pages opened within its scope. Existing documents will have to be reloaded to actually be controlled, because a document starts life with or without a service worker and maintains that for its lifetime. To override this default behavior and adopt open pages, a service worker can call `clients.claim()`.

### Replacing an existing service worker

This independent example starts with one open client controlled by version 1. It illustrates the default waiting behavior when replacing an existing service worker.

1. Whenever a new version of a service worker is fetched, this cycle happens again. The previous version remains active and continues to control its clients.

2. Installation takes place for the new version. Its `install` handler can populate a new cache while the old version continues to use its existing cache.

3. When installation completes successfully, the new version waits while the old version is still controlling clients. The new version is not yet active.

4. Once all pages controlled by the old version of the service worker have closed and the old version has finished handling pending events, it's safe to retire the old version, and the newly installed service worker receives an `activate` event. The primary use of `activate` is to clean up resources used in previous versions of the service worker, such as the old cache in this example.

   The new service worker can call `skipWaiting()` to ask to be activated without waiting for open pages to be closed. It then takes over the pages controlled by the old version.

5. After activation, newly opened pages within the registration's scope are controlled by the new version.

### Service worker events

Here is a summary of the available service worker events:

- `install`
- `activate`
- `message`
- Functional events
  - `fetch`
  - `sync`
  - `push`

## Demo

To demonstrate just the very basics of registering and installing a service worker, we have created a demo called simple service worker, which is a simple Star Wars Lego image gallery. It uses a promise-powered function to read image data from a JSON object and load the images using `fetch()`, before displaying the images in a line down the page. We've kept things static for now. It also registers, installs, and activates a service worker.

You can see the source code on GitHub, and the simple service worker running live.

### Registering your worker

The first block of code in our app's JavaScript file — `app.js` — is as follows. This is our entry point into using service workers.

```js
const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

// …

registerServiceWorker();
```

1. The `if`-block performs a feature detection test to make sure service workers are supported before trying to register one.
2. Next, we use the `ServiceWorkerContainer.register()` function to register the service worker for this site. The service worker code is in a JavaScript file residing inside our app (note this is the file's URL relative to the origin, not the JS file that references it.)
3. The `scope` parameter is optional, and can be used to specify the subset of your content that you want the service worker to control. In this case, we have specified `'/'`, which means all content under the app's origin. If you leave it out, it will default to this value anyway, but we specified it here for illustration purposes.

This registers a service worker, which runs in a worker context, and therefore has no DOM access.

A single service worker can control many pages. Each time a page within your scope is loaded, the service worker is installed against that page and operates on it. Bear in mind therefore that you need to be careful with global variables in the service worker script: each page doesn't get its own unique worker.

> **Note:**
> One great thing about service workers is that if you use feature detection like we've shown above, browsers that don't support service workers can just use your app online in the normal expected fashion.

#### Why is my service worker failing to register?

A service worker fails to register for one of the following reasons:

- You are not running your application in a secure context (over HTTPS).
- The path of the service worker file is incorrect.
  The path must be relative to the origin, not an app's root directory.
  In our example, the worker is at `https://bncb2v.csb.app/sw.js`, and the app's root is `https://bncb2v.csb.app/`, so the service worker must be specified as `/sw.js`.
- The path to your service worker points to a service worker of a different origin to your app.
- The service worker registration contains a `scope` option broader than permitted by the worker path.
  The default scope for a service worker is the directory where the worker is located.
  In other words, if the script `sw.js` is located in `/js/sw.js`, it can only control URLs in (or nested within) the `/js/` path by default.
  The scope for a service worker can be broadened (or narrowed) with the `Service-Worker-Allowed` header.
- Browser-specific settings are enabled, such as blocking all cookies, private browsing mode, automatic cookie deletion on close, etc.
  See `serviceWorker.register()` browser compatibility for more information.

### Install and activate: populating your cache

After your service worker is registered, the browser will attempt to install then activate the service worker for your page/site.

The `install` event is the first event that is fired on service worker installation or update.
It is emitted just once, immediately after registration is successfully completed, and is generally used to populate your browser's offline caching capabilities with the assets you need to run your app offline. To do this, we use Service Worker's storage API — `cache` — a global object on the service worker that allows us to store assets delivered by responses, and keyed by their requests. This API works in a similar way to the browser's standard cache, but it is specific to your domain. The contents of the cache are kept until you clear them.

Here's how our service worker handles the `install` event:

```js
const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      "/",
      "/index.html",
      "/style.css",
      "/app.js",
      "/image-list.js",
      "/star-wars-logo.jpg",
      "/gallery/bountyHunters.jpg",
      "/gallery/myLittleVader.jpg",
      "/gallery/snowTroopers.jpg",
    ]),
  );
});
```

1. Here we add an `install` event listener to the service worker (hence `self`), and then chain an `ExtendableEvent.waitUntil()` method onto the event — this ensures that the service worker will not install until the code inside `waitUntil()` has successfully occurred.
2. Inside `addResourcesToCache()` we use the `caches.open()` method to create a new cache called `v1`, which will be version 1 of our site resources cache. Then we call a function `addAll()` on the created cache, which for its parameter takes an array of URLs to all the resources you want to cache. The URLs are relative to the worker's `location`.
3. If the promise is rejected, the installation fails, and the worker won't do anything. This is OK, as you can fix your code and then try again the next time registration occurs.
4. After a successful installation, the service worker activates. This doesn't have much of a distinct use the first time your service worker is installed/activated, but it means more when the service worker is updated (see the Updating your service worker section later on.)

> **Note:**
> The Web Storage API (`localStorage`) works in a similar way to service worker cache, but it is synchronous, so not allowed in service workers.

> **Note:**
> IndexedDB can be used inside a service worker for data storage if you require it.

### Custom responses to requests

Now you've got your site assets cached, you need to tell service workers to do something with the cached content. This is done with the `fetch` event.

1. A `fetch` event fires every time any resource controlled by a service worker is fetched, which includes the documents inside the specified scope, and any resources referenced in those documents (for example if `index.html` makes a cross-origin request to embed an image, that still goes through its service worker.)

2. You can attach a `fetch` event listener to the service worker, then call the `respondWith()` method on the event to hijack our HTTP responses and update them with your own content.

   ```js
   self.addEventListener("fetch", (event) => {
     event.respondWith(/* custom content goes here */);
   });
   ```

3. We could start by responding with the resource whose URL matches that of the network request, in each case:

   ```js
   self.addEventListener("fetch", (event) => {
     event.respondWith(caches.match(event.request));
   });
   ```

   `caches.match(event.request)` allows us to match each resource requested from the network with the equivalent resource available in the cache, if there is a matching one available. The matching is done via URL and various headers, just like with normal HTTP requests.
