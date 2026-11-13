---
title: "MIDIInput"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midiinput/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIInput

The **`MIDIInput`** interface of the Web MIDI API receives messages from a MIDI input port.

## Instance properties

_This interface doesn't implement any specific properties, but inherits properties from `MIDIPort`._

## Instance methods

_This interface doesn't implement any specific methods, but inherits methods from `MIDIPort`._

### Events

- `midimessage`
    Fired when the current port receives a MIDI message.

## Examples

In the following example the name of each `MIDIInput` is printed to the console. Then, `midimessage` events are listened for on all input ports. When a message is received the `MIDIMessageEvent.data` property is printed to the console.

```js
inputs.forEach((input) => {
  console.log(input.name); /* inherited property from MIDIPort */
  input.onmidimessage = (message) => {
    console.log(message.data);
  };
});
```
