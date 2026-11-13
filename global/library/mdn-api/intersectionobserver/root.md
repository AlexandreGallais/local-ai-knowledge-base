---
title: "IntersectionObserver: root property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/intersectionobserver/root/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IntersectionObserver: root property

The **`root`** read-only property of the `IntersectionObserver` interface identifies the `Element` or `Document` whose bounds are treated as the bounding box of the viewport for the element which is the observer's target.

If the `root` is `null`, then the bounds of the actual document viewport are used.

## Value

An `Element` or `Document` object whose bounding box is used as the bounds of the viewport for the purposes of determining how much of the target element is visible.
The intersection of this bounding rectangle, offset by any margins specified in the options passed to the `IntersectionObserver()` constructor, the target element's bounds, minus the bounds of every element or other object which overlaps the target element, is considered to be the visible area of the target element.

If `root` is `null`, then the owning document is used as the root, and the bounds its viewport (that is, the visible area of the document) are used as the root bounds.

## Examples

This example sets the `border` of the intersection observer's root element to be a 2-pixel medium green line.

```js
observer.root.style.border = "2px solid #44aa44";
```

## See also

- Timing element visibility with the Intersection Observer API
