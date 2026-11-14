---
title: "Multiplication (*)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/multiplication/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Multiplication (*)

The **multiplication (`*`)** operator produces the product of the operands.

```js
console.log(3 * 4);
// Expected output: 12

console.log(-3 * 4);
// Expected output: -12

console.log("3" * 2);
// Expected output: 6

console.log("foo" * 2);
// Expected output: NaN
```

## Syntax

```js
x * y
```

## Description

The `*` operator is overloaded for two types of operands: number and BigInt. It first coerces both operands to numeric values and tests the types of them. It performs BigInt multiplication if both operands become BigInts; otherwise, it performs number multiplication. A `TypeError` is thrown if one operand becomes a BigInt but the other becomes a number.

## Examples

### Multiplication using numbers

```js
2 * 2; // 4
-2 * 2; // -4

Infinity * 0; // NaN
Infinity * Infinity; // Infinity
```

Other non-BigInt values are coerced to numbers:

```js
"foo" * 2; // NaN
"2" * 2; // 4
```

### Multiplication using BigInts

```js
2n * 2n; // 4n
-2n * 2n; // -4n
```

You cannot mix BigInt and number operands in multiplication.

```js
2n * 2; // TypeError: Cannot mix BigInt and other types, use explicit conversions
2 * 2n; // TypeError: Cannot mix BigInt and other types, use explicit conversions
```

To do multiplication with a BigInt and a non-BigInt, convert either operand:

```js
2n * BigInt(2); // 4n
Number(2n) * 2; // 4
```

## See also

- Addition (`+`)
- Subtraction (`-`)
- Division (`/`)
- Remainder (`%`)
- Exponentiation (`**`)
- Increment (`++`)
- Decrement (`--`)
- Unary negation (`-`)
- Unary plus (`+`)
