---
title: "SVGAnimationElement: getStartTime() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimationelement/getstarttime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAnimationElement: getStartTime() method

The `SVGAnimationElement` method `getStartTime()` returns a float representing the start time, in seconds, for this animation element's current interval, if it exists, regardless of whether the interval has begun yet.

The start time returned by `getStartTime()` is measured in seconds relative to the time container's time zero.

Time zero refers to the moment when the time container begins its timeline. It acts as the starting reference point for all animations within that container.

A time container is an element or context that defines a local timeline for one or more animations. Animations inside the time container are measured relative to its timeline. If a time container is delayed, paused, or manipulated, all animations within it adjust accordingly.

This property reflects the `begin` attribute of the `<animate>`, `<animateMotion>` or `<animateTransform>` element.

## Syntax

```js
getStartTime()
```

### Parameters

None (`undefined`).

### Return value

A float.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the `SVGAnimationElement` has no current interval. This happens when the animation element's `begin` time has not been reached or defined, thus the `getStartTime()` method cannot determine a valid start time. An example can be when the animation is set to start at `begin="click"`, but the user has not yet clicked to trigger it.

## Examples

This example demonstrates how `begin="3s"` attribute makes the animation start 3 seconds after the time container's timeline begins.

```html
<svg width="200" height="200" viewBox="0 0 200 200">
  <circle cx="50" cy="50" r="20" fill="rebeccapurple">
    <animate attributeName="cx" from="50" to="150" dur="5s" begin="3s" />
  </circle>
</svg>
```

```js
const animationElement = document.querySelector("animate");

const startTime = animationElement.getStartTime();
console.log(
  `The animation starts at: ${startTime} seconds relative to the time container's timeline`,
); // Output: 3
```

The `getStartTime()` method returns `3.0` because that is the time relative to the time container's time zero.
