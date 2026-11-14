---
title: "RTCSctpTransport: maxMessageSize property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcsctptransport/maxmessagesize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCSctpTransport: maxMessageSize property

The **`maxMessageSize`** read-only property of the `RTCSctpTransport` interface indicates the maximum size of a message that can be sent using the `RTCDataChannel.send()` method.

## Value

An integer value giving the maximum size, in bytes, of a message which can be sent using the `RTCDataChannel.send()` method.

## Examples

This example shows how you might split up a string into small enough parts to send based on maximum message size.

```js
// Function splits strings to a specified size and returns array.
function splitStringToMax(str, maxLength) {
  const result = [];
  let i = 0;
  while (i < str.length) {
    result.push(str.substring(i, i + maxLength));
    i += maxLength;
  }
  return result;
}

const peerConnection = new RTCPeerConnection(options);
const channel = peerConnection.createDataChannel("chat");
channel.onopen = (event) => {
  const maximumMessageSize = peerConnection.sctp.maxMessageSize;
  const textToSend = "This is my possibly overly long string!";
  splitStringToMax(textToSend, maximumMessageSize).forEach((elem) => {
    channel.send(elem);
  });
};
```

## See also

- `RTCSctpTransport`
- Understanding message size limits section of Using WebRTC data channels
