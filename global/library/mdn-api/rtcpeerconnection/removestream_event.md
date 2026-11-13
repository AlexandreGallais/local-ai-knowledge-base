---
title: "RTCPeerConnection: removestream event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/removestream_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: removestream event

The obsolete **`removestream`** event was sent to an `RTCPeerConnection` to inform it that a `MediaStream` had been removed from the connection.
You can use the `RTCPeerConnection` interface's `onremovestream` property to set a handler for this event.

This is the counterpart to the `addstream` event, which is also obsolete.

> **Warning:**
> This event has been removed from the WebRTC specification in favor of the existing `removetrack` event on the remote `MediaStream` and the corresponding event handler property of the remote `MediaStream`. The `RTCPeerConnection` API is now track-based, so having zero tracks in the remote stream is equivalent to the remote stream being removed, which caused a `removestream` event.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("removestream", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onremovestream = (event) => { }
```

## Event type

A `MediaStreamEvent`. Inherits from `Event`.

## See also

- WebRTC API
- `RTCPeerConnection.removeStream()`
- `removetrack`
