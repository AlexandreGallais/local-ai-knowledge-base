---
title: "RTCPeerConnectionIceErrorEvent: address property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnectioniceerrorevent/address/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnectionIceErrorEvent: address property

The **`address`** property of the `RTCPeerConnectionIceErrorEvent` interface is a string that indicates the local IP address used to communicate with the STUN or TURN server when the error occurred.

## Value

A string specifying the local IP address of the network connection to the ICE server with which negotiations were occurring when the error occurred.
This address identifies the network interface on the local device used to attempt to establish the connection to the remote peer.

This can be useful on multi-homed systems—devices with more than one network connection—to determine which network interface is being used.
For example, on a mobile phone, there are typically at least two network interfaces available: a cellular connection and a Wi-Fi connection.

If the local IP address isn't exposed as part of a local ICE candidate, the value of `address` is `null`.

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
