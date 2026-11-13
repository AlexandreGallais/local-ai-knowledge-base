---
title: "MediaRecorder: state property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediarecorder/state/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaRecorder: state property

The **`state`** read-only property of the `MediaRecorder` interface returns the current state of the current `MediaRecorder` object.

## Value

A string containing one of the following values:

- `inactive`
    Recording is not occurring — it has either not been started yet, or it has been started and then stopped.
- `recording`
    Recording has been started and the user agent is capturing data.
- `paused`
    Recording has been started, then paused, but not yet stopped or resumed.

## Examples

```js
record.onclick = () => {
  mediaRecorder.start();
  console.log(mediaRecorder.state);
  // Will return "recording"
  console.log("recorder started");
};
```

## See also

- Using the MediaStream Recording API
- Web Dictaphone: MediaRecorder +
  getUserMedia + Web Audio API visualization demo, by Chris Mills (source on GitHub.)
- simpl.info MediaStream Recording demo, by Sam Dutton.
- `Navigator.getUserMedia()`
