---
title: "IntersectionObserverEntry: boundingClientRect property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/intersectionobserverentry/boundingclientrect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IntersectionObserverEntry: boundingClientRect property

The **`boundingClientRect`** read-only property of the `IntersectionObserverEntry` interface returns a `DOMRectReadOnly` which in essence describes a rectangle describing the smallest rectangle that contains the entire target element.

## Value

A `DOMRectReadOnly` which describes the smallest rectangle that contains every part of the target element whose intersection change is being described.
This value is obtained using the same algorithm as `Element.getBoundingClientRect()`, so refer to that article for details on precisely what is done to obtain this rectangle and what is and is not included within its bounds.

In the general case, however, it's safe to think of this as the bounds rectangle of the target element.
