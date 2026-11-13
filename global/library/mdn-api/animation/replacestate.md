---
title: "Animation: replaceState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/animation/replacestate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Animation: replaceState property

The read-only **`Animation.replaceState`** property of the Web Animations API indicates whether the animation has been removed by the browser automatically after being replaced by another animation.

## Value

A string that represents the replace state of the animation. The value can be one of:

- `active`
    The initial value of the animation's replace state when the animation is created.
- `persisted`
    The animation has been explicitly persisted by invoking `Animation.persist()` on it.
- `removed`
    The animation has been removed by the browser automatically.

## See also

- Web Animations API
- `Animation`
- `remove` event
- `Animation.persist()`
