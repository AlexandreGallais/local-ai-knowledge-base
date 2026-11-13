---
title: "XRProjectionLayer: textureArrayLength property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrprojectionlayer/texturearraylength/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRProjectionLayer: textureArrayLength property

The read-only **`textureArrayLength`** property of the `XRProjectionLayer` interface indicates layer's layer count for array textures when using `texture-array` as the `textureType`.

The projection layer's layer count for array textures is determined by the user agent or the device. It is reported in the `XRSubImage`, which can only be accessed inside the frame loop. If you want to manage your own depth buffers and don't want to wait for first frame after layer creation to determine the required dimensions for those buffers, the `textureArrayLength` property allows access to layer count for array textures outside the frame loop. Allocation of these buffers can happen directly after layer creation.

## Value

A number indicating the number of layers of the color textures when using `texture-array` as the `textureType`. Otherwise it will be `1`.

## See also

- `XRSubImage`
