---
title: "HTMLMediaElement: loadeddata event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/loadeddata_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: loadeddata event

The **`loadeddata`** event is fired when the frame at the current playback position of the media has finished loading; often the first frame.

> **Note:**
> This event will not fire in mobile/tablet devices if data-saver is on in browser settings.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("loadeddata", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onloadeddata = (event) => { }
```

## Event type

A generic `Event`.

## Examples

These examples add an event listener for the HTMLMediaElement's `loadeddata` event, then post a message when that event handler has reacted to the event firing.

Using `addEventListener()`:

```js
const video = document.querySelector("video");

video.addEventListener("loadeddata", (event) => {
  console.log(
    "Yay! The readyState just increased to  " +
      "HAVE_CURRENT_DATA or greater for the first time.",
  );
});
```

Using the `onloadeddata` event handler property (but note that this replaces other event listeners added using `onloadeddata`, if any):

```js
const video = document.querySelector("video");

video.onloadeddata = (event) => {
  console.log(
    "Yay! The readyState just increased to  " +
      "HAVE_CURRENT_DATA or greater for the first time.",
  );
};
```

## Related Events

- The HTMLMediaElement `playing` event
- The HTMLMediaElement `waiting` event
- The HTMLMediaElement `seeking` event
- The HTMLMediaElement `seeked` event
- The HTMLMediaElement `ended` event
- The HTMLMediaElement `loadedmetadata` event
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
