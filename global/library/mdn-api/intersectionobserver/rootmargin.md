---
title: "IntersectionObserver: rootMargin property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/intersectionobserver/rootmargin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IntersectionObserver: rootMargin property

The **`rootMargin`** read-only property of the `IntersectionObserver` interface is a string with syntax similar to that of the CSS `margin` property.

Each side of the rectangle represented by `rootMargin` is added to the corresponding side in the `root` element's bounding box before the intersection test is performed.
This lets you, for example, adjust the bounds outward so that the target element is considered 100% visible even if a certain number of pixels worth of width or height is clipped away, or treat the target as partially hidden if an edge is too close to the edge of the root's bounding box.

See how intersections are calculated for a more in-depth look at the root margin and how it works with the root's bounding box.

## Value

A string, formatted similarly to the CSS `margin` property's value, which contains offsets for one or more sides of the root's bounding box.
These offsets are added to the corresponding values in the root's bounding box before the intersection between the resulting rectangle and the target element's bounds.

The string returned by this property may not match the one specified when the `IntersectionObserver` was instantiated.
For example, the result always contains four components, though the input may have fewer.

If `rootMargin` isn't specified when the object was instantiated, it defaults to the string `"0px 0px 0px 0px"`, meaning that the intersection will be computed between the root element's unmodified bounds rectangle and the target's bounds.
How intersections are calculated describes how the `rootMargin` is used in more detail.
