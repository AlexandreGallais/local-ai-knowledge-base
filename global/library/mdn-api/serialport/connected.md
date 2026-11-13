---
title: "SerialPort: connected property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serialport/connected/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SerialPort: connected property

The **`connected`** read-only property of the `SerialPort` interface returns a boolean value that indicates whether the port is logically connected to the device.

## Value

A boolean — `true` if the port is logically connected, and `false` if not.

## Description

When a wireless device goes out of range of the host, any wireless serial port opened by a web app automatically closes, even though it stays logically connected. In such cases, the web app could attempt to reopen the port using `SerialPort.open()`.

However, if the wireless device was intentionally disconnected (for example, if the user chose to disconnect it using the operating system control panel), the web app should refrain from reopening the port to prevent reconnecting to the wireless device.

The following snippet shows how the `connected` property can be used to distinguish between these two cases:

```js
const ports = await navigator.serial.getPorts();
for (const port of ports) {
  if (port.connected) {
    // The port is logically connected
    // automatically try to reopen the port
    await port.open({ baudRate: 9600 });
  } else {
    // The port is not logically connected; at this point you could
    // prompt the user to make sure the Bluetooth device is available, and
    // Show a "connect" button to allow them to try opening the port if desired
  }
}
```

## Examples

### Logging when a port is connected

The following snippet invokes `Serial.requestPort()` when the user presses a ``, prompting them to choose a serial port to connect to, then logs a message to the console reporting the connection status:

```js
requestPortButton.addEventListener("click", async () => {
  const port = await navigator.serial.requestPort();
  console.log(`Requested serial port. Connected: ${port.connected}`);
});
```

### Logging connection status on connect and disconnect

You can use the following snippet to log the connection status when the `connect` and `disconnect` events fire:

```js
navigator.serial.addEventListener("connect", ({ target: port }) => {
  console.log(`Connect event fired. Connected: ${port.connected}`);
});

navigator.serial.addEventListener("disconnect", ({ target: port }) => {
  console.log(`Disconnect event fired. Connected: ${port.connected}`);
});
```
