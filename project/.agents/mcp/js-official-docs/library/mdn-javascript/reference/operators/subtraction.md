---
title: "Subtraction (-)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/subtraction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Subtraction (-)

The **subtraction (`-`)** operator subtracts the two operands, producing their difference.

```js
console.log(5 - 3);
// Expected output: 2

console.log(3.5 - 5);
// Expected output: -1.5

console.log(5 - "hello");
// Expected output: NaN

console.log(5 - true);
// Expected output: 4
```

## Syntax

```js
x - y
```

## Description

The `-` operator is overloaded for two types of operands: number and BigInt. It first coerces both operands to numeric values and tests the types of them. It performs BigInt subtraction if both operands become BigInts; otherwise, it performs number subtraction. A `TypeError` is thrown if one operand becomes a BigInt but the other becomes a number.

## Examples

### Subtraction using numbers

```js
5 - 3; // 2
3 - 5; // -2
```

Other non-BigInt values are coerced to numbers:

```js
"foo" - 3; // NaN; "foo" is converted to the number NaN
5 - "3"; // 2; "3" is converted to the number 3
```

### Subtraction using BigInts

```js
2n - 1n; // 1n
```

You cannot mix BigInt and number operands in subtraction.

```js
2n - 1; // TypeError: Cannot mix BigInt and other types, use explicit conversions
2 - 1n; // TypeError: Cannot mix BigInt and other types, use explicit conversions
```

To do subtraction with a BigInt and a non-BigInt, convert either operand:

```js
2n - BigInt(1); // 1n
Number(2n) - 1; // 1
```

## See also

- Addition (`+`)
- Division (`/`)
- Multiplication (`*`)
- Remainder (`%`)
- Exponentiation (`**`)
- Increment (`++`)
- Decrement (`--`)
- Unary negation (`-`)
- Unary plus (`+`)
