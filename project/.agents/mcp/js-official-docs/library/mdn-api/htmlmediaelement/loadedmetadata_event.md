---
title: "HTMLMediaElement: loadedmetadata event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/loadedmetadata_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: loadedmetadata event

The `loadedmetadata` event is fired when the metadata has been loaded.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("loadedmetadata", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onloadedmetadata = (event) => { }
```

## Event type

A generic `Event`.

## Examples

These examples add an event listener for the HTMLMediaElement's `loadedmetadata` event, then post a message when that event handler has reacted to the event firing.

Using `addEventListener()`:

```js
const video = document.querySelector("video");

video.addEventListener("loadedmetadata", (event) => {
  console.log(
    "The duration and dimensions of the media and tracks are now known.",
  );
});
```

Using the `onloadedmetadata` event handler property (but note that this replaces other event listeners added using `onloadedmetadata`, if any):

```js
const video = document.querySelector("video");

video.onloadedmetadata = (event) => {
  console.log(
    "The duration and dimensions of the media and tracks are now known.",
  );
};
```

## Related Events

- The HTMLMediaElement `playing` event
- The HTMLMediaElement `waiting` event
- The HTMLMediaElement `seeking` event
- The HTMLMediaElement `seeked` event
- The HTMLMediaElement `ended` event
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
