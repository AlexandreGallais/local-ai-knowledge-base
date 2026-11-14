---
title: "MIDIConnectionEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midiconnectionevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIConnectionEvent

The **`MIDIConnectionEvent`** interface of the Web MIDI API is the event passed to the `statechange` event of the `MIDIAccess` interface and the `statechange` event of the `MIDIPort` interface. This occurs any time a new port becomes available, or when a previously available port becomes unavailable. For example, this event is fired whenever a MIDI device is either plugged in to or unplugged from a computer.

## Constructor

- `MIDIConnectionEvent()`
    Creates a new `MIDIConnectionEvent` object.

## Instance properties

- `MIDIConnectionEvent.port` (read-only)
    Returns a reference to a `MIDIPort` instance for a port that has been connected or disconnected.

## Examples

The `Navigator.requestMIDIAccess()` method returns a promise that resolves with a `MIDIAccess` object. When a port changes state, a `MIDIConnectionEvent` is passed to `statechange` event. Information about the port can then be printed to the console.

```js
navigator.requestMIDIAccess().then((access) => {
  access.onstatechange = (event) => {
    console.log(event.port.name, event.port.manufacturer, event.port.state);
  };
});
```
