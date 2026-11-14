---
title: "BufferedChangeEvent: addedRanges property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bufferedchangeevent/addedranges/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BufferedChangeEvent: addedRanges property

The **`addedRanges`** read-only property of the `BufferedChangeEvent` interface returns a `TimeRanges` object representing the time ranges that were added to the associated `ManagedSourceBuffer`. These are the ranges added between the last `updatestart` and `updateend` events, during the most recent run of the coded frame processing algorithm.

## Value

A `TimeRanges` object.

## Examples

See the main `BufferedChangeEvent` page for an example showing the use of `addedRanges`.

## See also

- `BufferedChangeEvent.removedRanges`
- `bufferedchange` event
- `ManagedSourceBuffer`
- `TimeRanges`
