---
title: "XRCompositionLayer: layout property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrcompositionlayer/layout/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRCompositionLayer: layout property

The read-only **`layout`** property of the `XRCompositionLayer` interface is the layout type of the layer.

To specify the layout type of a layer, use one of the layer creation methods and their `layout` option:

- `XRWebGLBinding.createQuadLayer()`
- `XRWebGLBinding.createCylinderLayer()`
- `XRWebGLBinding.createEquirectLayer()`
- `XRWebGLBinding.createCubeLayer()`

## Value

A string. Possible values:

- `default`
    The layer accommodates all views of the session. It is recommended to use the `texture-array` texture type for `default` layouts.
- `mono`
    A single `XRSubImage` is allocated and presented to both eyes.
- `stereo`
    The user agent decides how it allocates the `XRSubImage` (one or two) and the layout (top/bottom or left/right). It is recommended to use the `texture-array` texture type for `stereo` layouts.
- `stereo-left-right`
    A single `XRSubImage` is allocated. Left eye gets the left area of the texture, right eye the right. This layout is designed to minimize draw calls for content that is already in stereo (for example stereo videos or images).
- `stereo-top-bottom`
    A single `XRSubImage` is allocated. Left eye gets the top area of the texture, right eye the bottom. This layout is designed to minimize draw calls for content that is already in stereo (for example stereo videos or images).

## Examples

### Setting and getting a layer's layout

To specify a layer's layout, use a layer creation method (like `XRWebGLBinding.createQuadLayer()`) and its `layout` option. To retrieve the type of layer layout, use the `layout` property:

```js
const layer = xrGlBinding.createQuadLayer({
  pixelWidth: 1024,
  pixelHeight: 768,
  layout: "stereo",
});

layer.layout; // "stereo"
```

## See also

- `XRSubImage`
- `XRWebGLBinding.createQuadLayer()`
- `XRWebGLBinding.createCylinderLayer()`
- `XRWebGLBinding.createEquirectLayer()`
- `XRWebGLBinding.createCubeLayer()`
