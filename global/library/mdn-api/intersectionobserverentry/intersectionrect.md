---
title: "IntersectionObserverEntry: intersectionRect property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/intersectionobserverentry/intersectionrect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IntersectionObserverEntry: intersectionRect property

The **`intersectionRect`** read-only property of the `IntersectionObserverEntry` interface is a `DOMRectReadOnly` object which describes the smallest rectangle that contains the entire portion of the target element which is currently visible within the intersection root.

## Value

A `DOMRectReadOnly` which describes the part of the target element that's currently visible within the root's intersection rectangle.

This rectangle is computed by taking the intersection of `boundingClientRect` with each of the `target`'s ancestors' clip rectangles, with the exception of the intersection `root` itself.

## Examples

In this simple example, an intersection callback stores the intersection rectangle for later use by the code that draws the target elements' contents, so that only the visible area is redrawn.

```js
function intersectionCallback(entries) {
  entries.forEach((entry) => {
    refreshZones.push({
      element: entry.target,
      rect: entry.intersectionRect,
    });
  });
}
```
