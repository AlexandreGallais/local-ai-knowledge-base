---
title: "XRCompositionLayer: blendTextureSourceAlpha property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrcompositionlayer/blendtexturesourcealpha/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRCompositionLayer: blendTextureSourceAlpha property

The **`blendTextureSourceAlpha`** property of the `XRCompositionLayer` interface is a boolean enabling the layer's texture alpha channel.

## Value

A boolean. `true` enables the alpha channel, `false` disables it.

## Examples

### Setting a layer's texture alpha channel

The following code snippet toggles a layer to opaque and back.

```js
myLayer.blendTextureSourceAlpha = !myLayer.blendTextureSourceAlpha;
```

## See also

- Alpha channel
