---
title: "ReadableByteStreamController: close() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/readablebytestreamcontroller/close/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReadableByteStreamController: close() method

The **`close()`** method of the `ReadableByteStreamController` interface closes the associated stream.

This might be called by the underlying source when its data source has been exhausted/completed.

> **Note:**
> Readers will still be able to read any previously-enqueued chunks from the stream, but once those are read, the stream will become closed.
> However if there is an outstanding and partially written `byobRequest` when `close()` is called, the stream will be errored.

## Syntax

```js
close()
```

### Parameters

None.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown if the source object is not a `ReadableByteStreamController`, it is already closed, or the stream is not readable for some other reason.

## Examples

The example in Using readable byte streams > Creating a readable socket push byte stream how we might close the stream when there is no more data.

The relevant code is reproduced below.
This relies on the hypothetical `readInto()` method returning 0 bytes only when there is no more data.

```js
bytesRead = socket.readInto(v.buffer, v.byteOffset, v.byteLength);
if (bytesRead === 0) {
  controller.close();
}
```

After calling close, the stream will be closed, and any consumers signaled.
For example if using a `ReadableStreamBYOBReader` any `read()` requests would resolve with `done: true` and the promise from `ReadableStreamBYOBReader.closed` would also be resolved.

## See also

- Using readable byte streams
- `ReadableByteStreamController`
