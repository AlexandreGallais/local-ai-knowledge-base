---
title: "USB: connect event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usb/connect_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USB: connect event

The **`connect`** event of the `USB` interface is fired whenever a paired device is connected.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("connect", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onconnect = (event) => { }
```

## Event type

A `USBConnectionEvent`. Inherits from `Event`.

## Examples

Once a USB device is connected, you might want to update the UI.

```js
navigator.usb.addEventListener("connect", (event) => {
  // Add event.device to the UI.
});
```

Alternatively, you can use the `USB.onconnect` event handler property to establish a handler for the `connect` event (but note that this replaces other event listeners added using `onconnect`, if any):

```js
navigator.usb.onconnect = (event) => {
  // Add event.device to the UI.
};
```
