---
title: "SourceBuffer: appendWindowEnd property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sourcebuffer/appendwindowend/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SourceBuffer: appendWindowEnd property

The **`appendWindowEnd`** property of the
`SourceBuffer` interface controls the timestamp for the end of the append window, a
timestamp range that can be used to filter what media data is appended to the
`SourceBuffer`. Coded media frames with timestamps within this range will be
appended, whereas those outside the range will be filtered out.

The default value of `appendWindowEnd` is positive infinity.

## Value

A double, indicating the end time of the append window, in seconds.

### Exceptions

The following exceptions may be thrown when setting a new value for this property:

- `InvalidAccessError` `DOMException`
    Thrown if an attempt was made to set the value to less than or equal to
    `SourceBuffer.appendWindowStart` or `NaN`.
- `InvalidStateError` `DOMException`
    Thrown if this `SourceBuffer` object is being updated (i.e.,
    its `SourceBuffer.updating` property is
    currently `true`), or this `SourceBuffer` has been
    removed from the `MediaSource`.

## Examples

TBD

## See also

- `MediaSource`
- `SourceBufferList`
