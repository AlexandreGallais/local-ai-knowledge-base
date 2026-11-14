---
title: "MIDIMessageEvent: data property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midimessageevent/data/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIMessageEvent: data property

The **`data`** read-only property of the `MIDIMessageEvent` interface returns the MIDI data bytes of a single MIDI message.

## Value

A `Uint8Array`.

## Examples

In the following example `midimessage` events are listened for on all input ports. When a message is received the value of `data` is printed to the console.

```js
inputs.forEach((input) => {
  input.onmidimessage = (message) => {
    console.log(message.data);
  };
});
```
