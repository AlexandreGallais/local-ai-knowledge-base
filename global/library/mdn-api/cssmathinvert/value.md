---
title: "CSSMathInvert: value property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssmathinvert/value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSMathInvert: value property

The **`value`** read-only property of the `CSSMathInvert` interface returns the `CSSNumericValue` that is being inverted.

This is the parameter that was passed to the constructor when this object was created.

## Value

A `CSSNumericValue` or one of its derived types.

## Examples

### Basic usage

The following code creates a `CSSMathInvert` object, then reads its `value`.

```js
const inverted = new CSSMathInvert(CSS.percent(4));

console.log(inverted.value); // CSSUnitValue {value: 4, unit: "percent"}
```

`value` returns whatever was passed to `arg` in the constructor.
In this case, we passed `CSS.percent(4)`, so `value` is a `CSSUnitValue`.
Passing an expression such as `CSS.percent(4).add(CSS.em(2))` would result in `value` returning a `CSSMathSum`.

## See also

- `CSSMathNegate.value`
