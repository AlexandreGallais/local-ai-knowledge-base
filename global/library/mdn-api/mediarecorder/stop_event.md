---
title: "MediaRecorder: stop event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediarecorder/stop_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaRecorder: stop event

The **`stop`** event of the `MediaRecorder` interface is fired when
`MediaRecorder.stop()` is called, or when the media stream being
captured ends. In each case, the `stop` event is preceded by a
`dataavailable` event, making the `Blob` captured up to that
point available for you to use in your application.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("stop", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onstop = (event) => { }
```

## Event type

A generic `Event`.

## Example

```js
mediaRecorder.onstop = (e) => {
  console.log("data available after MediaRecorder.stop() called.");

  const audio = document.createElement("audio");
  audio.controls = true;
  const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
  const audioURL = window.URL.createObjectURL(blob);
  audio.src = audioURL;
  console.log("recorder stopped");
};

mediaRecorder.ondataavailable = (e) => {
  chunks.push(e.data);
};
```

## See also

- Using the MediaStream Recording API
- Web Dictaphone: MediaRecorder +
  getUserMedia + Web Audio API visualization demo, by Chris Mills (source on GitHub.)
- simpl.info MediaStream Recording demo, by Sam Dutton.
- `Navigator.getUserMedia`
