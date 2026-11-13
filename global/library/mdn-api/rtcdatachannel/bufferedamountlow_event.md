---
title: "RTCDataChannel: bufferedamountlow event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannel/bufferedamountlow_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannel: bufferedamountlow event

A **`bufferedamountlow`** event is sent to an `RTCDataChannel` when the number of bytes currently in the outbound data transfer buffer (`bufferedAmount`) falls from above to below or equal the threshold specified in `bufferedAmountLowThreshold`.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("bufferedamountlow", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onbufferedamountlow = (event) => { }
```

## Event type

A generic `Event`.

## Examples

This example sets up a handler for `bufferedamountlow` to request more data any time the data channel's buffer falls below the number of bytes specified by `bufferedAmountLowThreshold`, which we have set to 65536. In other words, we'll try to keep at least 64kB of data in the buffer, reading 64kB at a time from the source.

```js
let pc = new RTCPeerConnection();
let dc = pc.createDataChannel("SendFile");
// Replace with your own source object, such as a file handle
let source = null;
dc.bufferedAmountLowThreshold = 65536;

dc.addEventListener("bufferedamountlow", (ev) => {
  if (source.position < source.length) {
    dc.send(source.readFile(65536));
  }
});
```

After creating the `RTCPeerConnection`, this calls `RTCPeerConnection.createDataChannel()` to create the data channel. Then a listener is created for `bufferedamountlow` to refill the outgoing data buffer any time its contents fall below 65536 bytes.

You can also set up a listener for `bufferedamountlow` using its event handler property, `onbufferedamountlow` (but note that this replaces other event listeners added using `onbufferedamountlow`, if any):

```js
dc.onbufferedamountlow = (ev) => {
  if (source.position < source.length) {
    dc.send(source.readFile(65536));
  }
};
```

## See also

- WebRTC API
- `RTCDataChannel`
- `RTCDataChannel.bufferedAmountLowThreshold`
