---
title: "DocumentPictureInPictureEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documentpictureinpictureevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentPictureInPictureEvent

The **`DocumentPictureInPictureEvent`** interface of the `Document Picture-in-Picture API` is the event object for the `enter` event, which fires when the Picture-in-Picture window is opened.

## Constructor

- `DocumentPictureInPictureEvent()`
    Creates a new `DocumentPictureInPictureEvent` object instance.

## Instance properties

_Inherits properties from its parent, `Event`._

- `window` (read-only)
    Returns a `Window` instance representing the browsing context inside the `DocumentPictureInPicture` window the event was fired on.

## Instance methods

_Inherits methods from its parent, `Event`._

## Examples

```js
documentPictureInPicture.addEventListener("enter", (event) => {
  const pipWindow = event.window;
  console.log("Video player has entered the pip window");

  const pipMuteButton = pipWindow.document.createElement("button");
  pipMuteButton.textContent = "Mute";
  pipMuteButton.addEventListener("click", () => {
    const pipVideo = pipWindow.document.querySelector("#video");
    if (!pipVideo.muted) {
      pipVideo.muted = true;
      pipMuteButton.textContent = "Unmute";
    } else {
      pipVideo.muted = false;
      pipMuteButton.textContent = "Mute";
    }
  });

  pipWindow.document.body.append(pipMuteButton);
});
```

## See also

- `Document Picture-in-Picture API`
- Using the Document Picture-in-Picture API
