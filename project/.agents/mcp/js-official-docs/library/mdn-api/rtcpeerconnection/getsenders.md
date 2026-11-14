---
title: "RTCPeerConnection: getSenders() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/getsenders/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: getSenders() method

The **`getSenders()`** method of the `RTCPeerConnection` interface returns an array of `RTCRtpSender` objects, each of which represents the RTP sender responsible for transmitting one track's data.
A sender object provides methods and properties for examining and controlling the encoding and transmission of the track's data.

## Syntax

```js
getSenders()
```

### Parameters

None.

### Return value

An array of `RTCRtpSender` objects, one for each track on the connection.
The array is empty if there are no RTP senders on the connection.

The order of the returned `RTCRtpSender` instances is not defined by the specification, and may change from one call to `getSenders()` to the next.

The array does not include senders associated with transceivers that have been stopped (following offer/answer).

## Example

In this example, a `setMuting()` function is shown.
This function takes as input an `RTCPeerConnection`, `pc`, and a Boolean, `muting`.
The function gets the list of the peer connection's senders and iterates over every sender, setting the corresponding media track's `enabled` to the inverse of the specified `muting`.

```js
function setMuting(pc, muting) {
  let senderList = pc.getSenders();

  senderList.forEach((sender) => {
    sender.track.enabled = !muting;
  });
}
```

## See also

- WebRTC
- `RTCRtpSender`
