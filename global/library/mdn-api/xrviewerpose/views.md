---
title: "XRViewerPose: views property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrviewerpose/views/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRViewerPose: views property

The read-only `XRViewerPose` property **`views`**
returns an array which contains every `XRView` which must be rendered in
order to fully represent the scene from the viewpoint defined by the viewer pose. For
monoscopic devices, this array contains a single view.

> **Warning:**
> There is no guarantee that the number of views will
> remain constant over the lifetime of an `XRSession`. For each frame, you
> should always use the current length of this array rather than caching the value.

Stereo views require two views to render properly, with the left eye's view having its
`eye` set to the string `left` and the right eye's
view a value of `right`.

## Value

An array of `XRView` objects, one for each view available as part of the
scene for the current viewer pose. This array's length may potentially vary over the
lifetime of the `XRSession` (for example, if the viewer enables or disables
stereo mode on their XR output device).

## Examples

See `XRViewerPose` for example code.

## See also

- WebXR Device API
- Movement, orientation, and motion
