---
title: "SVGAnimationElement: endElement() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimationelement/endelement/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimationElement: endElement() method

The `SVGAnimationElement` method `endElement()` creates an end instance time for the current time. The new instance time is added to the end instance times list. The behavior of this method is equivalent to `endElementAt(0)`.

## Syntax

```js
endElement()
```

### Parameters

None.

### Return value

None

## Examples

This example demonstrates how to use `endElement()` to end an animation element:

```js
const animationElement = document.querySelector("animate");
animationElement.endElement();
console.log("Animation has ended.");
```
