---
title: "Number.NEGATIVE_INFINITY"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/number/negative_infinity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Number.NEGATIVE_INFINITY

The **`Number.NEGATIVE_INFINITY`** static data property represents the negative Infinity value.

```js
function checkNumber(smallNumber) {
  if (smallNumber === Number.NEGATIVE_INFINITY) {
    return "Process number as -Infinity";
  }
  return smallNumber;
}

console.log(checkNumber(-Number.MAX_VALUE));
// Expected output: -1.7976931348623157e+308

console.log(checkNumber(-Number.MAX_VALUE * 2));
// Expected output: "Process number as -Infinity"
```

## Value

The same as the negative value of the global `Infinity` property.

## Description

The `Number.NEGATIVE_INFINITY` value behaves slightly differently than mathematical infinity:

- Any positive value, including `POSITIVE_INFINITY`, multiplied by `NEGATIVE_INFINITY` is `NEGATIVE_INFINITY`.
- Any negative value, including `NEGATIVE_INFINITY`, multiplied by `NEGATIVE_INFINITY` is `POSITIVE_INFINITY`.
- Any positive value divided by `NEGATIVE_INFINITY` is negative zero (as defined in IEEE 754).
- Any negative value divided by `NEGATIVE_INFINITY` is positive zero (as defined in IEEE 754).
- Zero multiplied by `NEGATIVE_INFINITY` is `NaN`.
- `NaN` multiplied by `NEGATIVE_INFINITY` is `NaN`.
- `NEGATIVE_INFINITY`, divided by any negative value except `NEGATIVE_INFINITY`, is `POSITIVE_INFINITY`.
- `NEGATIVE_INFINITY`, divided by any positive value except `POSITIVE_INFINITY`, is `NEGATIVE_INFINITY`.
- `NEGATIVE_INFINITY`, divided by either `NEGATIVE_INFINITY` or `POSITIVE_INFINITY`, is `NaN`.
- `x > Number.NEGATIVE_INFINITY` is true for any number _x_ that isn't `NEGATIVE_INFINITY`.

You might use the `Number.NEGATIVE_INFINITY` property to indicate an error condition that returns a finite number in case of success. Note, however, that `NaN` would be more appropriate in such a case.

Because `NEGATIVE_INFINITY` is a static property of `Number`, you always use it as `Number.NEGATIVE_INFINITY`, rather than as a property of a number value.

## Examples

### Using NEGATIVE_INFINITY

In the following example, the variable `smallNumber` is assigned a value that is smaller than the minimum value. When the `if` statement executes, `smallNumber` has the value `-Infinity`, so `smallNumber` is set to a more manageable value before continuing.

```js
let smallNumber = -Number.MAX_VALUE * 2;

if (smallNumber === Number.NEGATIVE_INFINITY) {
  smallNumber = returnFinite();
}
```

## See also

- `Number.POSITIVE_INFINITY`
- `Number.isFinite()`
- `Infinity`
- `isFinite()`
