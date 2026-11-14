---
title: "PerformanceLongAnimationFrameTiming: presentationTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancelonganimationframetiming/presentationtime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceLongAnimationFrameTiming: presentationTime property

The **`presentationTime`** read-only property of the `PerformanceLongAnimationFrameTiming` interface returns the `timestamp` when the UI update was actually drawn on the screen.

The `presentationTime` value is nullable: the underlying timestamp is implementation-defined, so browsers that don't populate it return `null` instead.
Because `PerformanceLongAnimationFrameTiming.paintTime` is always populated the same way across implementations, it's the more reliable value to use for metrics that need to be comparable across browsers.

## Value

A `DOMHighResTimeStamp` or `null` if the value is not exposed.

## Examples

See Long animation frame timing for examples related to the Long Animation Frames API.

## See also

- `PerformanceLongAnimationFrameTiming.paintTime`
