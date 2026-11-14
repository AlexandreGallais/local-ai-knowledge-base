---
title: "MIDIPort: connection property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midiport/connection/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIPort: connection property

The **`connection`** read-only property of the `MIDIPort` interface returns the connection state of the port.

## Value

Returns a string containing the connection state of the port, one of:

- `"open"`
    The device that this `MIDIPort` represents has been opened and is available.
- `"closed"`
    The device that this `MIDIPort` represents has not been opened, or has been closed.
- `"pending"`
    The device that this `MIDIPort` represents has been opened but has subsequently disconnected.

## Examples

The following example loops through all input ports and prints the connection status of each to the console.

```js
for (const entry of midiAccess.inputs) {
  const input = entry[1];
  console.log(input.connection);
}
```
