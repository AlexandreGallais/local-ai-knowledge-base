---
title: "HTMLMediaElement: stalled event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/stalled_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: stalled event

The `stalled` event is fired when the user agent is trying to fetch media data, but data is unexpectedly not forthcoming.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("stalled", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onstalled = (event) => { }
```

## Event type

A generic `Event`.

## Examples

These examples add an event listener for the HTMLMediaElement's `stalled` event, then post a message when that event handler has reacted to the event firing.

Using `addEventListener()`:

```js
const video = document.querySelector("video");

video.addEventListener("stalled", (event) => {
  console.log("Failed to fetch data, but trying.");
});
```

Using the `onstalled` event handler property (but note that this replaces other event listeners added using `onstalled`, if any):

```js
const video = document.querySelector("video");

video.onstalled = (event) => {
  console.log("Failed to fetch data, but trying.");
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
- The HTMLMediaElement `suspend` event
- The HTMLMediaElement `emptied` event

## See also

- `HTMLAudioElement`
- `HTMLVideoElement`
- `<audio>`
- ``
