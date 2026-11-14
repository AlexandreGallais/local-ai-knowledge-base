---
title: "Number.MAX_SAFE_INTEGER"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/number/max_safe_integer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Number.MAX_SAFE_INTEGER

The **`Number.MAX_SAFE_INTEGER`** static data property represents the maximum safe integer in JavaScript (253 – 1).

For larger integers, consider using `BigInt`.

```js
const x = Number.MAX_SAFE_INTEGER + 1;
const y = Number.MAX_SAFE_INTEGER + 2;

console.log(Number.MAX_SAFE_INTEGER);
// Expected output: 9007199254740991

console.log(x);
// Expected output: 9007199254740992

console.log(x === y);
// Expected output: true
```

## Value

`9007199254740991` (9,007,199,254,740,991, or \~9 quadrillion).

## Description

Double precision floating point format only has 52 bits to represent the mantissa, so it can only safely represent integers between -(253 – 1) and 253 – 1. "Safe" in this context refers to the ability to represent integers exactly and to compare them correctly. For example, `Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2` will evaluate to true, which is mathematically incorrect. See `Number.isSafeInteger()` for more information.

As mentioned in `Number.EPSILON`, the precision of numbers depends on their magnitude. `Number.MAX_SAFE_INTEGER` represents the largest value at which integer-level operations can be performed precisely, but you can still perform meaningful arithmetic on numbers larger than that, just without integer-level precision. The largest representable number in JavaScript is actually `Number.MAX_VALUE`, which is approximately 1.7976931348623157 × 10308.

Because `MAX_SAFE_INTEGER` is a static property of `Number`, you always use it as `Number.MAX_SAFE_INTEGER`, rather than as a property of a number value.

## Examples

### Return value of MAX_SAFE_INTEGER

```js
Number.MAX_SAFE_INTEGER; // 9007199254740991
```

### Relationship between MAX_SAFE_INTEGER and EPSILON

`Number.EPSILON` is 2-52, while `MAX_SAFE_INTEGER` is 253 – 1 — both of them are derived from the width of the mantissa, which is 53 bits (with the highest bit always being 1). Multiplying them will give a value very close — but not equal — to 2.

```js
Number.MAX_SAFE_INTEGER * Number.EPSILON; // 1.9999999999999998
```

## See also

- Polyfill of `Number.MAX_SAFE_INTEGER` in `core-js`
- es-shims polyfill of `Number.MAX_SAFE_INTEGER`
- `Number.MIN_SAFE_INTEGER`
- `Number.MAX_VALUE`
- `Number.isSafeInteger()`
- `BigInt`
