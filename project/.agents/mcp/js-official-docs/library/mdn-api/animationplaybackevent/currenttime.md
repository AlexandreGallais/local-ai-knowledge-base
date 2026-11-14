---
title: "AnimationPlaybackEvent: currentTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/animationplaybackevent/currenttime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AnimationPlaybackEvent: currentTime property

The **`currentTime`** read-only property of the `AnimationPlaybackEvent` interface represents the current time of the animation that generated the event at the moment the event is queued. For browser-generated `cancel` events, the value is `null`.

## Value

A number representing the current time in milliseconds, or `null`.

When a value is supplied to the `AnimationPlaybackEvent()` constructor, Chrome and Firefox do not apply timer rounding to the returned value. In Safari, the browser rounds the returned value to 0.001 ms, the resolution used to represent animation times.

For browser-generated `finish` and `remove` events, this property inherits the value and precision of `Animation.currentTime` when the event is queued, without introducing additional inaccuracy.

## See also

- Web Animations API
- `AnimationPlayBackEvent`
