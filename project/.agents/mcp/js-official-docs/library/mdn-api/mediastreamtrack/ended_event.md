---
title: "MediaStreamTrack: ended event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamtrack/ended_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamTrack: ended event

The **`ended`** event of the `MediaStreamTrack` interface is fired when playback or streaming has stopped because the end of the media was reached or because no further data is available.

This event is not cancelable and does not bubble.

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

## Usage notes

`ended` events fire when the media stream track's source permanently stops sending data on the stream. There are various ways this can happen, including:

- There is no more data left to send.
- The user revoked the permissions needed for the data to be sent.
- The hardware generating the source data has been removed or ejected.
- A remote peer has permanently stopped sending data.
- The only case where the track ends but the `ended` event is not fired is when calling `MediaStreamTrack.stop`.

Pausing media _does not_ generate an `ended` event.

## Examples

This example sets up an event handler for the `ended` event, which changes an on-screen icon to indicate that the track is no longer active.

```js
track.addEventListener("ended", () => {
  let statusElem = document.getElementById("status-icon");
  statusElem.src = "/images/stopped-icon.png";
});
```

You can also set up the event handler using the `onended` property (but note that this replaces other event listeners added using `onended`, if any):

```js
track.onended = () => {
  let statusElem = document.getElementById("status-icon");

  statusElem.src = "/images/stopped-icon.png";
};
```

## See also

- The HTMLMediaElement `playing` event
- The HTMLMediaElement `waiting` event
- The HTMLMediaElement `seeking` event
- `<audio>`
- ``
- The HTMLMediaElement `ended` event
- The AudioScheduledSourceNode `ended` event
