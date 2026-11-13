---
title: "CSSAnimation: animationName property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssanimation/animationname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSAnimation: animationName property

The **`animationName`** property of the
`CSSAnimation` interface returns the `animation-name`. This
specifies one or more keyframe at-rules which describe the animation applied to the
element.

## Value

A string.

## Examples

### Returning the animationName

The animation in the following example is defined in CSS with the name
`slide-in`. Calling `Element.getAnimations()` returns an array
of all `Animation` objects. The `animationName` property returns
the name given to the animation, in our case `slide-in`.

```css
.animate {
  animation: slide-in 0.7s both;
}

@keyframes slide-in {
  0% {
    transform: translateY(-1000px);
  }
  100% {
    transform: translateY(0);
  }
}
```

```js
let animations = document.querySelector(".animate").getAnimations();
console.log(animations[0].animationName);
```
