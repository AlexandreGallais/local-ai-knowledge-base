---
title: "TextTrackList: change event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/texttracklist/change_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextTrackList: change event

The **`change`** event is fired when a text track is made active or inactive, or a `TextTrackList` is otherwise changed.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("change", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onchange = (event) => { }
```

## Event type

A generic `Event` with no added properties.

## Examples

Using `addEventListener()`:

```js
const mediaElement = document.querySelectorAll("video, audio")[0];
mediaElement.textTracks.addEventListener("change", (event) => {
  console.log(`'${event.type}' event fired`);
});
```

Using the `onchange` event handler property (but note that this replaces other event listeners added using `onchange`, if any):

```js
const mediaElement = document.querySelector("video, audio");
mediaElement.textTracks.onchange = (event) => {
  console.log(`'${event.type}' event fired`);
};
```

## See also

- Related events: `addtrack`, `removetrack`
- This event on `VideoTrackList` targets: `change`
- This event on `AudioTrackList` targets: `change`
- Media Capture and Streams API
- WebRTC
