---
title: "Animation: playbackRate property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/animation/playbackrate/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# Animation: playbackRate property

The **`Animation.playbackRate`** property of the Web Animations API returns or sets the playback rate of the animation.

Animations have a **playback rate** that provides a scaling factor from the rate of change of the animation's `timeline` time values to the animation's current time. The playback rate is initially `1`.

## Value

Takes a number that can be 0, negative, or positive. Negative values reverse the animation. The value is a scaling factor, so for example a value of 2 would double the playback rate.

> **Note:**
> Setting an animation's `playbackRate` to `0` effectively pauses the animation (however, its `playState` does not necessarily become `paused`).

## Examples

In the Growing/Shrinking Alice Game example, clicking or tapping the bottle causes Alice's growing animation (`aliceChange`) to reverse, causing her to shrink:

```js
const shrinkAlice = () => {
  aliceChange.playbackRate = -1;
  aliceChange.play();
};

// On tap or click, Alice will shrink.
bottle.addEventListener("mousedown", shrinkAlice);
bottle.addEventListener("touchstart", shrinkAlice);
```

Contrariwise, clicking on the cake causes her to "grow," playing `aliceChange` forwards again:

```js
const growAlice = () => {
  aliceChange.playbackRate = 1;
  aliceChange.play();
};

// On tap or click, Alice will grow.
cake.addEventListener("mousedown", growAlice);
cake.addEventListener("touchstart", growAlice);
```

In another example, the Red Queen's Race Game, Alice and the Red Queen are constantly slowing down:

```js
setInterval(() => {
  // Make sure the playback rate never falls below .4
  if (redQueenAlice.playbackRate > 0.4) {
    redQueenAlice.updatePlaybackRate(redQueenAlice.playbackRate * 0.9);
  }
}, 3000);
```

But clicking or tapping on them causes them to speed up by multiplying their `playbackRate`:

```js
const goFaster = () => {
  redQueenAlice.updatePlaybackRate(redQueenAlice.playbackRate * 1.1);
};

document.addEventListener("click", goFaster);
document.addEventListener("touchstart", goFaster);
```

## See also

- Web Animations API
- `Animation`
