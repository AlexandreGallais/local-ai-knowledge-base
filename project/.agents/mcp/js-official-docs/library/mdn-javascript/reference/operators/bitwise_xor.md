---
title: "Bitwise XOR (^)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/bitwise_xor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Bitwise XOR (^)

The **bitwise XOR (`^`)** operator returns a number or BigInt whose binary representation has a `1` in each bit position for which the corresponding bits of either but not both operands are `1`.

```js
const a = 5; // 00000000000000000000000000000101
const b = 3; // 00000000000000000000000000000011

console.log(a ^ b); // 00000000000000000000000000000110
// Expected output: 6
```

## Syntax

```js
x ^ y
```

## Description

The `^` operator is overloaded for two types of operands: number and BigInt. For numbers, the operator returns a 32-bit integer. For BigInts, the operator returns a BigInt. It first coerces both operands to numeric values and tests the types of them. It performs BigInt XOR if both operands become BigInts; otherwise, it converts both operands to 32-bit integers and performs number bitwise XOR. A `TypeError` is thrown if one operand becomes a BigInt but the other becomes a number.

The operator operates on the operands' bit representations in two's complement. Each bit in the first operand is paired with the corresponding bit in the second operand: _first bit_ to _first bit_, _second bit_ to _second bit_, and so on. The operator is applied to each pair of bits, and the result is constructed bitwise.

The truth table for the XOR operation is:

| x   | y   | x XOR y |
| --- | --- | ------- |
| 0   | 0   | 0       |
| 0   | 1   | 1       |
| 1   | 0   | 1       |
| 1   | 1   | 0       |

```plain
     9 (base 10) = 00000000000000000000000000001001 (base 2)
    14 (base 10) = 00000000000000000000000000001110 (base 2)
                   --------------------------------
14 ^ 9 (base 10) = 00000000000000000000000000000111 (base 2) = 7 (base 10)
```

Numbers with more than 32 bits get their most significant bits discarded. For example, the following integer with more than 32 bits will be converted to a 32-bit integer:

```plain
Before: 11100110111110100000000000000110000000000001
After:              10100000000000000110000000000001
```

> **Warning:**
> You may see people using `^ 0` to truncate numbers to integers. Bitwise XORing any number `x` with `0` returns `x` converted to a 32-bit integer, which additionally removes leading bits for numbers outside the range -2147483648 to 2147483647. Use `Math.trunc()` instead.

For BigInts, there's no truncation. Conceptually, understand positive BigInts as having an infinite number of leading `0` bits, and negative BigInts having an infinite number of leading `1` bits.

## Examples

### Using bitwise XOR

```js
// 9  (00000000000000000000000000001001)
// 14 (00000000000000000000000000001110)

14 ^ 9;
// 7  (00000000000000000000000000000111)

14n ^ 9n; // 7n
```

## See also

- Bitwise operators in the JS guide
- Bitwise XOR assignment (`^=`)
