---
title: "MediaRecorder: start event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediarecorder/start_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaRecorder: start event

The **`start`** event of the `MediaRecorder` interface is fired when
`MediaRecorder.start()` is called. At this point, the data
starts being gathered into a `Blob`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("start", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onstart = (event) => { }
```

## Event type

A generic `Event`.

## Example

```js
record.onclick = () => {
  mediaRecorder.start();
  console.log("recorder started");
};

mediaRecorder.onstart = () => {
  // do something in response to
  // recording being started
};
```

## See also

- Using the MediaStream Recording API
- Web Dictaphone: MediaRecorder +
  getUserMedia + Web Audio API visualization demo, by Chris Mills (source on GitHub.)
- simpl.info MediaStream Recording demo, by Sam Dutton.
- `Navigator.getUserMedia`
