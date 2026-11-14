---
title: "XRCPUDepthInformation"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrcpudepthinformation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRCPUDepthInformation

The **`XRCPUDepthInformation`** interface contains depth information from the CPU (returned by `XRFrame.getDepthInformation()`).

This interface inherits properties from its parent, `XRDepthInformation`.

## Instance properties

- `XRCPUDepthInformation.data` (read-only) (experimental)
    An `ArrayBuffer` containing depth-buffer information in raw format.
- `XRDepthInformation.height` (read-only)
    Contains the height of the depth buffer (number of rows).
- `XRDepthInformation.normDepthBufferFromNormView` (read-only)
    An `XRRigidTransform` that needs to be applied when indexing into the depth buffer. The transformation that the matrix represents changes the coordinate system from normalized view coordinates to normalized depth-buffer coordinates that can then be scaled by depth buffer's `width` and `height` to obtain the absolute depth-buffer coordinates.
- `XRDepthInformation.rawValueToMeters` (read-only)
    Contains the scale factor by which the raw depth values must be multiplied in order to get the depths in meters.
- `XRDepthInformation.width` (read-only)
    Contains the width of the depth buffer (number of columns).

## Instance methods

- `XRCPUDepthInformation.getDepthInMeters()` (experimental)
    Returns the depth in meters at (x, y) in normalized view coordinates.

## See also

- `XRDepthInformation`
- `XRWebGLDepthInformation`
- `XRFrame.getDepthInformation()`
