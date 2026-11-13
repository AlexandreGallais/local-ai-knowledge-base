---
title: "CSSMathClamp: upper property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssmathclamp/upper/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSMathClamp: upper property

The **`upper`** read-only property of the `CSSMathClamp` interface returns a `CSSNumericValue` object representing its maximum value.

## Value

A `CSSNumericValue`.

## Examples

### Basic usage

The following code creates a `CSSMathClamp` object, then reads its `upper` value.

```js
const clamp = new CSSMathClamp(CSS.px(10), CSS.percent(50), CSS.px(500));

console.log(clamp.upper); // CSSUnitValue {value: 500, unit: "px"}
console.log(clamp.upper.value); // 500
console.log(clamp.upper.unit); // "px"
```

`upper` simply returns whatever `CSSNumericValue` was passed into the constructor — here that's a `CSSUnitValue`, since `CSS.px(500)` is a `CSSUnitValue`.
Passing a more complex expression, such as `CSS.px(500).add(CSS.em(2))` (a `CSSMathSum`), means `upper` would return that `CSSMathSum` instead.

## See also

- `CSSMathClamp.lower`
- `CSSMathClamp.value`
