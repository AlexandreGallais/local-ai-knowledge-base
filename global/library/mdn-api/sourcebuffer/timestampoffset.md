---
title: "SourceBuffer: timestampOffset property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sourcebuffer/timestampoffset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SourceBuffer: timestampOffset property

The **`timestampOffset`** property of the
`SourceBuffer` interface controls the offset applied to timestamps inside
media segments that are appended to the `SourceBuffer`.

The initial value of `timestampOffset` is 0.

## Value

A double, with the offset amount expressed in seconds.

### Exceptions

The following exception may be thrown when setting a new value for this property:

- `InvalidStateError` `DOMException`
    Thrown if one or more of the `SourceBuffer` objects in
    `MediaSource.sourceBuffers` are being updated
    (i.e., their `SourceBuffer.updating` property is
    currently `true`), a media segment inside the
    `SourceBuffer` is currently being parsed, or this
    `SourceBuffer` has been removed from the
    `MediaSource`.

## Examples

TBD

## See also

- `MediaSource`
- `SourceBufferList`
