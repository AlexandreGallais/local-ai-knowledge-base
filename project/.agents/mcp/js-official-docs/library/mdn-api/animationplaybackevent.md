---
title: "AnimationPlaybackEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/animationplaybackevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AnimationPlaybackEvent

The AnimationPlaybackEvent interface of the Web Animations API represents animation events.

As animations play, they report changes to their `playState` through animation events.

## Constructor

- `AnimationPlaybackEvent()`
    Constructs a new `AnimationPlaybackEvent` object instance.

## Instance properties

- `AnimationPlaybackEvent.currentTime` (read-only)
    The current time of the animation that generated the event.
- `AnimationPlaybackEvent.timelineTime` (read-only)
    The time value of the timeline of the animation that generated the event.

## See also

- Web Animations API
- `Animation.playState`
