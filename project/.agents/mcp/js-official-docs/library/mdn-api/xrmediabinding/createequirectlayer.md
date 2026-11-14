---
title: "XRMediaBinding: createEquirectLayer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrmediabinding/createequirectlayer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRMediaBinding: createEquirectLayer() method

The **`createEquirectLayer()`** method of the `XRMediaBinding` interface returns an `XREquirectLayer` object which is a layer that maps an equirectangular coded data onto the inside of a sphere.

## Syntax

```js
createEquirectLayer(video, options)
```

### Parameters

- `video`
    An `HTMLVideoElement` to display.
- `options`
    An object to configure the `XREquirectLayer`. The object can have the following properties and `space` is required:
    - `centralHorizontalAngle` (optional)
        A number indicating the central horizontal angle in radians for the sphere. Default value: `6.28318` (2π).
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
    - `lowerVerticalAngle` (optional)
        A number indicating the lower vertical angle in radians for the sphere. Default value: `-1.570795` (-π/2).
    - `radius` (optional)
        A number indicating the radius of the sphere. Default value `0.0`.
    - `space` **Required**
        An `XRSpace` object defining the layer's spatial relationship with the user's physical environment.
    - `transform` (optional)
        An `XRRigidTransform` object defining the offset and orientation relative to `space`.
    - `upperVerticalAngle` (optional)
        A number indicating the upper vertical angle in radians for the sphere. Default value: `1.570795` (π/2).

### Return value

An `XREquirectLayer` object.

## Examples

### Creating an `XREquirectLayer` to display a video

Create an `XRMediaBinding` and use an `HTMLVideoElement` that is passed into `createEquirectLayer()`. Configure the quad layer using the options listed above and present the layer to the XR device by adding it to the `layers` render state in `XRSession.updateRenderState()`.

```js
function onXRSessionStarted(xrSession) {
  const xrMediaBinding = new XRMediaBinding(xrSession);
  const video = document.createElement("video");
  video.src = "just-fascination.mp4";

  const videoLayer = xrMediaBinding.createEquirectLayer(video, {
    space: xrReferenceSpace,
  });

  xrSession.updateRenderState({
    layers: [videoLayer],
  });
}
```

## See also

- `XREquirectLayer`
