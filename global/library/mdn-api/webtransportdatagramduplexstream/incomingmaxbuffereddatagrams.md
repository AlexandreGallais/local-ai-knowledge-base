---
title: "WebTransportDatagramDuplexStream: incomingMaxBufferedDatagrams property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransportdatagramduplexstream/incomingmaxbuffereddatagrams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportDatagramDuplexStream: incomingMaxBufferedDatagrams property

The **`incomingMaxBufferedDatagrams`** property of the `WebTransportDatagramDuplexStream` interface represents the maximum number of incoming datagrams that can be queued while waiting to be read from the `readable` stream.

## Value

An integer.

The initial value is defined by the browser.
Setting the property to `0` sets it to `1`.

## Description

Datagrams received from the server are held in a queue until they are read from the `readable` stream.
If more datagrams arrive than the queue can hold, the oldest datagrams in the queue are dropped to make room for the new ones.
The browser doesn't notify your application when datagrams are dropped.
The number of incoming datagrams dropped because the queue was full is reported in the `droppedIncoming` property of the datagram statistics returned by `WebTransport.getStats()`.
If this number keeps growing, increase this value or read datagrams from the stream more often.

This property replaces the deprecated `incomingHighWaterMark` property.

## Examples

### Setting the maximum number of buffered incoming datagrams

This example sets the incoming queue to hold up to 100 datagrams, and then logs the value.

```js
const url = "https://example.com:4999/wt";

async function initTransport(url) {
  // Initialize transport connection
  const transport = new WebTransport(url);

  // The connection can be used once ready fulfills
  await transport.ready;

  const datagrams = transport.datagrams;

  // set incomingMaxBufferedDatagrams
  datagrams.incomingMaxBufferedDatagrams = 100;

  // get incomingMaxBufferedDatagrams
  console.log(datagrams.incomingMaxBufferedDatagrams);
}
```

## See also

- `WebTransportDatagramDuplexStream.readable`
- `WebTransport.getStats()`
- `WebTransportDatagramDuplexStream.incomingMaxAge`
- `WebTransportDatagramDuplexStream.outgoingMaxBufferedDatagrams`
- Using WebTransport
- `Streams API`
