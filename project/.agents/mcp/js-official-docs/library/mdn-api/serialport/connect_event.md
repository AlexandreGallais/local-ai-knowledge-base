---
title: "SerialPort: connect event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serialport/connect_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SerialPort: connect event

The **`connect`** event of the `SerialPort` interface is fired when the port connects to the device.

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

A generic `Event`.

## Description

More specifically, the `connect` event fires when the port becomes **logically connected** to the device.
This happens after a user grants permission for a site to access the port that the device is attached to, following a `Serial.requestPort()` call:

- In the case of a wired serial port, this occurs when the port is physically connected to the device, for example via USB.
- In the case of a wireless serial port (for example, Bluetooth RFCOMM), this occurs when the port makes one or more active connections to the device (for example via Bluetooth L2CAP channels).

### Bubbling

This event bubbles up to the `Serial` instance that returned this interface.
The `event.target` property refers to the `SerialPort` object that bubbles up.

For more information, see Event bubbling.

## Examples

### Notify when a specific port connects

The `Serial.requestPort()` method returns a `Promise` that resolves with a `SerialPort` chosen by the user.

```js
// Prompt user to choose a serial port
const port = await navigator.serial.requestPort();

port.addEventListener("connect", (event) => {
  // notify that the chosen port is connected
});
```

### Listening for any newly-connected ports

The `connect` event bubbles up to the `Serial` object where you can listen for any newly-connected ports.

```js
navigator.serial.addEventListener("connect", (event) => {
  // notify that a new port is available
  // use `event.target` to refer to the newly-added port
});
```

## See also

- `disconnect` event
