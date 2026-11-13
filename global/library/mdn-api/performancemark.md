---
title: "PerformanceMark"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancemark/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceMark

**`PerformanceMark`** is an interface for `PerformanceEntry` objects with an `entryType` of `"mark"`.

Entries of this type are typically created by calling `performance.mark()` to add a _named_ `DOMHighResTimeStamp` (the _mark_) to the browser's performance timeline. To create a performance mark that isn't added to the browser's performance timeline, use the constructor.

## Constructor

- `PerformanceMark()`
    Creates a new `PerformanceMark` object that isn't added to the browser's performance timeline.

## Instance properties

- `PerformanceMark.detail` (read-only)
    Contains arbitrary metadata about the measure.

This interface extends the following `PerformanceEntry` properties by qualifying/constraining the properties as follows:

- `PerformanceEntry.entryType` (read-only)
    Returns `"mark"`.
- `PerformanceEntry.name` (read-only)
    Returns the name given to the mark when it was created via a call to `performance.mark()`.
- `PerformanceEntry.startTime` (read-only)
    Returns the `DOMHighResTimeStamp` when `performance.mark()` was called.
- `PerformanceEntry.duration` (read-only)
    Returns `0`. (A mark has no _duration_.)

## Instance methods

This interface has no methods.

## Examples

See the example in Using the User Timing API.

Chrome DevTools uses `performance.mark()` and in particular a structured `detail` property as part of its extensibility API that surfaces these in custom tracks in performance traces. See the example in Performance: mark() method page and the Chrome's extensibility API documentation for more information and examples.

## See also

- User Timing (Overview)
- Using the User Timing API
