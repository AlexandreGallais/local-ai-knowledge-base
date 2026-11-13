---
title: "TrackEvent: TrackEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trackevent/trackevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrackEvent: TrackEvent() constructor

The **`TrackEvent()`** constructor
creates and returns a new `TrackEvent` object describing an event which
occurred on a list of tracks (`AudioTrackList`,
`VideoTrackList`, or `TextTrackList`).

## Syntax

```js
new TrackEvent(type)
new TrackEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `addtrack` or `removetrack`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `track` (optional)
        The track to which the event refers; this is `null` by default, but
        should be set to a `VideoTrack`, `AudioTrack`, or
        `TextTrack` as appropriate given the type of track.

### Return value

A new `TrackEvent` object, initialized as described by the
inputs to the constructor.
