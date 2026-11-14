---
title: "VideoDecoder: flush() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videodecoder/flush/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoDecoder: flush() method

The **`flush()`** method of the `VideoDecoder` interface returns a Promise that resolves once all pending messages in the queue have been completed.

## Syntax

```js
flush()
```

### Parameters

None.

### Return value

A `Promise` that resolves with undefined.

### Exceptions

- `InvalidStateError` `DOMException`
    Returned if the Promise is rejected because the `state` is not `configured`.

## Examples

The following example flushes the `VideoDecoder`.

```js
VideoDecoder.flush();
```
