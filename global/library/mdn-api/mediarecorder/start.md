---
title: "MediaRecorder: start() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediarecorder/start/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaRecorder: start() method

The **`start()`** method of the `MediaRecorder` interface begins recording media into one or more `Blob` objects.

You can
record the entire duration of the media into a single `Blob` (or until you
call `requestData()`), or you can specify the
number of milliseconds to record at a time. Then, each time that amount of media has
been recorded, an event will be delivered to let you act upon the recorded media, while
a new `Blob` is created to record the next slice of the media.

Assuming the `MediaRecorder`'s `state`
is `inactive`, `start()` sets the `state` to
`recording`, then begins capturing media from the input stream. A
`Blob` is created and the data is collected in it until the time slice period
elapses or the source media ends. Each time a `Blob` is filled up to that
point (the timeslice duration or the end-of-media, if no slice duration was provided), a
`dataavailable` event is sent to the `MediaRecorder` with the
recorded data. If the source is still playing, a new `Blob` is created and
recording continues into that, and so forth.

When the source stream ends, `state` is set to `inactive` and
data gathering stops. A final `dataavailable` event is sent to the
`MediaRecorder`, followed by a `stop` event.

> **Note:**
> If the browser is unable to start recording or continue
> recording, it will raise an `error` event, followed by a
> `dataavailable` event containing the `Blob` it
> has gathered, followed by the `stop` event.

## Syntax

```js
start()
start(timeslice)
```

### Parameters

- `timeslice` (optional)
    The number of milliseconds to record into each `Blob`. If this
    parameter isn't included, the entire media duration is recorded into a single
    `Blob` unless the `requestData()`
    method is called to obtain the `Blob` and trigger the creation of a new
    `Blob` into which the media continues to be recorded.

    > **Note:**
    > Like other time values in web APIs, `timeslice` is not exact and the real intervals may be slightly longer due to other pending tasks before the creation of the next blob.

### Return value

None (`undefined`).

### Exceptions

Errors that can be detected immediately are thrown as DOM exceptions. All other errors
are reported through `error` events sent to the `MediaRecorder`
object. You can implement the `onerror` event
handler to respond to these errors.

- `InvalidStateError` `DOMException`
    Thrown if the `MediaRecorder` is not in the `inactive` state; you cannot
    start recording media if it is already being recorded. See the
    `state` property.
- `NotSupportedError` `DOMException`
    Thrown if:
    - The media stream you are attempting to record is inactive.
    - One or more of the stream's tracks is in a format that cannot be recorded using the current configuration
    - The `videoKeyFrameIntervalDuration` and `videoKeyFrameIntervalCount` parameter are both specified when creating the `MediaRecorder`.
- `SecurityError` `DOMException`
    Thrown if the `MediaStream` is configured to disallow recording. This may be the
    case, for example, with sources obtained using `getUserMedia()` when the user denies permission to use an input device. This
    exception may also be delivered as an `error` event if
    the security options for the source media change after recording begins.

## Examples

```js
record.onclick = () => {
  mediaRecorder.start();
  console.log("recorder started");
};
```

## See also

- Using the MediaStream Recording API
- Web Dictaphone: MediaRecorder +
  getUserMedia + Web Audio API visualization demo, by Chris Mills (source on GitHub.)
- simpl.info MediaStream Recording demo, by Sam Dutton.
- `getUserMedia()`
