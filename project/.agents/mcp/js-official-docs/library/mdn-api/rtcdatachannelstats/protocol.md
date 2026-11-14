---
title: "RTCDataChannelStats: protocol property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannelstats/protocol/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannelStats: protocol property

The **`protocol`** property of the `RTCDataChannelStats` dictionary returns a string containing the `protocol` of the associated data channel.

The value is defined by the website or app when it creates the data channel.

## Value

A string containing the same value as the `RTCDataChannel.protocol` property of the associated data channel.

If no protocol was defined, this will be the empty string ("").

## See also

- `RTCDataChannel.protocol`
