---
title: "RTCPeerConnection: setConfiguration() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/setconfiguration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: setConfiguration() method

The **`setConfiguration()`** method of the `RTCPeerConnection` interface sets the current configuration of the connection based on the values included in the specified object.
This lets you change the ICE servers used by the connection and which transport policies to use.

The most common use case for this method (and even then, probably not a very common use case) is to replace the set of ICE servers to be used. Two potential scenarios in which this might be done:

- The `RTCPeerConnection` was instantiated without specifying any ICE servers.
  If, for example, the `RTCPeerConnection()` constructor was called with no parameters, you would have to then call `setConfiguration()` to add ICE servers before ICE negotiation could begin.
- Renegotiation of the connection is needed, and a different set of ICE servers needs to be used for some reason.
  Perhaps the user has moved into a new region, so using new regional ICE servers is necessary, for example.
  In this situation, one might call `setConfiguration()` to switch to new regional ICE servers, then initiate an ICE restart.

> **Note:**
> You cannot change the identity information for a connection once it's already been set.

## Syntax

```js
setConfiguration(configuration)
```

### Parameters

- `configuration`
    An object which provides the options to be set.
    The changes are not additive; instead, the new values completely replace the existing ones.
    See `RTCPeerConnection()` for more information on what options are allowed.

### Return value

None (`undefined`).

### Exceptions

- `InvalidAccessError` `DOMException`
    Thrown if one or more of the URLs specified in `configuration.iceServers` is a TURN server, but complete login information is not provided (that is, either the `username` or `credential` is missing, or if `credentialType` is `"<example-value>"` and `credential` is not a string).
    This prevents successful login to the server.
- `InvalidModificationError` `DOMException`
    Thrown if the `configuration` includes changed identity information, but the connection already has identity information specified.
    This happens if `configuration.alwaysNegotiateDataChannels`, `configuration.peerIdentity`, or `configuration.certificates` are set and their values differ from the current configuration.
    This may also be thrown if there are changes to `configuration.bundlePolicy` or `configuration.rtcpMuxPolicy`, or to `configuration.iceCandidatePoolSize` when `RTCPeerConnection.setLocalDescription()` has already been called.
- `InvalidStateError` `DOMException`
    Thrown if the `RTCPeerConnection` is closed.
- `SyntaxError` `DOMException`
    Thrown if the `configuration.iceServers` contains no URLs or if one of the values in the list is invalid.
- `NotSupportedError` `DOMException`
    Thrown if `configuration.iceServers` contains a URL with a scheme that is not supported.

## Example

In this example, it has already been determined that ICE restart is needed, and that negotiation needs to be done using a different ICE server.

```js
const restartConfig = {
  iceServers: [
    {
      urls: "turn:asia.turn-server.net",
      username: "user@example.com",
      credential: "<example-value>",
    },
  ],
};

myPeerConnection.setConfiguration(restartConfig);

myPeerConnection.restartIce();

myPeerConnection
  .createOffer() // restartIce() causes iceRestart to be set true
  .then((offer) => myPeerConnection.setLocalDescription(offer))
  .then(() => {
    // send the offer to the other peer using the signaling server
  })
  .catch(window.reportError);
```

First, a new object is created, `restartConfig`, specifying the new ICE server and its credentials.
This is then passed into `setConfiguration()`.
ICE negotiation is restarted by calling `restartIce()`, which causes the next offer created to include the new ICE server information.
From there, we handle the process as usual, by setting the local description to the returned offer and then sending that offer to the other peer.

## See also

- `RTCPeerConnection.getConfiguration()`
- `RTCPeerConnection()`
- `RTCPeerConnection`
