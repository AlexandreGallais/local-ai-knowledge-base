---
title: "Serial: getPorts() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serial/getports/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Serial: getPorts() method

The **`getPorts()`** method of the `Serial` interface returns a `Promise` that resolves with an array of `SerialPort` objects representing serial ports connected to the host that the origin has permission to access.

## Syntax

```js
getPorts()
```

### Parameters

None.

### Return value

A `Promise` that resolves with an array of `SerialPort` objects.

### Exceptions

- `SecurityError` `DOMException`
    The returned `Promise` rejects with this error in either of the following situations:
    - A `serial` Permissions Policy blocks the use of this feature.
    - A user permission prompt was denied.

## Examples

### List available ports

The following example uses `getPorts()` to initialize a list of available ports.

```js
navigator.serial.getPorts().then((ports) => {
  // Initialize the list of available ports with `ports` on page load.
});
```
