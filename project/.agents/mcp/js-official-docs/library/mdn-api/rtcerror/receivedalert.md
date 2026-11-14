---
title: "RTCError: receivedAlert property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcerror/receivedalert/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCError: receivedAlert property

The **`receivedAlert`** read-only property of the `RTCError` interface specifies the fatal DTLS error which resulted in an alert being received from the remote peer.

## Value

A positive integer value.

> **Note:**
> This property is `null` if the `RTCError` doesn't represent a DTLS error.
> DTLS errors are indicated by the `errorDetail` property being set to `dtls-failure`.
