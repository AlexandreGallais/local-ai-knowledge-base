---
title: "Animation: playState property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/animation/playstate/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# Animation: playState property

The read-only **`Animation.playState`** property of the Web Animations API returns an enumerated value describing the playback state of an animation.

## Value

- `idle`
    The current time of the animation is unresolved and there are no pending tasks.
- `running`
    The animation is running.
- `paused`
    The animation was suspended and the `Animation.currentTime` property is not updating.
- `finished`
    The animation has reached one of its boundaries and the `Animation.currentTime` property is not updating.

Previously, Web Animations defined a **`pending`** value to indicate that some asynchronous operation such as initiating playback was yet to complete. This is now indicated by the separate `Animation.pending` property.

## Examples

In the Growing/Shrinking Alice Game example, players can get an ending with Alice crying into a pool of tears. In the game, for performance reasons, the tears should only be animating when they're visible. So they must be paused as soon as they are animated like so:

```js
// Setting up the tear animations

tears.forEach((el) => {
  el.animate(tearsFalling, {
    delay: getRandomMsRange(-1000, 1000), // randomized for each tear
    duration: getRandomMsRange(2000, 6000), // randomized for each tear
    iterations: Infinity,
    easing: "cubic-bezier(0.6, 0.04, 0.98, 0.335)",
  });
  el.pause();
});

// Play the tears falling when the ending needs to be shown.

tears.forEach((el) => {
  el.play();
});

// Reset the crying tears animations and pause them.

tears.forEach((el) => {
  el.pause();
  el.currentTime = 0;
});
```

## See also

- Web Animations API
- `Animation` for other methods and properties you can use to control web page animation.
