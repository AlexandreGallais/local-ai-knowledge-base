---
title: "HTMLMediaElement: setMediaKeys() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/setmediakeys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: setMediaKeys() method

The **`setMediaKeys()`** method of the `HTMLMediaElement` interface sets the `MediaKeys` that will be used to decrypt media during playback.

It returns a `Promise` that fulfills if the new keys are successfully set, or rejects if keys cannot be set.

## Syntax

```js
setMediaKeys(mediaKeys)
```

### Parameters

- `mediaKeys`
    A `MediaKeys` object that the `HTMLMediaElement` can use for decryption of media data during playback.

### Return value

A `Promise` that fulfills with `undefined`.

### Exceptions

The returned promise may reject an error:

- `InvalidStateError` `DOMException`
    Media keys are already in the process of being attached, or the previous keys cannot be removed at the current time (for example, because the particular implementation does not allow removal during playback).
- `QuotaExceededError`
    The passed keys are already in use by another element, or the browser is unable to use it with this element for other reasons.
- `NotSupportedError` `DOMException`
    The media keys that are currently associated with the media cannot be disassociated, because this is not supported by either the CDM or the browser.
