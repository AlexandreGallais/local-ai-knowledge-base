---
title: "MediaRecorder: pause() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediarecorder/pause/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaRecorder: pause() method

The **`pause()`** method of the `MediaRecorder` interface is used
to pause recording of media streams.

When a `MediaRecorder` object's `pause()` method is called, the
browser queues a task that runs the below steps:

1. If `MediaRecorder.state` is "inactive", raise a DOM
   `InvalidState` error and terminate these steps. If not, continue to the
   next step.
2. Set `MediaRecorder.state` to "paused".
3. Stop gathering data into the current `Blob`, but keep it available so
   that recording can be resumed later on.
4. Raise a `pause` event.

## Syntax

```js
pause()
```

### Parameters

None.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the `MediaRecorder` is currently `"inactive"`; you cannot pause
    the recording if the `MediaRecorder` is not active. If you call `pause()` while already paused,
    the method silently does nothing.

## Examples

```js
pause.onclick = () => {
  mediaRecorder.pause();
  console.log("recording paused");
};
```

## See also

- Using the MediaStream Recording API
- Web Dictaphone: MediaRecorder +
  getUserMedia + Web Audio API visualization demo, by Chris Mills (source on GitHub.)
- simpl.info MediaStream Recording demo, by Sam Dutton.
- `Navigator.getUserMedia`
