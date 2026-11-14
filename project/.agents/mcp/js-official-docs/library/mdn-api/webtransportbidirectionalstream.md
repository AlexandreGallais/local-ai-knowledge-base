---
title: "WebTransportBidirectionalStream"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransportbidirectionalstream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportBidirectionalStream

The **`WebTransportBidirectionalStream`** interface of the `WebTransport API` represents a bidirectional stream created by a server or a client that can be used for reliable transport. Provides access to a `WebTransportReceiveStream` for reading incoming data, and a `WebTransportSendStream` for writing outgoing data.

## Instance properties

- `readable` (read-only)
    Returns a `WebTransportReceiveStream` instance that can be used to read incoming data.
- `writable` (read-only)
    Returns a `WebTransportSendStream` instance that can be used to write outgoing data.

## Examples

### Bidirectional transmission initiated by the user agent

To open a bidirectional stream from a user agent, you use the `WebTransport.createBidirectionalStream()` method to get a reference to a `WebTransportBidirectionalStream`. The `readable` and `writable` properties return references to `WebTransportReceiveStream` and `WebTransportSendStream` instances.
These inherit from `ReadableStream` and `WritableStream` respectively, and can be used to read from and write to the server.

```js
async function setUpBidirectional() {
  const stream = await transport.createBidirectionalStream();
  // stream is a WebTransportBidirectionalStream
  // stream.readable is a WebTransportReceiveStream
  const readable = stream.readable;
  // stream.writable is a WebTransportSendStream
  const writable = stream.writable;

  // …
}
```

Reading from the `WebTransportReceiveStream` can be done in the same way as you would read a `ReadableStream`:

```js
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
```

And writing to the `WebTransportSendStream` can be done like this:

```js
async function writeData(writable) {
  const writer = writable.getWriter();
  const data1 = new Uint8Array([65, 66, 67]);
  const data2 = new Uint8Array([68, 69, 70]);
  writer.write(data1);
  writer.write(data2);
}
```

### Bidirectional transmission initiated by the server

If the server opens a bidirectional stream to transmit data to and receive it from the client, this can be accessed via the `WebTransport.incomingBidirectionalStreams` property, which returns a `ReadableStream` of `WebTransportBidirectionalStream` objects. Each one can be used to read and write `Uint8Array` instances as shown above. However, you need an initial function to read the bidirectional stream in the first place:

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
```

## See also

- Using WebTransport
- `WebSockets API`
- `Streams API`
- WebTransport over HTTP/3
