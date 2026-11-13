---
title: "MIDIPort: statechange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midiport/statechange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIPort: statechange event

The **`statechange`** event of the `MIDIPort` interface is fired when a port changes from open to closed, or closed to open.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("statechange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onstatechange = (event) => { }
```

## Event type

A `MIDIConnectionEvent`. Inherits from `Event`.

## Example

In the following example the current `MIDIPort.state` is logged each time it changes.

```js
port.onstatechange = (event) => {
  console.log(port.state);
};
```
