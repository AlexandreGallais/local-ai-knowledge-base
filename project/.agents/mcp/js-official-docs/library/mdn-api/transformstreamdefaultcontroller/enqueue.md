---
title: "TransformStreamDefaultController: enqueue() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/transformstreamdefaultcontroller/enqueue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TransformStreamDefaultController: enqueue() method

The **`enqueue()`** method of the `TransformStreamDefaultController` interface enqueues the given chunk in the readable side of the stream.

For more information on readable streams and chunks see Using Readable Streams.

## Syntax

```js
enqueue(chunk)
```

### Parameters

- `chunk`
    The chunk being queued. A chunk is a single piece of data. It can be any type of data, and a stream can contain chunks of different types.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    The stream is not readable.
    This might occur if the stream is errored via `controller.error()`, or when it is closed without its controller's `controller.close()` method ever being called.

## Examples

In this example an encoded chunk is passed to the queue using the `enqueue()` method.

```js
const textEncoderStream = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(new TextEncoder().encode(chunk));
  },
  flush(controller) {
    controller.terminate();
  },
});
```
