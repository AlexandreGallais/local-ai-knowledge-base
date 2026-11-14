---
title: "PerformanceLongAnimationFrameTiming: scripts property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancelonganimationframetiming/scripts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceLongAnimationFrameTiming: scripts property

The **`scripts`** read-only property of the `PerformanceLongAnimationFrameTiming` interface returns an array of `PerformanceScriptTiming` objects.

Script attribution is provided only for scripts running in the main thread of a page, including same-origin ``s. However, cross-origin ``s, web workers, service workers, and extension code will not have script attribution in long animation frames, even if they impact the duration of one.

## Value

An array of `PerformanceScriptTiming` objects.

## Examples

See Long animation frame timing for examples related to the Long Animation Frames API.

## See also

- Long animation frame timing
- `PerformanceScriptTiming`
