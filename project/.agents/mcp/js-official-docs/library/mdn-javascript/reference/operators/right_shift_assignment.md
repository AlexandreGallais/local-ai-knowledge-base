---
title: "Right shift assignment (>>=)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/right_shift_assignment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Right shift assignment (>>=)

The **right shift assignment (`>>=`)** operator performs right shift on the two operands and assigns the result to the left operand.

```js
let a = 5; //  00000000000000000000000000000101

a >>= 2; //  00000000000000000000000000000001
console.log(a);
// Expected output: 1

let b = -5; //  11111111111111111111111111111011

b >>= 2; //  11111111111111111111111111111110
console.log(b);
// Expected output: -2
```

## Syntax

```js
x >>= y
```

## Description

`x >>= y` is equivalent to `x = x >> y`, except that the expression `x` is only evaluated once.

## Examples

### Using right shift assignment

```js
let a = 5; //   (00000000000000000000000000000101)
a >>= 2; //   1 (00000000000000000000000000000001)

let b = -5; //  (-00000000000000000000000000000101)
b >>= 2; //  -2 (-00000000000000000000000000000010)

let c = 5n;
c >>= 2n; // 1n
```

## See also

- Assignment operators in the JS guide
- Right shift (`>>`)
