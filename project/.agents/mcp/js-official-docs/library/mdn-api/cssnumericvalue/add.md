---
title: "CSSNumericValue: add() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssnumericvalue/add/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSNumericValue: add() method

The **`add()`** method of the `CSSNumericValue` interface returns a new value that is the sum of the `CSSNumericValue` and the supplied values.

## Syntax

```js
add()
add(number1)
add(number1, number2)
add(number1, number2, /* …, */ numberN)
```

### Parameters

- `number1`, …, `numberN` (optional)
    Either a number or a `CSSNumericValue`.
    A number is converted to a `CSSUnitValue` whose unit is `"number"`, so `2` is treated as `CSS.number(2)`.

### Return value

A `CSSUnitValue` if the `CSSNumericValue` and every supplied value have the same unit.
Otherwise, a `CSSMathSum`.

### Exceptions

- `TypeError`
    Thrown if the values have incompatible types, such as a length and a time.

## Description

If the `CSSNumericValue` and all the supplied values have exactly the same unit, they're added together and returned as a single `CSSUnitValue`.
For example, `CSS.px(10).add(CSS.px(5))` returns `15px`.

Otherwise, the method returns a `CSSMathSum` that keeps each value as a separate term.
Units aren't converted, so adding `px`, `cm`, and `in` lengths gives a sum with three terms, even though they could all be written in `px`.
To combine terms like these, use `to()` or `toSum()`.

If the `CSSNumericValue` is already a `CSSMathSum`, the supplied values are added as extra terms of that sum, rather than the existing sum becoming one term inside a new sum.
For example, `CSS.px(1).add(CSS.percent(2)).add(CSS.em(3))` returns a sum with three terms: `1px`, `2%`, and `3em`.
The terms of the result are in order: first the `CSSNumericValue` (or, if it's already a `CSSMathSum`, its terms), then the supplied values in the order they were passed.

The values must have types that can be added, such as two lengths, or a length and a percentage.
Adding a length to a time, or to a plain number, throws a `TypeError`.

## Examples

### Adding values with the same unit

When every value has the same unit, the result is a single `CSSUnitValue`:

```js
const total = CSS.px(10).add(CSS.px(5), CSS.px(2));
console.log(total.toString()); // "17px"
```

### Adding values with different units

Values with different units are kept as separate terms of a `CSSMathSum`.
Each `add()` call adds its value to the existing sum, so the chained calls below produce a single sum with four terms:

```js
const mathSum = CSS.px(23).add(CSS.percent(4)).add(CSS.cm(3)).add(CSS.in(9));
console.log(mathSum.toString()); // "calc(23px + 4% + 3cm + 9in)"
```

### Adding values that can't be added

Adding a length to a time throws a `TypeError`, and so does adding a length to a plain number:

```js
try {
  CSS.px(1).add(CSS.s(1));
} catch (e) {
  console.log(e instanceof TypeError); // true
}

try {
  CSS.px(1).add(2);
} catch (e) {
  console.log(e instanceof TypeError); // true
}
```

## See also

- `CSSNumericValue.sub()`
- `CSSMathSum`
- Using the CSS Typed OM
