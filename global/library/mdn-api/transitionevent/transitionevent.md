---
title: "TransitionEvent: TransitionEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/transitionevent/transitionevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TransitionEvent: TransitionEvent() constructor

The **`TransitionEvent()`** constructor returns a new `TransitionEvent` object, representing an event in relation with a transition.

## Syntax

```js
new TransitionEvent(type)
new TransitionEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `transitionrun`, `transitionstart`, `transitionend`, or `transitioncancel`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `animation` (optional)
        A `CSSTransition` representing the animation associated with the event.
        It defaults to `null`.
    - `propertyName` (optional)
        A string containing the name of the CSS property associated with the transition.
        It defaults to `""`.
    - `elapsedTime` (optional)
        A number giving the amount of time the animation has been running,
        in seconds, when this event fired, excluding any time the animation was paused.
        For an `"animationstart"` event, `elapsedTime` is `0.0` unless there was a negative value for `animation-delay`,
        in which case the event will be fired with `elapsedTime` containing `(-1 * delay)`.
        It defaults to `0.0`.
    - `pseudoElement` (optional)
        A string, defaulting with `"::"`, containing the name of the pseudo-element the animation runs on.
        If the animation doesn't run on a pseudo-element but on the element, an empty string: `""`.
        It defaults to `""`.

### Return value

A new `TransitionEvent` object.

## See also

- Using CSS transitions
- CSS properties: `transition`, `transition-delay`,
  `transition-duration`, `transition-property`,
  `transition-timing-function`.
