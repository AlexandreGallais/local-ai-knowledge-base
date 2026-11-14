---
title: "MIDIAccess"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midiaccess/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIAccess

The **`MIDIAccess`** interface of the Web MIDI API provides methods for listing MIDI input and output devices, and obtaining access to those devices.

`MIDIAccess` is a transferable object.

## Instance properties

- `MIDIAccess.inputs` (read-only)
    Returns an instance of `MIDIInputMap` which provides access to any available MIDI input ports.
- `MIDIAccess.outputs` (read-only)
    Returns an instance of `MIDIOutputMap` which provides access to any available MIDI output ports.
- `MIDIAccess.sysexEnabled` (read-only)
    A boolean attribute indicating whether system exclusive support is enabled on the current MIDIAccess instance.

### Events

- `statechange`
    Called whenever a new MIDI port is added or an existing port changes state.

## Examples

The `Navigator.requestMIDIAccess()` method returns a promise that resolves with a `MIDIAccess` object. Information about the input and output ports is returned.

When a port changes state, information about that port is printed to the console.

```js
navigator.requestMIDIAccess().then((access) => {
  // Get lists of available MIDI controllers
  const inputs = access.inputs.values();
  const outputs = access.outputs.values();

  access.onstatechange = (event) => {
    // Print information about the (dis)connected MIDI controller
    console.log(event.port.name, event.port.manufacturer, event.port.state);
  };
});
```
