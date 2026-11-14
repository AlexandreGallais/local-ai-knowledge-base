---
title: "PerformanceScriptTiming: window property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancescripttiming/window/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceScriptTiming: window property

The **`window`** read-only property of the `PerformanceScriptTiming` interface returns a reference to a `Window` object representing the `window` of the container (i.e., either the top-level document or an ``) in which the long animation frame (LoAF)-causing script was executed.

## Value

A `Window` object, or `null` if the window is no longer active (the object reference is a `WeakRef`).

## Examples

See Long animation frame timing for examples related to the Long Animation Frames API.

## See also

- Long animation frame timing
- `PerformanceLongAnimationFrameTiming`
