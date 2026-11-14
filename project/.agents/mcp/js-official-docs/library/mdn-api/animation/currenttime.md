---
title: "Animation: currentTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/animation/currenttime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Animation: currentTime property

The **`Animation.currentTime`** property of the Web Animations API returns and sets the current time value of the animation in milliseconds, whether running or paused.

If the animation lacks a `timeline`, is inactive, or hasn't been played yet, `currentTime`'s return value is `null`.

## Value

A number representing the current time in milliseconds, or `null` to deactivate the animation.

## Examples

In the Drink Me/Eat Me game, Alice's height is animated so it can go from small to large or large to small. At the start of the game, her height is set between the two extremes by setting her animation's `currentTime` to half her `KeyframeEffect`'s duration:

```js
aliceChange.currentTime = aliceChange.effect.timing.duration / 2;
```

A more generic means of seeking to the 50% mark of an animation would be:

```js
animation.currentTime =
  animation.effect.getComputedTiming().delay +
  animation.effect.getComputedTiming().activeDuration / 2;
```

## Reduced time precision

To offer protection against timing attacks and fingerprinting, the precision of `animation.currentTime` may be reduced depending on browser settings.

The value of this property can come from two sources: supplied by script, or calculated from `AnimationTimeline.currentTime`, `startTime`, and `playbackRate`. The timeline's underlying clock can already be rounded before calculation; see the timeline's reduced time precision for its rounding intervals.

In Chrome, the browser does not apply additional timer rounding. In Safari, the browser rounds the returned value to 0.001 ms, the resolution used to represent animation times.

In Firefox, the browser rounds the returned value to 0.02 ms by default, including in cross-origin-isolated contexts. If `privacy.resistFingerprinting` is enabled, the rounding interval is 16.667 ms or the interval configured by `privacy.resistFingerprinting.reduceTimerPrecision.microseconds`, whichever is larger.

For example, these are possible values in Firefox:

```js
// Reduced time precision (0.02 ms) with default settings
animation.currentTime;
// Might be:
// 23.4
// 24.18
// 25.5
// …

// Reduced time precision with `privacy.resistFingerprinting` enabled
animation.currentTime;
// Might be:
// 50.001
// 66.668
// 83.335
// …
```

## See also

- `Animation` for other methods and properties you can use to control web page animation.
- `Animation.startTime` for the time an animation is scheduled to start.
- Web Animations API
