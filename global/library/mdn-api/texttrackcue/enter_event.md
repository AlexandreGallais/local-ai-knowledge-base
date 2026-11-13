---
title: "TextTrackCue: enter event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/texttrackcue/enter_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextTrackCue: enter event

The **`enter`** event fires when a cue becomes active. In the case of subtitles or a caption this is when it displays over the media.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("enter", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onenter = (event) => { }
```

## Event type

A generic `Event` with no added properties.

## Example

In the following example, `cue` prints to the console when it is the active cue.

```js
cue.addEventListener("enter", (event) => {
  console.log("Cue 1 has displayed");
});
```
