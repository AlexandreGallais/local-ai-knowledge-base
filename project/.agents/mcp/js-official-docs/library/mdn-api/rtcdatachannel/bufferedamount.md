---
title: "RTCDataChannel: bufferedAmount property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannel/bufferedamount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannel: bufferedAmount property

The read-only `RTCDataChannel` property
**`bufferedAmount`** returns the number of bytes of data
currently queued to be sent over the data channel. The queue may build up as a
result of calls to the `send()` method. This only
includes data buffered by the user agent itself; it doesn't include any framing overhead
or buffering done by the operating system or network hardware.

The user agent may implement the process of actually sending data in any way it
chooses; this may be done periodically during the event loop or truly asynchronously. As
messages are actually sent, this value is reduced accordingly.

> **Note:**
> Closing the data channel doesn't reset this count, even though the user agent purges
> the queued messages. However, even after closing the channel, attempts to send
> messages continue to add to the `bufferedAmount` value, even though the
> messages are neither sent nor buffered.

Whenever this value decreases to fall to or below the value specified in the
`bufferedAmountLowThreshold`
property, the user agent fires the `bufferedamountlow` event. This event may
be used, for example, to implement code which queues more messages to be sent whenever
there's room to buffer them.

## Value

The number of bytes of data currently queued to be sent over the data channel but have
not yet been sent.

## Example

The snippet below includes a function which changes the contents of a block with the ID
"bufferSize" to a string indicating the number of bytes currently buffered on an
`RTCDataChannel`.

```js
const dc = peerConnection.createDataChannel("File Transfer");

// …

function showBufferedAmount(channel) {
  const el = document.getElementById("bufferSize");

  el.innerText = `${channel.bufferedAmount} bytes`;
}
```

## See also

- WebRTC
- Using WebRTC data channels
- `RTCDataChannel`
- `RTCDataChannel.bufferedAmountLowThreshold`
- `bufferedamountlow` event
