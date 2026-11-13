---
title: "RTCDTMFSender: canInsertDTMF property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdtmfsender/caninsertdtmf/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDTMFSender: canInsertDTMF property

The **`canInsertDTMF`** read-only property of the `RTCDTMFSender` interface returns a boolean value which indicates whether the `RTCDTMFSender` is capable of sending DTMF tones over the `RTCPeerConnection`.

## Value

A boolean value which is `true` if the `RTCDTMFSender` is capable of sending DTMF tones, or `false` if it is not.

## Examples

### Using canInsertDTMF to check DTMF support

This example shows how to use the `canInsertDTMF` property to check DTMF support in a WebRTC connection and then send tones if supported.

The code first checks if the `canInsertDTMF` property is defined, and if so, uses it to check whether inserting DTMF tones is supported.
If the feature is supported, `RTCDTMFSender.insertDTMF()` is called to insert a tone.

```js
if (sender.dtmf.canInsertDTMF) {
  const duration = 500;
  sender.dtmf.insertDTMF("1234", duration);
} else {
  console.log("DTMF function not available");
}
```

## See also

- WebRTC API
- Using DTMF with WebRTC
- `RTCDTMFSender.insertDTMF()`
- `RTCPeerConnection`
- `RTCDTMFSender`
- `RTCRtpSender`
