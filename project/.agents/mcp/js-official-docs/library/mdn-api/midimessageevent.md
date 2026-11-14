---
title: "MIDIMessageEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midimessageevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIMessageEvent

The **`MIDIMessageEvent`** interface of the Web MIDI API represents the event passed to the `midimessage` event of the `MIDIInput` interface. A `midimessage` event is fired every time a MIDI message is sent from a device represented by a `MIDIInput`, for example when a MIDI keyboard key is pressed, a knob is tweaked, or a slider is moved.

## Constructor

- `MIDIMessageEvent()`
    Creates a new `MIDIMessageEvent` object instance.

## Instance properties

_This interface also inherits properties from `Event`._

- `MIDIMessageEvent.data` (read-only)
    A `Uint8Array` containing the data bytes of a single MIDI message. See the MIDI specification for more information on its form.

## Instance methods

_This interface doesn't implement any specific methods, but inherits methods from `Event`._

## Examples

The following example prints all MIDI messages to the console.

```js
navigator.requestMIDIAccess().then((midiAccess) => {
  Array.from(midiAccess.inputs).forEach((input) => {
    input[1].onmidimessage = (msg) => {
      console.log(msg);
    };
  });
});
```
