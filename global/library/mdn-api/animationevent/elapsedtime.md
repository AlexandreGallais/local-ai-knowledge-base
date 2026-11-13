---
title: "AnimationEvent: elapsedTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/animationevent/elapsedtime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AnimationEvent: elapsedTime property

The **`AnimationEvent.elapsedTime`** read-only property is a
`float` giving the amount of time the animation has been running, in seconds,
when this event fired, excluding any time the animation was paused. For an
`animationstart` event,
`elapsedTime` is `0.0` unless there was a negative value for
`animation-delay`, in which case the event will be fired with
`elapsedTime` containing `(-1 * delay)`.

## Value

A `float` giving the amount of time in seconds.

## See also

- Using CSS animations
- Animation-related CSS properties and at-rules: `animation`,
  `animation-delay`, `animation-direction`,
  `animation-duration`, `animation-fill-mode`,
  `animation-iteration-count`, `animation-name`,
  `animation-play-state`, `animation-timing-function`,
  `@keyframes`.
- The `AnimationEvent` interface it belongs to.
