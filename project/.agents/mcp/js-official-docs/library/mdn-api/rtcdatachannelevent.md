---
title: "RTCDataChannelEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannelevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannelEvent

The **`RTCDataChannelEvent`** interface
represents an event related to a specific `RTCDataChannel`.

## Constructor

- `RTCDataChannelEvent()`
    Creates a new `RTCDataChannelEvent`.

## Instance properties

_Also inherits properties from `Event`._

- `channel` (read-only)
    Returns the `RTCDataChannel` associated with the event.

## Examples

In this example, the `datachannel` event handler is set up to save the data channel reference and set up handlers for the events which need to be monitored. The `channel` property provides the `RTCDataChannel` representing the connection to the other peer.

```js
pc.ondatachannel = (event) => {
  inboundDataChannel = event.channel;
  inboundDataChannel.onmessage = handleIncomingMessage;
  inboundDataChannel.onopen = handleChannelOpen;
  inboundDataChannel.onclose = handleChannelClose;
};
```

See A simple RTCDataChannel sample for another, more complete, example of how to use data channels.

## See also

- WebRTC
- `RTCDataChannel`
- A simple RTCDataChannel sample
- `RTCPeerConnection` (the target interface for `datachannel` events)
