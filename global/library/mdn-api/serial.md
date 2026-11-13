---
title: "Serial"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serial/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Serial

The `Serial` interface of the Web Serial API provides attributes and methods for finding and connecting to serial ports from a web page.

## Instance methods

- `Serial.requestPort()`
    Returns a `Promise` that resolves with an instance of `SerialPort` representing the device chosen by the user.
    This method must be called via transient activation.

- `Serial.getPorts()`
    Returns a `Promise` that resolves with an array of `SerialPort` objects representing serial ports connected to the host that the origin has permission to access.

## Events

The following events are available to `Serial` via event bubbling from `SerialPort`:

- `SerialPort` `connect` event
    An event fired when a port has been connected to the device.
- `SerialPort` `disconnect` event
    An event fired when a port has been disconnected from the device.

## Examples

### Basic usage

The following example shows how a site can check for available ports and allow the user to grant it permission to access additional ports.

On load event listeners are added for the `connect` and `disconnect` events so that the site can react when a device is connected or disconnected from the system. The `getPorts()` method is then called to see which ports are connected that the site already has access to.

If the site doesn't have access to any connected ports it has to wait until it has user activation to proceed.
In this example we use a `click` event handler on a button for this task.
A filter is passed to `requestPort()` with a USB vendor ID in order to limit the set of devices shown to the user to only USB devices built by a particular manufacturer.

```js
navigator.serial.addEventListener("connect", (e) => {
  // Connect to `e.target` or add it to a list of available ports.
});

navigator.serial.addEventListener("disconnect", (e) => {
  // Remove `e.target` from the list of available ports.
});

navigator.serial.getPorts().then((ports) => {
  // Initialize the list of available ports with `ports` on page load.
});

button.addEventListener("click", () => {
  const usbVendorId = 0xabcd;
  navigator.serial
    .requestPort({ filters: [{ usbVendorId }] })
    .then((port) => {
      // Connect to `port` or add it to the list of available ports.
    })
    .catch((e) => {
      // The user didn't select a port.
    });
});
```
