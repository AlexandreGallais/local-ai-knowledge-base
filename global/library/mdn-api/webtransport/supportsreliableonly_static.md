---
title: "WebTransport: supportsReliableOnly static property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransport/supportsreliableonly_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransport: supportsReliableOnly static property

The **`supportsReliableOnly`** static read-only property of the `WebTransport` interface returns a boolean value that indicates whether the browser supports `WebTransport` sessions over exclusively reliable transports, such as HTTP/2. Such sessions can't send unreliable datagrams, which need HTTP/3 over QUIC.

## Value

A boolean value: `true` if the browser supports reliable-only `WebTransport` sessions, `false` otherwise.

## Examples

### Basic usage

```js
const url = "https://example.com:4999/webtransport";

async function connect() {
  // WebTransport itself may be unavailable, so check before reading the static property
  if (typeof WebTransport === "undefined") {
    console.log("WebTransport is not supported in this browser.");
    return;
  }

  // Without reliable-only support, the session needs HTTP/3,
  // so it fails on networks that block UDP
  if (!WebTransport.supportsReliableOnly) {
    console.log("This browser can't fall back to a reliable-only session.");
  }

  const transport = new WebTransport(url);

  try {
    await transport.ready;
    console.log("Connected");
  } catch (error) {
    console.error("Connection failed:", error);
  }
}

connect();
```

## See also

- Using WebTransport
- `WebSockets API`
- `Streams API`
- WebTransport over HTTP/3
