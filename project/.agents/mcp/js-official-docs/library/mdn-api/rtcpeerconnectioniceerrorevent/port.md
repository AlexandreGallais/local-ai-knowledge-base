---
title: "RTCPeerConnectionIceErrorEvent: port property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnectioniceerrorevent/port/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnectionIceErrorEvent: port property

The **`port`** property of the `RTCPeerConnectionIceErrorEvent` interface represents the port number over which communication with the STUN or TURN server is taking place.

This is `null` if the connection hasn't been established (`address` is `null`).

## Value

A positive integer.

`null` if the connection hasn't been established (that is, if `address` is `null`).

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
