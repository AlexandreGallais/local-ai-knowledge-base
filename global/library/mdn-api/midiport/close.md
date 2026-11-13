---
title: "MIDIPort: close() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midiport/close/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIPort: close() method

The **`close()`** method of the `MIDIPort` interface makes the access to the MIDI device connected to this `MIDIPort` unavailable.

If the port is successfully closed a new `MIDIConnectionEvent` is queued to the `MIDIPort` `statechange` and `MIDIAccess` `statechange` events, and the `MIDIPort.connection` property is changed to `"closed"`.

## Syntax

```js
close()
```

### Parameters

None.

### Return value

Returns a `Promise` which resolves once the port has been closed.

## Examples

The following example shows an output port being closed.

```js
let output = midiAccess.outputs.get(portID);
output.close(); // closes the port
```
