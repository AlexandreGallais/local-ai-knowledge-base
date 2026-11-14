---
title: "MediaRecorder: resume() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediarecorder/resume/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaRecorder: resume() method

The **`resume()`** method of the `MediaRecorder` interface is used to resume media recording when it has been previously paused.

If `MediaRecorder.state` is already "recording", calling `resume()` has no effect.

When the `resume()` method is invoked, the browser queues a task that runs
the following steps:

1. If `MediaRecorder.state` is "inactive", raise a DOM
   `InvalidStateError` exception and terminate these steps. If
   `MediaRecorder.state` is not "inactive", continue to the next step.
2. Set `MediaRecorder.state` to "recording".
3. Continue gathering data into the current `Blob`.
4. Raise a `resume` event.

## Syntax

```js
resume()
```

### Parameters

None.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the `MediaRecorder` is currently `"inactive"`.

## Examples

```js
pause.onclick = () => {
  if (MediaRecorder.state === "recording") {
    mediaRecorder.pause();
    // recording paused
  } else if (MediaRecorder.state === "paused") {
    mediaRecorder.resume();
    // resume recording
  }
};
```

## See also

- Using the MediaStream Recording API
- Web Dictaphone: MediaRecorder +
  getUserMedia + Web Audio API visualization demo, by Chris Mills (source on GitHub.)
- simpl.info MediaStream Recording demo, by Sam Dutton.
- `Navigator.getUserMedia`
