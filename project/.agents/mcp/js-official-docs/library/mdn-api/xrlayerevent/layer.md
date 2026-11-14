---
title: "XRLayerEvent: layer property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrlayerevent/layer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRLayerEvent: layer property

The **`layer`** property of the `XRLayerEvent` interface is a reference to the `XRLayer` which generated the event.

## Value

An `XRLayer`.

## Examples

### Using the `layer` property

In this example, the `layer` property is used to obtain the `XRLayer` object that sent the event.

```js
myLayer.addEventListener("redraw", (e) => {
  if (e.layer instanceof XRQuadLayer) {
    // redraw quad layer
  }
});
```

## See also

- `XRLayer`
