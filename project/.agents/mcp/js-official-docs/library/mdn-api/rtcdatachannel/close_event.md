---
title: "RTCDataChannel: close event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannel/close_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannel: close event

The **`close`** event is sent to the `onclose` event handler on an `RTCDataChannel` instance when the data transport for the data channel has closed. Before any further data can be transferred using `RTCDataChannel`, a new 'RTCDataChannel' instance must be created.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("close", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onclose = (event) => { }
```

## Event type

A generic `Event`.

## Examples

This example sets up a handler for the `close` event for the `RTCDataChannel` named `dc`; its responsibility in this example is to update user interface elements to reflect that there is no longer an ongoing call, and to allow a new call to be started.

```js
dc.addEventListener("close", (ev) => {
  messageInputBox.disabled = true;
  sendButton.disabled = true;
  connectButton.disabled = false;
  disconnectButton.disabled = true;
});
```

All this code does in response to receiving the `close` event is to disable an input box and its "Send" button, and to enable the button used to start a call (while disabling the one that ends a call).

You can also use the `onclose` event handler property to set a handler for `close` events (but note that this replaces other event listeners added using `onclose`, if any):

```js
dc.onclose = (ev) => {
  messageInputBox.disabled = true;
  sendButton.disabled = true;
  connectButton.disabled = false;
  disconnectButton.disabled = true;
};
```

## See also

- WebRTC API
- A simple RTCDataChannel example
- Related events: `open`, `message`, and `error`
