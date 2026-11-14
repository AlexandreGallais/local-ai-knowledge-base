---
title: "Animation: pause() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/animation/pause/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Animation: pause() method

The **`pause()`** method of the Web Animations API's `Animation` interface suspends playback of the animation.

## Syntax

```js
pause()
```

### Parameters

None.

### Return value

None.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the animation's `currentTime` is `unresolved` (perhaps it hasn't started playing yet), and the end time of the animation is positive infinity.

## Example

`Animation.pause()` is used many times in the Alice in Web Animations API Land Growing/Shrinking Alice Game, largely because animations created with the `Element.animate()` method immediately start playing and must be paused manually if you want to avoid that:

```js
// animation of the cupcake slowly getting eaten up
const nommingCake = document
  .getElementById("eat-me_sprite")
  .animate(
    [{ transform: "translateY(0)" }, { transform: "translateY(-80%)" }],
    {
      fill: "forwards",
      easing: "steps(4, end)",
      duration: aliceChange.effect.timing.duration / 2,
    },
  );

// doesn't actually need to be eaten until a click event, so pause it initially:
nommingCake.pause();
```

Additionally, when resetting:

```js
// An all-purpose function to pause the animations on Alice, the cupcake, and the bottle that reads "drink me."
const stopPlayingAlice = () => {
  aliceChange.pause();
  nommingCake.pause();
  drinking.pause();
};

// When the user releases the cupcake or the bottle, pause the animations.
cake.addEventListener("mouseup", stopPlayingAlice);
bottle.addEventListener("mouseup", stopPlayingAlice);
```

## See also

- Web Animations API
- `Animation` for other methods and properties you can use to control web page animation.
- `Animation.reverse()` to play an animation backwards.
- `Animation.finish()` to finish an animation.
- `Animation.cancel()` to cancel an animation.
