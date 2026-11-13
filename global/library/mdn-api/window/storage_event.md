---
title: "Window: storage event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/storage_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: storage event

The **`storage`** event of the `Window` interface fires when another document that shares the same storage area (either `localStorage` or `sessionStorage`) as the current window updates that storage area. The event is _not_ fired on the window that made the change.

- For `localStorage`, the event is fired in all other browsing contexts that are in the same origin as the initiating document. This includes other tabs with the same origin.
- For `sessionStorage`, the event is fired in all other browsing contexts that are in the same origin and the same top-level browsing context as the initiating document. This only includes embedded iframes, if any, in the same tab, and not other tabs.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("storage", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onstorage = (event) => { }
```

## Event type

A `StorageEvent`. Inherits from `Event`.

## Event handler aliases

In addition to the `Window` interface, the event handler property `onstorage` is also available on the following targets:

- `HTMLBodyElement`
- `HTMLFrameSetElement`
- `SVGSVGElement`

## Examples

Log the `sampleList` item to the console when the `storage` event fires:

```js
window.addEventListener("storage", () => {
  // When local storage changes, dump the list to
  // the console.
  console.log(JSON.parse(window.localStorage.getItem("sampleList")));
});
```

The same action can be achieved using the `onstorage` event handler property (but note that this replaces other event listeners added using `onstorage`, if any):

```js
window.onstorage = () => {
  // When local storage changes, dump the list to
  // the console.
  console.log(JSON.parse(window.localStorage.getItem("sampleList")));
};
```

## See also

- `Web Storage API`
- Using the Web Storage API
- Responding to storage changes with the StorageEvent
