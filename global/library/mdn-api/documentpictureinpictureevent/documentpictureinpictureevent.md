---
title: "DocumentPictureInPictureEvent: DocumentPictureInPictureEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documentpictureinpictureevent/documentpictureinpictureevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentPictureInPictureEvent: DocumentPictureInPictureEvent() constructor

The **`DocumentPictureInPictureEvent()`** constructor creates a new
`DocumentPictureInPictureEvent` object instance.

## Syntax

```js
new DocumentPictureInPictureEvent(type, init)
```

### Parameters

- `type`
    A string representing the type of event. In the case of `DocumentPictureInPictureEvent` this is always `enter`.
- `init`
    An object containing the following properties:
    - `window`
        A `Window` instance representing the browsing context inside the `DocumentPictureInPicture` window the event was fired on.

## Examples

A developer would not use this constructor manually. A new `DocumentPictureInPictureEvent` object is constructed when a handler is invoked as a result of the `enter` event firing.

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
