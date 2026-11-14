---
title: "PerformanceLongAnimationFrameTiming: firstUIEventTimestamp property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancelonganimationframetiming/firstuieventtimestamp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceLongAnimationFrameTiming: firstUIEventTimestamp property

The **`firstUIEventTimestamp`** read-only property of the `PerformanceLongAnimationFrameTiming` interface returns a `DOMHighResTimeStamp` indicating the time of the first UI event — such as a mouse or keyboard event — to be processed during the current animation frame. Note this timestamp can be before the start of this animation frame if there was a delay between the event happening and it being processed.

## Value

A `DOMHighResTimeStamp`.

## Examples

See Long animation frame timing for examples related to the Long Animation Frames API.

## See also

- Long animation frame timing
- `PerformanceScriptTiming`
