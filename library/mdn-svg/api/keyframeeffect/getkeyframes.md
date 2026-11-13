---
title: "KeyframeEffect: getKeyframes() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/keyframeeffect/getkeyframes/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# KeyframeEffect: getKeyframes() method

The **`getKeyframes()`** method of a `KeyframeEffect` returns an Array of the computed keyframes that make up this animation along with their computed offsets.

## Syntax

```js
getKeyframes()
```

### Parameters

None.

### Return value

Returns a sequence of objects with the following format:

- property value pairs
    As many property value pairs as are contained in each keyframe of the animation.
- `offset`
    The offset of the keyframe specified as a number between `0.0` and `1.0` inclusive or `null`. This is equivalent to specifying start and end states in percentages in CSS stylesheets using `@keyframes`. This will be `null` if the keyframe is automatically spaced.
- `computedOffset`
    The computed offset for this keyframe, calculated when the list of computed keyframes was produced. Unlike **`offset`,** above, the **`computedOffset`** is never `null`.
- `easing`
    The easing function used from this keyframe until the next keyframe in the series.
- `composite`
    The `KeyframeEffect.composite` operation used to combine the values specified in this keyframe with the underlying value. This will be absent if the composite operation specified on the effect is being used.

## Examples

In the following example, we can inspect the rolling animation to see its keyframes using the `getKeyframes()` method:

```js
const emoji = document.querySelector("div"); // element to animate

const rollingKeyframes = new KeyframeEffect(
  emoji,
  [
    { transform: "translateX(0) rotate(0)" }, // keyframe
    { transform: "translateX(200px) rotate(1.3turn)" }, // keyframe
  ],
  {
    // keyframe options
    duration: 2000,
    direction: "alternate",
    easing: "ease-in-out",
    iterations: "Infinity",
  },
);

const rollingAnimation = new Animation(rollingKeyframes, document.timeline);
rollingAnimation.play();

// Array [ {…}, {…} ]
console.log(rollingAnimation.effect.getKeyframes());
```

```html
<div>🤣</div>
```

```css
body {
  box-shadow: 0 5px 5px pink;
}

div {
  width: fit-content;
  margin-left: calc(50% - 132px);
  font-size: 64px;
  user-select: none;
  margin-top: 1rem;
}
```

## See also

- Web Animations API
- Method of `KeyframeEffect` objects.
