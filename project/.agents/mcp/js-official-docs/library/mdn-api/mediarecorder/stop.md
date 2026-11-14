---
title: "MediaRecorder: stop() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediarecorder/stop/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaRecorder: stop() method

The **`stop()`** method of the `MediaRecorder` interface is
used to stop media capture.

When the `stop()` method is invoked, the UA queues a task that runs the
following steps:

1. If `MediaRecorder.state` is "inactive", raise a DOM
   `InvalidState` error and terminate these steps. If the
   `MediaRecorder.state` is not "inactive", continue on to the next step.
2. Set the `MediaRecorder.state` to "inactive" and stop capturing media.
3. Raise a `dataavailable` event containing the Blob of data that has been
   gathered.
4. Raise a `stop` event.

## Syntax

```js
stop()
```

### Parameters

None.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the `MediaRecorder` is currently `"inactive"`; you cannot stop
    the recording if the `MediaRecorder` is not active.

## Examples

```js
stop.onclick = () => {
  mediaRecorder.stop();
  console.log("recorder stopped, data available");
};
```

## See also

- Using the MediaStream Recording API
- Web Dictaphone: MediaRecorder +
  getUserMedia + Web Audio API visualization demo, by Chris Mills (source on GitHub.)
- simpl.info MediaStream Recording demo, by Sam Dutton.
- `Navigator.getUserMedia`
