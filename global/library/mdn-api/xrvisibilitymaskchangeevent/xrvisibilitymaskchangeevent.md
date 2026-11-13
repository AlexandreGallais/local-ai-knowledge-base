---
title: "XRVisibilityMaskChangeEvent: XRVisibilityMaskChangeEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrvisibilitymaskchangeevent/xrvisibilitymaskchangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRVisibilityMaskChangeEvent: XRVisibilityMaskChangeEvent() constructor

The **`XRVisibilityMaskChangeEvent()`** constructor creates and returns a new `XRVisibilityMaskChangeEvent` object.

## Syntax

```js
new XRVisibilityMaskChangeEvent(type, options)
```

### Parameters

- `type`
    A string containing the name of the event, which is always `visibilitymaskchange`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `eye`
        The `eye` the mask applies to.
    - `index`
        The index of the current `XRView` in the `XRViewerPose.views` array.
    - `indices`
        A `Uint32Array` of values specifying the index position of each coordinate pair (not individual array index) inside the `vertices` array that define the triangles used to draw the currently visible part of the scene displayed in the `XRView`.
    - `session`
        The `XRSession` to which the event belongs.
    - `vertices`
        A `Float32Array` of coordinates representing the set of possible coordinate values that may be used in a visibility mask. If this array is empty, the whole region of the `XRView` will be drawn.

### Return value

A new `XRVisibilityMaskChangeEvent` object instance.

## Examples

See the main `XRVisibilityMaskChangeEvent` page for an example.
