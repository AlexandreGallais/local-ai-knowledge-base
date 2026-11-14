---
title: "WebTransportDatagramDuplexStream: outgoingMaxBufferedDatagrams property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransportdatagramduplexstream/outgoingmaxbuffereddatagrams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportDatagramDuplexStream: outgoingMaxBufferedDatagrams property

The **`outgoingMaxBufferedDatagrams`** property of the `WebTransportDatagramDuplexStream` interface represents the maximum number of outgoing datagrams that can be queued for sending on each `WebTransportDatagramsWritable` before backpressure is applied.

## Value

An integer.

The initial value is defined by the browser.
Setting the property to `0` sets it to `1`.

## Description

Each `WebTransportDatagramsWritable` returned by `createWritable()` has its own queue of datagrams waiting to be sent.
When the number of datagrams in a queue reaches this value, the writable applies backpressure: the promise returned by the writer's `write()` method, and its `ready` promise, don't fulfill until there is room in the queue for another datagram.
Queued datagrams are not dropped because the queue is full, though they can still expire if `outgoingMaxAge` is set.

Increasing this value releases backpressure on any writable whose queue is now shorter than the new value.

This property replaces the deprecated `outgoingHighWaterMark` property.

## Examples

### Setting the maximum number of buffered outgoing datagrams

This example sets the outgoing queue of each writable to hold up to 100 datagrams, and then logs the value.

```js
const url = "https://example.com:4999/wt";

async function initTransport(url) {
  // Initialize transport connection
  const transport = new WebTransport(url);

  // The connection can be used once ready fulfills
  await transport.ready;

  const datagrams = transport.datagrams;

  // set outgoingMaxBufferedDatagrams
  datagrams.outgoingMaxBufferedDatagrams = 100;

  // get outgoingMaxBufferedDatagrams
  console.log(datagrams.outgoingMaxBufferedDatagrams);
}
```

## See also

- `WebTransportDatagramDuplexStream.createWritable()`
- `WebTransportDatagramDuplexStream.outgoingMaxAge`
- `WebTransportDatagramDuplexStream.incomingMaxBufferedDatagrams`
- Using WebTransport
- `Streams API`
