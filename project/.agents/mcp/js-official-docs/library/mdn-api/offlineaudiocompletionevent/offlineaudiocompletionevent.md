---
title: "OfflineAudioCompletionEvent: OfflineAudioCompletionEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/offlineaudiocompletionevent/offlineaudiocompletionevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OfflineAudioCompletionEvent: OfflineAudioCompletionEvent() constructor

The **`OfflineAudioCompletionEvent()`** constructor of the Web Audio API creates a new
`OfflineAudioCompletionEvent` object.

> **Note:**
> You wouldn't generally use the constructor manually.
> `OfflineAudioCompletionEvent` events are dispatched to
> `OfflineAudioContext` instances for legacy reasons.

## Syntax

```js
new OfflineAudioCompletionEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `complete`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `renderedBuffer`
        The rendered `AudioBuffer` containing the audio data.

### Return value

A new `OfflineAudioCompletionEvent` object.
