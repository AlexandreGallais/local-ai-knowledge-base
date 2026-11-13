---
title: "CSSTransformValue: is2D property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csstransformvalue/is2d/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSTransformValue: is2D property

The **`is2D`** read-only property of the `CSSTransformValue` interface returns whether the transform is 2D or 3D.

`is2D` is `true` only if every `CSSTransformComponent` in the `CSSTransformValue` is itself 2D (see `CSSTransformComponent.is2D`), otherwise it is `false`.

## Value

A boolean. `true` if every object in the value is 2D, otherwise `false`.

## Examples

### Comparing 2D and 3D transforms

```js
const transform2D = new CSSTransformValue([
  new CSSTranslate(CSS.px(10), CSS.px(20)),
  new CSSScale(2, 3),
]);

console.log(transform2D.is2D); // true

const transform3D = new CSSTransformValue([
  new CSSTranslate(CSS.px(10), CSS.px(20), CSS.px(30)),
  new CSSScale(2, 3),
]);

console.log(transform3D.is2D); // false
```

## See also

- `CSSTransformValue()`
- `CSSTransformComponent.is2D`
- `CSSTransformValue.toMatrix()`
- Using the CSS Typed OM
- CSS Typed Object Model API
