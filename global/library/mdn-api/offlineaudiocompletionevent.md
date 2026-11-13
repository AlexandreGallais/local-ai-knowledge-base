---
title: "OfflineAudioCompletionEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/offlineaudiocompletionevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OfflineAudioCompletionEvent

The Web Audio API `OfflineAudioCompletionEvent` interface represents events that occur when the processing of an `OfflineAudioContext` is terminated. The `complete` event uses this interface.

> **Note:**
> This interface is marked as deprecated; it is still supported for legacy reasons, but it will soon be superseded when the promise version of `OfflineAudioContext.startRendering` is supported in browsers, which will no longer need it.

## Constructor

- `OfflineAudioCompletionEvent()`
    Creates a new `OfflineAudioCompletionEvent` object instance.

## Instance properties

_Also inherits properties from its parent, `Event`_.

- `OfflineAudioCompletionEvent.renderedBuffer` (read-only)
    An `AudioBuffer` containing the result of processing an `OfflineAudioContext`.

## Instance methods

_Inherits methods from its parent, `Event`_.

## See also

- Using the Web Audio API
