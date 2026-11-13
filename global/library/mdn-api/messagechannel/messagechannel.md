---
title: "MessageChannel: MessageChannel() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/messagechannel/messagechannel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MessageChannel: MessageChannel() constructor

The **`MessageChannel()`** constructor of the `MessageChannel`
interface returns a new `MessageChannel` object with two new
`MessagePort` objects.

## Syntax

```js
new MessageChannel()
```

### Parameters

None (`undefined`).

### Return value

A new `MessageChannel` object.

## Examples

In the following code block, you can see a new channel being created using the
`MessageChannel()` constructor.
When the `` has loaded,
we pass `port2` to the `` using `MessagePort.postMessage` along with a message.
The `handleMessage` handler then responds to a message being sent back from the
`` (using `onmessage`), putting it into a paragraph.
The `port1` is listened to, to check when the message arrives.

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

For a full working example,
see our channel messaging basic demo
on GitHub (run it live too).

## See also

- Using channel messaging
