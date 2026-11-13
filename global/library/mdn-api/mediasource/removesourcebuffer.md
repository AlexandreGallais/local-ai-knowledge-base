---
title: "MediaSource: removeSourceBuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediasource/removesourcebuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaSource: removeSourceBuffer() method

The **`removeSourceBuffer()`** method of the `MediaSource` interface removes the given `SourceBuffer` from the `SourceBufferList` associated with this `MediaSource` object.

## Syntax

```js
removeSourceBuffer(sourceBuffer)
```

### Parameters

- `sourceBuffer`
    The `SourceBuffer` object to be removed.

### Return value

None (`undefined`).

### Exceptions

- `NotFoundError` `DOMException`
    Thrown if the supplied sourceBuffer doesn't exist in `MediaSource.sourceBuffers`.

## Examples

```js
for (let i = 0; i < 10; i++) {
  const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
}

mediaSource.removeSourceBuffer(mediaSource.sourceBuffers[0]);
```

## See also

- `SourceBuffer`
- `SourceBufferList`
