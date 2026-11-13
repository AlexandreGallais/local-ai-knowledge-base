---
title: "MIDIOutput"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midioutput/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIOutput

The **`MIDIOutput`** interface of the `Web MIDI API` provides methods to add messages to the queue of an output device, and to clear the queue of messages.

## Instance properties

_This interface doesn't implement any specific properties, but inherits properties from `MIDIPort`._

## Instance methods

_This interface also inherits methods from `MIDIPort`._

- `MIDIOutput.send()`
    Queues a message to be sent to the MIDI port.
- `MIDIOutput.clear()`
    Clears any pending send data from the queue.

## Examples

The following example sends a middle C immediately on MIDI channel 1.

```js
function sendMiddleC(midiAccess, portID) {
  const noteOnMessage = [0x90, 60, 0x7f]; // note on, middle C, full velocity
  const output = midiAccess.outputs.get(portID);
  output.send(noteOnMessage); // sends the message.
}
```
