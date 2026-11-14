---
title: "CSSTransformValue: CSSTransformValue() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csstransformvalue/csstransformvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSTransformValue: CSSTransformValue() constructor

The **`CSSTransformValue()`** constructor creates a new `CSSTransformValue` object, representing a `transform-list` value made up of the given `CSSTransformComponent` objects.

## Syntax

```js
new CSSTransformValue(transforms)
```

### Parameters

- `transforms`
    An array of `CSSTransformComponent` objects.

### Exceptions

- `TypeError`
    Thrown if `transforms` is empty.

## Examples

### Basic usage

```js
const transform = new CSSTransformValue([
  new CSSTranslate(CSS.px(10), CSS.px(20)),
  new CSSScale(2, 3),
]);

console.log(transform.length); // 2
console.log(transform.toString()); // "translate(10px, 20px) scale(2, 3)"
```

### Handling an empty array

The constructor throws a `TypeError` if `transforms` is empty:

```js
try {
  const transform = new CSSTransformValue([]);
} catch (e) {
  console.log(e); // TypeError
}
```

## See also

- `CSSTransformComponent`
- `CSSTransformValue.entries()`
- `CSSTransformValue.forEach()`
- `CSSTransformValue.is2D`
- `CSSTransformValue.keys()`
- `CSSTransformValue.length`
- `CSSTransformValue.toMatrix()`
- `CSSTransformValue.values()`
- Using the CSS Typed OM
- CSS Typed Object Model API
