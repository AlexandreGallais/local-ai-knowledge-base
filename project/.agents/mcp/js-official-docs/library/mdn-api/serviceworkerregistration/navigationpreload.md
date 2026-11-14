---
title: "ServiceWorkerRegistration: navigationPreload property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerregistration/navigationpreload/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerRegistration: navigationPreload property

The **`navigationPreload`** read-only property of the `ServiceWorkerRegistration` interface returns the `NavigationPreloadManager` associated with the current service worker registration.

The returned object allows resources managed by a service worker to be preemptively downloaded in parallel with service worker boot up.

## Value

An instance of `NavigationPreloadManager`.
