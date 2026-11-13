---
title: "Animation: play() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/animation/play/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Animation: play() method

The **`play()`** method of the Web Animations API's `Animation` Interface starts or resumes playing of an animation. If the animation is finished, calling `play()` restarts the animation, playing it from the beginning.

## Syntax

```js
play()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

In the Growing/Shrinking Alice Game example, clicking or tapping the cake causes Alice's growing animation (`aliceChange`) to play forward, causing her to get bigger, as well as triggering the cake's animation. Two `Animation.play()`s, one `EventListener`:

```js
// The cake has its own animation:
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

// Pause the cake's animation so it doesn't play immediately.
nommingCake.pause();

// This function will play whenever a user clicks or taps
const growAlice = () => {
  // Play Alice's animation.
  aliceChange.play();

  // Play the cake's animation.
  nommingCake.play();
};

// When a user holds their mouse down or taps, call growAlice to make all the animations play.
cake.addEventListener("mousedown", growAlice);
cake.addEventListener("touchstart", growAlice);
```

## See also

- Web Animations API
- `Animation` for other methods and properties you can use to control web page animation.
- `Animation.pause()` to pause an animation.
- `Animation.reverse()` to play an animation backwards.
- `Animation.finish()` to finish an animation.
- `Animation.cancel()` to cancel an animation.
