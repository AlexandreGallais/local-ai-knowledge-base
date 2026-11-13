---
title: "RTCDataChannel: open event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannel/open_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannel: open event

The WebRTC **`open`** event is sent to an `RTCDataChannel` object's `onopen` event handler when the underlying transport used to send and receive the data channel's messages is opened or reopened.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("open", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onopen = (event) => { }
```

## Event type

An `RTCDataChannelEvent`. Inherits from `Event`.

## Examples

This example adds to the `RTCDataChannel` `dc` a handler for the `open` event that adjusts the user interface to indicate that a chat window is ready to be used after a connection has been established. It enables the message input box and send button as well as enabling the disconnect button and disabling the connect button. Finally, the message input box is focused so the user can immediately begin to type.

```js
dc.addEventListener("open", (ev) => {
  messageInputBox.disabled = false;
  sendMessageButton.disabled = false;
  disconnectButton.disabled = false;
  connectButton.disabled = true;

  messageInputBox.focus();
});
```

This can also be done by directly setting the value of the channel's `onopen` event handler property (but note that this replaces other event listeners added using `onopen`, if any).

```js
dc.onopen = (ev) => {
  messageInputBox.disabled = false;
  sendMessageButton.disabled = false;
  disconnectButton.disabled = false;
  connectButton.disabled = true;

  messageInputBox.focus();
};
```

## See also

- WebRTC API
- A simple RTCDataChannel example
- Related events: `message`, `close`, and `error`
