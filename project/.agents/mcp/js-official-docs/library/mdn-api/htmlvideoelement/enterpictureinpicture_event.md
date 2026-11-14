---
title: "HTMLVideoElement: enterpictureinpicture event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlvideoelement/enterpictureinpicture_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLVideoElement: enterpictureinpicture event

The `enterpictureinpicture` event is fired when the `HTMLVideoElement` enters picture-in-picture mode successfully.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("enterpictureinpicture", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onenterpictureinpicture = (event) => { }
```

## Event type

A `PictureInPictureEvent`. Inherits from `Event`.

## Examples

These examples add an event listener for the HTMLVideoElement's `enterpictureinpicture` event, then post a message when that event handler has reacted to the event firing.

Using `addEventListener()`:

```js
const video = document.querySelector("#video");
const button = document.querySelector("#button");

function onEnterPip() {
  console.log("Picture-in-Picture mode activated!");
}

video.addEventListener("enterpictureinpicture", onEnterPip);

button.onclick = () => {
  video.requestPictureInPicture();
};
```

Using the `onenterpictureinpicture` event handler property (but note that this replaces other event listeners added using `onenterpictureinpicture`, if any):

```js
const video = document.querySelector("#video");
const button = document.querySelector("#button");

function onEnterPip() {
  console.log("Picture-in-Picture mode activated!");
}

video.onenterpictureinpicture = onEnterPip;

button.onclick = () => {
  video.requestPictureInPicture();
};
```

## See also

- `HTMLVideoElement`
- Picture-in-Picture API
