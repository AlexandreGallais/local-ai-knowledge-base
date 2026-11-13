---
title: "CSSMathSum: CSSMathSum() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssmathsum/cssmathsum/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSMathSum: CSSMathSum() constructor

The **`CSSMathSum()`** constructor creates a new `CSSMathSum` object representing the sum of the arguments passed into it.

Numeric arguments are wrapped into `CSSUnitValue` objects with a unit of `"number"`.
All arguments are stored as separate items in its `values` property.

## Syntax

```js
new CSSMathSum(arg1)
new CSSMathSum(arg1, arg2)
new CSSMathSum(arg1, arg2, /* …, */ argN)
```

### Parameters

- `arg1`, …, `argN`
    One or more numbers or `CSSNumericValue` objects.

### Exceptions

- `SyntaxError` `DOMException`
    Thrown if no arguments are passed.
- `TypeError`
    Thrown if `arg1`, …, `argN` have incompatible types.

## Examples

### Basic usage

The following code creates a `CSSMathSum` instance from three values, then reads back its `operator` and `values` properties.

```js
const sum = new CSSMathSum(CSS.px(10), CSS.em(5), CSS.percent(50));

console.log(sum.constructor.name); // "CSSMathSum"
console.log(sum.operator); // 'sum'
console.log(sum.values); // CSSNumericArray {0: CSSUnitValue, 1: CSSUnitValue, 2: CSSUnitValue, length: 3}
console.log(sum.values[0]); // CSSUnitValue {value: 10, unit: "px"}
```

### Empty arguments

The constructor throws a `SyntaxError` if called with no arguments.

```js
try {
  new CSSMathSum();
} catch (e) {
  console.log(e instanceof DOMException); // true
  console.log(e.name); // "SyntaxError"
}
```

### Handling incompatible types

The constructor throws a `TypeError` if the values don't resolve to a compatible type.
In the following code we mix a length with a time, and log the error.

```js
try {
  // Mixes a length (px) with a time (s): incompatible types
  new CSSMathSum(CSS.px(10), CSS.s(2));
} catch (e) {
  console.log(e instanceof TypeError); // true
  console.log(e.message);
}
```
