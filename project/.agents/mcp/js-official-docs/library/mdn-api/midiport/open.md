---
title: "MIDIPort: open() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midiport/open/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIPort: open() method

The **`open()`** method of the `MIDIPort` interface makes the MIDI device connected to this `MIDIPort` explicitly available.

If the port is successfully opened a new `MIDIConnectionEvent` is queued to the `MIDIPort` `statechange` and `MIDIAccess` `statechange` events, and the `MIDIPort.connection` property is changed to `"open"`.

If the port is already open when this method is called, then the promise will resolve successfully.

## Syntax

```js
open()
```

### Parameters

None.

### Return value

A `Promise` which resolves once access to the port has been successfully obtained.

### Exceptions

- `NotAllowedError` `DOMException`
    The promise is rejected with this error if the port is unavailable and cannot be opened.

## Examples

The following example shows an output port being opened.

```js
const output = midiAccess.outputs.get(portID);
output.open(); // opens the port
```
