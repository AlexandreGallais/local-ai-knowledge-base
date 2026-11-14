---
title: "PerformanceContainerTiming: size property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancecontainertiming/size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceContainerTiming: size property

The **`size`** read-only property of the `PerformanceContainerTiming` interface returns the total area of the container's accumulated painted region, calculated since the container root was registered.

## Value

An integer representing a cumulative area in square CSS pixels.

## Description

`size` reflects only the actual painted area within the container, and omits content that was outside the viewport when it was painted.
This differs from `intersectionRect`, which is a single bounding rectangle and so can include gaps where no painting has occurred.
Paired with `intersectionRect`, `size` provides a useful _indication_ of how much of a container has rendered and become visible so far.
It can also be used during debugging to confirm whether a container's content is painting inside the viewport.

For more information, see When are entries generated? in `PerformanceContainerTiming`.

## Examples

See Observing that only visible paints are counted in `PerformanceContainerTiming.intersectionRect`.

## See also

- `PerformanceContainerTiming.intersectionRect`
- `PerformanceContainerTiming.firstRenderTime`
