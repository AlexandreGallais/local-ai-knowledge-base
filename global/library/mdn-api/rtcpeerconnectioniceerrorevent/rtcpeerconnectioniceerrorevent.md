---
title: "RTCPeerConnectionIceErrorEvent: RTCPeerConnectionIceErrorEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnectioniceerrorevent/rtcpeerconnectioniceerrorevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnectionIceErrorEvent: RTCPeerConnectionIceErrorEvent() constructor

The **`RTCPeerConnectionIceErrorEvent()`** constructor creates a new `RTCPeerConnectionIceErrorEvent` object with its `type` and other properties initialized as specified in the parameters.

Note that you will not normally create an object of this type yourself.

## Syntax

```js
new RTCPeerConnectionIceErrorEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    This is usually `"icecandidateerror"`.
- `options`
    An object that, _in addition to the properties defined in `Event()`_, can have the following properties:
    - `address` (optional)
        A string indicating the local address used to communicate with the STUN or TURN server.
        This should be set to `null` if the local IP address has not yet been exposed as part of a local ICE candidate.
    - `errorCode`
        A positive number providing the STUN error code returned by the STUN or TURN server.
        If no host candidate can reach the server and the `iceGatheringState` is `gathering`, this should be set to `701`.
    - `errorText` (optional)
        A string providing the STUN reason text returned by the STUN or TURN server.
    - `port` (optional)
        A positive number indicating the local port used to communicate with the STUN or TURN server.
        This should be set to `null` if the connection hasn't been established (that is, if `address` is `null`).
    - `url` (optional)
        A string indicating the URL of the STUN or TURN server being used.

### Return value

A new `RTCPeerConnectionIceErrorEvent` object.
