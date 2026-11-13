---
title: "HTMLTrackElement: cuechange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltrackelement/cuechange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTrackElement: cuechange event

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

The underlying `TextTrack`, indicated by the `track` property, receives a `cuechange` event every time the currently-presented cue is changed. This happens even if the track isn't associated with a media element.

If the track _is_ associated with a media element, using the `<track>` element as a child of the `<audio>` or `` element, the `cuechange` event is also sent to the `HTMLTrackElement`.

```js
let textTrackElem = document.getElementById("text-track");

textTrackElem.addEventListener("cuechange", (event) => {
  let cues = event.target.track.activeCues;
});
```

Alternatively, you can use the `oncuechange` event handler (but note that this replaces other event listeners added using `oncuechange`, if any):

```js
let textTrackElem = document.getElementById("text-track");

textTrackElem.oncuechange = (event) => {
  let cues = event.target.track.activeCues;
};
```

## See also

- WebVTT
- The same event on `TextTrack`: `cuechange`
