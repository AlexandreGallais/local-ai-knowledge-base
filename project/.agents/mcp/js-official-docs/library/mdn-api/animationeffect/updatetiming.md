---
title: "AnimationEffect: updateTiming() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/animationeffect/updatetiming/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AnimationEffect: updateTiming() method

The `updateTiming()` method of the `AnimationEffect` interface updates the specified timing properties for an animation effect.

## Syntax

```js
updateTiming(timing)
```

### Parameters

- `timing` (optional)
    An object containing zero or more of the properties from the return value of `AnimationEffect.getTiming()`, representing the timing properties to update.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown if invalid values are provided for any of the timing properties.

### Examples

#### Side effects

`updateTiming()` may cause any associated `Animation` to start or stop playing, if for example the effect of a running animation is shortened such that its end time is before `Animation.currentTime` or the effect of a finished animation is lengthened such that its end time is after `Animation.currentTime`.

```js
const animation = document.body.animate([], { duration: 1000 });
animation.finish();
console.log(animation.playState); // finished
animation.effect.updateTiming({ duration: 2000 });
console.log(animation.playState); // running
```

## See also

- Web Animations API
- `AnimationEffect`
- `Animation`
- `AnimationEffect.getTiming()`
- `AnimationEffect.getComputedTiming()`
