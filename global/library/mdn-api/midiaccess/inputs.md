---
title: "MIDIAccess: inputs property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midiaccess/inputs/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIAccess: inputs property

The **`inputs`** read-only property of the `MIDIAccess` interface provides access to any available MIDI input ports.

## Value

A `MIDIInputMap` instance.

## Examples

The `Navigator.requestMIDIAccess()` method returns a promise that resolves with a `MIDIAccess` object. Printing the value of `inputs` to the console returns a `MIDIInputMap`.

```js
navigator.requestMIDIAccess().then((access) => {
  console.log(access.inputs);
});
```
