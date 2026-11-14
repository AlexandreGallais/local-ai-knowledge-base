---
title: "XRCPUDepthInformation: data property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrcpudepthinformation/data/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRCPUDepthInformation: data property

The _read-only_ **`data`** property of the `XRCPUDepthInformation` interface is an `ArrayBuffer` containing depth-buffer information in raw format.

The data is stored in row-major format, without padding, with each entry corresponding to distance from the view's near plane to the users' environment, in unspecified units. The size of each data entry and the type is determined by `depthDataFormat`. The values can be converted from unspecified units to meters by multiplying them by `rawValueToMeters`. The `normDepthBufferFromNormView` property can be used to transform from normalized view coordinates (an origin in the top left corner of the view, with X axis growing to the right, and Y axis growing downward) into the depth buffer's coordinate system.

## Value

An `ArrayBuffer`.

## Examples

Use `XRFrame.getDepthInformation()` to obtain depth information. The returned `XRCPUDepthInformation` object will contain the `data` buffer.

For CPU depth information and a buffer that has "luminance-alpha" format:

```js
const uint16 = new Uint16Array(depthInfo.data);
const index = column + row * depthInfo.width;
const depthInMeters = uint16[index] * depthInfo.rawValueToMeters;
```

(Use `Float32Array` for a "float32" data format.)

Note that the depth in meters is in depth-buffer coordinates. Additional steps are needed to convert them to normalized view coordinates, or the `XRCPUDepthInformation.getDepthInMeters()` method can be used.
