---
title: "BigInt.asIntN()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/bigint/asintn/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BigInt.asIntN()

The **`BigInt.asIntN()`** static method truncates a `BigInt` value to the given number of least significant bits and returns that value as a signed integer.

```js
const I64_CEIL = 2n ** 63n;

console.log(BigInt.asIntN(64, I64_CEIL - 1n));
// 9223372036854775807n (2n ** 63n - 1n, the maximum non-wrapping value)
console.log(BigInt.asIntN(64, I64_CEIL));
// -9223372036854775808n (wraps to min value)
console.log(BigInt.asIntN(64, I64_CEIL + 1n));
// -9223372036854775807n (min value + 1n)
console.log(BigInt.asIntN(64, I64_CEIL * 2n));
// 0n (wrapped around to zero)
console.log(BigInt.asIntN(64, -I64_CEIL * -42n));
// 0n (also wraps on negative multiples)
```

## Syntax

```js
BigInt.asIntN(bits, bigint)
```

### Parameters

- `bits`
    The number of bits available for the returned BigInt. Should be an integer between 0 and 253 - 1, inclusive.
- `bigint`
    The BigInt value to truncate to fit into the supplied bits.

### Return value

A BigInt containing the bit representation of `bigint` truncated to `bits` bits, interpreted as a signed integer.

### Exceptions

- `RangeError`
    Thrown if `bits` is negative or greater than 253 - 1.

## Description

The `BigInt.asIntN` method truncates a `BigInt` value to the given number of bits, and interprets the result as a signed integer. For example, for `BigInt.asIntN(3, 25n)`, the value `25n` is truncated to `1n`:

```plain
25n = 00011001 (base 2)
          ^=== Use only the three remaining bits
===>       001 (base 2) = 1n
```

If the leading bit of the remaining number is `1`, the result is negative. For example, `BigInt.asIntN(4, 25n)` yields `-7n`, because `1001` is the encoding of `-7` under two's complement:

```plain
25n = 00011001 (base 2)
         ^==== Use only the four remaining bits
===>      1001 (base 2) = -7n
```

> **Note:**
> `BigInt` values are always encoded as two's complement in binary.

Unlike similar language APIs such as `Number.prototype.toExponential()`, `asIntN` is a static property of `BigInt`, so you always use it as `BigInt.asIntN()`, rather than as a method of a BigInt value. Exposing `asIntN()` as a "standard library function" allows interop with asm.js.

## Examples

### Staying in 64-bit ranges

The `BigInt.asIntN()` method can be useful to stay in the range of 64-bit arithmetic.

```js
const max = 2n ** (64n - 1n) - 1n;

BigInt.asIntN(64, max); // 9223372036854775807n

BigInt.asIntN(64, max + 1n); // -9223372036854775808n
// negative because the 64th bit of 2^63 is 1
```

## See also

- `BigInt`
- `BigInt.asUintN()`
