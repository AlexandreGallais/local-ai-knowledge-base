---
title: "WebTransport: getStats() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webtransport/getstats/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebTransport: getStats() method

The **`getStats()`** method of the `WebTransport` interface returns a `Promise` that fulfills with an object containing statistics for the transport's underlying connection.

These can be used to monitor the quality of the connection or to adapt how much data the application sends to the estimated available send rate.
If the transport has closed, the promise fulfills with the most recent statistics available for the connection.

## Syntax

```js
getStats()
```

### Parameters

None.

### Return value

A `Promise` that fulfills with an object containing statistics for the underlying connection.

Any statistics that are unavailable are absent from the returned object.
If the transport was created with `allowPooling` set to `true`, only the `atSendCapacity`, `estimatedSendRate`, `minRtt`, `rttVariation`, and `smoothedRtt` properties can be present.
The `datagrams` object is still present but has no properties.

The returned object may have the following properties:

- `atSendCapacity`
    A boolean indicating whether the application is sending data at the capacity of the network.
    If `true`, a non-`null` value of `estimatedSendRate` reflects the network capacity available to the application.
    If `false`, the application may be sending significantly less data than the congestion controller allows, and `estimatedSendRate` may be a poor estimate of the available network capacity.
- `bytesAcknowledged` (optional)
    A non-negative integer indicating the number of payload bytes that the server has acknowledged (using QUIC's ACK mechanism) as received on the connection.
    This count excludes any framing overhead.
    It typically trails `bytesSent` but can be permanently lower due to packet loss.
- `bytesLost` (optional)
    A non-negative integer indicating the number of bytes lost on the connection.
    This value increases as packets are declared lost and decreases if they are subsequently received.
    This count excludes UDP and any other outer framing.
- `bytesReceived` (optional)
    A non-negative integer indicating the total number of bytes received on the connection.
    This count includes duplicate data from streams but excludes UDP and any other outer framing.
- `bytesSent` (optional)
    A non-negative integer indicating the number of payload bytes sent on the connection.
    This count excludes any framing overhead and retransmissions.
- `datagrams`
    An object containing statistics for datagram transmission over the connection.
    The object may have the following properties:
    - `droppedIncoming` (optional)
        A non-negative integer indicating the number of incoming datagrams that were dropped.
        Incoming datagrams are dropped if the application does not read them before new datagrams overflow the `readable` stream receive queue.
    - `expiredIncoming` (optional)
        A non-negative integer indicating the number of incoming datagrams that were dropped because they expired before they were read from the `readable` stream.
        The maximum age of an incoming datagram is set by `incomingMaxAge`.
    - `expiredOutgoing` (optional)
        A non-negative integer indicating the number of datagrams that were dropped from the queue for sending because they expired.
        The maximum age of a datagram queued for sending is set by `outgoingMaxAge`.
    - `lostOutgoing` (optional)
        A non-negative integer indicating the number of sent datagrams that were declared lost.
        Note that a datagram may be declared lost if, for example, no acknowledgement arrived within a timeout, or an acknowledgement for a later datagram was received first.
- `estimatedSendRate`
    A non-negative integer indicating the estimated rate, in bits per second, at which the user agent will send queued data.
    The value is `null` if the user agent does not currently have an estimate.
    This rate applies to all streams and datagrams that share a `WebTransport` session.
    It is calculated by the congestion control algorithm (see `congestionControl`).
    It excludes any framing overhead and represents the rate at which an application payload might be sent.
    Note that the value may be `null` even if it was not `null` in the result of a previous `getStats()` call.
- `minRtt` (optional)
    A `DOMHighResTimeStamp` containing the minimum round-trip time observed on the entire connection.
- `packetsLost` (optional)
    A non-negative integer indicating the number of packets lost on the connection.
    This value increases as packets are declared lost and decreases if they are subsequently received.
- `packetsReceived` (optional)
    A non-negative integer indicating the total number of packets received on the connection, including packets that were not processable.
- `packetsSent` (optional)
    A non-negative integer indicating the number of packets sent on the connection, including those that are known to have been lost.
- `rttVariation` (optional)
    A `DOMHighResTimeStamp` containing the mean variation in round-trip time samples currently observed on the connection.
- `smoothedRtt` (optional)
    A `DOMHighResTimeStamp` containing the smoothed round-trip time (RTT) currently observed on the connection, calculated as an exponentially weighted moving average of an endpoint's RTT samples after taking account of acknowledgement delays.

### Exceptions

- `InvalidStateError` `DOMException`
    The returned promise is rejected with this exception if the transport's connection has already failed when the method is called, or if the connection fails before it is established.

## Examples

### Logging the bytes sent on a connection

The following example uses `await` to wait on the `Promise` returned by `getStats()`.
When the promise fulfills, the value of the `bytesSent` property in the stats object is logged to the console, if it is present.

```js
const stats = await transport.getStats();
if (stats.bytesSent !== undefined) {
  console.log(`Bytes sent: ${stats.bytesSent}`);
}
```
