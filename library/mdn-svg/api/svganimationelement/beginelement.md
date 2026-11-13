---
title: "SVGAnimationElement: beginElement() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimationelement/beginelement/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimationElement: beginElement() method

The `SVGAnimationElement` method `beginElement()` creates a begin instance time for the current time. The new instance time is added to the begin instance times list. The behavior of this method is equivalent to `beginElementAt(0)`.

## Syntax

```js
beginElement()
```

### Parameters

None.

### Return value

None

## Examples

This example demonstrates how to use `beginElement()` to start an animation element:

```js
const animationElement = document.querySelector("animate");
animationElement.beginElement();
console.log("Animation has started.");
```
