---
title: "CSSMathNegate: value property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssmathnegate/value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSMathNegate: value property

The **`value`** read-only property of the `CSSMathNegate` interface returns the `CSSNumericValue` that is being negated.

This is the value passed to the constructor, converted to a `CSSNumericValue` if it isn't one already.
If a plain number was passed to the constructor the value returned by this property is the passed value wrapped in a `CSSUnitValue` with `unit: "number"`.

## Value

A `CSSNumericValue` or one of its derived types.

## Examples

### Basic usage

The following code creates a `CSSMathNegate` object, then reads its `value`.

In this case, we passed `CSS.px(10)`, so `value` is a `CSSUnitValue`.
Passing a composite expression such as `CSS.px(10).add(CSS.percent(5))` would result in `value` returning a `CSSMathSum`.

```js
const negated = new CSSMathNegate(CSS.px(10));

console.log(negated.value); // CSSUnitValue {value: 10, unit: "px"}
```

## See also

- `CSSMathInvert.value`
