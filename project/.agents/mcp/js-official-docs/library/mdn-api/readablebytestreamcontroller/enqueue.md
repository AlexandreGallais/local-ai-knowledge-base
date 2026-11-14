---
title: "ReadableByteStreamController: enqueue() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/readablebytestreamcontroller/enqueue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReadableByteStreamController: enqueue() method

The **`enqueue()`** method of the `ReadableByteStreamController` interface enqueues a given chunk on the associated readable byte stream (the chunk is transferred into the stream's internal queues).

This should only be used to transfer data to the queue when `byobRequest` is `null`.

## Syntax

```js
enqueue(chunk)
```

### Parameters

- `chunk`
    The chunk to enqueue.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown if the source object is not a `ReadableByteStreamController`, or the stream cannot be read for some other reason, or the chunk is not an object, or the chunk's internal array buffer is non-existent, zero-length, or detached.
    It is also thrown if the stream has been closed.

## Examples

The example in Using readable byte streams > Creating a readable socket push byte stream shows how you can use `enqueue()` to copy data to the stream if there is no outstanding `byobRequest`.
If there is a `byobRequest` then it should be used!

The code below shows data being read into an `ArrayBuffer` using a "hypothetical" `socket.readInto()` method and then enqueued (but only if data was actually copied):

```js
const buffer = new ArrayBuffer(DEFAULT_CHUNK_SIZE);
bytesRead = socket.readInto(buffer, 0, DEFAULT_CHUNK_SIZE);
if (bytesRead === 0) {
  controller.close();
} else {
  controller.enqueue(new Uint8Array(buffer, 0, bytesRead));
}
```

## See also

- Using readable byte streams
- `ReadableByteStreamController`
