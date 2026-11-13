---
title: "HTMLMediaElement: timeupdate event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/timeupdate_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: timeupdate event

The `timeupdate` event is fired when the time indicated by the `currentTime` attribute has been updated.

The event frequency is dependent on the system load, but will be thrown between about 4Hz and 66Hz (assuming the event handlers don't take longer than 250ms to run). User agents are encouraged to vary the frequency of the event based on the system load and the average cost of processing the event each time, so that the UI updates are not any more frequent than the user agent can comfortably handle while decoding the video.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("timeupdate", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ontimeupdate = (event) => { }
```

## Event type

A generic `Event`.

## Examples

These examples add an event listener for the HTMLMediaElement's `timeupdate` event, then post a message when that event handler has reacted to the event firing. Remember, the event frequency is dependent on the system load.

Using `addEventListener()`:

```js
const video = document.querySelector("video");

video.addEventListener("timeupdate", (event) => {
  console.log("The currentTime attribute has been updated. Again.");
});
```

Using the `ontimeupdate` event handler property (but note that this replaces other event listeners added using `ontimeupdate`, if any):

```js
const video = document.querySelector("video");

video.ontimeupdate = (event) => {
  console.log("The currentTime attribute has been updated. Again.");
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
