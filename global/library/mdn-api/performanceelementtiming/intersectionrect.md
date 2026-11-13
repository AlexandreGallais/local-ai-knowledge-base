---
title: "PerformanceElementTiming: intersectionRect property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceelementtiming/intersectionrect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceElementTiming: intersectionRect property

The **`intersectionRect`** read-only property of the `PerformanceElementTiming` interface returns the rectangle of the element within the viewport.

## Value

A `DOMRectReadOnly` which is the rectangle of the element within the viewport.

For display images this is the display rectangle of the image within the viewport. For text this is the display rectangle of the node in the viewport. This being the smallest rectangle that contains the union of all text nodes that belong to the element.

## Examples

### Logging `intersectionRect`

In this example an `` element is being observed by adding the `elementtiming` attribute. A `PerformanceObserver` is registered to get all performance entries of type `"element"` and the `buffered` flag is used to access data from before observer creation. Calling `entry.intersectionRect` returns a `DOMRectReadOnly` object with the display rectangle of the image.

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
      console.log(entry.intersectionRect);
    }
  });
});
observer.observe({ type: "element", buffered: true });
```
