---
title: "RTCDtlsTransport"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdtlstransport/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDtlsTransport

The **`RTCDtlsTransport`** interface provides access to information about the Datagram Transport Layer Security (**DTLS**) transport over which a `RTCPeerConnection`'s RTP and RTCP packets are sent and received by its `RTCRtpSender` and `RTCRtpReceiver` objects.

A `RTCDtlsTransport` object is also used to provide information about SCTP packets transmitted and received by a connection's data channels.

Features of the DTLS transport include the addition of security to the underlying transport; the `RTCDtlsTransport` interface can be used to obtain information about the underlying transport and the security added to it by the DTLS layer.

## Instance properties

_Also inherits properties from `EventTarget`._

- `iceTransport` (read-only)
    Returns a reference to the underlying `RTCIceTransport` object.
- `state` (read-only)
    Returns a string
    which describes the underlying Datagram Transport Layer Security (**DTLS**) transport state.
    It can be one of the following values:
    `new`, `connecting`, `connected`, `closed`, or `failed`.

## Instance methods

_Also inherits methods from `EventTarget`._

- `getRemoteCertificates()`
    Returns an array of `ArrayBuffer` objects representing the remote peer's certificate chain.

## Events

- `error`
    Sent when a transport-level error occurs on the `RTCPeerConnection`.

- `statechange`
    Sent when the `state` of the DTLS transport changes.

## Description

### Allocation of DTLS transports

`RTCDtlsTransport` objects are created when an app calls either `setLocalDescription()` or `setRemoteDescription()`. The number of DTLS transports created and how they're used depends on the bundling mode used when creating the `RTCPeerConnection`.

Bundling lets you use one `RTCDtlsTransport` to carry the data for multiple higher-level transports, such as multiple `RTCRtpTransceiver`s.
Whether bundling is used depends on what the other endpoint is able to negotiate. All browsers support bundling, so when both endpoints are browsers, you can rest assured that bundling will be used.

Some non-browser legacy endpoints, however, may not support bundle. To be able to negotiate with such endpoints (or to exclude them entirely), the `bundlePolicy` property may be provided when creating the connection. The `bundlePolicy` lets you control how to negotiate with these legacy endpoints. The default policy is `"balanced"`, which provides a balance between performance and compatibility.

For example, to create the connection using the highest level of bundling:

```js
const rtcConfig = {
  bundlePolicy: "max-bundle",
};

const pc = new RTCPeerConnection(rtcConfig);
```

#### When not using BUNDLE

When the connection is created without using BUNDLE, each RTP or RTCP component of each `RTCRtpTransceiver` has its own `RTCDtlsTransport`; that is, every `RTCRtpSender` and `RTCRtpReceiver`, has its own transport, and all `RTCDataChannel` objects share a transport dedicated to SCTP.

#### When using BUNDLE

When the connection is using BUNDLE, each `RTCDtlsTransport` object represents a group of `RTCRtpTransceiver` objects. If the connection was created using `max-compat` mode, each transport is responsible for handling all communication for a given type of media (audio, video, or data channel). Thus, a connection with any number of audio and video channels will always have exactly one DTLS transport for audio and one for video communications.

Because transports are established early in the negotiation process, it's likely that it won't be known until after they're created whether or not the remote peer supports bundling. For this reason, you'll sometimes see separate transports created at first, one for each track, then see them get bundled up once it's known that bundling is possible. If your code accesses `RTCRtpSender`s and/or `RTCRtpReceiver`s directly, you may encounter situations where they're initially separate, then half or more of them get closed and the senders and receivers updated to refer to the appropriate remaining `RTCDtlsTransport` objects.

### Data channels

`RTCDataChannel`s use SCTP to communicate. All of a peer connection's data channels share a single `RTCSctpTransport`, found in the connection's `sctp` property.

You can, in turn, identify the `RTCDtlsTransport` used to securely encapsulate the data channels' SCTP communications by looking at the `RTCSctpTransport` object's `transport` property.

## Examples

This example presents a function, `tallySenders()`, which iterates over an `RTCPeerConnection`'s `RTCRtpSender`s, tallying up how many of them are in various states. The function returns an object containing properties whose values indicate how many senders are in each state.

```js
let pc = new RTCPeerConnection({ bundlePolicy: "max-bundle" });

// …

function tallySenders(pc) {
  let results = {
    transportMissing: 0,
    connectionPending: 0,
    connected: 0,
    closed: 0,
    failed: 0,
    unknown: 0,
  };

  let senderList = pc.getSenders();
  senderList.forEach((sender) => {
    let transport = sender.transport;

    if (!transport) {
      results.transportMissing++;
    } else {
      switch (transport.state) {
        case "new":
        case "connecting":
          results.connectionPending++;
          break;
        case "connected":
          results.connected++;
          break;
        case "closed":
          results.closed++;
          break;
        case "failed":
          results.failed++;
          break;
        default:
          results.unknown++;
          break;
      }
    }
  });
  return results;
}
```

Note that in this code, the `new` and `connecting` states are being treated as a single `connectionPending` status in the returned object.

## See also

- `RTCRtpSender.transport` and `RTCRtpReceiver.transport`
- `RTCSctpTransport.transport`
