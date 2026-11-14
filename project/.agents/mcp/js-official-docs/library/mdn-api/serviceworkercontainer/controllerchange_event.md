---
title: "ServiceWorkerContainer: controllerchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkercontainer/controllerchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerContainer: controllerchange event

The **`controllerchange`** event of the `ServiceWorkerContainer` interface fires when the document's associated `ServiceWorkerRegistration` acquires a new `active` worker.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("controllerchange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oncontrollerchange = (event) => { }
```

## Event type

A generic `Event`.

## Example

```js
navigator.serviceWorker.addEventListener("controllerchange", () => {
  console.log("The controller of current browsing context has changed.");
});
```
