---
title: "WebTransportDatagramDuplexStream"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransportdatagramduplexstream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportDatagramDuplexStream

The **`WebTransportDatagramDuplexStream`** interface of the `WebTransport API` represents a duplex stream that can be used for unreliable transport of datagrams between client and server. Provides access to a `ReadableStream` for reading incoming datagrams, a `WritableStream` for writing outgoing datagrams, and various settings and statistics related to the stream.

This is accessed via the `WebTransport.datagrams` property.

"Unreliable" means that transmission of data is not guaranteed, nor is arrival in a specific order. This is fine in some situations and provides very fast delivery. For example, you might want to transmit regular game state updates where each message supersedes the last one that arrives, and order is not important.

## Instance properties

- `incomingHighWaterMark` (deprecated) (non-standard)
    Represents the maximum number of incoming datagrams that can be queued while waiting to be read from the `readable` stream. Use `incomingMaxBufferedDatagrams` instead.
- `incomingMaxAge`
    Gets or sets the maximum age for incoming datagrams, in milliseconds. Returns `null` if no maximum age has been set.
- `incomingMaxBufferedDatagrams`
    Represents the maximum number of incoming datagrams that can be queued while waiting to be read from the `readable` stream.
- `maxDatagramSize` (read-only)
    Returns the maximum allowable size of outgoing datagrams, in bytes, that can be written to a `WebTransportDatagramsWritable` obtained via `createWritable()`, or the deprecated `writable` property.
- `outgoingHighWaterMark` (deprecated) (non-standard)
    Represents the maximum number of outgoing datagrams that can be queued for sending before backpressure is applied. Use `outgoingMaxBufferedDatagrams` instead.
- `outgoingMaxAge`
    Gets or sets the maximum age for outgoing datagrams, in milliseconds. Returns `null` if no maximum age has been set.
- `outgoingMaxBufferedDatagrams`
    Represents the maximum number of outgoing datagrams that can be queued for sending on each `WebTransportDatagramsWritable` before backpressure is applied.
- `readable` (read-only)
    Returns a `ReadableStream` instance that can be used to read incoming datagrams from the stream.
- `writable` (read-only) (deprecated) (non-standard)
    Returns a `WritableStream` instance that can be used to write outgoing datagrams to the stream.

## Instance methods

- `createWritable()`
    Returns a `WebTransportDatagramsWritable` instance that can be used to write outgoing datagrams to the stream.

## Examples

### Writing outgoing datagrams

This code uses the `createWritable()` method, if it is supported, to get a `WebTransportDatagramsWritable` instance that can be used for writing data to the transport.
Otherwise, it falls back to the `writable` property (deprecated) (non-standard), which returns a `WritableStream` object that you can write data to using a writer instead:

```js
const writableStream =
  typeof transport.datagrams.createWritable === "function"
    ? transport.datagrams.createWritable()
    : transport.datagrams.writable; // Deprecated and non-standard

const writer = writableStream.getWriter();
const data1 = new Uint8Array([65, 66, 67]);
const data2 = new Uint8Array([68, 69, 70]);
await writer.ready;
writer.write(data1);
await writer.ready;
writer.write(data2);
```

### Reading incoming datagrams

The `readable` property returns a `ReadableStream` object that you can use to receive data from the server:

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
