---
title: "CSSMathClamp: value property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssmathclamp/value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSMathClamp: value property

The **`value`** read-only property of the `CSSMathClamp` interface returns a `CSSNumericValue` instance representing its preferred value.

## Value

A `CSSNumericValue`.

## Examples

### Basic usage

The following code creates a `CSSMathClamp` object, then reads its `value`.

```js
const clamp = new CSSMathClamp(CSS.px(10), CSS.percent(50), CSS.px(500));

console.log(clamp.value); // CSSUnitValue {value: 50, unit: "percent"}
console.log(clamp.value.value); // 50
console.log(clamp.value.unit); // "percent"
```

`value` simply returns whatever `CSSNumericValue` was passed into the constructor — here that's a `CSSUnitValue`, since `CSS.percent(50)` is a `CSSUnitValue`.
Passing a more complex expression, such as `CSS.percent(50).add(CSS.em(2))` (a `CSSMathSum`), means `value` would return that `CSSMathSum` instead.

## See also

- `CSSMathClamp.lower`
- `CSSMathClamp.upper`
