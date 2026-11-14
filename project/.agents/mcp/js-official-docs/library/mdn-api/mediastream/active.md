---
title: "MediaStream: active property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastream/active/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStream: active property

The **`active`** read-only property of the
`MediaStream` interface returns a Boolean value which is
`true` if the stream is currently active; otherwise, it returns
`false`. A stream is considered **active** if at least one of
its `MediaStreamTrack`s does not have its property `MediaStreamTrack.readyState`
set to `ended`. Once every track has ended, the stream's `active` property becomes
`false`.

## Value

A Boolean value which is `true` if the stream is currently active;
otherwise, the value is `false`.

## Examples

In this example, a new stream whose source is the user's local camera and microphone is
requested using `getUserMedia()`. When that
stream becomes available (that is, when the returned `Promise` is fulfilled),
a button on the page is updated based on whether or not the stream is currently active.

```js
const promise = navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true,
});

promise.then((stream) => {
  const startBtn = document.querySelector("#startBtn");
  startBtn.disabled = stream.active;
});
```
