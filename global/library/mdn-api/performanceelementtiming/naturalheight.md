---
title: "PerformanceElementTiming: naturalHeight property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceelementtiming/naturalheight/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceElementTiming: naturalHeight property

The **`naturalHeight`** read-only property of the `PerformanceElementTiming` interface returns the intrinsic height of the image element.

## Value

An unsigned 32-bit integer (unsigned long) which is the intrinsic height of the image if this is applied to an image, `0` for text.

## Examples

### Logging `naturalHeight`

In this example an `` element is being observed by adding the `elementtiming` attribute. A `PerformanceObserver` is registered to get all performance entries of type `"element"` and the `buffered` flag is used to access data from before observer creation. The image file has a width of 1000px and a height of 750px. Calling `entry.naturalHeight` returns `750`, that being the intrinsic height in pixels.

```html
<img
  src="image.jpg"
  alt="a nice image"
  elementtiming="big-image"
  id="myImage" />
```

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.identifier === "big-image") {
      console.log(entry.naturalHeight);
    }
  });
});
observer.observe({ type: "element", buffered: true });
```
