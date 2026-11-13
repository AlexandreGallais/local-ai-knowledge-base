---
title: "MIDIPort: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midiport/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIPort: name property

The **`name`** read-only property of the `MIDIPort` interface returns the system name of the port.

## Value

A string containing the system name of the port.

## Examples

The following example loops through all input ports and prints the name of each to the console.

```js
for (const entry of midiAccess.inputs) {
  const input = entry[1];
  console.log(input.name);
}
```
