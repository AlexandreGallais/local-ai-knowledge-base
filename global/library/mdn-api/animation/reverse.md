---
title: "Animation: reverse() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/animation/reverse/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Animation: reverse() method

The **`Animation.reverse()`** method of the `Animation` Interface reverses the playback direction, meaning the animation ends at its beginning. If called on an unplayed animation, the whole animation is played backwards. If called on a paused animation, the animation will continue in reverse.

## Syntax

```js
reverse()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

In the Growing/Shrinking Alice Game example, clicking or tapping the bottle causes Alice's growing animation (`aliceChange`) to play backwards, causing her to get smaller. It is done by setting `aliceChange`'s `Animation.playbackRate` to `-1` like so:

```js
const shrinkAlice = () => {
  // play Alice's animation in reverse
  aliceChange.playbackRate = -1;
  aliceChange.play();

  // play the bottle's animation
  drinking.play();
};
```

But it could also have been done by calling `reverse()` on `aliceChange` like so:

```js
const shrinkAlice = () => {
  // play Alice's animation in reverse
  aliceChange.reverse();

  // play the bottle's animation
  drinking.play();
};
```

## See also

- Web Animations API
- `Animation` for other methods and properties you can use to control web page animation.
- `Animation.pause()` to pause an animation.
- `Animation.play()` to move an animation forward.
