---
title: "XRVisibilityMaskChangeEvent: index property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrvisibilitymaskchangeevent/index/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRVisibilityMaskChangeEvent: index property

The **`index`** read-only property of the `XRVisibilityMaskChangeEvent` interface indicates the index of the current `XRView` in the `XRViewerPose.views` array.

For a stereo view, there will be two views in the array. The `index` property allows you to identify the correct view to re-render, rather than having to re-render all views unnecessarily.

## Value

A number.

## Examples

This example indicates how you might render a display update for a particular `XRView` by querying the `index` value of the event object when a `visibilitymaskchange` event is fired.

```js
xrSession.addEventListener("visibilitymaskchange", (e) => {
  renderNewView(e.index);
});
```

## See also

- `XRViewerPose.views`
- `XRFrame.getViewerPose()`
