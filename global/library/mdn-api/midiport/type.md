---
title: "MIDIPort: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midiport/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIPort: type property

The **`type`** read-only property of the `MIDIPort` interface returns the type of the port, indicating whether this is an input or output MIDI port.

## Value

A string containing the type of the port, one of:

- `"input"`
    The `MIDIPort` is an input port.
- `"output"`
    The `MIDIPort` is an output port.

## Examples

The following example loops through all input ports and prints the `type` of each to the console.

```js
for (const entry of midiAccess.inputs) {
  const input = entry[1];
  console.log(input.type); // should always be input
}
```
