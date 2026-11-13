---
title: "WebTransport: createUnidirectionalStream() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransport/createunidirectionalstream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransport: createUnidirectionalStream() method

The **`createUnidirectionalStream()`** method of the `WebTransport` interface asynchronously opens a unidirectional stream.

The method returns a `Promise` that resolves to a `WritableStream` object, which can be used to reliably write data to the server.

"Reliable" means that transmission and order of data are guaranteed. This provides slower delivery (albeit faster than with WebSockets) than `datagrams`, but is needed in situations where reliability and ordering are important, like chat applications.

The relative order in which queued bytes are emptied from created streams can be specified using the `sendOrder` option.
If set, queued bytes in streams with a higher send order are guaranteed to be sent before queued bytes for streams with a lower send order.
If the order number is not set then the order in which bytes are sent is implementation dependent.
Note however that even though bytes from higher send-order streams are sent first, they may not arrive first.

## Syntax

```js
createUnidirectionalStream()
createUnidirectionalStream(options)
```

### Parameters

- `options` (optional)
    An object that may have the following properties:
    - `sendOrder` (optional)
        An integer value specifying the send priority of this stream relative to other streams for which the value has been set.
        Queued bytes are sent first for streams that have a higher value.
        If not set, the send order depends on the implementation.

### Return value

A `Promise` that resolves to a `WebTransportSendStream` object (this is a `WritableStream`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if `createUnidirectionalStream()` is invoked while the WebTransport is closed or failed.

## Examples

Use the `createUnidirectionalStream()` method to get a reference to a `WritableStream`. From this you can `get a writer` to allow data to be written to the stream and sent to the server.

Use the `close()` method of the resulting `WritableStreamDefaultWriter` to close the stream. The browser tries to send all pending data before actually closing the stream.

```js
async function writeData() {
  const stream = await transport.createUnidirectionalStream({
    sendOrder: "596996858",
  });
  const writer = stream.getWriter();
  const data1 = new Uint8Array([65, 66, 67]);
  const data2 = new Uint8Array([68, 69, 70]);
  writer.write(data1);
  writer.write(data2);

  try {
    await writer.close();
    console.log("All data has been sent.");
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  }
}
```

You can also use `WritableStreamDefaultWriter.abort()` to abruptly terminate the stream. When using `abort()`, the browser may discard any pending data that hasn't yet been sent.

```js
// …

const stream = await transport.createUnidirectionalStream();
const writer = stream.getWriter();

// …

writer.write(data1);
writer.write(data2);
await writer.abort();
// Not all the data may have been written.
```

## See also

- Using WebTransport
- `WebTransport.createBidirectionalStream()`
- `WebSockets API`
- `Streams API`
- WebTransport over HTTP/3
