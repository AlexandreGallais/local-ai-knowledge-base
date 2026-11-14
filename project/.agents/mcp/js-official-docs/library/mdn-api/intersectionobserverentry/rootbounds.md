---
title: "IntersectionObserverEntry: rootBounds property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/intersectionobserverentry/rootbounds/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IntersectionObserverEntry: rootBounds property

The **`rootBounds`** read-only property of the `IntersectionObserverEntry` interface is a `DOMRectReadOnly` corresponding to the `target`'s root intersection rectangle, offset by the `IntersectionObserver.rootMargin` if one is specified.

## Value

A `DOMRectReadOnly` which describes the root intersection rectangle.
For roots which are the `Document`'s viewport, this rectangle is the bounds rectangle of the entire document.
Otherwise, it's the bounds of the root element.

This rectangle is offset by the values in `IntersectionObserver.rootMargin`.
