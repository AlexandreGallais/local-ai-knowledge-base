---
title: "XRVisibilityMaskChangeEvent: eye property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrvisibilitymaskchangeevent/eye/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRVisibilityMaskChangeEvent: eye property

The **`eye`** read-only property of the `XRVisibilityMaskChangeEvent` interface indicates the eye the mask applies to.

## Value

An enumerated value indicating which eye the mask applies to from the viewer's perspective.
This can be one of:

- `left`
    The viewer's left eye.
- `right`
    The viewer's right eye.
- `none`
    A monoscopic view, or the view otherwise doesn't represent a particular eye's point-of-view.

## Examples

### Basic usage

This example indicates how you might check the `eye` value when the `visibilitymaskchange` event fires and then render a suitable display update depending on the result.

```js
xrSession.addEventListener("visibilitymaskchange", (e) => {
  if (e.eye === "left") {
    // Render for left eye view
  } else if (e.eye === "right") {
    // Render for right eye view
  } else {
    // Render for neutral view
  }
});
```

## See also

- `XRView.eye`
