---
title: "MessageChannel: port2 property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/messagechannel/port2/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MessageChannel: port2 property

The **`port2`** read-only property of the
`MessageChannel` interface returns the second port of the message channel —
the port attached to the context at the other end of the channel, which the message is
initially sent to.

## Value

A `MessagePort` object representing the second port of the channel, the
port attached to the context at the other end of the channel.

## Examples

In the following code block, you can see a new channel being created using the
`MessageChannel()` constructor. When the
IFrame has loaded, we pass `port2` to the IFrame using
`Window.postMessage()` along with a message. The
`handleMessage` handler then responds to a message being sent back from the
IFrame (using `onmessage`), putting it into a paragraph.
`port1` is listened to, to check when the message arrives.

```js
const channel = new MessageChannel();
const para = document.querySelector("p");

const ifr = document.querySelector("iframe");
const otherWindow = ifr.contentWindow;

ifr.addEventListener("load", iframeLoaded);

function iframeLoaded() {
  otherWindow.postMessage("Hello from the main page!", "*", [channel.port2]);
}

channel.port1.onmessage = handleMessage;
function handleMessage(e) {
  para.innerHTML = e.data;
}
```

For a full working example, see our channel messaging basic demo on GitHub (run it live too).

## See also

- Using channel messaging
