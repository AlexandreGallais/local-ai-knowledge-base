---
title: "MessagePort: message event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/messageport/message_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MessagePort: message event

The **`message`** event is fired on a `MessagePort` object when a message arrives on that channel.

This event is not cancellable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("message", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onmessage = (event) => { }
```

## Event type

A `MessageEvent`. Inherits from `Event`.

## Examples

Suppose a script creates a `MessageChannel` and sends one of the ports to a different browsing context, such as another ``, using code like this:

```js
const channel = new MessageChannel();
const myPort = channel.port1;
const targetFrame = window.top.frames[1];
const targetOrigin = "https://example.org";

const messageControl = document.querySelector("#message");
const channelMessageButton = document.querySelector("#channel-message");

channelMessageButton.addEventListener("click", () => {
  myPort.postMessage(messageControl.value);
});

targetFrame.postMessage("init", targetOrigin, [channel.port2]);
```

The target can receive the port and start listening for messages and message errors on it using code like this:

```js
window.addEventListener("message", (event) => {
  const myPort = event.ports[0];

  myPort.addEventListener("message", (event) => {
    received.textContent = event.data;
  });

  myPort.addEventListener("messageerror", (event) => {
    console.error(event.data);
  });

  myPort.start();
});
```

Note that the listener must call `MessagePort.start()` before any messages will be delivered to this port. This is only needed when using the `addEventListener()` method: if the receiver uses `onmessage` instead, `start()` is called implicitly. The following example uses `onmessage` and `onmessageerror` (but note that this replaces other event listeners added using `onmessage` and `onmessageerror`, if any):

```js
window.addEventListener("message", (event) => {
  const myPort = event.ports[0];

  myPort.onmessage = (event) => {
    received.textContent = event.data;
  };

  myPort.onmessageerror = (event) => {
    console.error(event.data);
  };
});
```

## See also

- Related events: `messageerror`.
- Using channel messaging
