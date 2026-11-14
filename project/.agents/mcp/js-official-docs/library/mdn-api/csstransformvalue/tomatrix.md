---
title: "CSSTransformValue: toMatrix() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csstransformvalue/tomatrix/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSTransformValue: toMatrix() method

The **`toMatrix()`** method of the `CSSTransformValue` interface returns a `DOMMatrix` object.

The returned matrix is the product of the matrices of each `CSSTransformComponent` in the `CSSTransformValue`, computed by calling `CSSTransformComponent.toMatrix()` on each component in turn and multiplying the results together, in order.

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

### Converting a transform to a matrix

```js
const transform = new CSSTransformValue([
  new CSSTranslate(CSS.px(10), CSS.px(20)),
  new CSSScale(2, 3),
]);

const matrix = transform.toMatrix();
console.log(matrix.a, matrix.d); // 2 3
console.log(matrix.e, matrix.f); // 10 20
```

### Handling incompatible units

`toMatrix()` throws if a component's length can't be resolved to pixels, such as a percentage:

```js
const transform = new CSSTransformValue([
  new CSSTranslate(CSS.percent(50), CSS.px(20)),
]);

try {
  transform.toMatrix();
} catch (e) {
  console.log(e); // TypeError
}
```

## See also

- `CSSTransformValue()`
- `CSSTransformComponent.toMatrix()`
- `CSSTransformValue.is2D`
- Using the CSS Typed OM
- CSS Typed Object Model API
