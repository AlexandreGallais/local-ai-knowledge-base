---
title: "CSSTransition"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csstransition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSTransition

The **`CSSTransition`** interface of the `Web Animations API` represents an `Animation` object used for a CSS Transition.

## Instance properties

_This interface inherits properties from its parent, `Animation`._

- `CSSTransition.transitionProperty` (read-only)
    Returns the transition CSS property name as a string.

## Instance methods

_This interface inherits methods from its parent, `Animation`._

No specific methods.

## Examples

### Inspecting the returned CSSTransition

The transition in the following example changes the width of the box on hover. Calling `Element.getAnimations()` returns an array of all `Animation` objects. In our case this returns a `CSSTransition` object, representing the animation created.

```css
.box {
  background-color: #165baa;
  color: white;
  width: 100px;
  height: 100px;
  transition: width 4s;
}

.box:hover {
  width: 200px;
}
```

```js
const item = document.querySelector(".box");
item.addEventListener("transitionrun", () => {
  let animations = document.querySelector(".box").getAnimations();
  console.log(animations[0]);
});
```
