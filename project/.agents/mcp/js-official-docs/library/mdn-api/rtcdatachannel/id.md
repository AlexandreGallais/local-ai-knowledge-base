---
title: "RTCDataChannel: id property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannel/id/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannel: id property

The read-only `RTCDataChannel` property
**`id`** returns an ID number (between 0 and 65,534) which
uniquely identifies the `RTCDataChannel`. This ID is set at the
time the data channel is created, either by the user agent (if
`RTCDataChannel.negotiated` is `false`) or by the site or app
script (if `negotiated` is `true`).

Each `RTCPeerConnection` can therefore have up to a theoretical maximum of
65,534 data channels on it, although the actual maximum may vary from browser to
browser.

## Value

An `unsigned short` value (that is, an integer between 0 and 65,535) which
uniquely identifies the data channel.

While the `label` property doesn't have to be
unique, this ID number is guaranteed to be unique among all data channels. Additionally,
known implementations of WebRTC use the same ID on both peers. A unique ID makes it
easier for your code to do its own out-of-band data channel-related signaling.

This can be also useful for logging and debugging purposes.

## Example

```js
const pc = new RTCPeerConnection();
const dc = pc.createDataChannel("my channel");

console.log(`Channel id: ${dc.id}`);
```

## See also

- WebRTC
- `RTCDataChannel`
- `RTCPeerConnection.createDataChannel()`
