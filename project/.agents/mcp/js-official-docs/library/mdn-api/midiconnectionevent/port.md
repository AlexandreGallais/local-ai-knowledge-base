---
title: "MIDIConnectionEvent: port property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midiconnectionevent/port/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIConnectionEvent: port property

The **`port`** read-only property of the `MIDIConnectionEvent` interface returns the port that has been disconnected or connected.

## Value

A `MIDIPort` object.

## Examples

The `Navigator.requestMIDIAccess()` method returns a promise that resolves with a `MIDIAccess` object. When a port changes state, a `MIDIConnectionEvent` is passed to the `statechange` event. Information about the port can then be printed to the console.

```js
navigator.requestMIDIAccess().then((access) => {
  access.onstatechange = (event) => {
    console.log(event.port.name, event.port.manufacturer, event.port.state);
  };
});
```
