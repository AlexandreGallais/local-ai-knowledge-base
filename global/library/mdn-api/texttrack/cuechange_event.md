---
title: "TextTrack: cuechange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/texttrack/cuechange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextTrack: cuechange event

The **`cuechange`** event fires when a `TextTrack` has changed the currently displaying cues. The event is fired on both the `TextTrack` and the `HTMLTrackElement` in which it's being presented, if any.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("cuechange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oncuechange = (event) => { }
```

## Event type

A generic `Event` with no added properties.

## Examples

You can set up a listener for the `cuechange` event on a `TextTrack` using the `addEventListener()` method:

```js
track.addEventListener("cuechange", () => {
  const cues = track.activeCues; // array of current cues
  // …
});
```

Or you can set the `oncuechange` event handler property (but note that this replaces other event listeners added using `oncuechange`, if any):

```js
track.oncuechange = (event) => {
  let cues = track.activeCues; // array of current cues
};
```

## See also

- WebVTT
- The same event on `HTMLTrackElement`: `cuechange`
