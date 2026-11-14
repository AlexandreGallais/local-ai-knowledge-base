---
title: "WebTransport: incomingBidirectionalStreams property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransport/incomingbidirectionalstreams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransport: incomingBidirectionalStreams property

The **`incomingBidirectionalStreams`** read-only property of the `WebTransport` interface represents one or more bidirectional streams opened by the server. Returns a `ReadableStream` of `WebTransportBidirectionalStream` objects. Each one can be used to reliably read data from the server and write data back to it.

"Reliable" means that transmission and order of data are guaranteed. This provides slower delivery (albeit faster than with WebSockets) than `datagrams`, but is needed in situations where reliability and ordering are important, like chat applications.

## Value

A `ReadableStream` of `WebTransportBidirectionalStream` objects.

## Examples

An initial function is used to read the `WebTransportBidirectionalStream` objects from the `ReadableStream`. For each one, the `WebTransportBidirectionalStream.readable` and `WebTransportBidirectionalStream.writable` values are passed to other functions to read from and write to those streams.

```js
async function receiveBidirectional() {
  const bds = transport.incomingBidirectionalStreams;
  const reader = bds.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    // value is an instance of WebTransportBidirectionalStream
    await readData(value.readable);
    await writeData(value.writable);
  }
}

async function readData(readable) {
  const reader = readable.getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    // value is a Uint8Array.
    console.log(value);
  }
}

async function writeData(writable) {
  const writer = writable.getWriter();
  const data1 = new Uint8Array([65, 66, 67]);
  const data2 = new Uint8Array([68, 69, 70]);
  writer.write(data1);
  writer.write(data2);
}
```

## See also

- Using WebTransport
- `WebSockets API`
- `Streams API`
- WebTransport over HTTP/3
