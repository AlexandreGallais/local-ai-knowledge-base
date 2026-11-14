---
title: "AnimationPlaybackEvent: timelineTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/animationplaybackevent/timelinetime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AnimationPlaybackEvent: timelineTime property

The **`timelineTime`** read-only property of the `AnimationPlaybackEvent` interface represents the time value of the animation's `timeline` at the moment the event is queued. This will be unresolved if the animation was not associated with a timeline at the time the event was generated or if the associated timeline was inactive.

## Value

A number representing the current time in milliseconds, or `null`.

## See also

- Web Animations API
- `AnimationPlayBackEvent`
- `AnimationTimeline`
