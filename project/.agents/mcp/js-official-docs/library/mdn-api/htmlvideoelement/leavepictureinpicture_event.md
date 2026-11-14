---
title: "HTMLVideoElement: leavepictureinpicture event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlvideoelement/leavepictureinpicture_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLVideoElement: leavepictureinpicture event

The `leavepictureinpicture` event is fired when the `HTMLVideoElement` leaves picture-in-picture mode successfully.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("leavepictureinpicture", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onleavepictureinpicture = (event) => { }
```

## Event type

A `PictureInPictureEvent`. Inherits from `Event`.

## Examples

These examples add an event listener for the HTMLVideoElement's `leavepictureinpicture` event, then post a message when that event handler has reacted to the event firing.

Using `addEventListener()`:

```js
const video = document.querySelector("#video");
const button = document.querySelector("#button");

function onExitPip() {
  console.log("Picture-in-Picture mode deactivated!");
}

video.addEventListener("leavepictureinpicture", onExitPip);

button.onclick = () => {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  }
};
```

Using the `onleavepictureinpicture` event handler property (but note that this replaces other event listeners added using `onleavepictureinpicture`, if any):

```js
const video = document.querySelector("#video");
const button = document.querySelector("#button");

function onExitPip() {
  console.log("Picture-in-Picture mode deactivated!");
}

video.onleavepictureinpicture = onExitPip;

button.onclick = () => {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  }
};
```

## See also

- `HTMLVideoElement`
- Picture-in-Picture API
