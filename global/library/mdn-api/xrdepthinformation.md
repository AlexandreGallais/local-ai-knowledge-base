---
title: "XRDepthInformation"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrdepthinformation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRDepthInformation

The **`XRDepthInformation`** interface contains information about the distance from the user's device to the real-world geometry in the user's environment.

This interface is the parent of:

- `XRCPUDepthInformation`
    Depth information from the CPU (returned by `XRFrame.getDepthInformation()`).
- `XRWebGLDepthInformation`
    Depth information from WebGL (returned by `XRWebGLBinding.getDepthInformation()`).

You will usually interact with these child interfaces. However, `XRDepthInformation` provides some useful properties that are inherited:

## Instance properties

- `XRDepthInformation.height` (read-only) (experimental)
    Contains the height of the depth buffer (number of rows).
- `XRDepthInformation.normDepthBufferFromNormView` (read-only) (experimental)
    An `XRRigidTransform` that needs to be applied when indexing into the depth buffer. The transformation that the matrix represents changes the coordinate system from normalized view coordinates to normalized depth-buffer coordinates that can then be scaled by depth buffer's `width` and `height` to obtain the absolute depth-buffer coordinates.
- `XRDepthInformation.rawValueToMeters` (read-only) (experimental)
    Contains the scale factor by which the raw depth values must be multiplied in order to get the depths in meters.
- `XRDepthInformation.width` (read-only) (experimental)
    Contains the width of the depth buffer (number of columns).

## Instance methods

None.

## Examples

See `XRCPUDepthInformation` and `XRWebGLDepthInformation` for code examples.

## See also

- `XRCPUDepthInformation`
- `XRWebGLDepthInformation`
- `XRFrame.getDepthInformation()`
