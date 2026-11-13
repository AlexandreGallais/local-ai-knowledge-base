---
title: "Number.prototype.toString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/number/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Number.prototype.toString()

The **`toString()`** method of `Number` values returns a string representing this number value.

```js
function hexColor(c) {
  if (c < 256) {
    return Math.abs(c).toString(16);
  }
  return 0;
}

console.log(hexColor(233));
// Expected output: "e9"

console.log(hexColor("11"));
// Expected output: "b"
```

## Syntax

```js
toString()
toString(radix)
```

### Parameters

- `radix` (optional)
    An integer in the range `2` through `36` specifying the base to use for representing the number value. Defaults to 10.

### Return value

A string representing the specified number value. Scientific notation is used if radix is 10 and the number's magnitude (ignoring sign) is greater than or equal to 1021 or less than 10-6.

### Exceptions

- `RangeError`
    Thrown if `radix` is less than 2 or greater than 36.
- `TypeError`
    Thrown if this method is invoked on an object that is not a `Number`.

## Description

The `Number` object overrides the `toString` method of `Object`; it does not inherit
`Object.prototype.toString()`. For `Number` values, the `toString` method returns a string representation of the value in the specified radix.

For radixes above 10, the letters of the alphabet indicate digits greater than 9. For example, for hexadecimal numbers (base 16) `a` through `f` are used.

If the specified number value is negative, the sign is preserved. This is the case even if the radix is 2; the string returned is the positive binary representation of the number value preceded by a `-` sign, **not** the two's complement of the number value.

Both `0` and `-0` have `"0"` as their string representation. `Infinity` returns `"Infinity"` and `NaN` returns `"NaN"`.

If the number is not a whole number, the decimal point `.` is used to separate the decimal places. Scientific notation is used if the radix is 10 and the number's magnitude (ignoring sign) is greater than or equal to 1021 or less than 10-6. In this case, the returned string always explicitly specifies the sign of the exponent.

```js
console.log((10 ** 21.5).toString()); // "3.1622776601683794e+21"
console.log((10 ** 21.5).toString(8)); // "526665530627250154000000"
```

The underlying representation for floating point numbers is base-2 scientific notation (see number encoding). However, the `toString()` method doesn't directly use this most precise representation of the number value. Rather, the algorithm uses the least number of significant figures necessary to distinguish the output from adjacent number values. For example, if the number is large, there will be many equivalent string representations of the same floating point number, and `toString()` will choose the one with the most 0s to the right (for any given radix).

```js
console.log((1000000000000000128).toString()); // "1000000000000000100"
console.log(1000000000000000100 === 1000000000000000128); // true
```

On the other hand, `Number.prototype.toFixed()` and `Number.prototype.toPrecision()` allow you to specify the precision and can be more precise than `toString()`.

The `toString()` method requires its `this` value to be a `Number` primitive or wrapper object. It throws a `TypeError` for other `this` values without attempting to coerce them to number values.

Because `Number` doesn't have a `[Symbol.toPrimitive]()` method, JavaScript calls the `toString()` method automatically when a `Number` _object_ is used in a context expecting a string, such as in a template literal. However, Number _primitive_ values do not consult the `toString()` method to be coerced to strings — rather, they are directly converted using the same algorithm as the initial `toString()` implementation.

```js
Number.prototype.toString = () => "Overridden";
console.log(`${1}`); // "1"
console.log(`${new Number(1)}`); // "Overridden"
```

## Examples

### Using toString()

```js
const count = 10;
console.log(count.toString()); // "10"

console.log((17).toString()); // "17"
console.log((17.2).toString()); // "17.2"

const x = 6;
console.log(x.toString(2)); // "110"
console.log((254).toString(16)); // "fe"
console.log((-10).toString(2)); // "-1010"
console.log((-0xff).toString(2)); // "-11111111"
```

### Converting radix of number strings

If you have a string representing a number in a non-decimal radix, you can use `parseInt()` and `toString()` to convert it to a different radix.

```js
const hex = "CAFEBABE";
const bin = parseInt(hex, 16).toString(2); // "11001010111111101011101010111110"
```

Beware of loss of precision: if the original number string is too large (larger than `Number.MAX_SAFE_INTEGER`, for example), you should use a `BigInt` instead. However, the `BigInt` constructor only has support for strings representing number literals (i.e., strings starting with `0b`, `0o`, `0x`). In case your original radix is not one of binary, octal, decimal, or hexadecimal, you may need to hand-write your radix converter, or use a library.

## See also

- `Number.prototype.toFixed()`
- `Number.prototype.toExponential()`
- `Number.prototype.toPrecision()`
