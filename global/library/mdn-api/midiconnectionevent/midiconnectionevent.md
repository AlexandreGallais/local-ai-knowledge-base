---
title: "MIDIConnectionEvent: MIDIConnectionEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midiconnectionevent/midiconnectionevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIConnectionEvent: MIDIConnectionEvent() constructor

The **`MIDIConnectionEvent()`** constructor creates a new `MIDIConnectionEvent` object. Typically this constructor is not used as events are created when a new port becomes available, and the object is passed to the `statechange` event.

## Syntax

```js
new MIDIConnectionEvent(type)
new MIDIConnectionEvent(type, midiConnectionEventInit)
```

### Parameters

- `type`
    A string with one of `"connect"` or `"disconnect"`.
- `midiConnectionEventInit` (optional)
    A dictionary including the following fields:
    - `port`
        The `MIDIPort` instance representing the port that has connected or disconnected.
    - `bubbles` (optional)
        A boolean value indicating whether the event bubbles. The default is
        `false`.
    - `cancelable` (optional)
        A boolean value indicating whether the event can be canceled. The
        default is `false`.
    - `composed` (optional)
        A boolean value indicating whether the event will trigger listeners
        outside of a shadow root (see `Event.composed` for more details). The
        default is `false`.
