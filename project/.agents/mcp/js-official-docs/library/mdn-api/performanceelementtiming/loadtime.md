---
title: "PerformanceElementTiming: loadTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceelementtiming/loadtime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceElementTiming: loadTime property

The **`loadTime`** read-only property of the `PerformanceElementTiming` interface always returns `0` for text. For images it returns the time which is the latest between the time the image resource is loaded and the time it is attached to the element.

## Value

A `DOMHighResTimeStamp` with the `loadTime` of the element. Always `0` for text.

## Examples

### Logging `loadTime`

In this example an `` element is being observed by adding the `elementtiming` attribute. A `PerformanceObserver` is registered to get all performance entries of type `"element"`. The `buffered` flag is used to access data from before the observer was created. Calling `entry.loadTime` returns the loadTime of the image element.

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
      console.log(entry.loadTime);
    }
  });
});
observer.observe({ type: "element", buffered: true });
```
