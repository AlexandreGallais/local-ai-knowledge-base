---
title: "SVGAnimationElement: endElementAt() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimationelement/endelementat/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimationElement: endElementAt() method

The `SVGAnimationElement` method `endElementAt()` creates an end instance time for the current time plus the specified offset. The new instance time is added to the end instance times list.

## Syntax

```js
endElementAt(offset)
```

### Parameters

- `offset`
    A float representing the offset from the current document time, in seconds, at which to end the element.

### Return value

None

## Examples

This example demonstrates how to use `endElementAt()` to end an animation element after a delay of 2 seconds:

```js
const animationElement = document.querySelector("animate");
animationElement.endElementAt(2);
console.log("Animation will end after a 2-second delay.");
```
