---
title: "MediaRecorderErrorEvent: error property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediarecordererrorevent/error/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaRecorderErrorEvent: error property

The **`error`** read-only property of the
`MediaRecorderErrorEvent` interface is a
`DOMException` object providing details about the exception that was thrown
by a `MediaRecorder` instance.

When a `MediaRecorderErrorEvent` occurs, you can determine to some extent
what went wrong by examining the `error` property within the
`MediaRecorderErrorEvent` received by the `MediaRecorder`'s
`error` event handler, `onerror`.

## Value

A `DOMException` describing the error represented by the event. The
error's `name` property's value may be any exception
that makes sense during the handling of media recording, including these specifically
identified by the specification. The descriptions here are generic ones; you'll find
more specific ones to various scenarios in which they may occur in the corresponding
method references.

- `InvalidStateError`
    An operation was attempted in a context in which it isn't allowed, or a request has
    been made on an object that's deleted or removed.
- `NotSupportedError`
    A `MediaRecorder` couldn't be created because the specified options
    weren't valid. The `message` attribute should provide additional
    information, if it exists.
- `SecurityError`
    The `MediaStream` is configured to disallow recording. This may be the
    case, for example, with sources obtained using `getUserMedia()` when the user denies permission to use an input device.
- `InvalidModificationError`
    The number of tracks on the stream being recorded has changed. You can't add or
    remove tracks while recording media.
- `UnknownError`
    A non-security related error occurred that cannot otherwise be categorized.
    Recording stops, the `MediaRecorder`'s `state` becomes `inactive`,
    one last `dataavailable` event is
    sent to the `MediaRecorder` with the remaining received data, and finally a
    `stop` event is sent.

## Examples

### Basic <example-value> example

This function creates and returns a `MediaRecorder` for a given
`MediaStream`, configured to buffer data into an array and to watch for
errors.

```js
function recordStream(stream) {
  let recorder = null;
  let bufferList = [];

  try {
    recorder = new MediaRecorder(stream);
  } catch (err) {
    /* exception while trying to create the recorder; handle that */
  }

  recorder.ondataavailable = (event) => {
    bufferList.push(event.data);
  };

  recorder.onerror = (event) => {
    console.error(`Error: ${event.error}`);
  };

  recorder.start(100); /* 100ms time slices per buffer */
  return recorder;
}
```

## Specifications

This feature is no longer part of any specification, and longer on track to become standard.

## See also

- MediaStream Recording API
- Using the MediaStream Recording API
