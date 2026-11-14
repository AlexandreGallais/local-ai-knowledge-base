---
title: "AudioSinkInfo"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiosinkinfo/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioSinkInfo

The **`AudioSinkInfo`** interface of the `Web Audio API` represents information describing an `AudioContext`'s sink ID, retrieved via `AudioContext.sinkId`.

## Instance properties

- `type` (read-only) (experimental)
    Returns the type of the audio output device.

## Examples

If a new `AudioContext` is created with a `sinkId` value of `{ type: 'none' }`, calling `AudioContext.sinkId` later in the code will return an `AudioSinkInfo` object containing `type: 'none'`. This is currently the only value available.

```js
audioCtx = new window.AudioContext({
  sinkId: { type: "none" },
});

// …

audioCtx.sinkId;
```

## See also

- SetSinkId test example (check out the source code)
- `AudioContext.setSinkId()`
- `AudioContext.sinkId`
- `sinkchange`
