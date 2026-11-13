---
title: "XRInputSource: targetRaySpace property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrinputsource/targetrayspace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRInputSource: targetRaySpace property

The read-only `XRInputSource` property
**`targetRaySpace`** returns an `XRSpace`
(typically an `XRReferenceSpace`) representing the position and
orientation of the target ray in the virtual space. Its native origin tracks
the position of the origin point of the target ray, and its orientation indicates the
orientation of the controller device itself. These values, interpreted in the context of
the input source's `targetRayMode`, can be
used both to fully interpret the device as an input source.

To obtain an `XRSpace` representing the input controller's position and
orientation in virtual space, use the `gripSpace` property.

## Value

An `XRSpace` object—typically an `XRReferenceSpace` or
`XRBoundedReferenceSpace`—which represents the position and orientation of
the input controller's target ray in virtual space.

The native origin of the returned `XRSpace` is located at the point from
which the target ray is emitted, and the orientation of the space indicates the
direction in which the target ray is pointing.

## Usage notes

All input sources—regardless of their `targetRayMode`—have a valid `targetRaySpace`.
The exact meaning of this space varies, however, depending on the mode:

- Every gaze input (`targetRayMode` value of `gaze`), shares the
  same `XRSpace` object as their target ray space, since the gaze input
  comes from the viewer's head. This shared space represents the same location as the
  space returned by the `XRSession` method
  `requestReferenceSpace()`, but is
  maintained as a different object to allow for future enhancements to the API.
- The target ray space reported by tracked pointer inputs (`targetRayMode`
  of `tracked-pointer`) is actually based upon the true spatial position and
  orientation of the input device.

To determine the position and orientation of the target ray while rendering a frame,
pass it into the `XRFrame` method `getPose()` method,
then use the returned `XRPose` object's
`transform` to gather the spatial information you need.

## Examples

This fragment of code shows part of a function to be called once every frame. It looks for inputs which have a non-`null` `targetRaySpace`. Inputs which have a value for this property represent inputs that project a target ray outward from the user.

For each such input, this example looks for inputs whose `targetRayMode` is `tracked-pointer`, indicating that the input is in fact intended to represent a targeting device rather than a gazing device, screen tap, or mouse click. For tracked pointers, a function `myRenderTargetRayAsBeam()` is called to render a beam from the input controller's virtual position outward in the direction it's pointing.

The code should continue to perform tasks such as drawing controllers or any objects representative of the user's hands' positions in the virtual space, as well as any other input-related tasks.

```js
function updateInputSources(session, frame, refSpace) {
  for (const source of session.getInputSources()) {
    const targetRayPose = frame.getPose(inputSource.targetRaySpace, refSpace);

    if (targetRayPose) {
      if (source.targetRayMode === "tracked-pointer") {
        myRenderTargetRayAsBeam(targetRayPose);
      }
    }

    // …
  }
}
```

## See also

- WebXR Device API
- Inputs and input sources
