---
title: "PerformanceScriptTiming: sourceURL property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancescripttiming/sourceurl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceScriptTiming: sourceURL property

The **`sourceURL`** read-only property of the `PerformanceScriptTiming` interface returns a string representing the URL of the script.

It is important to note that the reported function location will be the "entry point" of the script, that is, the top level of the stack, not any specific slow sub-function. See `PerformanceScriptTiming.sourceFunctionName` for more discussion around this.

## Value

A string. Returns an empty string if the URL was not found.

## Examples

See Long animation frame timing for examples related to the Long Animation Frames API.

## See also

- Long animation frame timing
- `PerformanceLongAnimationFrameTiming`
