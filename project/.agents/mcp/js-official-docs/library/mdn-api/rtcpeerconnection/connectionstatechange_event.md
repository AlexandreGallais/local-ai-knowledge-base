---
title: "RTCPeerConnection: connectionstatechange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/connectionstatechange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: connectionstatechange event

The **`connectionstatechange`** event is sent to the `onconnectionstatechange` event handler on an `RTCPeerConnection` object after a new track has been added to an `RTCRtpReceiver` which is part of the connection.
The new connection state can be found in `connectionState`, and is one of the string values: `new`, `connecting`, `connected`, `disconnected`, `failed`, or `closed`.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("connectionstatechange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onconnectionstatechange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

For an `RTCPeerConnection` named `peerConnection`, this example uses `addEventListener()` to handle changes to the connectivity of the WebRTC session.
It calls an app-defined function called `setOnlineStatus()` to update a status display.

```js
peerConnection.addEventListener("connectionstatechange", (event) => {
  switch (peerConnection.connectionState) {
    case "new":
    case "connecting":
      setOnlineStatus("Connecting…");
      break;
    case "connected":
      setOnlineStatus("Online");
      break;
    case "disconnected":
      setOnlineStatus("Disconnecting…");
      break;
    case "closed":
      setOnlineStatus("Offline");
      break;
    case "failed":
      setOnlineStatus("Error");
      break;
    default:
      setOnlineStatus("Unknown");
      break;
  }
});
```

You can also create a handler for the `connectionstatechange` event using the `RTCPeerConnection.onconnectionstatechange` property (but note that this replaces other event listeners added using `onconnectionstatechange`, if any):

```js
peerConnection.onconnectionstatechange = (ev) => {
  switch (peerConnection.connectionState) {
    case "new":
    case "connecting":
      setOnlineStatus("Connecting…");
      break;
    // …
    default:
      setOnlineStatus("Unknown");
      break;
  }
};
```

## See also

- WebRTC API
- WebRTC connectivity
- Lifetime of a WebRTC session
- `RTCPeerConnection.connectionState`
