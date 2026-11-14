---
title: "Left shift assignment (<<=)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/left_shift_assignment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Left shift assignment (<<=)

The **left shift assignment (`<<=`)** operator performs left shift on the two operands and assigns the result to the left operand.

```js
let a = 5; // 00000000000000000000000000000101

a <<= 2; // 00000000000000000000000000010100

console.log(a);
// Expected output: 20
```

## Syntax

```js
x <<= y
```

## Description

`x <<= y` is equivalent to `x = x << y`, except that the expression `x` is only evaluated once.

## Examples

### Using left shift assignment

```js
let a = 5;
// 00000000000000000000000000000101

a <<= 2; // 20
// 00000000000000000000000000010100

let b = 5n;
b <<= 2n; // 20n
```

## See also

- Assignment operators in the JS guide
- Left shift (`<<`)
