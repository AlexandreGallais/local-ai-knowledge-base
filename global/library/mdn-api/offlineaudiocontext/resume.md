---
title: "OfflineAudioContext: resume() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/offlineaudiocontext/resume/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OfflineAudioContext: resume() method

The **`resume()`** method of the
`OfflineAudioContext` interface resumes the progression of time in an audio
context that has been suspended. The promise resolves immediately because the
`OfflineAudioContext` does not require the audio hardware.

## Syntax

```js
resume()
```

### Parameters

None.

### Return value

A `Promise` resolving to `undefined`.

### Exceptions

The promise is rejected when an exception is encountered.

- `InvalidStateError` `DOMException`
    Returned if the context is not currently suspended or the rendering has not started.
