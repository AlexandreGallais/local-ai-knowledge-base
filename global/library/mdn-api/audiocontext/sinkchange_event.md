---
title: "AudioContext: sinkchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiocontext/sinkchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioContext: sinkchange event

The **`sinkchange`** event of the `AudioContext` interface is fired when the output audio device (and therefore, the `AudioContext.sinkId`) has changed.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("sinkchange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onsinkchange = (event) => { }
```

## Event type

`Event`.

## Examples

A `sinkchange` event listener can be used to report a change of audio output device. Note that if `sinkId` contains an `AudioSinkInfo` object, it indicates that the audio has been changed to not play on any output device.

```js
audioCtx.addEventListener("sinkchange", () => {
  if (typeof audioCtx.sinkId === "object" && audioCtx.sinkId.type === "none") {
    console.log("Audio changed to not play on any device");
  } else {
    console.log(`Audio output device changed to ${audioCtx.sinkId}`);
  }
});
```

See our SetSinkId test example for working code (also check out the source code).

## See also

- Change the destination output device in Web Audio
- `AudioContext.setSinkId()`
- `AudioContext.sinkId`
