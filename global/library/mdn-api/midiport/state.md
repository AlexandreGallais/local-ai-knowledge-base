---
title: "MIDIPort: state property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midiport/state/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIPort: state property

The **`state`** read-only property of the `MIDIPort` interface returns the state of the port.

## Value

A string containing the state of the port, one of:

- `"disconnected"`
    The device that this `MIDIPort` represents is disconnected from the system.
- `"connected"`
    The device that this `MIDIPort` represents is currently connected.

## Examples

The following example loops through all input ports and prints the state of each to the console.

```js
for (const entry of midiAccess.inputs) {
  const input = entry[1];
  console.log(input.state);
}
```
