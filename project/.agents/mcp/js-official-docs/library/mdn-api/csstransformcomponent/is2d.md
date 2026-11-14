---
title: "CSSTransformComponent: is2D property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csstransformcomponent/is2d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSTransformComponent: is2D property

The **`is2D`** property of the `CSSTransformComponent` interface represents whether the transform is 2D or 3D.

## Value

A boolean.
`true` if the transform is a 2D transform, `false` if it is a 3D transform.

## Description

The property can be both read and written, and is used in other methods to determine the form of the output.

For example, if the component represents `CSSRotate` and `is2D` is `false`, then the string returned by `CSSTransformComponent.toString()` will be in the form of the CSS transformation `rotate3d()` function.
If the value is `true`, the string returned will be in the form of the 2-dimensional `rotate()` function.

More generally, when `is2D` is `true`, any attributes of the component that are only relevant to 3D transforms (such as `CSSTranslate.z`) are ignored, and have no effect on the component's serialization (`CSSTransformComponent.toString()`) or its `matrix`.

## Examples

### Reading and setting is2D

```js
const translate = new CSSTranslate(CSS.px(10), CSS.px(20), CSS.px(30));

console.log(translate.is2D); // false
console.log(translate.toString()); // "translate3d(10px, 20px, 30px)"

translate.is2D = true;

console.log(translate.toString()); // "translate(10px, 20px)"
console.log(translate.z.toString()); // "30px" — z is still set, just ignored
```

## See also

- `CSSTransformComponent.toString()`
- `CSSTransformComponent.toMatrix()`
- `CSSTransformValue.is2D`
- Using the CSS Typed OM
- CSS Typed Object Model API
