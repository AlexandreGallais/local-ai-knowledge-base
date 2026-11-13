---
title: "USB: disconnect event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usb/disconnect_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USB: disconnect event

The **`disconnect`** event of the `USB` interface is fired whenever a paired device is disconnected.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("disconnect", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ondisconnect = (event) => { }
```

## Event type

A `USBConnectionEvent`. Inherits from `Event`.

## Examples

Once a USB device is disconnected, you might want to update the UI.

```js
navigator.usb.addEventListener("disconnect", (event) => {
  // Remove event.device from the UI.
});
```

Alternatively, you can use the `USB.ondisconnect` event handler property to establish a handler for the `disconnect` event (but note that this replaces other event listeners added using `ondisconnect`, if any):

```js
navigator.usb.ondisconnect = (event) => {
  // Remove event.device from the UI.
};
```
