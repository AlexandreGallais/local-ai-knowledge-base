---
title: "CSSMathInvert"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssmathinvert/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSMathInvert

The **`CSSMathInvert`** interface of the CSS Typed Object Model API represents the inverse (reciprocal) of a `CSSNumericValue`.

## Constructor

- `CSSMathInvert()`
    Creates a new `CSSMathInvert` object.

## Instance properties

_Also inherits properties from its parent interface, `CSSMathValue`._

- `CSSMathInvert.value` (read-only)
    Returns a `CSSNumericValue` object containing the value being inverted.

## Static methods

_Also inherits methods from its parent interface, `CSSMathValue`._

## Instance methods

_Also inherits methods from its parent interface, `CSSMathValue`._

## Description

When you divide one `CSSNumericValue` by another using `div()`, if the divisor is a plain number, it can immediately be scaled into a value of the original type.

If the divisor is a different type, the result can't be resolved to a single object.
In this case, the CSS Typed Object Model API represents the divisor as a `CSSMathInvert`.

Generally you won't construct a `CSSMathInvert` directly.
It's produced when `div()` is called with a divisor that isn't a plain number: the result is a `CSSMathProduct`, and `CSSMathInvert` is the operand holding that divisor — found by walking the product's operands, or by checking `CSSMathValue.operator` for the string `"invert"`.

`CSSMathInvert` serializes using CSS `calc()` syntax, as `calc(1 / <value>)`.

## Examples

### Constructing a CSSMathInvert with a non-number divisor

This example shows how you can use `div()` with a divisor that isn't a plain number to get a `CSSMathProduct` that has a `CSSMathInvert` as one of its operands.
The value and serialization of that operand are also logged.

```js
const product = CSS.px(200).div(CSS.percent(4));

console.log(product.constructor.name); // "CSSMathProduct"
console.log(product.values[1].constructor.name); // "CSSMathInvert"
console.log(product.values[1].value); // CSSUnitValue {value: 4, unit: "percent"}
console.log(product.toString()); // "calc(200px / 4%)"
```

## See also

- `div()`
- `CSSMathNegate`
- `CSSMathValue.operator`
