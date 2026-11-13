---
title: "Exponentiation assignment (**=)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/exponentiation_assignment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Exponentiation assignment (**=)

The **exponentiation assignment (`**=`)** operator performs exponentiation on the two operands and assigns the result to the left operand.

```js
let a = 3;

console.log((a **= 2));
// Expected output: 9

console.log((a **= 0));
// Expected output: 1

console.log((a **= 'hello'));
// Expected output: NaN
```

## Syntax

```js
x **= y
```

## Description

`x **= y` is equivalent to `x = x ** y`, except that the expression `x` is only evaluated once.

## Examples

### Exponentiation assignment using numbers

```js
let bar = 5;
bar **= 2; // 25
```

Other non-BigInt values are coerced to numbers:

```js
let baz = 5;
baz **= "foo"; // NaN
```

### Exponentiation assignment using BigInts

```js
let foo = 3n;
foo **= 2n; // 9n
foo **= 1; // TypeError: Cannot mix BigInt and other types, use explicit conversions
```

## See also

- Assignment operators in the JS guide
- Exponentiation (`**`)
