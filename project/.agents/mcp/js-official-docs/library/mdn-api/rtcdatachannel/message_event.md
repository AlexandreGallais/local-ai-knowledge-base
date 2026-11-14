---
title: "RTCDataChannel: message event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannel/message_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannel: message event

The WebRTC **`message`** event is sent to the `onmessage` event handler on an `RTCDataChannel` object when a message has been received from the remote peer.

> **Note:**
> The `message` event uses as its event object type the `MessageEvent` interface defined by the HTML specification.

This event is not cancelable and does not bubble.

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

For a given `RTCDataChannel`, `dc`, created for a peer connection using its `createDataChannel()` method, this code sets up a handler for incoming messages and acts on them by adding the data contained within the message to the current document as a new `` (paragraph) element.

```js
dc.addEventListener("message", (event) => {
  let newParagraph = document.createElement("p");
  let textNode = document.createTextNode(event.data);
  newParagraph.appendChild(textNode);

  document.body.appendChild(newParagraph);
});
```

We first create the new paragraph element and add the message data to it as a new text node. Then we append the new paragraph to the end of the document's body.

You can also use an `RTCDataChannel` object's `onmessage` event handler property to set the event handler (but note that this replaces other event listeners added using `onmessage`, if any):

```js
dc.onmessage = (event) => {
  let newParagraph = document.createElement("p");
  let textNode = document.createTextNode(event.data);
  newParagraph.appendChild(textNode);

  document.body.appendChild(newParagraph);
};
```

## See also

- WebRTC API
- A simple RTCDataChannel example
- Related events: `open`, `close`, and `error`
- `RTCDataChannel.send()`
