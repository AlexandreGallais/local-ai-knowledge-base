---
title: "Bitwise XOR assignment (^=)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/bitwise_xor_assignment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Bitwise XOR assignment (^=)

The **bitwise XOR assignment (`^=`)** operator performs bitwise XOR on the two operands and assigns the result to the left operand.

```js
let a = 5; // 00000000000000000000000000000101
a ^= 3; // 00000000000000000000000000000011

console.log(a); // 00000000000000000000000000000110
// Expected output: 6
```

## Syntax

```js
x ^= y
```

## Description

`x ^= y` is equivalent to `x = x ^ y`, except that the expression `x` is only evaluated once.

## Examples

### Using bitwise XOR assignment

```js
let a = 5; // (00000000000000000000000000000101)
a ^= 3; // (00000000000000000000000000000011)

console.log(a); // 6 (00000000000000000000000000000110)

let b = 5; // (00000000000000000000000000000101)
b ^= 0; // (00000000000000000000000000000000)

console.log(b); // 5 (00000000000000000000000000000101)

let c = 5n;
c ^= 3n;
console.log(c); // 6n
```

## See also

- Assignment operators in the JS guide
- Bitwise XOR (`^`)
