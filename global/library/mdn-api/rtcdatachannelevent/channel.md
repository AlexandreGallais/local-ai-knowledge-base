---
title: "RTCDataChannelEvent: channel property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannelevent/channel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannelEvent: channel property

The read-only property **`RTCDataChannelEvent.channel`**
returns the `RTCDataChannel` associated with the event.

## Value

A `RTCDataChannel` object representing the data channel linking the
receiving `RTCPeerConnection` to its remote peer.

## Example

The first line of code in the `datachannel` event handler shown below takes
the channel from the event object and saves it locally for use by the code handling data
traffic.

```js
pc.ondatachannel = (event) => {
  inboundDataChannel = event.channel;
  inboundDataChannel.onmessage = handleIncomingMessage;
  inboundDataChannel.onopen = handleChannelOpen;
  inboundDataChannel.onclose = handleChannelClose;
};
```

## See also

- `datachannel`
- `RTCDataChannel`
- A simple RTCDataChannel sample
- `RTCPeerConnection`
