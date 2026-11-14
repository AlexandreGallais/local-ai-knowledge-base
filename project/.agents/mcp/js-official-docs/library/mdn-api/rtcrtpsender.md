---
title: "RTCRtpSender"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcrtpsender/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRtpSender

The **`RTCRtpSender`** interface provides the ability to control and obtain details about how a particular `MediaStreamTrack` is encoded and sent to a remote peer.

With it, you can configure the encoding used for the corresponding track, get information about the device's media capabilities, and so forth. You can also obtain access to an `RTCDTMFSender` which can be used to send DTMF codes (to simulate the user pressing buttons on a telephone's dial pad) to the remote peer.

## Instance properties

- `RTCRtpSender.dtmf` (read-only)
    An `RTCDTMFSender` which can be used to send DTMF tones using `telephone-event` payloads on the RTP session represented by the `RTCRtpSender` object. If `null`, the track and/or the connection doesn't support DTMF. Only audio tracks can support DTMF.
- `RTCRtpSender.track` (read-only)
    The `MediaStreamTrack` which is being handled by the `RTCRtpSender`. If `track` is `null`, the `RTCRtpSender` doesn't transmit anything.
- `RTCRtpSender.transport` (read-only)
    The `RTCDtlsTransport` over which the sender is exchanging the RTP and RTCP packets used to manage transmission of media and control data. This value is `null` until the transport is established. When bundling is in use, more than transceiver may be sharing the same transport object.
- `RTCRtpSender.transform`
    An `RTCRtpScriptTransform` is used to insert a transform stream (`TransformStream`) running in a worker thread into the sender pipeline, allowing stream transforms to be applied to encoded video and audio frames after they are output by a codec, and before they are sent.

### Obsolete properties

- `rtcpTransport` (read-only) (deprecated) (non-standard)
    This property has been removed; the RTP and RTCP transports have been combined into a single transport. Use the `transport` property instead.

## Static methods

- `RTCRtpSender.getCapabilities()`
    Returns an object describing the system's capabilities for sending a specified kind of media data.

## Instance methods

- `RTCRtpSender.getParameters()`
    Returns an object describing the current configuration for the encoding and transmission of media on the `track`.
- `RTCRtpSender.getStats()`
    Returns a `Promise` which is fulfilled with a `RTCStatsReport` which provides statistics data for all outbound streams being sent using this `RTCRtpSender`.
- `RTCRtpSender.setParameters()`
    Applies changes to parameters which configure how the `track` is encoded and transmitted to the remote peer.
- `RTCRtpSender.setStreams()`
    Sets the `stream(s)` associated with the `track` being transmitted by this sender.
- `RTCRtpSender.replaceTrack()`
    Attempts to replace the track currently being sent by the `RTCRtpSender` with another track, without performing renegotiation. This method can be used, for example, to toggle between the front- and rear-facing cameras on a device.

## See also

- WebRTC API
- `RTCPeerConnection.addTrack()`
- `RTCPeerConnection.getSenders()`
- `RTCRtpReceiver`
