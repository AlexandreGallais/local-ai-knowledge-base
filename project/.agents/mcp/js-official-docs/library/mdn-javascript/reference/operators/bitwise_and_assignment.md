---
title: "Bitwise AND assignment (&=)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/bitwise_and_assignment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Bitwise AND assignment (&=)

The **bitwise AND assignment (`&=`)** operator performs bitwise AND on the two operands and assigns the result to the left operand.

```js
let a = 5; // 00000000000000000000000000000101
a &= 3; // 00000000000000000000000000000011

console.log(a); // 00000000000000000000000000000001
// Expected output: 1
```

## Syntax

```js
x &= y
```

## Description

`x &= y` is equivalent to `x = x & y`, except that the expression `x` is only evaluated once.

## Examples

### Using bitwise AND assignment

```js
let a = 5;
// 5:     00000000000000000000000000000101
// 2:     00000000000000000000000000000010
a &= 2; // 0

let b = 5n;
b &= 2n; // 0n
```

## See also

- Assignment operators in the JS guide
- Bitwise AND (`&`)
