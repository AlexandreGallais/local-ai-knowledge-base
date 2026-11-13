---
title: "VideoTrack: language property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videotrack/language/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoTrack: language property

The read-only **`VideoTrack`**
property **`language`** returns a string identifying the
language used in the video track.

For tracks that include multiple languages
(such as a movie in English in which a few lines are spoken in other languages), this
should be the video's primary language.

## Value

A string specifying the BCP 47 language tag of
the primary language used in the video track, or an empty string (`""`) if
the language is not specified or known, or if the track doesn't contain speech.

For example, if the primary language used in the track is United States English, this
value would be `"en-US"`. For Brazilian Portuguese, the value would be
`"pt-BR"`.
