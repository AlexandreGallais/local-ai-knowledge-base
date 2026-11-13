---
title: "RTCPeerConnection: icecandidateerror event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/icecandidateerror_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: icecandidateerror event

The **`icecandidateerror`** event is sent to an `RTCPeerConnection` if an error occurs while performing ICE negotiation through a STUN or TURN server.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("icecandidateerror", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onicecandidateerror = (event) => { }
```

## Event type

An `RTCPeerConnectionIceErrorEvent`. Inherits from `Event`.

## Examples

### Basic usage

The following example establishes a handler for `icecandidateerror` events that occur on the `RTCPeerConnection` `pc`. This handler looks specifically for 701 errors that indicate that candidates couldn't reach the STUN or TURN server.

When this happens, the server URL and the error message are passed to a function called `reportConnectFail()` to log or output the connection failure.

```js
pc.addEventListener("icecandidateerror", (event) => {
  if (event.errorCode === 701) {
    reportConnectFail(event.url, event.errorText);
  }
});
```

Note that if multiple STUN and/or TURN servers are provided when creating the connection, this error may happen more than once, if more than one of those servers fails. Each provided server is tried until a connection is established.

## See also

- WebRTC API
