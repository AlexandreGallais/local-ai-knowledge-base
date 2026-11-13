---
title: "SerialPort: disconnect event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serialport/disconnect_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SerialPort: disconnect event

The **`disconnect`** event of the `SerialPort` interface is fired when the port disconnects from the device.

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

A generic `Event`.

## Description

The `disconnect` event fires when a port that was previously logically connected to the device is no longer connected.

### Bubbling

This event bubbles up to the `Serial` instance that returned this interface.
The `event.target` property refers to the `SerialPort` object that bubbles up.

For more information, see Event bubbling.

## Examples

### Notify when a specific port disconnects

Here the event listener is installed on a specific `SerialPort` object.

```js
port.addEventListener("disconnect", (event) => {
  // notify that the port has become unavailable
});
```

### Listening for any ports that become unavailable

The `disconnect` event bubbles up to the `Serial` object where you can listen for any ports that become unavailable.

```js
navigator.serial.addEventListener("disconnect", (event) => {
  // notify that a port has become unavailable
  // use `event.target` to refer to the unavailable port
});
```

## See also

- `connect` event
