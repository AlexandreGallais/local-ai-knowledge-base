---
title: "RTCDataChannel: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannel/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannel: label property

The read-only `RTCDataChannel` property **`label`**
returns a string containing a name describing the data channel. These
labels are not required to be unique.

You may use the label as you wish; you could use it to identify all the channels that
are being used for the same purpose, by giving them all the same name. Or you could give
each channel a unique label for tracking purposes. It's entirely up to the design
decisions made when building your site or app.

A unique ID can be found in the `id` property.

> **Note:**
> A data channel's label is set when the channel is created by calling
> `RTCPeerConnection.createDataChannel()`. It cannot be changed after that.

## Value

A string identifier assigned by the website or app when the data channel was created,
as specified when `RTCPeerConnection.createDataChannel()` was called to
create the channel.

## Example

This sample creates a data channel on an `RTCPeerConnection`, then, some
time later, sets the content of a UI element to display the channel's name.

```js
const pc = new RTCPeerConnection();
const dc = pc.createDataChannel("my channel");

// …

document.getElementById("channel-name").appendChild(
  Object.assign(document.createElement("span"), {
    className: "channelName",
    textContent: dc.label,
  }),
);
```

## See also

- WebRTC
- `RTCDataChannel`
- `RTCDataChannel.id`
- `RTCPeerConnection.createDataChannel()`
