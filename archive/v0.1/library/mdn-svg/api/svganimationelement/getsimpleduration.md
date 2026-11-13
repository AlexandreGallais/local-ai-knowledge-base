---
title: "SVGAnimationElement: getSimpleDuration() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimationelement/getsimpleduration/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimationElement: getSimpleDuration() method

The `SVGAnimationElement` method `getSimpleDuration()` returns a float representing the number of seconds for the simple duration for this animation.

Simple duration refers to the length of time an animation is supposed to run for a single iteration, without considering repeats, restarts, or extensions.

This property reflects the `dur` attribute of the `<animate>`, `<animateMotion>` or `<animateTransform>` element.

## Syntax

```js
getSimpleDuration()
```

### Parameters

None (`undefined`).

### Return value

A float.

### Exceptions

- `NotSupportedError` `DOMException`
    Thrown if the `SVGAnimationElement`'s simple duration is undefined (e.g., the end time is indefinite). This happens when the `dur` attribute is set to `indefinite` or is undefined, as then the simple duration is considered undefined.

## Examples

This example demonstrates how the `dur="3s"` attribute defines a simple duration of 3 seconds.

```html
<svg width="200" height="200" viewBox="0 0 200 200">
  <circle cx="50" cy="50" r="20" fill="rebeccapurple">
    <animate
      attributeName="cx"
      from="50"
      to="150"
      dur="3s"
      repeatCount="indefinite" />
  </circle>
</svg>
```

```js
const animationElement = document.querySelector("animate");

const simpleDuration = animationElement.getSimpleDuration();
console.log(`The simple duration is: ${simpleDuration} seconds`); // Output: 3
```

Since `repeatCount="indefinite"` specifies continuous looping, the effective duration is infinite, but the simple duration remains 3 seconds per iteration.
