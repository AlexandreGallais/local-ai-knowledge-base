---
title: "PerformanceTimingConfidence: randomizedTriggerRate property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancetimingconfidence/randomizedtriggerrate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceTimingConfidence: randomizedTriggerRate property

The **`randomizedTriggerRate`** read-only property of the `PerformanceTimingConfidence` interface indicates how often noise is applied when exposing the `PerformanceTimingConfidence.value`.

Noise is added to the data to improve privacy (so that each data item is less easily identifiable). When noise is added, a `low` or `high` confidence `value` is returned with equal probability, rather than the true `value`, to obfuscate the results.

## Value

A number between `0` to `1`, inclusive, which represents a percentage value. A value of `0` is equivalent to `0%`, which means that noise is never added, while `1` is equivalent to `100%`, meaning that noise is always added.

## Examples

See the main `PerformanceTimingConfidence` page for an example.

## See also

- `PerformanceTimingConfidence`
