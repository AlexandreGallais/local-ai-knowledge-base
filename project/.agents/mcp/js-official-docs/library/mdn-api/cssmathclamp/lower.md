---
title: "CSSMathClamp: lower property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssmathclamp/lower/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSMathClamp: lower property

The **`lower`** read-only property of the `CSSMathClamp` interface returns a `CSSNumericValue` object representing its minimum value.

## Value

A `CSSNumericValue`.

## Examples

### Basic usage

The following code creates a `CSSMathClamp` object, then reads its `lower` value.

```js
const clamp = new CSSMathClamp(CSS.px(10), CSS.percent(50), CSS.px(500));

console.log(clamp.lower); // CSSUnitValue {value: 10, unit: "px"}
console.log(clamp.lower.value); // 10
console.log(clamp.lower.unit); // "px"
```

`lower` simply returns whatever `CSSNumericValue` was passed into the constructor — here that's a `CSSUnitValue`, since `CSS.px(10)` is a `CSSUnitValue`.
Passing a more complex expression, such as `CSS.px(10).add(CSS.em(2))` (a `CSSMathSum`), means `lower` would return that `CSSMathSum` instead.

## See also

- `CSSMathClamp.value`
- `CSSMathClamp.upper`
