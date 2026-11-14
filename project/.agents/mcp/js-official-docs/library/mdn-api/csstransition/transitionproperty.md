---
title: "CSSTransition: transitionProperty property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csstransition/transitionproperty/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSTransition: transitionProperty property

The **`transitionProperty`** property of the
`CSSTransition` interface returns the **expanded transition property
name** of the transition. This is the longhand CSS property for which the
transition was generated.

## Value

A string.

## Examples

### Returning the transitionProperty

The transition in the following example changes the width of the box on hover. Calling
`Element.getAnimations()` returns an array of all `Animation`
objects. In our case this returns a `CSSTransition` object, representing the
animation created. The `transitionProperty` property returns the property
that the transition is created for, which is `width`.

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
  console.log(animations[0].propertyName);
});
```
