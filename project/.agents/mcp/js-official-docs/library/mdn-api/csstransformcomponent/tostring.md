---
title: "CSSTransformComponent: toString() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csstransformcomponent/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSTransformComponent: toString() method

The **`toString()`** method of the `CSSTransformComponent` interface is a stringifier returning a CSS Transforms function.

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

A string in the form of a CSS transform function.

This will use the value of `is2D` to return either a 2D or 3D transform.
For example, if the component represents `CSSRotate` and `is2D` is false, then the string returned will be in the form of the CSS transformation `rotate3d()` function.
If true the string returned will be in the form of the 2-dimensional `rotate()` function.

## Examples

### Serializing 2D and 3D components

```js
const translate2D = new CSSTranslate(CSS.px(10), CSS.px(20));
console.log(translate2D.toString()); // "translate(10px, 20px)"

const translate3D = new CSSTranslate(CSS.px(10), CSS.px(20), CSS.px(30));
console.log(translate3D.toString()); // "translate3d(10px, 20px, 30px)"
```

## See also

- `CSSTransformComponent.is2D`
- `CSSTransformComponent.toMatrix()`
- `CSSTransformValue`
- Using the CSS Typed OM
- CSS Typed Object Model API
