---
title: "RTCSctpTransport"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcsctptransport/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCSctpTransport

The **`RTCSctpTransport`** interface provides information which describes a Stream Control Transmission Protocol (**SCTP**) transport. This provides information about limitations of the transport, but also provides a way to access the underlying Datagram Transport Layer Security (**DTLS**) transport over which SCTP packets for all of an `RTCPeerConnection`'s data channels are sent and received.

You don't create `RTCSctpTransport` objects yourself; instead, you get access to the `RTCSctpTransport` for a given `RTCPeerConnection` through its **`sctp`** property.

Possibly the most useful property on this interface is its `maxMessageSize` property, which you can use to determine the upper limit on the size of messages you can send over a data channel on the peer connection.

## Instance properties

_Also inherits properties from: `EventTarget`_.

- `RTCSctpTransport.maxChannels` (read-only)
    An integer value indicating the maximum number of `RTCDataChannel` objects that can be opened simultaneously.
- `RTCSctpTransport.maxMessageSize` (read-only)
    An integer value indicating the maximum size, in bytes, of a message which can be sent using the `RTCDataChannel.send()` method.
- `RTCSctpTransport.state` (read-only)
    A string enumerated value indicating the state of the SCTP transport.
- `RTCSctpTransport.transport` (read-only)
    An `RTCDtlsTransport` object representing the DTLS transport used for the transmission and receipt of data packets.

## Instance methods

_This interface has no methods, but inherits methods from: `EventTarget`._

## Events

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface.

- `statechange`
    Sent when the `RTCSctpTransport.state` changes.

## Example

TBD

## See also

- WebRTC
- `RTCPeerConnection`
- `RTCPeerConnection.sctp`
