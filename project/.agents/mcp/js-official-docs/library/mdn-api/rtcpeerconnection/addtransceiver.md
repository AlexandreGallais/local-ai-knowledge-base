---
title: "RTCPeerConnection: addTransceiver() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/addtransceiver/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: addTransceiver() method

The **`addTransceiver()`** method of the `RTCPeerConnection` interface creates a new `RTCRtpTransceiver` and adds it to the set of transceivers associated with the `RTCPeerConnection`.
Each transceiver represents a bidirectional stream, with both an `RTCRtpSender` and an `RTCRtpReceiver` associated with it.

## Syntax

```js
addTransceiver(trackOrKind)
addTransceiver(trackOrKind, init)
```

### Parameters

- `trackOrKind`
    A `MediaStreamTrack` to associate with the transceiver, or a string which is used as the `kind` of the receiver's `track`, and by extension of the `RTCRtpReceiver` itself.
- `init` (optional)
    An object for specifying any options when creating the new transceiver.
    Possible values are:
    - `direction` (optional)
        The new transceiver's preferred directionality. This value is used to initialize the new `RTCRtpTransceiver` object's `RTCRtpTransceiver.direction` property.
    - `sendEncodings` (optional)
        An array of encodings to allow when sending RTP media from the `RTCRtpSender`.
        This is the same as the `parameter.encodings` array passed to `RTCRtpSender.setParameters()`.
    - `streams` (optional)
        A list of `MediaStream` objects to add to the transceiver's `RTCRtpReceiver`; when the remote peer's `RTCPeerConnection`'s `track` event occurs, these are the streams that will be specified by that event.

### Return value

The `RTCRtpTransceiver` object which will be used to exchange the media data.

### Exceptions

- `TypeError`
    Thrown if `trackOrKind` was not either `"audio"` or `"video"`.

    If the `sendEncodings` argument is used, this error may also be thrown if there is a badly formatted `rid` member, some but not all encodings contain a `rid` member, or different encodings have the same `rid` value.

- `RangeError`
    Thrown if any of the `sendEncodings` encodings have a `maxFramerate` value less than 0.0, or a `scaleResolutionDownBy` value of less than 1.0.

- `InvalidStateError` `DOMException`
    Thrown if the method is called when the associated connection is closed.

- `InvalidAccessError` `DOMException`
    Thrown if the `sendEncodings` argument is used, and contains a read-only parameter other than `rid`.

## See also

- WebRTC API
- Introduction to the Real-time Transport Protocol (RTP)
- `RTCPeerConnection.addTrack()` also creates transceivers
- `RTCRtpReceiver` and `RTCRtpSender`
