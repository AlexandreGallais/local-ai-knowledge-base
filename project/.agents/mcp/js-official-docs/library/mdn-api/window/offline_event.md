---
title: "Window: offline event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/offline_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: offline event

The **`offline`** event of the `Window` interface is fired when the browser has lost access to the network and the value of `Navigator.onLine` switches to `false`.

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

## Event handler aliases

In addition to the `Window` interface, the event handler property `onoffline` is also available on the following targets:

- `HTMLBodyElement`
- `HTMLFrameSetElement`
- `SVGSVGElement`

## Examples

```js
// addEventListener version
window.addEventListener("offline", (event) => {
  console.log("The network connection has been lost.");
});

// onoffline version (but note that this replaces other event listeners
// added using onoffline, if any)
window.onoffline = (event) => {
  console.log("The network connection has been lost.");
};
```

## See also

- `online`
