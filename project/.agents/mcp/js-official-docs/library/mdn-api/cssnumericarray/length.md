---
title: "CSSNumericArray: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssnumericarray/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSNumericArray: length property

The **`length`** read-only property of the `CSSNumericArray` interface returns the number of items in the object.

## Value

An integer.

## Examples

### Basic usage

In this example, we read the `length` of the `CSSNumericArray` returned by the `values` property of a `CSSMathSum`:

```js
const sum = new CSSMathSum(CSS.px(10), CSS.em(5), CSS.percent(50));

console.log(sum.values.length); // 3
```

## See also

- `CSSNumericArray.entries()`
- `CSSNumericArray.forEach()`
- `CSSNumericArray.keys()`
- `CSSNumericArray.values()`
- Using the CSS Typed OM
- CSS Typed Object Model API
