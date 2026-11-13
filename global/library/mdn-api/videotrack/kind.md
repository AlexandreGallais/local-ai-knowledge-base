---
title: "VideoTrack: kind property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videotrack/kind/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoTrack: kind property

The **`kind`** read-only property of the `VideoTrack` interface contains a string indicating the category of video contained in the **`VideoTrack`**.

The `kind` can be used
to determine the scenarios in which specific tracks should be enabled or disabled. See
Video track kind strings for a list of the kinds available for video tracks.

## Value

A string specifying the type of content the media represents. The
string is one of those found in Video track kind strings below.

## Video track kind strings

The kinds available for video tracks are:

- `"alternative"`
    A potential alternative to the main track, such as a different video take or a
    version of the soundtrack with only the music and no dialogue.
- `"captions"`
    A version of the main video track with captions burned in.
- `"main"`
    The primary video track.
- `"sign"`
    A sign-language interpretation of an audio track.
- `"subtitles"`
    A version of the main video track with subtitles burned in.
- `"commentary"`
    A video track containing a commentary. This might be used to contain the director's
    commentary track on a movie, for example.
- `""` (empty string)
    The track doesn't have an explicit kind, or the kind provided by the track's
    metadata isn't recognized by the user agent.
