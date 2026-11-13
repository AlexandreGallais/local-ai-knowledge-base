---
title: "RTCTransportStats: tlsVersion property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtctransportstats/tlsversion/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCTransportStats: tlsVersion property

The **`tlsVersion`** property of the `RTCTransportStats` dictionary indicates the negotiated TLS version of an underlying DTLS transport.

It is only present for DTLS transports, and only exists after DTLS has been negotiated.

The value comes from the DTLS handshake `ServerHello.version`, and is represented as four upper case hexadecimal digits, where the digits represent the two bytes of the version.
Note however that the bytes might not map directly to version numbers.
For example, DTLS represents version 1.2 as `'FEFD'` which numerically is `{254, 253}`.

## Value

A string that indicates the negotiated DTLS transport.
