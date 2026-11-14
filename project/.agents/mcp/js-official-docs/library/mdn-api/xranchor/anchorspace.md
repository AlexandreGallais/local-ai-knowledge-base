---
title: "XRAnchor: anchorSpace property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xranchor/anchorspace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRAnchor: anchorSpace property

The read-only **`anchorSpace`** property of the `XRAnchor` interface returns an `XRSpace` object to locate the anchor relative to other `XRSpace` objects. It can be passed to `XRFrame.getPose()` subsequently.

## Value

An `XRSpace` object.

## Examples

### Updating anchors

```js
for (const anchor of frame.trackedAnchors) {
  const pose = frame.getPose(anchor.anchorSpace, referenceSpace);
}
```
