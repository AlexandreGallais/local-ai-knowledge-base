---
title: "XRView: recommendedViewportScale property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrview/recommendedviewportscale/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRView: recommendedViewportScale property

The read-only **`recommendedViewportScale`** property of the `XRView` interface is the recommended viewport scale value that you can use for `XRView.requestViewportScale()` if the user agent has such a recommendation; `null` otherwise.

## Value

A number greater than 0.0 and less than or equal to 1.0; or `null` if the user agent does not provide a recommended scale.

## Examples

### Dynamic viewport scaling

Dynamic viewport scaling allows applications to only use a subset of the available `framebuffer`. The feature may not be available on all systems since it depends on driver support, so you might want to ensure that `XRView.requestViewportScale` exists before calling it.

```js
for (const view of pose.views) {
  if (view.requestViewportScale) {
    view.requestViewportScale(view.recommendedViewportScale);
  }
  const viewport = glLayer.getViewport(view);
}
```

## See also

- `XRView.requestViewportScale()`
