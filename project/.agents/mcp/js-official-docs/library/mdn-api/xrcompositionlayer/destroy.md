---
title: "XRCompositionLayer: destroy() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrcompositionlayer/destroy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRCompositionLayer: destroy() method

The **`destroy()`** method of the `XRCompositionLayer` interface deletes the references to the underlying graphics library for the layer. It also sets the color textures and depth stencil texture arrays to an empty array.

## Syntax

```js
destroy()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Deleting a layer

Call `destroy()` to delete a layer.

```js
myLayer.destroy();
```
