---
title: "RTCTransportStats: iceRole property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtctransportstats/icerole/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCTransportStats: iceRole property

The **`iceRole`** property of the `RTCTransportStats` dictionary is a string that indicates the ICE role that the transport is fulfilling: that of the controlling agent, or the agent that is being controlled.

This has the same value as the `RTCIceTransport.role` property of the underlying `RTCDtlsTransport.iceTransport`.

## Value

A string that will be one of the following values: `controlled`, `controlling`, or `unknown`.
