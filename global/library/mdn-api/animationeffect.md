---
title: "AnimationEffect"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/animationeffect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AnimationEffect

The `AnimationEffect` interface of the Web Animations API is an interface representing animation effects.

`AnimationEffect` is an abstract interface and so isn't directly instantiable. However, concrete interfaces such as `KeyframeEffect` inherit from it, and instances of these interfaces can be passed to `Animation` objects for playing, and may also be used by CSS Animations and Transitions.

## Instance methods

- `AnimationEffect.getTiming()`
    Returns the object associated with the animation containing all the animation's timing values.
- `AnimationEffect.getComputedTiming()`
    Returns the calculated timing properties for this `AnimationEffect`.
- `AnimationEffect.updateTiming()`
    Updates the specified timing properties of this `AnimationEffect`.

## See also

- Web Animations API
- `Animation.effect`
