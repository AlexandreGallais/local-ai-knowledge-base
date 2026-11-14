---
title: "Navigator: serial property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/serial/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: serial property

The **`serial`** read-only property of the `Navigator` interface returns a `Serial` object, which represents the entry point into the Web Serial API.

The same instance of the `Serial` object will always be returned.

## Value

A `Serial` object.

## Examples

### List available ports

The following example uses the `getPorts()` method to initialize a list of available ports.

```js
navigator.serial.getPorts().then((ports) => {
  // Initialize the list of available ports with `ports` on page load.
});
```

## See also

- Read from and write to a serial port
- Getting started with the Web Serial API
