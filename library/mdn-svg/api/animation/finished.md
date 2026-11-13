---
title: "Animation: finished property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/animation/finished/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# Animation: finished property

The **`Animation.finished`** read-only property of the Web Animations API returns a `Promise` which resolves once the animation has finished playing.

> **Note:**
> Every time the animation leaves the `finished` play state (that is, when it starts playing again), a new `Promise` is created for this property. The new `Promise` will resolve once the new animation sequence has completed.

## Value

A `Promise` object which will resolve once the animation has finished running.

## Examples

The following code waits until all animations running on the element `elem` have finished, then deletes the element from the DOM tree:

```js
Promise.all(elem.getAnimations().map((animation) => animation.finished)).then(
  () => elem.remove(),
);
```

## See also

- `KeyframeEffect`
- Web Animations API
- `Animation`
