---
title: "AudioTrack: kind property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiotrack/kind/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioTrack: kind property

The **`kind`** read-only property of the `AudioTrack` interface contains a string indicating the category of audio contained in the **`AudioTrack`**.

The `kind` can be used
to determine the scenarios in which specific tracks should be enabled or disabled. See
Audio track kind strings for a list of the kinds available for audio tracks.

## Value

A string specifying the type of content the media represents. The
string is one of those found in Audio track kind strings below.

## Audio track kind strings

The kinds available for audio tracks are:

- `"alternative"`
    A potential alternative to the main track, such as a different audio take or a
    version of the soundtrack with only the music and no dialogue.
- `"descriptions"`
    An audio track providing audible descriptions of the action depicted in a video
    track.
- `"main"`
    The primary audio track.
- `"main-desc"`
    The primary audio track with audio descriptions mixed into it.
- `"translation"`
    A translated version of the primary audio track.
- `"commentary"`
    An audio track containing a commentary. This might be used to contain the director's
    commentary track on a movie, for example.
- `""` (empty string)
    The track doesn't have an explicit kind, or the kind provided by the track's
    metadata isn't recognized by the user agent.
