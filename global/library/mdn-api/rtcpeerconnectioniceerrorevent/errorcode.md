---
title: "RTCPeerConnectionIceErrorEvent: errorCode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnectioniceerrorevent/errorcode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnectionIceErrorEvent: errorCode property

The **`errorCode`** property of the `RTCPeerConnectionIceErrorEvent` interface represents the STUN error code returned by the STUN or TURN server if there was an error during ICE negotiation.

## Value

A positive integer value stating the numeric STUN error code returned by the STUN or TURN server.

If no host candidate can reach the server, this property is set to the number 701, which is outside the range of valid STUN error codes.
This value is reported only once per server URL, and only while the `iceGatheringState` is `gathering`.

## Examples

### Basic usage

This example creates a handler for `icecandidateerror` events, which creates human-readable messages describing the local network interface for the connection and the ICE server used to attempt the connection.
It then calls a function to display those messages and the value of the event's `errorCode` property.

```js
pc.addEventListener("icecandidateerror", (event) => {
  const networkInfo = `[Local interface: ${event.address}:${event.port}]`;
  const iceServerInfo = `[ICE server: ${event.url}]`;

  showMessage(event.errorCode, iceServerInfo, networkInfo);
});
```
