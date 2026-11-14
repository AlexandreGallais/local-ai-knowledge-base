---
title: "RTCDataChannel: protocol property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannel/protocol/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannel: protocol property

The read-only `RTCDataChannel` property
**`protocol`** returns a string containing the
name of the subprotocol in use. If no protocol was specified when the data channel was
created, then this property's value is the empty string (`""`).

> **Note:**
> The permitted values of this property are defined by the website or app using the
> data channel.

The ability for each channel to have a defined subprotocol lets your app, for example,
use JSON objects as messages on one channel while another channel is plaintext and
another is raw binary or even some other format.

## Value

A string identifying the app-defined subprotocol being used for exchanging data on the
channel. If none has been established, this is an empty string ("").

## Example

```js
const pc = new RTCPeerConnection();
const dc = pc.createDataChannel("my channel", {
  protocol: "json",
});

function handleChannelMessage(dataChannel, msg) {
  switch (dataChannel.protocol) {
    case "json":
      /* process JSON data */
      break;
    case "raw":
      /* process raw binary data */
      break;
  }
}
```

## See also

- WebRTC
- `RTCDataChannel`
- `RTCPeerConnection.createDataChannel()`
