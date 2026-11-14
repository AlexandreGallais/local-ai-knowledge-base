---
title: "IntersectionObserverEntry: intersectionRatio property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/intersectionobserverentry/intersectionratio/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IntersectionObserverEntry: intersectionRatio property

The **`intersectionRatio`** read-only property of the `IntersectionObserverEntry` interface tells you how much of the target element is currently visible within the root's intersection ratio, as a value between 0.0 and 1.0.

## Value

A number between 0.0 and 1.0 which indicates how much of the target element is actually visible within the root's intersection rectangle.
More precisely, this value is the ratio of the area of the intersection rectangle (`intersectionRect`) to the area of the target's bounds rectangle (`boundingClientRect`).

If the area of the target's bounds rectangle is zero, the returned value is 1 if `isIntersecting` is `true` or 0 if not.

## Examples

In this simple example, an intersection callback sets each target element's `opacity` to the intersection ratio of that element with the root.

```js
function intersectionCallback(entries) {
  entries.forEach((entry) => {
    entry.target.style.opacity = entry.intersectionRatio;
  });
}
```

To see a more concrete example, take a look at Handling intersection changes.
