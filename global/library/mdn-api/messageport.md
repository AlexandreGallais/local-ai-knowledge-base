---
title: "MessagePort"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/messageport/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MessagePort

The **`MessagePort`** interface of the Channel Messaging API represents one of the two ports of a `MessageChannel`, allowing messages to be sent from one port and listening out for them arriving at the other.

`MessagePort` is a transferable object.

## Instance methods

_Inherits methods from its parent, `EventTarget`_.

- `postMessage()`
    Sends a message from the port, and optionally, transfers ownership of objects to other browsing contexts.
- `start()`
    Starts the sending of messages queued on the port (only needed when using `EventTarget.addEventListener`; it is implied when using `onmessage`).
- `close()`
    Disconnects the port, so it is no longer active.

## Events

_Inherits events from its parent, `EventTarget`_.

- `message`
    Fired when a `MessagePort` object receives a message.
- `messageerror`
    Fired when a `MessagePort` object receives a message that can't be deserialized.

## Example

In the following example, you can see a new channel being created using the `MessageChannel()` constructor.

When the IFrame has loaded, we register an `onmessage` handler for `MessageChannel.port1` and transfer `MessageChannel.port2` to the IFrame using the `window.postMessage` method along with a message.

When a message is received back from the IFrame, the `onMessage` function outputs the message to a paragraph.

```js
const channel = new MessageChannel();
const output = document.querySelector(".output");
const iframe = document.querySelector("iframe");

// Wait for the iframe to load
iframe.addEventListener("load", onLoad);

function onLoad() {
  // Listen for messages on port1
  channel.port1.onmessage = onMessage;

  // Transfer port2 to the iframe
  iframe.contentWindow.postMessage("Hello from the main page!", "*", [
    channel.port2,
  ]);
}

// Handle messages received on port1
function onMessage(e) {
  output.innerHTML = e.data;
}
```

For a full working example, see our channel messaging basic demo on GitHub (run it live too).

## See also

- Using channel messaging
