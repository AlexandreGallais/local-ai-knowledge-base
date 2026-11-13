---
title: "WebTransport: incomingUnidirectionalStreams property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransport/incomingunidirectionalstreams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransport: incomingUnidirectionalStreams property

The **`incomingUnidirectionalStreams`** read-only property of the `WebTransport` interface represents one or more unidirectional streams opened by the server. Returns a `ReadableStream` of `WebTransportReceiveStream` objects. Each one can be used to reliably read data from the server.

"Reliable" means that transmission and order of data are guaranteed. This provides slower delivery (albeit faster than with WebSockets) than `datagrams`, but is needed in situations where reliability and ordering are important, like chat applications.

## Value

A `ReadableStream` of `WebTransportReceiveStream` objects.

## Examples

An initial function is used to read the `WebTransportReceiveStream` objects from the `ReadableStream`. Each object is then passed to another function to read from those streams.

```js
async function receiveUnidirectional() {
  const uds = transport.incomingUnidirectionalStreams;
  const reader = uds.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    // value is an instance of WebTransportReceiveStream
    await readData(value);
  }
}

async function readData(receiveStream) {
  const reader = receiveStream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    // value is a Uint8Array
    console.log(value);
  }
}
```

## See also

- Using WebTransport
- `WebSockets API`
- `Streams API`
- WebTransport over HTTP/3
