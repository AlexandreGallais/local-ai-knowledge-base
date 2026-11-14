---
title: "MIDIMessageEvent: MIDIMessageEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midimessageevent/midimessageevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIMessageEvent: MIDIMessageEvent() constructor

The **`MIDIMessageEvent()`** constructor creates a new `MIDIMessageEvent` object. Typically this constructor is not used as events are created when a `MIDIInput` finishes receiving one or more MIDI messages.

## Syntax

```js
new MIDIMessageEvent(type)
new MIDIMessageEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `MIDIMessageEvent`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `data`
        A `Uint8Array` instance containing the data bytes of the MIDI message.

### Return value

A new `MIDIMessageEvent` object.
