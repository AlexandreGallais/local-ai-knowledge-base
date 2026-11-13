---
title: "CSSMathMax: values property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssmathmax/values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSMathMax: values property

The **`values`** read-only property of the `CSSMathMax` interface returns a `CSSNumericArray` containing the `CSSNumericValue` objects being compared to find the maximum.

## Value

A `CSSNumericArray`.

## Examples

### Basic usage

The following code creates a `CSSMathMax` object and logs its `values` and length.

```js
const max = new CSSMathMax(CSS.px(10), CSS.em(5), CSS.percent(50));

console.log(max.values);
// CSSNumericArray {0: CSSUnitValue, 1: CSSUnitValue, 2: CSSUnitValue, length: 3}
console.log(max.values.length); // 3
```

We then iterate over the `values`, logging their type, value, unit, and stringified text.
Each of these matches the `CSSNumericValue` objects that were passed into the constructor (or the operands of the CSS `max()` function it represents), in the same order.

```js
for (const value of max.values) {
  console.log(
    `${value.constructor.name}: ${value.value} ${value.unit} (${value})`,
  );
}

// CSSUnitValue: 10 px (10px)
// CSSUnitValue: 5 em (5em)
// CSSUnitValue: 50 percent (50%)
```
