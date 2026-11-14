---
title: "XRCubeLayer: redraw event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrcubelayer/redraw_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRCubeLayer: redraw event

The `redraw` event is sent to the `XRCubeLayer` object when the underlying resources of the layer are lost or when the XR Compositor can no longer reproject the layer. If this event is sent, authors should redraw the content of the layer in the next XR animation frame.

See also the `XRCompositionLayer.needsRedraw` property which is also available to `XRCubeLayer` objects through inheritance from `XRCompositionLayer`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("redraw", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onredraw = (event) => { }
```

## Event type

An `XRLayerEvent`. Inherits from `Event`.

## Examples

### Using the `redraw` event

You can pass `redraw` to `addEventListener()`:

```js
cubeLayer.addEventListener("redraw", (event) => {
  // redraw the layer
});
```

Alternatively, you can use the `onredraw` event handler property to establish a handler for the `redraw` event (but note that this replaces other event listeners added using `onredraw`, if any):

```js
cubeLayer.onredraw = (event) => {
  // redraw the layer
};
```

## See also

- `XRCompositionLayer.needsRedraw`
