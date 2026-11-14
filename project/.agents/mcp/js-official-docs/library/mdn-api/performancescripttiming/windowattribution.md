---
title: "PerformanceScriptTiming: windowAttribution property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancescripttiming/windowattribution/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceScriptTiming: windowAttribution property

The **`windowAttribution`** read-only property of the `PerformanceScriptTiming` interface returns an enumerated value describing the relationship of the container (i.e., either the top-level document or an ``) in which the long animation frame (LoAF)-causing script was executed, relative to the window running the current document.

## Value

An enumerated value, which can be one of:

- `"ancestor"`
    The current document is a descendant of the document in which the script was executed, embedded inside it in an ``.
- `"descendant"`
    The script was executed in a descendant document embedded inside the current document in an ``.
- `"other"`
    The location of the document the script was executed in could not be determined.
- `"same-page"`
    The script was executed in a version of the current document embedded within the current document in an ``.
- `"self"`
    The script was executed in the current document.

## Examples

See Long animation frame timing for examples related to the Long Animation Frames API.

## See also

- Long animation frame timing
- `PerformanceLongAnimationFrameTiming`
