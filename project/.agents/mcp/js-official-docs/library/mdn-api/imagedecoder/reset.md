---
title: "ImageDecoder: reset() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagedecoder/reset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageDecoder: reset() method

The **`reset()`** method of the `ImageDecoder` interface aborts all pending `decode()` operations; rejecting all pending promises. All other state will be unchanged. Class methods can continue to be invoked after `reset()`. E.g., calling `decode()` after `reset()` is permitted.

## Syntax

```js
reset()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

The following example resets the `ImageDecoder`.

```js
for (let i = 0; i < imageDecoder.tracks.selectedTrack.frameCount; ++i)
  imageDecoder.decode({ frameIndex: i }).catch(console.log);
imageDecoder.reset();
imageDecoder.decode({ frameIndex: 0 }).then(console.log);
```
