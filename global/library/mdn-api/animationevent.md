---
title: "AnimationEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/animationevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AnimationEvent

The **`AnimationEvent`** interface represents events providing information related to animations.

## Constructor

- `AnimationEvent()`
    Creates an `AnimationEvent` event with the given parameters.

## Instance properties

_Also inherits properties from its parent `Event`_.

- `AnimationEvent.animation` (read-only)
    A `CSSAnimation` read-only property representing the animation associated with the event.
- `AnimationEvent.animationName` (read-only)
    A string containing the value of the `animation-name` that generated the animation.
- `AnimationEvent.elapsedTime` (read-only)
    A `float` giving the amount of time the animation has been running, in seconds, when this event fired, excluding any time the animation was paused. For an `animationstart` event, `elapsedTime` is `0.0` unless there was a negative value for `animation-delay`, in which case the event will be fired with `elapsedTime` containing `(-1 * delay)`.
- `AnimationEvent.pseudoElement` (read-only)
    A string, starting with `'::'`, containing the name of the pseudo-element the animation runs on. If the animation doesn't run on a pseudo-element but on the element, an empty string: `''`.

## Instance methods

_Inherits methods from its parent, `Event`_.

## See also

- Using CSS animations
- Animation-related CSS properties and at-rules: `animation`, `animation-composition`, `animation-delay`, `animation-direction`, `animation-duration`, `animation-fill-mode`, `animation-iteration-count`, `animation-name`, `animation-play-state`, `animation-timing-function`, `@keyframes`.
