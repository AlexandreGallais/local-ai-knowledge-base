---
title: "RTCDataChannel: priority property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannel/priority/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannel: priority property

The read-only **`priority`** property of the `RTCDataChannel` interface returns a string indicating the priority of the data channel. The priority is assigned by the user agent at channel creation time based on the `priority` option in the `dataChannelDict` parameter passed to `RTCPeerConnection.createDataChannel()`, or from the remote peer for incoming data channels.

## Value

A string indicating the priority of the data channel. Possible values are, in order from lowest to highest priority:

- `"very-low"`
    The data channel has a very low priority.
- `"low"`
    The data channel has a low priority. This is the default value.
- `"medium"`
    The data channel has a medium priority.
- `"high"`
    The data channel has a high priority.

## Examples

### Checking the priority of a data channel

```js
const pc = new RTCPeerConnection();
const dc = pc.createDataChannel("my channel", { priority: "high" });

console.log(dc.priority); // "high"
```

## See also

- WebRTC API
- Using WebRTC data channels
- `RTCDataChannel`
- `RTCPeerConnection.createDataChannel()`
