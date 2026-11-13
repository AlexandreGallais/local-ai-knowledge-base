---
title: "MessageChannel: port1 property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/messagechannel/port1/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MessageChannel: port1 property

The **`port1`** read-only property of the
`MessageChannel` interface returns the first port of the message channel —
the port attached to the context that originated the channel.

## Value

A `MessagePort` object, the first port of the channel, that is the port
attached to the context that originated the channel.

## Examples

In the following code block, you can see a new channel being created using the
`MessageChannel()` constructor. When the
`` has loaded, we pass `port2` to the
`` using `MessagePort.postMessage` along with a
message. The `handleMessage` handler then responds to a message being sent
back from the `` (using `onmessage`),
putting it into a paragraph. The `handleMessage` method is associated to the
`port1` to listen when the message arrives.

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

## See also

- Using channel messaging
