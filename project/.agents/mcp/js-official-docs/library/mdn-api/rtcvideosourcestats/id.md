---
title: "RTCVideoSourceStats: id property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcvideosourcestats/id/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCVideoSourceStats: id property

The **`id`** property of the `RTCVideoSourceStats` dictionary is a string which uniquely identifies the object for which this object provides statistics.

Using the `id`, you can correlate this statistics object with others, in order to monitor statistics over time for a given WebRTC object, such as an `RTCPeerConnection`, or an `RTCDataChannel`.

## Value

A string that uniquely identifies the object for which this `RTCVideoSourceStats` object provides statistics.

The format of the ID string is not defined by the specification, so you cannot reliably make any assumptions about the contents of the string, or assume that the format of the string will remain unchanged for a given object type.
