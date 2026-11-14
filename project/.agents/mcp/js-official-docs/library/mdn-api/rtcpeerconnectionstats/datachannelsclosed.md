---
title: "RTCPeerConnectionStats: dataChannelsClosed property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnectionstats/datachannelsclosed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnectionStats: dataChannelsClosed property

The **`dataChannelsClosed`** property of the `RTCPeerConnectionStats` dictionary indicates the number of unique `RTCDataChannel` objects that have left the `open` state during their lifetime.

A channel will leave the `open` state if either end of the connection or the underlying transport is closed.
Note that channels that transition to `closing` or `closed` without ever being `open` are not counted in this number.

## Value

A positive integer that indicates the number of unique `RTCDataChannel` objects that have left the `open` state during their lifetime.
