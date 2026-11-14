---
title: "XRMediaBinding"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrmediabinding/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRMediaBinding

The **`XRMediaBinding`** interface is used to create layers that display the content of an `HTMLVideoElement`.

> **Note:**
> Only the video frames will be displayed in the layer. Video controls need to be implemented separately and must be drawn in another layer.

## Constructor

- `XRMediaBinding()` (experimental)
    Creates a new `XRMediaBinding` object for the specified `XRSession`.

## Instance methods

- `XRMediaBinding.createCylinderLayer()` (experimental)
    Returns an `XRCylinderLayer` object bound to an `HTMLVideoElement`.
- `XRMediaBinding.createEquirectLayer()` (experimental)
    Returns an `XREquirectLayer` object bound to an `HTMLVideoElement`.
- `XRMediaBinding.createQuadLayer()` (experimental)
    Returns an `XRQuadLayer` object bound to an `HTMLVideoElement`.

## See also

- `HTMLVideoElement`
- `XRCylinderLayer`, `XREquirectLayer`, `XRQuadLayer`
