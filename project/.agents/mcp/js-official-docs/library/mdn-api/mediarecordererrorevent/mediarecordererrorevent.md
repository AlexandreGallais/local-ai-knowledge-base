---
title: "MediaRecorderErrorEvent: MediaRecorderErrorEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediarecordererrorevent/mediarecordererrorevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaRecorderErrorEvent: MediaRecorderErrorEvent() constructor

The
**`MediaRecorderErrorEvent()`** constructor creates a new `MediaRecorderErrorEvent` object
that represents an error that occurred during the recording of media
by the MediaStream Recording API.

> **Note:**
> In general, you won't create these yourself; they are delivered to your
> implementation of `onerror` when errors occur while
> recording media.

## Syntax

```js
new MediaRecorderErrorEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `error`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `error`
        A `DOMException` that describes the error that occurred. This
        object's `name` property should indicate the
        name of the error that occurred. The other fields may or may not be present.

> **Note:**
> Some user agents add to the `error` object
> other properties that provide information such as stack dumps, the name of the
> JavaScript file and the line number where the error occurred, and other debugging
> aids, but you should not rely on this information in a production environment.

### Return value

A new `MediaRecorderErrorEvent` object.

## Specifications

This feature is no longer part of any specification, and longer on track to become standard.
