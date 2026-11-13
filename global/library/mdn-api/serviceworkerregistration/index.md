---
title: "ServiceWorkerRegistration: index property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerregistration/index/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerRegistration: index property

The **`index`** read-only property of the
`ServiceWorkerRegistration` interface returns a reference to the
`ContentIndex` interface, which allows for indexing of offline content.

## Value

A `ContentIndex` object.

## Examples

You can access the property from either your main script or the registered service
worker.

Here is an example from the main script:

```js
// reference registration
const registration = await navigator.serviceWorker.ready;

// feature detection
if ("index" in registration) {
  // Content Index API functionality
  const contentIndex = registration.index;
}
```

From the service worker:

```js
// service worker script

const contentIndex = self.registration.index;
```

## See also

- Content Index API
- An introductory article on the Content Index API
