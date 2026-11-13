---
title: "RTCRtpTransceiver: stop() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcrtptransceiver/stop/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRtpTransceiver: stop() method

The **`stop()`** method in the `RTCRtpTransceiver` interface permanently stops the transceiver by stopping both the associated `RTCRtpSender` and
`RTCRtpReceiver`.

## Syntax

```js
stop()
```

### Parameters

None.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the `RTCPeerConnection`, of which the transceiver is a member, is closed.

## Description

When you call `stop()` on a transceiver, the sender immediately stops sending media and each of its RTP streams are closed using the RTCP `"BYE"` message.
The receiver then stops receiving media; the receiver's `track` is stopped, and the transceiver's `direction` is changed to `stopped`.
Renegotiation is triggered by sending a `negotiationneeded` event to the transceiver's `RTCPeerConnection`, so that the connection can adapt to the change.

The method does nothing if the transceiver is already stopped.
You can check whether it has stopped by comparing `currentDirection` to `"stopped"`.

> **Note:**
> Earlier versions of the specification used the deprecated `stopped` (deprecated) property to indicate if the transceiver has stopped.

## See also

- WebRTC API
- Introduction to the Real-time Transport Protocol (RTP)
- `MediaStreamTrack`
