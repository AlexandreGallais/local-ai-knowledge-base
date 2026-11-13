---
title: "HTMLMediaElement: suspend event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/suspend_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: suspend event

The `suspend` event is fired when the user agent is intentionally not fetching media data, in which case `HTMLMediaElement.networkState` is set to `HTMLMediaElement.NETWORK_IDLE`. This can happen if there's no more data to load, or if loading is unnecessary; for example, the browser may decide to only buffer 5 minutes of a video in advance, in which case loading is suspended until the user watches more of the video.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("suspend", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onsuspend = (event) => { }
```

## Event type

A generic `Event`.

## Examples

These examples add an event listener for the HTMLMediaElement's `suspend` event, then post a message when that event handler has reacted to the event firing.

Using `addEventListener()`:

```js
const video = document.querySelector("video");

video.addEventListener("suspend", (event) => {
  console.log("Data loading has been suspended.");
});
```

Using the `onsuspend` event handler property (but note that this replaces other event listeners added using `onsuspend`, if any):

```js
const video = document.querySelector("video");

video.onsuspend = (event) => {
  console.log("Data loading has been suspended.");
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
- The HTMLMediaElement `ratechange` event
- The HTMLMediaElement `volumechange` event
- The HTMLMediaElement `emptied` event
- The HTMLMediaElement `stalled` event

## See also

- `HTMLAudioElement`
- `HTMLVideoElement`
- `<audio>`
- ``
- Web Audio API
