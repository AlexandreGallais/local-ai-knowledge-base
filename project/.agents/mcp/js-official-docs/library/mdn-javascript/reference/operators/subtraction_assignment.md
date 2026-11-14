---
title: "Subtraction assignment (-=)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/subtraction_assignment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Subtraction assignment (-=)

The **subtraction assignment (`-=`)** operator performs subtraction on the two operands and assigns the result to the left operand.

```js
let a = 2;

console.log((a -= 3));
// Expected output: -1

console.log((a -= "Hello"));
// Expected output: NaN
```

## Syntax

```js
x -= y
```

## Description

`x -= y` is equivalent to `x = x - y`, except that the expression `x` is only evaluated once.

## Examples

### Subtraction assignment using numbers

```js
let bar = 5;

bar -= 2; // 3
```

Other non-BigInt values are coerced to numbers:

```js
bar -= "foo"; // NaN
```

### Subtraction assignment using BigInts

```js
let foo = 3n;
foo -= 2n; // 1n
foo -= 1; // TypeError: Cannot mix BigInt and other types, use explicit conversions
```

## See also

- Assignment operators in the JS guide
- Subtraction (`-`)
