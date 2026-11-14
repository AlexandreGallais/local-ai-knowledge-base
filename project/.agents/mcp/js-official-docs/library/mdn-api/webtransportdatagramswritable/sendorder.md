---
title: "WebTransportDatagramsWritable: sendOrder property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransportdatagramswritable/sendorder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportDatagramsWritable: sendOrder property

The **`sendOrder`** property of the `WebTransportDatagramsWritable` interface represents the priority of this stream's datagrams relative to other streams and datagrams in the same `sendGroup`, as an integer.

Within a `sendGroup`, bytes queued for sending on streams and datagrams with a higher `sendOrder` are sent before any bytes from lower-priority ones.
Different groups are expected to be treated as equals for the purposes of bandwidth allocation — though the precise way bandwidth is divided between groups is implementation-defined.

## Value

An integer indicating the relative priority of this stream's datagrams when sending bytes.
The default value is `0`.

## Examples

### Basic usage

The example below shows how you can set the initial `sendOrder` when calling `createWritable()` to create the writable stream, read the value back from the stream, and then change it:

```js
const writable = transport.datagrams.createWritable({
  sendOrder: 1, // Set initial send order
});

console.log(`Send order: ${writable.sendOrder}`); // Send order: 1

const writer = writable.getWriter();
const data = new Uint8Array([65, 66, 67]);
await writer.ready;
writer.write(data).catch(() => {});

// Increase the priority of this stream's datagrams
writable.sendOrder = 2;
console.log(`Send order: ${writable.sendOrder}`); // Send order: 2
```

## See also

- `Streams API`
- Using WebTransport
