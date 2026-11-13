---
title: "RTCRtpSender: track property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcrtpsender/track/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRtpSender: track property

The **`track`** read-only property of
the `RTCRtpSender` interface returns the `MediaStreamTrack`
which is being handled by the `RTCRtpSender`.

## Value

A `MediaStreamTrack` object representing the media associated with the
`RTCRtpSender`. If no track is associated with the sender, this value is
`null`, in which case the sender transmits nothing.
