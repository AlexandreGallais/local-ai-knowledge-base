---
title: "Number.prototype.toPrecision()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/number/toprecision/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Number.prototype.toPrecision()

The **`toPrecision()`** method of `Number` values returns a string representing this number to the specified number of significant digits.

```js
function precise(x) {
  return x.toPrecision(4);
}

console.log(precise(123.456));
// Expected output: "123.5"

console.log(precise(0.004));
// Expected output: "0.004000"

console.log(precise(1.23e5));
// Expected output: "1.230e+5"
```

## Syntax

```js
toPrecision()
toPrecision(precision)
```

### Parameters

- `precision` (optional)
    An integer specifying the number of significant digits.

### Return value

A string representing the given number, using the given number of significant digits. Scientific notation is used if the exponent is greater than or equal to `precision` or less than -6. Has the same behavior as `Number.prototype.toString()` if the `precision` argument is omitted.

### Exceptions

- `RangeError`
    Thrown if `precision` is not between `1` and `100` (inclusive).
- `TypeError`
    Thrown if this method is invoked on an object that is not a `Number`.

## Examples

### Using `toPrecision`

```js
// This number has exponent 0, so it will never use exponential notation
let num = 5.123456;

console.log(num.toPrecision()); // '5.123456'
console.log(num.toPrecision(5)); // '5.1235'
console.log(num.toPrecision(2)); // '5.1'
console.log(num.toPrecision(1)); // '5'

// This number has exponent -4, so it will never use exponential notation
num = 0.000123;

console.log(num.toPrecision()); // '0.000123'
console.log(num.toPrecision(5)); // '0.00012300'
console.log(num.toPrecision(2)); // '0.00012'
console.log(num.toPrecision(1)); // '0.0001'

// This number has exponent 3, so it will use exponential notation if precision is less than 4
num = 1234.5;
console.log(num.toPrecision(1)); // '1e+3'
console.log(num.toPrecision(2)); // '1.2e+3'
console.log(num.toPrecision(6)); // '1234.50'

// This number has exponent -7, so it will always use exponential notation
num = 0.00000012345;
console.log(num.toPrecision(1)); // '1e-7'
console.log(num.toPrecision(10)); // '1.234500000e-7'
```

## See also

- Polyfill of modern `Number.prototype.toPrecision` behavior in `core-js`
- `Number.prototype.toFixed()`
- `Number.prototype.toExponential()`
- `Number.prototype.toString()`
