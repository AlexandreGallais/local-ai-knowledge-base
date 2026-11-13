---
title: "XRMediaBinding: createCylinderLayer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrmediabinding/createcylinderlayer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRMediaBinding: createCylinderLayer() method

The **`createCylinderLayer()`** method of the `XRMediaBinding` interface returns an `XRCylinderLayer` object which is a layer that takes up a curved rectangular space in the virtual environment.

## Syntax

```js
createCylinderLayer(video, options)
```

### Parameters

- `video`
    An `HTMLVideoElement` to display.
- `options`
    An object to configure the `XRCylinderLayer`. The object can have the following properties and `space` is required:
    - `aspectRatio` (optional)
        A number indicating the ratio of the visible cylinder section. It is the ratio of the width of the visible section of the cylinder divided by its height. The width is calculated by multiplying the `radius` with the `centralAngle`.
    - `centralAngle` (optional)
        A number indicating the angle in radians of the visible section of the cylinder. Default value: `0.78539` (π / 4).
    - `invertStereo` (optional)
        A boolean specifying if the natural location of each view in the video should be inverted. By default `false`.
    - `layout` (optional)
        A string indicating the layout of the video. Possible values:
        - `default`
            The layer accommodates all views of the session.
        - `mono`
            A single `XRSubImage` is allocated and presented to both eyes.
        - `stereo`
            The user agent decides how it allocates the `XRSubImage` (one or two) and the layout (top/bottom or left/right). It is recommended to use the `texture-array` texture type for `stereo` layouts.
        - `stereo-left-right`
            A single `XRSubImage` is allocated. Left eye gets the left area of the texture, right eye the right. This layout is designed to minimize draw calls for content that is already in stereo (for example stereo videos or images).
        - `stereo-top-bottom`
            A single `XRSubImage` is allocated. Left eye gets the top area of the texture, right eye the bottom. This layout is designed to minimize draw calls for content that is already in stereo (for example stereo videos or images).
            The default value is `mono`.
    - `radius` (optional)
        A number indicating the radius of the cylinder. Default value `2.0`.
    - `space` **Required**
        An `XRSpace` object defining the layer's spatial relationship with the user's physical environment.
    - `transform` (optional)
        An `XRRigidTransform` object defining the offset and orientation relative to `space`.

### Return value

An `XRCylinderLayer` object.

## Examples

### Creating an `XRCylinderLayer` to display a video

Create an `XRMediaBinding` and use an `HTMLVideoElement` that is passed into `createCylinderLayer()`. Configure the quad layer using the options listed above and present the layer to the XR device by adding it to the `layers` render state in `XRSession.updateRenderState()`.

```js
function onXRSessionStarted(xrSession) {
  const xrMediaBinding = new XRMediaBinding(xrSession);
  const video = document.createElement("video");
  video.src = "just-fascination.mp4";

  const videoLayer = xrMediaBinding.createCylinderLayer(video, {
    space: xrReferenceSpace,
  });

  xrSession.updateRenderState({
    layers: [videoLayer],
  });
}
```

## See also

- `XRCylinderLayer`
