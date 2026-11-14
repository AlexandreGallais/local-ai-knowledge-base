---
title: "RTCRtpTransceiver: mid property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcrtptransceiver/mid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRtpTransceiver: mid property

The read-only `RTCRtpTransceiver` interface's **`mid`** property specifies the media ID (`mid`) which uniquely identifies the stream's pairing of sender and receiver.

## Value

A string which uniquely identifies the pairing of source and destination of the transceiver's stream. Its value is taken from the media ID of the SDP m-line. This value is `null` before a local or remote description containing the corresponding m-line is applied, or if a rollback undoes that association.

## See also

- Introduction to the Real-time Transport Protocol (RTP)
