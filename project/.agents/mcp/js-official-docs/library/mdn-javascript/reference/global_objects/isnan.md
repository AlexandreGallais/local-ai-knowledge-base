---
title: "isNaN()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/isnan/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# isNaN()

The **`isNaN()`** function determines whether a value is `NaN`, first converting the value to a number if necessary. Because coercion inside the `isNaN()` function can be surprising, you may prefer to use `Number.isNaN()`.

```js
function milliseconds(x) {
  if (isNaN(x)) {
    return "Not a Number!";
  }
  return x * 1000;
}

console.log(milliseconds("100F"));
// Expected output: "Not a Number!"

console.log(milliseconds("0.0314E+2"));
// Expected output: 3140
```

## Syntax

```js
isNaN(value)
```

### Parameters

- `value`
    The value to be tested.

### Return value

`true` if the given value is `NaN` after being coerced to a number.

## Description

`isNaN()` is a function property of the global object.

For number values, `isNaN()` tests if the number is the value `NaN`. When the argument to the `isNaN()` function is not of type Number, the value is first coerced to a number, and the resulting value is then compared against `NaN`.

This behavior of `isNaN()` for non-numeric arguments can be confusing! For example:

- `null` is coerced to 0
- an empty string is coerced to 0
- a boolean is coerced to 0 or 1

These values are intuitively "not numbers", but they don't evaluate to `NaN`, so `isNaN()` returns `false`. Therefore, `isNaN()` answers neither the question "is the input the floating point `NaN` value" nor the question "is the input not a number".

`Number.isNaN()` is a more reliable way to test whether a value is the number value `NaN` or not. Alternatively, the expression `x !== x` can be used, and neither of the solutions is subject to the false positives that make the global `isNaN()` unreliable. To test if a value is a number, use `typeof x === "number"`.

The `isNaN()` function answers the question "is the input functionally equivalent to `NaN` when used in a number context". If `isNaN(x)` returns `false`, you can use `x` in an arithmetic expression as if it's a valid number that's not `NaN`. If `isNaN(x)` returns `true`, `x` will get coerced to `NaN` and make most arithmetic expressions return `NaN` (because `NaN` propagates). You can use this, for example, to test whether an argument to a function is arithmetically processable (usable "like" a number), and handle values that are not number-like by throwing an error, providing a default value, etc. This way, you can have a function that makes use of the full versatility JavaScript provides by implicitly converting values depending on context.

> **Note:**
> The `+` operator performs both number addition and string concatenation. Therefore, even if `isNaN()` returns `false` for both operands, the `+` operator may still return a string, because it's not used as an arithmetic operator. For example, `isNaN("1")` returns `false`, but `"1" + 1` returns `"11"`. To be sure that you are working with numbers, coerce the value to a number and use `Number.isNaN()` to test the result.

## Examples

Note how `isNaN()` returns `true` for values that are not the value `NaN` but are not numbers either:

```js
isNaN(NaN); // true
isNaN(undefined); // true
isNaN({}); // true

isNaN(true); // false
isNaN(null); // false
isNaN(37); // false

// Strings
isNaN("37"); // false: "37" is converted to the number 37 which is not NaN
isNaN("37.37"); // false: "37.37" is converted to the number 37.37 which is not NaN
isNaN("37,5"); // true
isNaN("123ABC"); // true: Number("123ABC") is NaN
isNaN(""); // false: the empty string is converted to 0 which is not NaN
isNaN(" "); // false: a string with spaces is converted to 0 which is not NaN

// Dates
isNaN(new Date()); // false; Date objects can be converted to a number (timestamp)
isNaN(new Date().toString()); // true; the string representation of a Date object cannot be parsed as a number

// Arrays
isNaN([]); // false; the primitive representation is "", which converts to the number 0
isNaN([1]); // false; the primitive representation is "1"
isNaN([1, 2]); // true; the primitive representation is "1,2", which cannot be parsed as number
```

## See also

- `NaN`
- `Number.isNaN()`
