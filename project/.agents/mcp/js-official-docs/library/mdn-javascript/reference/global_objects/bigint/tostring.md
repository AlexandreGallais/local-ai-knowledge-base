---
title: "BigInt.prototype.toString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/bigint/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BigInt.prototype.toString()

The **`toString()`** method of `BigInt` values returns a string representing the specified `BigInt` value. The trailing "n" is not part of the string.

```js
console.log(1024n.toString());
// Expected output: "1024"

console.log(1024n.toString(2));
// Expected output: "10000000000"

console.log(1024n.toString(16));
// Expected output: "400"
```

## Syntax

```js
toString()
toString(radix)
```

### Parameters

- `radix` (optional)
    An integer in the range 2 through 36 specifying the base to use for representing the BigInt value. Defaults to 10.

### Return value

A string representing the specified `BigInt` value.

### Exceptions

- `RangeError`
    Thrown if `radix` is less than 2 or greater than 36.

## Description

The `BigInt` object overrides the `toString` method of `Object`; it does not inherit
`Object.prototype.toString()`. For `BigInt` values, the `toString()` method returns a string representation of the value in the specified radix.

For radixes above 10, the letters of the alphabet indicate digits greater than 9. For example, for hexadecimal numbers (base 16) `a` through `f` are used.

If the specified BigInt value is negative, the sign is preserved. This is the case even if the radix is 2; the string returned is the positive binary representation of the BigInt value preceded by a `-` sign, **not** the two's complement of the BigInt value.

The `toString()` method requires its `this` value to be a `BigInt` primitive or wrapper object. It throws a `TypeError` for other `this` values without attempting to coerce them to BigInt values.

Because `BigInt` doesn't have a `[Symbol.toPrimitive]()` method, JavaScript calls the `toString()` method automatically when a `BigInt` _object_ is used in a context expecting a string, such as in a template literal. However, BigInt _primitive_ values do not consult the `toString()` method to be coerced to strings — rather, they are directly converted using the same algorithm as the initial `toString()` implementation.

```js
BigInt.prototype.toString = () => "Overridden";
console.log(`${1n}`); // "1"
console.log(`${Object(1n)}`); // "Overridden"
```

## Examples

### Using toString()

```js
17n.toString(); // "17"
66n.toString(2); // "1000010"
254n.toString(16); // "fe"
(-10n).toString(2); // "-1010"
(-0xffn).toString(2); // "-11111111"
```

### Negative-zero BigInt

There is no negative-zero `BigInt` as there are no negative zeros in integers. `-0.0` is an IEEE floating-point concept that only appears in the JavaScript `Number` type.

```js
(-0n).toString(); // "0"
BigInt(-0).toString(); // "0"
```

## See also

- `BigInt.prototype.toLocaleString()`
- `BigInt.prototype.valueOf()`
- `Number.prototype.toString()`
