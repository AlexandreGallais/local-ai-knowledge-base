---
title: "RTCPeerConnectionIceErrorEvent: errorText property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnectioniceerrorevent/errortext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnectionIceErrorEvent: errorText property

The **`errorText`** property of the `RTCPeerConnectionIceErrorEvent` interface represents the STUN error reason text returned by the STUN or TURN server if there was an error during ICE negotiation.

If communication with the STUN or TURN server couldn't be established at all, this will be a browser-specific string explaining the error.

## Value

A string returned by the STUN or TURN server, or a browser-specific string explaining why communication with the server could not be established.

## Examples

### Basic usage

This example creates a handler for `icecandidateerror` events, which creates human-readable messages describing the local network interface for the connection and the ICE server used to attempt the connection.
It then calls a function to display those messages and the value of the event's `errorText` property.

```js
pc.addEventListener("icecandidateerror", (event) => {
  const networkInfo = `[Local interface: ${event.address}:${event.port}]`;
  const iceServerInfo = `[ICE server: ${event.url}]`;

  showMessage(event.errorText, iceServerInfo, networkInfo);
});
```
