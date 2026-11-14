---
title: "PictureInPictureWindow"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pictureinpicturewindow/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PictureInPictureWindow

The **`PictureInPictureWindow`** interface represents an object able to programmatically obtain the **`width`** and **`height`** and **`resize event`** of the floating video window.

An object with this interface is obtained using the `HTMLVideoElement.requestPictureInPicture()` promise return value.

## Instance properties

_The `PictureInPictureWindow` interface doesn't inherit any properties._

- `PictureInPictureWindow.width` (read-only)
    Determines the width of the floating video window.
- `PictureInPictureWindow.height` (read-only)
    Determines the height of the floating video window.

## Instance methods

_The `PictureInPictureWindow` interface doesn't inherit any methods._

## Events

_The `PictureInPictureWindow` interface doesn't inherit any events._

- `resize`
    Sent to a `PictureInPictureWindow` when the floating video window is resized.

## Examples

Given a `` and a ``, clicking the button will make the video enter the picture-in-picture mode; we then attach an event to print the floating video window dimensions to the console.

```js
const button = document.querySelector("button");
const video = document.querySelector("video");

function printPipWindowDimensions(evt) {
  const pipWindow = evt.target;
  console.log(
    `The floating window dimensions are: ${pipWindow.width}x${pipWindow.height}px`,
  );
  // will print:
  // The floating window dimensions are: 640x360px
}

button.onclick = () => {
  video.requestPictureInPicture().then((pictureInPictureWindow) => {
    pictureInPictureWindow.onresize = printPipWindowDimensions;
  });
};
```

## See also

- Picture-in-Picture API
