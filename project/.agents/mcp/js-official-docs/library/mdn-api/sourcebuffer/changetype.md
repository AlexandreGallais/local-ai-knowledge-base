---
title: "SourceBuffer: changeType() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sourcebuffer/changetype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SourceBuffer: changeType() method

The **`changeType()`** method of the
`SourceBuffer` interface sets the MIME type that future calls to
`appendBuffer()` should expect the new media
data to conform to. This makes it possible to change codecs or container type
mid-stream.

One scenario in which this is helpful is to support adapting the media source to
changing bandwidth availability, by transitioning from one codec to another as resource
constraints change.

## Syntax

```js
changeType(type)
```

### Parameters

- `type`
    A string specifying the MIME type that future buffers will conform
    to.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown if the specified string is empty, rather than indicating a valid MIME type.
- `InvalidStateError` `DOMException`
    Thrown if the `SourceBuffer` is not a member of the parent media source's
    `sourceBuffers` list, or the buffer's
    `updating` property indicates that a previously
    queued `appendBuffer()` or
    `remove()` is still being processed.
- `NotSupportedError` `DOMException`
    Thrown if the specified MIME type is not supported, or is not supported with the types of
    `SourceBuffer` objects present in the
    `MediaSource.sourceBuffers` list.

## Usage notes

If the `readyState` property of the parent `MediaSource` is set to `"ended"`, calling `changeType()`
will set the `readyState` property to `"open"` and
fire an event named `sourceopen` at the parent media source.

## See also

- `MediaSource`
- `SourceBufferList`
