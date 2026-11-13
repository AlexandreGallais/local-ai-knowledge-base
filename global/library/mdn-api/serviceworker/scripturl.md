---
title: "ServiceWorker: scriptURL property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworker/scripturl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorker: scriptURL property

The **`scriptURL`** read-only property of the `ServiceWorker` interface returns the `ServiceWorker` serialized script URL defined as part of `ServiceWorkerRegistration`. Must be on the same origin as the document that registers the `ServiceWorker`.

## Value

A string.

## Examples

```js
const sw = navigator.serviceWorker.controller;
console.log(sw.scriptURL);
// https://example.com/scripts/service-worker.js
```
