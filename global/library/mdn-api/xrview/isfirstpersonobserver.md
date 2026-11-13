---
title: "XRView: isFirstPersonObserver property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrview/isfirstpersonobserver/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRView: isFirstPersonObserver property

The `XRView` interface's read-only **`isFirstPersonObserver`** property is a boolean indicating if the `XRView` is a first-person observer view.

To create video recordings of AR device cameras, you can't simply use one of the rendered eyes, as there often will be a physical offset. Some devices expose a secondary view, the first-person observer view, which has an `eye` of `none`.

To receive a first-person observer view, you need to enable the "secondary-views" feature descriptor explicitly (typically as an optional feature). See `XRSystem.requestSession()` for details.

The `isFirstPersonObserver` property then allows you to check which secondary view is a first-person observer view.

## Examples

### Checking for first-person observer views

```js
// Make sure to enable "secondary-view"
navigator.xr
  .requestSession("immersive-ar", {
    optionalFeatures: ["secondary-views"],
  })
  .then((session) => {
    // …

    session.requestAnimationFrame((frame) => {
      const views = frame.getViewerPose(space);
      // Make sure to iterate over all views
      for (const view of views) {
        if (view.isFirstPersonObserver) {
          renderFPO();
        } else {
          render();
        }
      }
    });
  });
```
