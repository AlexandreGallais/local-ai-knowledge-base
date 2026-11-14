---
title: "isFinite()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/isfinite/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# isFinite()

The **`isFinite()`** function determines whether a value is finite, first converting the value to a number if necessary. A finite number is one that's not `NaN` or ±`Infinity`. Because coercion inside the `isFinite()` function can be surprising, you may prefer to use `Number.isFinite()`.

```js
function div(x) {
  if (isFinite(1000 / x)) {
    return "Number is NOT Infinity.";
  }
  return "Number is Infinity!";
}

console.log(div(0));
// Expected output: "Number is Infinity!""

console.log(div(1));
// Expected output: "Number is NOT Infinity."
```

## Syntax

```js
isFinite(value)
```

### Parameters

- `value`
    The value to be tested.

### Return value

`true`, except when the given value is either `Infinity`, `-Infinity`, or `NaN` after being coerced to a number.

## Description

`isFinite()` is a function property of the global object.

When the argument to the `isFinite()` function is not of type Number, the value is first coerced to a number, and the resulting value is then compared against `NaN` and ±Infinity. This is as confusing as the behavior of `isNaN` — for example, `isFinite("1")` is `true`.

`Number.isFinite()` is a more reliable way to test whether a value is a finite number value, because it returns `false` for any non-number input.

## Examples

### Using isFinite()

```js
isFinite(Infinity); // false
isFinite(NaN); // false
isFinite(-Infinity); // false

isFinite(0); // true
isFinite(2e64); // true
isFinite(910); // true

// Following would've been false with the more robust Number.isFinite():

isFinite(null); // true, because null is converted to 0
isFinite(""); // true, because empty string is converted to 0
isFinite("123"); // true, because string can be parsed as a number
```

## See also

- `Number.isFinite()`
- `Number.NaN`
- `Number.POSITIVE_INFINITY`
- `Number.NEGATIVE_INFINITY`
