---
title: "WebTransport: protocol property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransport/protocol/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransport: protocol property

The **`protocol`** read-only property of the `WebTransport` interface returns the application-specific protocol selected by the server.

The value is selected from those offered in the `protocols` constructor option.
Note that the value is set once the `ready` promise fulfills.
It is the empty string if `protocols` was not used, or if the server chose not to select one of the offered protocols.

## Value

A string.
Defaults to `""`.

## Examples

### Requesting and reading a negotiated protocol

This example shows how to request a set of candidate protocols and read back the one the server selected.

```js
const url = "https://example.com:4999/wt";

async function initTransport(url) {
  const transport = new WebTransport(url, {
    protocols: ["chat", "file-transfer"],
  });

  try {
    // The connection can be used once ready fulfills
    await transport.ready;
    console.log(transport.protocol); // e.g. "chat", or "" if none was selected
    return transport;
  } catch (error) {
    // Ready may reject if the offered protocols aren't supported
    console.error(`Connection failed: ${error}`);
  }
}

initTransport(url);
```
