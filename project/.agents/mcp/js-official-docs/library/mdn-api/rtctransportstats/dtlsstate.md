---
title: "RTCTransportStats: dtlsState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtctransportstats/dtlsstate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCTransportStats: dtlsState property

The **`dtlsState`** property of the `RTCTransportStats` dictionary is a string that indicates the current state of the underlying `RTCDtlsTransport`.

This has the same value as the corresponding `RTCDtlsTransport.state` property.

## Value

A string that will be one of the following values: `new`, `connecting`, `connected`, `closed`, `failed`.
