---
title: "WebTransportDatagramDuplexStream: outgoingMaxAge property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransportdatagramduplexstream/outgoingmaxage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransportDatagramDuplexStream: outgoingMaxAge property

The **`outgoingMaxAge`** property of the `WebTransportDatagramDuplexStream` interface gets or sets the maximum age for outgoing datagrams, in milliseconds.

## Value

A number, or `null` if no maximum age has been set.

## Examples

```js
const url = "https://example.com:4999/wt";

async function initTransport(url) {
  // Initialize transport connection
  const transport = new WebTransport(url);

  // The connection can be used once ready fulfills
  await transport.ready;

  const datagrams = transport.datagrams;

  // set outgoingMaxAge
  datagrams.outgoingMaxAge = 2000;

  // get outgoingMaxAge
  console.log(datagrams.outgoingMaxAge);
}
```

## See also

- Using WebTransport
- `WebSockets API`
- `Streams API`
- WebTransport over HTTP/3
