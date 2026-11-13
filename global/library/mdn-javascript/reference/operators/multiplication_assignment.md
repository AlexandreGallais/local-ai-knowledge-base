---
title: "Multiplication assignment (*=)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/multiplication_assignment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Multiplication assignment (*=)

The **multiplication assignment (`*=`)** operator performs multiplication on the two operands and assigns the result to the left operand.

```js
let a = 2;

console.log((a *= 3));
// Expected output: 6

console.log((a *= "hello"));
// Expected output: NaN
```

## Syntax

```js
x *= y
```

## Description

`x *= y` is equivalent to `x = x * y`, except that the expression `x` is only evaluated once.

## Examples

### Multiplication assignment using numbers

```js
let bar = 5;
bar *= 2; // 10
```

Other non-BigInt values are coerced to numbers:

```js
let bar = 5;
bar *= "foo"; // NaN
```

### Multiplication assignment using BigInts

```js
let foo = 3n;
foo *= 2n; // 6n
foo *= 1; // TypeError: Cannot mix BigInt and other types, use explicit conversions
```

## See also

- Assignment operators in the JS guide
- Multiplication (`*`)
