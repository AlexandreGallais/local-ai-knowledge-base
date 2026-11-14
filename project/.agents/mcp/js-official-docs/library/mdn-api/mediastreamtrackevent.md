---
title: "MediaStreamTrackEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamtrackevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamTrackEvent

The **`MediaStreamTrackEvent`** interface of the `Media Capture and Streams API` represents events which indicate that a `MediaStream` has had tracks added to or removed from the stream through calls to Media Capture and Streams API methods. These events are sent to the stream when these changes occur.

The events based on this interface are `addtrack` and `removetrack`.

## Constructor

- `MediaStreamTrackEvent()`
    Constructs a new `MediaStreamTrackEvent` with the specified configuration.

## Instance properties

_Also inherits properties from its parent interface, `Event`._

- `MediaStreamTrackEvent.track` (read-only)
    Returns a `MediaStreamTrack` object representing the track associated with the event.

## Instance methods

_Also inherits methods from its parent interface, `Event`._

## See also

- `MediaStream`: `addtrack` and `removetrack` events
- `MediaStreamTrack`
- Media Capture and Streams API
