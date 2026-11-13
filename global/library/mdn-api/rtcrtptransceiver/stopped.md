---
title: "RTCRtpTransceiver: stopped property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcrtptransceiver/stopped/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRtpTransceiver: stopped property

> **Note:**
> Instead of using this deprecated property, compare `currentDirection` to `"stopped"`.

The read-only **`stopped`** property on the `RTCRtpTransceiver` interface indicates whether or not the transceiver's associated sender and receiver have both been stopped.

The transceiver is stopped if the `stop()` method has been called or if a change to either the local or the remote description has caused the transceiver to be stopped for some reason.

## Value

A Boolean value which is `true` if the transceiver's
`sender` will no longer send data, and its
`receiver` will no longer receive data. If
either or both are still at work, the result is `false`.

## Specifications

This feature is not part of any current specification. It is no longer on track to become a standard.

## See also

- WebRTC API
- Introduction to the Real-time Transport Protocol (RTP)
