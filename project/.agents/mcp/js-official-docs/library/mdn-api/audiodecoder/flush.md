---
title: "AudioDecoder: flush() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiodecoder/flush/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioDecoder: flush() method

The **`flush()`** method of the `AudioDecoder` interface returns a Promise that resolves once all pending messages in the queue have been completed.

## Syntax

```js
flush()
```

### Parameters

None.

### Return value

A `Promise` that resolves with undefined.

### Exceptions

If an error occurs, the promise will resolve with one of the following exceptions:

- `InvalidStateError` `DOMException`
    Returned if the Promise is rejected because the `state` is not `configured`.

## Examples

The following example flushes the `AudioDecoder`.

```js
await audioDecoder.flush();
```
