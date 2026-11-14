---
title: "RTCTrackEvent: receiver property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtctrackevent/receiver/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCTrackEvent: receiver property

The read-only **`receiver`** property
of the `RTCTrackEvent` interface indicates the
`RTCRtpReceiver` which is used to receive data containing media for the
`track` to which the event refers.

## Value

The `RTCRtpReceiver` which pairs the `receiver` with a
sender and other properties which establish a single bidirectional SRTP
stream for use by the `track` associated with the
`RTCTrackEvent`.

> **Note:**
> The `transceiver`
> includes its own `receiver` property, which
> will always be the same `RTCRtpReceiver` as this one.
