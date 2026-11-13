---
title: "GPUQueue: writeTexture() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuqueue/writetexture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUQueue: writeTexture() method

The **`writeTexture()`** method of the
`GPUQueue` interface writes a provided data source into a given `GPUTexture`.

This is a convenience function, which provides an alternative to setting texture data via buffer mapping and buffer-to-texture copies. It lets the user agent determine the most efficient way to copy the data over.

## Syntax

```js
writeTexture(destination, data, dataLayout, size)
```

### Parameters

- `destination`
    An object defining the texture subresource and origin to write the data source to, which can take the following properties:
    - `aspect` (optional)
        An enumerated value defining which aspects of the texture to write the data to. Possible values are:
        - `"all"`
            All available aspects of the texture format will be written to, which can mean all or any of color, depth, and stencil, depending on what kind of format you are dealing with.
        - `"depth-only"`
            Only the depth aspect of a depth-or-stencil format will be written to.
        - `"stencil-only"`
            Only the stencil aspect of a depth-or-stencil format will be written to.

        If omitted, `aspect` takes a value of `"all"`.

    - `mipLevel` (optional)
        A number representing the mip-map level of the texture to write the data to. If omitted, `mipLevel` defaults to 0.
    - `origin` (optional)
        An object or array specifying the origin of the copy — the minimum corner of the texture region to write the data to. Together with `size`, this defines the full extent of the region to copy to. The `x`, `y`, and `z` values default to 0 if any of all of `origin` is omitted.

        For example, you can pass an array like `[0, 0, 0]`, or its equivalent object `{ x: 0, y: 0, z: 0 }`.

    - `texture`
        A `GPUTexture` object representing the texture to write the data to.

- `data`
    An object representing the data source to write into the `GPUTexture`. This can be an `ArrayBuffer`, `TypedArray`, or `DataView`.
- `dataLayout`
    An object that defines the layout of the content contained in `data`. Possible values are:
    - `offset` (optional)
        The offset, in bytes, from the beginning of `data` to the start of the image data to be copied. If omitted, `offset` defaults to 0.
    - `bytesPerRow` (optional)
        A number representing the stride, in bytes, between the start of each block row (i.e., a row of complete texel blocks) and the subsequent block row. This is required if there are multiple block rows (i.e., the copy height or depth is more than one block).
    - `rowsPerImage` (optional)
        The number of block rows per single image of the texture. `bytesPerRow` &times; `rowsPerImage` will give you the stride, in bytes, between the start of each complete image. This is required if there are multiple images to copy.
- `size`
    An object or array specifying the extent of the copy — the far corner of the texture region to write the data to. Together with `destination.origin`, this defines the full extent of the region to copy to. See `destination.origin` for examples of the object/array structure.

### Return value

None (`undefined`).

### Validation

The following criteria must be met when calling **`writeTexture()`**, otherwise a `GPUValidationError` is generated and the `GPUQueue` becomes invalid:

- `mipLevel` is less than the destination `GPUTexture.mipLevelCount`.
- `origin.x` is a multiple of the texel block width of the destination `GPUTexture.format`.
- `origin.y` is a multiple of the texel block height of the destination `GPUTexture.format`.
- If the destination `GPUTexture.format` is a depth-or-stencil format or `GPUTexture.sampleCount` is more than 1, the subresource size is equal to `size`.
- The destination `GPUTexture.usage` includes the `GPUTextureUsage.COPY_DST` flag.
- The destination `GPUTexture.sampleCount` is 1.
- `destination.origin.x` + the `destination` `GPUTexture.width` is less than or equal to the width of the subresource to write to the `destination` `GPUTexture`.
- `destination.origin.y` + the `destination` `GPUTexture.height` is less than or equal to the height of the subresource to write to the `destination` `GPUTexture`.
- `destination.origin.z` + the `destination` `GPUTexture.depthOrArrayLayers` is less than or equal to the depthOrArrayLayers of the subresource to write to the `destination` `GPUTexture`.
- The `destination` `GPUTexture.width` is a multiple of the texel block width of the destination `GPUTexture.format`.
- The `destination` `GPUTexture.height` is a multiple of the texel block height of the destination `GPUTexture.format`.
- `destination.aspect` refers to a single aspect of the destination `GPUTexture.format`.
- That aspect is a valid image copy destination according to depth-or-stencil formats.
- The `destination` is otherwise compatible with the `GPUTexture.format`.

## Examples

In Efficiently rendering glTF models, a function is defined for creating a solid color texture:

```js
function createSolidColorTexture(r, g, b, a) {
  const data = new Uint8Array([r * 255, g * 255, b * 255, a * 255]);
  const texture = device.createTexture({
    size: { width: 1, height: 1 },
    format: "rgba8unorm",
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
  });
  device.queue.writeTexture({ texture }, data, {}, { width: 1, height: 1 });
  return texture;
}
```

This can be used to define standard textures for use in material libraries:

```js
const opaqueWhiteTexture = createSolidColorTexture(1, 1, 1, 1);
const transparentBlackTexture = createSolidColorTexture(0, 0, 0, 0);
const defaultNormalTexture = createSolidColorTexture(0.5, 0.5, 1, 1);
```

## See also

- The WebGPU API
