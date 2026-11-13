---
title: "ReadableByteStreamController: byobRequest property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/readablebytestreamcontroller/byobrequest/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReadableByteStreamController: byobRequest property

The **`byobRequest`** read-only property of the `ReadableByteStreamController` interface returns the current BYOB request, or `null` if there are no pending requests.

An underlying byte source should check this property, and use it to write data to the stream if it exists (rather than using `ReadableByteStreamController.enqueue()`).
This will result in an efficient zero-byte transfer of the data to the consumer.

## Value

A `ReadableStreamBYOBRequest` object instance, or `null`.

## Examples

The example in Using readable byte streams > Creating a readable socket push byte stream shows how you use a `byobRequest` to transfer data (if it exists), or otherwise copy the data to the stream's internal queues using `ReadableByteStreamController.enqueue()`.

The relevant code is reproduced below.
If the `byobRequest` exists, data is read into `controller.byobRequest.view`, and then `ReadableStreamBYOBRequest.respond()` is called to signal the amount of data that is ready to transfer.

```js
if (controller.byobRequest) {
  const v = controller.byobRequest.view;
  bytesRead = socket.readInto(v.buffer, v.byteOffset, v.byteLength);
  if (bytesRead === 0) {
    controller.close();
  }
  controller.byobRequest.respond(bytesRead);
} else {
  // Write to data using enqueue().
}
```

## See also

- Using readable byte streams
- `ReadableByteStreamController`
