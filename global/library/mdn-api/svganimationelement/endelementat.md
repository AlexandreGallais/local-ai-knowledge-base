---
title: "SVGAnimationElement: endElementAt() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimationelement/endelementat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
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
