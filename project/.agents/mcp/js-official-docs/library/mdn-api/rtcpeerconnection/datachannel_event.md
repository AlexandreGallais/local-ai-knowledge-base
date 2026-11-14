---
title: "RTCPeerConnection: datachannel event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/datachannel_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: datachannel event

A **`datachannel`** event is sent to an `RTCPeerConnection` instance when an `RTCDataChannel` has been added to the connection, as a result of the remote peer calling `RTCPeerConnection.createDataChannel()`.

> **Note:**
> This event is _not_ dispatched when the local end of the connection creates the channel.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("datachannel", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ondatachannel = (event) => { }
```

## Event type

An `RTCDataChannelEvent`. Inherits from `Event`.

## Examples

This example sets up a function that handles `datachannel` events by gathering the information needed to communicate with the newly added `RTCDataChannel` and by adding event handlers for the events that occur on that channel.

```js
pc.addEventListener("datachannel", (ev) => {
  receiveChannel = ev.channel;
  receiveChannel.onmessage = myHandleMessage;
  receiveChannel.onopen = myHandleOpen;
  receiveChannel.onclose = myHandleClose;
});
```

`receiveChannel` is set to the value of the event's `channel` property, which specifies the `RTCDataChannel` object representing the data channel linking the remote peer to the local one.

This same code can also instead use the `RTCPeerConnection` interface's `ondatachannel` event handler property, like this (but note that this replaces other event listeners added using `ondatachannel`, if any):

```js
pc.ondatachannel = (ev) => {
  receiveChannel = ev.channel;
  receiveChannel.onmessage = myHandleMessage;
  receiveChannel.onopen = myHandleOpen;
  receiveChannel.onclose = myHandleClose;
};
```

## See also

- WebRTC API
- Using WebRTC data channels
- A simple RTCDataChannel sample
- `RTCDataChannelEvent`
- `RTCPeerConnection.createDataChannel()`
