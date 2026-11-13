---
title: "MediaRecorder: stream property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediarecorder/stream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaRecorder: stream property

The **`stream`** read-only property of the `MediaRecorder` interface returns the stream that was passed into the `MediaRecorder()` constructor when the `MediaRecorder` was created.

## Value

The `MediaStream` passed into the `MediaRecorder()` constructor when the `MediaRecorder` was originally created.

## Examples

```js
if (navigator.getUserMedia) {
  console.log("getUserMedia supported.");
  navigator.getUserMedia(
    // constraints - only audio needed for this app
    {
      audio: true,
    },

    // Success callback
    (stream) => {
      const mediaRecorder = new MediaRecorder(stream);

      const myStream = mediaRecorder.stream;
      console.log(myStream);
    },
  );
}
```

## See also

- Using the MediaStream Recording API
- Web Dictaphone: MediaRecorder +
  getUserMedia + Web Audio API visualization demo, by Chris Mills (source on GitHub.)
- simpl.info MediaStream Recording demo, by Sam Dutton.
- `Navigator.getUserMedia`
