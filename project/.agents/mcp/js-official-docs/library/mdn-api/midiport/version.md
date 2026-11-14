---
title: "MIDIPort: version property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midiport/version/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIPort: version property

The **`version`** read-only property of the `MIDIPort` interface returns the version of the port.

## Value

A string containing the version of the port.

## Examples

The following example loops through all input ports and prints the version of each to the console.

```js
for (const entry of midiAccess.inputs) {
  const input = entry[1];
  console.log(input.version);
}
```
