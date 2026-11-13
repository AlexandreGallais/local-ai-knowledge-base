---
title: "MediaStreamTrackEvent: MediaStreamTrackEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamtrackevent/mediastreamtrackevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamTrackEvent: MediaStreamTrackEvent() constructor

The **`MediaStreamTrackEvent()`** constructor returns a new `MediaStreamTrackEvent` object,
which represents an event signaling that a `MediaStreamTrack` has been added to or removed from a `MediaStream`.

## Syntax

```js
new MediaStreamTrackEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `addtrack` or `removetrack`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `track`
        A `MediaStreamTrack` object representing the track which was added to or removed from the stream.

### Return value

A new `MediaStreamTrackEvent` object, initialized based on the provided options.

## See also

- `addtrack` and `removetrack` events
- `MediaStreamTrack`
- `MediaStream`
- Media Capture and Streams API
