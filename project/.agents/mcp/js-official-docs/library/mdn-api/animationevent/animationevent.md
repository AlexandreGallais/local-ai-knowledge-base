---
title: "AnimationEvent: AnimationEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/animationevent/animationevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AnimationEvent: AnimationEvent() constructor

The **`AnimationEvent()`** constructor returns a new `AnimationEvent` object, representing an event in relation with an animation.

## Syntax

```js
new AnimationEvent(type)
new AnimationEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the type of the `AnimationEvent`.
    It is case-sensitive and browsers set it to `animationstart`, `animationend`, or `animationiteration`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, has the following properties:
    - `animation` (optional)
        A `CSSAnimation` containing the animation associated with the event.
        It defaults to `null`.
    - `animationName` (optional)
        A string containing the value of the `animation-name` CSS property associated with the transition. It defaults to `""`.
    - `elapsedTime` (optional)
        A `float` giving the amount of time the animation has been running, in seconds, when this event fired, excluding any time the animation was paused.
        For an `animationstart` event, `elapsedTime` is `0.0` unless there was a negative value for `animation-delay`,
        in which case the event will be fired with `elapsedTime` containing `(-1 * delay)`. It defaults to `0.0`.
    - `pseudoElement` (optional)
        A string, starting with `"::"`, containing the name of the pseudo-element the animation runs on. If the animation doesn't run on a pseudo-element but on the element itself, specify an empty string: `""`. It defaults to `""`.

## See also

- Using CSS animations
- Animation-related CSS properties and at-rules: `animation`,
  `animation-delay`, `animation-direction`,
  `animation-duration`, `animation-fill-mode`,
  `animation-iteration-count`, `animation-name`,
  `animation-play-state`, `animation-timing-function`,
  `@keyframes`
- The `AnimationEvent` interface it belongs to.
