---
title: "Animation: cancel event"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/animation/cancel_event/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# Animation: cancel event

The **`cancel`** event of the `Animation` interface is fired when the `Animation.cancel()` method is called or when the animation enters the `"idle"` play state from another state, such as when the animation is removed from an element before it finishes playing.

> **Note:**
> Creating a new animation that is initially idle does not trigger a `cancel` event on the new animation.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("cancel", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oncancel = (event) => { }
```

## Event type

An `AnimationPlaybackEvent`. Inherits from `Event`.

## Examples

If this animation is canceled, remove its element.

```js
animation.oncancel = (event) => {
  animation.effect.target.remove();
};
```

## See also

- Web Animations API
- `Animation`
