---
title: "RTCDataChannel: closing event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannel/closing_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannel: closing event

The **`closing`** event is sent to an `RTCDataChannel` just before the channel begins the process of shutting down its underlying data transport.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("closing", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onclosing = (event) => { }
```

## Event type

A generic `Event`.

## Description

While the `closing` event is sent to the channel just before beginning to close the channel's data transport, the `close` event is sent once the closing process is complete.

## Examples

This example updates a connection status interface when the `closing` event arrives.

First, an example using `addEventListener()`:

```js
dataChannel.addEventListener("closing", (ev) => {
  myConnectionStatus.icon = closingIcon;
  myConnectionStatus.text = "Connection closing";
});
```

You can also set the `onclosing` event handler property directly (but note that this replaces other event listeners added using `onclosing`, if any):

```js
dataChannel.onclosing = (ev) => {
  myConnectionStatus.icon = closingIcon;
  myConnectionStatus.text = "Connection closing";
};
```

## See also

- WebRTC API
- Signaling and video calling
