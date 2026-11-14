---
title: "GPUCommandEncoder: copyTextureToBuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucommandencoder/copytexturetobuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCommandEncoder: copyTextureToBuffer() method

The **`copyTextureToBuffer()`** method of the
`GPUCommandEncoder` interface encodes a command that copies data from a `GPUTexture` to a `GPUBuffer`.

## Syntax

```js
copyTextureToBuffer(source, destination, copySize)
```

### Parameters

- `source`
    An object defining the texture to copy the data from. Combined with `copySize`, defines the region of the source texture subresource. `source` can take the following properties:
    - `aspect` (optional)
        An enumerated value defining which aspects of the texture to copy the data from. Possible values are:
        - `"all"`
            All available aspects of the texture format will be copied from, which can mean all or any of color, depth, and stencil, depending on what kind of format you are dealing with.
        - `"depth-only"`
            Only the depth aspect of a depth-or-stencil format will be copied from.
        - `"stencil-only"`
            Only the stencil aspect of a depth-or-stencil format will be copied from.

        If omitted, `aspect` takes a value of `"all"`.

    - `mipLevel` (optional)
        A number representing the mip-map level of the texture to copy the data from. If omitted, `mipLevel` defaults to 0.
    - `origin` (optional)
        An object or array specifying the origin of the copy — the minimum corner of the texture region to copy the data from. Together with `size`, this defines the full extent of the region to copy from. The `x`, `y`, and `z` values default to 0 if any of all of `origin` is omitted.

        For example, you can pass an array `[0, 0, 0]`, or its equivalent object `{ x: 0, y: 0, z: 0 }`.

    - `texture`
        A `GPUTexture` object representing the texture to copy the data from.

- `destination`
    An object that defines the buffer to write to, plus the layout of the data to write to the buffer. Combined with `copySize`, it defines the region of the destination buffer. `source` can take the following properties:
    - `buffer`
        The `GPUBuffer` to write to.
    - `offset` (optional)
        The offset, in bytes, from the beginning of `data` to the start position to write the copied data to. If omitted, `offset` defaults to 0.
    - `bytesPerRow` (optional)
        A number representing the stride, in bytes, between the start of each block row (i.e., a row of complete texel blocks) and the subsequent block row. This is required if there are multiple block rows (i.e., the copy height or depth is more than one block).
    - `rowsPerImage` (optional)
        The number of block rows per single image inside the data. `bytesPerRow` &times; `rowsPerImage` will give you the stride, in bytes, between the start of each complete image. This is required if there are multiple images to copy.

- `copySize`
    An object or array specifying the width, height, and depth/array layer count of the copied data. The width value must always be specified, while the height and depth/array layer count values are optional and will default to 1 if omitted.

    For example, you can pass an array `[16, 16, 2]`, or its equivalent object `{ width: 16, height: 16, depthOrArrayLayers: 2 }`.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`copyTextureToBuffer()`**, otherwise a `GPUValidationError` is generated and the `GPUCommandEncoder` becomes invalid.

For the `source`:

- `mipLevel` is less than the `GPUTexture.mipLevelCount`.
- `origin.x` is a multiple of the texel block width of the `GPUTexture.format`.
- `origin.y` is a multiple of the texel block height of the `GPUTexture.format`.
- If the `GPUTexture.format` is a depth-or-stencil format or `GPUTexture.sampleCount` is more than 1, the subresource size is equal to `size`.
- The `source`'s `GPUTexture.usage` includes the `GPUTextureUsage.COPY_SRC` flag.
- The `source`'s `GPUTexture.sampleCount` is 1.
- `source.aspect` refers to a single aspect of the `GPUTexture.format`.
- That aspect is a valid image copy source according to depth-or-stencil formats.
- The `source` is compatible with the `copySize`.

For the `destination`:

- `destination.bytesPerRow` is a multiple of 256.
- The `destination.buffer`'s `GPUBuffer.usage` includes the `GPUBufferUsage.COPY_DST` flag.

## Examples

```js
commandEncoder.copyTextureToBuffer(
  {
    texture: sourceTexture,
  },
  {
    buffer: destinationBuffer,
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
