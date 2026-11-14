---
title: "RTCOutboundRtpStreamStats"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcoutboundrtpstreamstats/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCOutboundRtpStreamStats

The **`RTCOutboundRtpStreamStats`** dictionary of the WebRTC API is used to report metrics and statistics related to an outbound RTP stream being sent by an `RTCRtpSender`.

The statistics can be obtained by iterating the `RTCStatsReport` returned by `RTCPeerConnection.getStats()` or `RTCRtpSender.getStats()` until you find a report with the `type` of `outbound-rtp`.

## Instance properties

- `active` (experimental)
    A boolean that indicates whether this RTP stream is configured to be sent, or is disabled.
- `frameHeight`
    An integer indicating the height of the last encoded frame, in pixels.
    _Undefined for audio streams._
- `frameWidth`
    An integer indicating the width of the last encoded frame, in pixels.
    _Undefined for audio streams._
- `framesEncoded`
    The number of frames that have been successfully encoded so far for sending on this RTP stream.
    _Undefined for audio streams._
- `framesPerSecond`
    A number that represents the encoded frames sent in the last second.
    _Undefined for audio streams._
- `framesSent`
    A positive integer that represents the total number of encoded frames sent on this RTP stream.
    _Undefined for audio streams._
- `headerBytesSent`
    A positive integer that represents the total number of RTP header and padding bytes sent for this SSRC.
- `keyFramesEncoded` (experimental)
    A positive integer that represents the total number of key <example-value> successfully encoded in this RTP media stream.
    _Undefined for audio streams._
- `mediaSourceId`
    A string that represents the id of the stats object of the track currently attached to the sender of this stream.
- `mid`
    A string that uniquely identifies the pairing of source and destination of the transceiver's stream.
    This is the value of the corresponding `RTCRtpTransceiver.mid` unless that is null, in which case the statistic property is not present.
- `nackCount`
    An integer value indicating the total number of Negative ACKnowledgement (NACK) packets this `RTCRtpSender` has received from the remote `RTCRtpReceiver`.
    This locally-computed value provides an indication of the error resiliency of the connection.
- `qpSum`
    A 64-bit value containing the sum of the QP values for every frame encoded by this `RTCRtpSender`.
    This locally-computed value provides an indication of how heavily compressed the data is.
    _Undefined for audio streams._
- `qualityLimitationDurations` (experimental)
    A map of the reasons that a media stream's resolution or framerate has been reduced, and the time that the quality was reduced for each reason.
    _Undefined for audio streams._
- `qualityLimitationReason` (experimental)
    A string indicating the reason why the stream is being quality-limited.
    One of: `none`, `cpu`, `bandwidth`, or `other`.
    _Undefined for audio streams._
- `remoteId`
    A string which identifies the `RTCRemoteInboundRtpStreamStats` object that provides statistics for the remote peer for this same SSRC.
    This ID is stable across multiple calls to `getStats()`.
- `retransmittedBytesSent`
    A positive integer that represents the total number of payload bytes retransmitted for the source associated with this stream.
- `retransmittedPacketsSent`
    A positive integer that represents the total number of packets retransmitted for the source associated with this stream.
- `rid`
    A string that indicates the RTP stream ID for a corresponding video stream.
- `scalabilityMode` (experimental)
    A string that represents the scalability mode for the RTP stream, if one has been configured.
- `targetBitrate`
    A number that represents the bit rate that the `RTCRtpSender`'s codec is currently attempting to achieve for the stream.
- `totalEncodeTime`
    A number that represents the total number of seconds that have been spent encoding the frames encoded for this stream `RTCRtpSender`.
    _Undefined for audio streams._
- `totalEncodedBytesTarget` (deprecated) (non-standard)
    A cumulative sum of the _target_ frame sizes for all of the frames encoded so far.
    This will likely differ from the total of the _actual_ frame sizes.
    _Undefined for audio streams._
- `totalPacketSendDelay`
    A number that represents the total time in seconds that packets have spent buffered locally before being transmitted.

### Sent RTP stream statistics

- `bytesSent` (optional)
    A positive integer indicating the total number of bytes sent for this SSRC, including retransmissions.
- `packetsSent` (optional)
    A positive integer indicating the total number of RTP packets sent for this SSRC, including retransmissions.

### Common RTP stream statistics

- `codecId` (optional)
    A string that uniquely identifies the object that was inspected to produce the `RTCCodecStats` object associated with this RTP stream.
- `kind`
    A string indicating whether the `MediaStreamTrack` associated with the stream is an audio or a video track.
- `ssrc`
    A positive integer that identifies the SSRC of the RTP packets in this stream.
- `transportId` (optional)
    A string that uniquely identifies the object which was inspected to produce the `RTCTransportStats` object associated with this RTP stream.

### Common instance properties

The following properties are common to all WebRTC statistics objects.

- `id`
    A string that uniquely identifies the object that is being monitored to produce this set of statistics.
- `timestamp`
    A `DOMHighResTimeStamp` object indicating the time at which the sample was taken for this statistics object.
- `type`
    A string with the value `"outbound-rtp"`, indicating the type of statistics that the object contains.

## See also

- `RTCStatsReport`
