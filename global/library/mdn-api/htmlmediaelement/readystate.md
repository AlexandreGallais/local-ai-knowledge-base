---
title: "HTMLMediaElement: readyState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/readystate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: readyState property

The **`readyState`** read-only property of the `HTMLMediaElement` interface indicates the readiness state of the media.

## Value

A number which is one of the five possible state constants defined on the `HTMLMediaElement` interface:

- `HTMLMediaElement.HAVE_NOTHING` (0)
    No information is available about the media resource.
- `HTMLMediaElement.HAVE_METADATA` (1)
    Enough of the media resource has been retrieved that the metadata attributes are initialized. Seeking will no longer raise an exception.
- `HTMLMediaElement.HAVE_CURRENT_DATA` (2)
    Data is available for the current playback position, but not enough to actually play more than one frame.
- `HTMLMediaElement.HAVE_FUTURE_DATA` (3)
    Data for the current playback position as well as for at least a little bit of time into the future is available (in other words, at least two frames of video, for example).
- `HTMLMediaElement.HAVE_ENOUGH_DATA` (4)
    Enough data is available—and the download rate is high enough—that the media can be played through to the end without interruption.

## Examples

This example will listen for audio data to be loaded for the element `example`. It will
then check if at least the current playback position has been loaded. If it has, the
audio will play.

```html
<audio id="example" preload="auto">
  <source src="sound.ogg" type="audio/ogg" />
</audio>
```

```js
const obj = document.getElementById("example");

obj.addEventListener("loadeddata", () => {
  if (obj.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    obj.play();
  }
});
```

## See also

- `HTMLMediaElement`: Interface used to define the `HTMLMediaElement.readyState` property
