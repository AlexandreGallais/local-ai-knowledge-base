---
title: "CSSMathProduct: values property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssmathproduct/values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSMathProduct: values property

The **`values`** read-only property of the `CSSMathProduct` interface returns a `CSSNumericArray` containing the `CSSNumericValue` objects being multiplied together.

## Value

A `CSSNumericArray`.

## Examples

### Basic usage

The following code creates a `CSSMathProduct` object and logs its `values` and length.

```js
const product = new CSSMathProduct(CSS.px(10), CSS.percent(50));

console.log(product.values);
// CSSNumericArray {0: CSSUnitValue, 1: CSSUnitValue, length: 2}
console.log(product.values.length); // 2
```

We then iterate over the `values`, logging their type, value, unit, and stringified text.
Each of these matches the `CSSNumericValue` objects that were passed into the constructor (or the terms of the multiplication/division it represents), in the same order.

```js
for (const value of product.values) {
  console.log(
    `${value.constructor.name}: ${value.value} ${value.unit} (${value})`,
  );
}

// CSSUnitValue: 10 px (10px)
// CSSUnitValue: 50 percent (50%)
```
