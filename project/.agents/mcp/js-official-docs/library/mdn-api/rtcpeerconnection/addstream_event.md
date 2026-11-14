---
title: "RTCPeerConnection: addstream event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/addstream_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: addstream event

The obsolete **`addstream`** event is sent to an `RTCPeerConnection` when new media, in the form of a `MediaStream` object, has been added to it.

> **Warning:**
> This event has been removed from the WebRTC specification. You should instead watch for the `track` event, which is sent for each media track added to the `RTCPeerConnection`.

You can, similarly, watch for streams to be removed from the connection by monitoring the `removestream` event.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("addstream", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onaddstream = (event) => { }
```

## Event type

A `MediaStreamEvent`. Inherits from `Event`.

## Examples

This example looks to determine if the user's browser supports the `track` event. If it does, a `track` event listener is set up; otherwise, an `addstream` event listener is set up. `pc` is an `RTCPeerConnection`. This example uses the `ontrack` and `onaddstream` event handler properties (but note that this replaces other event listeners added using `ontrack` and `onaddstream`, if any).

```js
if (pc.addTrack !== undefined) {
  pc.ontrack = (ev) => {
    ev.streams.forEach((stream) => doAddStream(stream));
  };
} else {
  pc.onaddstream = (ev) => {
    doAddStream(ev.stream);
  };
}
```

This calls a function `doAddStream()` once for each stream being added to the `RTCPeerConnection`, regardless of whether the browser sends `addstream` or `track`.

You can also use the `addEventListener()` method to set an event listener:

```js
pc.addEventListener("addstream", (ev) => doAddStream(ev.stream), false);
```

## See also

- WebRTC API
- `RTCPeerConnection.addStream()`
- `MediaStreamEvent`
