---
title: "GPUDevice: importExternalTexture() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpudevice/importexternaltexture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUDevice: importExternalTexture() method

The **`importExternalTexture()`** method of the
`GPUDevice` interface takes an `HTMLVideoElement` or a `VideoFrame` object as an input and returns a `GPUExternalTexture` wrapper object containing a snapshot of the video that can be used as a frame in GPU rendering operations.

## Syntax

```js
importExternalTexture(descriptor)
```

### Parameters

- `descriptor`
    An object containing the following properties:
    - `colorSpace` (optional)
        An enumerated value specifying the color space to use for the video frame. Possible values are `"srgb"` and `"display-p3"`. If omitted, `colorSpace` defaults to `"srgb"`.
    - `label` (optional)
        A string providing a label that can be used to identify the object, for example in `GPUError` messages or console warnings.
    - `source`
        The `HTMLVideoElement` or `VideoFrame` source of the video snapshot.

### Return value

A `GPUExternalTexture` object instance.

Note that the moment when the `GPUExternalTexture` object expires (is destroyed) depends on what its source is:

- `GPUExternalTexture` objects with an `HTMLVideoElement` source expire as soon as they are used (for example in a bind group).
- `GPUExternalTexture` objects with a `VideoFrame` source expire only when the `VideoFrame` is closed, for example via a `VideoFrame.close()` call.

### Validation

The following criteria must be met when calling **`importExternalTexture()`**, otherwise a `GPUValidationError` is generated and an invalid `GPUExternalTexture` object is returned:

- The video snapshot is usable (e.g., the video source is loaded properly, and doesn't have a width or height of 0).

### Exceptions

- `SecurityError` `DOMException`
    Thrown if the video source data is cross-origin.

## Examples

In the WebGPU samples Video Uploading sample, an `importExternalTexture()` call is used as the value of a bind group entry `resource`, specified when creating a `GPUBindGroup` via a `GPUDevice.createBindGroup()` call:

```js
// …

const uniformBindGroup = device.createBindGroup({
  layout: pipeline.getBindGroupLayout(0),
  entries: [
    {
      binding: 1,
      resource: sampler,
    },
    {
      binding: 2,
      resource: device.importExternalTexture({
        source: video,
      }),
    },
  ],
});

// …
```

## See also

- The WebGPU API
