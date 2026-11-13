---
title: "Number.MIN_SAFE_INTEGER"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/number/min_safe_integer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Number.MIN_SAFE_INTEGER

The **`Number.MIN_SAFE_INTEGER`** static data property represents the minimum safe integer in JavaScript, or -(253 - 1).

To represent integers smaller than this, consider using `BigInt`.

```js
const x = Number.MIN_SAFE_INTEGER - 1;
const y = Number.MIN_SAFE_INTEGER - 2;

console.log(Number.MIN_SAFE_INTEGER);
// Expected output: -9007199254740991

console.log(x);
// Expected output: -9007199254740992

console.log(x === y);
// Expected output: true
```

## Value

`-9007199254740991` (-9,007,199,254,740,991, or about -9 quadrillion).

## Description

Double precision floating point format only has 52 bits to represent the mantissa, so it can only safely represent integers between -(253 – 1) and 253 – 1. Safe in this context refers to the ability to represent integers exactly and to correctly compare them. For example, `Number.MIN_SAFE_INTEGER - 1 === Number.MIN_SAFE_INTEGER - 2` will evaluate to true, which is mathematically incorrect. See `Number.isSafeInteger()` for more information.

As mentioned in `Number.EPSILON`, the precision of numbers depends on their magnitude. `Number.MIN_SAFE_INTEGER` represents the smallest value at which integer-level operations can be performed precisely, but you can still perform meaningful arithmetic on numbers more negative than that, just without integer-level precision. The largest representable number in JavaScript is actually `Number.MAX_VALUE`, which is approximately 1.7976931348623157 × 10308.

Because `MIN_SAFE_INTEGER` is a static property of `Number`, you always use it as `Number.MIN_SAFE_INTEGER`, rather than as a property of a number value.

## Examples

### Using MIN_SAFE_INTEGER

```js
Number.MIN_SAFE_INTEGER; // -9007199254740991
-(2 ** 53 - 1); // -9007199254740991
```

## See also

- Polyfill of `Number.MIN_SAFE_INTEGER` in `core-js`
- es-shims polyfill of `Number.MIN_SAFE_INTEGER`
- `Number.MAX_SAFE_INTEGER`
- `Number.isSafeInteger()`
- `BigInt`
