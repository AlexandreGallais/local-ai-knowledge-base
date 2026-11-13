---
title: "HTMLMediaElement: emptied event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/emptied_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: emptied event

The `emptied` event is fired when the media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the `load()` method is called to reload it.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("emptied", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onemptied = (event) => { }
```

## Event type

A generic `Event`.

## Examples

These examples add an event listener for the HTMLMediaElement's `emptied` event, then post a message when that event handler has reacted to the event firing.

Using `addEventListener()`:

```js
const video = document.querySelector("video");

video.addEventListener("emptied", (event) => {
  console.log("Uh oh. The media is empty. Did you call load()?");
});
```

Using the `onemptied` event handler property (but note that this replaces other event listeners added using `onemptied`, if any):

```js
const video = document.querySelector("video");

video.onemptied = (event) => {
  console.log("Uh oh. The media is empty. Did you call load()?");
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
- The HTMLMediaElement `stalled` event

## See also

- `HTMLAudioElement`
- `HTMLVideoElement`
- `<audio>`
- ``
