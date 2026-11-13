---
title: "WebTransportDatagramDuplexStream: outgoingHighWaterMark property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransportdatagramduplexstream/outgoinghighwatermark/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportDatagramDuplexStream: outgoingHighWaterMark property

The **`outgoingHighWaterMark`** property of the `WebTransportDatagramDuplexStream` interface represents the maximum number of outgoing datagrams that can be queued for sending before backpressure is applied.
Queued datagrams are not dropped because the queue is full, though they can still expire if `outgoingMaxAge` is set.

This property has been replaced in the specification by `outgoingMaxBufferedDatagrams`, which should be used instead if supported (see its browser compatibility table).

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

  // set outgoingHighWaterMark
  datagrams.outgoingHighWaterMark = 20000;

  // get outgoingHighWaterMark
  console.log(datagrams.outgoingHighWaterMark);
}
```

## See also

- Using WebTransport
- `WebSockets API`
- `Streams API`
- WebTransport over HTTP/3
