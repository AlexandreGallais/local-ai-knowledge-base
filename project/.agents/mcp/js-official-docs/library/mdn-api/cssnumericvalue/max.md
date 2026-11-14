---
title: "CSSNumericValue: max() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssnumericvalue/max/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSNumericValue: max() method

The **`max()`** method of the `CSSNumericValue` interface returns the largest of the `CSSNumericValue` and the supplied values.

## Syntax

```js
max()
max(number1)
max(number1, number2)
max(number1, number2, /* …, */ numberN)
```

### Parameters

- `number1`, …, `numberN` (optional)
    Either a number or a `CSSNumericValue`.
    A number is converted to a `CSSUnitValue` whose unit is `"number"`, so `2` is treated as `CSS.number(2)`.

### Return value

A `CSSUnitValue` if the `CSSNumericValue` and every supplied value have the same unit.
Otherwise, a `CSSMathMax`.

### Exceptions

- `TypeError`
    Thrown if the values have incompatible types, such as a length and a time.

## Description

If the `CSSNumericValue` and all the supplied values have exactly the same unit, the method compares them and returns the largest as a single `CSSUnitValue`.
For example, `CSS.px(10).max(CSS.px(25))` returns `25px`.

Otherwise, the method returns a `CSSMathMax`, which represents a CSS `max()` function, and keeps each value as a separate term.
The browser works out which term is largest when the value is used.
For example, which of `100px` and `50%` is larger depends on the size of the element's container.
Units aren't converted, so comparing a `cm` length with an `in` length also gives a `CSSMathMax`, even though both are fixed lengths.

If the `CSSNumericValue` is already a `CSSMathMax`, the supplied values are added as extra terms of it, rather than the existing `CSSMathMax` becoming one term inside a new one.
The terms of the result are in order: first the `CSSNumericValue` (or, if it's already a `CSSMathMax`, its terms), then the supplied values in the order they were passed.

The values must have types that can be compared, such as two lengths, or a length and a percentage.
Comparing a length with a time, or with a plain number, throws a `TypeError`.

## Examples

### Finding the largest of values with the same unit

When every value has the same unit, the result is a single `CSSUnitValue`:

```js
const largest = CSS.px(10).max(CSS.px(25), CSS.px(5));
console.log(largest.toString()); // "25px"
```

### Comparing values with different units

When the units are different, the result is a `CSSMathMax`, even if the values could be converted to the same unit:

```js
const atLeast = CSS.px(100).max(CSS.percent(50));
console.log(atLeast.toString()); // "max(100px, 50%)"

const lengths = CSS.cm(1).max(CSS.in(0.393701));
console.log(lengths.toString()); // "max(1cm, 0.393701in)"
```

### Comparing values that can't be compared

Comparing a length with a time throws a `TypeError`:

```js
try {
  CSS.px(1).max(CSS.s(1));
} catch (e) {
  console.log(e instanceof TypeError); // true
}
```

## See also

- `CSSNumericValue.min()`
- `CSSMathMax`
- CSS `max()` function
- Using the CSS Typed OM
