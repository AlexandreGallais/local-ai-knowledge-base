---
title: "WebTransportDatagramDuplexStream: incomingHighWaterMark property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransportdatagramduplexstream/incominghighwatermark/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportDatagramDuplexStream: incomingHighWaterMark property

The **`incomingHighWaterMark`** property of the `WebTransportDatagramDuplexStream` interface represents the maximum number of incoming datagrams that can be queued while waiting to be read from the `readable` stream.
If more datagrams arrive than the queue can hold, the oldest datagrams in the queue are dropped.
The number of datagrams dropped this way is reported in the `droppedIncoming` property of the datagram statistics returned by `WebTransport.getStats()`.

This property has been replaced in the specification by `incomingMaxBufferedDatagrams`, which should be used instead if supported (see its browser compatibility table).

## Value

A number.

## Examples

```js
const url = "https://example.com:4999/wt";

async function initTransport(url) {
  // Initialize transport connection
  const transport = new WebTransport(url);

  // The connection can be used once ready fulfills
  await transport.ready;

  const datagrams = transport.datagrams;

  // set incomingHighWaterMark
  datagrams.incomingHighWaterMark = 20000;

  // get incomingHighWaterMark
  console.log(datagrams.incomingHighWaterMark);
}
```

## See also

- `WebTransport.getStats()`
- Using WebTransport
- `WebSockets API`
- `Streams API`
- WebTransport over HTTP/3
