---
title: "MediaStream: removetrack event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastream/removetrack_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStream: removetrack event

The **`removetrack`** event is fired when a new `MediaStreamTrack` object has been removed from a `MediaStream`.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("removetrack", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onremovetrack = (event) => { }
```

## Event type

A `MediaStreamTrackEvent`. Inherits from `Event`.

## Examples

Using `addEventListener()`:

```js
const stream = new MediaStream();

stream.addEventListener("removetrack", (event) => {
  console.log(`${event.track.kind} track removed`);
});
```

Using the `onremovetrack` event handler property (but note that this replaces other event listeners added using `onremovetrack`, if any):

```js
const stream = new MediaStream();

stream.onremovetrack = (event) => {
  console.log(`${event.track.kind} track removed`);
};
```

## See also

- Related events: `addtrack`
- This event on `AudioTrackList` targets: `removetrack`
- This event on `VideoTrackList` targets: `removetrack`
- Media Capture and Streams API
- WebRTC
