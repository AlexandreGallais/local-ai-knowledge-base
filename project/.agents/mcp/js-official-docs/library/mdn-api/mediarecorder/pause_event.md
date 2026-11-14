---
title: "MediaRecorder: pause event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediarecorder/pause_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaRecorder: pause event

The **`pause`** event of the `MediaRecorder` interface is fired when
`MediaRecorder.pause()` is called.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("pause", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onpause = (event) => { }
```

## Event type

A generic `Event`.

## Example

```js
pause.onclick = () => {
  if (mediaRecorder.state === "recording") {
    mediaRecorder.pause();
    // recording paused
  } else if (mediaRecorder.state === "paused") {
    mediaRecorder.resume();
    // resume recording
  }
};

mediaRecorder.onpause = () => {
  // do something in response to
  // recording being paused
};

mediaRecorder.onresume = () => {
  // do something in response to
  // recording being resumed
};
```

## See also

- Using the MediaStream Recording API
- Web Dictaphone: MediaRecorder +
  getUserMedia + Web Audio API visualization demo, by Chris Mills (source on GitHub.)
- simpl.info MediaStream Recording demo, by Sam Dutton.
- `Navigator.getUserMedia`
