---
title: "CSSTransformComponent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csstransformcomponent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSTransformComponent

The **`CSSTransformComponent`** interface of the CSS Typed Object Model API is the base interface for objects that represent individual transform functions, such as `rotate()` and `scale()`.

## Instance properties

- `CSSTransformComponent.is2D`
    A boolean that represents whether the transform is 2D or 3D.

## Instance methods

- `CSSTransformComponent.toMatrix()`
    Returns a new `DOMMatrix` object.
- `CSSTransformComponent.toString()`
    A string in the form of a CSS transform function.

## Interfaces based on `CSSTransformComponent`

- `CSSTranslate`
- `CSSRotate`
- `CSSScale`
- `CSSSkew`
- `CSSSkewX`
- `CSSSkewY`
- `CSSPerspective`
- `CSSMatrixComponent`

## Description

The `CSSTransformComponent` interface is the abstract base interface for objects that represent a single `transform-function` in the `transform-list` of values as used by the CSS `transform` property.

A `CSSTransformComponent` in isolation can't represent a CSS property value.
Instead, the `CSSTransformValue` interface represents the `transform-list` itself, and can be iterated to get each of the values in the transform.

The concrete interfaces representing each transform function are listed in the previous section (the interface has no constructor of its own, so it can't be instantiated directly).

The interface has an `is2D` property for determining whether a component is a 2D or 3D transform.
This is used to format the output, ignoring 3D attributes when a component represents a 2D transform.
This allows a single interface to represent both the 2D and 3D forms of a given transform function.

## Examples

### Basic usage

This example shows how you might construct a `CSSTranslate` instance (one of the `CSSTransformComponent`-derived types) and read its matrix and string forms.

```js
const translate = new CSSTranslate(CSS.px(10), CSS.px(20));

console.log(translate.is2D); // true
console.log(translate.toString()); // "translate(10px, 20px)"

const matrix = translate.toMatrix();
console.log(matrix.e, matrix.f); // 10 20
```

## See also

- `CSSTransformValue`
- `DOMMatrix`
- Using the CSS Typed OM
- CSS Typed Object Model API
