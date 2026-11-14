---
title: "TextTrackCue: exit event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/texttrackcue/exit_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextTrackCue: exit event

The **`exit`** event fires when a cue stops being active.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("exit", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onexit = (event) => { }
```

## Event type

A generic `Event` with no added properties.

## Example

In the following example, `cue` prints to the console when it stops being displayed as the active cue.

```js
cue.addEventListener("enter", (event) => {
  console.log("Cue 1 has left the building.");
});
```
