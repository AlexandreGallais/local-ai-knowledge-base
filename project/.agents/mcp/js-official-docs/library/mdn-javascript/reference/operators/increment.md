---
title: "Increment (++)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/increment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Increment (++)

The **increment (`++`)** operator increments (adds one to) its operand and returns the value before or after the increment, depending on where the operator is placed.

```js
let x = 3;
const y = x++;

console.log(`x:${x}, y:${y}`);
// Expected output: "x:4, y:3"

let a = 3;
const b = ++a;

console.log(`a:${a}, b:${b}`);
// Expected output: "a:4, b:4"
```

## Syntax

```js
x++
++x
```

## Description

The `++` operator is overloaded for two types of operands: number and BigInt. It first coerces the operand to a numeric value and tests the type of it. It performs BigInt increment if the operand becomes a BigInt; otherwise, it performs number increment.

If used postfix, with operator after operand (for example, `x++`), the increment operator increments and returns the value before incrementing.

If used prefix, with operator before operand (for example, `++x`), the increment operator increments and returns the value after incrementing.

The increment operator can only be applied on operands that are references (variables and object properties; i.e., valid assignment targets). `++x` itself evaluates to a value, not a reference, so you cannot chain multiple increment operators together.

```js
++(++x); // SyntaxError: Invalid left-hand side expression in prefix operation
```

## Examples

### Postfix increment

```js
let x = 3;
const y = x++;
// x is 4; y is 3

let x2 = 3n;
const y2 = x2++;
// x2 is 4n; y2 is 3n
```

### Prefix increment

```js
let x = 3;
const y = ++x;
// x is 4; y is 4

let x2 = 3n;
const y2 = ++x2;
// x2 is 4n; y2 is 4n
```

## See also

- Addition (`+`)
- Subtraction (`-`)
- Division (`/`)
- Multiplication (`*`)
- Remainder (`%`)
- Exponentiation (`**`)
- Decrement (`--`)
- Unary negation (`-`)
- Unary plus (`+`)
