---
title: "MediaRecorder: requestData() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediarecorder/requestdata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaRecorder: requestData() method

The **`requestData()`**
method of the `MediaRecorder` interface is used to raise a `dataavailable` event containing a
`Blob` object of the captured media as it was when the method was
called. This can then be grabbed and manipulated as you wish.

When the `requestData()` method is invoked, the browser queues a task that
runs the following steps:

1. If `MediaRecorder.state` is "inactive", raise a DOM
   `InvalidState` error and terminate these steps. If
   `MediaRecorder.state` is not "inactive", continue to the next step.
2. Raise a `dataavailable` event containing a `Blob` of the
   currently captured data (the Blob is available under the event's `data`
   attribute.)
3. Create a new Blob and place subsequently captured data into it.

## Syntax

```js
requestData()
```

### Parameters

None.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the `MediaRecorder` is currently `"inactive"`; you cannot capture
    the recording if the `MediaRecorder` is not active.

## Examples

```js
captureMedia.onclick = () => {
  mediaRecorder.requestData();
  // makes snapshot available of data so far
  // ondataavailable fires, then capturing continues
  // in new Blob
};
```

## See also

- Using the MediaStream Recording API
- Web Dictaphone: MediaRecorder +
  getUserMedia + Web Audio API visualization demo, by Chris Mills (source on GitHub.)
- simpl.info MediaStream Recording demo, by Sam Dutton.
- `Navigator.getUserMedia()`
