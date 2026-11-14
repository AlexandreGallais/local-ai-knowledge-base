---
title: "Division assignment (/=)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/division_assignment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Division assignment (/=)

The **division assignment (`/=`)** operator performs division on the two operands and assigns the result to the left operand.

```js
let a = 3;

a /= 2;
console.log(a);
// Expected output: 1.5

a /= 0;
console.log(a);
// Expected output: Infinity

a /= "hello";
console.log(a);
// Expected output: NaN
```

## Syntax

```js
x /= y
```

## Description

`x /= y` is equivalent to `x = x / y`, except that the expression `x` is only evaluated once.

## Examples

### Division assignment using numbers

```js
let bar = 5;

bar /= 2; // 2.5
bar /= 2; // 1.25
bar /= 0; // Infinity
```

Other non-BigInt values are coerced to numbers:

```js
let bar = 5;
bar /= "2"; // 2.5
bar /= "foo"; // NaN
```

### Division assignment using BigInts

```js
let foo = 3n;
foo /= 2n; // 1n
foo /= 2n; // 0n

foo /= 0n; // RangeError: BigInt division by zero
foo /= 1; // TypeError: Cannot mix BigInt and other types, use explicit conversions
```

## See also

- Assignment operators in the JS guide
- Division (`/`)
