---
title: "CSSMathClamp: CSSMathClamp() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssmathclamp/cssmathclamp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSMathClamp: CSSMathClamp() constructor

The **`CSSMathClamp()`** constructor creates a new `CSSMathClamp` object representing a CSS `clamp()` function.

## Syntax

```js
new CSSMathClamp(lower, value, upper)
```

### Parameters

- `lower`
    A number or `CSSNumericValue` that represents the minimum value.
- `value`
    A number or `CSSNumericValue` that represents the preferred value.
- `upper`
    A number or `CSSNumericValue` that represents the maximum value.

### Exceptions

- `TypeError`
    Thrown if the parameters have conflicting unit types.
    For example, mixing a length value with a time value.

## Examples

### Basic usage

The following code creates a `CSSMathClamp` instance from three lengths, then reads back its `lower`, `value`, and `upper` properties.

```js
const clamp = new CSSMathClamp(CSS.px(10), CSS.percent(50), CSS.px(500));

console.log(clamp.constructor.name); // "CSSMathClamp"
console.log(clamp.lower); // CSSUnitValue {value: 10, unit: "px"}
console.log(clamp.value); // CSSUnitValue {value: 50, unit: "percent"}
console.log(clamp.upper); // CSSUnitValue {value: 500, unit: "px"}
```

### Handling incompatible types

The constructor throws a `TypeError` if the three arguments don't resolve to a compatible type.
In the following code we mix a length with a time, and log the error.

```js
try {
  // Mixes a length (px) with a time (s): incompatible types
  new CSSMathClamp(CSS.px(10), CSS.s(2), CSS.px(500));
} catch (e) {
  console.log(e instanceof TypeError); // true
  console.log(e.message);
}
```
