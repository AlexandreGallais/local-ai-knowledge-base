---
title: "PerformancePaintTiming: presentationTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancepainttiming/presentationtime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformancePaintTiming: presentationTime property

The **`presentationTime`** read-only property of the `PerformancePaintTiming` interface returns the `timestamp` when the painted pixels were actually drawn on the screen.

The `presentationTime` value is nullable: the underlying timestamp is implementation-defined, so browsers that don't populate it return `null` instead.
Because `PerformancePaintTiming.paintTime` is always populated the same way across implementations, it's the more reliable value to use for metrics that need to be comparable across browsers.

## Value

A `DOMHighResTimeStamp` or `null` if the value is not exposed.

## Examples

See Getting separate paint and presentation timings.

## See also

- `PerformancePaintTiming.paintTime`
