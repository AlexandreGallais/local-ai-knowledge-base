---
title: "MIDIAccess: sysexEnabled property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midiaccess/sysexenabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIAccess: sysexEnabled property

The **`sysexEnabled`** read-only property of the `MIDIAccess` interface indicates whether system exclusive support is enabled on the current MIDIAccess instance.

## Value

A boolean value.

## Examples

The `Navigator.requestMIDIAccess()` method returns a promise that resolves with a `MIDIAccess` object. Printing the value of `sysexEnabled` to the console returns a boolean value, which is `true` if system exclusive support is enabled.

```js
navigator.requestMIDIAccess().then((access) => {
  console.log(access.sysexEnabled);
});
```
