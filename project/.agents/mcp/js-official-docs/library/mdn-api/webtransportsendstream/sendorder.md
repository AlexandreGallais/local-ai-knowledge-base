---
title: "WebTransportSendStream: sendOrder property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransportsendstream/sendorder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportSendStream: sendOrder property

The **`sendOrder`** property of the `WebTransportSendStream` interface indicates the send priority of this stream relative to other streams for which the value has been set.

Queued bytes are sent first for streams that have a higher value.
If not set, the send order depends on the implementation.

## Value

A number indicating the relative priority of this stream when sending bytes.

## Examples

The example below shows how you can set the initial `sendOrder` when calling `WebTransport.createUnidirectionalStream()` to create the send stream, read the value from the stream, and then change the order.
After changing the order the priority of this stream would increase, becoming higher than any stream with a priority of less than "596996858".

```js
async function writeData() {
  const stream = await transport.createUnidirectionalStream({
    sendOrder: "400", // Set initial stream order
  });

  console.log(`Stream order: ${stream.sendOrder}`); // Stream order: 400

  // write data ...

  // Change the stream order
  stream.sendOrder = 596996858;
  console.log(`Stream order: ${stream.sendOrder}`); // Stream order: 596996858

  // write more data ...
}
```

## See also

- Using WebTransport
- `WebSockets API`
- `Streams API`
- WebTransport over HTTP/3
