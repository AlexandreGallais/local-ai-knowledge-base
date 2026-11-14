---
title: "MIDIAccess: statechange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/midiaccess/statechange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MIDIAccess: statechange event

The **`statechange`** event of the `MIDIAccess` interface is fired when a new MIDI port is added or when an existing port changes state.

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

The `Navigator.requestMIDIAccess()` method returns a promise that resolves with a `MIDIAccess` object. When a port changes state, information about that port is printed to the console.

```js
navigator.requestMIDIAccess().then((access) => {
  access.onstatechange = (event) => {
    console.log(event.port.name, event.port.manufacturer, event.port.state);
  };
});
```
