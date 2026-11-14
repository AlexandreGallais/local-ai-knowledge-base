---
title: "PerformanceElementTiming: url property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceelementtiming/url/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceElementTiming: url property

The **`url`** read-only property of the `PerformanceElementTiming` interface returns the initial URL of the resource request when the element is an image.

## Value

A string which is the initial URL of the resources request for images or `0` for text.

## Examples

### Logging `url`

In this example an `` element is being observed by adding the `elementtiming` attribute. A `PerformanceObserver` is registered to get all performance entries of type `"element"` and the `buffered` flag is used to access data from before observer creation. Calling `entry.url` returns `https://example.com/image.jpg`.

```html
<img
  src="https://example.com/image.jpg"
  alt="a nice image"
  elementtiming="big-image"
  id="myImage" />
```

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.identifier === "big-image") {
      console.log(entry.url);
    }
  });
});
observer.observe({ type: "element", buffered: true });
```
