---
title: "RTCDTMFSender"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdtmfsender/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDTMFSender

The **`RTCDTMFSender`** interface provides a mechanism for transmitting DTMF codes on a WebRTC `RTCPeerConnection`. You gain access to the connection's `RTCDTMFSender` through the `RTCRtpSender.dtmf` property on the audio track you wish to send DTMF with.

The primary purpose for WebRTC's DTMF support is to allow WebRTC-based communication clients to be connected to a public-switched telephone network (PSTN) or other legacy telephone service, including extant voice over IP (VoIP) services. For that reason, DTMF can't be used between two WebRTC-based devices, because there is no mechanism provided by WebRTC for receiving DTMF codes.

## Instance properties

- `RTCDTMFSender.canInsertDTMF` (read-only)
    A boolean value which is `true` if the `RTCDTMFSender` is capable of sending DTMF tones, or `false` if it is not.

- `RTCDTMFSender.toneBuffer` (read-only)
    A string which contains the list of DTMF tones currently in the queue to be transmitted (tones which have already been played are no longer included in the string). See `toneBuffer` for details on the format of the tone buffer.

## Instance methods

- `RTCDTMFSender.insertDTMF()`
    Given a string describing a set of DTMF codes and, optionally, the duration of and inter-tone gap between the tones, `insertDTMF()` starts sending the specified tones. Calling `insertDTMF()` replaces any already-pending tones from the `toneBuffer`. You can abort sending queued tones by specifying an empty string (`""`) as the set of tones to play.

## Events

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface.

- `tonechange`
    The `tonechange` event is sent to the `RTCDTMFSender` instance's event handler to indicate that a tone has either started or stopped playing.

## Example

See the article Using DTMF with WebRTC for a full example.

## See also

- WebRTC API
- Using DTMF with WebRTC
- `RTCRtpSender.dtmf`
- `RTCPeerConnection`
- `RTCRtpSender`
