---
title: "CSSNumericValue: div() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssnumericvalue/div/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSNumericValue: div() method

The **`div()`** method of the `CSSNumericValue` interface returns a new value that is the `CSSNumericValue` divided by the supplied values.

## Syntax

```js
div()
div(number1)
div(number1, number2)
div(number1, number2, /* …, */ numberN)
```

### Parameters

- `number1`, …, `numberN` (optional)
    Either a number or a `CSSNumericValue`.
    A number is converted to a `CSSUnitValue` whose unit is `"number"`, so `2` is treated as `CSS.number(2)`.

### Return value

A `CSSUnitValue` if the `CSSNumericValue` is a single value (a `CSSUnitValue`) and every supplied value is a plain number (a value whose unit is `"number"`).
Otherwise, a `CSSMathProduct`.

### Exceptions

- `TypeError`
    Thrown if the values have types that can't be used together in a division.
    This is rare, because most types can be divided by each other.
- `RangeError`
    Thrown if any supplied value is the plain number `0` or `-0`.

## Description

The method inverts each supplied value (turning it into 1 divided by that value), and then multiplies the `CSSNumericValue` by the inverted values.
It follows the same rules as `mul()`, with one difference: a supplied value with a unit can't be inverted into a single value.

If the `CSSNumericValue` is a single value and every supplied value is a plain number, the result is a single `CSSUnitValue` in the unit of the `CSSNumericValue`.
For example, `CSS.px(24).div(2)` returns `12px`.
If the `CSSNumericValue` is a calculation, such as a `CSSMathSum`, the result is a `CSSMathProduct`, even when dividing by a plain number.

If any supplied value has a unit, it's wrapped in a `CSSMathInvert`, and the method returns a `CSSMathProduct`.
This happens even if the units are the same.
For example, `CSS.px(10).div(CSS.px(2))` returns `calc(10px / 2px)`, not `5`.

If the `CSSNumericValue` is already a `CSSMathProduct`, the inverted values are added as extra terms of that product, rather than the existing product becoming one term inside a new product.
The terms of the result are in order: first the `CSSNumericValue` (or, if it's already a `CSSMathProduct`, its terms), then the inverted supplied values in the order they were passed.

Dividing by the plain number `0` throws a `RangeError`.
Dividing by a zero value that has a unit, such as `CSS.px(0)`, doesn't throw, because that value is wrapped in a `CSSMathInvert` rather than inverted immediately.

Most types can be divided by each other, including a length and a time.
The method only throws a `TypeError` when two values each mix a percentage with a different kind of value, such as a length plus a percentage and an angle plus a percentage, because their percentages can't be resolved to a common type.

## Examples

### Dividing by plain numbers

When every supplied value is a plain number, the result is a single `CSSUnitValue`:

```js
const half = CSS.px(24).div(2);
console.log(half.toString()); // "12px"
```

### Dividing by values that have units

When a supplied value has a unit, the result is a `CSSMathProduct`, even if the units are the same:

```js
const ratio = CSS.px(10).div(CSS.px(2));
console.log(ratio.toString()); // "calc(10px / 2px)"

const mathProduct = CSS.px(24).div(CSS.percent(4));
console.log(mathProduct.toString()); // "calc(24px / 4%)"
```

### Dividing by zero

Dividing by the plain number `0` throws a `RangeError`, but dividing by a zero length doesn't:

```js
try {
  CSS.px(10).div(0);
} catch (e) {
  console.log(e instanceof RangeError); // true
}

console.log(CSS.px(10).div(CSS.px(0)).toString()); // "calc(10px / 0px)"
```

## See also

- `CSSNumericValue.mul()`
- `CSSMathProduct`
- `CSSMathInvert`
- Using the CSS Typed OM
