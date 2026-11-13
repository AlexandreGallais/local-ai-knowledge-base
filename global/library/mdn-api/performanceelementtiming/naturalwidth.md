---
title: "PerformanceElementTiming: naturalWidth property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceelementtiming/naturalwidth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceElementTiming: naturalWidth property

The **`naturalWidth`** read-only property of the `PerformanceElementTiming` interface returns the intrinsic width of the image element.

## Value

An unsigned 32-bit integer (unsigned long) which is the intrinsic width of the image if this is applied to an image, `0` for text.

## Examples

### Logging `naturalWidth`

In this example an `` element is being observed by adding the `elementtiming` attribute. A `PerformanceObserver` is registered to get all performance entries of type `"element"` and the `buffered` flag is used to access data from before observer creation. The image file has a width of 1000px and a height of 750px. Calling `entry.naturalWidth` returns `1000`, that being the intrinsic width in pixels.

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
      console.log(entry.naturalWidth);
    }
  });
});
observer.observe({ type: "element", buffered: true });
```
