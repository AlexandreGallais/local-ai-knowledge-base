---
title: "Decrement (--)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/decrement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Decrement (--)

The **decrement (`--`)** operator decrements (subtracts one from) its operand and returns the value before or after the decrement, depending on where the operator is placed.

```js
let x = 3;
const y = x--;

console.log(`x:${x}, y:${y}`);
// Expected output: "x:2, y:3"

let a = 3;
const b = --a;

console.log(`a:${a}, b:${b}`);
// Expected output: "a:2, b:2"
```

## Syntax

```js
x--
--x
```

## Description

The `--` operator is overloaded for two types of operands: number and BigInt. It first coerces the operand to a numeric value and tests the type of it. It performs BigInt decrement if the operand becomes a BigInt; otherwise, it performs number decrement.

If used postfix, with operator after operand (for example, `x--`), the decrement operator decrements and returns the value before decrementing.

If used prefix, with operator before operand (for example, `--x`), the decrement operator decrements and returns the value after decrementing.

The decrement operator can only be applied on operands that are references (variables and object properties; i.e., valid assignment targets). `--x` itself evaluates to a value, not a reference, so you cannot chain multiple decrement operators together.

```js
--(--x); // SyntaxError: Invalid left-hand side expression in prefix operation
```

## Examples

### Postfix decrement

```js
let x = 3;
const y = x--;
// x is 2; y is 3

let x2 = 3n;
const y2 = x2--;
// x2 is 2n; y2 is 3n
```

### Prefix decrement

```js
let x = 3;
const y = --x;
// x is 2; y = 2

let x2 = 3n;
const y2 = --x2;
// x2 is 2n; y2 is 2n
```

## See also

- Addition (`+`)
- Subtraction (`-`)
- Division (`/`)
- Multiplication (`*`)
- Remainder (`%`)
- Exponentiation (`**`)
- Increment (`++`)
- Unary negation (`-`)
- Unary plus (`+`)
