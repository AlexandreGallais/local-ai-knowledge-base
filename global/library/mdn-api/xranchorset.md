---
title: "XRAnchorSet"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xranchorset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRAnchorSet

The **`XRAnchorSet`** interface exposes a collection of anchors. Its instances are returned by `XRFrame.trackedAnchors` and are `Set`-like objects.

## Instance properties

See `Set` for details.

## Instance methods

See `Set` for details.

## Examples

### Handling anchor tracking loss

```js
const trackedAnchors = frame.trackedAnchors;

for (const anchor of previousFrameAnchors) {
  if (!trackedAnchors.has(anchor)) {
    // Handle anchor tracking loss
  }
}
```

## See also

- `XRAnchor`
- `XRFrame.trackedAnchors`
