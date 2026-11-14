---
title: "SVGAnimationElement: endElement() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimationelement/endelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
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
