---
title: "IntersectionObserver: observe() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/intersectionobserver/observe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IntersectionObserver: observe() method

The **`observe()`** method of the `IntersectionObserver` interface adds an element to the set of target elements being watched by the `IntersectionObserver`.
One observer has one set of thresholds and one root, but can watch multiple target elements for visibility changes in keeping with those.

To stop observing the element, call `IntersectionObserver.unobserve()`.

When the visibility of the specified element crosses over one of the observer's visibility thresholds (as listed in `IntersectionObserver.thresholds`), the observer's callback is executed with an array of `IntersectionObserverEntry` objects representing the intersection changes which occurred.
Note that this design allows multiple elements' intersection changes to be processed by a single call to the callback.

> **Note:**
> The observer callback will always fire the first render cycle after `observe()` is called, even if the observed element has not yet moved with respect to the viewport.
> This means that, for example, an element that is outside the viewport when `observe()` is called on it will result in the callback being immediately called with at least one entry with `intersecting` set to `false`.
> An element inside the viewport will result in the callback being immediately called with at least one entry with `intersecting` set to `true`.

## Syntax

```js
observe(targetElement)
```

### Parameters

- `targetElement`
    An `element` whose visibility within the root is to be monitored.
    This element must be a descendant of the root element (or contained within the current document, if the root is the document's viewport).
    If this element is already being observed, this method does nothing.

### Return value

None (`undefined`).

## Examples

```js
// Register IntersectionObserver
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      // Add 'active' class if observation target is inside viewport
      entry.target.classList.add("active");
    } else {
      // Remove 'active' class otherwise
      entry.target.classList.remove("active");
    }
  });
});

// Declares what to observe, and observes its properties.
const boxElList = document.querySelectorAll(".box");
boxElList.forEach((el) => {
  io.observe(el);
});
```

## See also

- `IntersectionObserver.unobserve()`
