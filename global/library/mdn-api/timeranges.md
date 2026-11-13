---
title: "TimeRanges"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/timeranges/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TimeRanges

When loading a media resource for use by an `<audio>` or `` element, the **`TimeRanges`** interface is used for representing the time ranges of the media resource that have been buffered, the time ranges that have been played, and the time ranges that are seekable.

A `TimeRanges` object includes one or more ranges of time, each specified by a starting time offset and an ending time offset. You reference each time range by using the `start()` and `end()` methods, passing the index number of the time range you want to retrieve.

## Normalized TimeRanges objects

Several members of `HTMLMediaElement` objects return a **normalized TimeRanges object** — which the spec describes as having the following characteristics:

_The ranges in such an object are ordered, don't overlap, and don't touch (adjacent ranges are folded into one bigger range). A range can be empty (referencing just a single moment in time)._

## Instance properties

- `TimeRanges.length` (read-only)
    Returns an `unsigned long` representing the number of time ranges represented by the time range object.

## Instance methods

- `TimeRanges.start()`
    Returns the time for the start of the range with the specified index.
- `TimeRanges.end()`
    Returns the time for the end of the specified range.
