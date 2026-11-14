---
title: "TextTrackCue"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/texttrackcue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextTrackCue

The **`TextTrackCue`** interface of the WebVTT API is the abstract base class for the various derived cue types, such as `VTTCue` and `DataCue`; you will work with these derived types rather than the base class.

These cues represent strings of text presented for some duration of time during the performance of a `TextTrack`. The cue includes the start time (the time at which the text will be displayed) and the end time (the time at which it will be removed from the display), as well as other information.

## Instance properties

_This interface also inherits properties from `EventTarget`._

- `TextTrackCue.track` (read-only)
    The `TextTrack` that this cue belongs to, or `null` if it doesn't belong to any.
- `TextTrackCue.id`
    A string that identifies the cue.
- `TextTrackCue.startTime`
    A `double` that represents the video time that the cue will start being displayed, in seconds.
- `TextTrackCue.endTime`
    A `double` that represents the video time that the cue will stop being displayed, in seconds.
- `TextTrackCue.pauseOnExit`
    A `boolean` for whether the video will pause when this cue stops being displayed.

## Events

- `enter`
    Fired when a cue becomes active.
- `exit`
    Fired when the cue has stopped being active.
