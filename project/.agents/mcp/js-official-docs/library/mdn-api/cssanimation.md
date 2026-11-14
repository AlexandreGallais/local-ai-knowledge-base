---
title: "CSSAnimation"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssanimation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSAnimation

The **`CSSAnimation`** interface of the `Web Animations API` represents an `Animation` object.

## Instance properties

_This interface inherits properties from its parent, `Animation`._

- `CSSAnimation.animationName` (read-only)
    Returns the animation name as a string.

## Instance methods

_This interface inherits methods from its parent, `Animation`._

## Examples

### Inspecting the returned CSSAnimation

The animation in the following example is defined in CSS with the name `slide-in`. Calling `Element.getAnimations()` returns an array of all `Animation` objects. In our case this returns a `CSSAnimation` object, representing the animation created in CSS.

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
console.log(animations[0]);
```
