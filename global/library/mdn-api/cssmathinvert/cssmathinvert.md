---
title: "CSSMathInvert: CSSMathInvert() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssmathinvert/cssmathinvert/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSMathInvert: CSSMathInvert() constructor

The **`CSSMathInvert()`** constructor creates a new `CSSMathInvert` object which represents the inverse (reciprocal) of a `CSSNumericValue`.

## Syntax

```js
new CSSMathInvert(arg)
```

### Parameters

- `arg`
    A number or `CSSNumericValue` that represents the value to invert.

### Exceptions

None.

## Examples

### Basic usage

The following code creates a `CSSMathInvert` object from a percentage, then logs the constructor name, `value`, and the object's serialization (from `toString()`).

```js
const inverted = new CSSMathInvert(CSS.percent(4));

console.log(inverted.constructor.name); // "CSSMathInvert"
console.log(inverted.value); // CSSUnitValue {value: 4, unit: "percent"}
console.log(inverted.toString()); // "calc(1 / 4%)"
```

Note that if a plain number is passed to `arg`, it's converted to a `CSSUnitValue` whose unit is `"number"`:

```js
const invertedNumber = new CSSMathInvert(4);

console.log(invertedNumber.value); // CSSUnitValue {value: 4, unit: "number"}
```
