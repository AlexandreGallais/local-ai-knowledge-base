---
title: "CSSNumericArray"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssnumericarray/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSNumericArray

The **`CSSNumericArray`** interface of the CSS Typed Object Model API represents an iterable of `CSSNumericValue`-based objects.

An object of this type is used to represent the operands of a mathematical operation in the `values` property of `CSSMathSum`, `CSSMathProduct`, `CSSMathMin`, and `CSSMathMax`.

The items can be accessed by index (`array[0]`), and as an iterable it can be used with a `for...of` loop or the spread syntax.

## Instance properties

- `CSSNumericArray.length` (read-only)
    Returns the number of items in the object.

## Instance methods

- `CSSNumericArray.entries()`
    Returns a new _array iterator_ that yields `[index, value]` pairs for each item in the object.
- `CSSNumericArray.forEach()`
    Executes a provided function once for each item in the object.
- `CSSNumericArray.keys()`
    Returns a new _array iterator_ that yields the index of each item in the object.
- `CSSNumericArray.values()`
    Returns a new _array iterator_ that yields each item in the object.

## Examples

### Reading the terms of a `CSSMathSum`

The `values` property of a `CSSMathSum` is a `CSSNumericArray` containing the terms of the sum.
This example creates a `CSSMathSum`, then reads its `values` via `length`, indexed access, and iteration.

```js
const sum = new CSSMathSum(CSS.px(10), CSS.em(5), CSS.percent(50));
const values = sum.values;

console.log(values.length); // 3
console.log(values[0]); // CSSUnitValue {value: 10, unit: "px"}

for (const value of values) {
  console.log(value.toString());
}
// "10px"
// "5em"
// "50%"
```

## See also

- `CSSMathSum`
- `CSSMathProduct`
- `CSSMathMin`
- `CSSMathMax`
- `CSSNumericValue`
- Using the CSS Typed OM
- CSS Typed Object Model API
