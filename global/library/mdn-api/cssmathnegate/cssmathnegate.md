---
title: "CSSMathNegate: CSSMathNegate() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssmathnegate/cssmathnegate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSMathNegate: CSSMathNegate() constructor

The **`CSSMathNegate()`** constructor creates a new `CSSMathNegate` object which negates the value passed into it.

## Syntax

```js
new CSSMathNegate(arg)
```

### Parameters

- `arg`
    A number or `CSSNumericValue` that represents the value to negate.

### Exceptions

None.

## Examples

### Basic usage

The following code creates a `CSSMathNegate` object from a length, then logs the constructor name, `value`, and the object's serialization (from `toString()`).

```js
const negated = new CSSMathNegate(CSS.px(10));

console.log(negated.constructor.name); // "CSSMathNegate"
console.log(negated.value); // CSSUnitValue {value: 10, unit: "px"}
console.log(negated.toString()); // "calc(-10px)"
```

Note that if a plain number is passed to `arg`, it's converted to a `CSSUnitValue` whose unit is `"number"`:

```js
const negatedNumber = new CSSMathNegate(4);

console.log(negatedNumber.value); // CSSUnitValue {value: 4, unit: "number"}
```
