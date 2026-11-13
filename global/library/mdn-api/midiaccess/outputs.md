---
title: "MIDIAccess: outputs property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midiaccess/outputs/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIAccess: outputs property

The **`outputs`** read-only property of the `MIDIAccess` interface provides access to any available MIDI output ports.

## Value

A `MIDIOutputMap` instance.

## Examples

The `Navigator.requestMIDIAccess()` method returns a promise that resolves with a `MIDIAccess` object. Printing the value of `outputs` to the console returns a `MIDIOutputMap`.

```js
navigator.requestMIDIAccess().then((access) => {
  console.log(access.outputs);
});
```
