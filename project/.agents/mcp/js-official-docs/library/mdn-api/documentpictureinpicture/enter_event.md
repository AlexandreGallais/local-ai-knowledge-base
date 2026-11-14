---
title: "DocumentPictureInPicture: enter event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documentpictureinpicture/enter_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentPictureInPicture: enter event

The **`enter`** event of the `DocumentPictureInPicture` interface is fired when the Picture-in-Picture window is successfully opened.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("enter", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onenter = (event) => { }
```

## Event type

A `DocumentPictureInPictureEvent`.

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
