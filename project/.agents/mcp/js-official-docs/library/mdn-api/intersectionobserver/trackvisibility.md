---
title: "IntersectionObserver: trackVisibility property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/intersectionobserver/trackvisibility/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IntersectionObserver: trackVisibility property

The **`trackVisibility`** read-only property of the `IntersectionObserver` interface indicates whether the observer is tracking target visibility in addition to element intersections.

## Value

`true` if visibility is being tracked for intersection calculations, and `false` otherwise.

The value is set using the `option.trackVisibility` argument to the `IntersectionObserver()` constructor.

## Description

When not tracking visibility, the observer provides notifications when the target element is scrolled into the root element's viewport.
However this doesn't tell you if the target element has compromised visibility — it might be partially covered by another element, have reduced opacity, or be distorted by a filter, transform, or other modification.

When tracking visibility, only elements that the browser considers to be visible are shown as intersecting.
The algorithm is conservative, and may omit elements that are technically visible, such as those with only a slight opacity reduction.

Note that the calculation of visibility is computationally expensive.
To avoid the operation running too often, a `delay` is used to limit the minimum reporting period.

## See also

- Timing element visibility with the Intersection Observer API
