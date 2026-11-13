---
title: "Unary negation (-)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/unary_negation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Unary negation (-)

The **unary negation (`-`)** operator precedes its operand and negates it.

```js
const x = 4;
const y = -x;

console.log(y);
// Expected output: -4

const a = "4";
const b = -a;

console.log(b);
// Expected output: -4
```

## Syntax

```js
-x
```

## Description

The `-` operator is overloaded for two types of operands: number and BigInt. It first coerces the operand to a numeric value and tests the type of it. It performs BigInt negation if the operand becomes a BigInt; otherwise, it performs number negation.

## Examples

### Negating numbers

```js
const x = 3;
const y = -x;
// y is -3; x is 3
```

### Negating non-numbers

The unary negation operator can convert a non-number into a number.

```js
const x = "4";
const y = -x;

// y is -4
```

BigInts can be negated using the unary negation operator.

```js
const x = 4n;
const y = -x;

// y is -4n
```

## See also

- Addition (`+`)
- Subtraction (`-`)
- Division (`/`)
- Multiplication (`*`)
- Remainder (`%`)
- Exponentiation (`**`)
- Increment (`++`)
- Decrement (`--`)
- Unary plus (`+`)
