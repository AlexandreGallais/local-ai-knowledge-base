---
title: "RTCRtpReceiver"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcrtpreceiver/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRtpReceiver

The **`RTCRtpReceiver`** interface of the WebRTC API manages the reception and decoding of data for a `MediaStreamTrack` on an `RTCPeerConnection`.

## Instance properties

- `RTCRtpReceiver.jitterBufferTarget`
    A `DOMHighResTimeStamp` that indicates an application's preferred hold time for media in the jitter buffer, allowing it influence the tradeoff between playout delay and the risk of running out of audio or video frames due to network jitter.
- `RTCRtpReceiver.track` (read-only)
    Returns the `MediaStreamTrack` associated with the current `RTCRtpReceiver` instance.
- `RTCRtpReceiver.transport` (read-only)
    Returns the `RTCDtlsTransport` instance over which the media for the receiver's track is received.
- `RTCRtpReceiver.transform`
    An `RTCRtpScriptTransform` is used to insert a transform stream (`TransformStream`) running in a worker thread into the receiver pipeline, allowing stream transforms to be applied to incoming encoded video and audio frames.

### Obsolete properties

- `rtcpTransport` (read-only) (deprecated) (non-standard)
    This property has been removed; the RTP and RTCP transports have been combined into a single transport. Use the `transport` property instead.

## Static methods

- `RTCRtpReceiver.getCapabilities()`
    Returns the most optimistic view of the capabilities of the system for receiving media of the given kind.

## Instance methods

- `RTCRtpReceiver.getContributingSources()`
    Returns an array that contains an object for each unique CSRC (contributing source) identifier received by the current `RTCRtpReceiver` in the last ten seconds.
- `RTCRtpReceiver.getParameters()`
    Returns an object that contains information about how the RTC data is to be decoded.
- `RTCRtpReceiver.getStats()`
    Returns a `Promise` whose fulfillment handler receives a `RTCStatsReport` which contains statistics about the incoming streams and their dependencies.
- `RTCRtpReceiver.getSynchronizationSources()`
    Returns an array that contains an object for each unique SSRC (synchronization source) identifier received by the current `RTCRtpReceiver` in the last ten seconds.

## See also

- WebRTC
- `RTCStatsReport`
- `RTCRtpSender`
- `RTCPeerConnection.getStats()`
