---
title: "RTCTrackEvent: transceiver property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtctrackevent/transceiver/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCTrackEvent: transceiver property

The WebRTC API interface `RTCTrackEvent`'s
read-only **`transceiver`** property indicates the
`RTCRtpTransceiver` affiliated with the event's
`track`.

The transceiver pairs the track's
`receiver` with an `RTCRtpSender`.

## Value

The `RTCRtpTransceiver` which pairs the `receiver` with a
sender and other properties which establish a single bidirectional SRTP
stream for use by the `track` associated with the
`RTCTrackEvent`.

> **Note:**
> The `RTCRtpReceiver` referred to by this
> `RTCRtpReceiver`'s `receiver`
> property will always be the same as the `RTCTrackEvent`'s
> `receiver` property.
