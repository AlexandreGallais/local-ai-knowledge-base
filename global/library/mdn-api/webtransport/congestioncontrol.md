---
title: "WebTransport: congestionControl property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransport/congestioncontrol/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransport: congestionControl property

The **`congestionControl`** read-only property of the `WebTransport` interface indicates the application's preference for either high throughput or low-latency when sending data.

The value is set in the `WebTransport()` constructor options.

## Value

A string with one of the following values:

- `default`
    The default congestion control tuning for the transport.
    This is the default.
- `throughput`
    The application prefers congestion control to be tuned for throughput.
- `low-latency`
    The application prefers congestion control to be tuned for low-latency.

## Examples

This example shows how to get the `congestionControl` preference.
As this is not explicitly set in the constructor, the result is `default`.

```js
const url = "https://example.com:4999/wt";
const transport = new WebTransport(url);
console.log(transport.congestionControl); // default
```
