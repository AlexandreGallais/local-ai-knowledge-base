---
title: "CSSMathMin: CSSMathMin() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssmathmin/cssmathmin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSMathMin: CSSMathMin() constructor

The **`CSSMathMin()`** constructor creates a new `CSSMathMin` object that represents the CSS `min()` function.

## Syntax

```js
new CSSMathMin(arg1)
new CSSMathMin(arg1, arg2)
new CSSMathMin(arg1, arg2, /* …, */ argN)
```

### Parameters

- `arg1`, …, `argN`
    A list of numbers or `CSSNumericValue` objects.

### Exceptions

- `SyntaxError` `DOMException`
    Thrown if no arguments are passed.
- `TypeError`
    Thrown if `arg1`, …, `argN` have incompatible types (for example, mixing a `length` with an `angle`), so a common type cannot be determined for comparison.

## Examples

### Basic usage

The following code creates a `CSSMathMin` instance from three values, then reads back its `operator` and `values` properties.

```js
const min = new CSSMathMin(CSS.px(10), CSS.em(5), CSS.percent(50));

console.log(min.constructor.name); // "CSSMathMin"
console.log(min.operator); // 'min'
console.log(min.values); // CSSNumericArray {0: CSSUnitValue, 1: CSSUnitValue, 2: CSSUnitValue, length: 3}
console.log(min.values[0]); // CSSUnitValue {value: 10, unit: "px"}
```

### Handling incompatible types

The constructor throws a `TypeError` if the values don't resolve to a compatible type.
In the following code we mix a length with a time, and log the error.

```js
try {
  // Mixes a length (px) with a time (s): incompatible types
  new CSSMathMin(CSS.px(10), CSS.s(2));
} catch (e) {
  console.log(e instanceof TypeError); // true
  console.log(e.message);
}
```

### Empty arguments

The constructor throws a `SyntaxError` if called with no arguments.

```js
try {
  new CSSMathMin();
} catch (e) {
  console.log(e instanceof DOMException); // true
  console.log(e.name); // "SyntaxError"
}
```
