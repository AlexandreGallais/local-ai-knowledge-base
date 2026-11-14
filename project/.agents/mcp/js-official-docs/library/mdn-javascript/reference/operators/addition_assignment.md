---
title: "Addition assignment (+=)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/addition_assignment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Addition assignment (+=)

The **addition assignment (`+=`)** operator performs addition (which is either numeric addition or string concatenation) on the two operands and assigns the result to the left operand.

```js
let a = 2;
let b = "hello";

console.log((a += 3)); // Addition
// Expected output: 5

console.log((b += " world")); // Concatenation
// Expected output: "hello world"
```

## Syntax

```js
x += y
```

## Description

`x += y` is equivalent to `x = x + y`, except that the expression `x` is only evaluated once.

## Examples

### Addition assignment using numbers

```js
let bar = 5;
bar += 2; // 7
```

Other non-string, non-BigInt values are coerced to numbers:

```js
let baz = true;
baz += 1; // 2
baz += false; // 2
```

### Addition assignment using BigInts

```js
let x = 1n;
x += 2n; // 3n

x += 1; // TypeError: Cannot mix BigInt and other types, use explicit conversions
```

### Addition assignment using strings

```js
let foo = "foo";
foo += false; // "foofalse"
foo += "bar"; // "foofalsebar"

let bar = 5;
bar += "foo"; // "5foo"
```

## See also

- Assignment operators in the JS guide
- Addition (`+`)
