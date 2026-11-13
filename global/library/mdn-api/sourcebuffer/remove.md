---
title: "SourceBuffer: remove() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sourcebuffer/remove/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SourceBuffer: remove() method

The **`remove()`** method of the `SourceBuffer`
interface removes media segments within a specific time range from the
`SourceBuffer`. This method can only be called when
`SourceBuffer.updating` equals `false`. If
`SourceBuffer.updating` is not equal to `false`, call
`SourceBuffer.abort()`.

## Syntax

```js
remove(start, end)
```

### Parameters

- `start`
    A double representing the start of the time range, in seconds.
- `end`
    A double representing the end of the time range, in seconds.

### Return value

None (`undefined`).

### Exceptions

- `InvalidAccessError` `DOMException`
    Thrown if either the `MediaSource.duration` property is equal to `NaN`, the `start` parameter is negative or greater than `MediaSource.duration`, or the `end` parameter is less than or equal to `start` or equal to `NaN`.

- `InvalidStateError` `DOMException`
    Thrown if the `SourceBuffer.updating` property is equal
    to `true`, or this `SourceBuffer` has been removed
    from `MediaSource`.

## Examples

TBD.

## See also

- `MediaSource`
- `SourceBufferList`
