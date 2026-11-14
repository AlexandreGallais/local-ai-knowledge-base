---
title: "MediaRecorder: error event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediarecorder/error_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaRecorder: error event

The **`error`** event of the `MediaRecorder` interface is fired when an error occurs: for example because recording wasn't allowed or was attempted using an unsupported codec.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("error", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onerror = (event) => { }
```

## Event type

A `MediaRecorderErrorEvent`. Inherits from `Event`.

## Description

### Trigger

A function to be called whenever an error occurs during the recorder's lifetime. In
addition to other general errors that might occur, the following errors are specifically
possible when using the MediaStream Recording API; to determine which occurred, check
the value of `MediaRecorderErrorEvent.error.name`.

- `SecurityError`
    The `MediaStream` is configured to disallow recording. This may be the
    case, for example, with sources obtained using `getUserMedia()` when the user denies permission to use an input device.
- `InvalidModificationError`
    The number of tracks on the stream being recorded has changed. You can't add or
    remove tracks while recording media.
- `UnknownError`
    A non-security related error occurred that cannot otherwise be categorized.
    Recording stops, the `MediaRecorder`'s `state` becomes `inactive`, one last `dataavailable` event is sent to the `MediaRecorder` with the remaining received data, and finally a `stop` event is sent.

## Examples

Using `addEventListener()` to listen for `error` events:

```js
async function record() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const recorder = new MediaRecorder(stream);
  recorder.addEventListener("error", (event) => {
    console.error(`error recording stream: ${event.error.name}`);
  });
  recorder.start();
}

record();
```

The same, but using the `onerror` event handler property (but note that this replaces other event listeners added using `onerror`, if any):

```js
async function record() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const recorder = new MediaRecorder(stream);
  recorder.onerror = (event) => {
    console.error(`error recording stream: ${event.error.name}`);
  };
  recorder.start();
}

record();
```

## See also

- Using the MediaStream Recording API
