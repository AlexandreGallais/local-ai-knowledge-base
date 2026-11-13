---
title: "Animation: ready property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/animation/ready/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# Animation: ready property

The read-only **`Animation.ready`** property of the Web Animations API returns a `Promise` which resolves when the animation is ready to play. A new promise is created every time the animation enters the `"pending"` play state as well as when the animation is canceled, since in both of those scenarios, the animation is ready to be started again.

> **Note:**
> Since the same `Promise` is used for both pending `play` and pending `pause` requests, authors are advised to check the state of the animation when the promise is resolved.

## Value

A `Promise` which resolves when the animation is ready to be played. You'll typically use a construct similar to this when using the ready promise:

```js
animation.ready.then(() => {
  // Do whatever needs to be done when
  // the animation is ready to run
});
```

## Examples

In the following example, the state of the animation will be `running` when the **current ready Promise** is resolved because the animation does not leave the `pending` play state in between the calls to `pause` and `play` and hence the **current ready Promise** does not change.

```js
animation.pause();
animation.ready.then(() => {
  // Displays 'running'
  alert(animation.playState);
});
animation.play();
```

## See also

- Web Animations API
- `Animation`
- `Animation.playState`
