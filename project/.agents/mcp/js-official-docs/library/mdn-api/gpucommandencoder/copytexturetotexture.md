---
title: "GPUCommandEncoder: copyTextureToTexture() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucommandencoder/copytexturetotexture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCommandEncoder: copyTextureToTexture() method

The **`copyTextureToTexture()`** method of the
`GPUCommandEncoder` interface encodes a command that copies data from one `GPUTexture` to another.

## Syntax

```js
copyTextureToTexture(source, destination, copySize)
```

### Parameters

- `source`
    An object (see Copy texture object structure) defining the texture to copy the data from. Combined with `copySize`, this defines the region of the source texture subresource.
- `destination`
    An object (see Copy texture object structure) defining the texture to write the data to. Combined with `copySize`, this defines the region of the destination texture subresource.
- `copySize`
    An object or array specifying the width, height, and depth/array layer count of the copied data. The width value must always be specified, while the height and depth/array layer count values are optional and will default to 1 if omitted.

    For example, you can pass an array `[16, 16, 2]`, or its equivalent object `{ width: 16, height: 16, depthOrArrayLayers: 2 }`.

### Copy texture object structure

A copy texture object has the following structure:

- `aspect` (optional)
    An enumerated value defining which aspects of the texture to copy the data from/to. Possible values are:
    - `"all"`
        All available aspects of the texture format will be copied from/to, which can mean all or any of color, depth, and stencil, depending on what kind of format you are dealing with.
    - `"depth-only"`
        Only the depth aspect of a depth-or-stencil format will be copied from/to.
    - `"stencil-only"`
        Only the stencil aspect of a depth-or-stencil format will be copied from/to.

    If omitted, `aspect` takes a value of `"all"`.

- `mipLevel` (optional)
    A number representing the mip-map level of the texture to copy the data from/to. If omitted, `mipLevel` defaults to 0.
- `origin` (optional)
    An object or array specifying the origin of the copy/destination — the minimum corner of the texture region to copy the data from/to. Together with `size`, this defines the full extent of the region to copy from/to. The `x`, `y`, and `z` values default to 0 if any of all of `origin` is omitted.

    For example, you can pass an array like `[0, 0, 0]`, or its equivalent object `{ x: 0, y: 0, z: 0 }`.

- `texture`
    A `GPUTexture` object representing the texture to copy the data from/to.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`copyTextureToTexture()`**, otherwise a `GPUValidationError` is generated and the `GPUCommandEncoder` becomes invalid.

For the `source`:

- The `source`'s `GPUTexture.usage` includes the `GPUTextureUsage.COPY_SRC` flag.

For the `destination`:

- The `destination`'s `GPUTexture.usage` includes the `GPUTextureUsage.COPY_DST` flag.

For `source` and `destination`:

- `mipLevel` is less than the `GPUTexture.mipLevelCount`.
- `origin.x` is a multiple of the texel block width of the `GPUTexture.format`.
- `origin.y` is a multiple of the texel block height of the `GPUTexture.format`.
- The source and destination `texture` `GPUTexture.format`s are copy-compatible.
- The source and destination `texture` `GPUTexture.sampleCount`s are equal.
- If the `GPUTexture.format` is a depth-or-stencil format or `GPUTexture.sampleCount` is more than 1, the subresource size is equal to `size`.
- If the `GPUTexture.format` is a depth-or-stencil format, the `source` and `destination` `aspect`s both refer to all aspects of their respective textures' `GPUTexture.format`s.
- The `texture` is compatible with the `copySize`.
- The sets of subresources defined by `source` combined with `copySize`, and `destination` combined with `copySize`, are disjoint.

## Examples

```js
commandEncoder.copyTextureToTexture(
  {
    texture: sourceTexture,
  },
  {
    texture: destinationTexture,
  },
  {
    width: 16,
    height: 16,
    depthOrArrayLayers: 2,
  },
);
```

## See also

- The WebGPU API
