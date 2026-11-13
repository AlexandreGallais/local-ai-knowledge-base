---
title: "Animation: cancel() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/animation/cancel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Animation: cancel() method

The Web Animations API's **`cancel()`** method of the `Animation` interface clears all `KeyframeEffect`s caused by this animation and aborts its playback.

> **Note:**
> When an animation is canceled, its `startTime` and `currentTime` are set to `null`.

## Syntax

```js
cancel()
```

### Parameters

None.

### Return value

None (`undefined`).

### Exceptions

This method doesn't directly throw exceptions; however, if the animation's `playState` is anything but `"idle"` when canceled, the `current finished promise` is rejected with a `DOMException` named `AbortError`.

## See also

- Web Animations API
- `KeyframeEffect`
- `Animation`
- `Animation.playState`
- `Animation.finished` returns the promise this action will reject if the animation's `playState` is not `"idle"`.
