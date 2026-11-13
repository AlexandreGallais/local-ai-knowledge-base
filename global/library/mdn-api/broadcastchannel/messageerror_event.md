---
title: "BroadcastChannel: messageerror event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/broadcastchannel/messageerror_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BroadcastChannel: messageerror event

The **`messageerror`** event of the `BroadcastChannel` interface fires when a message that can't be deserialized arrives on the channel.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("messageerror", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onmessageerror = (event) => { }
```

## Event type

A `MessageEvent`. Inherits from `Event`.

## Examples

### Listening for messageerror events

This code uses `addEventListener()` to listen for messages and errors:

```js
const channel = new BroadcastChannel("example-channel");

channel.addEventListener("message", (event) => {
  received.textContent = event.data;
});

channel.addEventListener("messageerror", (event) => {
  console.error(event);
});
```

The same, but using the `onmessage` and `onmessageerror` event handler properties (but note that this replaces other event listeners added using `onmessage` and `onmessageerror`, if any):

```js
const channel = new BroadcastChannel("example-channel");

channel.onmessage = (event) => {
  received.textContent = event.data;
};

channel.onmessageerror = (event) => {
  console.log(event);
};
```

### Attempting to share memory

A common cause of `messageerror` events is attempting to send a `SharedArrayBuffer` object, or a buffer view backed by one, across agent clusters. The following code demonstrates this.

Page A runs the following code:

```js
const channel = new BroadcastChannel("hello");
channel.postMessage({ data: new SharedArrayBuffer(1024) });
```

Page B runs the following code:

```js
const channel = new BroadcastChannel("hello");
channel.addEventListener("messageerror", (event) => {
  console.error("Message error");
});
```

Then page B will receive a `messageerror` event when it tries to deserialize the message sent from page A.

## See also

- Related events: `message`.
