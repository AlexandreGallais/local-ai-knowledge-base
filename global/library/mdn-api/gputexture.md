---
title: "GPUTexture"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gputexture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUTexture

The **`GPUTexture`** interface of the `WebGPU API` represents a container used to store 1D, 2D, or 3D arrays of data, such as images, to use in GPU rendering operations.

A `GPUTexture` object instance is created using the `GPUDevice.createTexture()` method.

## Instance properties

- `depthOrArrayLayers` (read-only)
    A number representing the depth or layer count of the `GPUTexture` (pixels, or number of layers).
- `dimension` (read-only)
    An enumerated value representing the dimension of the set of texels for each `GPUTexture` subresource.
- `format` (read-only)
    An enumerated value representing the format of the `GPUTexture`. See the Texture formats section of the specification for all the possible values. Also see Tier 1 and Tier 2 texture formats.
- `height` (read-only)
    A number representing the height of the `GPUTexture` in pixels.
- `label`
    A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.
- `mipLevelCount` (read-only)
    A number representing the number of mip levels of the `GPUTexture`.
- `sampleCount` (read-only)
    A number representing the sample count of the `GPUTexture`.
- `usage` (read-only)
    The bitwise flags representing the allowed usages of the `GPUTexture`.
- `width` (read-only)
    A number representing the width of the `GPUTexture` in pixels.

## Instance methods

- `createView()`
    Creates a `GPUTextureView` representing a specific view of the `GPUTexture`.
- `destroy()`
    Destroys the `GPUTexture`.

## Examples

In the WebGPU samples Textured Cube sample, a texture to use on the faces of a cube is created by:

- Loading the image into an `HTMLImageElement` and creating an image bitmap using `createImageBitmap()`.
- Creating a new `GPUTexture` using `createTexture()`.
- Copying the image bitmap into the texture using `GPUQueue.copyExternalImageToTexture()`.

```js
// …
let cubeTexture;
{
  const img = document.createElement("img");

  img.src = new URL(
    "../../../assets/img/Di-3d.png",
    import.meta.url,
  ).toString();

  await img.decode();

  const imageBitmap = await createImageBitmap(img);

  cubeTexture = device.createTexture({
    size: [imageBitmap.width, imageBitmap.height, 1],
    format: "rgba8unorm",
    usage:
      GPUTextureUsage.TEXTURE_BINDING |
      GPUTextureUsage.COPY_DST |
      GPUTextureUsage.RENDER_ATTACHMENT,
  });

  device.queue.copyExternalImageToTexture(
    { source: imageBitmap },
    { texture: cubeTexture },
    [imageBitmap.width, imageBitmap.height],
  );
}
// …
```

## See also

- The WebGPU API
