---
title: "CSSTransformComponent: toMatrix() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csstransformcomponent/tomatrix/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSTransformComponent: toMatrix() method

The **`toMatrix()`** method of the `CSSTransformComponent` interface returns a `DOMMatrix` object.

All transform functions can be represented mathematically as a 4x4 transformation matrix.

> **Note:**
> The `is2D` property affects what transform, and therefore type of matrix that will be returned.
> CSS 2D and 3D transforms are different for legacy reasons.
> A brief explanation of 2D vs. 3D transforms can be found in Using CSS transforms.

## Syntax

```js
toMatrix()
```

### Parameters

None.

### Return value

A `DOMMatrix` object.

### Exceptions

- `TypeError`
    Raised if any lengths involved in generating the matrix are not compatible units with px (such as relative lengths or percentages).

## Examples

### Converting a component to a matrix

```js
const translate = new CSSTranslate(CSS.px(10), CSS.px(20));

const matrix = translate.toMatrix();
console.log(matrix.e, matrix.f); // 10 20
```

### Handling incompatible units

`toMatrix()` throws if a length can't be resolved to pixels, such as a percentage:

```js
const translate = new CSSTranslate(CSS.percent(50), CSS.px(20));

try {
  translate.toMatrix();
} catch (e) {
  console.log(e); // TypeError
}
```

## See also

- `CSSTransformComponent.is2D`
- `CSSTransformComponent.toString()`
- `CSSTransformValue.toMatrix()`
- Using the CSS Typed OM
- CSS Typed Object Model API
