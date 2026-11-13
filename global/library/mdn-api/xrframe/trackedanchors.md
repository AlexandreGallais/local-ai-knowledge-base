---
title: "XRFrame: trackedAnchors property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrframe/trackedanchors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRFrame: trackedAnchors property

The read-only **`trackedAnchor`** property of the `XRFrame` interface returns an `XRAnchorSet` object containing all anchors still tracked in the frame.

## Value

An `XRAnchorSet` object.

## Examples

### Updating anchors

```js
for (const anchor of frame.trackedAnchors) {
  const pose = frame.getPose(anchor.anchorSpace, referenceSpace);
}
```
