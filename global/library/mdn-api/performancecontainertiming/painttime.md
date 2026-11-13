---
title: "PerformanceContainerTiming: paintTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancecontainertiming/painttime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceContainerTiming: paintTime property

The **`paintTime`** read-only property of the `PerformanceContainerTiming` interface returns a timestamp that represents when the rendering phase ended and the paint phase started.

This property is a broadly interoperable metric for indicating the time to paint, and can therefore be used when comparing behavior across browsers.
For single-browser testing, you can use `presentationTime` instead.

## Value

A `DOMHighResTimeStamp`.

## Examples

See Observing how entries change as a container grows in `PerformanceContainerTiming`.

## See also

- `PerformanceContainerTiming.presentationTime`
