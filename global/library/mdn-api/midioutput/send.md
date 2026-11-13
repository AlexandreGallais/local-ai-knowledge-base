---
title: "MIDIOutput: send() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midioutput/send/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIOutput: send() method

The **`send()`** method of the `MIDIOutput` interface queues messages for the corresponding MIDI port. The message can be sent immediately, or with an optional timestamp to delay sending.

## Syntax

```js
send(data)
send(data, timestamp)
```

### Parameters

- `data`
    A sequence of one or more valid MIDI messages. Each entry represents a single byte of data.
- `timestamp` (optional)
    A `DOMHighResTimestamp` with the time in milliseconds when the message should be sent (relative to `Performance.timeOrigin`).

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown if `data` is not a valid sequence, or does not contain a valid MIDI message.
- `NotAllowedError` `DOMException`
    Thrown if `data` is a system exclusive message, and the `MIDIAccess` did not enable exclusive access.
- `InvalidStateError` `DOMException`
    Thrown if the port is disconnected.

## Examples

In the following example a middle C note is sent immediately, followed by a note off message one second later.

```js
function sendMiddleC(midiAccess, portID) {
  const noteOnMessage = [0x90, 60, 0x7f]; // Note on middle C, full velocity
  const output = midiAccess.outputs.get(portID);
  output.send(noteOnMessage); // Omitting the timestamp means send immediately.
  output.send([0x80, 60, 0x40], window.performance.now() + 1000.0); // timestamp = now + 1000ms.
}
```
