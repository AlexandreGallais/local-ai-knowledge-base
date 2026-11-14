---
title: "HTMLMediaElement: ended event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/ended_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: ended event

The `ended` event is fired when playback or streaming has stopped because the end of the media was reached or because no further data is available.

This event occurs based upon `HTMLMediaElement` (`<audio>` and ``) fire `ended` when playback reaches the end of the media.

This event is not cancelable and does not bubble.

> **Note:**
> The `ended` event doesn't fire if the `loop` property is `true` and `playbackRate` is non-negative.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("ended", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onended = (event) => { }
```

## Event type

A generic `Event`.

## Examples

These examples add an event listener for the HTMLMediaElement's `ended` event, then post a message when that event handler has reacted to the event firing.

Using `addEventListener()`:

```js
const video = document.querySelector("video");

video.addEventListener("ended", (event) => {
  console.log(
    "Video stopped either because it has finished playing or no further data is available.",
  );
});
```

Using the `onended` event handler property (but note that this replaces other event listeners added using `onended`, if any):

```js
const video = document.querySelector("video");

video.onended = (event) => {
  console.log(
    "Video stopped either because it has finished playing or no further data is available.",
  );
};
```

## Related Events

- The HTMLMediaElement `playing` event
- The HTMLMediaElement `waiting` event
- The HTMLMediaElement `seeking` event
- The HTMLMediaElement `seeked` event
- The HTMLMediaElement `loadedmetadata` event
- The HTMLMediaElement `loadeddata` event
- The HTMLMediaElement `canplay` event
- The HTMLMediaElement `canplaythrough` event
- The HTMLMediaElement `durationchange` event
- The HTMLMediaElement `timeupdate` event
- The HTMLMediaElement `play` event
- The HTMLMediaElement `pause` event
- The HTMLMediaElement `ratechange` event
- The HTMLMediaElement `volumechange` event
- The HTMLMediaElement `suspend` event
- The HTMLMediaElement `emptied` event
- The HTMLMediaElement `stalled` event

## See also

- `HTMLAudioElement`
- `HTMLVideoElement`
- `<audio>`
- ``
- Media Capture and Streams
  - `MediaStreamTrack`: `ended` event

- Web Audio API
  - Web audio API: ended event
