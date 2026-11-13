---
title: "Remainder assignment (%=)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/remainder_assignment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Remainder assignment (%=)

The **remainder assignment (`%=`)** operator performs remainder on the two operands and assigns the result to the left operand.

```js
let a = 3;

console.log((a %= 2));
// Expected output: 1

console.log((a %= 0));
// Expected output: NaN

console.log((a %= "hello"));
// Expected output: NaN
```

## Syntax

```js
x %= y
```

## Description

`x %= y` is equivalent to `x = x % y`, except that the expression `x` is only evaluated once.

## Examples

### Using remainder assignment

```js
let bar = 5;

bar %= 2; // 1
bar %= "foo"; // NaN
bar %= 0; // NaN

let foo = 3n;
foo %= 2n; // 1n
```

## See also

- Assignment operators in the JS guide
- Remainder (`%`)
