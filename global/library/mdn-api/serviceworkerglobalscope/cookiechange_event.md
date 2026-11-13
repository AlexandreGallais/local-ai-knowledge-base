---
title: "ServiceWorkerGlobalScope: cookiechange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerglobalscope/cookiechange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerGlobalScope: cookiechange event

The **`cookiechange`** event of the `ServiceWorkerGlobalScope` interface is fired when a cookie change occurs that matches the service worker's cookie change subscription list.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("cookiechange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oncookiechange = (event) => { }
```

## Event type

An `ExtendableCookieChangeEvent`. Inherits from `ExtendableEvent`.
