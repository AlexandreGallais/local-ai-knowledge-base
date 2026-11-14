---
title: "TransitionEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/transitionevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TransitionEvent

The **`TransitionEvent`** interface represents events providing information related to transitions.

## Constructor

- `TransitionEvent()`
    Creates a `TransitionEvent` event with the given parameters.

## Instance properties

_Also inherits properties from its parent `Event`_.

- `TransitionEvent.animation` (read-only)
    A `CSSTransition` read-only property containing the animation associated with the event.
- `TransitionEvent.propertyName` (read-only)
    A string containing the name CSS property associated with the transition.
- `TransitionEvent.elapsedTime` (read-only)
    A `float` giving the amount of time the transition has been running, in seconds, when this event fired. This value is not affected by the `transition-delay` property.
- `TransitionEvent.pseudoElement` (read-only)
    A string, starting with `::`, containing the name of the pseudo-element the animation runs on. If the transition doesn't run on a pseudo-element but on the element, an empty string: `''`.

## Types of `TransitionEvent`

- `transitioncancel`
    An `Event` fired when a CSS transition has been canceled.
- `transitionend`
    An `Event` fired when a CSS transition has finished playing.
- `transitionrun`
    An `Event` fired when a CSS transition is created (i.e., when it is added to a set of running transitions), though not necessarily started.
- `transitionstart`
    An `Event` fired when a CSS transition has started transitioning.

## Instance methods

_Also inherits methods from its parent `Event`_.

## See also

- Using CSS transitions
- CSS properties: `transition`, `transition-delay`, `transition-duration`, `transition-property`, `transition-timing-function`
- CSS at-rules: `@starting-style`
