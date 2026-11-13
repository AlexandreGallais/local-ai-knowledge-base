---
title: "WorkerGlobalScope: offline event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerglobalscope/offline_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerGlobalScope: offline event

The **`offline`** event of the `WorkerGlobalScope` fires when the device loses connection to the internet.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("offline", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onoffline = (event) => { }
```

## Event type

A generic `Event`.

## Example

The following code snippet shows an `onoffline` handler set inside a worker (but note that this replaces other event listeners added using `onoffline`, if any):

```js
self.onoffline = () => {
  console.log("Your worker is now offline");
};
```

The same snippet, but using `addEventListener()`:

```js
self.addEventListener("offline", () => {
  console.log("Your worker is now offline");
});
```

## See also

The `WorkerGlobalScope` interface it belongs to.
