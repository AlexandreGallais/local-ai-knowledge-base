---
title: "SVGAnimationElement: beginElementAt() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimationelement/beginelementat/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimationElement: beginElementAt() method

The `SVGAnimationElement` method `beginElementAt()` creates a begin instance time for the current time plus the specified offset. The new instance time is added to the begin instance times list.

## Syntax

```js
beginElementAt(offset)
```

### Parameters

- `offset`
    A float representing the offset from the current document time, in seconds, at which to begin the element.

### Return value

None

## Examples

This example demonstrates how to use `beginElementAt()` to start an animation element after a delay of 2 seconds:

```js
const animationElement = document.querySelector("animate");
animationElement.beginElementAt(2);
console.log("Animation will start after a 2-second delay.");
```
