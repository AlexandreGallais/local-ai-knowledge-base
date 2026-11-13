---
title: "WebTransport: datagrams property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransport/datagrams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransport: datagrams property

The **`datagrams`** read-only property of the `WebTransport` interface returns a `WebTransportDatagramDuplexStream` instance that can be used to send and receive datagrams — unreliable data transmission.

"Unreliable" means that transmission of data is not guaranteed, nor is arrival in a specific order. This is fine in some situations and provides very fast delivery. For example, you might want to transmit regular game state updates where each message supersedes the last one that arrives, and order is not important.

## Value

A `WebTransportDatagramDuplexStream` object.

## Examples

### Writing an outgoing datagram

This code uses the `createWritable()` method, if it is supported, to get a `WebTransportDatagramsWritable` instance that can be used for writing data to the transport.
Otherwise, it falls back to the `writable` property (deprecated) (non-standard), which returns a `WritableStream` object that you can write data to using a writer, for transmission to the server:

```js
const writableStream =
  typeof transport.datagrams.createWritable === "function"
    ? transport.datagrams.createWritable()
    : transport.datagrams.writable; // Deprecated and non-standard.

const writer = writableStream.getWriter();
const data1 = new Uint8Array([65, 66, 67]);
const data2 = new Uint8Array([68, 69, 70]);
await writer.ready;
writer.write(data1);
await writer.ready;
writer.write(data2);
```

### Reading an incoming datagram

The `WebTransportDatagramDuplexStream.readable` property returns a `ReadableStream` object that you can use to receive data from the server:

```js
async function readData() {
  const reader = transport.datagrams.readable.getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    // value is a Uint8Array.
    console.log(value);
  }
}
```

Alternatively, to read datagrams into a buffer that you supply, construct the transport with the `datagramsReadableType` option set to `bytes`, and read the stream using a `ReadableStreamBYOBReader`.
See the Reading datagrams with a BYOB reader example on the `WebTransport()` constructor page.

## See also

- Using WebTransport
- `WebSockets API`
- `Streams API`
- WebTransport over HTTP/3
