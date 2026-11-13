---
title: "MIDIInput: midimessage event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midiinput/midimessage_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIInput: midimessage event

The `midimessage` event of the Web MIDI API is fired when the MIDI port corresponding to this `MIDIInput` finishes receiving one or more MIDI messages. An instance of `MIDIMessageEvent` containing the message that was received is passed to the event handler.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("midimessage", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onmidimessage = (event) => { }
```

## Event type

A `MIDIMessageEvent`. Inherits from `Event`.

## Examples

In the following example `midimessage` events are listened for on all input ports. When a message is received the `MIDIMessageEvent.data` property is printed to the console.

```js
inputs.forEach((input) => {
  input.onmidimessage = (message) => {
    console.log(message.data);
  };
});
```
