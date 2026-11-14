---
title: "SVGAnimationElement: beginElement() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimationelement/beginelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
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
