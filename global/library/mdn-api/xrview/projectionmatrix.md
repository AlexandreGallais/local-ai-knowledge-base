---
title: "XRView: projectionMatrix property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrview/projectionmatrix/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRView: projectionMatrix property

The `XRView` interface's read-only
**`projectionMatrix`** property specifies the projection matrix
to apply to the underlying view. This should be used to integrate perspective to
everything in the scene, in order to ensure the result is consistent with what the eye
expects to see.

> **Note:**
> Failure to apply proper perspective, or inconsistencies
> in perspective, may result in possibly serious user discomfort or distress.

## Value

A `Float32Array` object representing the projection matrix for the view.
The projection matrix for each eye's view is used to ensure that the correct area of the
scene is presented to each eye in order to create a believable 3D scene without
introducing discomfort for the user.
