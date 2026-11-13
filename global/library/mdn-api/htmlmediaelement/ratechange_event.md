---
title: "HTMLMediaElement: ratechange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/ratechange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: ratechange event

The `ratechange` event is fired when the playback rate has changed.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("ratechange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onratechange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

These examples add an event listener for the HTMLMediaElement's `ratechange` event, then post a message when that event handler has reacted to the event firing.

Using `addEventListener()`:

```js
const video = document.querySelector("video");

video.addEventListener("ratechange", (event) => {
  console.log("The playback rate changed.");
});
```

Using the `onratechange` event handler property (but note that this replaces other event listeners added using `onratechange`, if any):

```js
const video = document.querySelector("video");

video.onratechange = (event) => {
  console.log("The playback rate changed.");
};
```

## Related Events

- The HTMLMediaElement `playing` event
- The HTMLMediaElement `waiting` event
- The HTMLMediaElement `seeking` event
- The HTMLMediaElement `seeked` event
- The HTMLMediaElement `ended` event
- The HTMLMediaElement `loadedmetadata` event
- The HTMLMediaElement `loadeddata` event
- The HTMLMediaElement `canplay` event
- The HTMLMediaElement `canplaythrough` event
- The HTMLMediaElement `durationchange` event
- The HTMLMediaElement `timeupdate` event
- The HTMLMediaElement `play` event
- The HTMLMediaElement `pause` event
- The HTMLMediaElement `volumechange` event
- The HTMLMediaElement `suspend` event
- The HTMLMediaElement `emptied` event
- The HTMLMediaElement `stalled` event

## See also

- `HTMLAudioElement`
- `HTMLVideoElement`
- `<audio>`
- ``
